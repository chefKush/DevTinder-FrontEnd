import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/config";
import { addRequest } from "../utils/requestSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import Error from "./Error";

const Requests = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const requests = useSelector((store) => store.requests);

  useEffect(() => {
    fetchRequest();
  }, []);

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.data));
    } catch (error) {
      console.log(error.response);
      setError(error?.response?.data || "Failed to fetch Request data");
    }
  };

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      fetchRequest();
    } catch (error) {
      console.log(error);
    }
  };

  if (error) {
    return <Error message={error} />;
  }
  if (!requests) return;

  if (requests.length === 0)
    return (
      <h1 className="text-white flex justify-center my-10">
        No Connection Requests Found
      </h1>
    );

  return (
    <div className="text-center my-10 px-4 md:px-8 lg:px-16">
      <h1 className="font-bold text-white text-3xl mb-6">
        Connection Requests
      </h1>

      {requests.map((request) => {
        const { firstName, lastName, profilePicture, age, gender, about } =
          request.fromUserId;

        return (
          <div
            key={request._id}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 m-4 p-4 rounded-lg bg-base-300 sm:w-4/5 lg:w-3/5 mx-auto shadow-md"
          >
            <div className="flex-shrink-0">
              <img
                alt="photo"
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover"
                src={profilePicture}
              />
            </div>

            <div className="text-left flex-1 mt-2 sm:mt-0">
              <h2 className="font-bold text-xl sm:text-2xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && (
                <p className="text-sm sm:text-base mt-1">
                  {age + ", " + gender}
                </p>
              )}
              <p className="mt-2 text-sm sm:text-base">{about}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-0 sm:ml-4">
              <button
                className="btn btn-primary w-full sm:w-auto"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary w-full sm:w-auto"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
