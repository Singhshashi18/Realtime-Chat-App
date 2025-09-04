import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, MessageSquare, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const { login, isLoggingIn } = useAuthStore();

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    try {
      await login(formData);
    } catch (error) {
      // Error handling is done in the store
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                className={`input input-bordered w-full transition-all duration-200 focus:scale-[1.02] ${
                  formErrors.email ? 'input-error' : ''
                }`}
                placeholder="your@email.com"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isLoggingIn}
              />
              {formErrors.email && (
                <label className="label">
                  <span className="label-text-alt text-error">{formErrors.email}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pr-10 transition-all duration-200 focus:scale-[1.02] ${
                    formErrors.password ? 'input-error' : ''
                  }`}
                  placeholder="••••••••"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isLoggingIn}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-primary transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoggingIn}
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
              {formErrors.password && (
                <label className="label">
                  <span className="label-text-alt text-error">{formErrors.password}</span>
                </label>
              )}
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-full transition-all duration-200 hover:scale-[1.02]"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Don't have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Image Pattern */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};

export default LoginPage;
