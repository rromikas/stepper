import { StepForm } from "interfaces";

const Form: StepForm = {
  stepLabel: "Load File",
  stepComment: "Browse and upload",
  name: "loadFiles",
  visible: ({ values }) => {
    return values["importDetails"] ? values["importDetails"]["option"] === "Import" : false;
  },
  inputGroups: [
    {
      switchable: false,
      title: "",
      justifyContent: "center",
      inputs: [
        {
          visible: ({ values }) => {
            return values["importDetails"]
              ? values["importDetails"]["option"] === "Import" &&
                  values["importDetails"]["importType"] !== "Workflow"
              : false;
          },
          type: "autocomplete",
          name: "defaultEncode",
          label: "Default Encode",
          initialValue: "None",
          options: ["None"],
          span: 4,
        },
        {
          required: true,
          type: "file",
          name: "files",
          label: "Files",
          initialValue: [],
          span: 12,
        },
      ],
    },
  ],
};

export default Form;
