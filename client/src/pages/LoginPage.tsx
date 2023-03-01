import React, { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { login } from "../axios/axiosConfig";
import { useAuthen } from "../helpers/useAuthen";

const formDataDefaultValue = {
  username: "admin",
  password: "123456",
};

type Props = {};

const LoginPage = (props: Props) => {
  useAuthen();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState(formDataDefaultValue);
  const { username, password } = formData;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="loginContainer">
      <label>Username:</label>
      <input
        type="text"
        name="username"
        value={username}
        onChange={handleChange}
      />
      <label>Password:</label>
      <input name="password" value={password} onChange={handleChange} />
      <button onClick={() => login(formData, dispatch)}> Login </button>
    </div>
  );
};

export default LoginPage;
