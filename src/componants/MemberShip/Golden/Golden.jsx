import useRole from "../../../hooks/useRole";

const Golden = ({ setIsOpen }) => {
  const [isLoading, role, subscription] = useRole();
  return (
    <div className="w-[300px] bg-gradient-to-t to-[#FFD700] from-white rounded-lg overflow-hidden shadow-gray-600 p-4 border border-gray-200 shadow-lg">
      <h3 className="text-3xl font-bold"> Golden Membership</h3>
      <h2 className="text-5xl font-semibold my-6">
        <sup className="text-lg">$</sup>12
      </h2>
      <ul className="my-6">
        <li>- More then 5 post</li>
        <li>- Unlimidted browsing</li>
        <li>- Subscription for Life time </li>
      </ul>
      <button
        onClick={() => setIsOpen(true)}
        disabled={subscription === "Gold"}
        className="btn bg-[#FFD700] border-none w-full text-gray-600 hover:text-white"
      >
        GET NOW
      </button>
    </div>
  );
};

export default Golden;
