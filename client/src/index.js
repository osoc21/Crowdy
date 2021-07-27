import React from "react";
import ReactDOM from "react-dom";
//import 'maplibre-gl/dist/maplibre-gl.css';
import "mapbox-gl/dist/mapbox-gl.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

// ** Apollo
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// ** Apollo Client
const client = new ApolloClient({
  uri: process.env.REACT_APP_SERVER_BACKEND,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,

  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
