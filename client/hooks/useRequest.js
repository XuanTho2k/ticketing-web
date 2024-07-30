import { useState } from "react";
import axios from "axios";

const useRequest = ({ url, method, body }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      const response = await axios[method](url, body);
      return response.data;
    } catch (error) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Ooops......</h4>
          <ul className="my-0">
            {err.reponse.data.errors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      );
    }
  };
  return { doRequest, errors };
};

export default useRequest;
