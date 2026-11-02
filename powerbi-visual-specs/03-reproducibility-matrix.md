# 03 — Matriz de reprodutibilidade em Custom Visuals (ponto 5)

Avaliação de quais características dos visuais nativos conseguimos reproduzir num
**Custom Visual** (SDK `powerbi-visuals-api`, renderização D3/SVG/Canvas no iframe
sandbox do Power BI).

> **Natureza desta seção:** as colunas *Propriedade* vêm de **observação** (specs extraídas).
> A coluna *Viabilidade* é **avaliação técnica/inferência** sobre o framework de Custom
> Visuals — não é garantia, é ponto de partida para validação.

Legenda de viabilidade: 🟢 direto · 🟡 dá, com esforço · 🔴 limitado pelo sandbox/host.

## Aparência / renderização

| Característica | Observado nos .pbix | Viabilidade | Observações |
|---|---|---|---|
| Paleta de cores (41 data colors) | `dataColors` do tema | 🟢 | Ler via `host.colorPalette` ou embutir os tokens |
| Cor por data point / condicional | `dataPoint.fill` `[cond]` | 🟢 | `createDataViewWildcardSelector` + selection |
| Tipografia (DIN/Segoe UI, tamanhos) | `textClasses`, `title.fontSize` | 🟡 | DIN é fonte do host; no sandbox usar `font-family` do tema ou fallback |
| Gridlines pontilhadas | `visualStyles.categoryAxis.gridlineStyle:"dotted"` | 🟢 | `stroke-dasharray` em SVG |
| Espessura de linha (3px) | `lineStyles.strokeWidth:3` | 🟢 | atributo `stroke-width` |
| Eixos (título on/off, start=0) | `categoryAxis`/`valueAxis` | 🟢 | d3-axis + flags da capabilities |
| Data labels (unidade, precisão) | `labels.labelDisplayUnits/Precision` | 🟢 | formatação com `valueFormatter` |
| Transparência de fundo/plot | `background.transparency` | 🟢 | `opacity` / rgba |
| Borda, drop shadow | `border`, `dropShadow` | 🟢 | CSS/SVG filter |
| Título do visual (texto, alinhamento) | `title.text/alignment` | 🟡 | nativo tem título do host; replicar dentro do visual |
| Cantos arredondados de barras | (checar por visual) | 🟢 | `rx`/`ry` em rect |

## Comportamento / interação

| Característica | Viabilidade | Observações |
|---|---|---|
| Cross-filter ao clicar (realce) | 🟢 | `ISelectionManager.select()` |
| Tooltips nativos | 🟢 | `ITooltipService` do host |
| Drill-down / hierarquia | 🟡 | suportado, exige modelar `dataViewMappings` |
| Context menu | 🟢 | `showContextMenu` |
| Painel de formatação (igual ao nativo) | 🟡 | `FormattingModel` reproduz os cards; layout difere um pouco |
| Responsividade / viewport | 🟢 | `update(options.viewport)` |

## Limitações conhecidas do sandbox (🔴/🟡)

- **Fontes licenciadas (DIN):** disponível quando o host injeta; não empacotar a fonte.
  Fallback recomendado: `"DIN", "Segoe UI", sans-serif`.
- **Pixel-perfect com o nativo:** o nativo usa a engine interna da Microsoft; vamos chegar
  perto, mas antialiasing/kerning podem diferir levemente. Validar com overlay.
- **Performance com muitos pontos:** nativo usa virtualização; em D3/SVG trocar para
  Canvas/WebGL acima de ~5–10k pontos.
- **Alguns cards do host** (ex.: `visualHeader`, `general` de posição) são controlados pelo
  Power BI, não pelo visual.

## Prioridade sugerida de implementação

Pela frequência de uso nos relatórios + valor de identidade visual:

1. `card` + `multiRowCard` (101+9) — base de tipografia/tokens, baixo risco
2. `donutChart` (46) e `columnChart`/`clusteredColumnChart` (14) — núcleo de gráficos
3. `lineChart` + combo (15) — eixos duplos, linhas
4. `kpi` / `gauge` — indicadores
5. `slicer` — interação (mais trabalhoso)

Tabelas (`tableEx`/`pivotTable`) e `textbox`/`shape`/`image` provavelmente **não** valem
Custom Visual — o nativo já resolve bem; focar nos gráficos.
