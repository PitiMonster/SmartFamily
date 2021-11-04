import { useState, useEffect } from "react";

import classes from "./index.module.scss";

import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import ContentLayout from "../../../layout/ContentLayout";

const SpecificBudgetPage: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(1000);
  const [currentValue, setCurrentValue] = useState<number>(875);

  useEffect(() => {
    const temp = (currentValue / maxValue) * 100;
    if (progress < temp) {
      let newProgress = parseFloat(
        (
          progress +
          (1 / Math.pow(10, Math.round(Math.log10(temp)))) * temp
        ).toFixed(2)
      );
      console.log(newProgress);
      newProgress = newProgress > temp ? temp : newProgress;
      setTimeout(() => {
        return setProgress(newProgress);
      }, 1);
    }
  }, [currentValue, maxValue, progress]);

  const CircularProgressWithLabel = (
    props: CircularProgressProps & { value: number }
  ) => (
    <Box
      className={classes.progress}
      sx={{
        position: "relative",
        display: "inline-flex",
      }}
    >
      <CircularProgress
        variant="determinate"
        sx={{
          position: "absolute",
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
        }}
        size={300}
        thickness={1}
        {...props}
        value={100}
      />
      <CircularProgress
        thickness={1}
        variant="determinate"
        {...props}
        size={300}
        color={props.value > 100 ? "error" : "secondary"}
        value={props.value > 100 ? 100 : props.value}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color={progress > 100 ? "error" : "secondary"}
          className={classes.progress__textValue}
        >{`${((props.value * maxValue) / 100).toFixed(2)}zł`}</Typography>
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
          className={classes.progress__textProcent}
        >{`${props.value}%`}</Typography>
      </Box>
    </Box>
  );

  return (
    <ContentLayout>
      <p className={classes.budgetName}>Budget name</p>
      <div className={classes.container}>
        <CircularProgressWithLabel value={progress} />
        <div className={classes.expenses}>
          <p className={classes.expenses__title}>Wydatki</p>
          <div className={classes.expenses__list}></div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default SpecificBudgetPage;
