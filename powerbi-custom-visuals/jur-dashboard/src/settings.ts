import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";

import FormattingSettingsCard = formattingSettings.SimpleCard;
import FormattingSettingsModel = formattingSettings.Model;

class ProjectCardSettings extends FormattingSettingsCard {
    projectId = new formattingSettings.TextInput({
        name: "projectId", displayName: "Código do projeto",
        value: "JUR00140", placeholder: "JUR00140"
    });
    closeDate = new formattingSettings.TextInput({
        name: "closeDate", displayName: "Data de encerramento",
        value: "30/06/2023", placeholder: "dd/mm/aaaa"
    });
    accentColor = new formattingSettings.ColorPicker({
        name: "accentColor", displayName: "Cor de destaque",
        value: { value: "#2e9bff" }
    });
    name: string = "project";
    displayName: string = "Projeto";
    slices = [this.projectId, this.closeDate, this.accentColor];
}

export class VisualFormattingSettingsModel extends FormattingSettingsModel {
    project = new ProjectCardSettings();
    cards = [this.project];
}
