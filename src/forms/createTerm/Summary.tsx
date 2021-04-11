import { Summary as SummaryType } from "interfaces";
import TermImage from "assets/term.svg";

const Summary: SummaryType = {
  title: "Term title",
  comment: "Term description",
  icon: TermImage,
  sections: [
    {
      title: "Details",
      labels: [
        "Glossary Name",
        "Category Name",
        "Category Description",
        "Sub-Category Name",
        "Sub-Category Description",
        "Application",
        "Tags",
      ],
    },
  ],
};

export default Summary;
