import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../componants/SharedComponants/LoadingSpinner/LoadingSpinner";

const Survey = () => {
  const axiosSecure = useAxiosSecure();

  const { data: surveys = [], isLoading } = useQuery({
    queryKey: ["surveys"],
    queryFn: async () => {
      const { data } = await axiosSecure("/surveys");
      return data;
    },
  });

  if (isLoading)
    return (
      <div className="min-h-[95vh] grid place-content-center">
        <LoadingSpinner />
      </div>
    );

  console.log(surveys);

  return (
    <main className="p-6">
      <div className="flex justify-between items-center my-10">
        <h1 className="text-4xl font-bold"> Surveys</h1>
        <Link to={"/dashboard/add-survey"}>
          <button className="btn bg-primary-orange border-none text-white">
            New Survey
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Survey Title</th>
              <th>Options</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {surveys.map((survey, i) => (
              <tr key={survey._id}>
                <th>{i + 1}</th>
                <td>{survey.survey_title}</td>
                <td className="flex flex-col">
                  {survey.options.map((op) => (
                    <span className="mt-2" key={op._id}>
                      {op.name} ({op.votes})
                    </span>
                  ))}
                </td>
                <td>
                  {survey.end_date > Date.now() ? (
                    <span className="text-green-600 font-semibold">Active</span>
                  ) : (
                    <span className="text-amber-500 font-semibold">
                      Completed
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Survey;
