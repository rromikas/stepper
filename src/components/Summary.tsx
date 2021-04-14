import { Summary as SummaryType, StepForm } from "interfaces";
import Box from "@material-ui/core/Box";
import { parseValueForSummary as parseValue, flattenFormWithLabelAsKey } from "helpers";

interface SummaryProps extends SummaryType {
  values: { [key: string]: string | number | boolean };
  forms: StepForm[];
}

const Summary: React.FC<SummaryProps> = ({ sections, icon, title, comment, values, forms }) => {
  const labeledValues = values
    ? forms.reduce((a, b) => Object.assign({}, a, flattenFormWithLabelAsKey(b, values)), {})
    : {};

  return (
    <Box p={3}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 40 }}>
        <div style={{ marginRight: 20 }}>
          <img alt="" src={icon} width={70}></img>
        </div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{title}</div>
          <div>{comment}</div>
        </div>
      </div>
      {sections.map((x, i) => (
        <div key={`summray-section-${i}`} style={{ marginBottom: 30 }}>
          <div style={{ fontSize: 22, marginBottom: 15, fontWeight: 700 }}>{x.title}</div>
          {x.labels.map((x, i) => (
            <div
              key={`details-inp-${i}`}
              style={{ display: "flex", alignItems: "center", marginBottom: 7 }}
            >
              <div style={{ width: 200, fontWeight: 700 }}>{x}</div>
              <div>: {parseValue(x, labeledValues[x])}</div>
            </div>
          ))}
        </div>
      ))}
    </Box>
  );
};

export default Summary;
