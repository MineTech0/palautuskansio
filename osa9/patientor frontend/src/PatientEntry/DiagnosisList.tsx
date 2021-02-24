import React, { useState } from 'react';
import { Accordion, Icon, List } from 'semantic-ui-react';
import { useStateValue } from '../state';

const DiagnosisList: React.FC<{ diagnosisCodes: string[] | undefined}> = ({
  diagnosisCodes,
}) => {
  const [activeIndex, setIndex] = useState(-1);
  const [{ diagnosis }] = useStateValue();
  if(!diagnosisCodes || diagnosisCodes.length === 0){
      return null;
  }
  return (
    <Accordion>
      <Accordion.Title
        active={activeIndex === 0}
        index={0}
        onClick={() => setIndex(activeIndex === 0 ? -1 : 0)}
      >
        <Icon name="dropdown" />
        Diagnosis
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 0}>
        <List>
          {diagnosisCodes?.map((code, i) => (
            <List.Item key={i}>
              {code} {diagnosis[code]?.name}
            </List.Item>
          ))}
        </List>
      </Accordion.Content>
    </Accordion>
  );
};

export default DiagnosisList;
