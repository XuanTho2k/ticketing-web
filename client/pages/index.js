import React from "react";
import axios from "axios";
import { buildClient } from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  return currentUser ? <h1>Hello User</h1> : "You not sign in!";
};

LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser");
  return data;
};

export default LandingPage;
