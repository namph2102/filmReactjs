import React, { useEffect, useState } from "react";
import "./rank.scss";
import PathLink from "../../../contants";
import UserRankItem from "./UserRankItem";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
export interface Irankuser {
  _id: string;
  username: string;
  fullname: string;
  avata: string;
  nameLevel: { name: string };
  icons: { title: string; link: string }[];
  permission: string;
  vip: number;
  expLv: number;
  createdAt: string;
}

const RankContainer = () => {
  const account = useSelector((state: RootState) => state.account.user);
  const [listAccount, setListAccount] = useState<Irankuser[]>([]);
  const [infomation, setInfomation] = useState<Irankuser>();
  useEffect(() => {
    axios
      .post(PathLink.domain + "user/getListUserRank", {
        method: "post",
        data: { idUser: account._id },
      })
      .then((res) => {
        setListAccount(res.data.listUser);
        setInfomation(res.data.account);
      });
  }, [account._id]);
  return (
    <section className="relative">
      <div
        className={`w-full rank_container bg-content min-h-[200px]  p-4 ${
          account?._id && "pb-36"
        }`}
      >
        {listAccount.length > 0 &&
          listAccount.map((account, index) => (
            <UserRankItem key={account._id} top={index + 1} user={account} />
          ))}

        {infomation && account?._id && (
          <div className="absolute rank_item--user bottom-0 left-0 bg-menu right-0 py-4 px-3 rounded-[36px]">
            <UserRankItem
              key={account._id}
              top={
                listAccount.findIndex((item) => item._id === account._id) + 1
              }
              user={infomation}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default RankContainer;
