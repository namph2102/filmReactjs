import Profile from "../ProfileMenu";
import { Tooltip, Avatar } from "@mui/material";
import { BiBookmark } from "react-icons/bi";
import { defaultIconSize } from "../../contants";
import BookMark from "../BookMark";
const RenderProfile = (): JSX.Element => {
  return (
    <Profile>
      <Tooltip title="Hồ sơ của bạn" arrow>
        <Avatar
          alt="Remy Sharp"
          src="/images/avata.jpg"
          style={{
            width: "40px",
            height: "40px",
            cursor: "pointer",
          }}
        />
      </Tooltip>
    </Profile>
  );
};
const RenderDesktopProfile: React.FC<{
  isOppenBookmark: boolean;
  onhandleBookMark: () => void;
}> = ({ isOppenBookmark, onhandleBookMark }): JSX.Element => {
  return (
    <>
      <Tooltip onClick={onhandleBookMark} title="Phim yêu thích của bạn" arrow>
        <div className="popper-container bg-bookmark mr-4">
          <BiBookmark fontSize={defaultIconSize} />
          <p className="mx-2">Phim yêu thích</p>
          <span className="total-bookmark">1</span>
        </div>
      </Tooltip>
      <RenderProfile />
      {isOppenBookmark && <BookMark />}
    </>
  );
};
export { RenderProfile, RenderDesktopProfile };
