# Especificações por visual nativo (observado dos .pbix)

> Cada propriedade abaixo foi **observada** nos arquivos `.pbix` fornecidos. 
Valores são os realmente encontrados; `[cond]` = formatação condicional 
(varia por categoria/regra). Isto **não** é o código-fonte da Microsoft.


## `actionButton`  —  13 instância(s)


**border**

| propriedade | valores observados |
|---|---|
| `show` | false |

**general**

| propriedade | valores observados |
|---|---|
| `altText` | "Visão Geral\n" |
| `keepLayerOrder` | false |

**icon**

| propriedade | valores observados |
|---|---|
| `lineColor` `[cond]` | {"themeColor": 2, "percent": 0} |
| `shapeType` `[cond]` | "back", "blank" |

**outline**

| propriedade | valores observados |
|---|---|
| `show` | false |

**text**

| propriedade | valores observados |
|---|---|
| `show` | false |
| `text` `[cond]` | "Visão Geral" |

**title**

| propriedade | valores observados |
|---|---|
| `show` | false |
| `text` | "V" |

**visualHeader**

| propriedade | valores observados |
|---|---|
| `show` | true |

**visualLink**

| propriedade | valores observados |
|---|---|
| `navigationSection` | "ReportSection3a95da12fbf3e1248a34", "ReportSection11c2732470a139c5abbd", "ReportSection5abea5ebd8ea5aab2ca2", "ReportSectiond4ec374b77da3f4a5c2e", "ReportSection5248d4ce4d9346dfb4a2", "ReportSectionf68490740ae6a0e09b2c", … (+2) |
| `show` | true |
| `type` | "Back", "PageNavigation" |

## `areaChart`  —  1 instância(s)


**border**

| propriedade | valores observados |
|---|---|
| `color` | {"themeColor": 0, "percent": -0.2} |
| `radius` | 12 |
| `show` | true |

**dataPoint**

| propriedade | valores observados |
|---|---|
| `fill` `[cond]` | "#ECB31A" |

**labels**

| propriedade | valores observados |
|---|---|
| `show` | true |

**lineStyles**

| propriedade | valores observados |
|---|---|
| `showMarker` | true |

**title**

| propriedade | valores observados |
|---|---|
| `alignment` | "center" |
| `text` | "Qtde. de Projetos por Complexidade" |

**zoom**

| propriedade | valores observados |
|---|---|
| `show` | false |

## `barChart`  —  6 instância(s)


**background**

| propriedade | valores observados |
|---|---|
| `show` | true |

**border**

| propriedade | valores observados |
|---|---|
| `color` | {"themeColor": 0, "percent": -0.2} |
| `radius` | 12 |
| `show` | true |

**categoryAxis**

| propriedade | valores observados |
|---|---|
| `concatenateLabels` | true |
| `maxMarginFactor` | 42 |
| `preferredCategoryWidth` | 20 |
| `showAxisTitle` | true |
| `switchAxisPosition` | false |

**dataPoint**

| propriedade | valores observados |
|---|---|
| `fill` `[cond]` | {"themeColor": 3, "percent": 0}, {"themeColor": 2, "percent": 0.6}, {"themeColor": 2, "percent": 0.4}, {"themeColor": 2, "percent": 0.2}, {"themeColor": 2, "percent": -0.25}, {"themeColor": 8, "percent": 0.4}, … (+13) |
| `showAllDataPoints` | false |

**dropShadow**

| propriedade | valores observados |
|---|---|
| `color` | {"themeColor": 1, "percent": 0.6} |
| `preset` | "Custom" |
| `shadowBlur` | 1 |
| `shadowDistance` | 1 |
| `shadowSpread` | 0 |
| `show` | true, false |

**labels**

| propriedade | valores observados |
|---|---|
| `labelPosition` | "OutsideEnd" |
| `show` | true |

**legend**

| propriedade | valores observados |
|---|---|
| `show` | true |
| `showGradientLegend` | true |

**title**

| propriedade | valores observados |
|---|---|
| `alignment` | "center" |
| `fontSize` | 11 |
| `text` | "Qtd Projeto/ Portifólio & Phase", "Qtde. de Projetos por Líder", "Qtd. de projetos por fase de RFA" |

**totals**

| propriedade | valores observados |
|---|---|
| `show` | true |

**valueAxis**

| propriedade | valores observados |
|---|---|
| `show` | false |

**zoom**

| propriedade | valores observados |
|---|---|
| `show` | false |

## `card`  —  101 instância(s)


**background**

| propriedade | valores observados |
|---|---|
| `color` | {"themeColor": 0, "percent": 0} |
| `show` | true, false |
| `transparency` | 0 |

**border**

| propriedade | valores observados |
|---|---|
| `color` | "#DADADA", {"themeColor": 0, "percent": -0.2} |
| `radius` | 4, 12 |
| `show` | false, true |

**categoryLabels**

| propriedade | valores observados |
|---|---|
| `color` | {"themeColor": 2, "percent": 0.6} |
| `fontSize` | 10, 8, 12, 11 |
| `show` | false |

