"use client";
import { useEffect, useRef, useState } from "react";
import interceptor from "../../utils/axiosInterceptor";
import toast, { Toaster } from "react-hot-toast";

export default function ProfileUpdate({ userId, onUpdate }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const fnameRef = useRef(null);
  const lnameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const zipCodeRef = useRef(null);
  const countryRef = useRef(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await interceptor.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/users/settings`
        );
        setUserData(response.data.data[0]);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUserData();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      fname: fnameRef.current.value,
      lname: lnameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      address: addressRef.current.value,
      city: cityRef.current.value,
      state: stateRef.current.value,
      zipCode: zipCodeRef.current.value,
      country: countryRef.current.value,
    };

    try {
      const response = await interceptor.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/settings`,
        data
      );
      console.log("Profile updated:", response.data);
      toast.success("Profile updated successfully!");
      // onUpdate();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  // if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-xl mx-auto p-5 bg-white shadow-lg rounded-xl">
      <div>
        <Toaster />
      </div>
      <h2 className="text-2xl font-semibold text-center mb-4">
        Update Profile
      </h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          ref={fnameRef}
          defaultValue={userData?.fname}
          type="text"
          name="fname"
          placeholder="First Name"
          className="input input-bordered border-2 border-gray-300 rounded-lg w-full p-2"
        />
        <input
          ref={lnameRef}
          defaultValue={userData?.lname}
          type="text"
          name="lname"
          placeholder="Last Name"
          className="input input-bordered border-2 border-gray-300 rounded-lg w-full p-2"
        />
        <input
          ref={emailRef}
          defaultValue={userData?.email}
          type="email"
          name="email"
          placeholder="Email"
          className="input input-bordered border-2 border-gray-300 rounded-lg w-full p-2"
        />
        <input
          ref={phoneRef}
          defaultValue={userData?.phone}
          type="tel"
          name="phone"
          placeholder="Phone"
          className="input input-bordered border-2 border-gray-300 rounded-lg w-full p-2"
        />
        <input
          ref={addressRef}
          defaultValue={userData?.address}
          type="text"
          name="address"
          placeholder="Address"
          className="input input-bordered border-2 border-gray-300 rounded-lg w-full p-2"
        />
        <input
          ref={cityRef}
          defaultValue={userData?.city}
          type="text"
          name="city"
          placeholder="City"
          className="input input-bordered border-2 border-gray-300 rounded-lg w-full p-2"
        />
        <input
          ref={stateRef}
          defaultValue={userData?.state}
          type="text"
          name="state"
          placeholder="State"
          className="input input-bordered border-2 border-gray-300 rounded-lg w-full p-2"
        />
        <input
          ref={zipCodeRef}
          defaultValue={userData?.zipCode}
          type="text"
          name="zipCode"
          placeholder="Zip Code"
          className="input input-bordered border-2 border-gray-300 rounded-lg w-full p-2"
        />
        <input
          ref={countryRef}
          defaultValue={userData?.country}
          type="text"
          name="country"
          placeholder="Country"
          className="input input-bordered border-2 border-gray-300 rounded-lg w-full p-2"
        />
        <button
          type="submit"
          className="btn btn-primary w-full bg-gray-800 text-white p-2 rounded-lg hover:bg-gray-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
