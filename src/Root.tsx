import React from "react";
import { AppBar, Box, CssBaseline } from "@mui/material";

import logo from "./logo.svg";
import { Outlet } from "react-router-dom";

export const Root: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <AppBar position="sticky">
        <Box m={2} mb={1.75}>
          <img src={logo} alt="Logo" height={30} />
        </Box>
      </AppBar>
      <Box m={2}>
        <Outlet />
      </Box>
    </>
  );
};

export default Root;