**dropShadow**

| propriedade | valores observados |
|---|---|
| `angle` | 225 |
| `color` | {"themeColor": 1, "percent": 0.6} |
| `preset` | "Custom", "TopLeft" |
| `shadowBlur` | 1, 10 |
| `shadowDistance` | 1, 10 |
| `shadowSpread` | 0, 3 |
| `show` | true, false |
| `transparency` | 70 |

**labels**

| propriedade | valores observados |
|---|---|
| `bold` | true |
| `color` | {"themeColor": 3, "percent": 0}, {"themeColor": 2, "percent": 0.6}, {"themeColor": 1, "percent": 0.2}, {"themeColor": 0, "percent": 0} |
| `fontSize` | 28, 8, 20, 17, 24, 30, … (+4) |
| `labelDisplayUnits` | 1000000, 1 |
| `labelPrecision` | 0, 2 |
| `preserveWhitespace` | false |

**padding**

| propriedade | valores observados |
|---|---|
| `bottom` | 0, 5, 19 |
| `left` | 0 |
| `right` | 0 |
| `top` | 0, 20, 15 |

**subTitle**

| propriedade | valores observados |
|---|---|
| `show` | false |

**title**

| propriedade | valores observados |
|---|---|
| `alignment` | "center" |
| `show` | false |
| `text` | "Accumulated", "Cartão hh Smelter", "Qtde. de Projetos em " |

**visualHeader**

| propriedade | valores observados |
|---|---|
| `show` | false |

**wordWrap**

| propriedade | valores observados |
|---|---|
| `show` | false |

## `clusteredBarChart`  —  1 instância(s)


**border**

| propriedade | valores observados |
|---|---|
| `color` | {"themeColor": 0, "percent": -0.2} |
| `radius` | 12 |
| `show` | true |

**dataPoint**

| propriedade | valores observados |
|---|---|
| `fill` `[cond]` | "#EE9133", "#005890" |

**labels**

| propriedade | valores observados |
|---|---|
| `show` | true |

**title**

| propriedade | valores observados |
|---|---|
| `alignment` | "center" |
| `text` | "Qtde. de projetos com risco" |

## `clusteredColumnChart`  —  9 instância(s)


**background**

| propriedade | valores observados |
|---|---|
| `show` | false, true |
| `transparency` | 0 |

**border**

| propriedade | valores observados |
|---|---|
| `color` | "#DADADA", {"themeColor": 0, "percent": -0.2} |
| `radius` | 5, 12 |
| `show` | false, true |

**categoryAxis**

| propriedade | valores observados |
|---|---|
| `fontSize` | 8 |
| `gridlineShow` | false |
| `innerPadding` | 15 |
| `preferredCategoryWidth` | 66 |
| `show` | true |
| `showAxisTitle` | false |

**dataPoint**

| propriedade | valores observados |
|---|---|
| `fill` `[cond]` | {"themeColor": 0, "percent": -0.2}, {"themeColor": 2, "percent": 0}, "#FF6565", {"themeColor": 9, "percent": 0.2}, {"themeColor": 3, "percent": 0}, {"themeColor": 4, "percent": 0}, … (+3) |

**dropShadow**

| propriedade | valores observados |
|---|---|
| `color` | {"themeColor": 1, "percent": 0.6}, {"themeColor": 1, "percent": 0} |
| `preset` | "Custom" |
| `shadowBlur` | 1 |
| `shadowDistance` | 1 |
| `shadowSpread` | 0 |
| `show` | false |

**error**

| propriedade | valores observados |
|---|---|
| `barShow` `[cond]` | false |
| `enabled` `[cond]` | false |
| `errorRange` `[cond]` | {"_complex": ["kind", "percentage"]}, {"_complex": ["kind", "explicit"]} |
| `labelShow` `[cond]` | false |
| `tooltipFormat` `[cond]` | "range" |
| `tooltipShow` `[cond]` | false |

**labels**

| propriedade | valores observados |
|---|---|
| `dynamicLabelValue` `[cond]` | "" |
| `fontSize` | 8 |
| `labelPrecision` | 0 |
| `show` | true |

**legend**

| propriedade | valores observados |
|---|---|
| `position` | "LeftCenter" |
| `show` | false |
| `showGradientLegend` | false |
| `showTitle` | false |

**padding**

| propriedade | valores observados |
|---|---|
| `bottom` | 0 |
| `left` | 0 |
| `right` | 20, 0 |
| `top` | 15, 10, 0 |

**referenceLine**

| propriedade | valores observados |
|---|---|
| `dataLabelColor` `[cond]` | {"themeColor": 2, "percent": 0} |
| `dataLabelHorizontalPosition` `[cond]` | "left" |
| `dataLabelShow` `[cond]` | true |
| `dataLabelText` `[cond]` | "Name" |
| `dataLabelVerticalPosition` `[cond]` | "under", "above" |
| `displayName` `[cond]` | "105%", "95%" |
| `lineColor` `[cond]` | {"themeColor": 2, "percent": 0} |
| `position` `[cond]` | "back", "front" |
| `show` `[cond]` | true |
| `transparency` `[cond]` | 10, 30, 60, 20 |
| `value` `[cond]` | {"_complex": ["Percentile"]} |

