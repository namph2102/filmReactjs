import { Avatar, Tooltip } from "@mui/material";
import { BiBookmark } from "react-icons/bi";
import { useSelector } from "react-redux";
import { defaultIconSize } from "../../contants";
import { RootState } from "../../Redux/Store";
import BookMark from "../BookMark";
import Profile from "../ProfileMenu";

const RenderProfile = (): JSX.Element => {
  const user = useSelector((state: RootState) => state.account.user);

  return (
    <>
      <Profile>
        {user.username ? (
          <Tooltip title="Hồ sơ của bạn" arrow>
            <Avatar
              alt={user.fullname}
              src={user.avata}
              style={{
                width: "40px",
                height: "40px",
                cursor: "pointer",
              }}
            />
          </Tooltip>
        ) : (
          <Tooltip title="Đăng ký ngay" arrow>
            <Avatar
              src="/images/user.png"
              style={{
                width: "40px",
                height: "40px",
                cursor: "pointer",
              }}
            />
          </Tooltip>
        )}
      </Profile>
    </>
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
