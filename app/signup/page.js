"use client";
import Image from "next/image";

import { useRouter } from "next/navigation";
import logindoodle from "../../public/outline.png";
import { useRef, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export default function Signup() {
  const fnameRef = useRef(null);
  const lnameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const [fnameError, setFnameError] = useState("");
  const [lnameError, setLnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setFnameError("");
    setLnameError("");
    setEmailError("");
    setPhoneError("");
    setPasswordError("");
    setConfirmPasswordError("");

    let isValid = true;

    const fname = fnameRef.current ? fnameRef.current.value : "";
    const lname = lnameRef.current ? lnameRef.current.value : "";
    const email = emailRef.current ? emailRef.current.value : "";
    const phone = phoneRef.current ? phoneRef.current.value : "";
    const password = passwordRef.current ? passwordRef.current.value : "";
    const confirmPassword = confirmPasswordRef.current
      ? confirmPasswordRef.current.value
      : "";

    if (!fname) {
      setFnameError("First name is required");
      isValid = false;
    }

    if (!lname) {
      setLnameError("Last name is required");
      isValid = false;
    }

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    }

    if (!phone) {
      setPhoneError("Phone number is required");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirm password is required");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/signup`,
        {
          fname,
          lname,
          email,
          phone,
          password,
          confirmPassword,
        }
      );

      toast.success("Signup successful!");
      router.push("/login");
    } catch (error) {
      if (
        error?.response?.status === 400 &&
        error?.response?.data?.message === "Email already exists"
      ) {
        toast.error("Email already exists");
      } else {
        toast.error("Signup failed: " + error.message);
        console.error("Signup failed:", error);
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="  flex  justify-center h-[100vh] bg-gray-100">
        <div className="flex w-full  bg-white rounded-lg shadow-md overflow-hidden">
          <div className="w-1/2  flex flex-col items-center justify-center ">
            <h2 className="text-2xl mb-2 text-indigo-500">
              Create your Account
            </h2>
            <p className="text-gray-600 mb-6">
              Start connecting with our platform:
            </p>
            <div className="w-[100%] flex justify-center items-center ">
              <form className="w-full" onSubmit={handleSubmit}>
                <div className="mb-4 flex justify-center">
                  <input
                    className="shadow appearance-none border rounded w-[50%] py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="fname"
                    type="text"
                    placeholder="First Name"
                    ref={fnameRef}
                  />
                  {fnameError && (
                    <p className="text-red-500 text-xs italic">{fnameError}</p>
                  )}
                </div>
                <div className="mb-4 flex justify-center">
                  <input
                    className="shadow appearance-none border rounded w-[50%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="lname"
                    type="text"
                    placeholder="Last Name"
                    ref={lnameRef}
                  />
                  {lnameError && (
                    <p className="text-red-500 text-xs italic">{lnameError}</p>
                  )}
                </div>
                <div className="mb-4 flex justify-center">
                  <input
                    className="shadow appearance-none border rounded  w-[50%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Email"
                    ref={emailRef}
                  />
                  {emailError && (
                    <p className="text-red-500 text-xs italic">{emailError}</p>
                  )}
                </div>
                <div className="mb-4 flex justify-center">
                  <input
                    className="shadow appearance-none border rounded  w-[50%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="phone"
                    type="tel"
                    placeholder="Phone Number"
                    ref={phoneRef}
                  />
                  {phoneError && (
                    <p className="text-red-500 text-xs italic">{phoneError}</p>
                  )}
                </div>
                <div className="mb-4 flex justify-center">
                  <input
                    className="shadow appearance-none border rounded  w-[50%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Password"
                    ref={passwordRef}
                  />
                  {passwordError && (
                    <p className="text-red-500 text-xs italic">
                      {passwordError}
                    </p>
                  )}
                </div>
                <div className="mb-6 flex justify-center">
                  <input
                    className="shadow appearance-none border rounded  w-[50%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm Password"
                    ref={confirmPasswordRef}
                  />
                  {confirmPasswordError && (
                    <p className="text-red-500 text-xs italic">
                      {confirmPasswordError}
                    </p>
                  )}
                </div>
                <div className="flex justify-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-700  w-[50%] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                    type="submit"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
            <div className="text-center mt-6">
              Already have an account?{" "}
              <a
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="#"
              >
                Log in
              </a>
            </div>
          </div>
          <div className="w-1/2 bg-blue-500 text-white p-8 flex flex-col items-center justify-center">
            <Image
              src={logindoodle}
              alt="Connect Image"
              width={500}
              height={300}
            />{" "}
            {/* Use Next.js Image component */}
            <h2 className="text-2xl mb-4">Connect with every application.</h2>
            <p className="text-center">
              Everything you need in an easily customizable dashboard.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
