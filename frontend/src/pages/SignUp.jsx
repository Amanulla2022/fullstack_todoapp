import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setLoading } from "../redux/authSlice";
import { BASE_URL } from "../utils/baseUrl";
import { ClipLoader } from "react-spinners";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import { TbEye, TbEyeClosed } from "react-icons/tb";

const SignUp = () => {
  const [input, setInput] = useState({
    name: "",
    userName: "",
    emailId: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!input.name && !input.userName && !input.emailId && !input.password) {
      toast.error("Please fill all the details!");
      return;
    }

    if (!input.name) {
      toast.error("Please enter your name!");
      return;
    }

    if (!input.userName) {
      toast.error("Please enter your userName!");
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

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("userName", input.userName);
    formData.append("emailId", input.emailId);
    formData.append("password", input.password);

    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${BASE_URL}/user/register`, formData, {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        navigate("/login");
        toast.success("Registration successful!");
      } else {
        toast.error("Registration successful!");
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
            <h1 className="form-heading">Sign Up</h1>
            <div className="form-sub-div">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                placeholder="Enter Full Name"
                className="form-input"
              />
            </div>
            <div className="form-sub-div">
              <label>User Name</label>
              <input
                type="text"
                name="userName"
                value={input.userName}
                onChange={changeEventHandler}
                placeholder="Enter User Name"
                className="form-input"
              />
            </div>
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
              <button className="form-button">SignUp</button>
            )}
            <p className="mt-4">
              Already have an account?
              <span className="ml-2">
                <Link
                  to="/login"
                  className="text-green-600 font-bold underline"
                >
                  Login
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

export default SignUp;
