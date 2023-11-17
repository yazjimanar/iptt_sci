import React, { useState, useEffect } from "react";
import IndicatorForm from "./IndicatorForm";
import PageHeader from "../../component/PageHeader";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
} from "@material-ui/core";
import useTable from "../../component/useTable";
import * as indicatorService from "../../services/indicatorService";
import Controls from "../../component/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from "@mui/icons-material/Add";
import Popup from "../../component/Popup";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@mui/icons-material/Close";
import OutputIcon from "@mui/icons-material/Output";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SaveIcon from "@mui/icons-material/Save";
import AddCircleIcon from "@mui/icons-material/AddCircle";

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

const headCells = [
  { id: "outcomeId", label: "Outcome ID" },
  { id: "indicatorId", label: "Indicator ID" },
  { id: "indicator", label: "Indicator" },
  { id: "calculation", label: "Calculation Methode" },
  { id: "disaggregation", label: "Disaggregation" },
  { id: "target", label: "Target" },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function Outcomes() {
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [records, setRecords] = useState(indicatorService.getAllIndicators());
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

  useEffect(() => {
    console.log("Component Mounted"); // Placeholder log
    const fetchData = async () => {
      const updatedRecords = await indicatorService.getAllIndicators();
      setRecords(updatedRecords || []); // Set records or an empty array if undefined
      console.log("Fetched Data:", updatedRecords);
    };

    fetchData();
  }, []);
  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter((x) =>
            x.indicator.toLowerCase().includes(target.value)
          );
      },
    });
  };

  const addOrEdit = (data, resetForm) => {
    data.indicatorId = data.id;
    if (data.indicatorId === undefined) {
      indicatorService.insertIndicator(data);
      data.indicatorId = indicatorService.generateIndicatorId();
      console.log(data.id);
    } else indicatorService.updateIndicator(data);
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    setRecords(
      indicatorService
        .getAllIndicators()
        .map((x) => ({ ...x, id: x.indicatorId }))
    );
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const handleDelete = async (indicatorId) => {
    if (window.confirm("Are you sure to delete this record?")) {
      console.log("Deleting indicator with ID:", indicatorId);
      const updatedIndicators = indicatorService.deleteIndicator(indicatorId);
      console.log("Updated Indicators after deletion:", updatedIndicators);
      setRecords(updatedIndicators);
    }
  };

  /*Outcome*/

  const [nextId, setNextId] = useState(1);
  const [outcomes, setOutcomes] = useState([
    { ID: nextId, VALUE: "", OUTPUT: [] },
  ]);
  // const handleSave = () => {
  //   // Update projectData with the  entered outcome
  //   updateProjectData({
  //     outcomes: [...projectData.outcomes, ...outcomes],
  //   });
  //   // Move to the next page
  // };

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
    <>
      <PageHeader
        title="Outcome Page"
        subTitle="Define the outcomes of your project with indicators"
        icon={<OutputIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        {/* <Grid
          item
          sx={8}
          md={12}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            flexWrap: "norawp",
            flexDirection: "column",
            // height: "100vh",
            // width: "100%",
            // background: "#FCF5ED",
            paddingLeft: "220px",
            margin: "0px",
            boxSizing: "border-box",
          }}
        > */}
        {outcomes.map((outcome, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "norawp",
              flexDirection: "row",
              // height: "100vh",
              // width: "50%",
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
            // onClick={handleSave}
          >
            NEXT
          </Button>
        </Stack>
        {/* </Grid> */}
      </Paper>
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            label="Search Indicator"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
          <Controls.Button
            text="Add New Indicator"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.outcomeId}</TableCell>
                <TableCell>{item.indicatorId}</TableCell>
                <TableCell>{item.indicator}</TableCell>
                <TableCell>{item.calculation}</TableCell>
                <TableCell>{item.disaggregation}</TableCell>
                <TableCell>{item.target}</TableCell>
                <TableCell>
                  <Controls.ActionButton
                    color="primary"
                    onClick={() => {
                      openInPopup(item);
                    }}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </Controls.ActionButton>
                  <Controls.ActionButton
                    color="secondary"
                    onClick={() => {
                      handleDelete(item.indicatorId);
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Popup
        title="Indicator Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <IndicatorForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
    </>
  );
}
