import React from "react";
import { BiLocationPlus, BiMailSend, BiMap, BiPhoneCall } from "react-icons/bi";
import { defaultIconSize } from "../../contants";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import {
  RiFacebookFill,
  RiGithubFill,
  RiGoogleFill,
  RiLinkedinFill,
} from "react-icons/ri";
import { Tooltip } from "@mui/material";
const Footer = () => {
  return (
    <footer className="bg-menu py-10 text-text text-sm ">
      <div className="container mx-auto ">
        <section className="grid lg:grid-cols-3 sm:grid-cols-2  grid-cols-1 sm:px-0 px-4">
          <div className="info_contact">
            <div className="flex items-center">
              <button className="bg-slate-700 p-1.5 rounded-full mr-2">
                <BiMap
                  color="text-white"
                  className="hover:text-primary"
                  size={defaultIconSize}
                />
              </button>
              <address>Đông Hưng Thuận, Quận 12, TP Hồ Chí Minh</address>
            </div>
            <div className="flex items-center my-3">
              <a href="tel:+8325024277">
                <button className="bg-slate-700 p-1.5 rounded-full mr-2">
                  <BiPhoneCall
                    color="text-white"
                    className="hover:text-primary"
                    size={defaultIconSize}
                  />
                </button>
              </a>
              <address>0325 024 277</address>
            </div>
            <div className="flex items-center">
              <button className="bg-slate-700 p-1.5 rounded-full mr-2">
                <BiMailSend
                  color="text-white"
                  className="hover:text-primary"
                  size={defaultIconSize}
                />
              </button>
              <a href="mailto:namph2102@gmail.com">namph2102@gmail.com</a>
            </div>
          </div>
          <div className="info_logo text-center flex justify-center flex-col items-center my-4 sm:my-0">
            <Link to="/trang-chu">
              {" "}
              <img
                src={logo}
                className="object-cover"
                alt="Video tV"
                width={200}
              />
            </Link>
            <p className="mt-2 text-base font-bold my-2 border-b-2 border-yellow-300">
              Liên hệ quảng cáo
            </p>
            <ul className="info_contact flex gap-2 my-2">
              <Tooltip title="FaceBook" arrow placement="top">
                <a
                  href="https://www.facebook.com/namhoai2102"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="bg-slate-700 p-1.5 rounded mr-2 hover:bg-gray-600 hover:text-primary">
                    <RiFacebookFill size={defaultIconSize} />
                  </button>
                </a>
              </Tooltip>
              <Tooltip title="GitHub" arrow placement="top">
                <a
                  href="https://github.com/namph2102"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="bg-slate-700 p-1.5 rounded mr-2 hover:bg-gray-600 hover:text-primary">
                    <RiGithubFill size={defaultIconSize} />
                  </button>
                </a>
              </Tooltip>
              <Tooltip title="Gmail" arrow placement="top">
                <a href="mailto:namph2102@gmail.com" rel="noopener noreferrer">
                  <button className="bg-slate-700 p-1.5 rounded mr-2 hover:bg-gray-600 hover:text-primary">
                    <RiGoogleFill size={defaultIconSize} />
                  </button>
                </a>
              </Tooltip>
              <Tooltip title="Linkedin" placement="top" arrow>
                <a
                  href="https://www.linkedin.com/in/nam-ph%E1%BA%A1m-ho%C3%A0i-830457269/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="bg-slate-700 p-1.5 rounded mr-2 hover:bg-gray-600 hover:text-primary">
                    <RiLinkedinFill size={defaultIconSize} />
                  </button>
                </a>
              </Tooltip>
            </ul>
          </div>
          <div className="info_about lg:mt-0 mt-4">
            <h6 className="font-bold text-lg border-b-2 inline-block border-yellow-400">
              Về Chúng tôi
            </h6>
            <p className="mt-4 text-base">
              VideoTV chuyên cung cấp bộ phim hay, được chọn lọc tuyển chọn một
              cách tỉ mỹ cùng đội ngũ nhân viên tâm huyết.
            </p>
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
