import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SaveIcon from "@mui/icons-material/Save";

export default function GeneralInfoScreen() {
  const [formData, setFormData] = useState({
    projectName: "",
    projectDescription: "",
    projectGoal: "",
    donor: "",
    startDate: null,
    endDate: null,
  });

  const handleSave = async () => {
    console.log("Data to be saved:", formData);
    try {
      await axios.post("http://localhost:3005/saveData", formData);
      console.log("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  return (
    <div
      style={{
        margin: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexWrap: "wrap",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
        background: "#FCF5ED",
      }}
    >
      <TextField
        id="standard-basic"
        label="Project Name"
        variant="standard"
        sx={{ width: "50%", marginTop: "20px" }}
        value={formData.projectName}
        onChange={(e) => handleChange("projectName", e.target.value)}
      />
      <TextField
        id="standard-basic"
        label="Project Description"
        variant="standard"
        sx={{ width: "50%", marginTop: "20px" }}
        value={formData.projectDescription}
        onChange={(e) => handleChange("projectDescription", e.target.value)}
      />
      <TextField
        id="standard-basic"
        label="Project Goal"
        variant="standard"
        sx={{ width: "50%", marginTop: "20px" }}
        value={formData.projectGoal}
        onChange={(e) => handleChange("projectGoal", e.target.value)}
      />
      <FormControl variant="standard" sx={{ width: "50%", marginTop: "20px" }}>
        <InputLabel id="demo-simple-select-standard-label">Donor</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          label="Donor"
          value={formData.donor}
          onChange={(e) => handleChange("donor", e.target.value)}
        >
          <MenuItem value="" sx={{ width: "50%", marginTop: "20px" }}>
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>BHA</MenuItem>
          <MenuItem value={20}>DANIDA</MenuItem>
          <MenuItem value={30}>GFFO </MenuItem>
        </Select>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Start Date"
          sx={{ width: "50%", marginTop: "20px" }}
          value={formData.startDate}
          onChange={(date) => handleChange("startDate", date)}
        />
        <DatePicker
          label="End Date"
          sx={{ width: "50%", marginTop: "20px" }}
          value={formData.endDate}
          onChange={(date) => handleChange("endDate", date)}
        />
      </LocalizationProvider>

      <Stack direction="row" spacing={2}>
        <Button
          variant="outlined"
          startIcon={<SaveIcon />}
          sx={{ marginBottom: "50px" }}
          onClick={handleSave}
        >
          SAVE
        </Button>
      </Stack>
    </div>
  );
}
