import { useState } from "react";
import axios from "axios";
import useRequest from "../../hooks/useRequest";

const signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);

  const { doRequest, errors } = useRequest();
  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post("/api/users/signup", {
        email,
        password,
      });
      console.log(res);
    } catch (err) {
      console.log(err.response.data);
      setError(err.response.data.errors);
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <h1>Sign up</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Password </label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {error.length > 0 && <></>}
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
};

export default signup;
