import React, { useEffect, useRef, useState, useCallback } from "react";
import Hls from "hls.js";
import {
  BiCog,
  BiCrosshair,
  BiPause,
  BiPlay,
  BiRotateLeft,
  BiRotateRight,
  BiTimer,
  BiXCircle,
} from "react-icons/bi";
import { Ifilm } from "../../../Redux/FilmSlice";
import ToastMessage from "../../../untils/ToastMessage";
import {
  RiFullscreenFill,
  RiVolumeDownFill,
  RiVolumeMuteFill,
  RiVolumeUpFill,
} from "react-icons/ri";
import { Box, Slider, Tooltip } from "@mui/material";
import { handleCoverTime, handlePercent } from "../../../untils";
const listSpeend = [0.25, 0.5, 1, 1.25, 1.5, 2];
const VideoTag: React.FC<{ link?: string; film: Ifilm }> = ({
  link = "https://1080.hdphimonline.com/20230408/43196_575586e5/index.m3u8",
  film,
}) => {
  const [volume, setVolume] = useState<number>(100);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [videoCurrent, setVideoCurrent] = useState<number>(0);
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const [percentMouseMove, setPercentMouseMove] = useState<number>(0);
  const btn_next10 = useRef<HTMLButtonElement | any>(null);
  const btn_pre10 = useRef<HTMLButtonElement | any>(null);
  const videoRef = useRef<HTMLVideoElement | any>(null);
  const processRef = useRef<any>(null);
  useEffect(() => {
    try {
      if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(link);
        hls.attachMedia(videoRef.current);
        videoRef.current.addEventListener("loadeddata", function () {
          setIsLoading(true);
          setVideoDuration(videoRef.current.duration);
        });
      } else if (
        videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        videoRef.current.src = link;
        ToastMessage("Sever lỗi rồi bạn chuyển sever khác nhen !").info();
      }
    } catch {
      ToastMessage("Sever lỗi rồi bạn chuyển sever khác nhen !").info();
    }
    setIsPlay(false);
  }, [link]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  function preventHorizontalKeyboardNavigation(event: any, value: any) {
    // set voulme
    videoRef.current.volume = value / 100;
    setVolume(value);
    console.log(videoRef.current.volume);
    console.log(value);
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
    }
  }
  const handlePlayvideo = () => {
    if (!isPlay) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
    setIsPlay(!isPlay);
  };
  const handleFormat = (x: any) => {
    return x + "%";
  };
  const handleFormatProcess = (event: any, value: any) => {
    return handleCoverTime(videoCurrent);
  };
  const handleChaneVideo = (e: any) => {
    if (videoDuration) {
      videoRef.current.currentTime = videoDuration * (e.target.value / 100);
    }
  };
  const next10s = () => {
    if (videoDuration - videoCurrent > 10) {
      videoRef.current.currentTime = videoCurrent + 10;
    }
  };
  const pre10s = () => {
    if (videoCurrent > 10) {
      videoRef.current.currentTime = videoCurrent - 10;
    }
  };
  useEffect(() => {
    // mouse move render percent
    const handleMouseMover = (e: any) => {
      const widthElement = videoRef.current.getBoundingClientRect().width;
      setPercentMouseMove((e.layerX / widthElement) * 100);
    };

    processRef.current.addEventListener("mousemove", handleMouseMover);
    return () => {
      processRef.current?.removeEventListener("mousemove", handleMouseMover);
    };
  }, []);
  useEffect(() => {
    const handleKeypress = (e: any) => {
      console.log(e.code);
      switch (e.code) {
        case "Space":
          handlePlayvideo();
          e.preventDefault();
          break;
        case "ArrowRight":
          btn_next10.current.click();

          break;
        case "ArrowLeft":
          btn_pre10.current.click();
          break;
      }
    };
    document.addEventListener("keydown", handleKeypress);
    return () => {
      document.removeEventListener("keydown", handleKeypress);
    };
  }, []);
  function openFullscreen() {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.webkitRequestFullscreen) {
      /* Safari */
      videoRef.current.webkitRequestFullscreen();
    } else if (videoRef.current.msRequestFullscreen) {
      /* IE11 */
      videoRef.current.msRequestFullscreen();
    }
  }
  return (
    <div className="responsive-iframe">
      <video
        className="cursor-pointer"
        onClick={handlePlayvideo}
        poster="https://movibes.online/avata/636939627ccac-thon-phe-tinh-khong-poster.jpg"
        id="ifame_video"
        ref={videoRef}
        onTimeUpdate={() => {
          setVideoCurrent(videoRef.current.currentTime);
        }}
      >
        {" "}
        <p>Video bị lỗi</p>
      </video>
      <div className="video_controler flex justify-between">
        <div className="controller_left gap-2 flex items-center">
          <Tooltip arrow placement="top" title={!isPlay ? "Phát" : "Dừng"}>
            <button onClick={handlePlayvideo}>
              {!isPlay ? <BiPlay size="2.5rem" /> : <BiPause size="2.5rem" />}
            </button>
          </Tooltip>
          <Tooltip title="Tua lại 10s" placement="top" arrow>
            <button ref={btn_pre10} onClick={pre10s} className="relative mr-1">
              <BiRotateLeft size="1.875rem" />
              <span className="content_center-absolute">10s</span>
            </button>
          </Tooltip>
          <div className="relative flex items-center btn_volute">
            <button>
              {volume > 50 ? (
                <RiVolumeUpFill size="1.5rem" />
              ) : volume <= 0 ? (
                <RiVolumeMuteFill size="1.5rem" />
              ) : (
                <RiVolumeDownFill size="1.5rem" />
              )}
            </button>
            <span className="absolute z-50 left-0 volute_container">
              <Box sx={{ height: 100 }}>
                <Slider
                  sx={{
                    '& input[type="range"]': {
                      WebkitAppearance: "slider-vertical",
                    },
                  }}
                  orientation="vertical"
                  defaultValue={30}
                  aria-label="Temperature"
                  valueLabelDisplay="auto"
                  valueLabelFormat={handleFormat}
                  onChangeCommitted={preventHorizontalKeyboardNavigation}
                  size="small"
                />
              </Box>
            </span>
          </div>
          <span className="ml-2 font-bold">
            {handleCoverTime(videoCurrent)} / {handleCoverTime(videoDuration)}
          </span>
        </div>
        <div className="controller_right flex items-center gap-3 pr-2">
          <Tooltip title="Tua lại 10s" placement="top" arrow>
            <button ref={btn_pre10} onClick={pre10s} className="relative">
              <BiRotateLeft size="1.875rem" />
              <span className="content_center-absolute">10s</span>
            </button>
          </Tooltip>
          <Tooltip title="Tua Tới 10s" placement="top" arrow>
            <button onClick={next10s} ref={btn_next10} className="relative">
              <BiRotateRight size="1.875rem" />
              <span className="content_center-absolute">10s</span>
            </button>
          </Tooltip>
          <div
            className="relative video_speed-container z-50
           flex items-center"
          >
            <Tooltip title="Cài đặt" arrow placement="top">
              <button>
                <BiCog size="1.5rem" />
              </button>
            </Tooltip>
            <div className="box_settings__overlay text-white w-28  right-0 bottom-4 absolute">
              <span className="flex items-center justify-between px-2 py-1  bg-black">
                <BiTimer size="2rem" />
                <BiXCircle size="1.75rem" />
              </span>
              <ul className="text-base list-disc flex flex-col ml-6">
                {listSpeend.map((run, index) => (
                  <li
                    onClick={() => {
                      videoRef.current.playbackRate = run;
                      ToastMessage("Chỉnh tốc độ thành công").success();
                      setSpeed(run);
                    }}
                    className={speed == run ? "active" : ""}
                    key={index}
                  >
                    {run}X
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Tooltip title="Zoom" arrow placement="top">
            <button onClick={openFullscreen}>
              <RiFullscreenFill size="1.5rem" />
            </button>
          </Tooltip>
        </div>
        <div className="absolute process_container left-0 -top-4 w-full">
          <div className="w-full h-1 bg-slate-400 process_main-show absolute top-3">
            <div
              style={{ width: handlePercent(videoCurrent, videoDuration) }}
              className="bg-yellow-300 h-full rounded-md"
            ></div>
          </div>
          <div ref={processRef} className="process_sub-hidden relative">
            <span
              style={{ left: `calc(${percentMouseMove + "%"} - 25px)` }}
              className="absolute w-full sub_mouse-hover"
            >
              {handleCoverTime((percentMouseMove / 100) * videoDuration)}
            </span>
            {videoDuration > 0 && (
              <Slider
                size="medium"
                value={(videoCurrent / videoDuration) * 100}
                defaultValue={0}
                color="primary"
                aria-label="Small"
                valueLabelDisplay="auto"
                valueLabelFormat={handleFormatProcess}
                onChange={handleChaneVideo}
                sx={{
                  "&.MuiSlider-root": {
                    color: "#eaebf2",
                  },
                }}
              />
            )}
          </div>
        </div>
      </div>
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

export default VideoTag;
