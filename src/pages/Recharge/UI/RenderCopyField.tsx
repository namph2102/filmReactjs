const RenderCopyField: React.FC<{
  name: string;
  value: string;
  handleCoppy: (value: string) => void;
}> = ({ name, value, handleCoppy }) => {
  return (
    <>
      <p className="w-full text-base mt-4 font-bold">{name}:</p>
      <p className="flex justify-between px-4 mt-3">
        <span className="text-primary text-xl font-bold">{value}</span>
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
