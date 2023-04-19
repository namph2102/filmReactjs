import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../Redux/Store";
import IconCoin from "../../assets/coin.png";
import IconLevel from "../../assets/iconlevel.png";
import IconVip from "../../assets/iconvip.png";
import SublistIcon from "../../components/BaseRealTime/Comment/ImageContainer";
import AccountAvata from "../../components/Header/AccountAvata";
import ToastMessage from "../../untils/ToastMessage";

import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IUser, updateProfileUser } from "../../Redux/UserSlice";
import RotateLoadding from "../../components/Loadding/RotateLoadding";
import PathLink from "../../contants";
import ProcessItem from "./ProcessItem";
import "./profile.scss";

import UploadAvata from "./UploadAvata";
type TUserProfile = IUser & { nextExpLevel: number; nextExpVip: number };
const Profile = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState<
    TUserProfile & { nameLevel: { name: string } }
  >();
  const dispatch: AppDispatch = useDispatch();
  const { hash } = useLocation();
  const user = useSelector((state: RootState) => state.account.user);
  const isBlockChange: boolean = user._id == account?._id ? false : true;
  const formik: any = useFormik({
    initialValues: {
      fullname: user.fullname,
      phone: (user.phone && `0${user.phone}`) || "",
      description: user.description,
    },
    validationSchema: Yup.object().shape({
      fullname: Yup.string().max(60, "Trường Họ và tên không quá 60 ký tự"),
      phone: Yup.string()
        .max(11, "Số điện thoại không vượt quá 11 số")
        .min(10, "Số điện thoại ít nhất 10 số"),
      description: Yup.string().max(300, "Mô tả bản thân không quá 300 ký tự"),
    }),
    onSubmit: (value) => {
      let { phone, fullname, description } = value;
      if (account) {
        phone = phone || account.phone + "";
        fullname = fullname || account.fullname;
        description = description || account.description;
      }

      const data = {
        _id: user._id,
        phone,
        fullname,
        description,
        username: user.username,
      };

      if (
        user.fullname != fullname ||
        "0" + user.phone != phone ||
        user.description != description
      ) {
        dispatch(updateProfileUser(data));
        ToastMessage("Thay đổi thành công hồ sơ của bạn").success();
      } else {
        ToastMessage("Bạn chưa cập nhập điều gì !").info();
      }
    },
  });

  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: 100,
    });
    let id = hash ? hash.replace("#", "") : user._id;
    try {
      if (!id) throw new Error("hash not found");
      axios
        .post(PathLink.domain + "user/information", {
          data: {
            idUser: id,
          },
        })
        .then((response) => {
          if (response.status == 200) {
            const { account, nextExpLevel, nextExpVip } = response.data;
            setAccount({ ...account, nextExpLevel, nextExpVip });
          }
        });
    } catch {
      console.log("Éo có gì luôn");
      if (!account?._id && !user._id) {
        ToastMessage("Bạn không có quyền truy cập vào trang hồ sơ!").warning();
        navigate("/");
      }
    }
  }, [user, hash]);
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    if (formik.errors[e.target.name]) {
      ToastMessage(formik.errors[e.target.name]).error();
    }
  };

  const empty = "Chưa cập nhập ...";

  return (
    <section className="main_container w-full profile_container">
      <h5 className="title_special">
        {account?._id != user._id
          ? `Chế độ xem tài khoản`
          : "Thông tin cá nhân"}
      </h5>
      {account?._id ? (
        <form onSubmit={formik.handleSubmit}>
          <div className="profile flex  items-center h-28 mt-10  sm:gap-4  gap-1 justify-center">
            <div className="profile_wrapper my-10">
              <span className="profile_avata inline-block">
                <AccountAvata width={70} user={account} />
              </span>
            </div>
            <div className="profile_exp cursor-pointer">
              {/* exp level */}
              <ProcessItem
                name="lv"
                nameSub={`Cảnh giới: ${account.nameLevel.name}`}
                icon={IconLevel}
                valueStart={account.expLv}
                valueEnd={account.nextExpLevel}
              />
              {/*end  exp level */}

              {/* exp Vip */}
              <ProcessItem
                name="vip"
                icon={IconVip}
                nameSub={`${
                  account.vip ? `Hội viên Vip ${account.vip}` : "Chưa nạp "
                }`}
                valueStart={account.expVip}
                valueEnd={account.nextExpVip}
              />

              {/*end exp Vip */}
            </div>
          </div>
          <div className="flex justify-center flex-col">
            <div className="flex  items-center justify-center mt-2  mb-3">
              <img
                src={IconCoin}
                width={30}
                height={30}
                className="mr-2"
                alt=""
              />
              <span className="font-bold text-base text-primary">
                {account.coin.toLocaleString("en-vi")}
              </span>
            </div>
            {account._id == user._id && (
              <div className="flex-1 justify-center text-text flex gap-2 mb-3">
                <UploadAvata username={user.username} userID={user._id} />
              </div>
            )}
          </div>
          <div className="profile_info grid md:grid-cols-2 grid-cols-1  gap-4 ">
            <div className={`${user.permission == "admin" ? "" : "hidden"}`}>
              <label
                htmlFor="iduser"
                className="block mb-2  text-primary font-bold text-base "
              >
                Mã tài khoản
              </label>
              <input
                placeholder={empty}
                type="text"
                id="iduser"
                name="iduser"
                className="text-blue-400 font-medium py-2 px-2 w-full focus-within:bg-menu focus:border-none focus:outline-0 text-base bg-input rounded-md focus-within:text-text"
                defaultValue={account._id}
                readOnly
              />
            </div>

            <div className={`${user.permission == "admin" ? "" : "hidden"}`}>
              <label
                htmlFor="block"
                className="block mb-2  text-primary font-bold text-base "
              >
                Trang thái
              </label>
              <input
                placeholder={empty}
                type="text"
                id="block"
                name="block"
                className="text-blue-400 font-medium py-2 px-2 w-full focus-within:bg-menu focus:border-none focus:outline-0 text-base bg-input rounded-md focus-within:text-text"
                defaultValue={
                  !account.blocked
                    ? "Chưa bị khóa tài khoản"
                    : "Đã bị khóa tài khoản"
                }
                readOnly
              />
            </div>

            <div>
              <label
                htmlFor="first_name"
                className="block mb-2  text-primary font-bold text-base "
              >
                Họ và tên
              </label>
              <input
                placeholder={empty}
                type="text"
                id="first_name"
                name="fullname"
                className="font-medium py-2 px-2 w-full focus-within:bg-menu focus:border-none focus:outline-0 text-base bg-input rounded-md focus-within:text-text"
                value={
                  account._id == user._id
                    ? formik.values.fullname
                    : account.fullname
                }
                onChange={formik.handleChange}
                onBlur={handleBlur}
                readOnly={isBlockChange}
              />
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
                value={
                  account._id == user._id
                    ? formik.values.phone
                    : "0" + account.phone
                }
                onChange={formik.handleChange}
                readOnly={isBlockChange}
                onBlur={handleBlur}
                name="phone"
              />
            </div>
            <div className="md:col-span-2 col-span-1">
              <label className="block mb-2  text-primary font-bold text-base ">
                Chiến tích
              </label>
              <div className="font-medium min-h-[30px] py-2 px-2 w-full focus-within:bg-menu focus:border-none focus:outline-0 text-base bg-input rounded-md focus-within:text-text">
                {account?.icons.length > 0 && (
                  <SublistIcon listIcons={account.icons} />
                )}
              </div>
            </div>
            {account && (
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
                  defaultValue={
                    account.permission == "admin"
                      ? "Người quản trị website"
                      : account.permission == "vip"
                      ? "Hội Viên Vip"
                      : "Thành viên"
                  }
                  readOnly
                />
              </div>
            )}

            <div>
              <label
                htmlFor="datetime"
                className="block mb-2  text-primary font-bold text-base "
              >
                Ngày tham gia
              </label>
              <input
                readOnly
                type="text"
                id="datetime"
                className="font-medium py-2 px-2 w-full focus-within:bg-menu focus:border-none focus:outline-0 text-base bg-input rounded-md focus-within:text-text"
                defaultValue={moment(user.updated_at).format(
                  "HH:mm:ss - DD/MM/YYYY"
                )}
              />
            </div>
            <div className="md:col-span-2 col-span-1">
              <label
                htmlFor="description"
                className="block mb-2  text-primary font-bold text-base "
              >
                Tiểu sử
              </label>
              <textarea
                className="font-medium py-2 px-2 w-full focus-within:bg-menu focus:border-none focus:outline-0 text-base bg-input rounded-md focus-within:text-text "
                name="description"
                id=""
                rows={4}
                placeholder="Mô tả bản thân ..."
                value={
                  account._id == user._id
                    ? formik.values.description
                    : account.description
                }
                onChange={formik.handleChange}
                readOnly={isBlockChange}
                onBlur={handleBlur}
              ></textarea>
            </div>
          </div>
          {!isBlockChange && (
            <div className="text-center my-4">
              <button
                className="bg-teal-600 hover:bg-teal-700 p-3 rounded-lg text-white text-sm sm:w-28 w-full"
                type="submit"
              >
                Chỉnh Sửa
              </button>
            </div>
          )}
        </form>
      ) : (
        <RotateLoadding message="Loading Profile" />
      )}
    </section>
  );
};

export default Profile;
