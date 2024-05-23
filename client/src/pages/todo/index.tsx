import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getAllTodo } from "../../store/to-do/to-do-api";
import {
  Button,
  Grid,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ToDoCard from "../../components/shared/ToDoCard";
import ToDoForm from "../../components/form/ToDoForm";
import { openToDoForm } from "../../store/to-do/to-do-slice";
import { useSearchParams } from "react-router-dom";
import ToDoFilter from "../../components/shared/ToDoFilter";

const ToDoPage = () => {
  const dispatch = useAppDispatch();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("status");

  const { todos, isFetching } = useAppSelector((state) => state.todo);

  console.log(filter);
  useEffect(() => {
    dispatch(getAllTodo(filter as string));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  function handleCreateOpen() {
    dispatch(openToDoForm({ name: "", description: "", status: "To Do" }));
  }
  return (
    <Grid>
      <ToDoForm />

      <Stack
        py={2}
        spacing={2}
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant={isSmallScreen ? "h3" : "h5"} fontWeight={600}>
          Your To Do list
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <ToDoFilter />
          <Button variant="contained" onClick={handleCreateOpen}>
            Create Todo
          </Button>
        </Stack>
      </Stack>

      <Stack mb={2} spacing={1}>
        {isFetching &&
          [0, 1, 2, 3].map((s) => (
            <Skeleton
              key={s}
              variant="rectangular"
              height={150}
              sx={{ borderRadius: 1 }}
            />
          ))}
        {!isFetching &&
          todos.length > 0 &&
          todos.map((todo) => <ToDoCard todo={todo} />)}
        {!isFetching && todos.length < 1 && (
          <Stack
            sx={{ minHeight: "70vh" }}
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            spacing={2}
          >
            <Stack spacing={2}>
              <Stack spacing={1} alignItems="center">
                <Stack>
                  <Typography variant="h4" fontWeight={600}>
                    Welcome to Your To-Do List
                  </Typography>
                  <Typography variant="h6">
                    {filter
                      ? `No tasks with status ${filter}`
                      : "You have no tasks at the moment"}
                  </Typography>
                </Stack>
                <Typography variant="subtitle1" color="text.secondary">
                  {filter
                    ? "You have no tasks with the selected status. Try changing the filter or create a new task."
                    : "Start adding tasks to stay organized and productive. Click the button below to create your first to-do item."}
                </Typography>
              </Stack>
              <Stack alignItems="center">
                <Button variant="contained" onClick={handleCreateOpen}>
                  Add Your First Task
                </Button>
              </Stack>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Grid>
  );
};

export default ToDoPage;
