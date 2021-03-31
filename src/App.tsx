import MultiStepForm from "components/MultiStepForm";
import { StepForm } from "interfaces";
import MetadataSourceForm from "forms/MetadataSource";
import AdditionalPropertiesFrom from "forms/AdditionalProperties";
import LoadFilesForm from "forms/LoadFiles";
import { makeStyles, createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import Box from "@material-ui/core/Box";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#0294F2" },
    secondary: { main: "#38BE01" },
  },
});

const useStyles = makeStyles({
  container: (props: any) => ({
    position: "fixed",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    overflow: "auto",
    background: props.fillingForm ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0)",
  }),
  modal: {
    backgroundColor: "#F6F6F6",
    padding: 20,
    margin: "auto",
    maxWidth: 500,
    width: "100%",
    position: "relative",
  },
  modalCloseIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    cursor: "pointer",
  },
  modalContainer: {
    position: "fixed",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    overflow: "auto",
    background: "rgba(0,0,0,0.4)",
  },
});

function App() {
  const forms: Array<StepForm> = [MetadataSourceForm, AdditionalPropertiesFrom, LoadFilesForm];

  const [fillingForm, setFillingForm] = useState(true);
  const [showValues, setShowValues] = useState(false);
  const [values, setValues] = useState({});
  const classes = useStyles({ fillingForm });

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.container}>
        {fillingForm ? (
          <MultiStepForm
            title="Create Metadata Source"
            comment="Follow the simple 4 steps to create a source"
            values={values}
            forms={forms}
            setValues={setValues}
            onClose={() => setFillingForm(false)}
          ></MultiStepForm>
        ) : (
          <Box m="auto">
            <Box display="flex">
              <Box mr={2}>
                <Button onClick={() => setFillingForm(true)} color="primary" variant="contained">
                  Continue filling form
                </Button>
              </Box>
              <Button
                color="secondary"
                style={{ color: "white" }}
                variant="contained"
                onClick={() => setShowValues(true)}
              >
                Show values
              </Button>
            </Box>
          </Box>
        )}
        <Modal open={showValues} onClose={() => setShowValues(false)}>
          <Box className={classes.modalContainer} onClick={() => setShowValues(false)}>
            <div style={{ margin: "auto", maxWidth: 500, width: "100%" }}>
              <Box className={classes.modal} onClick={(e) => e.stopPropagation()}>
                <CloseIcon
                  className={classes.modalCloseIcon}
                  onClick={() => setShowValues(false)}
                ></CloseIcon>
                <pre>{JSON.stringify(values, undefined, 2)}</pre>
              </Box>
            </div>
          </Box>
        </Modal>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
