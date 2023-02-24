import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/auth/signup", { name, email, password });
      if (res.status === 200) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Box sx={{ display: "grid", height: "100vh", placeItems: "center" }}>
      <form onSubmit={submitHandler}>
        <Box sx={{ display: "grid", gap: ".1rem" }}>
          <Typography variant="h4">Signup</Typography>
          <TextField
            label="Name"
            variant="standard"
            required
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            variant="standard"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            variant="standard"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <Button disabled={loading} type="submit" variant="contained">
            Signup
          </Button>
          <Typography sx={{ fontStyle: "italic", mt: 1 }}>
            Already have an account <Link to="/login">login</Link>
          </Typography>
        </Box>
      </form>
    </Box>
  );
}

export default Signup;
