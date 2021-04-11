import { StepForm } from "interfaces";

const form: StepForm = {
  stepLabel: "Term",
  stepComment: "Add language, term & description",
  name: "term",
  inputGroups: [
    {
      title: "Term",
      name: "term",
      multipliable: true,
      multiplyButtonText: "Term",
      switchable: false,
      inputGroups: [
        {
          title: "",
          switchable: false,
          multipliable: true,
          multiplyButtonText: "Language",
          name: "language",
          inputs: [
            {
              required: true,
              label: "Language",
              name: "language",
              type: "autocomplete",
              options: ["Option 1", "Option 2", "Option 3"],
              initialValue: "",
              span: 3,
            },
            {
              required: true,
              label: "Term",
              name: "languageTerm",
              type: "text",
              initialValue: "",
              span: 3,
            },
            {
              required: true,
              label: "Description",
              name: "languageDescription",
              type: "text",
              initialValue: "",
              span: 3,
            },
          ],
        },
      ],
    },
  ],
};

export default form;
