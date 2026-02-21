"use client";

import { useState } from "react";
import { validateRegistrationForm, ValidationErrors } from "@/lib/utilities/errorhandling/validation";
import PageContainer from "@/components/layout/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";
import { AuthService } from "@/lib/services/authService";
import { getErrorMessage } from "@/lib/utilities/errorhandling/errorHandler";


export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  /**
   * Handles input changes and clears error for that field
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Frontend validation
    const validationErrors = validateRegistrationForm(
      formData.username,
      formData.email,
      formData.password,
      formData.confirmPassword
    );

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      // Send registration request to backend using AuthService
      const response = await AuthService.register(
        formData.username,
        formData.email,
        formData.password
      );

      // Registration successful
      setSuccessMessage("Registration successful! Redirecting to home page...");
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // Redirect to home page after 1 second
      setTimeout(() => {
        window.location.href = "/#";
      }, 1000);
    } catch (err) {
      // console.error("Registration error:", error);
      const errorMessage = getErrorMessage(err, "An error occurred during registration. Please try again.");
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <div className="space-y-6 lg-custom:w-5/6 mx-auto w-full">
        <PageHeader title="Create Account" />
        <p className="text-center text-indigo-200 mb-6">Join the Mauvestep community</p>
        {successMessage && (
          <div className="bg-green-900 bg-opacity-50 border-2 border-green-500 text-green-200 px-4 py-3 rounded">
            {successMessage}
          </div>
        )}
        {error && (
          <div className="bg-red-900 bg-opacity-50 border-2 border-red-500 text-red-200 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4 px-2">
          <Input
            id="username"
            name="username"
            type="text"
            label="Username"
            value={formData.username}
            onChange={handleInputChange}
            error={errors.username}
            placeholder="Enter your username"
            disabled={isLoading}
            required
          />

          <Input
            id="email"
            name="email"
            type="email"
            label="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            placeholder="Enter your email"
            disabled={isLoading}
            required
          />

          <Input
            id="password"
            name="password"
            type="password"
            label="Password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            helperText="8+ chars: uppercase, lowercase, number, special character"
            placeholder="Enter a strong password"
            disabled={isLoading}
            required
          />

          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={errors.confirmPassword}
            placeholder="Confirm your password"
            disabled={isLoading}
            required
          />


          <Button
            type="submit"
            variant="submit"
            fullWidth
            loading={isLoading}
          >
            Create Account
          </Button>
        </form>
        
      </div>
    </PageContainer>
  );
}
