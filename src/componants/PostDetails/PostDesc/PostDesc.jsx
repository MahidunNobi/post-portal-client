const PostDesc = ({ selectedTags, post_title, post_description }) => {
  return (
    <div className="">
      {/* tags */}
      <div className=" flex gap-2">
        {selectedTags.map((tag) => (
          <span
            key={tag._id}
            className="text-sm text-white bg-gray-400 px-4 py-1 rounded-md"
          >
            {tag.name}
            Politics
          </span>
        ))}
      </div>

      <h2 className="text-5xl font-roboto-title font-semibold mt-3">
        {post_title}
      </h2>
      <p className="text-gray-600 my-6">{post_description}</p>
    </div>
  );
};

export default PostDesc;
