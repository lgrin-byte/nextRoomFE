import React from "react";

import EmptyHome from "@/components/common/EmptyHome/EmptyHome";
import HintList from "@/components/ThemeDetail/ThemeDetail";
import { Themes } from "@/queries/getThemeList";

type Props = {
  categories: Themes;
};

function HomeView(props: Props) {
  const { categories } = props;

  if (categories.length < 1) {
    return <EmptyHome />;
  }
  return <HintList />;
}
export default HomeView;
