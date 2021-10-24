import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const PasswordInput: React.FC<{
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  label: string;
  buttonText: string;
  buttonAction: () => any;
}> = ({ text, setText, label, buttonText, buttonAction }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleClickTextButton = () => {
    buttonAction();
  };

  return (
    <>
      <InputLabel
        htmlFor="standard-adornment-password"
        sx={{ fontSize: "1.2rem" }}
      >
        {label}
      </InputLabel>
      <Input
        sx={{ fontSize: "1.2rem" }}
        id="standard-adornment-password"
        value={text}
        onChange={handleChange}
        endAdornment={
          <InputAdornment position="end">
            <p
              onClick={handleClickTextButton}
              style={{
                color: "#01dd24",
                margin: "0",
                padding: "0",
                verticalAlign: "middle",
                cursor: "pointer",
                fontSize: ".9rem",
              }}
            >
              {buttonText}
            </p>
          </InputAdornment>
        }
      />
    </>
  );
};

export default PasswordInput;