**title**

| propriedade | valores observados |
|---|---|
| `alignment` | "center" |
| `fontSize` | 11 |
| `show` | false |
| `text` | "", "Projetos no Plano CapEx" |

**valueAxis**

| propriedade | valores observados |
|---|---|
| `end` | {"_complex": ["Aggregation"]} |
| `gridlineShow` | false |
| `invertAxis` | false |
| `show` | false |
| `showAxisTitle` | false |
| `start` | 0 |

**y1AxisReferenceLine**

| propriedade | valores observados |
|---|---|
| `dataLabelShow` `[cond]` | true |
| `dataLabelVerticalPosition` `[cond]` | "under" |
| `displayName` `[cond]` | "105%", "95%" |
| `show` `[cond]` | true |
| `transparency` `[cond]` | 10 |
| `value` `[cond]` | 1.05, 0.95 |

## `columnChart`  —  5 instância(s)


**background**

| propriedade | valores observados |
|---|---|
| `show` | true |

**border**

| propriedade | valores observados |
|---|---|
| `color` | {"themeColor": 0, "percent": -0.2} |
| `radius` | 10 |
| `show` | true |

**categoryAxis**

| propriedade | valores observados |
|---|---|
| `concatenateLabels` | false |
| `showAxisTitle` | false |

**dataPoint**

| propriedade | valores observados |
|---|---|
| `fill` `[cond]` | {"themeColor": 2, "percent": 0}, {"themeColor": 3, "percent": 0}, {"themeColor": 4, "percent": 0}, {"themeColor": 5, "percent": 0}, {"themeColor": 0, "percent": -0.1}, "#EE9133", … (+2) |

**dropShadow**

| propriedade | valores observados |
|---|---|
| `color` | {"themeColor": 1, "percent": 0.6}, {"themeColor": 1, "percent": 0} |
| `preset` | "Custom" |
| `shadowBlur` | 1 |
| `shadowDistance` | 1 |
| `shadowSpread` | 0 |
| `show` | true, false |

**labels**

| propriedade | valores observados |
|---|---|
| `labelDisplayUnits` `[cond]` | 1 |
| `labelPrecision` `[cond]` | 0 |
| `show` | true |

**legend**

| propriedade | valores observados |
|---|---|
| `showTitle` | false |

**title**

| propriedade | valores observados |
|---|---|
| `alignment` | "center" |
| `fontSize` | 11 |
| `text` | "Resource Histogram", "Qtde. de Projetos por Área" |

**totals**

| propriedade | valores observados |
|---|---|
| `show` | true |

**valueAxis**

| propriedade | valores observados |
|---|---|
| `showAxisTitle` | false |
| `start` | 0 |

**y1AxisReferenceLine**

| propriedade | valores observados |
|---|---|
| `dataLabelColor` `[cond]` | {"themeColor": 9, "percent": 0} |
| `dataLabelShow` `[cond]` | true, false |
| `dataLabelText` `[cond]` | "ValueAndName" |
| `displayName` `[cond]` | "HN", "HE" |
| `lineColor` `[cond]` | {"themeColor": 9, "percent": 0} |
| `show` `[cond]` | true |
| `style` `[cond]` | "dashed" |
| `transparency` `[cond]` | 100, 50 |
| `value` `[cond]` | {"_complex": ["Measure"]}, 480 |

## `donutChart`  —  46 instância(s)


**background**

| propriedade | valores observados |
|---|---|
| `show` | true, false |
| `transparency` | 0 |

**border**

| propriedade | valores observados |
|---|---|
| `color` | "#DADADA", {"themeColor": 0, "percent": -0.2} |
| `radius` | 4, 5, 12 |
| `show` | false, true |

**dataPoint**

| propriedade | valores observados |
|---|---|
| `fill` `[cond]` | "#F24F4F", {"themeColor": 4, "percent": 0.2}, {"themeColor": 6, "percent": 0.2}, {"themeColor": 2, "percent": 0.6}, {"themeColor": 3, "percent": 0}, {"themeColor": 3, "percent": 0.6}, … (+12) |

**dropShadow**

| propriedade | valores observados |
|---|---|
| `color` | {"themeColor": 1, "percent": 0.6} |
| `preset` | "Custom" |
| `shadowBlur` | 1 |
| `shadowDistance` | 1 |
| `shadowSpread` | 0 |
| `show` | true, false |

**labels**

| propriedade | valores observados |
|---|---|
| `background` | "off" |
| `bold` | true |
| `fontSize` | 8, 10 |
| `labelDisplayUnits` | 0, 1000000, 1 |
| `labelPrecision` | 0 |
| `labelStyle` | "Category, data value, percent of total", "Data", "Percent of total", "Both" |
| `overflow` | false, true |
| `percentageLabelPrecision` | 0 |
| `position` | "inside" |
| `show` | true, false |

**legend**

