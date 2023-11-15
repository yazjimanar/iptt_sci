import React, { useState } from "react";
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

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter((x) =>
            x.fullName.toLowerCase().includes(target.value)
          );
      },
    });
  };

  const addOrEdit = (indicator, resetForm) => {
    if (indicator.id === 0) indicatorService.insertIndicator(indicator);
    else indicatorService.updateIndicator(indicator);
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    setRecords(indicatorService.getAllIndicators());
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const handleDelete = (indicatorId) => {
    if (window.confirm("Are you sure to delete this record?"))
      indicatorService.deleteIndicator(indicatorId);
    setRecords(indicatorService.getAllIndicators());
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
              <TableRow key={item.indicatorId}>
                <TableCell>{item.outcomeId}</TableCell>
                <TableCell>{item.indicatorId}</TableCell>
                <TableCell>{item.indicator}</TableCell>
                <TableCell>{item.disaggregation}</TableCell>
                <TableCell>{item.target}</TableCell>
                <TableCell>{item.calculation}</TableCell>
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
                      handleDelete(item);
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
