import { Tooltip } from "@mui/material";
import React, { useCallback, memo } from "react";
import { RiFullscreenFill } from "react-icons/ri";

const FullScreenVideo = ({
  videoRef,
}: {
  videoRef: HTMLVideoElement | any;
}) => {
  const openFullscreen = useCallback(() => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.webkitRequestFullscreen) {
      /* Safari */
      videoRef.current.webkitRequestFullscreen();
    } else if (videoRef.current.msRequestFullscreen) {
      /* IE11 */
      videoRef.current.msRequestFullscreen();
    }
  }, []);
  return (
    <Tooltip title="Zoom" arrow placement="top">
      <button onClick={openFullscreen}>
        <RiFullscreenFill size="1.5rem" />
      </button>
    </Tooltip>
  );
};

export default memo(FullScreenVideo);
