import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { AppBar, Button } from "@mui/material";
import Ticket from "./Ticket";
import { useState, useEffect } from "react";
import setUser from "../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import http from "../config/http";

function DashboardContent() {
  const [userData, setUserData] = useState([]);
  const [tokenData, setTokenData] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("user")));
    setTokenData(localStorage.getItem("token"));
  }, []);
  const handalLogout = () => {
    // dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  const user = useSelector((state) => state.user);

  const getTicket = async () => {
    try {
      const response = await http.get("ticket/all");
      console.log("data", response.data.tickets);
      return response.data.tickets;
    } catch (err) {}
  };
  return (
    <>
      {tokenData ? (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="absolute">
            <Toolbar
              style={{ backgroundColor: "#6D8B74" }}
              sx={{
                pr: "24px", // keep right padding when drawer closed
              }}
            >
              <Typography
                component="h1"
                variant="h6"
                color="#EFEAD8"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                TicketApp
              </Typography>
              <Typography style={{ color: "#EFEAD8" }}>welcome,{userData?.firstName}</Typography>
              &nbsp;&nbsp;&nbsp;
              <Button
                onClick={handalLogout}
                variant="contained"
                style={{ backgroundColor: "#EFEAD8", color: "black" }}
              >
                Logout
              </Button>
            </Toolbar>
          </AppBar>

          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  >
                    <Ticket getLists={getTicket} />
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      ) : (
        navigate("/")
      )}
    </>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
