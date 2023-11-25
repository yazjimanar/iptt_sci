import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../../component/controls/Controls";
import { useForm, Form } from "../../component/useForm";

const initialFValues = {
  outcomeId: 0,
  outcome: "",
};

export default function OutcomeForm(props) {
  const { addOrEditOutcome, recordForEditOutcome } = props;

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("outcome" in fieldValues)
      temp.outcome = fieldValues.outcome ? "" : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(recordForEditOutcome || initialFValues, true, validate);

  useEffect(() => {
    if (recordForEditOutcome && recordForEditOutcome.outcomeId !== undefined) {
      setValues((prevValues) => ({
        ...prevValues,
        ...recordForEditOutcome,
      }));
    } else {
      // Set default values when recordForEditOutcome is not defined
      setValues(initialFValues);
    }
  }, [recordForEditOutcome, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addOrEditOutcome(values, resetForm);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12}>
          <Controls.Input
            required
            name="outcome"
            label="Outcome"
            value={values.outcome}
            onChange={handleInputChange}
            error={errors.outcome}
            style={{ width: "700px" }}
          />
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
      </Grid>
    </Form>
  );
}
