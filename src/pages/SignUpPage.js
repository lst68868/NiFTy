import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#ffffff",
    },
  },
});

export default function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);

    try {
      const response = await axios.post(
        //"http://127.0.0.1:8006/create_user/",
        "https://nft-mint-api-824f9dc02cba.herokuapp.com/create_user/",
        {
          email: data.get("email"),
          password: data.get("password"),
          ethereumAddress: data.get("ethereumAddress"),
        }
      );

      // Handle successful response
      setSuccess(response.data.message);
      setError("");
      form.reset();
    } catch (error) {
      // Handle error response
      setError(error.response.data.error);
      setSuccess("");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon color="secondary" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>

              </Grid>
              <Grid item xs={12} sm={6}>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="ethereumAddress"
                  label="Ethereum Address"
                  name="ethereumAddress"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label={
                    <React.Fragment>
                      I have read and agreed to the{" "}
                      <Link
                        href="/terms-of-use"
                        color="primary"
                        underline="always"
                      >
                        Terms of use
                      </Link>
                      ,{" "}
                      <Link
                        href="/privacy-policy"
                        color="primary"
                        underline="always"
                      >
                        Privacy notice
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/offer-details"
                        color="primary"
                        underline="always"
                      >
                        Offer details
                      </Link>
                      .
                    </React.Fragment>
                  }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-middle">
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => navigate("/signin")}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            {error && (
              <Typography color="error" variant="body2" align="center">
                {error}
              </Typography>
            )}
            {success && (
              <Typography color="success" variant="body2" align="center">
                {success}
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
