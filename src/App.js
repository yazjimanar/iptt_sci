import "./App.css";
import GeneralInfoPage from "./component/screeens/generalInfoScreen";
import React, { useState, useEffect } from "react";
import Outcomes from "./pages/Outcomes/Outcomes";
import Navbar from "./component/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Grid } from "@mui/material";
import {
  makeStyles,
  CssBaseline,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333996",
      light: "#3c44b126",
    },
    secondary: {
      main: "#f83245",
      light: "#f8324526",
    },
    background: {
      default: "#f4f5fd",
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: "translateZ(0)",
      },
    },
  },
  props: {
    MuiIconButton: {
      disableRipple: true,
    },
  },
});

const useStyles = makeStyles({
  appMain: {
    paddingLeft: "320px",
    width: "100%",
  },
});
function App() {
  const classes = useStyles();
  const [projectData, setProjectData] = useState({
    generalInfo: {
      projectName: "",
      projectDescription: "",
      projectGoal: "",
      donor: "",
      startDate: null,
      endDate: null,
      SOF: "",
      ResponseCode: "",
    },
    outcomes: [],
  });

  const updateProjectData = (newData) => {
    setProjectData((prevData) => ({ ...prevData, ...newData }));
  };

  useEffect(() => {
    localStorage.clear("outcomes");
    const storedData = JSON.parse(localStorage.getItem("projectData"));
    if (storedData) {
      setProjectData(storedData);
    }
  }, []);

  console.log(projectData);

  useEffect(() => {
    localStorage.setItem("projectData", JSON.stringify(projectData));
  }, [projectData]);

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2}>
        <Router>
          <Navbar />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <GeneralInfoPage
                  projectData={projectData}
                  updateProjectData={updateProjectData}
                />
              }
            />
            <Route
              path="/outcomes"
              exact
              element={
                <div className={classes.appMain}>
                  <Outcomes
                    projectData={projectData}
                    updateProjectData={updateProjectData}
                  />
                </div>
              }
            />
            {/* <CssBaseline /> */}
          </Routes>
        </Router>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
