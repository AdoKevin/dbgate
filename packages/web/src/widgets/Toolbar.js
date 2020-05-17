import React from 'react';
import useModalState from '../modals/useModalState';
import ConnectionModal from '../modals/ConnectionModal';
import styled from 'styled-components';
import ToolbarButton from './ToolbarButton';
import useNewQuery from '../query/useNewQuery';
import { useConfig } from '../utility/metadataLoaders';

const ToolbarContainer = styled.div`
  display: flex;
  user-select: none;
`;

export default function ToolBar({ toolbarPortalRef }) {
  const modalState = useModalState();
  const newQuery = useNewQuery();
  const config = useConfig();

  return (
    <ToolbarContainer>
      <ConnectionModal modalState={modalState} />
      {config.runAsPortal == false && (
        <ToolbarButton onClick={modalState.open} icon="fas fa-database">
          Add connection
        </ToolbarButton>
      )}
      <ToolbarButton onClick={newQuery} icon="fas fa-file-alt">
        New Query
      </ToolbarButton>
      <ToolbarContainer ref={toolbarPortalRef}></ToolbarContainer>
    </ToolbarContainer>
  );
}
