import AdditionalProperties from "./AdditionalProperties";
import MetadataSource from "./MetadataSource";
import LoadFiles from "./LoadFiles";
import Summary from "./Summary";

const form = {
  title: "Create Metadata Source",
  comment: () => "Follow the simple 4 steps to create a source",
  forms: [MetadataSource, AdditionalProperties, LoadFiles],
  summary: Summary,
};

export default form;
