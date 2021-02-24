import { Field } from 'formik';
import React from 'react';
import { Header } from 'semantic-ui-react';
import { TextField } from '../AddPatientModal/FormField';

const HospitalEntryForm = () => {

  return (
    <>
    <Header as="h3">Discharge</Header>
      <Field
        label="Date"
        placeholder="YYYY-MM-DD"
        name="discharge.date"
        component={TextField}
      />
      <Field
        label="Criteria"
        placeholder=""
        name="discharge.criteria"
        component={TextField}
      />
    </>
  );
};

export default HospitalEntryForm;
