import ImportDetailsForm from "./ImportDetails";
import LoadFilesForm from "./LoadFiles";
import MapColumnForm from "./MapColumn";
import AdditionalProperties1 from "./AdditionalPropertiesExportIBM";
import AdditionalProperties2 from "./AdditionalPropertiesExportTerm2";
import AdditionalProperties3 from "./AdditionalPropertiesImport";
import Summary from "./Summary";

const form = {
  forms: [
    ImportDetailsForm,
    AdditionalProperties1,
    AdditionalProperties2,
    AdditionalProperties3,
    LoadFilesForm,
    MapColumnForm,
  ],
  summary: Summary,
  title: "Import / Export",
  comment: ({ values }) => {
    if (values && values["importDetails"]) {
      const val = values["importDetails"];
      if (val.option === "Import") {
        return `Follow the simple ${val.importType === "Workflow" ? 3 : 4} steps to Import ${
          val.importType
        }`;
      } else if (val.option === "Export") {
        return `Follow the simple 3 steps to Export ${val.exportType}`;
      }
    }
    return "";
  },
};

export default form;
