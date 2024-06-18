import VkIcon from "../../assets/VkIcon";
import BouncyIcon from "../../animations/BouncyIcon";

const Loading = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <h1 className="text-3xl font-bold text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        Loading...
      </h1>
      <BouncyIcon>
        <VkIcon />
      </BouncyIcon>
    </div>
  );
};

export default Loading;
