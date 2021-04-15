import Grid from "@material-ui/core/Grid";
import OptionsList from "components/inputs/OptionsList";
import RandomTags from "components/inputs/RandomTags";
import Dropzone from "components/Dropzone";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "components/inputs/Autocomplete";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import NamesTree from "components/NamesTree";
import { Input as InputType, EmptyInput, Button as ButtonType, User as UserType } from "interfaces";

export interface InputProps {
  groupIndex: number;
  inputIndex: number;
  input: InputType | EmptyInput | ButtonType;
  values: any;
  allValues: any;
  errors: any;
  submitCount: number;
  setFieldValue: Function;
  user: UserType;
  path: string;
}

const Input: React.FC<InputProps> = ({
  input,
  path,
  groupIndex,
  inputIndex,
  values,
  allValues,
  errors,
  submitCount,
  setFieldValue,
  user,
}) => {
  return !input.visible || (input.visible && input.visible({ values: allValues, user })) ? (
    <Grid key={`input-${inputIndex}-inpGroup-${groupIndex}`} xs={12} md={input.span} item>
      {input.type === "text" ? (
        <TextField
          fullWidth
          name={input.name}
          type={input.password ? "password" : "text"}
          required={input.required}
          label={input.label}
          value={values[input.name]}
          error={errors[input.name] && submitCount > 0 ? true : false}
          helperText={submitCount > 0 ? errors[input.name] : null}
          onChange={(e) => setFieldValue(path + input.name, e.target.value)}
        ></TextField>
      ) : input.type === "reset" ? (
        <Button variant="outlined">Reset to default</Button>
      ) : input.type === "empty" ? (
        <div></div>
      ) : input.type === "options-list" ? (
        <OptionsList
          value={values[input.name]}
          setValue={(val) => setFieldValue(path + input.name, val)}
          options={input.options}
        ></OptionsList>
      ) : input.type === "autocomplete" ? (
        <Autocomplete
          fixedOptions={input.fixedOptions}
          options={input.options}
          name={input.name}
          label={input.label}
          setValue={(val) => setFieldValue(path + input.name, val)}
          value={values[input.name]}
          required={input.required}
          error={errors[input.name] && submitCount > 0 ? true : false}
          helperText={submitCount > 0 ? errors[input.name] : null}
        ></Autocomplete>
      ) : input.type === "random-tags" ? (
        <RandomTags
          name={input.name}
          label={input.label}
          setValue={(val) => setFieldValue(input.name, val)}
          value={values[input.name]}
          required={input.required}
          error={errors[input.name] && submitCount > 0 ? true : false}
          helperText={submitCount > 0 ? errors[input.name] : null}
        ></RandomTags>
      ) : input.type === "checkbox" ? (
        <Box display="flex" alignItems="center">
          <Box mr={1}>
            <Checkbox
              checked={values[input.name]}
              onChange={(e) => setFieldValue(path + input.name, e.target.checked)}
              color="primary"
            />
          </Box>
          <div>{input.label}</div>
        </Box>
      ) : input.type === "file" ? (
        <Dropzone
          error={errors[input.name] && submitCount > 0 ? errors[input.name] : ""}
          files={values[input.name]}
          onFiles={(f, append = false) => {
            if (append) {
              setFieldValue(path + input.name, [...values[input.name], ...f]);
            } else {
              setFieldValue(path + input.name, f);
            }
          }}
          multiple
        ></Dropzone>
      ) : input.type === "names-tree" ? (
        <NamesTree
          source={allValues}
          target={values[input.name]}
          setTarget={(val) => setFieldValue(path + input.name, val)}
        ></NamesTree>
      ) : null}
    </Grid>
  ) : (
    <div></div>
  );
};

export default Input;
