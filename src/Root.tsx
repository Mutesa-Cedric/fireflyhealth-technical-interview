import React from "react";
import { AppBar, Box, CssBaseline } from "@mui/material";
import Devider from "@mui/material/Divider";
import logo from "./logo.svg";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./components/sidebar";

export const Root: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <CssBaseline />
      <AppBar position="sticky"
        sx={{
          boxShadow: "none",
          backgroundColor: "white"
        }}
      >
        <Box m={2} mb={1.75}>
          <img src={logo} alt="Logo" height={30} />
        </Box>
      </AppBar>
      <Devider />
      <Box m={2} mt={0}>
        {
          location.pathname.includes("appointments") ?
            <Box minHeight={"90vh"} display={"flex"} flexDirection={"row"}>
              <Sidebar />
              <Devider orientation={"vertical"} flexItem />
              <Outlet />
            </Box> :
            <Outlet />
        }
      </Box>
    </>
  );
};

export default Root;
