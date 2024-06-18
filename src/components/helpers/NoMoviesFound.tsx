import VkIcon from "../../assets/VkIcon";
import BouncyIcon from "../../animations/BouncyIcon";

const NoMoviesFound = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <h1 className="text-3xl text-center font-bold text-white mt-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        Could't find movies matching your request =(
      </h1>
      <BouncyIcon>
        <VkIcon />
      </BouncyIcon>
    </div>
  );
};

export default NoMoviesFound;
