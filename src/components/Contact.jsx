import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { SOCIAL_LINKS } from "../constants";

const Contact = () => {
  return (
    <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl border border-[#232631]"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Let's Build.</h3>

        <p className="mt-8 text-secondary text-[17px] leading-[30px] max-w-xl">
          Have a Discord bot, website, Minecraft project, dashboard, or automation idea?
          Check out my GitHub or visit my website to see what I'm building.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-tertiary py-3 px-8 rounded-xl text-white font-bold shadow-md border border-secondary/20 hover:border-[#915EFF] transition-colors"
          >
            GitHub
          </a>
          <a
            href={SOCIAL_LINKS.website}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#915EFF] hover:bg-[#7d4ee0] py-3 px-8 rounded-xl text-white font-bold transition-colors"
          >
            Visit Website
          </a>
        </div>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
