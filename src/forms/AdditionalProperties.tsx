import { StepForm } from "interfaces";

const Form: StepForm = {
  stepLabel: "Additional Properties",
  stepComment: "Provide additional inputs",
  name: "additionalProperties",
  inputGroups: [
    {
      title: "Direct DB connection",
      name: "directDbConnection",
      switchable: true,
      enabled: false,
      inputs: [],
    },
    {
      title: "Additional Properties",
      switchable: false,
      inputs: [
        {
          name: "databaseServerName",
          label: "Database Server Name",
          span: 4,
          type: "text",
          initialValue: "",
          required: true,
        },
        {
          name: "databaseName",
          label: "Database Name",
          span: 4,
          type: "text",
          initialValue: "",
          required: true,
        },
        {
          name: "fileExtensionsToProcess",
          label: "File Extensions To Process",
          span: 4,
          type: "text",
          initialValue: "",
          required: true,
        },
      ],
    },
    {
      title: "Options",
      switchable: false,
      inputs: [
        {
          name: "createTempStructsWhileParsing",
          label: "Create temporary structures while parsing",
          span: 6,
          type: "checkbox",
          initialValue: false,
        },
        {
          name: "scriptSubFolderNameAsDefaultName",
          label: "Use scripts subfolder names as default schema name",
          span: 6,
          type: "checkbox",
          initialValue: false,
        },
        {
          name: "ingestionMode",
          label: "Ingestion Mode",
          span: 4,
          type: "autocomplete",
          initialValue: "",
          options: ["TEMP", "TEMP1", "TEMP2"],
          required: true,
        },
        {
          name: "defaultTempSchema",
          label: "Default Temporary Schema",
          span: 8,
          type: "autocomplete",
          initialValue: "",
          options: ["INCREMENTAL", "ITERATIVE", "PARALLEL"],
          required: true,
        },
      ],
    },
    {
      title: "Workflow",
      name: "workflow",
      switchable: true,
      enabled: false,
      inputs: [],
    },
    {
      title: "Issue Tracker",
      name: "issueTracker",
      switchable: true,
      enabled: false,
      inputs: [],
    },
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
