import React, { useEffect } from "react";
import NavBar from "./navBar";
import { Outlet, useNavigate } from "react-router";
import Footer from "./footer";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const userData = useSelector((store) => store.user);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    // if (userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
      console.log(error);
    }
  };
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
