import React, { useState, useEffect } from "react";
import IndicatorForm from "./IndicatorForm";
import OutcomeForm from "./OutcomeForm";
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
  { id: "outcomeId", label: "Outcome ID" },
  { id: "indicatorId", label: "Indicator ID" },
  { id: "indicator", label: "Indicator" },
  { id: "calculation", label: "Calculation Methode" },
  { id: "disaggregation", label: "Disaggregation" },
  { id: "target", label: "Target" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const outcomeHeadCells = [
  { id: "outcomeId", label: "Outcome ID" },
  { id: "outcome", label: "Outcome" },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function Outcomes() {
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [recordForEditOutcome, setRecordForEditOutcome] = useState(null);
  const [outcomeRecords, setOutcomeRecords] = useState(
    indicatorService.getAllIndicators("OutcomesData")
  );
  const [records, setRecords] = useState(
    indicatorService.getAllIndicators("OutcomeIndicators")
  );
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [outcomeFilterFn, setOutcomeFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [outcomeOpenPopup, setOutcomeOpenPopup] = useState(false);

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
    recordsAfterPagingAndSorting: outcomeRecordsAfterPagingAndSorting,
  } = useTable(outcomeRecords, outcomeHeadCells, outcomeFilterFn);

  useEffect(() => {
    const fetchData = async () => {
      const updatedRecords = await indicatorService.getAllIndicators(
        "OutcomeIndicators"
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

  const handleSearchOutcome = (e) => {
    let target = e.target;
    setOutcomeFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter((x) =>
            x.outcome.toLowerCase().includes(target.value)
          );
      },
    });
  };

  const handleClearSearchOutcome = () => {
    // Clear the search input
    setOutcomeFilterFn({
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
    data.indicatorId = data.id;
    if (data.indicatorId === undefined) {
      indicatorService.insertIndicator(data, "OutcomeIndicators");
    } else indicatorService.updateIndicator(data, "OutcomeIndicators");
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    setRecords(
      indicatorService
        .getAllIndicators("OutcomeIndicators")
        .map((x) => ({ ...x, id: x.indicatorId }))
    );
  };

  const addOrEditOutcome = (data, resetForm) => {
    data.indicatorId = data.id;

    if (data.indicatorId === undefined) {
      indicatorService.insertIndicator(data, "OutcomesData");
    } else indicatorService.updateIndicator(data, "OutcomesData");
    resetForm();
    setRecordForEditOutcome(null);
    setOutcomeOpenPopup(false);
    setOutcomeRecords(
      indicatorService
        .getAllIndicators("OutcomesData")
        .map((x) => ({ ...x, id: x.indicatorId }))
    );
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const openInPopupOutcome = (item) => {
    setRecordForEditOutcome(item);
    setOutcomeOpenPopup(true);
  };

  const handleDelete = async (indicatorId) => {
    if (window.confirm("Are you sure to delete this record?")) {
      const updatedIndicators = indicatorService.deleteIndicator(
        indicatorId,
        "OutcomeIndicators"
      );
      setRecords(updatedIndicators);
    }
  };

  const handleDeleteOutcome = async (outcomeId) => {
    if (window.confirm("Are you sure to delete this record?")) {
      const updatedIndicators = indicatorService.deleteIndicator(
        outcomeId,
        "OutcomesData"
      );
      setOutcomeRecords(updatedIndicators);
    }
  };

  return (
    <>
      <PageHeader
        title="Outcome Page"
        subTitle="Define the outcomes of your project with indicators"
        icon={<OutputIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            id="search-outcome-input"
            label="Search Outcome"
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
                    onClick={handleClearSearchOutcome}
                  >
                    <CloseIcon fontSize="small" />
                  </Controls.ActionButton>
                </InputAdornment>
              ),
            }}
            onChange={handleSearchOutcome}
          />
          <Controls.Button
            text="Add New Outcome"
            style={{ borderRadius: "20px" }}
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setOutcomeOpenPopup(true);
              setRecordForEditOutcome(null);
            }}
          />
        </Toolbar>
        <OTblContainer>
          <OTblHead />
          <TableBody>
            {outcomeRecordsAfterPagingAndSorting().map((item, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell style={{ width: "20%" }} key={index}>
                  {item?.indicatorId !== undefined ? item.indicatorId : "N/A"}
                </TableCell>
                <TableCell style={{ width: "67%" }} key={index}>
                  {item?.outcome !== undefined ? item.outcome : "N/A"}
                </TableCell>
                <TableCell key={index}>
                  <Controls.ActionButton
                    color="primary"
                    onClick={() => {
                      if (item && item.indicatorId !== undefined) {
                        openInPopupOutcome(item);
                      }
                    }}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </Controls.ActionButton>
                  <Controls.ActionButton
                    color="secondary"
                    onClick={() => {
                      if (item && item.indicatorId !== undefined) {
                        handleDeleteOutcome(item.indicatorId);
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
        title="Outcome Form"
        openPopup={outcomeOpenPopup}
        setOpenPopup={setOutcomeOpenPopup}
      >
        <OutcomeForm
          recordForEditOutcome={recordForEditOutcome || undefined}
          addOrEditOutcome={addOrEditOutcome}
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
              outcomeRecords.length === 0 ? "Please add an outcome first" : ""
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
              disabled={outcomeRecords.length === 0}
            />
          </Tooltip>
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {indicatorRecordsAfterPagingAndSorting().map((item, index) => (
              <TableRow key={index}>
                <TableCell key={index}>{item.outcomeId}</TableCell>
                <TableCell key={index}>{item.indicatorId}</TableCell>
                <TableCell key={index}>{item.indicator}</TableCell>
                <TableCell key={index}>{item.calculation}</TableCell>
                <TableCell key={index}>{item.disaggregation}</TableCell>
                <TableCell key={index}>{item.target}</TableCell>
                <TableCell key={index}>
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
