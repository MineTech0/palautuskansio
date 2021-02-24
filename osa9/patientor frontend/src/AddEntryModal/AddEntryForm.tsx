import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Formik, Form } from 'formik';
import { EntryFormValues } from '../types';
import TypeSelect from './TypeSelect';
import BaseEntry from './BaseEntry';
import HospitalEntryForm from './HospitalEntryForm';
import HealthCheckEntryForm from './HealthCheckEntryForm';
import OccupationalHealthcareEntryForm from './OccupationalHealthcareEntryForm';
import { isDate } from '../validation';

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {

  const extendForm = (type: string): JSX.Element | null => {
    switch (type) {
      case 'Hospital':
        return <HospitalEntryForm/>;
      case 'HealthCheck':
        return <HealthCheckEntryForm/>;
      case 'OccupationalHealthcare':
        return <OccupationalHealthcareEntryForm/>;
      default:
        return null;
    }
  };
  
  return (
    <Formik
      initialValues={{
        description: '',
        date: '',
        specialist: '',
        type: 'Hospital',
        discharge: {
          date: '',
          criteria: ''
        }
      }}
      onSubmit={onSubmit}
      enableReinitialize={true}
        validate={values => {
          const requiredError = "Field is required";
          const errors: { [field: string]: string | object } = {};
          if (!values.description) {
            errors.description = requiredError;
          }
          if (!values.specialist) {
            errors.specialist = requiredError;
          }
          if(!isDate(values.date)){
            errors.date = 'Not a date';
          }
          switch (values.type) {
            case 'Hospital':
                if(values.discharge?.date === undefined || !isDate(values.discharge?.date)){
                  errors.discharge = {...errors.discharge as object , date: 'Not a date'};
                }
                if(!values.discharge?.criteria){
                  errors.discharge = {...errors.discharge as object, criteria: requiredError};
                }
                break;
            case 'HealthCheck':
              if (!values.healthCheckRating){
                errors.healthCheckRating = requiredError;
              }
              else if (values.healthCheckRating > 3){
                errors.healthCheckRating = 'Too big rating';
              }
              else if (values.healthCheckRating < 0){
                errors.healthCheckRating = 'Too small rating';
              }
              break;
      
            case 'OccupationalHealthcare':
              if(!values.employerName){
                errors.employerName = requiredError;
              }
              if(values.sickLeave?.startDate === undefined || !isDate(values.sickLeave?.startDate) ){
                errors.sickLeave = {...errors.sickLeave as object, startDate: 'Not a date'};
              }
              if(values.sickLeave?.endDate === undefined || !isDate(values.sickLeave?.endDate) ){
                errors.sickLeave = {...errors.sickLeave as object, endDate: 'Not a date'};
              }
              break;
            
          }
          return errors;
          
        }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            
            <TypeSelect
              label="Type"
              name="type"
              options={['Hospital', 'OccupationalHealthcare', 'HealthCheck']}
            />
            <BaseEntry
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            />
            { extendForm(values.type)}
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
