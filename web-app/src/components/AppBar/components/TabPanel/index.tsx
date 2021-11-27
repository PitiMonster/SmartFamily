import * as React from "react";

import List from "@mui/material/List";

import { HtmlElements } from "../../../../types";

interface TabPanelProps {
  index: number;
  value: number;
  data?: HtmlElements[];
}

const TabPanel: React.FC<TabPanelProps> = (props) => {
  const { index, value, data } = props;

  return (
    <div hidden={value !== index}>
      {value === index && <List sx={{ width: "100%" }}>{data}</List>}
    </div>
  );
};

export default TabPanel;
