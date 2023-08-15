import axios from "axios";
import React, { useEffect, useState } from "react";
import PathLink from "../../../contants";

const Intrust = () => {
  const [listExpLevel, setListExpLevel] = useState<any[]>([]);
  const [listExpVip, setListExpVip] = useState<any[]>([]);
  useEffect(() => {
    axios.get(PathLink.domain + "exp").then((responsive) => {
      if (responsive.data.status == 200) {
        const { listExpLevel, listExpVip } = responsive.data.data;
        console.log(responsive.data.data);
        if (listExpLevel && listExpVip) {
          setListExpLevel(
            listExpLevel.sort((a: any, b: any) => a.musty - b.musty)
          );
          setListExpVip(listExpVip.sort((a: any, b: any) => a.musty - b.musty));
        }
      }
    });
  }, []);

  return (
    <section className="container  mx-auto bg-content pb-8 px-4">
      <ul>
        <li>
          <span className="text-lg font-bold block mb-2">1. Lưu ý</span>
          <ul className="pl-6 list-disc text-base">
            <li>
              Mỗi một bộ phim được xem sẽ tính 2 điểm kinh nghiệm, qua ngày mới
              (12 giờ đêm) xem lại cùng bộ phim đó sẽ tính thêm 2 điểm kinh
              nghiệm.
            </li>
            <li>
              Khi nạp thẻ thành công{" "}
              <span className="text-yellow-400">1000</span> coin tương ứng với
              <span className="text-rose-700"> 10 điểm lực chiến</span> và{" "}
              <span className="text-rose-700">10 điểm vip</span>
            </li>
            <li>
              Mỗi một cấp độ sẽ cần một lượng kinh nghiệm nhất định để đột phá.
              Mỗi một đại cảnh giới sẽ có những danh hiệu khác nhau.
            </li>
            <li>
              Phần đăng nhập bạn có thể sử dụng tài khoản Facebook hoặc tài
              khoản Google nhé , được bảo mật hiện đại không lo mất tài khoản !.
            </li>
            <li>
              Bảng Phong Thần xếp hạng dựa vào{" "}
              <span className="text-yellow-400">lực chiến (EXP)</span>{" "}
            </li>
          </ul>
        </li>
        <li>
          {" "}
          <span className="text-lg font-bold block mb-2">
            {" "}
            2. Hệ thống cảnh giới{" "}
            <ol className="list_exp text-sm font-medium pl-4">
              {listExpLevel.length > 0 &&
                listExpLevel.map((item, index) => (
                  <li key={item._id}>
                    - Lv.{index + 1}{" "}
                    {index == listExpLevel.length - 1 && "- Max-"}
                    {item.name}
                    {index < listExpLevel.length - 1 &&
                      ` (${item.musty.toLocaleString("en-vi")} - ${listExpLevel[
                        index + 1
                      ].musty.toLocaleString("en-vi")})`}
                  </li>
                ))}
            </ol>
          </span>
        </li>
        <li>
          <span className="text-lg font-bold block mb-2">3. Hệ thống Vip </span>
          <ol className="list_exp text-sm font-medium pl-4">
            {listExpVip.length > 0 &&
              listExpVip.map((item, index) => (
                <li key={item._id}>
                  - Lv.{index + 1} {item.name}{" "}
                  {index < listExpVip.length - 1
                    ? ` (${item.musty.toLocaleString("en-vi")} - ${listExpVip[
                        index + 1
                      ].musty.toLocaleString("en-vi")})`
                    : `Max`}
                </li>
              ))}
          </ol>
        </li>
        <li>
          <span className="text-lg font-bold block mb-2">4. Hoạt Động</span>
          <p className="text-text text-base">
            - Web sẽ tổ chức thường xuyên một số hoạt động ở phần bình luận,
            tham gia bình luận sôi nổi sẽ được thưởng chiến tích và điểm kinh
            nghiệm để nhanh chóng thăng cấp cảnh giới.
          </p>
          <p className="text-text text-base">
            - Admin sẽ kiểm tra thường xuyên mọi tài khoản vi phạm nội dung ảnh
            hưởng tới người khác sẽ bị{" "}
            <span className="text-red-700"> ban nick vĩnh viễn</span>.
          </p>
        </li>
      </ul>
    </section>
  );
};

export default Intrust;
