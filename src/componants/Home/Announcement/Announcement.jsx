import { useQuery } from "@tanstack/react-query";
import AnnouncementImg from "../../../assets/Announcement.jpg";
import Title from "../../SharedComponants/Title/Title";

import SingleAnnouncement from "./SingleAnnouncement";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
const Announcement = () => {
  const axiosPublic = useAxiosPublic();
  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const { data } = await axiosPublic("/announcements");
      return data;
    },
  });

  return (
    <div className=" container mx-auto px-3 flex flex-col items-center md:items-start md:flex-row gap-6 my-12">
      <div className="md:w-[40%]">
        <img src={AnnouncementImg} alt="" />
      </div>
      <div className="my-6 md:flex-1">
        <h3 className="text-5xl font-semibold font-roboto-title text-left">
          Latest <span className="text-primary-orange"> Announcement </span>
        </h3>
        <div className=" max-h-[400px] overflow-x-auto">
          {announcements.map((ann) => (
            <SingleAnnouncement key={ann._id} announcement={ann} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Announcement;
