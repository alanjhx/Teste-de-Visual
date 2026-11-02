import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";

import FormattingSettingsCard = formattingSettings.SimpleCard;
import FormattingSettingsModel = formattingSettings.Model;

/**
 * Cards do painel de formatação. Reproduzem as "cards" nativas observadas
 * na engenharia reversa dos .pbix: dataPoint, categoryAxis, valueAxis, dataLabels.
 * Os defaults vêm de design-tokens.json (tema CY24SU02).
 */

class DataPointCardSettings extends FormattingSettingsCard {
    defaultColor = new formattingSettings.ColorPicker({
        name: "defaultColor",
        displayName: "Cor padrão",
        value: { value: "#118DFF" } // dataColors[0] do tema PBI
    });
    barRadius = new formattingSettings.NumUpDown({
        name: "barRadius",
        displayName: "Raio dos cantos",
        value: 4
    });
    name: string = "dataPoint";
    displayName: string = "Cores dos dados";
    slices = [this.defaultColor, this.barRadius];
}

class CategoryAxisCardSettings extends FormattingSettingsCard {
    show = new formattingSettings.ToggleSwitch({ name: "show", displayName: "Mostrar", value: true });
    fontSize = new formattingSettings.NumUpDown({ name: "fontSize", displayName: "Tamanho do texto", value: 10 });
    labelColor = new formattingSettings.ColorPicker({ name: "labelColor", displayName: "Cor", value: { value: "#252423" } });
    name: string = "categoryAxis";
    displayName: string = "Eixo de categoria";
    slices = [this.show, this.fontSize, this.labelColor];
}

class ValueAxisCardSettings extends FormattingSettingsCard {
    show = new formattingSettings.ToggleSwitch({ name: "show", displayName: "Mostrar", value: true });
    start = new formattingSettings.NumUpDown({ name: "start", displayName: "Início", value: 0 });
    gridlines = new formattingSettings.ToggleSwitch({ name: "gridlines", displayName: "Linhas de grade", value: true });
    gridlineStyle = new formattingSettings.ItemDropdown({
        name: "gridlineStyle",
        displayName: "Estilo da grade",
        items: [
            { value: "dotted", displayName: "Pontilhada" },
            { value: "dashed", displayName: "Tracejada" },
            { value: "solid", displayName: "Sólida" }
        ],
        value: { value: "dotted", displayName: "Pontilhada" } // default nativo observado
    });
    labelColor = new formattingSettings.ColorPicker({ name: "labelColor", displayName: "Cor", value: { value: "#252423" } });
    name: string = "valueAxis";
    displayName: string = "Eixo de valor";
    slices = [this.show, this.start, this.gridlines, this.gridlineStyle, this.labelColor];
}

class DataLabelsCardSettings extends FormattingSettingsCard {
    show = new formattingSettings.ToggleSwitch({ name: "show", displayName: "Mostrar", value: false });
    color = new formattingSettings.ColorPicker({ name: "color", displayName: "Cor", value: { value: "#252423" } });
    fontSize = new formattingSettings.NumUpDown({ name: "fontSize", displayName: "Tamanho do texto", value: 9 });
    labelPrecision = new formattingSettings.NumUpDown({ name: "labelPrecision", displayName: "Casas decimais", value: 0 });
    name: string = "dataLabels";
    displayName: string = "Rótulos de dados";
    slices = [this.show, this.color, this.fontSize, this.labelPrecision];
}

export class VisualFormattingSettingsModel extends FormattingSettingsModel {
    dataPoint = new DataPointCardSettings();
    categoryAxis = new CategoryAxisCardSettings();
    valueAxis = new ValueAxisCardSettings();
    dataLabels = new DataLabelsCardSettings();
    cards = [this.dataPoint, this.categoryAxis, this.valueAxis, this.dataLabels];
}
