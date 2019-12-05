import React, { useEffect, useState } from "react";
import { Box, IconButton } from "@material-ui/core";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { Loading } from "views/components/Loading";
import { WarnDialog } from "views/components/WarnDialog";

import gql from "graphql-tag";
import DeleteIcon from "@material-ui/icons/Delete";

const LIST_MSG = gql`
  query messages {
    messages {
      id
      text
      user {
        username
      }
    }
  }
`;

const REMOVE_MSG = gql`
  mutation removeMessage($id: ID!) {
    removeMessage(id: $id)
  }
`;

const MsgList = () => {
  const [warn, setWarn] = useState({ status: false, value: null });
  const [contents, setContents] = useState([]);
  const [removeMessage, { loading: removeMessageLoading }] = useMutation(
    REMOVE_MSG,
    {
      onCompleted: data => {
        console.log(data);
      },
      onError: err => {
        console.log(err);
        alert(err);
      },
      refetchQueries: [{ query: LIST_MSG }],
      awaitRefetchQueries: true
    }
  );
  const { loading, data } = useQuery(LIST_MSG, {
    fetchPolicy: "network-only",
    pollInterval: 5000
  });

  useEffect(() => {
    if (data && data.messages) {
      setContents(data.messages);
    }
  }, [data]);
  console.log("rendering", data);

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
      <Loading open={loading || removeMessageLoading} msg={"Loading..."} />
      {!loading &&
        contents.map((msg, index) => {
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
                  console.log(msg);
                  setWarn({ status: true, value: msg });
                }}
              >
                <DeleteIcon />
              </IconButton>
              <Box>
                {msg.id}, {msg.text}
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
          console.log(warn.value);
          removeMessage({ variables: { id: warn.value.id } });
          setWarn({ status: false });
        }}
        onDissagree={() => {
          setWarn({ status: false });
        }}
      />
    </Box>
  );
};

export default MsgList;
export { LIST_MSG };
