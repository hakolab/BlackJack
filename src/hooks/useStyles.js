import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
  playArea: {
    margin: "10px 25px"
  },
  messageArea: {
    margin: "10px"
  },
  message: {
    fontSize: "22px",
    color: "white"
  },
  winOrLose: {
    border: "1px solid black",
    backgroundColor: "grey",
    //width: "150px",
    height: "40px",
    fontSize: "1.5em",
    fontWeight: "bold",
    color: "white",
    lineHeight: "40px",
    margin: "-100px auto 0px",
    opacity: 0.8
  }
});
