const Image = () => {
  return (
    <div className="border-y border-gray-300 py-6 mt-6">
      <div className="flex justify-center items-center max-h-[400px] overflow-hidden">
        <img
          className="rounded-md overflow-hidden h-full object-center"
          src="https://cdn.pixabay.com/photo/2019/09/06/15/18/modi-4456532_960_720.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default Image;
