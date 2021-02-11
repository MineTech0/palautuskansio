import Axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Header, Icon } from 'semantic-ui-react';
import { setPatient, useStateValue } from '../state';
import { Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from '../PatientEntry';

const PatientInfo = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient, diagnosis }, dispatch] = useStateValue();
  console.log(diagnosis);

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await Axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatient();
  }, [dispatch]);

  return (
    <>
      <Header as="h1">
        {patient?.name}{' '}
        <Icon name={patient?.gender === 'male' ? 'mars' : 'venus'}></Icon>
      </Header>
      <p><b>snn:</b> {patient?.ssn}</p>
      <p><b>occupation:</b> {patient?.occupation}</p>

      <Header as="h2">Entries</Header>
      {patient?.entries.map((e, i) => {
        switch (e.type) {
          case 'OccupationalHealthcare':
            return <OccupationalHealthcareEntry key={i} entry={e} />;
          case 'Hospital':
            return <HospitalEntry key={i} entry={e} />;
          case 'HealthCheck':
            return <HealthCheckEntry key={i} entry={e} />;
          default:
            return null;
        }
      })}
    </>
  );
};

export default PatientInfo;
