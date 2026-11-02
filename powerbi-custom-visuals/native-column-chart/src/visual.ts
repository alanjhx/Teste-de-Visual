"use strict";

import powerbi from "powerbi-visuals-api";
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import * as d3 from "d3";
import { VisualFormattingSettingsModel } from "./settings";

import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;
import DataView = powerbi.DataView;
import Fill = powerbi.Fill;

type Datum = { category: string; value: number; color: string; selectionId: powerbi.visuals.ISelectionId };

/**
 * Gráfico de colunas que reproduz a identidade visual nativa do Power BI,
 * baseado nos tokens de engenharia reversa (REA):
 *   - gridlines pontilhadas (stroke-dasharray) — observado em visualStyles
 *   - stroke/typografia Segoe UI, cores do tema CY24SU02
 *   - cantos arredondados no topo (radius) — observado (ex.: radius 10)
 */
export class Visual implements IVisual {
    private host: IVisualHost;
    private svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
    private gGrid: d3.Selection<SVGGElement, unknown, null, undefined>;
    private gBars: d3.Selection<SVGGElement, unknown, null, undefined>;
    private gXAxis: d3.Selection<SVGGElement, unknown, null, undefined>;
    private gYAxis: d3.Selection<SVGGElement, unknown, null, undefined>;
    private gLabels: d3.Selection<SVGGElement, unknown, null, undefined>;
    private tooltip: powerbi.extensibility.ITooltipService;
    private selectionManager: powerbi.extensibility.ISelectionManager;

    private formattingSettingsService: FormattingSettingsService;
    private settings!: VisualFormattingSettingsModel;

    constructor(options: VisualConstructorOptions) {
        this.host = options.host;
        this.tooltip = this.host.tooltipService;
        this.selectionManager = this.host.createSelectionManager();
        this.formattingSettingsService = new FormattingSettingsService();

        this.svg = d3.select(options.element)
            .append("svg")
            .classed("nativeColumnChart", true);
        this.gGrid = this.svg.append("g").classed("grid", true);
        this.gBars = this.svg.append("g").classed("bars", true);
        this.gXAxis = this.svg.append("g").classed("xAxis", true);
        this.gYAxis = this.svg.append("g").classed("yAxis", true);
        this.gLabels = this.svg.append("g").classed("labels", true);
    }

    public update(options: VisualUpdateOptions): void {
        const dataView: DataView | undefined = options.dataViews && options.dataViews[0];
        this.settings = this.formattingSettingsService.populateFormattingSettingsModel(
            VisualFormattingSettingsModel, dataView
        );

        const width = options.viewport.width;
        const height = options.viewport.height;
        this.svg.attr("width", width).attr("height", height);

        const data = this.transform(dataView);
        if (!data.length) { this.clear(); return; }

        const s = this.settings;
        const showX = s.categoryAxis.show.value;
        const showY = s.valueAxis.show.value;

        // margens (reserva espaço para rótulos de eixo — evita clipping)
        const margin = {
            top: 14,
            right: 12,
            bottom: showX ? 26 : 8,
            left: showY ? 44 : 10
        };
        const w = Math.max(0, width - margin.left - margin.right);
        const h = Math.max(0, height - margin.top - margin.bottom);

        const yStart = s.valueAxis.start.value ?? 0;
        const yMax = Math.max(yStart + 1, d3.max(data, d => d.value) as number);

        const x = d3.scaleBand<string>()
            .domain(data.map(d => d.category))
            .range([0, w])
            .padding(0.28); // espaçamento entre colunas (identidade PBI)

        const y = d3.scaleLinear()
            .domain([yStart, yMax]).nice()
            .range([h, 0]);

        const gx = margin.left, gy = margin.top;
        this.gGrid.attr("transform", `translate(${gx},${gy})`);
        this.gBars.attr("transform", `translate(${gx},${gy})`);
        this.gLabels.attr("transform", `translate(${gx},${gy})`);
        this.gXAxis.attr("transform", `translate(${gx},${gy + h})`);
        this.gYAxis.attr("transform", `translate(${gx},${gy})`);

        // ---- gridlines (pontilhadas por padrão — token nativo) ----
        this.gGrid.selectAll("*").remove();
        if (showY && s.valueAxis.gridlines.value) {
            const dash = this.dashArray(s.valueAxis.gridlineStyle.value.value as string);
            const ticks = y.ticks(5);
            this.gGrid.selectAll("line").data(ticks).join("line")
                .attr("x1", 0).attr("x2", w)
                .attr("y1", d => y(d)).attr("y2", d => y(d))
                .attr("stroke", "#D9D9D9")
                .attr("stroke-width", 1)
                .attr("stroke-dasharray", dash);
        }

        // ---- barras (cantos superiores arredondados) ----
        const radius = Math.max(0, Math.min(s.dataPoint.barRadius.value, x.bandwidth() / 2));
        const bars = this.gBars.selectAll<SVGPathElement, Datum>("path").data(data, d => d.category);
        bars.join("path")
            .attr("d", d => this.barPath(x(d.category) as number, y(d.value), x.bandwidth(), h - y(d.value), radius))
            .attr("fill", d => d.color)
            .style("cursor", "pointer")
            .on("click", (event: MouseEvent, d) => {
                this.selectionManager.select(d.selectionId, event.ctrlKey || event.metaKey);
                event.stopPropagation();
            })
            .on("mouseover", (event: MouseEvent, d) => this.showTooltip(event, d))
            .on("mousemove", (event: MouseEvent, d) => this.showTooltip(event, d))
            .on("mouseout", () => this.tooltip.hide({ immediately: false, isTouchEvent: false }));

        // ---- eixo de categoria ----
        this.gXAxis.selectAll("*").remove();
        if (showX) {
            const axis = d3.axisBottom(x).tickSizeOuter(0);
            this.gXAxis.call(axis as any);
            this.gXAxis.select(".domain").attr("stroke", "#C8C6C4");
            this.gXAxis.selectAll("line").attr("stroke", "#C8C6C4");
            this.gXAxis.selectAll("text")
                .attr("fill", (s.categoryAxis.labelColor.value.value))
                .style("font-family", "'Segoe UI', wf_standard-font, sans-serif")
                .style("font-size", `${s.categoryAxis.fontSize.value}px`);
        }

        // ---- eixo de valor ----
        this.gYAxis.selectAll("*").remove();
        if (showY) {
            const axis = d3.axisLeft(y).ticks(5).tickSizeOuter(0);
            this.gYAxis.call(axis as any);
            this.gYAxis.select(".domain").remove(); // PBI esconde a linha do eixo de valor
            this.gYAxis.selectAll("line").attr("stroke", "transparent");
            this.gYAxis.selectAll("text")
                .attr("fill", (s.valueAxis.labelColor.value.value))
                .style("font-family", "'Segoe UI', wf_standard-font, sans-serif")
                .style("font-size", "10px");
        }

        // ---- rótulos de dados ----
        this.gLabels.selectAll("*").remove();
        if (s.dataLabels.show.value) {
            const prec = Math.max(0, s.dataLabels.labelPrecision.value);
            this.gLabels.selectAll("text").data(data).join("text")
                .attr("x", d => (x(d.category) as number) + x.bandwidth() / 2)
                .attr("y", d => y(d.value) - 4)
                .attr("text-anchor", "middle")
                .attr("fill", s.dataLabels.color.value.value)
                .style("font-family", "'Segoe UI', wf_standard-font, sans-serif")
                .style("font-size", `${s.dataLabels.fontSize.value}px`)
                .text(d => d.value.toFixed(prec));
        }

        // clique no fundo limpa a seleção
        this.svg.on("click", () => this.selectionManager.clear());
    }

