import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import { useNavigate } from "react-router-dom";
import ToastMessage from "../../untils/ToastMessage";
import AccountAvata from "../../components/Header/AccountAvata";
import moment from "moment-timezone";
import SublistIcon from "../../components/BaseRealTime/Comment/ImageContainer";
const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.account.user);
  useEffect(() => {
    if (!user.username) {
      ToastMessage("Bạn không có quyền vào trang này").warning();
      navigate("/");
    } else {
      ToastMessage(
        `❤️Chào mừng bạn "${user.fullname || user.username}" ghé thăm!`
      ).normal();
    }
  }, [user.username]);
  const empty = "Chưa cập nhập ...";
  return (
    <section className="main_container w-full">
      <h5 className="title_special">Thông tin cá nhân</h5>
      <div className="profile_wrapper my-10">
        <span className="profile_avata inline-block">
          <AccountAvata width={70} user={user} />
        </span>
      </div>

      <div className="profile_info grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <div>
          <label
            htmlFor="id_person"
            className="block mb-2  text-primary font-bold text-base "
          >
            Mã tài khoản
          </label>
          <input
            type="text"
            id="id_person"
            name="id"
            placeholder={empty}
            className="font-medium py-2 px-2 w-full focus-within:bg-menu focus:border-none focus:outline-0 text-base bg-input rounded-md focus-within:text-text"
            value={"# " + user._id}
            readOnly
          />
        </div>
        <div>
          <label
            htmlFor="first_name"
            className="block mb-2  text-primary font-bold text-base "
          >
            Họ Và tên
          </label>
          <input
            placeholder={empty}
            type="text"
            id="first_name"
            name="fullname"
            className="font-medium py-2 px-2 w-full focus-within:bg-menu focus:border-none focus:outline-0 text-base bg-input rounded-md focus-within:text-text"
            value={user.fullname}
            required
          />
        </div>
        <div>
          <label className="block mb-2  text-primary font-bold text-base ">
            Chiến tích
          </label>
          <div className="font-medium py-2 px-2 w-full focus-within:bg-menu focus:border-none focus:outline-0 text-base bg-input rounded-md focus-within:text-text">
            <SublistIcon listIcons={user.icons} />
          </div>
        </div>
        <div>
          <label
            htmlFor="last_name"
            className="block mb-2  text-primary font-bold text-base "
          >
            Số Điện Thoại
          </label>
          <input
            placeholder={empty}
            type="text"
            id="last_name"
            className="font-medium py-2 px-2 w-full focus-within:bg-menu focus:border-none focus:outline-0 text-base bg-input rounded-md focus-within:text-text"
            required
            value={user.phone || ""}
          />
        </div>
        <div>
          <label
            htmlFor="company"
            className="block mb-2  text-primary font-bold text-base "
          >
            Chức Vụ
          </label>
          <input
            type="text"
            id="company"
            className="font-medium py-2 px-2 w-full focus-within:bg-menu focus:border-none focus:outline-0 text-base bg-input rounded-md focus-within:text-text"
            value={
              user.permission == "member"
                ? "Thành viên"
                : user.permission == "vip"
                ? "Hội Viên Vip"
                : "Người quản trị website"
            }
            required
          />
        </div>

        <div>
          <label
            htmlFor="datetime"
            className="block mb-2  text-primary font-bold text-base "
          >
            Ngày tham gia
          </label>
          <input
            type="text"
            id="datetime"
            className="font-medium py-2 px-2 w-full focus-within:bg-menu focus:border-none focus:outline-0 text-base bg-input rounded-md focus-within:text-text"
            value={moment(user.updated_at).format("HH:mm:ss - DD/MM/YYYY")}
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block mb-2  text-primary font-bold text-base "
          >
            Tiểu sử
          </label>
          <textarea
            className="font-medium py-2 px-2 w-full focus-within:bg-menu focus:border-none focus:outline-0 text-base bg-input rounded-md focus-within:text-text"
            name=""
            id=""
            rows={4}
            placeholder="Mô tả bản thân ..."
            value={user.description}
          ></textarea>
        </div>
      </div>
    </section>
  );
};

export default Profile;
