import { Field } from 'formik';
import React from 'react';
import { NumberField } from '../AddPatientModal/FormField';

const HealthCheckEntryForm = () => {
  return (
    <>
      <Field
        label="HealthCheckRating"
        name="healthCheckRating"
        component={NumberField}
        min={0}
        max={3}
      />
    </>
  );
};

export default HealthCheckEntryForm;
