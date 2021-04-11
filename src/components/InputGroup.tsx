import { InputGroup as InputGroupType, User as UserType } from "interfaces";
import Input from "components/Input";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  inputGroupTitle: {
    fontSize: 20,
    fontWeight: 600,
  },
});

export interface InputGroupProps {
  inputGroup: InputGroupType | any;
  allValues: any;
  user: UserType;
  values: any;
  errors: any;
  submitCount: number;
  setFieldValue: Function;
  index: number;
  path: string;
  addGroup: Function;
  deleteGroup: Function;
  length: number;
}

const InputGroup: React.FC<InputGroupProps> = ({
  inputGroup,
  allValues,
  user,
  path,
  values,
  errors,
  submitCount,
  setFieldValue,
  index,
  length,
  addGroup,
  deleteGroup,
}) => {
  const classes = useStyles();
  return (
    <Grid
      style={{ width: "100%" }}
      container
      spacing={3}
      justify={inputGroup.justifyContent ? inputGroup.justifyContent : "flex-start"}
    >
      {inputGroup.title ? (
        <Grid item xs={12} className={classes.inputGroupTitle}>
          <Box display="flex" alignItems="center">
            {inputGroup.switchable && inputGroup.name ? (
              <Box mr={2}>
                <Switch
                  color="primary"
                  checked={values[inputGroup.name.toString()]}
                  onChange={(e) =>
                    inputGroup.name ? setFieldValue(inputGroup.name, e.target.checked) : {}
                  }
                />
              </Box>
            ) : null}
            <div>
              {inputGroup.title} {inputGroup.multipliable ? index + 1 : ""}
            </div>
          </Box>
        </Grid>
      ) : null}
      {inputGroup.inputs ? (
        inputGroup.inputs.map((inp, j) => (
          <Input
            path={path}
            groupIndex={index}
            inputIndex={j}
            errors={errors}
            values={values}
            input={inp}
            allValues={allValues}
            user={user}
            submitCount={submitCount}
            setFieldValue={setFieldValue}
          ></Input>
        ))
      ) : inputGroup.inputGroups ? (
        values[inputGroup.inputGroups[0].name].map((value, i) => (
          <Grid item xs={12}>
            <InputGroup
              deleteGroup={deleteGroup}
              length={values[inputGroup.inputGroups[0].name].length}
              path={path + (inputGroup.inputGroups[0].name as string) + "/" + i + "/"}
              user={user}
              setFieldValue={setFieldValue}
              index={i}
              inputGroup={inputGroup.inputGroups[0]}
              submitCount={submitCount}
              errors={errors}
              values={value}
              allValues={allValues}
              addGroup={addGroup}
            ></InputGroup>
          </Grid>
        ))
      ) : (
        <div></div>
      )}
      {inputGroup.multipliable && index === length - 1 ? (
        <Grid xs={12} md={3} item>
          <Box display="flex" alignItems="center">
            {length > 1 ? (
              <Box mr={2}>
                <DeleteIcon
                  style={{ color: "gray", cursor: "pointer" }}
                  onClick={() => deleteGroup(path)}
                ></DeleteIcon>
              </Box>
            ) : (
              ""
            )}
            <Button onClick={() => addGroup(path, inputGroup)} variant="contained" color="primary">
              <Box mr={1} display="flex" alignItems="center">
                <AddIcon></AddIcon>
              </Box>
              {inputGroup.multiplyButtonText}
            </Button>
          </Box>
        </Grid>
      ) : null}
    </Grid>
  );
};

export default InputGroup;
