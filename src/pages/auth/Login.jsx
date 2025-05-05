import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaBookOpen } from "react-icons/fa";
import { toast } from "sonner";
import { login } from "../../redux/slices/authSlice";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Label from "../../components/ui/Label";
import {
  buttonLoader,
  loginFailure,
  loginStart,
  loginSuccess,
} from "../../redux/slice/authSlice";
import usePublicAxiosSecure from "../../hooks/UseAxiosPublicSecure";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosPublic = usePublicAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    // await dispatch(login({ email, password })).unwrap();
    dispatch(loginStart());

    // toast.success("You have successfully logged in");
    // dispatch(loginSuccess({email,password}))
    const loginData = {
      username,
      password: password,
    };
    try {
      const response = await axiosPublic.post("/api/auth/login", loginData);
      console.log(response, "response");
      if (response?.data) {
        console.log(response);
        // localStorage.setItem("authToken", response?.data?.data?.access_token);
        // localStorage.setItem("user_id", "response?.data?.data?.token?._id");
        const { name, email, username, expires_in } = response?.data?.data;
        const userInfo = {
          name,
          email,
          username,
          expires_in,
        };
        // localStorage.setItem("user", JSON.stringify(userInfo));

        console.log(userInfo, "userinformation");
        dispatch(
          loginSuccess({
            authtoken: response?.data?.data?.access_token,
            user: userInfo,
          })
        );
        toast.success("Login Successfully..");
        //   setUser(JSON.parse(localStorage.getItem("user")))
        //  setLoading(false);

        // navigate(form);
        navigate("/dashboard");

        return true;
      }
    } catch (error) {
      // setLoading(false)
      // console.log(error?.response?.data?.message)
      // setErrorState(error.response?.data?.message);
      toast.error(error || "Failed to login. Please try again.");
      dispatch(loginFailure(error));
      return false;
    }

    dispatch(buttonLoader(false));
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Link to={'/'} className="flex justify-center mb-2">
          {/* <FaBookOpen className="h-10 w-10 text-purple-600" /> */}
                      <img
            src="https://i.ibb.co.com/GvpFCs5d/doctalk-logo.png"
            alt="DocTalk Logo"
            className="h-12 object-contain"
          />


        </Link>
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-gray-500">Log in to your DocTalk account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Username</Label>
          <Input
            id="email"
            type="text"
            placeholder="@johndoe"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              to="/forgot-password"
              className="text-xs text-purple-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log In"}
        </Button>
      </form>

      <div className="text-center text-sm">
        <span className="text-gray-500">Don't have an account? </span>
        <Link to="/signup" className="text-purple-600 hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
