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
    indicatorService.getAllIndicators()
  );
  const [records, setRecords] = useState(indicatorService.getAllIndicators());
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
      const updatedRecords = await indicatorService.getAllIndicators();
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
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter((x) =>
            x.outcome.toLowerCase().includes(target.value)
          );
      },
    });
  };

  const addOrEdit = (data, resetForm) => {
    data.indicatorId = data.id;
    if (data.indicatorId === undefined) {
      indicatorService.insertIndicator(data);
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

  const addOrEditOutcome = (data, resetForm) => {
    data.indicatorId = data.id;
    if (data.indicatorId === undefined) {
      indicatorService.insertIndicator(data);
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
      const updatedIndicators = indicatorService.deleteIndicator(indicatorId);
      setRecords(updatedIndicators);
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
            label="Search Outcome"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
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
            {outcomeRecordsAfterPagingAndSorting().map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell style={{ width: "20%" }}>{item.outcomeId}</TableCell>
                <TableCell style={{ width: "67%" }}>{item.outcome}</TableCell>
                <TableCell>
                  <Controls.ActionButton
                    color="primary"
                    // onClick={() => {
                    //   openInPopup(item);
                    // }}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </Controls.ActionButton>
                  <Controls.ActionButton
                    color="secondary"
                    // onClick={() => {
                    //   handleDelete(item.outcomeId);
                    // }}
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
          recordForEditOutcome={recordForEditOutcome}
          addOrEditOutcome={addOrEditOutcome}
        />
      </Popup>

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
            style={{ borderRadius: "20px" }}
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
            {indicatorRecordsAfterPagingAndSorting().map((item) => (
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
