import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faWrench, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { Stats } from '../components';

export function StatsContainer({ children }) {
  return (
    <Stats>
      <Stats.Row>
        <Stats.Header>
          Welcome to the best platform for service quotes and customers management
        </Stats.Header>
      </Stats.Row>

      <Stats.Row className="grid-3 my-4">
        <Stats.Box>
          <Stats.IconContainer>
            <FontAwesomeIcon icon={faUsers} />
          </Stats.IconContainer>
          <Stats.Number>1,390</Stats.Number>
          <Stats.Description>Customers</Stats.Description>
        </Stats.Box>

        <Stats.Box>
          <Stats.IconContainer>
            <FontAwesomeIcon icon={faWrench} />
          </Stats.IconContainer>
          <Stats.Number>420</Stats.Number>
          <Stats.Description>Service Providers</Stats.Description>
        </Stats.Box>

        <Stats.Box>
          <Stats.IconContainer>
            <FontAwesomeIcon icon={faFilePdf} />
          </Stats.IconContainer>
          <Stats.Number>7,551</Stats.Number>
          <Stats.Description>Quotes</Stats.Description>
        </Stats.Box>
      </Stats.Row>

      {children}
    </Stats>
  );
}
