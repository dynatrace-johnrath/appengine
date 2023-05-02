import { AppHeader } from "@dynatrace/strato-components-preview";
import React from "react";

export const Header = () => {
  return (
    <AppHeader>
      <AppHeader.NavItems>
        <AppHeader.NavItem href="/">Home</AppHeader.NavItem>
      </AppHeader.NavItems>
    </AppHeader>
  );
};
