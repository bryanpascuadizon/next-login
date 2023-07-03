"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, FC, MouseEvent, useState } from "react";

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });
  const { username, password } = loginCredentials;
  const router = useRouter();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginCredentials({
      ...loginCredentials,
      [name]: value,
    });
  };

  const handleOnSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const loginRequest = await axios.post("/api/auth/", {
      loginCredentials,
    });

    if (loginRequest.statusText === "OK") {
      router.push("/dashboard");
    }
  };

  return (
    <div className="p-3">
      <label className="w-full">Username</label>
      <br />
      <input
        type="text"
        name="username"
        value={username}
        onChange={handleOnChange}
        className="text-black border-2 border-black rounded-lg p-1 mb-3"
      />
      <br />
      <label className="w-full">Password</label>
      <br />
      <input
        type="password"
        name="password"
        value={password}
        onChange={handleOnChange}
        className="text-black border-2 border-black rounded-lg p-1 mb-3"
      />
      <br />
      <button onClick={handleOnSubmit} className="bg-slate-300 rounded-lg p-2">
        Sign In
      </button>
    </div>
  );
};

export default Login;
