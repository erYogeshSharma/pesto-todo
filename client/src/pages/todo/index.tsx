import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getAllTodo } from "../../store/to-do/to-do-api";
import { Button, Grid, Skeleton, Stack, Typography } from "@mui/material";
import ToDoCard from "../../components/shared/ToDoCard";
import ToDoForm from "../../components/form/ToDoForm";
import { openToDoForm } from "../../store/to-do/to-do-slice";

const ToDoPage = () => {
  const dispatch = useAppDispatch();

  const { todos, isFetching } = useAppSelector((state) => state.todo);

  useEffect(() => {
    dispatch(getAllTodo());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleCreateOpen() {
    dispatch(openToDoForm({ name: "", description: "", status: "To Do" }));
  }
  return (
    <Grid>
      <ToDoForm />
      <Stack
        py={2}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h5" fontWeight={600}>
          Your To Do list
        </Typography>
        <Button variant="contained" onClick={handleCreateOpen}>
          Create
        </Button>
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
        {todos.length > 0 && todos.map((todo) => <ToDoCard todo={todo} />)}
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
                    You have no tasks at the moment
                  </Typography>
                </Stack>
                <Typography variant="subtitle1" color="text.secondary">
                  Start adding tasks to stay organized and productive. Click the
                  button below to create your first to-do item.
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
