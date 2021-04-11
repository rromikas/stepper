import { StepForm } from "interfaces";

const Form: StepForm = {
  visible: ({ values }) => {
    return values["importDetails"]
      ? values["importDetails"]["option"] === "Import" &&
          values["importDetails"]["importType"] !== "Workflow"
      : false;
  },
  stepLabel: "Additional Properties",
  stepComment: "Provide additional inputs",
  name: "addtionalPropertiesImport",
  inputGroups: [
    {
      title: "Additional Properties",
      name: "additionalProperties",
      switchable: false,
      inputs: [
        {
          name: "fileExtensionsToProcess",
          label: "File Extensions To Process",
          span: 4,
          type: "text",
          initialValue: "",
          required: true,
        },
        {
          name: "sourceToBindRules",
          label: "Source To Bind Rules",
          span: 4,
          type: "autocomplete",
          initialValue: "",
          required: true,
          options: ["Option 1", "Option 2", "Option 3"],
        },
        {
          name: "mode",
          label: "Mode",
          span: 4,
          type: "autocomplete",
          initialValue: "",
          required: true,
          options: ["Option 1", "Option 2", "Option 3"],
        },
        {
          name: "injunctionMode",
          label: "Injunction Mode",
          span: 8,
          type: "autocomplete",
          initialValue: "",
          required: true,
          options: ["Option 1", "Option 2", "Option 3"],
        },
      ],
    },
    { title: "Workflow", name: "workflow", switchable: true, enabled: false, inputs: [] },
    { title: "Issue Tracker", name: "issueTracker", switchable: true, enabled: false, inputs: [] },
    {
      title: "Instant Messaging",
      name: "instantMessaging",
      switchable: true,
      enabled: false,
      inputs: [],
    },
  ],
};

export default Form;
