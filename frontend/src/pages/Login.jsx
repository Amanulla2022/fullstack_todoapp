import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setIsLoggedIn, setLoading } from "../redux/authSlice";
import { BASE_URL } from "../utils/baseUrl";
import { ClipLoader } from "react-spinners";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Login = () => {
  const [input, setInput] = useState({
    emailId: "",
    password: "",
  });

  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!input.emailId || !input.password) {
      console.log("Please fill all the details");
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
        console.log("Login successfully!");
      } else {
        console.log("Login failed!");
      }
    } catch (error) {
      console.log(`Error occured ${error}`);
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
            <div className="form-sub-div">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                placeholder="Enter Your Password"
                className="form-input"
              />
            </div>

            {loading ? (
              <ClipLoader color="#3498db" className="h-16 w-16" />
            ) : (
              <button className="form-button">Login</button>
            )}
            <p className="mt-4">
              Don't have an account?
              <span className="ml-2">
                <Link to="/" className="text-red-600">
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
