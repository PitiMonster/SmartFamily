import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";

const TextInput: React.FC<{
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  label: string;
  icon: JSX.Element;
}> = ({ text, setText, label, icon }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <>
      <InputLabel htmlFor="standard-adornment-password">{label}</InputLabel>
      <Input
        id="standard-adornment-password"
        type="text"
        value={text}
        onChange={handleChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="toggle password visibility">
              {icon}
            </IconButton>
          </InputAdornment>
        }
      />
    </>
  );
};

export default TextInput;
