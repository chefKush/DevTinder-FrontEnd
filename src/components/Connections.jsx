import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/config";
import { addConnection } from "../utils/connectionSlice";
import Error from "./Error";
import { Link } from "react-router";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
    } catch (error) {
      setError(error?.response?.data || "Failed to fetch Request data");
    }
  };

  if (error) {
    return <Error message={error} />;
  }

  if (!connections) return;

  if (connections.length === 0)
    return <h1 className="flex justify-center my-10"> No Connections Found</h1>;

  return (
    <div className="text-center my-10 px-4 md:px-8 lg:px-16">
      <h1 className="font-bold text-white text-3xl mb-6">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, profilePicture, age, gender, about } =
          connection;

        return (
          <div
            key={_id}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 m-4 p-4 rounded-lg bg-base-300 sm:w-4/5 lg:w-3/5 mx-auto shadow-md"
          >
            <div className="flex-shrink-0">
              <img
                alt="photo"
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover"
                src={profilePicture}
              />
            </div>

            <div className="text-left flex-1">
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

            <div className="mt-3 sm:mt-0 sm:ml-4">
              <Link to={`/chat/${_id}`}>
                <button className="btn btn-info w-full sm:w-auto">Chat</button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Connections;
