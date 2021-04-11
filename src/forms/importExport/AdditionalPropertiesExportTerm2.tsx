import { StepForm } from "interfaces";

const form: StepForm = {
  visible: ({ values }) => {
    return values["importDetails"]
      ? values["importDetails"]["option"] === "Export" &&
          values["importDetails"]["exportType"] === "Term 2 asset mapper for IBM (IGC)"
      : false;
  },
  stepLabel: "Additional Properties",
  stepComment: "Provide additional inputs",
  name: "addtionalPropertiesExportTerm2",
  inputGroups: [
    {
      title: "Additional Properties",
      name: "additionalProperties",
      switchable: false,
      inputs: [
        {
          label: "Root Glossary",
          name: "rootGlossary",
          required: true,
          type: "autocomplete",
          initialValue: "",
          span: 4,
          options: ["Option 1", "Option 2", "Option 3"],
        },
        {
          label: "IGC Parent Category",
          name: "igcParentCategory",
          required: true,
          type: "text",
          initialValue: "",
          span: 8,
        },
      ],
    },
    {
      title: "Options",
      switchable: false,
      inputs: [
        {
          type: "checkbox",
          name: "createParentCategory",
          label: "Create parent category",
          required: true,
          span: 4,
          initialValue: false,
        },
      ],
    },
    {
      title: "Server details",
      switchable: false,
      inputs: [
        {
          type: "autocomplete",
          name: "ibmIgcServerAddress",
          label: "IMB IGC Server Address",
          required: true,
          span: 12,
          initialValue: false,
          options: ["Option 1", "Option 2", "Option 3"],
        },
        {
          type: "autocomplete",
          name: "imbIgcServerApiToken",
          label: "IMB IGC Server API Token",
          required: true,
          span: 12,
          initialValue: false,
          options: ["Option 1", "Option 2", "Option 3"],
        },
        {
          type: "autocomplete",
          name: "MdapiToken",
          label: "MDAPI Token",
          required: true,
          span: 12,
          initialValue: false,
          options: ["Option 1", "Option 2", "Option 3"],
        },
        {
          type: "autocomplete",
          name: "Mdapihost",
          label: "MDAPI Host",
          required: true,
          span: 4,
          initialValue: false,
          options: ["Option 1", "Option 2", "Option 3"],
        },
        { type: "reset", span: 4 },
      ],
    },
  ],
};

export default form;
