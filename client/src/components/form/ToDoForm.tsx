import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { createTodo, updateTodo } from "../../store/to-do/to-do-api";
import {
  Backdrop,
  Box,
  Fade,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { TODO, todoStatus } from "../../store/types/to-do-types";
import { closeToDoForm, updateToDoForm } from "../../store/to-do/to-do-slice";
import { CloseOutlined } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90vw", sm: 400 },
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 1,
};

const ToDoForm = () => {
  const dispatch = useAppDispatch();
  const { isSaving, openForm, toDoForForm } = useAppSelector(
    (state) => state.todo
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleChange(event: any) {
    dispatch(
      updateToDoForm({
        ...toDoForForm,
        [event.target.name]: event.target.value,
      })
    );
  }

  //save todo
  function handleSave() {
    if (toDoForForm._id) {
      dispatch(updateTodo(toDoForForm as TODO));
    } else {
      dispatch(createTodo(toDoForForm as TODO));
    }
  }

  function handleClose() {
    dispatch(closeToDoForm());
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openForm}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={openForm}>
        <Box sx={style}>
          <Stack spacing={2} p={2}>
            <IconButton
              onClick={handleClose}
              sx={{
                border: 1,
                borderColor: (theme) => theme.palette.divider,
                position: "absolute",
                background: (theme) => theme.palette.background.paper,
                top: -10,
                right: -10,
                "&: hover": {
                  background: (theme) => theme.palette.background.default,
                },
              }}
            >
              <CloseOutlined />
            </IconButton>
            <Typography variant="h5" fontWeight={600}>
              {toDoForForm._id ? "Edit To Do" : "Create To Do"}
            </Typography>
            <TextField
              multiline
              minRows={1}
              maxRows={3}
              name="name"
              inputProps={{
                maxLength: 50,
              }}
              size="small"
              variant="standard"
              label="Title"
              placeholder="Complete task..."
              value={toDoForForm.name}
              helperText={toDoForForm.name.length + "/50"}
              onChange={handleChange}
              disabled={isSaving}
            />
            <TextField
              multiline
              minRows={3}
              maxRows={5}
              inputProps={{
                maxLength: 200,
              }}
              name="description"
              label="Description"
              variant="standard"
              size="small"
              helperText={toDoForForm.description.length + "/200"}
              placeholder="Complete task..."
              value={toDoForForm.description}
              onChange={handleChange}
              disabled={isSaving}
            />

            <FormControl disabled={isSaving} fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                name="status"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                variant="standard"
                value={toDoForForm.status}
                label="Status"
                onChange={handleChange}
              >
                <MenuItem value={todoStatus.todo}>To Do</MenuItem>
                <MenuItem value={todoStatus.inProgress}>Progress</MenuItem>
                <MenuItem value={todoStatus.complete}>Complete</MenuItem>
              </Select>
            </FormControl>
            <Stack>
              <LoadingButton
                disabled={
                  isSaving || !toDoForForm.name || !toDoForForm.description
                }
                loading={isSaving}
                onClick={handleSave}
                variant="contained"
              >
                {toDoForForm._id ? "Update" : "Save"}
              </LoadingButton>
            </Stack>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ToDoForm;
