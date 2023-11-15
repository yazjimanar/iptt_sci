import React, { useState } from "react";
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
import Grid from "@mui/material/Grid";
import Navbar from "../Navbar/Navbar";
import {
  Paper,
  makeStyles,
  // TableBody,
  // TableRow,
  // TableCell,
  // Toolbar,
  // InputAdornment,
} from "@material-ui/core";

const GeneralInfoPage = ({
  projectData = { generalInfo: [] },
  updateProjectData,
}) => {
  const [info, setInfo] = useState({
    projectName: "",
    projectDescription: "",
    projectGoal: "",
    donor: "",
    startDate: null,
    endDate: null,
    SOF: "",
    ResponseCode: "",
  });

  const handleSave = () => {
    updateProjectData({
      ...projectData,
      generalInfo: [...(projectData.projectInfo || []), info],
    });
    // console.log(info);
  };

  const handleChange = (field, value) => {
    setInfo((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const useStyles = makeStyles((theme) => ({
    pageContent: {
      margin: theme.spacing(5),
      padding: theme.spacing(3),
    },
    searchInput: {
      width: "75%",
    },
    newButton: {
      position: "absolute",
      right: "10px",
    },
  }));

  const classes = useStyles();
  return (
    // <Paper
    //   className={classes.pageContent}
    //   style={{ width: "50%", paddingLeft: "220px" }}
    // >
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
        // background: "#f4f5fd",
        margin: "auto",
        boxSizing: "border-box",
      }}
    >
      <Navbar />
      <TextField
        id="standard-basic"
        label="Project Name"
        variant="standard"
        sx={{ width: "50%" }}
        value={info.projectName}
        onChange={(e) => handleChange("projectName", e.target.value)}
      />
      <TextField
        id="standard-basic"
        label="Project Description"
        variant="standard"
        sx={{ width: "50%" }}
        value={info.projectDescription}
        onChange={(e) => handleChange("projectDescription", e.target.value)}
      />
      <TextField
        id="standard-basic"
        label="Project Goal"
        variant="standard"
        sx={{ width: "50%" }}
        value={info.projectGoal}
        onChange={(e) => handleChange("projectGoal", e.target.value)}
      />
      <TextField
        id="standard-basic"
        label="SOF"
        variant="standard"
        sx={{ width: "50%" }}
        value={info.SOF}
        onChange={(e) => handleChange("SOF", e.target.value)}
      />
      <TextField
        id="standard-basic"
        label="Response Code"
        variant="standard"
        sx={{ width: "50%" }}
        value={info.ResponseCode}
        onChange={(e) => handleChange("ResponseCode", e.target.value)}
      />

      <FormControl variant="standard" sx={{ width: "50%" }}>
        <InputLabel id="demo-simple-select-standard-label">Donor</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          label="Donor"
          value={info.donor}
          onChange={(e) => handleChange("donor", e.target.value)}
        >
          <MenuItem value="" sx={{ width: "50%" }}>
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>BHA</MenuItem>
          <MenuItem value={20}>DANIDA</MenuItem>
          <MenuItem value={30}>GFFO</MenuItem>
          <MenuItem value={40}>ECHO</MenuItem>
          <MenuItem value={50}>SWS</MenuItem>
        </Select>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            width: "50%",
            justifyContent: "space-between",
          }}
        >
          <DatePicker
            label="Start Date"
            sx={{ width: "50%" }}
            value={info.startDate}
            onChange={(date) => handleChange("startDate", date)}
          />
          <DatePicker
            label="End Date"
            sx={{ width: "50%" }}
            value={info.endDate}
            onChange={(date) => handleChange("endDate", date)}
          />
        </div>
      </LocalizationProvider>

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
    // </Paper>
  );
};

export default GeneralInfoPage;
