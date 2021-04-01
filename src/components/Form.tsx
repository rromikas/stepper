import { StepForm } from "interfaces";
import { useFormik } from "formik";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Chip from "@material-ui/core/Chip";
import CloseIcon from "@material-ui/icons/Close";
import Checkbox from "@material-ui/core/Checkbox";
import Dropzone from "components/Dropzone";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import { flattenFormWithPropAsValue, flattenForm } from "helpers";

export interface FormProps {
  form: StepForm;
  counter: number;
  saveValues: Function;
  initialValues: InitialValues;
  shouldRender: boolean;
  onSubmit: Function;
}

const useStyles = makeStyles({
  inputGroupTitle: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 15,
  },

  inputGroup: {
    marginBottom: 32,
  },

  tag: {
    borderRadius: 3,
    background: "#DCDCDC",
    height: 22,
    padding: "0 5px",
  },

  listOption: {
    borderRadius: 3,
    height: 32,
    padding: "0 20px",
    background: "#F5F5F5",
    marginRight: 10,
  },

  selectedListOption: {
    background: "#0294F2",
    color: "white",
  },
});

interface InitialValues {
  [key: string]: any;
}

const Form: React.FC<FormProps> = ({
  form,
  counter,
  saveValues,
  initialValues,
  shouldRender,
  onSubmit,
}) => {
  const classes = useStyles();

  const inValues: InitialValues = initialValues ? initialValues : flattenForm(form);
  const requiredValues = flattenFormWithPropAsValue(form, "required");

  const { values, errors, handleSubmit, setFieldValue, submitCount } = useFormik({
    initialValues: inValues,
    validate: (vals) => {
      let errObj = {};
      Object.keys(vals).forEach((x) => {
        if (requiredValues[x] && !vals[x]) {
          errObj[x] = "Required";
        }
      });
      return errObj;
    },
    onSubmit: (values) => {
      onSubmit(values);
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    saveValues(values);
  }, [counter]);

  useEffect(() => {
    if (shouldRender) {
      const SubmitButton = () => {
        return (
          <Button
            onClick={() => {
              handleSubmit();
            }}
            color="primary"
            variant="contained"
          >
            Next
          </Button>
        );
      };
      ReactDOM.render(<SubmitButton></SubmitButton>, document.getElementById("submitFormButton"));
    }
  }, [shouldRender, values]);

  const DeleteIcon: any = () => {
    return <CloseIcon></CloseIcon>;
  };
  return (
    <Grid container>
      {form.inputGroups.map((inpGroup, i) => (
        <Grid item xs={12} className={classes.inputGroup}>
          <Box display="flex" alignItems="center" className={classes.inputGroupTitle}>
            {inpGroup.switchable && inpGroup.name ? (
              <Box mr={2}>
                <Switch
                  color="primary"
                  checked={values[inpGroup.name.toString()]}
                  onChange={(e) =>
                    inpGroup.name ? setFieldValue(inpGroup.name, e.target.checked) : {}
                  }
                />
              </Box>
            ) : null}
            <div>{inpGroup.title}</div>
          </Box>
          <Grid
            container
            spacing={3}
            justify={inpGroup.justifyContent ? inpGroup.justifyContent : "flex-start"}
          >
            {inpGroup.inputs.map((inp, j) => (
              <Grid key={`inputGroup-${i}-input-${j}`} xs={12} md={inp.span} item>
                {inp.type === "text" ? (
                  <TextField
                    fullWidth
                    required={inp.required}
                    label={inp.label}
                    value={values[inp.name]}
                    error={errors[inp.name] && submitCount > 0 ? true : false}
                    helperText={errors[inp.name]}
                    onChange={(e) => setFieldValue(inp.name, e.target.value)}
                  ></TextField>
                ) : inp.type === "opt-list" ? (
                  <Box display="flex" flexWrap="wrap">
                    {inp.options
                      ? inp.options.map((opt, optInd) => (
                          <ButtonBase
                            key={`${Math.random()}-opt-${optInd}`}
                            onClick={() => setFieldValue(inp.name, opt)}
                            className={
                              classes.listOption +
                              " " +
                              (values[inp.name] === opt ? classes.selectedListOption : "")
                            }
                          >
                            {opt}
                          </ButtonBase>
                        ))
                      : null}
                  </Box>
                ) : inp.type === "autocomplete" ? (
                  <Autocomplete
                    options={inp.options ? inp.options : []}
                    value={values[inp.name]}
                    onChange={(e, value) => {
                      setFieldValue(inp.name, value);
                    }}
                    getOptionLabel={(label: string) => label}
                    renderInput={(params) => (
                      <TextField
                        required={inp.required}
                        error={errors[inp.name] && submitCount > 0 ? true : false}
                        helperText={errors[inp.name]}
                        {...params}
                        label={inp.label}
                      />
                    )}
                  />
                ) : inp.type === "random-tags" ? (
                  <Autocomplete
                    options={inp.options ? inp.options : []}
                    multiple
                    freeSolo
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => {
                        return (
                          <Chip
                            deleteIcon={DeleteIcon}
                            classes={{ root: classes.tag }}
                            label={option}
                            {...getTagProps({ index })}
                          />
                        );
                      })
                    }
                    value={values[inp.name]}
                    ListboxComponent={() => <Box display="none"></Box>}
                    renderInput={(params) => {
                      const modifiedParams: any = { ...params };
                      modifiedParams.inputProps.onKeyDown = (event: React.KeyboardEvent) => {
                        switch (event.key) {
                          case ",":
                          case " ": {
                            event.preventDefault();
                            event.stopPropagation();
                            const target: any = event.target;
                            if (target.value.length > 0) {
                              setFieldValue(inp.name, [...values[inp.name], target.value]);
                            }
                            break;
                          }
                          default:
                        }
                      };
                      return (
                        <TextField
                          {...modifiedParams}
                          required={inp.required}
                          variant="standard"
                          label={inp.label}
                          fullWidth
                        />
                      );
                    }}
                  />
                ) : inp.type === "checkbox" ? (
                  <Box display="flex" alignItems="center">
                    <Box mr={1}>
                      <Checkbox
                        checked={values[inp.name]}
                        onChange={(e) => setFieldValue(inp.name, e.target.checked)}
                        color="primary"
                      />
                    </Box>
                    <div>{inp.label}</div>
                  </Box>
                ) : inp.type === "file" ? (
                  <Dropzone
                    files={values[inp.name]}
                    onFiles={(f, append = false) => {
                      if (append) {
                        setFieldValue(inp.name, [...values[inp.name], ...f]);
                      } else {
                        setFieldValue(inp.name, f);
                      }
                    }}
                    multiple
                  ></Dropzone>
                ) : null}
              </Grid>
            ))}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default Form;
