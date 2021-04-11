import { StepForm } from "interfaces";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import { makeStyles } from "@material-ui/core/styles";
import InputGroup from "components/InputGroup";

const useStyles = makeStyles({
  inputGroupTitle: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 15,
  },

  inputGroup: {
    marginBottom: 32,
    width: "100%",
  },

  tag: {
    borderRadius: 3,
    background: "#DCDCDC",
    height: 22,
    padding: "0 5px",
  },

  chip: {
    background: "#F5F5F5",
    padding: "1px 10px",
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    margin: "5px 7px 5px 0",
  },

  chipLabel: {
    marginRight: 6,
    verticalAlign: "center",
  },

  chipIcon: {
    color: "gray",
    cursor: "pointer",
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

export interface FormProps {
  form: StepForm;
  setFieldValue: Function;
  allValues: { [key: string]: any };
  onSubmit: Function;
  user: any;
  submitCount: number;
  errors: { [ke: string]: string };
  addGroup: Function;
  deleteGroup: Function;
}

const Form: React.FC<FormProps> = ({
  form,
  errors,
  setFieldValue,
  submitCount,
  allValues,
  addGroup,
  deleteGroup,
  user,
}) => {
  const classes = useStyles();
  const values = allValues[form.name];

  return (
    <Grid container>
      {form.inputGroups.map((inpGroup, i) => (
        <>
          {!inpGroup.visible ||
          (inpGroup.visible && inpGroup.visible({ values: allValues, user })) ? (
            <Box className={classes.inputGroup}>
              {inpGroup.multipliable ? (
                values[inpGroup.name as string].map((x, i) => (
                  <InputGroup
                    path={inpGroup.name + "/" + i + "/"}
                    index={i}
                    length={values[inpGroup.name as string].length}
                    values={x}
                    errors={errors}
                    inputGroup={inpGroup}
                    setFieldValue={setFieldValue}
                    submitCount={submitCount}
                    allValues={allValues}
                    user={user}
                    addGroup={addGroup}
                    deleteGroup={deleteGroup}
                  ></InputGroup>
                ))
              ) : (
                <InputGroup
                  path={""}
                  length={1}
                  index={i}
                  values={values}
                  errors={errors}
                  inputGroup={inpGroup}
                  setFieldValue={setFieldValue}
                  submitCount={submitCount}
                  allValues={allValues}
                  user={user}
                  addGroup={addGroup}
                  deleteGroup={deleteGroup}
                ></InputGroup>
              )}
            </Box>
          ) : null}
        </>
      ))}
    </Grid>
  );
};

export default Form;
