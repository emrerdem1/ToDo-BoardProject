import React from 'react'
import { useForm } from 'react-hook-form';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@material-ui/core";
import db from './../firebaseConfig';

export default function EditBoard({ isOpen, closeModal, selectedItem }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    db.collection('boards').doc(selectedItem.id).update({
      ...data
    });
    closeModal();
  }

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      maxWidth="xs"
      fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>
          Edit Board
        </DialogTitle>
        <DialogContent>
          <TextField
            type="text"
            label="Name"
            fullWidth
            name="name"
            inputRef={register}
            defaultValue={selectedItem.name}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            type="button"
            onClick={closeModal}>
            Cancel
            </Button>
          <Button
            color="primary"
            variant="contained"
            type="submit">
            Kaydet
            </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
