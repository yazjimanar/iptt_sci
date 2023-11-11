import "./App.css";
import GeneralInfoPage from "./component/screeens/generalInfoScreen";
import React, { useState, useEffect } from "react";
import Outcomes from "./component/screeens/outcomes";
import Navbar from "./component/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Grid } from "@mui/material";

function App() {
  const [projectData, setProjectData] = useState({
    generalInfo: {
      projectName: "",
      projectDescription: "",
      projectGoal: "",
      donor: "",
      startDate: null,
      endDate: null,
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
              <Outcomes
                projectData={projectData}
                updateProjectData={updateProjectData}
              />
            }
          />
        </Routes>
      </Router>
    </Grid>
  );
}

export default App;
