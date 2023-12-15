import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../../component/controls/Controls";
import { useForm, Form } from "../../component/useForm";
import * as indicatorService from "../../services/indicatorService";

const initialFValues = {
  outputId: 0,
  output: "",
};

export default function OutputForm(props) {
  const [outcomeOptions, setOutcomeOptions] = useState([]);

  const { addOrEditOutput, recordForEditOutput } = props;

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("output" in fieldValues)
      temp.output = fieldValues.output ? "" : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(recordForEditOutput || initialFValues, true, validate);

  useEffect(() => {
    // Fetch outcome options from local storage or API
    const outcomes = indicatorService.getAllIndicators("OutcomesData");
    setOutcomeOptions(outcomes);

    if (recordForEditOutput != null) {
      setValues({
        ...recordForEditOutput,
        calculation: recordForEditOutput.calculationId || "",
      });
    }
  }, [recordForEditOutput, setValues]);
  useEffect(() => {
    if (recordForEditOutput && recordForEditOutput.outputId !== undefined) {
      setValues((prevValues) => ({
        ...prevValues,
        ...recordForEditOutput,
      }));
    } else {
      // Set default values when recordForEditOutcome is not defined
      setValues(initialFValues);
    }
  }, [recordForEditOutput, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addOrEditOutput(values, resetForm);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid
        container
        spacing={2}
        style={{ width: "60vw", marginBottom: "10px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Grid>
            <Controls.Select
              name="outcomeId"
              label="Outcome ID"
              value={values.outcomeId}
              onChange={handleInputChange}
              options={outcomeOptions.map((outcome) => ({
                title: outcome.indicatorId,
                id: outcome.indicatorId,
              }))}
              error={errors.outcomeId}
              style={{ width: "20vw", marginBottom: "10px" }}
            />
          </Grid>
          <Grid>
            <Controls.Input
              required
              name="output"
              label="Output"
              value={values.output}
              onChange={handleInputChange}
              error={errors.output}
              style={{ width: "54vw", marginBottom: "10px" }}
            />
          </Grid>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div>
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
          </div>
        </div>
      </Grid>
    </Form>
  );
}