| propriedade | valores observados |
|---|---|
| `position` | "Top" |
| `show` | false, true |
| `showTitle` | false |

**lockAspect**

| propriedade | valores observados |
|---|---|
| `show` | false |

**padding**

| propriedade | valores observados |
|---|---|
| `bottom` | 0 |
| `left` | 0, 20 |
| `right` | 20, 0 |
| `top` | 20, 0 |

**slices**

| propriedade | valores observados |
|---|---|
| `innerRadiusRatio` | 60 |
| `startAngle` | 342, 78, 0, 1, 2 |

**title**

| propriedade | valores observados |
|---|---|
| `alignment` | "center" |
| `fontColor` | {"themeColor": 1, "percent": 0} |
| `fontFamily` | "wf_standard-font, helvetica, arial, sans-serif" |
| `fontSize` | 11, 14 |
| `show` | true, false |
| `text` | "Qtd Projeto/  Plano Underover", "Qtd projetos ", "Distribuição R$", "", "Estratégia de Execução" |
| `titleWrap` | true |

**visualHeader**

| propriedade | valores observados |
|---|---|
| `show` | false |

## `gauge`  —  1 instância(s)


**background**

| propriedade | valores observados |
|---|---|
| `show` | true |
| `transparency` | 0 |

**border**

| propriedade | valores observados |
|---|---|
| `color` | "#E6E6E6" |
| `radius` | 4 |
| `show` | true |

**calloutValue**

| propriedade | valores observados |
|---|---|
| `labelPrecision` | 1 |

**dataPoint**

| propriedade | valores observados |
|---|---|
| `fill` `[cond]` | {"themeColor": 2, "percent": 0}, {"themeColor": 3, "percent": 0}, {"themeColor": 6, "percent": 0} |

**dropShadow**

| propriedade | valores observados |
|---|---|
| `color` | {"themeColor": 1, "percent": 0.6} |
| `preset` | "Custom" |
| `shadowBlur` | 0 |
| `shadowDistance` | 1 |
| `shadowSpread` | 0 |
| `show` | true |
| `transparency` | 50 |

**labels**

| propriedade | valores observados |
|---|---|
| `labelPrecision` | 0 |

**title**

| propriedade | valores observados |
|---|---|
| `alignment` | "center" |
| `fontSize` | 12 |
| `text` | "% Duração" |
| `titleWrap` | true |

## `hundredPercentStackedBarChart`  —  1 instância(s)


**background**

| propriedade | valores observados |
|---|---|
| `show` | false |

**categoryAxis**

| propriedade | valores observados |
|---|---|
| `show` | true |
| `showAxisTitle` | false |

**labels**

| propriedade | valores observados |
|---|---|
| `enableBackground` | true |
| `labelPosition` | "OutsideEnd" |
| `show` | true |

**title**

| propriedade | valores observados |
|---|---|
| `text` | "" |

**valueAxis**

| propriedade | valores observados |
|---|---|
| `show` | false |
| `showAxisTitle` | false |

## `image`  —  5 instância(s)


**border**

| propriedade | valores observados |
|---|---|
| `show` | false |

**general**

| propriedade | valores observados |
|---|---|
| `imageUrl` | {"_complex": ["ResourcePackageItem"]} |

## `kpi`  —  5 instância(s)


**background**

| propriedade | valores observados |
|---|---|
| `color` | {"themeColor": 0, "percent": 0} |
| `show` | true, false |
| `transparency` | 0 |

**border**

| propriedade | valores observados |
|---|---|
| `color` | "#DADADA" |
| `radius` | 4 |
| `show` | false |

**goals**

| propriedade | valores observados |
|---|---|
| `direction` | "Low is good" |
| `distanceLabel` | "Value", "Value, percent" |
| `fontSize` | 16, 8 |
| `goalText` | "Planned" |
| `labelPrecision` | 2 |
| `showDistance` | false, true |
| `showGoal` | true |

**indicator**

| propriedade | valores observados |
|---|---|
| `fontSize` | 27, 26 |
| `indicatorDisplayUnits` | 1000000 |
| `indicatorPrecision` | 0 |
| `showIcon` | true |

**lastDate**

| propriedade | valores observados |
|---|---|
| `show` | false |

**status**

| propriedade | valores observados |
|---|---|
| `direction` | "Positive" |

**title**

| propriedade | valores observados |
|---|---|
| `alignment` | "center" |
| `show` | false |
| `text` | "Acumulado" |
| `titleWrap` | false |

**trendline**

| propriedade | valores observados |
|---|---|
| `show` | true |

**visualHeader**

| propriedade | valores observados |
|---|---|
| `show` | false |

## `lineChart`  —  4 instância(s)


**background**

| propriedade | valores observados |
|---|---|
| `show` | true, false |

**border**

| propriedade | valores observados |
|---|---|
| `color` | "#E6E6E6" |
| `radius` | 4 |
| `show` | true |

**categoryAxis**

