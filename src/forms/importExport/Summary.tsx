import { Summary as SummaryType } from "interfaces";
import BoxImage from "assets/box.svg";

const Summary: SummaryType = {
  title: "Emplyee Name",
  comment: "List of all the emp name in HR org",
  icon: BoxImage,
  sections: [
    {
      title: "Details",
      labels: ["Contact Name"],
    },
    {
      title: "Additional details",
      labels: ["Workflow", "Issue Tracker", "Instant Messaging", "Default Encode", "Files"],
    },
  ],
};

export default Summary;
