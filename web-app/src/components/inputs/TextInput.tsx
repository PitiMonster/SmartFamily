import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";

import classes from "./styles.module.scss";

const TextInput: React.FC<{
  text: string;
  setText?: React.Dispatch<React.SetStateAction<string>>;
  label: string;
  disabled?: boolean;
  icon?: JSX.Element;
}> = ({
  text,
  setText = (value: React.SetStateAction<string>) => {},
  label,
  icon,
  disabled = false,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <>
      <InputLabel
        htmlFor="standard-adornment-password"
        className={classes.input}
      >
        {label}
      </InputLabel>
      <Input
        disabled={disabled}
        className={classes.input}
        id="standard-adornment-password"
        type="text"
        value={text}
        onChange={handleChange}
        endAdornment={
          icon && (
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility">
                {icon}
              </IconButton>
            </InputAdornment>
          )
        }
      />
    </>
  );
};

export default TextInput;
