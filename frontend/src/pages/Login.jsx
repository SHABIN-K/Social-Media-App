import React, { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

import { shareVideo, logo } from "../assets";
import { client, urlFor } from "../lib/client";

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState([]);

  const responseGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => setUser(tokenResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user.access_token) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data));
          const { id, picture, name } = res.data;
          const doc = {
            _id: id,
            _type: "user",
            userName: name,
            image: urlFor(picture),
          };

          client.createIfNotExists(doc).then(() => {
            navigate("/", { replace: true });
            //console.log("succesfully send data");
          });
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const GoogleLoginButton = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        type="button"
        className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
      >
        <FcGoogle className="mr-4" /> Sign in with google
      </button>
    );
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          muted
          autoPlay
          controls={false}
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} alt="share me logo" width="130px" />
          </div>
          <div className="shadow-2xl">
            <GoogleLoginButton onClick={() => responseGoogle()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
