"use client";

import { useState } from "react";
import axios from "axios";
import { Button, Label, TextInput } from "flowbite-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (response.status === 201) {
        window.location.href = "/";
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("An error occurred during login", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form className="flex w-96 flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Email" />
          </div>
          <TextInput
            id="email1"
            type="email"
            placeholder="Mahmoud.Hashem.SE@gmail.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput
            id="password1"
            type="password"
            placeholder="password123"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Login;