| propriedade | valores observados |
|---|---|
| `axisType` | "Categorical" |
| `concatenateLabels` | false |
| `fontSize` | 10 |
| `gridlineShow` | false |
| `maxMarginFactor` | 28 |
| `show` | true |
| `showAxisTitle` | false |

**dataPoint**

| propriedade | valores observados |
|---|---|
| `fill` `[cond]` | {"themeColor": 2, "percent": 0}, {"themeColor": 3, "percent": 0}, {"themeColor": 6, "percent": 0}, {"themeColor": 5, "percent": 0}, {"themeColor": 4, "percent": 0}, {"themeColor": 9, "percent": 0.2} |

**dropShadow**

| propriedade | valores observados |
|---|---|
| `color` | {"themeColor": 1, "percent": 0.6} |
| `preset` | "Custom" |
| `shadowBlur` | 0 |
| `shadowDistance` | 1 |
| `shadowSpread` | 0 |
| `show` | true |
| `transparency` | 50 |

**labels**

| propriedade | valores observados |
|---|---|
| `show` | true |

**legend**

| propriedade | valores observados |
|---|---|
| `show` | true |

**lineStyles**

| propriedade | valores observados |
|---|---|
| `lineStyle` `[cond]` | "dashed" |
| `markerSize` | 4 |
| `showMarker` | true |
| `strokeWidth` `[cond]` | 2, 3, 1 |

**title**

| propriedade | valores observados |
|---|---|
| `alignment` | "center" |
| `fontSize` | 12 |
| `show` | false, true |
| `text` | "Planned in the period", "Curva de Avanço Financeiro" |

**valueAxis**

| propriedade | valores observados |
|---|---|
| `end` | 1 |
| `fontSize` | 10 |
| `gridlineShow` | false |
| `labelDisplayUnits` | 1000000 |
| `labelPrecision` | 0 |
| `logAxisScale` | true |
| `show` | true, false |
| `showAxisTitle` | false |
| `start` | 0.3 |

**xAxisReferenceLine**

| propriedade | valores observados |
|---|---|
| `dataLabelColor` `[cond]` | {"themeColor": 3, "percent": 0} |
| `dataLabelShow` `[cond]` | true |
| `displayName` `[cond]` | "Linha Constante do Eixo X 1" |
| `lineColor` `[cond]` | {"themeColor": 3, "percent": 0.4} |
| `shadeColor` `[cond]` | {"themeColor": 3, "percent": 0.6} |
| `shadeRegion` `[cond]` | "after" |
| `shadeTransparency` `[cond]` | 70 |
| `show` `[cond]` | true |
| `value` `[cond]` | {"_complex": ["Measure"]} |

**y2Axis**

| propriedade | valores observados |
|---|---|
| `secLogAxisScale` | false |
| `show` | true |

## `lineClusteredColumnComboChart`  —  11 instância(s)


**background**

| propriedade | valores observados |
|---|---|
| `show` | true, false |

**border**

| propriedade | valores observados |
|---|---|
| `color` | "#E6E6E6" |
| `radius` | 4 |
| `show` | true |

**categoryAxis**

| propriedade | valores observados |
|---|---|
| `concatenateLabels` | true, false |
| `fontSize` | 9, 10, 8 |
| `gridlineShow` | false |
| `maxMarginFactor` | 15, 28 |
| `preferredCategoryWidth` | 180 |
| `show` | true, false |
| `showAxisTitle` | false |

**dataPoint**

| propriedade | valores observados |
|---|---|
| `borderShow` `[cond]` | false |
| `fill` `[cond]` | {"themeColor": 2, "percent": 0.2}, {"themeColor": 4, "percent": 0.6}, {"themeColor": 0, "percent": -0.2}, {"themeColor": 2, "percent": 0}, {"themeColor": 3, "percent": 0}, {"themeColor": 4, "percent": 0}, … (+4) |

**dropShadow**

| propriedade | valores observados |
|---|---|
| `color` | {"themeColor": 1, "percent": 0.6} |
| `preset` | "Custom" |
| `shadowBlur` | 1, 0 |
| `shadowDistance` | 1 |
| `shadowSpread` | 0 |
| `show` | true |
| `transparency` | 70, 50 |

**labels**

| propriedade | valores observados |
|---|---|
| `dynamicLabelValue` `[cond]` | "" |
| `enableBackground` `[cond]` | false, true |
| `enableDetailDataLabel` `[cond]` | false |
| `enableTitleDataLabel` `[cond]` | false |
| `fontSize` | 9 |
| `labelDisplayUnits` `[cond]` | 1000000, 0 |
| `labelPosition` `[cond]` | "Under", "OutsideEnd", "Above" |
| `labelPrecision` `[cond]` | 1, 0 |
| `optimizeLabelDisplay` `[cond]` | false |
| `show` | true |

**legend**

| propriedade | valores observados |
|---|---|
| `fontSize` | 10 |
| `position` | "Top" |
| `show` | true |
| `showTitle` | false |

**lineStyles**

| propriedade | valores observados |
|---|---|
| `lineStyle` `[cond]` | "dashed" |
| `markerColor` | {"themeColor": 2, "percent": 0} |
| `markerSize` | 5 |
| `showMarker` | true |
| `strokeWidth` | 2 |

