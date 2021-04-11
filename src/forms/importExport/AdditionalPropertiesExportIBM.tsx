import { StepForm } from "interfaces";

const form: StepForm = {
  visible: ({ values }) => {
    return values["importDetails"]
      ? values["importDetails"]["option"] === "Export" &&
          values["importDetails"]["exportType"] === "IBM (IGC)"
      : false;
  },
  stepLabel: "Additional Properties",
  stepComment: "Provide additional inputs",
  name: "addtionalPropertiesExportIBM",
  inputGroups: [
    {
      title: "Additional Properties",
      name: "additionalProperties",
      switchable: false,
      inputs: [
        {
          label: "Limit Upload To This Source System",
          name: "limitUpload",
          required: true,
          type: "autocomplete",
          initialValue: "",
          span: 4,
          options: ["Option 1", "Option 2", "Option 3"],
        },
        {
          label: "IBM IGC Server Address",
          name: "limitUpload",
          required: true,
          type: "autocomplete",
          initialValue: "",
          span: 8,
          options: ["Option 1", "Option 2", "Option 3"],
        },
        {
          label: "User Name",
          name: "username",
          required: true,
          type: "text",
          initialValue: "",
          span: 4,
        },
        {
          label: "Password",
          name: "password",
          required: true,
          type: "text",
          password: true,
          initialValue: "",
          span: 4,
        },
        {
          type: "empty",
          span: 4,
        },
        {
          label: "IMAM Host Name",
          name: "imamHostName",
          required: true,
          type: "text",
          initialValue: "",
          span: 4,
        },
        {
          label: "MDAPI Token",
          name: "mdapiToken",
          required: true,
          type: "text",
          initialValue: "",
          span: 8,
        },
        {
          label: "Uploader Properties",
          name: "uploaderProperties",
          required: true,
          type: "text",
          initialValue: "",
          span: 12,
        },
        {
          label: "Maximum Flow Unit Per Load",
          name: "maxFlowUnitPerLoad",
          required: true,
          type: "text",
          initialValue: "",
          span: 4,
        },
        {
          label: "Java Heap Size",
          name: "javaHeapSize",
          type: "text",
          initialValue: "",
          span: 4,
        },
        {
          type: "reset",
          span: 4,
        },
      ],
    },
    {
      title: "Workflow",
      name: "workflow",
      switchable: true,
      enabled: false,
      inputs: [
        {
          type: "autocomplete",
          options: ["Option 1", "Option 2", "Option 3"],
          name: "workflows",
          label: "Workflows",
          required: true,
          span: 4,
          initialValue: "",
        },
      ],
    },
    {
      visible: ({ values }) => {
        return values["addtionalPropertiesExportIBM"]
          ? values["addtionalPropertiesExportIBM"]["workflow"]
            ? true
            : false
          : false;
      },
      title: "Optons",
      switchable: false,
      inputs: [
        {
          type: "checkbox",
          name: "requireApprovalBeforeIngestion",
          label: "Require approval before ingestion",
          span: 4,
          initialValue: false,
        },
        {
          type: "checkbox",
          name: "requireApprovalAfterIngestion",
          label: "Require approval before ingestion",
          span: 4,
          initialValue: false,
        },
        {
          type: "checkbox",
          name: "sendNotificationOnIngestionExecutionStatus",
          label: "Sned notification on ingestion execution status",
          span: 4,
          initialValue: false,
        },
      ],
    },
  ],
};

export default form;
