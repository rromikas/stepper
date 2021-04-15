import Location from "./Location";
import Term from "./Term";
import Summary from "./Summary";

const form = {
  title: "Create Term",
  comment: () => "Follow the simple 3 steps to create a Term",
  forms: [Location, Term],
  summary: Summary,
};

export default form;
