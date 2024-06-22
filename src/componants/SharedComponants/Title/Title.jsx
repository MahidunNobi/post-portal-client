const Title = ({ normal, colored }) => {
  return (
    <h3 className="text-5xl font-semibold font-roboto-title text-center">
      {normal} <span className="text-primary-orange"> {colored} </span>
    </h3>
  );
};

export default Title;
