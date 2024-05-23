import { Box, Container, Grid, Toolbar } from "@mui/material";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { signOut } from "../store/auth/auth-slice";

const ProtectedRoutes = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);

  function isTokenExpired() {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Current time in seconds

      return (decodedToken.exp as number) < currentTime;
    } catch (error) {
      // Handle token decoding errors
      console.error("Invalid token:", error);
      return true;
    }
  }

  useEffect(() => {
    if (token) {
      if (isTokenExpired()) {
        dispatch(signOut());
        // Dispatch an action to clear the token
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  if (!token) {
    return <Navigate to="/" />;
  }
  return (
    <Box>
      <Header />
      <Grid sx={{ minHeight: "calc(100vh - 50px)" }}>
        <Toolbar />
        <Container maxWidth="md">
          <Outlet />
        </Container>
      </Grid>
      <Footer />
    </Box>
  );
};

export default ProtectedRoutes;
