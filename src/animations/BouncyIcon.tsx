import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

type BouncyIconProps = {
  children: React.ReactNode;
  className?: string;
};

const BouncyIcon: React.FC<BouncyIconProps> = ({ children, className }) => {
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
    <div ref={iconRef} className={className}>
      {children}
    </div>
  );
};

export default BouncyIcon;
