import MultiStepForm from "components/MultiStepForm";
import { StepForm } from "interfaces";
import V1Forms from "forms/formV1";
import { makeStyles, createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import Box from "@material-ui/core/Box";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import { User as UserType, Summary as SummaryType } from "interfaces";
import ImportExportForms from "forms/importExport";
import CreateTermForms from "forms/createTerm";
import ImportExportSummary from "forms/importExport/Summary";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import V1Summary from "forms/formV1/Summary";
import TermSummary from "forms/createTerm/Summary";

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
    background: !props.stopped ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0)",
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

  form: {
    outline: "none",
    width: "100%",
    cursor: "pointer",
    whiteSpace: "nowrap",
    padding: 20,
    background: "#eff2f5",
    borderRadius: 11,
    transition: "all 0.2s",
    "&:hover": {
      background: "#e3e7ea",
    },
  },
  title: {
    fontWeight: 600,
    fontSize: 22,
    marginBottom: 10,
  },
});

function App() {
  const allForms = [
    { title: "V1 form", forms: V1Forms, summary: V1Summary },
    { title: "Create Term", forms: CreateTermForms, summary: TermSummary },
    { title: "Import / Export", forms: ImportExportForms, summary: ImportExportSummary },
  ];
  const [formsIndex, setFormsIndex] = useState(-1);
  const forms = formsIndex > -1 ? allForms[formsIndex].forms : null;
  const summary = formsIndex > -1 ? allForms[formsIndex].summary : null;
  const [fillingForm, setFillingForm] = useState(false);
  const [stopped, setStopped] = useState(true);
  const [showValues, setShowValues] = useState(false);
  const [values, setValues] = useState({});
  const [user] = useState({ role: "admin" } as UserType);
  const classes = useStyles({ stopped });
  const [displayStepper, setDisplayStepper] = useState(true);

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.container}>
        {fillingForm ? (
          stopped ? (
            <Box m="auto">
              <Box display="flex">
                <Box mr={2}>
                  <Button onClick={() => setStopped(false)} color="primary" variant="contained">
                    Continue filling form
                  </Button>
                </Box>
                <Box mr={2}>
                  <Button
                    color="secondary"
                    style={{ color: "white" }}
                    variant="contained"
                    onClick={() => setShowValues(true)}
                  >
                    Show values
                  </Button>
                </Box>
                <Button color="secondary" variant="outlined" onClick={() => setFillingForm(false)}>
                  Select other form
                </Button>
              </Box>
            </Box>
          ) : forms ? (
            <MultiStepForm
              displayStepper={displayStepper}
              setDisplayStepper={setDisplayStepper}
              user={user}
              title="Create Metadata Source"
              comment="Follow the simple 4 steps to create a source"
              initialValues={values}
              forms={forms as Array<StepForm>}
              saveValues={setValues}
              onClose={() => {
                setStopped(true);
              }}
              summary={summary as SummaryType}
            ></MultiStepForm>
          ) : null
        ) : (
          <Box m="auto" style={{ maxWidth: 600, width: "100%" }}>
            <div className={classes.title}>Select form</div>
            <Grid container spacing={2}>
              {allForms.map((x, i) => (
                <Grid item xs={4} key={`form-${i}`}>
                  <ButtonBase
                    onClick={() => {
                      setFormsIndex(i);
                      setFillingForm(true);
                      setStopped(false);
                    }}
                    className={classes.form}
                  >
                    {x.title}
                  </ButtonBase>
                </Grid>
              ))}
            </Grid>
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
