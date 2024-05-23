import { TODO, ToDoStatus } from "../../store/types/to-do-types";
import {
  Button,
  ButtonGroup,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import moment from "moment";
import ToDoStatusButton from "./TodoStatus";
import { useState } from "react";
import { delete_todo, update_todo } from "../../api";
import { useAppDispatch } from "../../store/hooks";
import {
  filterTodo,
  openToDoForm,
  updateToDo,
} from "../../store/to-do/to-do-slice";
import { Delete, Edit, FilterVintage, Spa } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { red, yellow } from "@mui/material/colors";

const ToDoCard = ({ todo }: { todo: TODO }) => {
  const dispatch = useAppDispatch();

  const [updatingStatus, setUpdatingStatus] = useState(false);
  async function handleStatusChange(status: ToDoStatus) {
    try {
      setUpdatingStatus(true);
      const { data } = await update_todo(todo?._id as string, { status });
      dispatch(updateToDo(data.data));
      setUpdatingStatus(false);
    } catch (error) {
      setUpdatingStatus(false);
      console.log(error);
    }
  }

  const [deleting, setDeleting] = useState(false);
  async function deleteTodo() {
    try {
      setDeleting(true);
      await delete_todo(todo._id as string);
      dispatch(filterTodo(todo._id as string));
      setDeleting(false);
    } catch (error) {
      setDeleting(false);
    }
  }

  function handleEditTodo() {
    dispatch(openToDoForm(todo));
  }
  return (
    <Paper>
      <Stack p={2} spacing={2}>
        <Stack spacing={1}>
          <Stack direction="row" alignItems="center">
            <Typography flexGrow={1} variant="h6" fontWeight={600}>
              {todo.name}
            </Typography>
            <ButtonGroup variant="outlined" aria-label="Basic button group">
              <Tooltip title="Edit To Do">
                <Button
                  onClick={handleEditTodo}
                  size="small"
                  variant="outlined"
                  startIcon={<Edit />}
                ></Button>
              </Tooltip>
              <Tooltip title="Delete To Do">
                <LoadingButton
                  loading={deleting}
                  onClick={deleteTodo}
                  size="small"
                  variant="outlined"
                  startIcon={<Delete />}
                ></LoadingButton>
              </Tooltip>
            </ButtonGroup>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            {todo.description}{" "}
          </Typography>
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          spacing={2}
        >
          <ToDoStatusButton
            value={todo.status}
            saving={updatingStatus}
            onChange={handleStatusChange}
          />
          <Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Spa sx={{ fontSize: 18 }} color="success" />
              <Typography variant="caption" color="text.secondary">
                Planned
                :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {moment(todo.createdAt).format("DD MMM YY, hh:MM A")}
              </Typography>
            </Stack>
            {todo.status === "Complete" && (
              <Stack direction="row" alignItems="center" spacing={1}>
                <FilterVintage
                  sx={{
                    fontSize: 18,
                    color: (theme) =>
                      theme.palette.mode === "dark" ? yellow[300] : red[500],
                  }}
                />
                <Typography variant="caption" color="text.secondary">
                  Completed :&nbsp;&nbsp;
                  {moment(todo.updatedAt).format("DD MMM YY, hh:MM A")}
                </Typography>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default ToDoCard;
