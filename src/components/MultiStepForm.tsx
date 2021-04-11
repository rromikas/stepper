import { makeStyles } from "@material-ui/core/styles";
import Form from "./Form";
import Grid from "@material-ui/core/Grid";
import React, { useEffect, useState } from "react";
import { StepForm, Summary as SummaryType } from "interfaces";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Stepper from "components/Stepper";
import Summary from "components/Summary";
import { User as UserType } from "interfaces";
import { flattenForm, flattenFormRequiredValues, flattenInputGroup } from "helpers";
import Switch from "@material-ui/core/Switch";

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
  user: UserType;
  saveValues: Function;
  onClose: Function;
  initialValues: any;
  title: string;
  comment: string;
  displayStepper?: boolean;
  setDisplayStepper?: Function;
  summary: SummaryType;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({
  forms,
  saveValues,
  user,
  onClose,
  initialValues,
  title,
  comment,
  displayStepper = true,
  setDisplayStepper = () => {},
  summary,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [counter, setCounter] = useState(0);
  const classes = useStyles();
  const [submitCount, setSubmitCount] = useState(0);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState(null as any);

  useEffect(() => {
    let formObj = forms.reduce((a, b) => {
      let flatened = flattenForm(b);
      return Object.assign({}, a, { [b.name]: flatened });
    }, {});

    setValues((prev) => ({ ...prev, ...formObj }));
  }, [forms]);

  useEffect(() => {
    if (initialValues) {
      setValues((prev) => ({ ...prev, ...initialValues }));
    }
  }, [initialValues]);

  useEffect(() => {
    if (activeStep === forms.length) {
      setCounter((prev) => prev + 1);
    }
  }, [activeStep]);

  let visibleForms = [] as StepForm[];
  let activeFormName = "" as string;

  if (values) {
    visibleForms = forms.filter((x) => (x.visible ? x.visible({ values, user }) : true));
    activeFormName = activeStep < visibleForms.length ? visibleForms[activeStep].name : "";
  }

  const validate = () => {
    const requiredValues = flattenFormRequiredValues(visibleForms[activeStep], values, user);
    let errObj = {};
    Object.keys(values[activeFormName]).forEach((x) => {
      if (
        requiredValues[x] &&
        (!values[activeFormName][x] ||
          (typeof values[activeFormName][x] === "object" && !values[activeFormName][x].length))
      ) {
        errObj[x] = "Required";
      }
    });
    return errObj;
  };

  const steps = [
    ...visibleForms.map((x) => ({ label: x.stepLabel, comment: x.stepComment })),
    { label: "Run", comment: "Review and run" },
  ];

  const onSave = () => {
    saveValues(values);
    onClose();
  };

  const addGroup = (path, inputGroup) => {
    const flattenedGroup = flattenInputGroup(inputGroup);
    const paths = path.split("/");
    paths.pop();
    paths.pop();
    let obj = { ...values[activeFormName] };
    let clone = obj;
    for (let i = 0; i < paths.length - 1; i++) {
      obj = obj[paths[i]];
    }
    const lastPath = paths[paths.length - 1];
    obj[lastPath] = [...obj[lastPath], flattenedGroup[0]];

    setValues((prev) => ({ ...prev, [activeFormName]: clone }));
  };

  const deleteGroup = (path) => {
    const paths = path.split("/");
    paths.pop();
    const deleteIndex = +paths[paths.length - 1];
    paths.pop();
    let obj = { ...values[activeFormName] };
    let clone = obj;
    for (let i = 0; i < paths.length - 1; i++) {
      obj = obj[paths[i]];
    }
    const lastPath = paths[paths.length - 1];
    obj[lastPath].splice(deleteIndex, 1);
    setValues((prev) => ({ ...prev, [activeFormName]: clone }));
  };

  return (
    <div className={classes.container}>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Box>
          <div className={classes.title}>{title}</div>
          <div>{comment}</div>
        </Box>
        <Box display="flex" alignItems="center">
          <Box mr={2}>Show stepper</Box>
          <Switch
            color="primary"
            checked={displayStepper}
            onChange={(e) => setDisplayStepper(e.target.checked)}
          ></Switch>
        </Box>
      </Box>

      <Grid container>
        {displayStepper ? (
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
        ) : null}
        <Grid item xs>
          {activeFormName ? (
            <Form
              user={user}
              setFieldValue={(path, val) => {
                let obj = { ...values[activeFormName] };
                let clone = obj;
                const paths = path.split("/");
                for (let i = 0; i < paths.length - 1; i++) {
                  obj = obj[paths[i]];
                }
                obj[paths[paths.length - 1]] = val;

                setValues((prev) => ({ ...prev, [activeFormName]: clone }));
              }}
              onSubmit={() => {}}
              allValues={values}
              errors={errors[activeFormName] ? errors[activeFormName] : {}}
              form={visibleForms[activeStep]}
              submitCount={submitCount}
              addGroup={addGroup}
              deleteGroup={deleteGroup}
            ></Form>
          ) : null}

          {activeStep === visibleForms.length ? (
            <Summary values={values} forms={forms} {...summary}></Summary>
          ) : null}
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button onClick={() => onSave()} variant="outlined">
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
            <div id="submitFormButton">
              <Button
                onClick={() => {
                  const errs = validate();
                  setSubmitCount((prev) => prev + 1);
                  setErrors((prev) => ({ ...prev, [visibleForms[activeStep].name]: errs }));
                  if (!Object.keys(errs).length) {
                    setActiveStep((prev) => prev + 1);
                    setSubmitCount(0);
                  }
                }}
                color="primary"
                variant="contained"
              >
                Next
              </Button>
            </div>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default MultiStepForm;
