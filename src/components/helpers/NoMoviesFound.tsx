import { useRef } from "react";
import { gsap } from "gsap";
import VkIcon from "../../assets/VkIcon";
import { useGSAP } from "@gsap/react";

const NoMoviesFound = () => {
  const iconRef = useRef(null);

  useGSAP(() => {
    const icon = iconRef.current;
    const animation = gsap.to(icon, {
      y: 10,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
    });

    return () => {
      animation.kill();
    };
  }, [iconRef]);

  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <h1 className="text-3xl text-center font-bold text-white mt-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        Could't find movies matching your request =(
      </h1>
      <div ref={iconRef}>
        <VkIcon />
      </div>
    </div>
  );
};

export default NoMoviesFound;
