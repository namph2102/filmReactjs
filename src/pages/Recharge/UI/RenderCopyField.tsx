import ToastMessage from "../../../untils/ToastMessage";

const RenderCopyField: React.FC<{
  name: string;
  value: string;
}> = ({ name, value }) => {
  const handleCoppy = (copyText: string) => {
    ToastMessage(`Copy thành công "${copyText}"`).success();
    navigator.clipboard.writeText(copyText);
  };
  return (
    <>
      <p className="w-full text-base mt-4 font-bold">{name && name + ":"}</p>
      <p className="flex justify-between px-4 mt-3">
        <span
          className={`${
            name ? "text-primary" : "text-red-600 text-xl"
          } text-xl font-bold min-w-[120px]`}
        >
          {value}
        </span>
        <img
          className="cursor-pointer hover:scale-110 ease-in duration-200"
          onClick={() => handleCoppy(value)}
          src="/images/copy.png"
          alt=""
        />
      </p>
    </>
  );
};
export default RenderCopyField;
