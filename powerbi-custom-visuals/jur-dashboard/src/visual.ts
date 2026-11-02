"use strict";

import powerbi from "powerbi-visuals-api";
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import { VisualFormattingSettingsModel } from "./settings";

import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import DataView = powerbi.DataView;

type Row = {
    contract: string; sub: string; supplier: string; portfolio: string;
    ciclo: number[]; progress: number; contractValue: string; usedPct: number;
    statusClass: string; statusLabel: string;
};

const SAMPLE_ROWS: Row[] = [
    { contract: "2126967", sub: "2126967", supplier: "—", portfolio: "Perfuração", ciclo: [1,1,1,0], progress: 0,   contractValue: "R$ 0",        usedPct: 0,   statusClass: "fechado",   statusLabel: "Fechado" },
    { contract: "2128457", sub: "2128457", supplier: "—", portfolio: "Perfuração", ciclo: [1,1,0,0], progress: 0,   contractValue: "R$ 0",        usedPct: 0,   statusClass: "encerrado", statusLabel: "Encerrado" },
    { contract: "2130736", sub: "2130736", supplier: "—", portfolio: "Montagem",   ciclo: [1,1,1,1], progress: 100, contractValue: "R$ 1.240.000", usedPct: 100, statusClass: "encerrado", statusLabel: "Encerrado" },
    { contract: "2141902", sub: "2141902", supplier: "—", portfolio: "Montagem",   ciclo: [1,1,1,0], progress: 64,  contractValue: "R$ 980.500",  usedPct: 58,  statusClass: "ativo",     statusLabel: "Ativo" },
    { contract: "2155310", sub: "2155310", supplier: "—", portfolio: "Elétrica",   ciclo: [1,1,0,0], progress: 38,  contractValue: "R$ 2.310.000", usedPct: 31,  statusClass: "ativo",     statusLabel: "Ativo" },
    { contract: "2160884", sub: "2160884", supplier: "—", portfolio: "Elétrica",   ciclo: [1,0,0,0], progress: 12,  contractValue: "R$ 760.000",  usedPct: 9,   statusClass: "atraso",    statusLabel: "Atraso" }
];

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
            VisualFormattingSettingsModel, dv
        );
        const p = this.settings.project;
        const projectId = p.projectId.value || "JUR00140";
        const closeDate = p.closeDate.value || "30/06/2023";
        const accent = p.accentColor.value.value || "#2e9bff";

        const rows = this.readRows(dv);

        this.root.style.setProperty("--accent", accent);
        this.root.innerHTML =
            this.noteHtml(projectId) +
            this.kpisHtml(projectId, closeDate) +
            this.curvePanelHtml() +
            this.tableHtml(projectId, rows);

        this.drawChart();
    }

    // ---------- data ----------
    private readRows(dv: DataView): Row[] {
        const cat = dv && dv.categorical;
        if (!cat || !cat.categories || !cat.categories.length) return SAMPLE_ROWS;
        const col = (role: string) => cat.categories.find(c => c.source.roles && c.source.roles[role]);
        const val = (role: string) => cat.values && cat.values.find(v => v.source.roles && v.source.roles[role]);
        const contract = col("contract");
        if (!contract) return SAMPLE_ROWS;
        const supplier = col("supplier");
        const status = col("status");
        const progress = val("progress");
        const cValue = val("contractValue");
        const uValue = val("usedValue");

        const n = contract.values.length;
        const out: Row[] = [];
        for (let i = 0; i < n; i++) {
            const prog = progress ? Math.round(Number(progress.values[i]) || 0) : 0;
            const cv = cValue ? Number(cValue.values[i]) || 0 : 0;
            const uv = uValue ? Number(uValue.values[i]) || 0 : 0;
            const label = status ? `${status.values[i]}` : "";
            out.push({
                contract: `${contract.values[i]}`,
                sub: `${contract.values[i]}`,
                supplier: supplier ? `${supplier.values[i]}` : "—",
                portfolio: "—",
                ciclo: [prog >= 25 ? 1 : 0, prog >= 50 ? 1 : 0, prog >= 75 ? 1 : 0, prog >= 100 ? 1 : 0],
                progress: prog,
                contractValue: this.money(cv),
                usedPct: cv > 0 ? Math.round((uv / cv) * 100) : 0,
                statusClass: this.statusClass(label),
                statusLabel: label || "—"
            });
        }
        return out;
    }

    private statusClass(label: string): string {
        const l = (label || "").toLowerCase();
        if (l.indexOf("encerr") >= 0) return "encerrado";
        if (l.indexOf("fech") >= 0) return "fechado";
        if (l.indexOf("atras") >= 0) return "atraso";
        return "ativo";
    }

    private money(v: number): string {
        if (!v) return "R$ 0";
        return "R$ " + Math.round(v).toLocaleString("pt-BR");
    }

    // ---------- HTML blocks ----------
    private noteHtml(projectId: string): string {
        return `<div class="note">Reprodução de identidade visual (dados de exemplo quando sem campos ligados) — projeto ${this.esc(projectId)}</div>`;
    }

    private icon(path: string, stroke: string): string {
        return `<div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg></div>`;
    }

    private kpisHtml(projectId: string, closeDate: string): string {
        const folder = `<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>`;
        const cal = `<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/>`;
        const doc = `<path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v5h5"/>`;
        const money = `<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/>`;
        const warn = `<path d="M12 3 2 20h20L12 3z"/><path d="M12 10v4M12 17h.01"/>`;
        return `<div class="kpis">
          <div class="kpi"><div class="lab">Projeto</div><div class="mid">${this.icon(folder,"#e8a33d")}<div class="val">${this.esc(projectId)}</div></div><div class="sub">Início: out. de 2019</div></div>
          <div class="kpi"><div class="lab">Data de encerramento</div><div class="mid">${this.icon(cal,"#2e9bff")}<div class="val">${this.esc(closeDate)}</div></div><div class="sub">44 meses de duração</div></div>
          <div class="kpi"><div class="lab">Contratos</div><div class="mid">${this.icon(doc,"#2e9bff")}<div class="val">200</div></div><div class="sub">25 Ativos · 175 Enc.</div></div>
          <div class="kpi"><div class="lab">% Executado (físico)</div><div class="mid">
            <div class="donut"><svg viewBox="0 0 42 42"><circle cx="21" cy="21" r="16" fill="none" stroke="#193149" stroke-width="5"/><circle cx="21" cy="21" r="16" fill="none" stroke="#17b58f" stroke-width="5" stroke-linecap="round" stroke-dasharray="82.3 100" stroke-dashoffset="25" pathLength="100" transform="rotate(-90 21 21)"/></svg><span class="pc">82%</span></div>
            <div class="val" style="font-size:20px">82,3%</div></div><div class="sub">Taxa de conclusão</div></div>
          <div class="kpi"><div class="lab">Valor planejado</div><div class="mid">${this.icon(money,"#e8a33d")}<div class="val">R$ 0</div></div><div class="sub">Total contratos</div></div>
          <div class="kpi"><div class="lab">Valor realizado</div><div class="mid">${this.icon(money,"#1aab40")}<div class="val">R$ 0</div></div><div class="sub">0% do planejado</div></div>
          <div class="kpi"><div class="lab">Atrasos</div><div class="mid">${this.icon(warn,"#e8a33d")}<div class="val">25</div></div><div class="sub">Contratos em atraso</div></div>
        </div>`;
    }

    private curvePanelHtml(): string {
        let contract = `<div class="seg" style="flex-grow:.8;background:#4a3d8f"><b>Mob</b></div>`;
        for (let i = 1; i <= 12; i++) {
            contract += `<div class="seg" style="flex-grow:1;background:${i<=8?"#2f68bf":"#b2407e"}"><b>M${i}</b></div>`;
        }
        contract += `<div class="seg" style="flex-grow:.8;background:#23344a"><b>Desm.</b></div>`;
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
            <div class="years"><span>2019</span><span>2020</span><span>2021</span><span>2022</span><span>2023</span></div>
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

    private tableHtml(projectId: string, rows: Row[]): string {
        const body = rows.map(r => {
            const sq = r.ciclo.map(o => `<i class="${o ? "on" : ""}"></i>`).join("");
            return `<tr>
              <td><div class="c-main">${this.esc(r.contract)}</div><div class="c-sub">${this.esc(r.sub)}</div></td>
              <td>${this.esc(r.supplier)}</td>
              <td>${this.esc(r.portfolio)}</td>
              <td><div class="ciclo">${sq}</div></td>
              <td><div class="prog"><div class="t">${r.progress}%</div><div class="bar"><i style="width:${Math.max(0,Math.min(100,r.progress))}%"></i></div></div></td>
              <td class="r"><span class="money">${this.esc(r.contractValue)}</span></td>
              <td class="r"><span class="money">R$ 0</span> <span class="pct0">(${r.usedPct}%)</span></td>
              <td><span class="pill ${r.statusClass}">${this.esc(r.statusLabel)}</span></td>
            </tr>`;
        }).join("");
        return `<div class="panel">
          <h3>Contratos do Projeto <span class="mut">${this.esc(projectId)}</span></h3>
          <div class="tblwrap"><table>
            <thead><tr><th>Contrato</th><th>Fornecedor</th><th>Portfólio</th><th>Ciclo medições</th>
              <th>Progresso</th><th class="r">Valor contrato</th><th class="r">Valor utilizado</th><th>Status</th></tr></thead>
            <tbody>${body}</tbody>
          </table></div>
        </div>`;
    }

    // ---------- chart drawing ----------
    private drawChart(): void {
        const plot = this.root.querySelector(".plot") as HTMLElement;
        if (!plot) return;
        const grid = this.root.querySelector(".grid") as SVGGElement;
        const T0 = 2019, T1 = 2023.5, span = T1 - T0;
        const PX = (t: number) => (t - T0) / span * 1000;
        const PY = (v: number) => 270 - (v / 100) * 260;
        const logistic = (t: number, L: number, k: number, m: number) => L / (1 + Math.exp(-k * (t - m)));
        const buildPath = (fn: (t: number) => number) => {
            let d = "";
            for (let i = 0; i <= 120; i++) { const t = T0 + span * i / 120; d += (i ? "L" : "M") + PX(t).toFixed(1) + " " + PY(fn(t)).toFixed(1); }
            return d;
        };
        (this.root.querySelector(".plan") as SVGPathElement).setAttribute("d", buildPath(t => logistic(t, 99, 1.85, 2021.2)));
        (this.root.querySelector(".real") as SVGPathElement).setAttribute("d", buildPath(t => Math.min(86, logistic(t, 86, 1.7, 2021.55))));

        let g = "";
        [0, 20, 40, 60, 80, 100].forEach(v => {
            const y = PY(v);
            g += `<line x1="0" y1="${y}" x2="1000" y2="${y}" stroke="#203a58" stroke-width="1" stroke-dasharray="2 4" vector-effect="non-scaling-stroke"/>`;
        });
        const tdX = PX(2023.3);
        g += `<line x1="${tdX}" y1="6" x2="${tdX}" y2="274" stroke="#3d5a7e" stroke-width="1" stroke-dasharray="3 4" vector-effect="non-scaling-stroke"/>`;
        grid.innerHTML = g;

        const L = (t: number) => PX(t) / 1000 * 100;
        const Tp = (v: number) => PY(v) / 280 * 100;
        const marker = (t: number, v: number, label: string, color: string, dark: boolean) => {
            const d = document.createElement("div"); d.className = "mk";
            d.style.left = L(t) + "%"; d.style.top = Tp(v) + "%"; d.style.background = color;
            d.style.color = dark ? "#09131f" : "#fff"; d.textContent = label; plot.appendChild(d);
        };
        const callout = (t: number, v: number, title: string, date: string, cls: string, dy: number) => {
            const c = document.createElement("div"); c.className = "callout " + cls;
            c.style.left = L(t) + "%"; c.style.top = (Tp(v) + dy) + "%";
            c.innerHTML = `<b>${title}</b><span class="d">${date}</span>`; plot.appendChild(c);
        };
        callout(2021.17, 22, "Notificação", "01/03/2021", "amber", -4); marker(2021.17, 22, "N", "#ef8f2e", true);
        callout(2021.62, 40, "Aditivo", "15/07/2021", "red", -4);       marker(2021.54, 40, "A", "#e24c5b", false);
        marker(2023.30, 100, "TE", "#7a5cff", false);
        marker(2023.40, 100, "TR", "#2e9bff", false);
        marker(2023.49, 100, "TA", "#17b58f", true);
        callout(2023.33, 100, "TEC Assinado", "25/06/2023 · 28/03/2023", "teal", -6);
    }

    private esc(s: string): string {
        return `${s}`.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    public getFormattingModel(): powerbi.visuals.FormattingModel {
        return this.formattingSettingsService.buildFormattingModel(this.settings);
    }
}
