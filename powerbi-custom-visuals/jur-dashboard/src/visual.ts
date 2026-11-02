"use strict";

import powerbi from "powerbi-visuals-api";
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import { VisualFormattingSettingsModel } from "./settings";

import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import DataView = powerbi.DataView;
import DataViewCategoryColumn = powerbi.DataViewCategoryColumn;
import DataViewValueColumn = powerbi.DataViewValueColumn;

type Row = {
    contract: string; bm: string; supplier: string; portfolio: string;
    progress: number; contractValue: number; usedValue: number;
    statusClass: string; statusLabel: string;
};
type Marker = { t: number; v: number; label: string; color: string; dark: boolean; title: string; date: string; cls: string; dy: number };
type Model = {
    live: boolean;
    projectId: string; closeDate: string; startLabel: string; durationMonths: number;
    kpis: { contratos: number; ativos: number; encerrados: number; atrasos: number;
            valorPlanejado: number; valorRealizado: number; pctRealizado: number; pctExecutado: number };
    rows: Row[];
    minYear: number; maxYear: number; years: number[];
    plannedL: number; realizedL: number; k: number; mid: number; today: number;
    markers: Marker[];
};

export class Visual implements IVisual {
    private root: HTMLDivElement;
    private formattingSettingsService: FormattingSettingsService;
    private settings: VisualFormattingSettingsModel;

    constructor(options: VisualConstructorOptions) {
        this.formattingSettingsService = new FormattingSettingsService();
        this.root = document.createElement("div");
        this.root.className = "jur-root";
        options.element.appendChild(this.root);
    }

    public update(options: VisualUpdateOptions): void {
        const dv: DataView = options.dataViews && options.dataViews[0];
        this.settings = this.formattingSettingsService.populateFormattingSettingsModel(
            VisualFormattingSettingsModel, dv);

        const accent = this.settings.project.accentColor.value.value || "#2e9bff";
        const m = this.buildModel(dv) || this.exampleModel();

        this.root.style.setProperty("--accent", accent);
        this.root.innerHTML =
            this.noteHtml(m) + this.kpisHtml(m) + this.curvePanelHtml(m) + this.tableHtml(m);
        this.drawChart(m);
    }

    // ---------------- model ----------------
    private buildModel(dv: DataView): Model | null {
        const cat = dv && dv.categorical;
        if (!cat || !cat.categories) return null;
        const C = (role: string): DataViewCategoryColumn =>
            cat.categories.find(c => c.source.roles && c.source.roles[role]);
        const V = (role: string): DataViewValueColumn =>
            cat.values && cat.values.find(v => v.source.roles && v.source.roles[role]);

        const contract = C("contract");
        if (!contract) return null; // sem contrato ligado -> exemplo

        const supplier = C("supplier"), status = C("status"), portfolio = C("portfolio");
        const projectIdCol = C("projectId"), bm = C("bmNumber");
        const startD = C("startDate"), endD = C("endDate");
        const notifD = C("notificationDate"), amendD = C("amendmentDate"), tecD = C("tecSignDate");
        const cValue = V("contractValue"), uValue = V("usedValue");

        const n = contract.values.length;
        const rows: Row[] = [];
        let sumC = 0, sumU = 0, ativos = 0, encerrados = 0, atrasos = 0;
        const now = Date.now();
        const starts: number[] = [], ends: number[] = [];

        for (let i = 0; i < n; i++) {
            const cv = cValue ? Number(cValue.values[i]) || 0 : 0;
            const uv = uValue ? Number(uValue.values[i]) || 0 : 0;
            const label = status ? `${status.values[i] ?? ""}` : "";
            const cls = this.statusClass(label);
            const end = this.parseDate(endD && endD.values[i]);
            const start = this.parseDate(startD && startD.values[i]);
            if (start) starts.push(start);
            if (end) ends.push(end);
            if (cls === "ativo") ativos++;
            if (cls === "encerrado") encerrados++;
            if (cls === "atraso" || (cls === "ativo" && end && end < now)) atrasos++;
            sumC += cv; sumU += uv;
            rows.push({
                contract: `${contract.values[i] ?? ""}`,
                bm: bm ? `${bm.values[i] ?? ""}` : "—",
                supplier: supplier ? `${supplier.values[i] ?? ""}` : "—",
                portfolio: portfolio ? `${portfolio.values[i] ?? ""}` : "—",
                progress: cv > 0 ? Math.round((uv / cv) * 100) : 0,
                contractValue: cv, usedValue: uv,
                statusClass: cls, statusLabel: label || "—"
            });
        }

        const minT = starts.length ? Math.min(...starts) : 0;
        const maxT = ends.length ? Math.max(...ends) : 0;
        const hasAxis = minT > 0 && maxT > minT;
        const minYear = hasAxis ? this.decYear(minT) : 2019;
        const maxYear = hasAxis ? this.decYear(maxT) : 2023.5;

        const pctRealizado = sumC > 0 ? (sumU / sumC) * 100 : 0;
        const mid = (minYear + maxYear) / 2;
        const k = 8 / Math.max(1, (maxYear - minYear));
        const todayYear = Math.min(this.decYear(now), maxYear);

        const manualId = this.settings.project.projectId.value;
        const dataId = projectIdCol && projectIdCol.values.length ? `${projectIdCol.values[0] ?? ""}` : "";
        const projectId = manualId || dataId || "Projeto";

        const markers = this.buildMarkers(notifD, amendD, tecD, minYear, maxYear, k, mid);

        return {
            live: true,
            projectId,
            closeDate: maxT ? this.fmtDate(maxT) : "—",
            startLabel: minT ? this.monthYear(minT) : "—",
            durationMonths: (minT && maxT) ? Math.max(1, Math.round((maxT - minT) / (1000 * 3600 * 24 * 30.44))) : 0,
            kpis: {
                contratos: n, ativos, encerrados, atrasos,
                valorPlanejado: sumC, valorRealizado: sumU,
                pctRealizado, pctExecutado: pctRealizado
            },
            rows, minYear, maxYear, years: this.yearTicks(minYear, maxYear),
            plannedL: 99, realizedL: Math.max(1, Math.min(100, pctRealizado)), k, mid, today: todayYear,
            markers
        };
    }

