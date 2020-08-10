import React from "react";
import {Link} from "react-router-dom";
import {  Modal as SemanticModal, Button as SemanticButton } from "semantic-ui-react";
import {labels} from "../../utils/constants";

export default function Modal({ setOpen, open, message }) {
  return (
    <SemanticModal
      centered={true}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      size ='mini'
      closeOnDimmerClick = {false}
      closeOnDocumentClick = {false}
    >
      <SemanticModal.Header>{labels.modalTitle}</SemanticModal.Header>
      <SemanticModal.Content>
        {message}
      </SemanticModal.Content>
      <SemanticModal.Actions>
        <SemanticButton color='olive' as={Link} to='/home' onClick={() => setOpen(false)}content={labels.buttonPlayAgain}/>
      </SemanticModal.Actions>
    </SemanticModal>
  );
}
