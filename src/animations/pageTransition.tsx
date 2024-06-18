import { motion } from "framer-motion";
import VkIcon from "../assets/VkIcon";

const pageTransition = (OgComponent: React.FC) => {
  return () => (
    <>
      <OgComponent />

      <motion.div
        className="fixed top-0 left-0 w-full h-screen bg-blue-400 origin-bottom"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 1.2 }}
      >
        <motion.div
          className=""
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="text-white absolute top-1/2 opacity-45 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-32 text-xl">
            CINEMA
          </h1>
          <VkIcon />
        </motion.div>
      </motion.div>
    </>
  );
};

export default pageTransition;
