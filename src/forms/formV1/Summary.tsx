import { Summary as SummaryType } from "interfaces";
import InstanceImage from "assets/instance.png";

const Summary: SummaryType = {
  title: "Instance title",
  comment: "Instance description details",
  icon: InstanceImage,
  sections: [
    {
      title: "Details",
      labels: [
        "Source Type",
        "Platform",
        "Contact Name",
        "Application",
        "Tags",
        "Direct DB connection",
      ],
    },
    {
      title: "Additional details",
      labels: ["Workflow", "Issue Tracker", "Instant Messaging", "Default Encode", "Files"],
    },
  ],
};

export default Summary;