**padding**

| propriedade | valores observados |
|---|---|
| `bottom` | 5 |
| `top` | 0, 15, 20 |

**title**

| propriedade | valores observados |
|---|---|
| `alignment` | "center" |
| `fontSize` | 11, 12 |
| `text` | "Distribuição Handouver Ano", "Distribuição Status Cronograma", "Planned in the period", "" |

**valueAxis**

| propriedade | valores observados |
|---|---|
| `end` | 16, 30000, 64000000 |
| `fontSize` | 10 |
| `gridlineShow` | false |
| `secShow` | true |
| `secShowAxisTitle` | false |
| `show` | false |
| `showAxisTitle` | false |
| `start` | 0 |

**zoom**

| propriedade | valores observados |
|---|---|
| `show` | false |

## `multiRowCard`  —  9 instância(s)


**background**

| propriedade | valores observados |
|---|---|
| `show` | true |

**card**

| propriedade | valores observados |
|---|---|
| `barColor` | {"themeColor": 5, "percent": 0}, {"themeColor": 2, "percent": 0}, {"themeColor": 9, "percent": 0.2} |
| `cardPadding` | 20 |
| `outlineStyle` | 0 |

**categoryLabels**

| propriedade | valores observados |
|---|---|
| `fontSize` | 10, 12 |

**dataLabels**

| propriedade | valores observados |
|---|---|
| `fontSize` | 22, 20, 26 |

**dropShadow**

| propriedade | valores observados |
|---|---|
| `color` | {"themeColor": 1, "percent": 0.6} |
| `preset` | "Custom" |
| `shadowBlur` | 1 |
| `shadowDistance` | 1 |
| `shadowSpread` | 0 |
| `show` | true |

**padding**

| propriedade | valores observados |
|---|---|
| `bottom` | 0 |
| `left` | 5 |
| `top` | 15 |

**visualHeader**

| propriedade | valores observados |
|---|---|
| `show` | false |

## `pieChart`  —  2 instância(s)


**border**

| propriedade | valores observados |
|---|---|
| `color` | {"themeColor": 0, "percent": -0.2} |
| `radius` | 12 |
| `show` | true |

**dataPoint**

| propriedade | valores observados |
|---|---|
| `fill` `[cond]` | "#ECB31A", "#005890", "#EE9133", "#008D97" |

**dropShadow**

| propriedade | valores observados |
|---|---|
| `show` | false |

**labels**

| propriedade | valores observados |
|---|---|
| `labelStyle` | "Both" |
| `position` | "outside" |
| `show` | true |

**legend**

| propriedade | valores observados |
|---|---|
| `position` | "BottomCenter" |
| `show` | false |
| `showTitle` | false |

**title**

| propriedade | valores observados |
|---|---|
| `alignment` | "center" |
| `text` | "Estatégia de Execução", "Qtde. de Projetos por Fase" |

## `pivotTable`  —  11 instância(s)


**background**

| propriedade | valores observados |
|---|---|
| `show` | true |
| `transparency` | 0 |

**border**

| propriedade | valores observados |
|---|---|
| `color` | "#E6E6E6" |
| `radius` | 4 |
| `show` | true |

**columnFormatting**

| propriedade | valores observados |
|---|---|
| `alignment` `[cond]` | "Center" |
| `dataBars` `[cond]` | {"_complex": ["minValue", "maxValue", "positiveColor", "negativeColor", "axisColor", "reverseDirection", "hideText"]} |
| `labelDisplayUnits` `[cond]` | 1000000 |
| `styleHeader` `[cond]` | true |
| `styleTotal` `[cond]` | true |

**columnHeaders**

| propriedade | valores observados |
|---|---|
| `alignment` | "Center", "Auto" |
| `autoSizeColumnWidth` | true |
| `backColor` | {"themeColor": 2, "percent": 0} |
| `fontColor` | {"themeColor": 0, "percent": -0.1}, {"themeColor": 0, "percent": 0} |
| `titleAlignment` | "Center", "Auto" |
| `wordWrap` | false, true |

**columnTotal**

| propriedade | valores observados |
|---|---|
| `applyToHeaders` | false |

**columnWidth**

| propriedade | valores observados |
|---|---|
| `value` `[cond]` | 76, 78, 57, 34.81818181818182, 87.97907187002757, 45.95891172536007, … (+48) |

**dropShadow**

| propriedade | valores observados |
|---|---|
| `color` | {"themeColor": 1, "percent": 0.6}, "#999999" |
| `preset` | "Custom" |
| `shadowBlur` | 1 |
| `shadowDistance` | 1 |
| `shadowSpread` | 0 |
| `show` | true |
| `transparency` | 70 |

**grid**

| propriedade | valores observados |
|---|---|
| `gridHorizontal` | true |
| `gridHorizontalColor` | {"themeColor": 0, "percent": -0.1} |
| `gridHorizontalWeight` | 0.1 |
| `gridVertical` | false, true |
| `gridVerticalWeight` | 0.1 |
| `outlineColor` | {"themeColor": 3, "percent": 0}, {"themeColor": 2, "percent": 0} |
| `outlineStyle` | 0 |
| `rowPadding` | 2, 1.5 |

