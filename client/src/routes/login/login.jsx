import { useContext, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiRequest } from "../../lib/apiRequest.js";
import { AuthContext } from "../../contexts/AuthContext";

function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { updateUser } = useContext(AuthContext);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // CLEAR ERROR MESSAGE & ENABLE BUTTON
    setError("");
    setIsLoading(true);

    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    try {
      const res = await apiRequest.post("/auth/login", data);

      // SAVE USER DATA TO LOCAL STORAGE && UPDATE AUTH CONTEXT
      updateUser(res.data);

      // REDIRECT TO HOME PAGE
      navigate("/");
    } catch (e) {
      console.log(e);
      setError(e.response.data.errors);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleOnSubmit}>
          <h1>Welcome back</h1>
          <input name="username" type="text" placeholder="Username" required />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            min={3}
            max={20}
          />
          <button disabled={isLoading}>{isLoading ? <span class="loader"></span> :  "Login"}</button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
