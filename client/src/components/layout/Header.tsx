import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ToggleTheme from "../shared/ToggleTheme";
import { IconButton, Stack, Tooltip } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import logo from "../../assets/logo.png";
import { LogoutOutlined } from "@mui/icons-material";
import { signOut } from "../../store/auth/auth-slice";
export default function Header() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  function handleLogOut() {
    dispatch(signOut());
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        elevation={0}
        color="inherit"
        position="fixed"
        sx={{
          backgroundColor: (theme) => theme.palette.background.paper,
          borderRadius: 0,
        }}
      >
        <Toolbar>
          <Stack flexGrow={1}>
            <Stack spacing={1} height={45} alignItems="center" direction="row">
              <img src={logo} style={{ maxHeight: "100%", maxWidth: "100%" }} />
              <Typography
                display={{ xs: "none", sm: "block" }}
                variant="h5"
                fontWeight={600}
              >
                ToDo Hub
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Typography> {user.name} </Typography>

            <ToggleTheme />
            <Tooltip title="Logout">
              <IconButton onClick={handleLogOut}>
                <LogoutOutlined />
              </IconButton>
            </Tooltip>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
