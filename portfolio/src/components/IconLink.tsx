import type { Link } from "../constants";
import { motion } from "motion/react";
const IconLink = ({ link }: { link: Link }) => {
  return (
    <motion.a
      key={link.name}
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{
        scale: 1.08,
        rotate: 5,
        boxShadow: "0 4px 30px rgba(255, 255, 255, 0.2)",
      }}
      transition={{ duration: 0.3, type: "tween" }}
      className="flex flex-col gap-2  items-center justify-center rounded-full 
      bg-gradient-to-b px-4.5 py-2 from-coffee-brown/50 to-coffe-light/50"
    >
      <div className="flex items-center gap-2 ">
        {link.devicon ? (
          <i className={`${link.icon} text-3xl`}></i>
        ) : (
          <img
            src={link.icon}
            alt={link.name}
            className="sw-7 h-7 flex items-center justify-center bg-white rounded-full p-1"
          />
        )}

        <p className="font-bold tracking-wider text-sm">{link.name}</p>
      </div>
    </motion.a>
  );
};

export default IconLink;
