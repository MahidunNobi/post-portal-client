import Title from "../../componants/SharedComponants/Title/Title";
import Desc from "../../componants/SharedComponants/Desc/Desc";
import Golden from "../../componants/MemberShip/Golden/Golden";
import { useState } from "react";
import PaymentModel from "../../componants/Models/PaymentModel";
const MemberShip = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="container mx-auto px-3 my-12">
      <Title normal={"Upgrade to"} colored={"Golden"} />
      <Desc
        desc={
          "Step up to the Golden Membership and enjoy exclusive advantages. Get priority access, premium tools, and more ways to connect and engage with our vibrant community."
        }
      />
      <div className="flex justify-center">
        <Golden setIsOpen={setIsOpen} />
      </div>
      <PaymentModel closeModal={closeModal} isOpen={isOpen} />
    </div>
  );
};

export default MemberShip;
