import React from "react";
import { Main } from "./views/Desk";

import "./App.css";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const client = new ApolloClient({
  // uri: "http://localhost:8000/graphql"
  uri:
    "https://9e5l42nq23.execute-api.ap-northeast-2.amazonaws.com/koo-vsmart00/api"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
  );
}

export default App;
