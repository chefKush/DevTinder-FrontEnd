import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/config";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [profilePicture, setProfilePicture] = useState(user.profilePicture);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          profilePicture,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      if (res.status) {
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      }
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
    }
  };

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title">Edit Profile</h2>
              <fieldset className="fieldset">
                <label className="fieldset-legend">First Name</label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  className="input"
                />
              </fieldset>
              <fieldset className="fieldset">
                <label className="fieldset-legend">Last Name</label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  className="input"
                />
              </fieldset>
              <fieldset className="fieldset">
                <label className="fieldset-legend">Age</label>
                <input
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  type="text"
                  className="input"
                />
              </fieldset>
              <fieldset className="fieldset">
                <label className="fieldset-legend">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="select"
                  defaultValue="Select Gender"
                >
                  <option disabled={true}>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </fieldset>
              <fieldset className="fieldset">
                <label className="fieldset-legend">About</label>
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="input"
                />
              </fieldset>
              <fieldset className="fieldset">
                <label className="fieldset-legend">Profile Picture URL</label>
                <input
                  value={profilePicture}
                  onChange={(e) => setProfilePicture(e.target.value)}
                  type="text"
                  className="input"
                />
              </fieldset>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center">
                <button className="btn btn-primary my-1" onClick={handleSubmit}>
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, age, gender, about, profilePicture }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
