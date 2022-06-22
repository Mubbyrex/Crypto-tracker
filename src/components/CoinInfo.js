import {
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { HistoricalChart } from "../config/api";
import { CryptoState } from "../context";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import {chartDays} from '../config/data'
import SelectButton from "./SelectButton";


const CoinInfo = ({ coin ,id}) => {
  const [historicData, setHistoricData] = useState();
  const { currency } = CryptoState();
  const [flag, setFlag] = useState(false);
  const [days, setDays] = useState(1);
 



  const useStyles = makeStyles((theme) => ({
    container: {
      width: "75%",
     
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
        height:'50vh',
      },
    },
  }));
   const classes = useStyles();
   
  

  const FetchChartData = async () => {
    const {data} = await axios.get(HistoricalChart(coin.id,days,currency));
    
    setHistoricData(data?.prices);
    setFlag(true);
  };

  
  useEffect(() => {
    FetchChartData();
  }, [days,currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  
const labels =  historicData?.map((coin) => {
  let date = new Date(coin[0]);
  let time =
    date.getHours() > 12
      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
      : `${date.getHours()}:${date.getMinutes()} AM`;
  return days === 1 ? time : date.toLocaleDateString();
  
})

const data={
  
              
  labels
  ,
  datasets: [
    {
      data: historicData?.map((coin) => coin[1]),
      label: `Price ( Past ${days} Days ) in ${currency}`,
      borderColor: "#48ae52",
    },
  ],
}

const options={
  elements: {
    point: {
      radius: 1,
    },
  },
}


  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historicData | (flag === false)?(
        <CircularProgress
          style={{ color: "#48ae52" }}
          size={250}
          thickness={1}
        />
        ) 
        :(
        <>
       
          <Line height={200} data={data} options={options}/> 
          <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {
                    setDays(day.value);
                    setFlag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
        </> 
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
