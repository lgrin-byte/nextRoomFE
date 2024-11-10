"use client";

import { ThemeProvider as StyledThemeProvider } from "styled-components";
import React, { PropsWithChildren } from "react";

import theme from "@/style/theme";

function StyledProvider({ children }: PropsWithChildren) {
  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
}

export default StyledProvider;
