import React, { useEffect, useState, useRef } from "react";

const VideoIfame: React.FC<{
  link?: string;
}> = ({
  link = "https://1080.hdphimonline.com/share/cbbda0778454f639ae7182a4ec209142",
}) => {
  return (
    <div className="responsive-iframe ">
      <iframe
        loading="lazy"
        id="ifame_video"
        allowFullScreen
        src={link}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </div>
  );
};

export default VideoIfame;
