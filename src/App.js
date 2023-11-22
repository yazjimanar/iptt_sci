import "./App.css";
import GeneralInfoPage from "./component/screeens/generalInfoScreen";
import React, { useState, useEffect } from "react";
import Outcomes from "./pages/Outcomes/Outcomes";
import Navbar from "./component/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Grid } from "@mui/material";
import { makeStyles, ThemeProvider } from "@material-ui/core";

import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
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
    paddingLeft: "235px",
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
  const [outcomeIndicators, setOutcomeIndicators] = useState({
    outcomeIndicators: {
      outcomeId: "",
      indicatorId: "",
      indicator: "",
      calculation: "",
      disaggregation: "",
      target: "",
    },
  });

  const [allLocalData, setAllLocalData] = useState({});

  const updateProjectData = (newData) => {
    setProjectData((prevData) => ({ ...prevData, ...newData }));
  };

  // useEffect(() => {
  //   // localStorage.clear();
  //   const storedData = JSON.parse(localStorage.getItem("projectData"));
  //   const storedIndicator = JSON.parse(
  //     localStorage.getItem("outcomeIndicators")
  //   );
  //   if (storedData) {
  //     setProjectData(storedData);
  //   }
  //   if (storedIndicator) {
  //     setOutcomeIndicators(storedIndicator);
  //   }
  // }, []);

  useEffect(() => {
    // localStorage.clear();
    // Function to get all data stored locally
    const getAllLocalData = () => {
      const data = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        data[key] = JSON.parse(value);
      }
      return data;
    };

    // Retrieve all local data and set it in the component state
    const localData = getAllLocalData();
    setAllLocalData(localData);
  }, []);

  console.log(allLocalData);

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
          </Routes>
        </Router>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
