import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textfield: {
    marginBottom: "10px !important",
    width: "300px",
  },
  button: {
    width: "300px",
  },
}));
export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const classes = useStyles();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("formDta", formData);
      const response = await axios.post(
        "http://localHost:8000/signin",
        formData
      );
      console.log("response", response.data.data.token);
      const token = response.data.data.token;
      if (token) {
        localStorage.setItem("token", token);
      } else {
        return false;
      }
    } catch (err) {
      console.log("err", err);
    }
  };
  return (
    <div>
      <form>
        <TextField
          className={classes.textfield}
          variant="outlined"
          type="text"
          label="Email"
          name="email"
          value={formData.email}
          required
          onChange={(e) => handleChange(e)}
        />
        <TextField
          className={classes.textfield}
          variant="outlined"
          label="Password"
          type="password"
          name="password"
          required
          value={formData.password}
          onChange={(e) => handleChange(e)}
        />
        <Button
          variant="contained"
          className={classes.button}
          onClick={handleSubmit}
        >
          Login
        </Button>
      </form>
    </div>
  );
}
