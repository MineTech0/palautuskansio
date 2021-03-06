import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { OccupationalHealthcareEntry as OccupationalHealthcareEntryType  } from '../types';
import DiagnosisList from './DiagnosisList';

const OccupationalHealthcareEntry: React.FC<{ entry: OccupationalHealthcareEntryType }> = ({ entry }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon name="stethoscope" /> {entry?.employerName}
        </Card.Header>
        <Card.Description>{entry.description}
        <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default OccupationalHealthcareEntry;
