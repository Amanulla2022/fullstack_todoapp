import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "./../utils/baseUrl";
import { IoIosLogOut, IoIosLogIn } from "react-icons/io";
import { setIsLoggedIn } from "../redux/authSlice";
import { toast } from "react-toastify";
import { MdAccountCircle } from "react-icons/md";

const Navbar = () => {
  const { isLoggedIn } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/logout`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        dispatch(setIsLoggedIn(false));
        navigate("/login");
        toast.success(response.data.message);
      } else {
        toast.error("Logout failed!");
      }
    } catch (error) {
      toast.error("An error occurred during logout!");
    }
  };
  return (
    <div className="flex items-center justify-around mt-2 border-b border-b-gray-300 py-4">
      <h1 className="text-3xl font-bold">
        To<span className="footer-span">Do</span>
      </h1>

      <div className="flex gap-4">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="text-white main-btn bg-red-600 hover:bg-red-700"
          >
            Logout
            <IoIosLogOut className="text-2xl font-bold" />
          </button>
        ) : (
          <>
            <Link to="/login">
              <button className="main-btn border-2 text-black border-gray-300 hover:bg-gray-100 ">
                Login
                <IoIosLogIn className="text-2xl font-bold" />
              </button>
            </Link>
            <Link to="/">
              <button className="main-btn text-white bg-blue-600 hover:bg-blue-700">
                SignUp
                <MdAccountCircle className="text-2xl font-bold" />
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
