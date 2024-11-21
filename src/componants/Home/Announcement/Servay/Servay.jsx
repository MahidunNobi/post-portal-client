import { useState } from "react";
import { timeElapsed } from "../../../../utils";
import useAuth from "../../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Servay = ({
  id,
  survey_title,
  survey_desc,
  survey_options,
  start_date,
}) => {
  const [selected, setSelected] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  // Checking if the user is already voted or not
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["user_vote"],
    queryFn: async () => {
      const { data } = await axiosSecure.post(`/vote-availability`, {
        survey_id: id,
      });
      if (data.data) {
        setSelected(data.data[0].option[0].name);
      }
      return data;
    },
  });

  const handleVote = async (Option) => {
    // Validating if the user is logged in or not
    if (!user) {
      return navigate("/login");
    }

    // Cecking if already voted or not
    if (selected) {
      return;
    }

    const reqObj = {
      survey_id: id,
      option_id: Option._id,
    };
    const res = await axiosSecure.post("/survey-vote", reqObj);
    // console.log(res.data);
    if (res.data.success) {
      console.log("Inserted");
      setSelected(Option.name);
    }
  };

  return (
    <div className="py-3 border-b border-gray-200">
      <span className="text-sm text-gray-400"> {timeElapsed(start_date)}</span>
      <h3 className="text-3xl font-roboto-title font-medium my-1">
        {survey_title}
      </h3>
      <p className="mt-4">{survey_desc}</p>

      <div className="flex flex-col gap-3">
        {survey_options.map((op) => (
          <button
            key={op._id}
            className={`w-full max-w-sm border-2 p-3 flex justify-between ${
              selected === op.name ? "border-green-500 text-green-500" : ""
            }`}
            onClick={() => handleVote(op)}
          >
            {op.name}
            {selected && <span> {op.votes} </span>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Servay;
