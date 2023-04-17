import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
//from local files
import { categories } from "../lib/categories";
import { client } from "../lib/client";
import Spinner from "./Spinner";

const CreatePin = ({ user, userImg }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState();
  const [fields, setFields] = useState();
  const [category, setCategory] = useState();
  const [imageAsset, setImageAsset] = useState();
  const [wrongImageType, setWrongImageType] = useState(false);

  const uploadImage = (e) => {
    const { type, name } = e.target.files[0];
    const selectedFile =
      type == "image/png" ||
      type === "image/svg" ||
      type === "image/jpeg" ||
      type === "image/gif" ||
      type === "image/tiff";

    //uploading asset to sanity
    if (selectedFile) {
      setWrongImageType(false);
      setLoading(true);

      client.assets
        .upload("image", e.target.files[0], {
          contentType: type,
          filename: name,
        })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log(`error :`, error);
        });
    } else {
      setWrongImageType(true);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {fields && (
        <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in">
          Please add all fields.
        </p>
      )}
      <div className="flex lg:flex-row  flex-col justify-center item-center bg-white lg:p-5 p-3 lg:w-4/5 w-full">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
            {loading && <Spinner />}
            {wrongImageType && <p>wrong file type.Try again</p>}
            {!imageAsset ? (
              <label>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">click to Upload</p>
                    <p className="mt-32 text-gray-400">
                      Recommendation: Use high-quality JPG, JPEG, SVG, PNG, GIF
                      or TIFF less than 20MB
                    </p>
                  </div>
                  <input
                    type="file"
                    name="upload-image"
                    onChange={uploadImage}
                    className="w-0 h-0"
                  />
                </div>
              </label>
            ) : (
              <div className="relative h-full">
                <img
                  src={imageAsset?.url}
                  alt="uploaded-pic"
                  className="h-full w-full"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                  onClick={() => setImageAsset(null)}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Add your title"
          className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"/>
          {user && (
            <div className="flex gap-2 mt-2 mb-2 items-center bg-white rounded-lg">
              <img src={userImg} alt="user-profile" className="w-10 h-10 rounded-full"/>
              <p className="font-bold">{user?.userName}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
