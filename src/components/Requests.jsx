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

  if (error) {
    return <Error message={error} />;
  }
  if (!requests) return;

  if (requests.length === 0) return <h1> No Connections Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections</h1>

      {requests.map((request) => {
        const { firstName, lastName, profilePicture, age, gender, about } =
          request.fromUserId;

        return (
          <div className=" flex m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto">
            <div>
              <img
                alt="photo"
                className="w-35 h-25 rounded-full"
                src={profilePicture}
              />
            </div>
            <div className="text-left mx-4 ">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <div>
              <button className="btn btn-primary my-2">Reject</button>
              <button className="btn btn-secondary my-2">Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
