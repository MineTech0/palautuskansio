import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { OccupationalHealthcareEntry as OccupationalHealthcareEntryType  } from '../types';

const OccupationalHealthcareEntry: React.FC<{ entry: OccupationalHealthcareEntryType }> = ({ entry }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon name="stethoscope" /> {entry?.employerName}
        </Card.Header>
        <Card.Description>{entry.description}</Card.Description>
      </Card.Content>
    </Card>
  );
};

export default OccupationalHealthcareEntry;
