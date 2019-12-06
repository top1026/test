import React from "react";
import { Box, Grid } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const Loading = props => {
  const { open, msg } = props;

  return (
    <>
      {open && (
        <Box
          position="absolute"
          height={1}
          width={1}
          top={0}
          left={0}
          bgcolor={"gray"}
          style={{ opacity: 0.9 }}
        >
          <Grid
            container
            justify="center"
            alignItems="center"
            style={{ height: "100%" }}
          >
            <Grid item>
              <Grid container justify="center">
                <CircularProgress />
              </Grid>
              <Grid container>
                <Box>{msg && msg}</Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default Loading;
