import { useState } from "react";
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../../lib/apiRequest.js";

function Register() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // ENABLE BUTTON
    setIsLoading(true);

    const data = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const res = await apiRequest.post("/auth/register", data);

      navigate("/login");
    } catch (e) {
      console.log(e);
      setError(e.response.data.errors);
    } finally { 
      setIsLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleOnSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" required />
          <input name="email" type="text" placeholder="Email" required />
          <input
            name="password"
            type="password"
            placeholder="Password"
            min={3}
            max={20}
            required
          />
          <button>Register</button>
          {error && <span>{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
