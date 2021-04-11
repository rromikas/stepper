import { StepForm } from "interfaces";

const Form: StepForm = {
  stepLabel: "Map Column",
  stepComment: "Browse & select objects",
  name: "mapColumn",
  visible: ({ values }) => {
    return values["importDetails"]
      ? values["importDetails"]["option"] === "Export" &&
          values["importDetails"]["exportType"] === "Excel Export"
      : false;
  },
  inputGroups: [
    {
      switchable: false,
      title: "",
      justifyContent: "center",
      inputs: [
        {
          name: "namesTree",
          label: "",
          type: "names-tree",
          initialValue: {},
          span: 12,
        },
      ],
    },
  ],
};

export default Form;
