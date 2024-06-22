import { formatDateAndTime, timeElapsed } from "../../../utils";

const PersonalInfo = ({ user, posted }) => {
  return (
    <div className="md:w-[250px]">
      <div className="flex items-center gap-3">
        <div className="avatar">
          <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img
              src={
                user?.photoURL ||
                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              }
            />
          </div>
        </div>
        <div>
          <h6 className="font-semibold"> {user?.name} </h6>
          <span className="text-sm text-gray-400">
            {formatDateAndTime(posted)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
