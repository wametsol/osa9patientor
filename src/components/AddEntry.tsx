import { Entry } from "../types";
import { useStateValue } from "../state";
import { DiagnosisSelection, TextField, NumberField } from '../AddPatientModal/FormField'
import React from "react";
import { Formik, Form, Field } from "formik";
import { Button } from "semantic-ui-react";


export type EntryFormValues = Omit<Entry, "id">;

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    //onCancel: () => void;
  }

export const AddEntryForm: React.FC<Props> = ({ onSubmit }) => {
    const [{ diagnoses }] = useStateValue()
    const entryTypes = [
        {
            type: "Hospital"
        },
        {
            type: "OccupationalHealthcare"
        },
        {
            type: "HealthCheck"
        }
    ]
    return (
      <Formik
      initialValues={{
          type: "HealthCheck",
          description: "",
          date: "",
          specialist: "",
          diagnosisCodes: []

        /// ...
      }}
      onSubmit={onSubmit}
      validate={values => {
        /// ...
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
  
        return (
            
            
          <Form className="form ui">
              <Field
                label="Type"
                placeholder="Hospital | OccupationalHealthcare | HealthCheck"
                name="type"
                component={TextField}
            />
            <Field
                label="Description"
                placeholder="Description"
                name="description"
                component={TextField}
            />  
            <Field
                label="Date"
                placeholder="YYYY-MM-DD"
                name="date"
                component={TextField}
            />
            <Field
                label="Specialist"
                placeholder="Name of specialist"
                name="specialist"
                component={TextField}
            />
            <Field
                label="healthCheckRating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
            />     
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />    
  
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
          </Form>
        );
      }}
    </Formik>
    );
  };