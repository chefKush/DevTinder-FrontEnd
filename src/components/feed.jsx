import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/config";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import { useNavigate } from "react-router";
import Error from "./Error";

const Feed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const feed = useSelector((store) => store.feed);
  const [error, setError] = useState(null);

  useEffect(() => {
    getFeedData();
  }, []);

  const getFeedData = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      console.log(error);
      setError(error?.response?.data || "Failed to fetch feed data");
    }
  };

  if (error) {
    return <Error message={error} />;
  }

  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
