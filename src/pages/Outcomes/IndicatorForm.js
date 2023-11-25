import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../../component/controls/Controls";
import { useForm, Form } from "../../component/useForm";
import * as indicatorService from "../../services/indicatorService";
import Tooltip from "@mui/material/Tooltip";

const initialFValues = {
  outcomeId: "",
  indicatorId: "",
  indicator: "",
  calculation: "",
  disaggregation: "",
  target: "",
};

export default function IndicatorForm(props) {
  const { addOrEdit, recordForEdit } = props;
  const [outcomeOptions, setOutcomeOptions] = useState([]);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("indicator" in fieldValues)
      temp.indicator = fieldValues.indicator ? "" : "This field is required.";
    if ("target" in fieldValues)
      temp.target = fieldValues.target ? "" : "This field is required.";
    if ("disaggregation" in fieldValues)
      temp.disaggregation = fieldValues.disaggregation
        ? ""
        : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm);
    }
  };

  useEffect(() => {
    if (recordForEdit != null) {
      setValues({
        ...recordForEdit,
        calculation: recordForEdit.calculationId || "", // Set calculation properly
      });
    }
  }, [recordForEdit, setValues]);
  useEffect(() => {
    // Fetch outcome options from local storage or API
    const outcomes = indicatorService.getAllIndicators("OutcomesData");
    setOutcomeOptions(outcomes);

    if (recordForEdit != null) {
      setValues({
        ...recordForEdit,
        calculation: recordForEdit.calculationId || "",
      });
    }
  }, [recordForEdit, setValues]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Select
            name="outcomeId"
            label="Outcome ID"
            value={values.outcomeId}
            onChange={handleInputChange}
            options={outcomeOptions.map((outcome) => ({
              id: outcome.indicatorId,
              title: outcome.outcome,
            }))}
            error={errors.outcomeId}
          />
          <Controls.Input
            name="indicator"
            label="Indicator"
            value={values.indicator}
            onChange={handleInputChange}
            error={errors.indicator}
          />
          <Controls.Input
            type="number"
            name="target"
            label="Target"
            value={values.target}
            onChange={handleInputChange}
            error={errors.target}
          />
          <Tooltip title="Include numerous inputs, separating each entry with a comma, like 'Men, Women, Boys, Girls.'">
            <Controls.Input
              name="disaggregation"
              label="Disaggregation"
              value={values.disaggregation}
              onChange={handleInputChange}
              error={errors.disaggregation}
            />
          </Tooltip>
        </Grid>
        <Grid item xs={6} style={{ display: "flex", flexDirection: "column" }}>
          <Controls.Select
            name="calculation"
            label="Calculation Methode"
            value={values.calculation}
            onChange={handleInputChange}
            options={indicatorService.getCalculationCollection()}
          />

          <Controls.Button
            type="submit"
            text="Submit"
            style={{ borderRadius: "20px" }}
          />
          <Controls.Button
            text="Reset"
            color="default"
            onClick={resetForm}
            style={{ borderRadius: "20px" }}
          />
        </Grid>
      </Grid>
    </Form>
  );
}
