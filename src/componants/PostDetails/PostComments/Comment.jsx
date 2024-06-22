import { MdEdit } from "react-icons/md";
import { ImBin } from "react-icons/im";

const Comment = ({ comment }) => {
  const { user, comment: text } = comment;
  return (
    <div className="border border-gray-300 rounded-lg p-3 my-3">
      <div className="flex justify-between items-center">
        {/*------- Author ----------*/}
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img
                src={
                  user?.photoURL ||
                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                }
              />
            </div>
          </div>
          <div>
            <h6 className="font-medium"> {user?.name} </h6>
          </div>
        </div>
        {/* -------Action Buttons---- */}
        {/* <div className="flex justify-end gap-3">
          <button className="btn btn-circle btn-outline btn-sm">
            <MdEdit size={18} />
          </button>
          <button className="btn btn-error btn-circle btn-outline btn-sm">
            <ImBin size={18} />
          </button>
        </div> */}
      </div>
      <p className="text-gray-600">{text}</p>
    </div>
  );
};

export default Comment;
