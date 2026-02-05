import { useState } from "react";
import api from "../api/api";

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "USER",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/auth/register", form);
      alert("Registered successfully. Now login.");
      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data || "Registration failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          onChange={handleChange}
        />

        <select name="role" onChange={handleChange}>
          <option value="USER">USER</option>
          <option value="SELLER">SELLER</option>
        </select>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
