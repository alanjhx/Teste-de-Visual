# JUR Dashboard (REA) — Power BI Custom Visual

O dashboard físico-financeiro de contratos (projeto JUR00140) reproduzido como
**um único Custom Visual** do Power BI, aplicando os tokens de engenharia reversa
(`../../powerbi-visual-specs/`): tema escuro, radius 10, gridlines pontilhadas,
stroke 3px, tipografia DIN/Segoe.

Renderiza o dashboard completo: **7 cards de KPI**, **curva S** (planejado x realizado)
com marcos (Notificação, TEC, Aditivo), **faixas de fase** (FEL/Execution/Closeout e
Mob/M1–M12) e **tabela de contratos**.


## Campos preparados (field wells)

Agrupamento: Contrato (número), Número do projeto, Número do BM, Fornecedor,
Portfólio, Status, Fase do projeto, Data de início, Data de término,
Data da notificação, Aditivo, Data do aditivo, Data de assinatura da TEC, Status da TEC.
Medidas: Valor contratado, Valor utilizado.

Sem campos ligados → dados de exemplo. Com campos ligados, o visual calcula:
tabela de contratos, KPIs (contratos/ativos/encerrados/atrasos, valores, % utilizado),
código e data de encerramento do projeto, e posiciona os marcos (Notificação/Aditivo/
TEC) na curva pelas datas reais, com eixo de tempo dinâmico pelas datas de início/término.

## Dados
- Sem campos ligados → mostra **dados de exemplo** (para ver na hora que importar).
- A **tabela de contratos** aceita campos reais: arraste em *Contrato, Fornecedor,
  Status, Progresso, Valor contrato, Valor utilizado*.
- KPIs e curva S ainda usam valores de exemplo (próxima etapa: ligar ao modelo).

## Formatação (painel)
Card **Projeto**: código do projeto, data de encerramento, cor de destaque.

## Rodar local
```bash
npm install
npx pbiviz package      # gera dist/*.pbiviz
# ou: npx pbiviz start  # modo dev no Power BI (Developer Visual)
```
Importar no Power BI Desktop: Visualizações → ⋯ → Importar um visual de um arquivo.

## Observações
- Os 3 avisos de lint `no-inner-outer-html` não bloqueiam o uso; para certificação
  de marketplace, trocar `innerHTML` por construção de DOM.
- Reproduz aparência/identidade; não é o código da Microsoft.
