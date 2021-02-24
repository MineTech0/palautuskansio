import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { HealthCheckEntry as HealthCheckEntryType} from '../types';
import DiagnosisList from './DiagnosisList';

const HealthCheckEntry: React.FC<{ entry: HealthCheckEntryType }> = ({ entry }) => {

  const getHealth = () => {
    switch (entry.healthCheckRating) {
      case 0:
        return 'green';
      case 1:
        return 'yellow';
      case 2:
        return 'red';
      case 3:
        return 'black';
    }
  };
  

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon name="user doctor" />
        </Card.Header>
        <Card.Description>
          <i>{entry.description}</i>
          <br/>
          <Icon name="heart" color={getHealth()}/>
          <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default HealthCheckEntry;
