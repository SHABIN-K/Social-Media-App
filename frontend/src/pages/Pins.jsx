import React, { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";

import { Navbar, Feed, PinDetail, CreatePin, Search } from "../components";
import { categories } from "../lib/categories";

const Pins = ({ user, userImg }) => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="px-2 md:px-5">
      <div className="bg-gray-50">
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          user={user && user}
          userImg={userImg}
        />
      </div>
      <div className="bg-black h-[1px] mb-3 w-full" />
      <div className="bg-gray-50 sm:hidden">
        <div className="flex overflow-x-auto hide-scrollbar">
          {categories.slice(0, categories.length - 1).map((category, index) => (
            <NavLink to={`/category/${category.name}`} key={index}>
              <div className="pl-3">
                <img
                  src={category.image}
                  className="w-10 h-10 rounded-full shadow-sm"
                />
                {category.name.slice(0,7)}
              </div>
            </NavLink>
          ))}
        </div>
      </div>

      <div className="h-full">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route
            path="/pin-detail/:pinId"
            element={<PinDetail user={user && user} />}
          />
          <Route
            path="/create-pin"
            element={<CreatePin user={user && user} />}
          />
          <Route
            path="/search"
            element={
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Pins;
