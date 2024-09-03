import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setLoading } from "../redux/authSlice";
import { BASE_URL } from "../utils/baseUrl";
import { ClipLoader } from "react-spinners";
import Footer from "../components/Footer";

const SignUp = () => {
  const [input, setInput] = useState({
    name: "",
    userName: "",
    emailId: "",
    password: "",
  });

  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    if (!input.name || !input.userName || !input.emailId || !input.password) {
      console.log("Please fill all the details!");
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
        console.log("Registeration successful!");
      } else {
        console.log("Registration failed!");
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
            <div className="form-sub-div">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                placeholder="Enter Password"
                className="form-input"
              />
            </div>

            {loading ? (
              <ClipLoader color="#3498db" className="h-16 w-16" />
            ) : (
              <button className="form-button">SignUp</button>
            )}
            <p className="mt-4">
              Already have an account?
              <span className="ml-2">
                <Link to="/login" className="text-red-600">
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
