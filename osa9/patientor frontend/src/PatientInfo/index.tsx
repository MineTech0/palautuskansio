import Axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Button, Header, Icon } from 'semantic-ui-react';
import { setPatient, useStateValue } from '../state';
import { Entry, Patient, EntryFormValues } from '../types';
import { apiBaseUrl } from '../constants';
import { HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from '../PatientEntry';
import AddEntryModal from '../AddEntryModal';

const PatientInfo = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();
  
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await Axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
        const updatedPatient = patient as Patient;
        updatedPatient?.entries.push(newEntry);
        dispatch(setPatient(updatedPatient));
        closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

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
      {!patient ||patient.entries.length === 0 ? <p>No entries</p> :
      patient?.entries.map((e, i) => {
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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </>
  );
};

export default PatientInfo;
