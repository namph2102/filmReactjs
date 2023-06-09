import { Avatar, Tooltip } from "@mui/material";
import { BiBookmark } from "react-icons/bi";
import { useSelector } from "react-redux";
import { defaultIconSize } from "../../contants";
import { RootState } from "../../Redux/Store";
import BookMark from "../BookMark";
import Profile from "../ProfileMenu";
import { componentsProps, componentsPropsCommemt } from "../../untils";
import AccountAvata from "./AccountAvata";

const RenderProfile = (): JSX.Element => {
  const user = useSelector((state: RootState) => state.account.user);
  return (
    <>
      <Profile>
        {user.username ? (
          <AccountAvata user={user} message="Hồ sơ của bạn" />
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
  bookmarklength: number;
  listBookmarks: any;
}> = ({
  isOppenBookmark,
  onhandleBookMark,
  bookmarklength,
  listBookmarks,
}): JSX.Element => {
  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation(), onhandleBookMark();
        }}
        className="popper-container bg-bookmark mr-4"
      >
        <BiBookmark fontSize={defaultIconSize} />
        <p className="mx-2">Phim yêu thích</p>
        <span className="total-bookmark">{bookmarklength}</span>
      </div>
      <RenderProfile />

      <BookMark
        isOppenBookmark={isOppenBookmark}
        listBookmarks={listBookmarks}
      />
    </>
  );
};
export { RenderProfile, RenderDesktopProfile };