    private buildMarkers(notifD: DataViewCategoryColumn, amendD: DataViewCategoryColumn,
                         tecD: DataViewCategoryColumn, minYear: number, maxYear: number,
                         k: number, mid: number): Marker[] {
        const planned = (t: number) => 99 / (1 + Math.exp(-k * (t - mid)));
        const firstDate = (col: DataViewCategoryColumn): number => {
            if (!col) return 0;
            let best = 0;
            for (const raw of col.values) { const d = this.parseDate(raw); if (d && (best === 0 || d < best)) best = d; }
            return best;
        };
        const out: Marker[] = [];
        const add = (ts: number, label: string, color: string, dark: boolean, title: string, cls: string) => {
            if (!ts) return;
            const t = this.decYear(ts);
            if (t < minYear || t > maxYear) return;
            out.push({ t, v: planned(t), label, color, dark, title, date: this.fmtDate(ts), cls, dy: -6 });
        };
        add(firstDate(notifD), "N", "#ef8f2e", true, "Notificação", "amber");
        add(firstDate(amendD), "A", "#e24c5b", false, "Aditivo", "red");
        add(firstDate(tecD), "TA", "#17b58f", true, "TEC Assinado", "teal");
        return out;
    }

    private exampleModel(): Model {
        const rows: Row[] = [
            { contract: "2126967", bm: "—", supplier: "—", portfolio: "Perfuração", progress: 0,   contractValue: 0,       usedValue: 0, statusClass: "fechado",   statusLabel: "Fechado" },
            { contract: "2128457", bm: "—", supplier: "—", portfolio: "Perfuração", progress: 0,   contractValue: 0,       usedValue: 0, statusClass: "encerrado", statusLabel: "Encerrado" },
            { contract: "2130736", bm: "—", supplier: "—", portfolio: "Montagem",   progress: 100, contractValue: 1240000, usedValue: 1240000, statusClass: "encerrado", statusLabel: "Encerrado" },
            { contract: "2141902", bm: "—", supplier: "—", portfolio: "Montagem",   progress: 64,  contractValue: 980500,  usedValue: 568690,  statusClass: "ativo",     statusLabel: "Ativo" },
            { contract: "2155310", bm: "—", supplier: "—", portfolio: "Elétrica",   progress: 38,  contractValue: 2310000, usedValue: 716100,  statusClass: "ativo",     statusLabel: "Ativo" },
            { contract: "2160884", bm: "—", supplier: "—", portfolio: "Elétrica",   progress: 12,  contractValue: 760000,  usedValue: 68400,   statusClass: "atraso",    statusLabel: "Atraso" }
        ];
        return {
            live: false, projectId: this.settings.project.projectId.value || "JUR00140",
            closeDate: "30/06/2023", startLabel: "out. de 2019", durationMonths: 44,
            kpis: { contratos: 200, ativos: 25, encerrados: 175, atrasos: 25,
                    valorPlanejado: 0, valorRealizado: 0, pctRealizado: 0, pctExecutado: 82.3 },
            rows, minYear: 2019, maxYear: 2023.5, years: [2019, 2020, 2021, 2022, 2023],
            plannedL: 99, realizedL: 86, k: 1.85, mid: 2021.2, today: 2023.3,
            markers: [
                { t: 2021.17, v: 22, label: "N", color: "#ef8f2e", dark: true,  title: "Notificação",  date: "01/03/2021", cls: "amber", dy: -4 },
                { t: 2021.54, v: 40, label: "A", color: "#e24c5b", dark: false, title: "Aditivo",      date: "15/07/2021", cls: "red",   dy: -4 },
                { t: 2023.49, v: 100, label: "TA", color: "#17b58f", dark: true, title: "TEC Assinado", date: "25/06/2023", cls: "teal",  dy: -6 }
            ]
        };
    }

