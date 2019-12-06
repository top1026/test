import React, { useState } from "react";
import { Box, IconButton, Typography } from "@material-ui/core";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Loading } from "views/components/Loading";
import { WarnDialog } from "views/components/WarnDialog";
import DeleteIcon from "@material-ui/icons/Delete";

const SEARCH_USER = gql`
  query searchUser($username: String, $email: String) {
    searchUser(input: { username: $username, email: $email }) {
      username
      email
    }
  }
`;

const REMOVE_USER = gql`
  mutation removeUser($email: String!) {
    removeUser(email: $email)
  }
`;

const UserList = () => {
  const [warn, setWarn] = useState({ status: false, value: null });
  const [removeUser, { loading: removeUserLoading }] = useMutation(
    REMOVE_USER,
    {
      onCompleted: data => {},
      onError: err => {
        alert(err);
      },
      refetchQueries: [{ query: SEARCH_USER }],
      awaitRefetchQueries: true
    }
  );
  const { loading, data } = useQuery(SEARCH_USER, {
    onCompleted: data => {},
    onError: err => {
      alert(err);
    },
    fetchPolicy: "network-only"
  });

  console.log("list rendering");
  return (
    <Box
      position={"relative"}
      width={1}
      height={1}
      overflow="auto"
      border={1}
      padding={"8px"}
      style={{ boxSizing: "border-box" }}
    >
      <Loading open={loading || removeUserLoading} msg={"Loading..."} />
      <Typography variant="h4">User List</Typography>
      {!loading &&
        data &&
        data.searchUser.map((user, index) => {
          return (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              borderBottom={1}
            >
              <IconButton
                aria-label="delete"
                onClick={() => {
                  console.log("remove", user.email);
                  setWarn({ status: true, value: user });
                }}
              >
                <DeleteIcon />
              </IconButton>
              <Box>
                {user.username}, {user.email}
              </Box>
            </Box>
          );
        })}
      <WarnDialog
        open={warn.status}
        onClose={() => {
          setWarn({ status: false });
        }}
        onAgree={() => {
          removeUser({ variables: { email: warn.value.email } });
          setWarn({ status: false });
        }}
        onDissagree={() => {
          setWarn({ status: false });
        }}
      />
    </Box>
  );
};

export default UserList;
export { SEARCH_USER };
