import * as React from "react";
// import { useEffect } from "react";
// import axios from "axios";
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
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000", //black
      contrastText: "#ffffff", //white
    },
    secondary: {
      main: "#000000",
      contrastText: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#000000",
    },
  },
});

const SignInPage = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const { loginUser, statusCode } = useContext(AuthContext);
  //const { setIsLoggedIn, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    loginUser(event);

    localStorage.setItem("user", event.target[0].value);
    if (
      localStorage.getItem("loginStatus") === "401" ||
      localStorage.getItem("loginStatus") === "400"
    ) {
      setErrorMessage("Login attempt was invalid");
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
          <Avatar sx={{ m: 1, bgcolor: theme.palette.primary.main }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color="primary">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              color="primary"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              color="primary"
            />
            <h6 className="error-text">{errorMessage}</h6>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" color="primary">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  color="primary"
                  onClick={() => navigate("/signup")}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignInPage;
