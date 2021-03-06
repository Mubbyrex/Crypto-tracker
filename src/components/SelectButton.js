import { makeStyles } from "@material-ui/core";

const SelectButton = ({ children, selected, onClick }) => {
  const useStyles = makeStyles((theme)=>({
    selectbutton: {
      border: "1px solid #48ae52",
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: "Montserrat",
      cursor: "pointer",
      backgroundColor: selected ? "#48ae52" : "",
      color: selected ? "black" : "",
      alignText: 'left',
      fontWeight: selected ? 700 : 500,
      [theme.breakpoints.down("sm")]: {
        paddingLeft: 5,
      },
      "&:hover": {
        backgroundColor: "#48ae52",
        color: "black",
      },
      width: "22%",
      //   margin: 5,
    },
  }))

  const classes = useStyles();

  return (
    <span onClick={onClick} className={classes.selectbutton}>
      {children}
    </span>
  );
};

export default SelectButton;
