import { AppHeader } from "@dynatrace/strato-components-preview";
import React from "react";

export const Header = () => {
  return (
    <AppHeader>
      <AppHeader.NavItems>
        <AppHeader.NavItem to="/data">Explore Data</AppHeader.NavItem>
      </AppHeader.NavItems>
    </AppHeader>
  );
};
