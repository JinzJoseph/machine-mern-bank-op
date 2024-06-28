import axios from "axios";
import { Alert, Button, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(username + email, password);
    try {
      const res = await axios.post("/api/auth/signup", {
        username,
        email,
        password,
      });
      console.log(res);
      if (res.status === 201) {
        navigate("/signin");
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Link
            to="/"
            className="text-center text-5xl font-extrabold text-gray-900 dark:text-white"
          >
            <span className="px-2 py-1 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg">
              My
            </span>{" "}
            Bank
          </Link>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400 p-2">
            Enjoy Your Banking Transcations with Me
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <Label value="Your Username" />
              <TextInput
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <Label value="Your Email" />
              <TextInput
                type="email"
                placeholder="abc@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <Label value="Your Password" />
              <TextInput
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <Button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              signup
            </Button>
          </div>
        </form>
        <div className="flex justify-center text-sm mt-3">
          <span className="text-gray-600 dark:text-gray-400">
            Have an account?
          </span>
          <Link to="/signin" className="ml-1 text-blue-600 dark:text-blue-400">
            Sign In
          </Link>
        </div>
        {error && (
          <Alert className="mt-6" color="failure">
            {error}
          </Alert>
        )}
      </div>
    </div>
  );
};

export default SignUp;
