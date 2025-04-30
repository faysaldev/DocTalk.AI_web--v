import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaBookOpen } from 'react-icons/fa';
import { toast } from 'sonner';
import { forgotPassword } from '../../redux/slices/authSlice';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Label from '../../components/ui/Label';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { loading } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    try {
      await dispatch(forgotPassword(email)).unwrap();
      setSubmitted(true);
      toast.success("If an account exists with this email, you will receive a reset link");
    } catch (error) {
      toast.error("Failed to send reset link. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex justify-center mb-2">
          <FaBookOpen className="h-10 w-10 text-purple-600" />
        </div>
        <h1 className="text-2xl font-bold">Reset your password</h1>
        <p className="text-gray-500">
          Enter your email and we'll send you a link to reset your password
        </p>
      </div>
      
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
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
          
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
      ) : (
        <div className="bg-green-50 p-4 rounded-md text-green-700 text-center">
          <p className="mb-2">Reset link has been sent!</p>
          <p className="text-sm">Please check your email inbox.</p>
        </div>
      )}
      
      <div className="text-center text-sm">
        <Link to="/login" className="text-purple-600 hover:underline">
          Back to login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;