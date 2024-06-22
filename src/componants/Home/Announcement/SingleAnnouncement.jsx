import { timeElapsed } from "../../../utils";

const SingleAnnouncement = ({ announcement }) => {
  const { announcement_title, announcement_description, timestamp } =
    announcement;
  return (
    <div className="py-3 border-b border-gray-200">
      <span className="text-sm text-gray-400">{timeElapsed(timestamp)}</span>
      <h3 className="text-3xl font-roboto-title font-medium my-1">
        {announcement_title}
      </h3>
      <p>{announcement_description}</p>
    </div>
  );
};

export default SingleAnnouncement;
