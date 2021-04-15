import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles({
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
});

export interface RandomTagsProps {
  name: string;
  label: string;
  error: boolean | undefined;
  helperText: any;
  value: string[];
  setValue: Function;
  required: boolean | undefined;
}

const RandomTags: React.FC<RandomTagsProps> = ({
  name,
  label,
  error = false,
  helperText = null,
  value,
  setValue,
  required = false,
}) => {
  const classes = useStyles();

  return (
    <Autocomplete
      options={[]}
      renderTags={(value, getTagProps) =>
        value.map((option: any, index) => {
          return (
            <div className={classes.chip}>
              <div className={classes.chipLabel}>{option}</div>
              <CloseIcon
                onClick={() => {
                  let newValues = [...value];
                  newValues.splice(index, 1);
                  setValue(newValues);
                }}
                className={classes.chipIcon}
                fontSize="small"
              ></CloseIcon>
            </div>
          );
        })
      }
      value={value}
      multiple
      freeSolo
      ListboxComponent={() => <div style={{ display: "none" }}></div>}
      renderInput={(params) => {
        const modifiedParams: any = { ...params };
        modifiedParams.inputProps.onKeyDown = (event: React.KeyboardEvent) => {
          const addTag = () => {
            event.preventDefault();
            event.stopPropagation();
            const target: any = event.target;
            if (target.value.length > 0) {
              setValue([...value, target.value]);
            }
          };
          switch (event.key) {
            case ",":
            case " ": {
              addTag();
              break;
            }
            case "Enter": {
              addTag();
              break;
            }
            default:
          }
        };
        return (
          <TextField
            {...modifiedParams}
            required={required}
            error={error}
            helperText={helperText}
            variant="standard"
            label={label}
            fullWidth
          />
        );
      }}
    />
  );
};

export default RandomTags;
