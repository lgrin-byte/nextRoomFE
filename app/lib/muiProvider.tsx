"use client";

import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material";
import React, { PropsWithChildren } from "react";

import themeMui from "@/style/ThemeMUI.json";

function MuiProvider({ children }: PropsWithChildren) {
  const theme = createTheme(themeMui as any);

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}

export default MuiProvider;
