import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaBookOpen } from 'react-icons/fa';
import { toast } from 'sonner';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Label from '../../components/ui/Label';

const VerifyEmail = () => {
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { currentUser } = useSelector(state => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!code) {
      toast.error("Please enter the verification code");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate verification process
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Your email has been verified");
      // In a real app, you would update the user's email verification status
    }, 1500);
  };

  const handleResendCode = () => {
    toast.info("A new verification code has been sent to your email");
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex justify-center mb-2">
          <FaBookOpen className="h-10 w-10 text-purple-600" />
        </div>
        <h1 className="text-2xl font-bold">Verify your email</h1>
        <p className="text-gray-500">
          Please enter the verification code sent to <br />
          <strong>{currentUser?.email}</strong>
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="code">Verification Code</Label>
          <Input
            id="code"
            type="text"
            placeholder="123456"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={isSubmitting}
            required
          />
        </div>
        
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Verifying..." : "Verify Email"}
        </Button>
      </form>
      
      <div className="text-center text-sm">
        <Button
          variant="link"
          className="text-purple-600 p-0"
          onClick={handleResendCode}
        >
          Resend verification code
        </Button>
      </div>
    </div>
  );
};

export default VerifyEmail;