import Box from "@material-ui/core/Box";
import ButtonBase from "@material-ui/core/ButtonBase";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
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

export interface OptionsListProps {
  options: string[] | undefined;
  setValue: Function;
  value: string;
}

const OptionsList: React.FC<OptionsListProps> = ({ options, setValue, value }) => {
  const classes = useStyles();
  return (
    <Box display="flex" flexWrap="wrap">
      {options
        ? options.map((opt, optInd) => (
            <ButtonBase
              key={`${Math.random()}-opt-${optInd}`}
              onClick={() => setValue(opt)}
              className={
                classes.listOption + " " + (value === opt ? classes.selectedListOption : "")
              }
            >
              {opt}
            </ButtonBase>
          ))
        : null}
    </Box>
  );
};

export default OptionsList;
