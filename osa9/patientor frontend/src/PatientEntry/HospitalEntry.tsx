import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { Entry } from '../types';
import DiagnosisList from './DiagnosisList';

const HospitalEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon name="hospital outline" />
        </Card.Header>
        <Card.Description>
          <i>{entry.description}</i>
          <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default HospitalEntry;