**padding**

| propriedade | valores observados |
|---|---|
| `top` | 10 |

**rowHeaders**

| propriedade | valores observados |
|---|---|
| `alignment` | "Left" |
| `fontSize` | 10 |
| `outlineColor` | {"themeColor": 2, "percent": 0} |
| `outlineStyle` | 2 |
| `outlineWeight` | 1 |
| `showExpandCollapseButtons` | true |
| `stepped` | false |
| `wordWrap` | false |

**rowTotal**

| propriedade | valores observados |
|---|---|
| `applyToHeaders` | true |
| `backColor` | {"themeColor": 0, "percent": 0} |

**stylePreset**

| propriedade | valores observados |
|---|---|
| `name` | "None", "Default" |

**subTotals**

| propriedade | valores observados |
|---|---|
| `applyToHeaders` `[cond]` | false, true |
| `backColor` `[cond]` | {"themeColor": 0, "percent": -0.1}, {"themeColor": 0, "percent": 0}, "#ECF2F7", {"themeColor": 4, "percent": 0.2} |
| `columnSubtotals` | true, false |
| `perColumnLevel` | true |
| `perRowLevel` | true |
| `rowSubtotals` | false, true |

**title**

| propriedade | valores observados |
|---|---|
| `alignment` | "center" |
| `fontSize` | 12 |
| `show` | false |
| `text` | "Total Package", "Project Status" |
| `titleWrap` | true |

**values**

| propriedade | valores observados |
|---|---|
| `backColor` `[cond]` | {"_complex": ["FillRule"]}, {"_complex": ["Conditional"]} |
| `backColorPrimary` | {"themeColor": 0, "percent": 0} |
| `backColorSecondary` | {"themeColor": 0, "percent": 0} |
| `fontColor` `[cond]` | {"_complex": ["Conditional"]} |
| `fontSize` | 10 |
| `icon` `[cond]` | {"_complex": ["kind", "layout", "verticalAlignment", "value"]} |
| `wordWrap` | true, false |

**visualHeader**

| propriedade | valores observados |
|---|---|
| `show` | false |

## `shape`  —  6 instância(s)


**background**

| propriedade | valores observados |
|---|---|
| `show` | false |

**border**

| propriedade | valores observados |
|---|---|
| `show` | false |

**outline**

| propriedade | valores observados |
|---|---|
| `show` | false |

**padding**

| propriedade | valores observados |
|---|---|
| `bottom` | 0 |

**rotation**

| propriedade | valores observados |
|---|---|
| `shapeAngle` | 0 |

**shape**

| propriedade | valores observados |
|---|---|
| `linecapType` | "round" |
| `roundEdge` | 4 |
| `tileShape` | "line", "rectangle" |

**text**

| propriedade | valores observados |
|---|---|
| `bottomMargin` `[cond]` | 13 |
| `fontSize` `[cond]` | 8 |
| `horizontalAlignment` `[cond]` | "center" |
| `rightMargin` `[cond]` | 0 |
| `show` | true |
| `text` `[cond]` | "Adherence" |
| `topMargin` `[cond]` | 0 |
| `verticalAlignment` `[cond]` | "middle" |

**visualLink**

| propriedade | valores observados |
|---|---|
| `navigationSection` | "ReportSection6f30e307bbfc98a6cb85", "ReportSectionc8d7b7add63618f9a809" |
| `show` | true |
| `type` | "PageNavigation" |

## `slicer`  —  61 instância(s)


**background**

| propriedade | valores observados |
|---|---|
| `show` | true |
| `transparency` | 0 |

**border**

| propriedade | valores observados |
|---|---|
| `color` | "#DADADA" |
| `radius` | 4 |
| `show` | false |

**data**

| propriedade | valores observados |
|---|---|
| `mode` | "Dropdown", "Basic", "Relative" |
| `relativeDuration` | 1 |
| `relativePeriod` | "Years" |
| `relativeRange` | "Next" |

**dateRange**

| propriedade | valores observados |
|---|---|
| `includeToday` | true |

**dropShadow**

| propriedade | valores observados |
|---|---|
| `color` | {"themeColor": 1, "percent": 0.6} |
| `preset` | "Custom" |
| `shadowBlur` | 1 |
| `shadowDistance` | 1 |
| `shadowSpread` | 0 |
| `show` | false |

**general**

| propriedade | valores observados |
|---|---|
| `filter` | {"_complex": ["filter"]} |
| `orientation` | 0 |
| `selfFilter` | {"_complex": ["filter"]} |
| `selfFilterEnabled` | true |

**header**

| propriedade | valores observados |
|---|---|
| `text` | "Planner", "Program", "Project Leader", "Phase" |

**items**

| propriedade | valores observados |
|---|---|
| `background` | {"themeColor": 0, "percent": 0}, {"themeColor": 0, "percent": -0.1} |

