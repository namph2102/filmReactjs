import { Avatar, Tooltip } from "@mui/material";
import { BiBookmark } from "react-icons/bi";
import { useSelector } from "react-redux";
import { defaultIconSize } from "../../contants";
import { RootState } from "../../Redux/Store";
import BookMark from "../BookMark";
import Profile from "../ProfileMenu";
import { componentsProps, componentsPropsCommemt } from "../../untils";

const RenderProfile = (): JSX.Element => {
  const user = useSelector((state: RootState) => state.account.user);

  return (
    <>
      <Profile>
        {user.username ? (
          <div
            className={`relative rounded-full ${
              user.permission == "vip" && "border-2 border-yellow-600"
            } ${user.permission == "admin" && "border-2 border-blue-600"}`}
          >
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
            {user.permission !== "member" && (
              <div className="absolute top-0 -right-2 ">
                <Tooltip
                  componentsProps={
                    user.permission == "vip"
                      ? componentsPropsCommemt
                      : componentsProps
                  }
                  title={
                    user.permission.toUpperCase() +
                    ` ${user.vip ? user.vip : ""}`
                  }
                  arrow
                  placement="top"
                >
                  <img
                    src={
                      user.permission == "admin"
                        ? "/images/admin.png"
                        : `/images/vip/vip${user.vip}.png`
                    }
                    width="20"
                    height="20"
                    alt=""
                  />
                </Tooltip>
              </div>
            )}
          </div>
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
      <Tooltip
        onClick={(e) => {
          e.stopPropagation(), onhandleBookMark();
        }}
        title="Phim yêu thích của bạn"
        arrow
        placement="left"
      >
        <div className="popper-container bg-bookmark mr-4">
          <BiBookmark fontSize={defaultIconSize} />
          <p className="mx-2">Phim yêu thích</p>
          <span className="total-bookmark">{bookmarklength}</span>
        </div>
      </Tooltip>
      <RenderProfile />

      <BookMark
        isOppenBookmark={isOppenBookmark}
        listBookmarks={listBookmarks}
      />
    </>
  );
};
export { RenderProfile, RenderDesktopProfile };
