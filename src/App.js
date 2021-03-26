import "./styles.css";
import { Box, Typography } from "@material-ui/core";
import BlackJack from "./BlackJack";

export default function App() {
  return (
    <Box className="App">
      <Typography variant="h1">
        <Box className={"h1-header"}>Border 7</Box>
      </Typography>
      <Typography variant="h2">
        <Box className={"h2-header"}>on Codesandbox</Box>
      </Typography>
      <Box id="table">
        <BlackJack />
      </Box>
    </Box>
  );
}
