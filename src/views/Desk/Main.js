import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid } from "@material-ui/core";
import { UserList } from "./components";
import { MsgList } from "./components";
import { InputField } from "./components";

// const useStyles = makeStyles(theme => ({
//   root: {}
// }));

const Main = props => {
  return (
    <Box width={1} height={1} overflow="auto">
      <Grid
        container
        style={{
          height: "100%",
          flexWrap: "nowrap"
        }}
      >
        <Grid item style={{ minWidth: "600px", width: "50%", height: "100%" }}>
          <Grid
            container
            direction="column"
            style={{
              height: "100%"
            }}
          >
            <Grid item style={{ width: "100%", height: "300px", padding: 8 }}>
              <InputField />
            </Grid>
            <Grid
              item
              style={{
                width: "100%",
                height: "calc(100% - 300px)",
                padding: 8
              }}
            >
              <UserList />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          style={{
            minWidth: "400px",
            width: "50%",
            height: "100%",
            padding: 8
          }}
        >
          <MsgList />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Main;
