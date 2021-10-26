import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import classes from "./styles.module.scss";

const PasswordInput: React.FC<{
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  label: string;
}> = ({ password, setPassword, label }) => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
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
        className={classes.input}
        id="standard-adornment-password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={handleChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </>
  );
};

export default PasswordInput;
