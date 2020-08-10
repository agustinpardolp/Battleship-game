import React from "react";
import {Link} from "react-router-dom";
import {  Modal as SemanticModal, Button as SemanticButton } from "semantic-ui-react";
import Button from "../button"

export default function Modal({ setOpen, open, message }) {
  return (
    <SemanticModal
      centered={true}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      size ='mini'
    >
      <SemanticModal.Header>{"Wooo"}</SemanticModal.Header>
      <SemanticModal.Content>
        {message}
      </SemanticModal.Content>
      <SemanticModal.Actions>
        <Button color={"red"} onClick={() => setOpen(false)} content={"Cancelar"}/>
        <SemanticButton color='olive' as={Link} to='/home' onClick={() => setOpen(false)}content={"Volver a jugar?"}/>
      </SemanticModal.Actions>
    </SemanticModal>
  );
}
