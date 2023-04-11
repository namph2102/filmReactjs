import React, { useState, useEffect } from "react";
import { BiCrosshair } from "react-icons/bi";

const VideoIfame: React.FC<{
  link?: string;
}> = ({
  link = "https://1080.hdphimonline.com/share/cbbda0778454f639ae7182a4ec209142",
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    return () => {
      setIsLoading(true);
    };
  }, [link]);
  const handleLoadded = () => {
    setIsLoading(false);
  };
  return (
    <div className="responsive-iframe ">
      <iframe
        loading="lazy"
        id="ifame_video"
        allowFullScreen
        src={link}
        onLoad={handleLoadded}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
      {isLoading && (
        <div className="w-full h-full flex justify-center items-center absolute top-0">
          <div className="m-auto flex flex-col justify-center items-center">
            <span className=" block text-primary">
              Đang chờ phản hồi player
            </span>
            <BiCrosshair color="#3fff" size="3rem" className="animate-spin" />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoIfame;
