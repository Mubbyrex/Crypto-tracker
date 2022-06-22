import { LinearProgress, makeStyles, Typography } from "@material-ui/core";

import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../context";
import parse from "html-react-parser";
import { numberWithCommas } from "../components/CoinsTable";
import CoinInfo from "../components/CoinInfo";

const CoinPage = () => {
  const [coin, setCoin] = useState();
  const { id } = useParams();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sidebar: {
      width: "30%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat",
    },
    desc: {
      width: "100%",
      fontFamily: "montserrat",
      padding: 25,
      paddingTop: 0,
      paddingBottom: 20,
    },
    marketdata: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("sm")]: {
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "montserrat",
    },
  }));

  const classes = useStyles();

  if (!coin) return <LinearProgress style={{ backgroundColor: "#48ae52" }} />;
  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="170"
          style={{
            marginBottom: 20,
          }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography varaint="subtitle1" className={classes.desc}>
          {parse(coin?.description.en.split(". ")[0])}.
        </Typography>
        <div className={classes.marketdata}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank :
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "montserrat" }}>
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Price :
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "montserrat" }}>
              {symbol}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap :
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "montserrat" }}>
              {symbol}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
            </Typography>
          </span>
        </div>
      </div>
      <CoinInfo coin={coin} id={id} />
    </div>
  );
};

export default CoinPage;