    // ---------------- helpers ----------------
    private statusClass(label: string): string {
        const l = (label || "").toLowerCase();
        if (l.indexOf("encerr") >= 0) return "encerrado";
        if (l.indexOf("fech") >= 0) return "fechado";
        if (l.indexOf("atras") >= 0) return "atraso";
        return "ativo";
    }
    private parseDate(raw: powerbi.PrimitiveValue): number {
        if (raw == null) return 0;
        if (raw instanceof Date) return raw.getTime();
        if (typeof raw === "number") return raw > 1e11 ? raw : 0;
        const t = Date.parse(`${raw}`);
        return isNaN(t) ? 0 : t;
    }
    private decYear(ts: number): number {
        const d = new Date(ts);
        const y = d.getFullYear();
        const start = new Date(y, 0, 1).getTime();
        const end = new Date(y + 1, 0, 1).getTime();
        return y + (ts - start) / (end - start);
    }
    private yearTicks(minY: number, maxY: number): number[] {
        const a = Math.floor(minY), b = Math.ceil(maxY), out: number[] = [];
        for (let y = a; y <= b; y++) out.push(y);
        return out.length ? out : [minY];
    }
    private money(v: number): string { return v ? "R$ " + Math.round(v).toLocaleString("pt-BR") : "R$ 0"; }
    private fmtDate(ts: number): string {
        const d = new Date(ts);
        const p = (x: number) => `${x}`.padStart(2, "0");
        return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()}`;
    }
    private monthYear(ts: number): string {
        const ms = ["jan.", "fev.", "mar.", "abr.", "mai.", "jun.", "jul.", "ago.", "set.", "out.", "nov.", "dez."];
        const d = new Date(ts);
        return `${ms[d.getMonth()]} de ${d.getFullYear()}`;
    }
    private esc(s: string): string {
        return `${s}`.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    // ---------------- HTML ----------------
    private noteHtml(m: Model): string {
        const txt = m.live ? `Dados ligados — projeto ${this.esc(m.projectId)}`
                           : `Dados de exemplo (ligue os campos para usar seus dados) — projeto ${this.esc(m.projectId)}`;
        return `<div class="note">${txt}</div>`;
    }
    private icon(path: string, stroke: string): string {
        return `<div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg></div>`;
    }
    private kpisHtml(m: Model): string {
        const k = m.kpis;
        const folder = `<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>`;
        const cal = `<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/>`;
        const doc = `<path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v5h5"/>`;
        const money = `<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/>`;
        const warn = `<path d="M12 3 2 20h20L12 3z"/><path d="M12 10v4M12 17h.01"/>`;
        const exec = Math.round(k.pctExecutado * 10) / 10;
        const dash = Math.max(0, Math.min(100, exec));
        const pctReal = Math.round(k.pctRealizado);
        return `<div class="kpis">
          <div class="kpi"><div class="lab">Projeto</div><div class="mid">${this.icon(folder,"#e8a33d")}<div class="val">${this.esc(m.projectId)}</div></div><div class="sub">Início: ${this.esc(m.startLabel)}</div></div>
          <div class="kpi"><div class="lab">Data de encerramento</div><div class="mid">${this.icon(cal,"#2e9bff")}<div class="val">${this.esc(m.closeDate)}</div></div><div class="sub">${m.durationMonths ? m.durationMonths + " meses de duração" : "duração —"}</div></div>
          <div class="kpi"><div class="lab">Contratos</div><div class="mid">${this.icon(doc,"#2e9bff")}<div class="val">${k.contratos}</div></div><div class="sub">${k.ativos} Ativos · ${k.encerrados} Enc.</div></div>
          <div class="kpi"><div class="lab">% Executado (financeiro)</div><div class="mid">
            <div class="donut"><svg viewBox="0 0 42 42"><circle cx="21" cy="21" r="16" fill="none" stroke="#193149" stroke-width="5"/><circle cx="21" cy="21" r="16" fill="none" stroke="#17b58f" stroke-width="5" stroke-linecap="round" stroke-dasharray="${dash} 100" stroke-dashoffset="25" pathLength="100" transform="rotate(-90 21 21)"/></svg><span class="pc">${Math.round(exec)}%</span></div>
            <div class="val" style="font-size:20px">${`${exec}`.replace(".", ",")}%</div></div><div class="sub">Utilizado / contratado</div></div>
          <div class="kpi"><div class="lab">Valor planejado</div><div class="mid">${this.icon(money,"#e8a33d")}<div class="val">${this.money(k.valorPlanejado)}</div></div><div class="sub">Total contratos</div></div>
          <div class="kpi"><div class="lab">Valor realizado</div><div class="mid">${this.icon(money,"#1aab40")}<div class="val">${this.money(k.valorRealizado)}</div></div><div class="sub">${pctReal}% do planejado</div></div>
          <div class="kpi"><div class="lab">Atrasos</div><div class="mid">${this.icon(warn,"#e8a33d")}<div class="val">${k.atrasos}</div></div><div class="sub">Contratos em atraso</div></div>
        </div>`;
    }
    private curvePanelHtml(m: Model): string {
        let contract = `<div class="seg" style="flex-grow:.8;background:#4a3d8f"><b>Mob</b></div>`;
        for (let i = 1; i <= 12; i++) contract += `<div class="seg" style="flex-grow:1;background:${i <= 8 ? "#2f68bf" : "#b2407e"}"><b>M${i}</b></div>`;
        contract += `<div class="seg" style="flex-grow:.8;background:#23344a"><b>Desm.</b></div>`;
        const years = m.years.map(y => `<span>${y}</span>`).join("");
        return `<div class="panel">
          <h3>Curva Físico-Financeira e Ciclo de Vida dos Contratos</h3>
          <div class="tl">
            <div class="tl-lab">Fases do<br>Projeto</div>
            <div class="bands">
              <div class="seg" style="flex-grow:1.4;background:#2d5290"><b>FEL 1</b><small>Conceitual</small></div>
              <div class="seg" style="flex-grow:1.4;background:#223f72"><b>FEL 2</b><small>Básico</small></div>
              <div class="seg" style="flex-grow:1.4;background:#5a2130"><b>FEL 3</b><small>Detalhado</small></div>
              <div class="seg" style="flex-grow:5;background:#1b5b4f"><b>EXECUTION</b><small>Execução</small></div>
              <div class="seg" style="flex-grow:1.6;background:#53243f"><b>CLOSEOUT</b><small>Encerr.</small></div>
            </div>
            <div class="tl-lab">Fases do<br>Contrato</div>
            <div class="bands">${contract}</div>
            <div></div>
            <div class="years">${years}</div>
          </div>
          <div class="chartwrap">
            <div class="yaxis"><span>100%</span><span>80%</span><span>60%</span><span>40%</span><span>20%</span><span>0%</span></div>
            <div class="plot">
              <svg viewBox="0 0 1000 280" preserveAspectRatio="none" aria-hidden="true">
                <g class="grid"></g>
                <path class="plan" fill="none" stroke="#2e9bff" stroke-width="3" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
                <path class="real" fill="none" stroke="#17b58f" stroke-width="3" stroke-dasharray="7 6" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
              </svg>
            </div>
          </div>
          <div class="legend">
            <span><i class="sw"></i> Planejado (Curva S)</span>
            <span><i class="sw dash"></i> Realizado (Curva S)</span>
            <span><i class="dot" style="background:#ef8f2e"></i> Notificação</span>
            <span><i class="dot" style="background:#7a5cff"></i> TEC Enviado</span>
            <span><i class="dot" style="background:#2e9bff"></i> TEC Recebido</span>
            <span><i class="dot" style="background:#17b58f"></i> TEC Assinado</span>
            <span><i class="dot" style="background:#e24c5b"></i> Aditivo</span>
          </div>
        </div>`;
    }
    private tableHtml(m: Model): string {
        const body = m.rows.map(r => {
            const ciclo = [r.progress >= 25, r.progress >= 50, r.progress >= 75, r.progress >= 100]
                .map(o => `<i class="${o ? "on" : ""}"></i>`).join("");
            const usedPct = r.contractValue > 0 ? Math.round((r.usedValue / r.contractValue) * 100) : 0;
            return `<tr>
              <td><div class="c-main">${this.esc(r.contract)}</div><div class="c-sub">BM ${this.esc(r.bm)}</div></td>
              <td>${this.esc(r.supplier)}</td>
              <td>${this.esc(r.portfolio)}</td>
              <td><div class="ciclo">${ciclo}</div></td>
              <td><div class="prog"><div class="t">${r.progress}%</div><div class="bar"><i style="width:${Math.max(0, Math.min(100, r.progress))}%"></i></div></div></td>
              <td class="r"><span class="money">${this.money(r.contractValue)}</span></td>
              <td class="r"><span class="money">${this.money(r.usedValue)}</span> <span class="pct0">(${usedPct}%)</span></td>
              <td><span class="pill ${r.statusClass}">${this.esc(r.statusLabel)}</span></td>
            </tr>`;
        }).join("");
        return `<div class="panel">
          <h3>Contratos do Projeto <span class="mut">${this.esc(m.projectId)}</span></h3>
          <div class="tblwrap"><table>
            <thead><tr><th>Contrato</th><th>Fornecedor</th><th>Portfólio</th><th>Ciclo medições</th>
              <th>Progresso</th><th class="r">Valor contrato</th><th class="r">Valor utilizado</th><th>Status</th></tr></thead>
            <tbody>${body}</tbody>
          </table></div>
        </div>`;
    }

    // ---------------- chart ----------------
    private drawChart(m: Model): void {
        const plot = this.root.querySelector(".plot") as HTMLElement;
        if (!plot) return;
        const grid = this.root.querySelector(".grid") as SVGGElement;
        const span = m.maxYear - m.minYear || 1;
        const PX = (t: number) => (t - m.minYear) / span * 1000;
        const PY = (v: number) => 270 - (v / 100) * 260;
        const logistic = (t: number, L: number, mid: number) => L / (1 + Math.exp(-m.k * (t - mid)));
        const buildPath = (fn: (t: number) => number, tEnd: number) => {
            let d = ""; const steps = 120;
            for (let i = 0; i <= steps; i++) {
                const t = m.minYear + (tEnd - m.minYear) * i / steps;
                d += (i ? "L" : "M") + PX(t).toFixed(1) + " " + PY(fn(t)).toFixed(1);
            }
            return d;
        };
        (this.root.querySelector(".plan") as SVGPathElement)
            .setAttribute("d", buildPath(t => logistic(t, m.plannedL, m.mid), m.maxYear));
        (this.root.querySelector(".real") as SVGPathElement)
            .setAttribute("d", buildPath(t => logistic(t, m.realizedL, m.mid + 0.3), m.today));

        let g = "";
        [0, 20, 40, 60, 80, 100].forEach(v => {
            const y = PY(v);
            g += `<line x1="0" y1="${y}" x2="1000" y2="${y}" stroke="#203a58" stroke-width="1" stroke-dasharray="2 4" vector-effect="non-scaling-stroke"/>`;
        });
        const tdX = PX(m.today);
        g += `<line x1="${tdX}" y1="6" x2="${tdX}" y2="274" stroke="#3d5a7e" stroke-width="1" stroke-dasharray="3 4" vector-effect="non-scaling-stroke"/>`;
        grid.innerHTML = g;

        const L = (t: number) => PX(t) / 1000 * 100;
        const Tp = (v: number) => PY(v) / 280 * 100;
        for (const mk of m.markers) {
            const dot = document.createElement("div"); dot.className = "mk";
            dot.style.left = L(mk.t) + "%"; dot.style.top = Tp(mk.v) + "%"; dot.style.background = mk.color;
            dot.style.color = mk.dark ? "#09131f" : "#fff"; dot.textContent = mk.label; plot.appendChild(dot);
            const c = document.createElement("div"); c.className = "callout " + mk.cls;
            c.style.left = L(mk.t) + "%"; c.style.top = (Tp(mk.v) + mk.dy) + "%";
            c.innerHTML = `<b>${this.esc(mk.title)}</b><span class="d">${this.esc(mk.date)}</span>`; plot.appendChild(c);
        }
    }

    public getFormattingModel(): powerbi.visuals.FormattingModel {
        return this.formattingSettingsService.buildFormattingModel(this.settings);
    }
}
