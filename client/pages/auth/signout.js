import { useEffect } from "react";
import Router from "next/route";
import useRequest from "../../hooks/useRequest";

const signout = () => {
  const { doRequest } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => Router.push("/"),
  });
  useEffect(() => {
    doRequest();
  }, []);
  return <div>Sign out ...</div>;
};

export default signout;
