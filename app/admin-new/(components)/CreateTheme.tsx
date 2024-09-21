import React from "react";
import CreateThemeTitle from "./CreateThemeTitle";
import CreateThemeBody from "./CreateThemeBody";
import CreateThemeAddButton from "./CreateThemeAddButton";

export default function CreateTheme() {
  return (
    <div className="create-theme">
      <CreateThemeTitle />
      <CreateThemeBody />
      <CreateThemeAddButton />
    </div>
  );
}
