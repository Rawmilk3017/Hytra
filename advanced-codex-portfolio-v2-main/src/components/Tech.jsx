import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { textVariant, fadeIn } from "../utils/motion";
import { styles } from "../styles";
import { getTechIcon } from "./TechIcons";

const TechCard = ({ index, name }) => {
  const icon = getTechIcon(name);

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.05, 0.6)}>
      <Tilt
        tiltMaxAngleX={15}
        tiltMaxAngleY={15}
        scale={1.08}
        transitionSpeed={400}
        glareEnable={true}
        glareMaxOpacity={0.15}
        glareColor="#915EFF"
        glarePosition="all"
        className="w-28 sm:w-32"
      >
        <div className="group flex flex-col items-center justify-center p-4 rounded-2xl bg-[#151030]/90 backdrop-blur-md border border-white/10 hover:border-[#915EFF] hover:shadow-[0_0_25px_rgba(145,94,255,0.35)] transition-all duration-300 cursor-pointer">
          <div className="w-14 h-14 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>
          <span className="mt-3 text-xs sm:text-sm text-secondary font-medium tracking-wide group-hover:text-white transition-colors duration-300 text-center select-none truncate max-w-full">
            {name}
          </span>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Tech = () => {
  return (
    <>
      <motion.div variants={textVariant()} className="mb-12">
        <p className={styles.sectionSubText}>My Tech Stack</p>
        <h2 className={styles.sectionHeadText}>Technologies.</h2>
      </motion.div>

      <div className="flex flex-row flex-wrap justify-center gap-5 sm:gap-7">
        {technologies.map((technology, index) => (
          <TechCard
            key={technology.name}
            index={index}
            name={technology.name}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "skills");
