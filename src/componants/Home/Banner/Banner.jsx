import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Select from "react-select";
import { IoSearch } from "react-icons/io5";
import { useEffect } from "react";

const Banner = ({
  selectedTags,
  setSelectedTags,
  handleSearch,
  refetchInitialPosts,
}) => {
  const axiosPublic = useAxiosPublic();
  const { data: tags = [] } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const { data } = await axiosPublic("/tags");
      return data;
    },
  });

  const options = tags.map((tag) => {
    return { ...tag, value: tag.name, label: tag.name };
  });

  const colorStyles = {
    control: (styles) => ({
      ...styles,
      width: "300px",
      backgroundColor: "#d1d5db",
      paddingTop: "6px",
      paddingBottom: "6px",
      fontSize: "16px",
      lineHeight: "20px",
    }),
  };

  const handleSelectChange = (selectedOptions) => {
    setSelectedTags(selectedOptions);
  };

  useEffect(() => {
    if (selectedTags.length === 0) {
      refetchInitialPosts;
    }
  }, [selectedTags, refetchInitialPosts]);

  return (
    <div className="bannerContainer min-h-[400px] flex justify-center items-center">
      <div className="container mx-auto px-3 flex flex-col text-primary-orange justify-center items-center">
        <h1 className="text-5xl md:text-7xl font-roboto-title font-bold ">
          Share Your Voice with the World
        </h1>
        <p className="font-medium md:text-lg text-white my-3">
          Join Post Portal today and be part of a vibrant community where your
          thoughts matter
        </p>
        <div className="flex md:flex-row flex-col items-center gap-3">
          <Select
            // defaultValue={[options[2]]}
            isMulti
            name="tags"
            onChange={handleSelectChange}
            options={options}
            value={selectedTags}
            styles={colorStyles}
            className="basic-multi-select "
            classNamePrefix="select"
          />
          {/* {selectedTagsError && (
                <span className="text-red-600">This field is required</span>
              )} */}
          <button
            onClick={handleSearch}
            className="btn bg-primary-orange border-none text-white w-full md:w-auto"
          >
            <IoSearch size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
