import axios from "axios";
import { Alert, Button, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/UserSlice.jsx";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
  

    try {
      const data = await axios.post(
        "/api/auth/signin",
        {
        email,password
        },
        {
          headers: {
            "Content-Type": "application/json", 
          },
        }
      );
      console.log(data.data);
      if (data.status === 200) {
        dispatch(signInSuccess(data.data));
        navigate("/home");
      } else {
        
        setError("Failed to sign in. Please try again.");
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred during sign-in. Please try again.");
    } finally {
   
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-10 rounded-lg shadow-md">
        <div className="text-center">
          <Link className="text-5xl font-extrabold text-gray-900 dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg">
              My
            </span>{" "}
            Bank
          </Link>
          <h4 className="mt-2 text-xl font-semibold text-gray-600 dark:text-gray-400 pt-3">
            Welcome Again
          </h4>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Your Email
              </Label>
              <TextInput
                type="email"
                placeholder="abc@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Your Password
              </Label>
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
              Sign in
            </Button>
          </div>
        </form>
        <div className="flex justify-center text-sm mt-3">
          <span className="text-gray-600 dark:text-gray-400">
            Have an account?
          </span>
          <Link to="/" className="ml-1 text-blue-600 dark:text-blue-400">
            Sign up
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