**selection**

| propriedade | valores observados |
|---|---|
| `selectAllCheckboxEnabled` | false, true |
| `singleSelect` | true |

**visualHeader**

| propriedade | valores observados |
|---|---|
| `show` | false |
| `showDrillDownExpandButton` | false |
| `showDrillDownLevelButton` | false |
| `showDrillRoleSelector` | false |
| `showDrillToggleButton` | false |
| `showDrillUpButton` | false |
| `showFilterRestatementButton` | false |
| `showFocusModeButton` | false |
| `showOptionsMenu` | false |
| `showPinButton` | false |
| `showSeeDataLayoutToggleButton` | false |
| `showVisualErrorButton` | false |
| `showVisualInformationButton` | false |
| `showVisualWarningButton` | false |

## `stackedAreaChart`  —  1 instância(s)


**border**

| propriedade | valores observados |
|---|---|
| `color` | {"themeColor": 0, "percent": -0.2} |
| `radius` | 12 |
| `show` | true |

**dataPoint**

| propriedade | valores observados |
|---|---|
| `fill` `[cond]` | "#ECB31A" |

**labels**

| propriedade | valores observados |
|---|---|
| `enableBackground` | false |
| `labelPosition` | "Auto" |
| `show` | false |

**lineStyles**

| propriedade | valores observados |
|---|---|
| `showMarker` | true |

**seriesLabels**

| propriedade | valores observados |
|---|---|
| `show` | false |

**title**

| propriedade | valores observados |
|---|---|
| `text` | "Qtde. de projetos por Complexidade" |

**totals**

| propriedade | valores observados |
|---|---|
| `show` | true |

## `tableEx`  —  8 instância(s)


**background**

| propriedade | valores observados |
|---|---|
| `show` | false |

**border**

| propriedade | valores observados |
|---|---|
| `color` | {"themeColor": 0, "percent": -0.2} |
| `radius` | 12 |
| `show` | false, true |

**columnFormatting**

| propriedade | valores observados |
|---|---|
| `alignment` `[cond]` | "Center" |
| `labelDisplayUnits` `[cond]` | 1000000 |
| `styleHeader` `[cond]` | false |
| `styleTotal` `[cond]` | false |
| `styleValues` `[cond]` | true |

**columnHeaders**

| propriedade | valores observados |
|---|---|
| `alignment` | "Auto", "Center" |

**columnWidth**

| propriedade | valores observados |
|---|---|
| `value` `[cond]` | 187.7363736937696, 168.8605934544386 |

**grid**

| propriedade | valores observados |
|---|---|
| `gridHorizontalWeight` | 2 |
| `gridVertical` | true |
| `gridVerticalWeight` | 2 |
| `outlineColor` | "#005890" |
| `outlineWeight` | 2 |

**total**

| propriedade | valores observados |
|---|---|
| `totals` | false |

## `textbox`  —  119 instância(s)


**background**

| propriedade | valores observados |
|---|---|
| `color` | "#FFFFFF" |
| `show` | false |
| `transparency` | 0 |

**border**

| propriedade | valores observados |
|---|---|
| `color` | "#DADADA" |
| `radius` | 4 |
| `show` | false |

**general**

| propriedade | valores observados |
|---|---|
| `keepLayerOrder` | true |
| `paragraphs` | [{"textRuns": [{"value": "Controle de NCC", "textStyle": {"fontSize": "24pt", "color": "#ffffff"}}], "horizontalTextAlignment": "center"}], [{"textRuns": [{"value": "Em Replanejamento", "textStyle": {"fontWeight": "bold"}}], "horizontalTextAlignment": "center"}], [{"textRuns": [{"value": "Em Desenvolvimento", "textStyle": {"fontWeight": "bold"}}], "horizontalTextAlignment": "center"}], [{"textRuns": [{"value": "Não iniciados", "textStyle": {"fontWeight": "bold"}}], "horizontalTextAlignment": "center"}], [{"textRuns": [{"value": "Detalhes dos Projetos - NCC", "textStyle": {"fontSize": "24pt", "color": "#ffffff"}}], "horizontalTextAlignment": "center"}], [{"textRuns": [{"value": "MAJOR PROJECTS", "textStyle": {"fontWeight": "bold", "fontSize": "28pt", "color": "#165788"}}], "horizontalTextAlignment": "center"}], … (+43) |

**title**

| propriedade | valores observados |
|---|---|
| `titleWrap` | true |

**visualHeader**

| propriedade | valores observados |
|---|---|
| `show` | false |
| `showDrillDownExpandButton` | false |
| `showDrillDownLevelButton` | false |
| `showDrillRoleSelector` | false |
| `showDrillToggleButton` | false |
| `showDrillUpButton` | false |
| `showFilterRestatementButton` | false |
| `showFocusModeButton` | false |
| `showOptionsMenu` | false |
| `showPinButton` | false |
| `showSeeDataLayoutToggleButton` | false |
| `showVisualErrorButton` | false |
| `showVisualInformationButton` | false |
| `showVisualWarningButton` | false |