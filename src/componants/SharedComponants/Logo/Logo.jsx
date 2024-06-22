import LogoImg from "../../../assets/Logo.png";
const Logo = () => {
  return (
    <div className="h-full">
      <img src={LogoImg} className="h-full object-cover" alt="" />
    </div>
  );
};

export default Logo;
