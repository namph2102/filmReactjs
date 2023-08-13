import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginWithFireBase } from "../../Redux/UserSlice";
import { AppDispatch, RootState } from "../../Redux/Store";
import ToastMessage from "../../untils/ToastMessage";
import { getListBookmarks } from "../../Redux/BookmarkSlice";
import Authentication from "../index";
import { BsGoogle, BsFacebook } from "react-icons/bs";
function HandleFirebase({
  onHandleClose,
  type,
}: {
  onHandleClose: (isOpen: boolean) => void;
  type: string;
}) {
  const dispatch: AppDispatch = useDispatch();
  const userSlice = useSelector((state: RootState) => state.account);

  const responsiveLoggin = useCallback(
    (user: { displayName: string; photoURL: string; uid: string }) => {
      dispatch(
        loginWithFireBase({
          uid: user.uid,
          type,
          fullname: user.displayName,
          avata: user.photoURL,
        })
      ).then((res: any) => {
        onHandleClose(false);
        if (res.status == 404) {
          ToastMessage(res.message).error();
          return;
        } else {
          ToastMessage(res.message).success();
        }
        dispatch(getListBookmarks());
      });
    },
    []
  );
  return (
    <div className="grid grid-cols-2 gap-4  py-8">
      <button
        onClick={() => Authentication.signGoogle(responsiveLoggin)}
        type="button"
        className="py-4 rounded-xl bg-slate-200 hover:bg-slate-300 flex justify-center"
      >
        <BsGoogle fill="#EF476F" className="sm:text-base text-sm" />
      </button>
      <button
        type="button"
        onClick={() => Authentication.signFacebook(responsiveLoggin)}
        className="py-4 rounded-xl bg-slate-200 hover:bg-slate-300 flex justify-center"
      >
        <BsFacebook fill="#560BAD" className="sm:text-base text-sm" />
      </button>
    </div>
  );
}

export default HandleFirebase;
