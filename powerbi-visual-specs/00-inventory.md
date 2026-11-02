# 00 — Inventário de visuais (ponto 1)

Observado dos 5 arquivos `.pbix`. Total: **498 visuais** em **21 páginas**.

## Por arquivo

| Arquivo | Páginas | Visuais |
|---|---|---|
| Resource_Histogram._Rev.01 | 3 | 220 |
| Análise_Major_Project | 5 | 149 |
| Controle_Gestão_NCC | 6 | 90 |
| Staff_Report | 6 | 38 |
| Dashboard_de_engenharia | 1 | 1 |

## Visuais NATIVOS (global, por frequência)

Estes são os alvos da nossa biblioteca de Custom Visuals.

| Tipo | Ocorrências | Categoria |
|---|---|---|
| `textbox` | 119 | Texto |
| `card` | 101 | Cartão (valor único) |
| `slicer` | 61 | Filtro/segmentação |
| `donutChart` | 46 | Rosca |
| `actionButton` | 13 | Botão |
| `lineClusteredColumnComboChart` | 11 | Combo linha+coluna |
| `pivotTable` | 11 | Matriz |
| `multiRowCard` | 9 | Cartão multilinha |
| `clusteredColumnChart` | 9 | Colunas agrupadas |
| `tableEx` | 8 | Tabela |
| `barChart` | 6 | Barras |
| `shape` | 6 | Forma |
| `kpi` | 5 | KPI |
| `image` | 5 | Imagem |
| `columnChart` | 5 | Colunas |
| `lineChart` | 4 | Linha |
| `pieChart` | 2 | Pizza |
| `gauge` | 1 | Medidor |
| `hundredPercentStackedBarChart` | 1 | Barras 100% empilhadas |
| `stackedAreaChart` | 1 | Área empilhada |
| `areaChart` | 1 | Área |
| `clusteredBarChart` | 1 | Barras agrupadas |

**22 tipos nativos** no total.

## Visuais CUSTOM (marketplace — NÃO nativos)

Identificados pelo id não-padrão (hash no nome). Não fazem parte do conjunto nativo;
são de terceiros e têm pacote próprio dentro do `.pbix`.

| Id do visual | Ocorrências | Provável |
|---|---|---|
| `simpleImageEBC4593F96F1425FB3D84C5BF02B5075` | 10 | Imagem simples |
| `Gantt1448688115699` | 2 | Gantt |
| `RadarChart1446119667547` | 2 | Radar |
| `GanttChart4C3653EFFFEB4E7DA5A699CE198391E2` | 1 | Gantt (2ª variante) |
| `PBI_CV_9272D058_BEA0_476A_B090_A712545F92FA` | 1 | Custom Visual genérico |

> Visuais `(unknown)` nas análises brutas são contêineres sem `visualType`
> (grupos de visuais, ou containers vazios) — não são um tipo renderizável.
