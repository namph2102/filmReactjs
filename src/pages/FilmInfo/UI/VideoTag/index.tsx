import { Box, Slider, Tooltip } from "@mui/material";
import Hls from "hls.js";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BiCrosshair, BiPause, BiPlay } from "react-icons/bi";
import {
  RiVolumeDownFill,
  RiVolumeMuteFill,
  RiVolumeUpFill,
} from "react-icons/ri";
import { Ifilm } from "../../../../Redux/FilmSlice";
import {
  handleCoverTime,
  handlePercent,
  handleFormat,
} from "../../../../untils";
import ToastMessage from "../../../../untils/ToastMessage";
import ChangeCurrentTime from "./ChangeCurrentTime";
import SettingSpeed from "./SettingSpeed";
import FullScreenVideo from "./FullScreenVideo";

const VideoTag: React.FC<{
  link?: string;
  film: Ifilm;
  onChangeEsopide: (crease: number) => void;
}> = ({
  link = "https://1080.hdphimonline.com/20230408/43196_575586e5/index.m3u8",
  film,
  onChangeEsopide,
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
        videoRef.current.addEventListener("ended", () => {
          onChangeEsopide(1);
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
    return () => {
      videoRef.current?.removeEventListener("ended", () => {
        onChangeEsopide(1);
      });
      videoRef.current?.removeEventListener("loadeddata", function () {
        setIsLoading(true);
        setVideoDuration(videoRef.current.duration);
      });
    };
  }, [link]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  function preventHorizontalKeyboardNavigation(event: any, value: any) {
    // set voulme
    videoRef.current.volume = value / 100;
    setVolume(value);

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

  const handleFormatProcess = () => {
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
  const handleChangeSound = (run: number) => {
    videoRef.current.playbackRate = run;
    ToastMessage("Chỉnh tốc độ thành công").success();
    setSpeed(run);
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
  const hamdleTimeUpdate = useCallback(() => {
    setVideoCurrent(videoRef.current.currentTime);
  }, []);
  return (
    <div className="responsive-iframe">
      <video
        className="cursor-pointer"
        onClick={handlePlayvideo}
        poster="https://movibes.online/avata/636939627ccac-thon-phe-tinh-khong-poster.jpg"
        id="ifame_video"
        ref={videoRef}
        onTimeUpdate={hamdleTimeUpdate}
      >
        {" "}
        <p>Video bị lỗi</p>
      </video>

      <div className="video_controler flex justify-between">
        <div className="controller_left gap-2 flex items-center">
          {/* button Stop or player */}
          <Tooltip arrow placement="top" title={!isPlay ? "Phát" : "Dừng"}>
            <button onClick={handlePlayvideo}>
              {!isPlay ? <BiPlay size="2.5rem" /> : <BiPause size="2.5rem" />}
            </button>
          </Tooltip>
          {/*button Rewind 10s  */}
          <ChangeCurrentTime
            left={true}
            ref={btn_pre10}
            handleChangeTime={pre10s}
          />

          {/*controls volume   */}

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
            {/* Processs Sounded */}
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
          {/*Show  Time current and durion */}
          <span className="ml-2 font-bold">
            {handleCoverTime(videoCurrent)} / {handleCoverTime(videoDuration)}
          </span>
        </div>
        <div className="controller_right flex items-center gap-3 pr-2">
          {/*button Rewind 10s  */}
          <ChangeCurrentTime
            left={true}
            ref={btn_pre10}
            handleChangeTime={pre10s}
          />
          {/*button next 10s*/}
          <ChangeCurrentTime
            left={false}
            ref={btn_next10}
            handleChangeTime={next10s}
          />
          {/* "Setting for speend video player" */}
          <SettingSpeed handleChangeSound={handleChangeSound} speed={speed} />
          <FullScreenVideo videoRef={videoRef} />
        </div>
        {/* Khung slider video */}
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
              className="absolute w-full px-2 sub_mouse-hover"
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
