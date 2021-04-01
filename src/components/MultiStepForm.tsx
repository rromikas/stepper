import { makeStyles } from "@material-ui/core/styles";
import Form from "./Form";
import Grid from "@material-ui/core/Grid";
import React, { useEffect, useState } from "react";
import { StepForm } from "interfaces";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Stepper from "components/Stepper";
import InstanceImage from "assets/instance.png";

const useStyles = makeStyles({
  container: {
    margin: "auto",
    maxWidth: 1200,
    width: "100%",
    minHeight: 600,
    background: "white",
    padding: 42,
  },

  title: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 5,
  },
});

export interface MultiStepFormProps {
  forms: Array<StepForm>;
  setValues: Function;
  onClose: Function;
  values: any;
  title: string;
  comment: string;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({
  forms,
  setValues,
  onClose,
  values,
  title,
  comment,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const classes = useStyles();
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (activeStep === forms.length) {
      setCounter((prev) => prev + 1);
    }
  }, [activeStep]);

  const labeledValues = forms.reduce(
    (a, b) =>
      Object.assign(
        {},
        a,
        b.inputGroups.reduce(
          (c, d) =>
            Object.assign(
              {},
              Object.assign(
                {},
                c,
                values[b.name]
                  ? d.inputs.reduce(
                      (e, f) =>
                        Object.assign({}, e, {
                          [f.label]: values[b.name][f.name],
                        }),
                      {}
                    )
                  : {}
              ),
              d.switchable ? { [d.title]: d.enabled ? "Yes" : "No" } : {}
            ),
          {}
        )
      ),
    {}
  );

  const detailsLabels = [
    "Source Type",
    "Platform",
    "Contact Name",
    "Application",
    "Tags",
    "Direct DB connection",
  ];

  const additionalDetailsLabels = [
    "Workflow",
    "Issue Tracker",
    "Instant Messaging",
    "Default Encode",
    "Files",
  ];

  const steps = [
    ...forms.map((x) => ({ label: x.stepLabel, comment: x.stepComment })),
    { label: "Run", comment: "Review and run" },
  ];

  const parseValue = (key, value) => {
    if (key === "Files") {
      if (value) {
        return value.length;
      }
      return 0;
    } else if (key === "Tags" && value) {
      return value.join(", ");
    }

    return value;
  };

  return (
    <div className={classes.container}>
      <Box mb={3}>
        <div className={classes.title}>{title}</div>
        <div>{comment}</div>
      </Box>
      <Grid container>
        <Grid item>
          <Box pr={4}>
            <Stepper
              navigable={false}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              steps={steps}
              labelsPosition="left"
            ></Stepper>
          </Box>
        </Grid>
        <Grid item xs>
          {forms.map((f, ind) => (
            <Box display={ind === activeStep ? "block" : "none"}>
              <Form
                onSubmit={() => setActiveStep((prev) => prev + 1)}
                shouldRender={ind === activeStep}
                initialValues={values[f.name]}
                form={forms[ind]}
                saveValues={(vals) =>
                  setValues((prev) => Object.assign({}, prev, { [f.name]: vals }))
                }
                counter={counter}
              ></Form>
            </Box>
          ))}
          {activeStep === forms.length ? (
            <Box p={3}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: 40 }}>
                <div style={{ marginRight: 20 }}>
                  <img src={InstanceImage} width={70}></img>
                </div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700 }}>
                    {values.metadataSource ? values.metadataSource.name : ""}
                  </div>
                  <div>{values.metadataSource ? values.metadataSource.description : ""}</div>
                </div>
              </div>
              <div style={{ marginBottom: 30 }}>
                <div style={{ fontSize: 22, marginBottom: 15, fontWeight: 700 }}>Details</div>
                {detailsLabels.map((x, i) => (
                  <div
                    key={`details-inp-${i}`}
                    style={{ display: "flex", alignItems: "center", marginBottom: 7 }}
                  >
                    <div style={{ width: 200, fontWeight: 700 }}>{x}</div>
                    <div>: {parseValue(x, labeledValues[x])}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 22, marginBottom: 15, fontWeight: 700 }}>
                  Additional details
                </div>
                {additionalDetailsLabels.map((x, i) => (
                  <div
                    key={`add-details-inp-${i}`}
                    style={{ display: "flex", alignItems: "center", marginBottom: 7 }}
                  >
                    <div style={{ width: 200, fontWeight: 700 }}>{x}</div>
                    <div>: {parseValue(x, labeledValues[x])}</div>
                  </div>
                ))}
              </div>
            </Box>
          ) : null}
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button
          onClick={() => {
            setCounter((prev) => prev + 1);
            setTimeout(() => {
              onClose();
            }, 100);
          }}
          variant="outlined"
        >
          Save
        </Button>
        <Box display="flex">
          <Box mr={1}>
            {activeStep === 0 ? (
              <Button variant="outlined" onClick={() => onClose()}>
                Cancel
              </Button>
            ) : (
              <Button variant="outlined" onClick={() => setActiveStep((prev) => prev - 1)}>
                Back
              </Button>
            )}
          </Box>
          {activeStep === steps.length - 1 ? (
            <Button color="secondary" style={{ color: "white" }} variant="contained">
              Run
            </Button>
          ) : (
            <div id="submitFormButton"></div>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default MultiStepForm;
