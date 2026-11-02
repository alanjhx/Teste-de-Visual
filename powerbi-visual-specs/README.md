# Biblioteca de Especificações Visuais — Power BI (engenharia reversa)

Resultado de uma investigação técnica, no estilo **REA (Reverse Engineer Anything)**,
sobre **como os visuais nativos do Power BI são construídos**, a partir de 5 relatórios
`.pbix` reais. O objetivo é servir de base para desenvolvermos uma **biblioteca própria
de Custom Visuals** que reproduza, com a maior fidelidade técnica possível, a identidade
visual dos gráficos nativos.

## ⚠️ Honestidade técnica (leia antes de usar)

- Tudo aqui foi **observado dos arquivos `.pbix` fornecidos** — que são pacotes ZIP (OPC)
  contendo o `Report/Layout` (JSON em UTF-16LE) e o tema base (`BaseThemes/*.json`).
- **Nenhuma propriedade foi inventada.** Só está documentado o que aparece nos artefatos.
- Isto **não** é o código-fonte original da Microsoft, nem a engine de renderização.
  São as **declarações de configuração** que o Power BI grava no relatório.
- O **modelo de dados** (`DataModel`, formato binário VertiPaq) **não** foi decodificado —
  não é necessário para o objetivo visual.
- Valores marcados `[cond]` são de **formatação condicional** (mudam por categoria/regra).

## Como foi feito (metodologia REA)

1. **Rotear o alvo:** `.pbix` → arquivo ZIP → inventário de membros.
2. **Extrair** `Report/Layout` (UTF-16LE JSON) e os temas base.
3. **Percorrer** `sections` (páginas) → `visualContainers` → `config.singleVisual`.
4. **Resolver** cada expressão de propriedade (`expr.Literal.Value`, `fill.solid.color`,
   `ThemeDataColor`) para um valor limpo.
5. **Agregar** por tipo de visual nativo, deduplicando valores e registrando em quais
   arquivos cada propriedade apareceu.
6. **Documentar** numa biblioteca reutilizável (tokens + specs + dados brutos).

Os scripts que fazem isso são reproduzíveis (ver seção *Reproduzir*).

## Estrutura da biblioteca

| Arquivo | Conteúdo | Ponto do briefing |
|---|---|---|
| `00-inventory.md` | Visuais nativos e custom por arquivo | 1 |
| `design-tokens.json` | Paleta, tipografia, gridlines, defaults do tema | 3 |
| `02-visual-specs.md` | Propriedades observadas por tipo de visual | 2, 3 |
| `03-reproducibility-matrix.md` | O que dá pra reproduzir em Custom Visual | 5 |
| `spec_library.json` | Base **legível por máquina** de tudo (fonte da verdade) | 6 |
| `themes_summary.json` | Temas base completos encontrados | 3 |
| `raw-analysis/*.json` | Dump normalizado por arquivo (páginas, posições, configs) | — |

## Resumo dos achados

- **5 relatórios**, **498 visuais** no total, **21 páginas**.
- **22 tipos de visuais nativos** usados e documentados.
- **5 visuais custom** (marketplace) detectados: Radar, Gantt (2 variantes),
  simpleImage e um Custom Visual genérico (`PBI_CV_…`).
- **Tema base:** `CY24SU02` (padrão atual do Power BI) — paleta de 41 cores de dados,
  tipografia **DIN** (títulos/callout) + **Segoe UI** (labels/headers), gridlines
  **pontilhadas**, espessura de linha padrão **3px**.

## Pendente (ponto 4 do briefing)

> "Verificar quais bibliotecas e componentes gráficos estão disponíveis na instalação
> local do Power BI Desktop."

Isso exige os **arquivos de instalação do Power BI Desktop (~1 GB)**, que não couberam
no upload (limite de 30 MB nesta sessão). Esse passo será feito **localmente no seu VS Code**
(ou numa sessão com acesso ao diretório de instalação). O alvo lá serão os pacotes do
app (ex.: `visuals`, `webPackages`, os bundles do motor de renderização), que a REA
roteia como análise de árvore JavaScript/Electron.

## Reproduzir / atualizar

Os scripts de extração estão fora do repositório (no scratchpad da sessão). Fluxo:

```bash
# 1) extrair layout+tema de cada .pbix para JSON normalizado
python3 pbix_extract.py out/analysis <arquivo1.pbix> <arquivo2.pbix> ...

# 2) agregar em biblioteca de specs + resumo de temas
python3 pbix_spec.py out/analysis out/spec

# 3) gerar design-tokens.json e 02-visual-specs.md
python3 pbix_docs.py out/spec/spec_library.json out/spec/themes_summary.json <destino>
```

## Próximo passo sugerido

Escolher 1 ou 2 visuais-âncora (ex.: `columnChart` e `donutChart`) e construir o primeiro
Custom Visual de referência usando `design-tokens.json` + a spec do visual, validando
pixel a pixel contra o nativo.
