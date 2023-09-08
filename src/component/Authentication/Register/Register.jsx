import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@material-ui/core";
import { makeStyles } from "@mui/styles";
import { showErrorToast, showSucessToast } from "../../../common/Notification";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "./register.scss";
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
export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const classes = useStyles();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async () => {
    //Call the API for register
    try {
      console.log("formData", formData);
      await axios.post("http://localHost:8000/signup", formData);
      showSucessToast("Sucessfully registered");
    } catch (err) {
      console.log("err", err.response.data.message);
      if (err.response.data.message === "EMAIL_ALREADY_THERE") {
        showErrorToast("Email already exists");
      } else {
        showErrorToast("Error in registering");
      }
    }
  };

  return (
    <div className="form-wrapper">
      <form className={classes.form}>
        <TextField
          className={classes.textfield}
          variant="outlined"
          type="text"
          label="Name"
          name="name"
          value={formData.name}
          required
          onChange={(e) => handleChange(e)}
        />
        <TextField
          className={classes.textfield}
          variant="outlined"
          label="Email"
          type="email"
          name="email"
          required
          value={formData.email}
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
        <TextField
          className={classes.textfield}
          variant="outlined"
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          required
          value={formData.confirmPassword}
          onChange={(e) => handleChange(e)}
        />
        <Button
          variant="contained"
          className={classes.button}
          onClick={handleSubmit}
          disabled={
            formData.name == "" ||
            formData.email == "" ||
            formData.password == "" ||
            formData.confirmPassword == ""
          }
        >
          Register
        </Button>
      </form>
    </div>
  );
}
