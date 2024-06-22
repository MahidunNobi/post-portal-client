const Tag = ({ tag }) => {
  return (
    <div className=" max-w-[140px] group border border-gray-200 rounded-lg cursor-pointer overflow-hidden">
      <div className="p-3 flex justify-center">
        <img
          src={
            tag?.image || "https://img.icons8.com/?size=256&id=99427&format=png"
          }
          alt=""
        />
      </div>
      <span className="bg-primary-orange w-full block text-center font-lg font-medium  border-t border-gray-200">
        {tag?.name}
      </span>
    </div>
  );
};

export default Tag;
