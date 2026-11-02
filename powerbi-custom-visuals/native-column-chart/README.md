# Native Column Chart (REA) — Power BI Custom Visual

Primeiro componente da nossa biblioteca própria de Custom Visuals. Reproduz a
**identidade visual nativa** do gráfico de colunas do Power BI, aplicando os tokens
extraídos na engenharia reversa (ver `../../powerbi-visual-specs/`):

- **Gridlines pontilhadas** por padrão (`gridlineStyle: "dotted"` — token nativo)
- **Cantos superiores arredondados** nas colunas (raio configurável)
- **Cores do tema** via `host.colorPalette` (paleta CY24SU02) + cor por ponto
- **Tipografia Segoe UI**, eixo de valor sem linha de domínio (como o nativo)
- **Realce/cross-filter** (`ISelectionManager`) e **tooltips** nativos

## Painel de formatação (cards)

Espelham as "cards" nativas observadas nos `.pbix`:

| Card | Propriedades |
|---|---|
| Cores dos dados | cor padrão, raio dos cantos |
| Eixo de categoria | mostrar, tamanho do texto, cor |
| Eixo de valor | mostrar, início, linhas de grade, estilo da grade, cor |
| Rótulos de dados | mostrar, cor, tamanho, casas decimais |

## Como rodar (local, no seu VS Code)

Pré-requisitos: **Node 18+** e o certificado do pbiviz instalado uma vez.

```bash
npm install
npm i -g powerbi-visuals-tools    # fornece o comando `pbiviz`
pbiviz --install-cert             # instala o certificado (só na 1ª vez)
pbiviz start                      # modo dev: abre no Power BI Desktop/Service via "Developer Visual"
pbiviz package                    # gera o .pbiviz em dist/ para importar
```

No **Power BI Desktop**: habilite *Opções > Recursos de visualização > Visual de desenvolvedor*,
adicione o "Developer Visual" ao relatório e arraste **Categoria** + **Valores**.

## Estrutura

```
pbiviz.json         # metadados do visual
capabilities.json   # data roles, mappings e objects (formatação)
src/visual.ts       # render D3 + lógica (IVisual)
src/settings.ts     # modelo de formatação (cards do painel)
style/visual.less   # estilos
assets/icon.png     # ícone
```

## Fidelidade — honestidade

Reproduz a **aparência e o comportamento** do visual nativo com base nos tokens
observados; **não** é o código da Microsoft. Diferenças finas de antialiasing/kerning
e animações nativas podem existir. Validar com overlay contra o nativo.
