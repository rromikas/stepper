type InputType =
  | "autocomplete"
  | "text"
  | "switch"
  | "checkbox"
  | "options-list"
  | "file"
  | "random-tags"
  | "selectable-tags"
  | "names-tree";
type InputSpanCols = 12 | 9 | 8 | 6 | 4 | 3;

type JustifyContent = "flex-start" | "center" | "flex-end";

type Role = "admin" | "client";

type VisibilityFunction = (props: {
  values: { [key: string]: { [key: string]: number | string | boolean } };
  user: User;
}) => boolean;

type EmptyInputType = "empty";

export type EmptyInput = {
  type: EmptyInputType;
  span: InputSpanCols;
  visible?: VisibilityFunction;
};

type ButtonType = "reset";

export type Button = {
  type: ButtonType;
  span: InputSpanCols;
  visible?: VisibilityFunction;
};

export interface User {
  role: Role;
}

export interface Input {
  type: InputType;
  label: string;
  name: string;
  password?: boolean;
  options?: Array<string>;
  optionsFetchUrl?: string;
  span: InputSpanCols;
  validate?: Function;
  initialValue: any;
  required?: boolean;
  visible?: VisibilityFunction;
}

export interface InputGroup {
  title: string;
  switchable: boolean;
  name?: string;
  multipliable?: boolean;
  multiplyButtonText?: string;
  enabled?: boolean;
  inputs?: Array<Input | EmptyInput | Button>;
  inputGroups?: InputGroup[];
  justifyContent?: JustifyContent;
  visible?: VisibilityFunction;
}

export interface StepForm {
  stepLabel: string;
  stepComment: string;
  inputGroups: Array<InputGroup>;
  name: string;
  visible?: VisibilityFunction;
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

export interface SummarySection {
  title: string;
  labels: string[];
}

export interface Summary {
  icon: string;
  title: string;
  comment: string;
  sections: SummarySection[];
}
