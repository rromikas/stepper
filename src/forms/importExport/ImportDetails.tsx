import { StepForm } from "interfaces";

const Form: StepForm = {
  stepLabel: "Import details",
  stepComment: "Enter the name, description & location",
  name: "importDetails",
  inputGroups: [
    {
      title: "Select Option",
      name: "option",
      switchable: false,
      inputs: [
        {
          name: "option",
          label: "Option",
          span: 12,
          type: "options-list",
          initialValue: "Import",
          required: true,
          options: ["Import", "Export"],
        },
      ],
    },
    {
      title: "Select Type",
      visible: ({ values }) => {
        return values["importDetails"] ? values["importDetails"]["option"] === "Import" : false;
      },
      name: "type",
      switchable: false,
      inputs: [
        {
          name: "importType",
          label: "Type",
          span: 12,
          type: "options-list",
          initialValue: "Policy",
          required: true,
          options: ["Policy", "Rule", "Workflow"],
        },
      ],
    },
    {
      visible: ({ values }) => {
        return values["importDetails"] ? values["importDetails"]["option"] === "Export" : false;
      },
      title: "Select Type",
      switchable: false,
      inputs: [
        {
          name: "exportType",
          label: "Type",
          span: 12,
          type: "options-list",
          initialValue: "Excel Export",
          required: true,
          options: ["Excel Export", "IBM (IGC)", "Term 2 asset mapper for IBM (IGC)"],
        },
      ],
    },

    {
      title: "Details",
      name: "details",
      switchable: false,
      inputs: [
        { type: "text", name: "name", label: "Name", required: true, span: 4, initialValue: "" },
        {
          type: "text",
          name: "description",
          label: "Description",
          span: 4,
          initialValue: "",
        },
        {
          type: "text",
          name: "contactName",
          label: "Contact Name",
          required: true,
          span: 4,
          initialValue: "",
        },
      ],
    },

    {
      title: "Select Location",
      name: "location",
      switchable: false,
      inputs: [
        {
          type: "autocomplete",
          name: "legalEntity",
          label: "Legal Entity",
          required: true,
          span: 4,
          initialValue: "",
          options: ["Option 1", "Option 2", "Option 3"],
        },
        {
          type: "autocomplete",
          name: "LineOfBusiness",
          label: "Line Of Business",
          span: 4,
          initialValue: "",
          required: true,
          options: ["Option 1", "Option 2", "Option 3"],
        },
        {
          type: "autocomplete",
          name: "locationContactName",
          label: "Contact Name",
          required: true,
          span: 4,
          initialValue: "",
          options: ["Option 1", "Option 2", "Option 3"],
        },
        {
          visible: ({ values }) => {
            return values["importDetails"]
              ? values["importDetails"]["option"] === "Export" &&
                  values["importDetails"]["exportType"] !== "Excel Export"
              : false;
          },
          type: "autocomplete",
          name: "application",
          label: "Application",
          span: 4,
          initialValue: "",
          options: ["Option 1", "Option 2", "Option 3"],
        },
        {
          visible: ({ values }) => {
            return values["importDetails"]
              ? values["importDetails"]["option"] === "Export" &&
                  values["importDetails"]["exportType"] !== "Excel Export"
              : false;
          },
          type: "random-tags",
          name: "tags",
          label: "Tags",
          span: 8,
          initialValue: [],
        },
      ],
    },
    {
      visible: ({ values }) => {
        return values["importDetails"]
          ? values["importDetails"]["option"] === "Export" &&
              values["importDetails"]["exportType"] === "Excel Export"
          : false;
      },
      title: "Select Source",
      name: "source",
      switchable: false,
      inputs: [
        {
          type: "autocomplete",
          name: "platformName",
          label: "Platform Name",
          required: true,
          span: 4,
          initialValue: "",
          options: ["Option 1", "Option 2", "Option 3"],
        },
        {
          type: "autocomplete",
          name: "sourcesToExport",
          label: "Sources To Export",
          span: 4,
          initialValue: "",
          required: true,
          options: ["Option 1", "Option 2", "Option 3"],
        },
        {
          type: "autocomplete",
          name: "sourceOptions",
          label: "Options",
          required: true,
          span: 4,
          initialValue: "",
          options: ["Option 1", "Option 2", "Option 3"],
        },
        {
          type: "autocomplete",
          name: "application",
          label: "Application",
          span: 4,
          initialValue: "",
          options: ["Option 1", "Option 2", "Option 3"],
        },
        {
          type: "random-tags",
          name: "tags",
          label: "Tags",
          span: 8,
          initialValue: [],
        },
      ],
    },
  ],
};

export default Form;
