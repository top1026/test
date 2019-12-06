import React, { useRef, useState, useEffect } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Box,
  Grid,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  InputAdornment,
  IconButton,
  Tooltip
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Loading } from "views/components/Loading";
import { LIST_MSG, SEARCH_USER } from "views/Desk/components";

const SIGNUP = gql`
  mutation signUp($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

const CREATE_MSG = gql`
  mutation createMessage($user: String!, $text: String!) {
    createMessage(user: $user, text: $text) {
      id
      text
    }
  }
`;

const TestDialog = props => {
  const { open, onClose, onSave, onCancel } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogContent>Dialog Content</DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => {
            onSave && onSave();
          }}
        >
          ok
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            onCancel && onCancel();
          }}
        >
          cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const InputField = props => {
  const [save, setSave] = useState(false);
  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const textRef = useRef();

  const [createMsg, { loading: msgLoading }] = useMutation(CREATE_MSG, {
    onCompleted: data => {
      console.log(data);
    },
    onError: err => {
      console.log(err);
      alert(err);
    },
    refetchQueries: [{ query: LIST_MSG }],
    awaitRefetchQueries: true
  });
  const [signUpNcreateMsg, { loading: signupLoading }] = useMutation(SIGNUP, {
    onCompleted: data => {
      console.log(data);
      createMsg({
        variables: {
          user: emailRef.current.value,
          text: textRef.current.value
        }
      });
    },
    onError: err => {
      console.log(err);
      alert(err);
    },
    refetchQueries: [{ query: SEARCH_USER }],
    awaitRefetchQueries: true
  });
  const [signUpOnly, { loading: signUpOnlyLoading }] = useMutation(SIGNUP, {
    onCompleted: data => {
      console.log(data);
    },
    onError: err => {
      console.log(err);
      alert(err);
    },
    refetchQueries: [{ query: SEARCH_USER }],
    awaitRefetchQueries: true
  });

  useEffect(() => {});

  return (
    <Box
      position="relative"
      width={1}
      height={1}
      border={1}
      style={{ padding: 8, boxSizing: "border-box" }}
    >
      <Grid
        container
        style={{ height: "100%" }}
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <TextField
                label="email"
                inputRef={emailRef}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Dialog Test">
                        <IconButton
                          onClick={() => {
                            setSave(true);
                          }}
                        >
                          <SearchIcon />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  )
                }}
                style={{ width: 166 }}
              />
            </Grid>
            <Grid item>
              <TextField label="name" inputRef={nameRef} />
            </Grid>
            <Grid item>
              <TextField label="passwordRef" inputRef={passwordRef} />
            </Grid>
            <Grid item>
              <TextField label="text" inputRef={textRef} />
            </Grid>
          </Grid>

          <Grid container justify="center" style={{ padding: 8 }}>
            <Button
              variant="contained"
              onClick={() => {
                console.log("aa");
                signUpNcreateMsg({
                  variables: {
                    email: emailRef.current.value,
                    username: nameRef.current.value,
                    password: passwordRef.current.value
                  }
                });
              }}
            >
              {"SIGNUP && MSG SAVE"}
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                console.log("MSG SAVE");
                createMsg({
                  variables: {
                    user: emailRef.current.value,
                    text: textRef.current.value
                  }
                });
              }}
            >
              {"ONLY MSG SAVE"}
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                signUpOnly({
                  variables: {
                    email: emailRef.current.value,
                    username: nameRef.current.value,
                    password: passwordRef.current.value
                  }
                });
              }}
            >
              only signup
            </Button>
          </Grid>
          <Loading
            open={signupLoading || signUpOnlyLoading}
            msg={"Loading...1(SignUP)"}
          />
          <Loading open={msgLoading} msg={"Loading...2(Create Message)"} />

          <TestDialog
            open={save}
            onClose={() => {
              setSave(false);
            }}
            onSave={() => {
              console.log("save");
              setSave(false);
            }}
            onCancel={() => {
              console.log("cancel");
              setSave(false);
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default InputField;
