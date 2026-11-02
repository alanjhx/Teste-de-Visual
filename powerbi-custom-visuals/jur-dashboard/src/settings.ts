import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";

import FormattingSettingsCard = formattingSettings.SimpleCard;
import FormattingSettingsModel = formattingSettings.Model;

class ProjectCardSettings extends FormattingSettingsCard {
    projectId = new formattingSettings.TextInput({
        name: "projectId", displayName: "Código do projeto (manual)",
        value: "", placeholder: "ex.: JUR00140 (ou use o campo Número do projeto)"
    });
    accentColor = new formattingSettings.ColorPicker({
        name: "accentColor", displayName: "Cor de destaque",
        value: { value: "#2e9bff" }
    });
    name: string = "project";
    displayName: string = "Projeto";
    slices = [this.projectId, this.accentColor];
}

export class VisualFormattingSettingsModel extends FormattingSettingsModel {
    project = new ProjectCardSettings();
    cards = [this.project];
}
