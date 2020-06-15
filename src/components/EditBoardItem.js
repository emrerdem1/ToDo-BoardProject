import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, } from "@material-ui/core";
import { useForm } from 'react-hook-form';
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from "@material-ui/pickers";
import db from "./../firebaseConfig";

export default function EditBoardItem({ isOpen, closeModal, selectedItem, boardId }) {
  const { register, handleSubmit } = useForm();
  const priorities = [{ id: 1, name: 'Low' }, { id: 2, name: 'Medium' }, { id: 3, name: 'Important' }, { id: 4, name: 'Urgent' }];
  const statuses = [{ id: 1, name: 'Todo' }, { id: 2, name: 'Planned' }, { id: 3, name: 'Progress' }, { id: 4, name: 'Done' }, { id: 5, name: 'Testing' }];
  const [values, setValues] = useState({ status: '', priority: '' });
  const [selectedDate, setSelectedDate] = useState(
    new Date("2020-01-01T00:00:00")
  );

  useEffect(() => {
    setValues({ status: selectedItem.status ? selectedItem.status : '', priority: selectedItem.priority ? selectedItem.priority : '' });
  }, [selectedItem]);

  const onSubmit = data => {
    const newData = {
      ...selectedItem,
      ...data,
      ...values,
      dueDate: selectedDate
    }
    updateBoardItem(newData);
  }

  const updateBoardItem = data => {
    db.collection("boards").doc(boardId).collection("boardItems").doc(selectedItem.id).set(data);
    closeModal();
  };

  const handleDateChange = (date) => {
    const tempDate = new Date(date);
    const newDate = new Date(
      tempDate.getTime() - tempDate.getTimezoneOffset() * 60000
    );
    setSelectedDate(newDate);
  };

  const handleSelectChange = prop => event => {
    setValues(prev => {
      return { ...prev, [prop]: event.target.value };
    })
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        closeModal();
        // setSelectedDate(new Date("2020-01-01T00:00:00"));
      }}
      maxWidth="xs"
      fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>
          Edit Board Item
        </DialogTitle>
        <DialogContent>
          <TextField
            type="text"
            label="Title"
            fullWidth
            name="title"
            inputRef={register}
            defaultValue={selectedItem.title}
          />
          <TextField
            type="text"
            margin="normal"
            label="Assignee"
            fullWidth
            name="assignee"
            inputRef={register}
            defaultValue={selectedItem.assignee}
          />
          <TextField
            type="text"
            multiline
            margin="normal"
            label="Description"
            fullWidth
            name="description"
            inputRef={register}
            defaultValue={selectedItem.description}
          />
          <TextField
            select
            label="Status"
            fullWidth
            margin="normal"
            name="status"
            value={values.status}
            onChange={handleSelectChange('status')}
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  style: {
                    maxHeight: 250,
                  },
                },
              },
            }}>
            {statuses.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Priority"
            fullWidth
            margin="normal"
            name="priority"
            value={values.priority}
            onChange={handleSelectChange('priority')}
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  style: {
                    maxHeight: 250,
                  },
                },
              },
            }}>
            {priorities.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </TextField>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              format="MM/dd/yyyy"
              margin="normal"
              fullWidth
              label="Due Date"
              name="dueDate"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
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
