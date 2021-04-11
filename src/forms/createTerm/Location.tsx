import { StepForm } from "interfaces";

const form: StepForm = {
  stepLabel: "Location",
  stepComment: "Select a glossary, Category & Sub-Category",
  name: "location",
  inputGroups: [
    {
      title: "Select Glossary",
      switchable: false,
      inputs: [
        {
          type: "autocomplete",
          label: "Glossary Name",
          name: "glossary",
          initialValue: "",
          options: ["Option 1", "Option 2", "Option 3"],
          span: 8,
          required: true,
        },
      ],
    },
    {
      title: "Select Category",
      switchable: false,
      inputs: [
        {
          label: "Category Name",
          name: "category",
          required: true,
          type: "autocomplete",
          initialValue: "",
          options: ["Option 1", "Option 2", "Option 3"],
          span: 4,
        },
        {
          label: "Category Description",
          name: "categoryDescription",
          required: true,
          type: "text",
          initialValue: "",
          span: 8,
        },
        {
          label: "Sub-Category Name",
          name: "subCategory",
          required: true,
          type: "autocomplete",
          initialValue: "",
          options: ["Option 1", "Option 2", "Option 3"],
          span: 4,
        },
        {
          label: "Sub-Category Description",
          name: "subCategoryDescription",
          required: true,
          type: "text",
          initialValue: "",
          span: 8,
        },
        {
          label: "Application",
          name: "application",
          required: true,
          type: "autocomplete",
          initialValue: "",
          options: ["Option 1", "Option 2", "Option 3"],
          span: 4,
        },
        {
          label: "Tags",
          name: "tags",
          required: true,
          type: "random-tags",
          initialValue: "",
          span: 8,
        },
      ],
    },
  ],
};

export default form;
