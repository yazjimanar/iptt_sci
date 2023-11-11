import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SaveIcon from "@mui/icons-material/Save";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const Outcomes = ({ projectData, updateProjectData }) => {
  const [nextId, setNextId] = useState(1);
  const [outcomes, setOutcomes] = useState([
    { ID: nextId, VALUE: "", OUTPUT: [] },
  ]);
  const handleSave = () => {
    // Update projectData with the  entered outcome
    updateProjectData({
      outcomes: [...projectData.outcomes, ...outcomes],
    });
    // Move to the next page
  };

  const handleAddOutcome = () => {
    setOutcomes((prevOutcomes) => [
      ...prevOutcomes,
      { ID: nextId + 1, VALUE: "", OUTPUT: [] },
    ]);
    setNextId((prevId) => prevId + 1); // Increment nextId
  };

  const handleChange = (index, field, value) => {
    setOutcomes((prevOutcomes) => {
      const updatedOutcomes = [...prevOutcomes];
      updatedOutcomes[index] = {
        ...updatedOutcomes[index],
        [field]: value,
      };
      return updatedOutcomes;
    });
  };

  return (
    <Grid
      item
      sx={8}
      md={12}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexWrap: "norawp",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
        background: "#FCF5ED",
        padding: "0px",
        margin: "0px",
        boxSizing: "border-box",
      }}
    >
      {outcomes.map((outcome, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "norawp",
            flexDirection: "row",
            height: "100vh",
            width: "50%",
          }}
        >
          <TextField
            id="standard-basic"
            label="Outcome Name"
            variant="standard"
            sx={{ width: "50%" }}
            value={outcome.VALUE}
            onChange={(e) => handleChange(index, "VALUE", e.target.value)}
          />
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<AddCircleIcon />}
              sx={{ marginBottom: "50px" }}
              onClick={handleAddOutcome}
            >
              Add
            </Button>
          </Stack>
        </div>
      ))}

      <Stack direction="row" spacing={2}>
        <Button
          variant="outlined"
          startIcon={<SaveIcon />}
          sx={{ marginBottom: "50px" }}
          onClick={handleSave}
        >
          NEXT
        </Button>
      </Stack>
    </Grid>
  );
};

export default Outcomes;
