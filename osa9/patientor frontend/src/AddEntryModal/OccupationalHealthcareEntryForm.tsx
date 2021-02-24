import { Field } from 'formik';
import React from 'react';
import { Header } from 'semantic-ui-react';
import { TextField } from '../AddPatientModal/FormField';

const OccupationalHealthcareEntryForm = () => {

  return (
    <>
      <Field
        label="Employer name"
        placeholder=""
        name="employerName"
        component={TextField}
      />
      <Header as='h3'>Sick leave</Header>
      <Field
        id='sickLeave.startDate'
        label="Start Date"
        placeholder="YYYY-MM-DD"
        name="sickLeave.startDate"
        component={TextField}
      />
      <Field
        id='sickLeave.endDate'
        label="End Date"
        placeholder="YYYY-MM-DD"
        name="sickLeave.endDate"
        component={TextField}
      />
    </>
  );
};

export default OccupationalHealthcareEntryForm;
