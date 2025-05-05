import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaBookOpen } from 'react-icons/fa';
import { toast } from 'sonner';
// import { signup } from '../../redux/slices/authSlice';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Label from '../../components/ui/Label';
import { buttonLoader, signupFailure, signupStart, signupSuccess } from '../../redux/slice/authSlice';
import usePublicAxiosSecure from '../../hooks/UseAxiosPublicSecure';

const SignUp = () => {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loading, error } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosPublic = usePublicAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    try {
      dispatch(signupStart())
  const requestBody = {
      username: username,
      email: email,
      name: name,
      password: password,
      confirm_password: confirmPassword,
    };

    // Make API call
    const {data} = await axiosPublic.post(`/api/auth/signup`, requestBody);


    // dispatch(signupSuccess({email:data?.data?.details?.email,password:data?.data?.details?.cognito_sub,name:data?.data?.details?.username}))
    console.log(data,"clg loging datas")
      toast.success("Account created successfully");
      dispatch(buttonLoader(false));
      navigate(`/verify-email/${username}`);
    } catch (error) {
      toast.error(error || "Failed to create account");
      dispatch(signupFailure(error))
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
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-gray-500">Sign up for DocTalk to get started</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            required
          />
        </div>

                <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="@johndoe"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            disabled={loading}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
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
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
            required
          />
        </div>
        
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Sign Up"}
        </Button>
      </form>
      
      <div className="text-center text-sm">
        <span className="text-gray-500">Already have an account? </span>
        <Link to="/login" className="text-purple-600 hover:underline">
          Log in
        </Link>
      </div>
    </div>
  );
};

export default SignUp;