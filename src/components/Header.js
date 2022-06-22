import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {createTheme,makeStyles,ThemeProvider} from '@material-ui/core/styles'
import React from "react";
import { Link } from "react-router-dom";
import { CryptoState } from "../context";

const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
    color: "#48ae52",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

const Header = () => {
  const { currency, setCurrency } = CryptoState();
  const classes = useStyles();

  return (
    <ThemeProvider  theme={darkTheme}>
      <AppBar color="black" position="static">
        <Container
        style={{backgroundColor:'#201e1e'}}
        >
          <Toolbar>
            <Typography className={classes.title} variant="h6">
              <Link to="/">
                <div>Coin King</div>
              </Link>
            </Typography>

            <Select
              variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              style={{ width: 100, height: 40, marginLeft: 15 }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"NGN"}>NGN</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
