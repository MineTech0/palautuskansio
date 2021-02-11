import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { Entry } from '../types';

const HospitalEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon name="user doctor" />
        </Card.Header>
        <Card.Description>
          <i>{entry.description}</i>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default HospitalEntry;
