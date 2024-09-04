import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setIsLoggedIn, setLoading } from "../redux/authSlice";
import { BASE_URL } from "../utils/baseUrl";
import { ClipLoader } from "react-spinners";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import { TbEye, TbEyeClosed } from "react-icons/tb";

const Login = () => {
  const [input, setInput] = useState({
    emailId: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!input.emailId && !input.password) {
      toast.error("Please fill all the details!");
      return;
    }

    if (!input.emailId) {
      toast.error("Please enter your email!");
      return;
    }

    if (!input.password) {
      toast.error("Please enter your password!");
      return;
    }

    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${BASE_URL}/user/login`, input, {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        dispatch(setIsLoggedIn(true));
        navigate("/home");
        toast.success(response.data.message);
      } else {
        toast.error("Login failed!");
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status code outside the range of 2xx
        const { status, data } = error.response;
        if (status === 400) {
          toast.error("Invalid input! Please check your details.");
        } else if (status === 401) {
          toast.error("Unauthorized! Please log in again.");
        } else if (status === 500) {
          toast.error("Server error! Please try again later.");
        } else {
          toast.error(`An error occurred: ${data.message || "Unknown error"}`);
        }
      } else if (error.request) {
        // The request was made but no response was received
        toast.error("Network error! Please check your internet connection.");
      } else {
        // Something else caused the error
        toast.error(`An error occurred: ${error.message}`);
      }
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Navbar />
        <div className="form-div">
          <form onSubmit={submitForm} className="form-details max-w-7xl">
            <h1 className="form-heading">Login</h1>
            <div className="form-sub-div">
              <label>Email Id</label>
              <input
                type="email"
                name="emailId"
                value={input.emailId}
                onChange={changeEventHandler}
                placeholder="amanmulla167@gmail.com"
                className="form-input"
              />
            </div>
            <div className="relative form-sub-div">
              <label>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                placeholder="Enter Your Password"
                className="form-input"
              />
              <span
                className="absolute right-3 top-2/3 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <TbEye className="text-2xl" />
                ) : (
                  <TbEyeClosed className="text-2xl" />
                )}
              </span>
            </div>

            {loading ? (
              <ClipLoader color="#3498db" className="h-16 w-16" />
            ) : (
              <button className="form-button">Login</button>
            )}
            <p className="mt-4">
              Don't have an account?
              <span className="ml-2">
                <Link to="/" className="text-red-600 font-bold underline">
                  SignUp
                </Link>
              </span>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
