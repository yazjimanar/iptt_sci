import React, { useState, useEffect } from "react";
import IndicatorForm from "./IndicatorForm";
import OutputForm from "./OutputForm";
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
import Tooltip from "@mui/material/Tooltip";

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
  { id: "outputId", label: "Outcome ID" },
  { id: "indicatorId", label: "Indicator ID" },
  { id: "indicator", label: "Indicator" },
  { id: "calculation", label: "Calculation Methode" },
  { id: "disaggregation", label: "Disaggregation" },
  { id: "target", label: "Target" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const outputHeadCells = [
  { id: "outcomeId", label: "Outcome ID" },
  { id: "outputId", label: "Output ID" },
  { id: "output", label: "Output" },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function Output() {
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [recordForEditOutput, setRecordForEditOutput] = useState(null);
  const [outputRecords, setOutputRecords] = useState(
    indicatorService.getAllIndicators("OutputsData")
  );
  const [records, setRecords] = useState(
    indicatorService.getAllIndicators("OutputIndicators")
  );
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [outputFilterFn, setOutputFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [outputOpenPopup, setOutputOpenPopup] = useState(false);

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting: indicatorRecordsAfterPagingAndSorting,
  } = useTable(records, headCells, filterFn);

  const {
    TblContainer: OTblContainer,
    TblHead: OTblHead,
    TblPagination: OTblPagination,
    recordsAfterPagingAndSorting: outputRecordsAfterPagingAndSorting,
  } = useTable(outputRecords, outputHeadCells, outputFilterFn);

  useEffect(() => {
    const fetchData = async () => {
      const updatedRecords = await indicatorService.getAllIndicators(
        "OutputIndicators"
      );
      setRecords(updatedRecords || []);
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

  const handleSearchOutput = (e) => {
    let target = e.target;
    setOutputFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter((x) =>
            x.output.toLowerCase().includes(target.value)
          );
      },
    });
  };

  const handleClearSearchOutput = () => {
    // Clear the search input
    setOutputFilterFn({
      fn: (items) => {
        return items;
      },
    });

    // Clear the search input field
    const searchInput = document.getElementById("search-outcome-input");
    searchInput.value = "";
    searchInput.dispatchEvent(new Event("input", { bubbles: true })); // Trigger input event
  };

  const handleClearSearch = () => {
    // Clear the search input
    setFilterFn({
      fn: (items) => {
        return items;
      },
    });

    // Clear the search input field
    const searchInput = document.getElementById("search-outcome-input1");
    searchInput.value = "";
    searchInput.dispatchEvent(new Event("input", { bubbles: true })); // Trigger input event
  };

  const addOrEdit = (data, resetForm) => {
    const outputId = data.outputId;
    const indicators = indicatorService.getIndicatorsForOutput(outputId);
    const nextIndicatorNumber = indicators.length + 1;
    const nextIndicatorId = `${outputId}.${nextIndicatorNumber}`;

    if (!data.indicatorId) {
      data.indicatorId = String(nextIndicatorId);
      indicatorService.insertIndicatorOutput(data, "OutputIndicators");
    } else {
      indicatorService.updateIndicator(data, "OutputIndicators");
    }

    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    setRecords(
      indicatorService
        .getAllIndicators("OutputIndicators")
        .map((x) => ({ ...x, id: x.indicatorId }))
    );
  };

  const addOrEditOutput = (data, resetForm) => {
    const outcomeId = data.outcomeId;
    const indicators = indicatorService.getOutcome(outcomeId);

    const nextIndicatorNumber = indicators.length + 1;
    const nextIndicatorId = `${outcomeId}.${nextIndicatorNumber}`;

    if (data.indicatorId === undefined) {
      data.indicatorId = String(nextIndicatorId);
      indicatorService.insertIndicatorOutput(data, "OutputsData");
    } else {
      indicatorService.updateIndicator(data, "OutputsData");
    }

    resetForm();
    setRecordForEditOutput(null);
    setOutputOpenPopup(false);
    setOutputRecords(
      indicatorService
        .getAllIndicators("OutputsData")
        .map((x) => ({ ...x, id: x.indicatorId }))
    );
  };
  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const openInPopupOutput = (item) => {
    setRecordForEditOutput(item);
    setOutputOpenPopup(true);
  };

  const handleDelete = async (indicatorId) => {
    if (window.confirm("Are you sure to delete this record?")) {
      const updatedIndicators = indicatorService.deleteIndicator(
        indicatorId,
        "OutputIndicators"
      );
      setRecords(updatedIndicators);
    }
  };

  const handleDeleteOutput = async (outputId) => {
    if (window.confirm("Are you sure to delete this record?")) {
      const updatedIndicators = indicatorService.deleteIndicator(
        outputId,
        "OutputsData"
      );
      setOutputRecords(updatedIndicators);
    }
  };

  return (
    <>
      <PageHeader
        title="Output Page"
        subTitle="Define the outputs of your project with indicators"
        icon={<OutputIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            id="search-outcome-input"
            label="Search Output"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Controls.ActionButton
                    color="secondary"
                    onClick={handleClearSearchOutput}
                  >
                    <CloseIcon fontSize="small" />
                  </Controls.ActionButton>
                </InputAdornment>
              ),
            }}
            onChange={handleSearchOutput}
          />
          <Controls.Button
            text="Add New Output"
            style={{ borderRadius: "20px" }}
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setOutputOpenPopup(true);
              setRecordForEditOutput(null);
            }}
          />
        </Toolbar>
        <OTblContainer>
          <OTblHead />
          <TableBody>
            {outputRecordsAfterPagingAndSorting().map((item, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell style={{ width: "12%" }} key={index}>
                  {item?.outcomeId !== undefined ? item.outcomeId : "N/A"}
                </TableCell>
                <TableCell style={{ width: "12%" }} key={index}>
                  {item?.indicatorId !== undefined ? item.indicatorId : "N/A"}
                </TableCell>
                <TableCell style={{ width: "60%" }} key={index}>
                  {item?.output !== undefined ? item.output : "N/A"}
                </TableCell>
                <TableCell key={index}>
                  <Controls.ActionButton
                    color="primary"
                    onClick={() => {
                      if (item && item.indicatorId !== undefined) {
                        openInPopupOutput(item);
                      }
                    }}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </Controls.ActionButton>
                  <Controls.ActionButton
                    color="secondary"
                    onClick={() => {
                      if (item && item.indicatorId !== undefined) {
                        handleDeleteOutput(item.indicatorId);
                      }
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </OTblContainer>
        <OTblPagination />
      </Paper>
      <Popup
        title="Output Form"
        openPopup={outputOpenPopup}
        setOpenPopup={setOutputOpenPopup}
      >
        <OutputForm
          recordForEditOutput={recordForEditOutput || undefined}
          addOrEditOutput={addOrEditOutput}
        />
      </Popup>

      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            id="search-outcome-input1"
            label="Search Indicator"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Controls.ActionButton
                    color="secondary"
                    onClick={handleClearSearch}
                  >
                    <CloseIcon fontSize="small" />
                  </Controls.ActionButton>
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
          <Tooltip
            title={
              outputRecords.length === 0 ? "Please add an outcome first" : ""
            }
          >
            <Controls.Button
              text="Add New Indicator"
              style={{ borderRadius: "20px" }}
              variant="outlined"
              startIcon={<AddIcon />}
              className={classes.newButton}
              onClick={() => {
                setOpenPopup(true);
                setRecordForEdit(null);
              }}
              disabled={outputRecords.length === 0}
            />
          </Tooltip>
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {indicatorRecordsAfterPagingAndSorting().map((item, index) => (
              <TableRow key={index}>
                <TableCell key={index} style={{ width: "8.3%" }}>
                  {item.outputId}
                </TableCell>
                <TableCell key={index} style={{ width: "8.3%" }}>
                  {item.indicatorId}
                </TableCell>
                <TableCell key={index} style={{ width: "50%" }}>
                  {item.indicator}
                </TableCell>
                <TableCell key={index} style={{ width: "8.3%" }}>
                  {item.calculation}
                </TableCell>
                <TableCell key={index} style={{ width: "8.3%" }}>
                  {item.disaggregation}
                </TableCell>
                <TableCell key={index} style={{ width: "8.3%" }}>
                  {item.target}
                </TableCell>
                <TableCell key={index} style={{ width: "8.3%" }}>
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