    /** caminho de retângulo com os dois cantos SUPERIORES arredondados */
    private barPath(x: number, y: number, w: number, hh: number, r: number): string {
        if (hh <= 0) return "";
        const rr = Math.min(r, hh);
        return `M${x},${y + hh} L${x},${y + rr} Q${x},${y} ${x + rr},${y} `
             + `L${x + w - rr},${y} Q${x + w},${y} ${x + w},${y + rr} L${x + w},${y + hh} Z`;
    }

    private dashArray(style: string): string {
        if (style === "dashed") return "4 4";
        if (style === "solid") return "0";
        return "2 4"; // pontilhada (default nativo)
    }

    private transform(dataView: DataView | undefined): Datum[] {
        if (!dataView || !dataView.categorical) return [];
        const cat = dataView.categorical.categories && dataView.categorical.categories[0];
        const vals = dataView.categorical.values && dataView.categorical.values[0];
        if (!cat || !vals) return [];

        const palette = this.host.colorPalette;
        const objDefault = this.settings.dataPoint.defaultColor.value.value;
        const out: Datum[] = [];
        for (let i = 0; i < cat.values.length; i++) {
            const name = `${cat.values[i]}`;
            // cor por ponto: prioridade -> objeto no dataView -> tema (colorPalette) -> default
            const perPoint = this.getPointFill(cat, i);
            const color = perPoint ?? palette.getColor(name).value ?? objDefault;
            const selectionId = this.host.createSelectionIdBuilder()
                .withCategory(cat, i).createSelectionId();
            out.push({ category: name, value: Number(vals.values[i]) || 0, color, selectionId });
        }
        return out;
    }

    private getPointFill(cat: powerbi.DataViewCategoryColumn, i: number): string | null {
        const objs = cat.objects && cat.objects[i];
        const fill = objs && (objs["dataPoint"] as any)?.fill as Fill | undefined;
        return fill?.solid?.color ?? null;
    }

    private showTooltip(event: MouseEvent, d: Datum): void {
        this.tooltip.show({
            dataItems: [{ displayName: d.category, value: `${d.value}` }],
            identities: [d.selectionId],
            coordinates: [event.clientX, event.clientY],
            isTouchEvent: false
        });
    }

    private clear(): void {
        this.gGrid.selectAll("*").remove();
        this.gBars.selectAll("*").remove();
        this.gXAxis.selectAll("*").remove();
        this.gYAxis.selectAll("*").remove();
        this.gLabels.selectAll("*").remove();
    }

    public getFormattingModel(): powerbi.visuals.FormattingModel {
        return this.formattingSettingsService.buildFormattingModel(this.settings);
    }
}
