import { StepForm } from "interfaces";

const Form: StepForm = {
  stepLabel: "Metadata Source",
  stepComment: "Enter the name, description & location",
  name: "metadataSource",
  inputGroups: [
    {
      title: "Select Source Type",
      switchable: false,
      inputs: [
        {
          label: "Source Type",
          optionsFetchUrl: "",
          span: 12,
          name: "sourceType",
          type: "options-list",
          initialValue: "Database",
          options: ["Database", "Reporting", "ETL", "Language", "Data metrics", "Others"],
        },
      ],
    },
    {
      title: "Select Technology",
      switchable: false,
      inputs: [
        {
          name: "platform",
          label: "Platform",
          span: 4,
          type: "autocomplete",
          fixedOptions: true,
          optionsFetchUrl: "/api/technologies",
          initialValue: "",
          options: ["Oracle", "MongoDB", "Firebase"],
        },
      ],
    },
    {
      title: "Details",
      switchable: false,
      inputs: [
        {
          name: "name",
          label: "Name",
          span: 4,
          type: "text",
          initialValue: "",
          required: true,
        },
        {
          name: "description",
          label: "Descripton",
          span: 4,
          type: "text",
          initialValue: "",
        },
        {
          name: "contact_name",
          label: "Contact Name",
          span: 4,
          type: "text",
          initialValue: "",
          required: true,
        },
      ],
    },
    {
      title: "Select Location",
      switchable: false,
      inputs: [
        {
          name: "legal_entity",
          label: "Legal Entity",
          span: 4,
          type: "autocomplete",
          options: ["Option 1", "Option 2", "Option 3"],
          initialValue: "",
          required: true,
        },
        {
          name: "line_of_business",
          label: "Line Of Business",
          span: 4,
          type: "autocomplete",
          options: ["Option 1", "Option 2", "Option 3"],
          initialValue: "",
          required: true,
        },
        {
          name: "organization",
          label: "Organization",
          span: 4,
          type: "autocomplete",
          options: ["Option 1", "Option 2", "Option 3"],
          initialValue: "",
          required: true,
        },
        {
          name: "application",
          label: "Application",
          options: ["Option 1", "Option 2", "Option 3"],
          span: 4,
          type: "autocomplete",
          initialValue: "",
        },
        {
          name: "tags",
          label: "Tags",
          span: 8,
          type: "random-tags",
          initialValue: [],
        },
      ],
    },
  ],
};

export default Form;
