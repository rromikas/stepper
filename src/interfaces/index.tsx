type InputType =
  | "autocomplete"
  | "text"
  | "switch"
  | "checkbox"
  | "opt-list"
  | "file"
  | "random-tags";
type InputSpanCols = 12 | 9 | 8 | 6 | 4 | 3;

type JustifyContent = "flex-start" | "center" | "flex-end";

export interface Input {
  type: InputType;
  label: string;
  name: string;
  options?: Array<string>;
  optionsFetchUrl?: string;
  span: InputSpanCols;
  validate?: Function;
  initialValue: any;
  required?: boolean;
}

export interface InputGroup {
  title: string;
  switchable: boolean;
  name?: string;
  enabled?: boolean;
  inputs: Array<Input>;
  justifyContent?: JustifyContent;
}

export interface StepForm {
  stepLabel: string;
  stepComment: string;
  inputGroups: Array<InputGroup>;
  name: string;
}

export interface TableRow {
  name: string;
  [key: string]: number | string;
}

export interface TableHeadCell {
  id: string;
  numeric: boolean;
  disablePadding: boolean;
  label: string;
  formatValue: Function;
}

export interface Step {
  label: string;
  comment: string;
}
