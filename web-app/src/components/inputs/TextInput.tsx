import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import EmailIcon from "@mui/icons-material/Email";

const TextInput: React.FC<{
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  label: string;
}> = ({ text, setText, label }) => {
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
              <EmailIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </>
  );
};

export default TextInput;
