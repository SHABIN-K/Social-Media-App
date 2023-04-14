import React from "react";
import Masonry from "react-masonry-css";

import Pin from "./pin";

const breakPointColumnsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const MasonryLayout = ({ pins }) => {
  console.log(pins);
  return (
    <Masonry
      className="flex animate-slide-fwd"
      breakpointCols={breakPointColumnsObj}
    >
      {pins?.map((pin, index) => (
        <Pin key={index} pin={pin} className="w-max" />
      ))}
    </Masonry>
  );
};

export default MasonryLayout;
