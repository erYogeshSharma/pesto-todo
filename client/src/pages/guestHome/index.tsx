import { Button, Container, Stack, Typography } from "@mui/material";
import ToggleTheme from "../../components/shared/ToggleTheme";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useAppSelector } from "../../store/hooks";
import { GitHub } from "@mui/icons-material";
const GuestHome = () => {
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.auth);

  return (
    <Container>
      <Stack alignItems="flex-end" width="100%" px={2}>
        <ToggleTheme />
      </Stack>

      <Stack
        sx={{ minHeight: "calc(100vh - 100px )" }}
        justifyContent="center"
        px={2}
      >
        <Stack textAlign="center" spacing={2}>
          <Stack height={100} alignItems="center">
            <img src={logo} style={{ maxWidth: "100%", maxHeight: "100%" }} />
          </Stack>
          <Stack spacing={2}>
            <Typography variant="h6" fontWeight={600}>
              Welcome to To-Do Hub
            </Typography>
            <Stack spacing={1}>
              <Typography variant="h4" fontWeight={600}>
                Manage Your Tasks Efficiently
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Welcome to our To-Do App, where you can effortlessly keep track
                of your daily tasks and stay organized. Whether you're planning
                your day, setting priorities, or just need a place to jot down
                reminders, our app has you covered.
              </Typography>
            </Stack>
          </Stack>
          {token ? (
            <Stack alignItems="center">
              <Button
                onClick={() => navigate("todo")}
                size="large"
                variant="contained"
              >
                Manage your ToDo
              </Button>
            </Stack>
          ) : (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={2}
            >
              <Button
                onClick={() => navigate("login")}
                size="large"
                variant="contained"
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("register")}
                size="large"
                variant="contained"
              >
                Register
              </Button>
            </Stack>
          )}

          <Stack
            width="100%"
            spacing={2}
            direction="row"
            alignItems="center"
            justifyItems="center"
          >
            <GitHub />
            <Typography> Check out the source code </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default GuestHome;
