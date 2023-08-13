import React, { useEffect, useState } from "react";
import ModalContent from "../../components/Modal";
import imageUpload from "../../assets/upload.png";
import ToastMessage from "../../untils/ToastMessage";
import axios from "axios";
import PathLink from "../../contants";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux/Store";
import { updateAvata } from "../../Redux/UserSlice";
import { Link } from "react-router-dom";
const UploadAvata: React.FC<{ userID: string; username: string }> = ({
  userID,
  username,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [isopenmodal, setIsopenModal] = useState<boolean>(false);
  const [Avata, setAvata] = useState<string>();
  const [fileUpload, setFileUpload] = useState<{ path: string; url: string }>({
    path: "",
    url: "",
  });
  const [isHandleChangeAvata, setIsHandleChangeAvata] = useState(false);
  const handleChangeAvatar = (
    e: React.FocusEvent<HTMLInputElement | any, Element>
  ) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setAvata(url);
    if (!file && file.mimetype.includes("image")) {
      ToastMessage("Đây không phải là ảnh").success();
      return;
    }

    if (file.size >= 1024 * 200) {
      ToastMessage(
        `Ảnh có dung lượng là ${Math.floor(file.size / 1024)} KB > 200 KB`
      ).warning({ autoClose: 3000 });
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    fetch(PathLink.domain + "uploadfile", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status == 200) {
          setFileUpload(() => res.image);
          setAvata(res.image.url);
          setIsHandleChangeAvata(true);
        }
      })
      .finally(() => {
        url && URL.revokeObjectURL(url);
      });

    e.target.value = null;
  };

  const handleSubmit = async () => {
    if (!fileUpload.path) ToastMessage("Vui lòng tải ảnh lên !").success();
    try {
      const res: any = await axios.post(PathLink.domain + "user/updateAvatar", {
        method: "post",
        data: {
          _id: userID,
          avata: fileUpload.url,
          path: fileUpload.path,
          username,
        },
      });

      if (res.status == 200) {
        dispatch(updateAvata({ avata: fileUpload.url }));
        ToastMessage(res.data.message).success();

        setAvata("");
        setFileUpload(() => ({ path: "", url: "" }));
        setIsopenModal(!isopenmodal);
        setIsHandleChangeAvata(false);
      }
    } catch (err) {
      ToastMessage("Ảnh không đúng yêu cầu !").info();
    }
  };
  useEffect(() => {
    return () => {
      if (isHandleChangeAvata && fileUpload.path) {
        axios.post(PathLink.domain + "deleteimage", {
          path: fileUpload.path,
        });
      }
    };
  }, [isHandleChangeAvata, fileUpload.path]);
  return (
    <div>
      <ModalContent isopenmodal={isopenmodal} setIsopenModal={setIsopenModal}>
        <h3 className="text-lg font-bold  mb-3">Thay đổi ảnh đại diện</h3>
        <div className="flex flex-col">
          <label
            htmlFor="file"
            className="w-52 h-52 m-auto sm:w-72 sm:h-72 flex border-dashed border-white border-2 relative"
          >
            <div className="flex  flex-col justify-center  items-center m-auto cursor-pointer">
              <img src={imageUpload} width={60} alt="" />
              <span className="my-2">Tải ảnh từ Desktop</span>
              <span className="bg-teal-600 hover:bg-teal-700 py-2 px-3 rounded-lg">
                Chọn ảnh
              </span>
            </div>
            {Avata && (
              <img
                src={Avata}
                className="absolute inset-0 w-full h-full object-cover"
                alt="err"
              />
            )}
          </label>
          <div className="flex justify-center gap-2 mt-2">
            <button
              type="button"
              onClick={() => Avata && setAvata("")}
              className="py-2 px-3 rounded-lg bg-red-600 hover:bg-red-700"
            >
              Trở về
            </button>
            {fileUpload.url && (
              <button
                type="button"
                className="py-2 px-3 rounded-lg bg-green-600 hover:bg-green-700"
                onClick={handleSubmit}
              >
                Thay Đổi
              </button>
            )}
          </div>
          <p className="text-red-600 font-bold text-lg">Lưu ý</p>
          {!Avata && (
            <ul className="list-disc ml-8 text-base">
              <li>
                Ảnh sẽ rõ nét hơn với kích thước
                <span className="text-primary"> 60 x 60 </span>
              </li>
              <li>
                Ảnh sẽ được <span className="text-primary">kiểm duyệt </span>{" "}
                sau ít phút ( <span className="text-primary">.png </span> nhen)
              </li>
              <li>
                Không up ảnh <span className="text-primary">khiêu dâm</span>{" "}
              </li>
              <li>
                Dung lượng ảnh không lớn hơn{" "}
                <span className="text-primary">60 KB</span>{" "}
              </li>
            </ul>
          )}
          {Avata && (
            <ul className="list-disc ml-8 text-base">
              <li>
                Nếu vi phạm bạn sẽ bị khóa tài khoản{" "}
                <span className="text-primary"> vĩnh viễn </span>
              </li>
            </ul>
          )}
          <input onChange={handleChangeAvatar} type="file" hidden id="file" />
        </div>
      </ModalContent>
      <button
        type="button"
        className="py-2 px-3 bg-red-700 rounded-lg hover:bg-red-800 mr-2"
        onClick={(e) => {
          e.stopPropagation();
          setIsopenModal(!isopenmodal);
        }}
      >
        Đổi Avata
      </button>
      <Link to="/nap-tien">
        <button
          type="button"
          className="py-2 px-3 bg-green-700 rounded-lg hover:bg-green-800"
        >
          Nạp tiền
        </button>
      </Link>
    </div>
  );
};

export default UploadAvata;
