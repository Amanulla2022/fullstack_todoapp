import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "./../utils/baseUrl";
import { IoIosLogOut } from "react-icons/io";
import { setIsLoggedIn } from "../redux/authSlice";
import { toast } from "react-toastify";

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
        navigate("/");
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
        To<span className="text-blue-600">Do</span>
      </h1>

      <div className="flex gap-4">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="flex gap-2 justify-center items-center py-2 px-4 text-white bg-red-600 rounded-xl hover:underline"
          >
            Logout
            <IoIosLogOut className="text-2xl font-bold" />
          </button>
        ) : (
          <>
            <Link to="/login">
              <button className="py-2 px-4 bg-white border-2 border-gray-200 rounded-xl hover:underline">
                Login
              </button>
            </Link>
            <Link to="/">
              <button className="py-2 px-4 bg-blue-600 text-white rounded-xl hover:underline">
                SignUp
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
