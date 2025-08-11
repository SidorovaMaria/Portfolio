import FlipText from "../motionComponents/FlipText";
import { Coffee } from "lucide-react";
import { motion } from "motion/react";
const AboutMe = () => {
  return (
    <section
      id="about-me"
      className="aboutme-layout flex flex-col gap-10 w-full"
    >
      <h2 className="flex items-center gap-2.5 group">
        <FlipText className="text-3xl lg:text-[40px] uppercase font-bold py-0 leading-[140%]">
          A shot Of Me
        </FlipText>
        <Coffee className="size-7 lg:size-10 text-coffe-light group-hover:text-secondary transition-all duration-900 ease-linear " />
      </h2>
      <div className="grid grid-cols-1  lg:grid-cols-[1fr_2fr] gap-10 ">
        {/* Left & Top */}
        <div className="relative w-full flex items-center justify-center  bg-[url('/images/coffee-cup.svg')] bg-auto min-h-[40vh] bg-no-repeat bg-center ">
          <img
            src="/images/profile-img.svg"
            className="
                    relative -left-1/12 md:-left-1/20 lg:-left-1/10 xl:-left-1/14"
          />
        </div>
        <div className="flex flex-col gap-5  w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ amount: 0.5, once: true }}
            className="text-sm leading-[140%] text-left pr-[12%]"
          >
            Hi! <span className="accent">I’m Maria Sidorova</span> — a
            24-year-old front-end developer originally from Russia, now based in
            the UK, Liverpool. I moved here to pursue my education and recently
            completed a degree in Computer Science and Mathematics at the
            University of Manchester. My love for logic, precision, and
            problem-solving naturally led me into web development — where I get
            to blend creativity with structure every day
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ amount: 1 }}
            className="text-sm leading-[140%] text-right pl-[12%]"
          >
            I specialise in building responsive, websites that stay true to the
            original design. My current toolkit includes{" "}
            <span className="accent">
              ReactJS, TailwindCSS, and Framer Motion,
            </span>
            with ongoing adventures into TypeScript and Next.js. I’m confident
            in <span className="accent">Figma</span>— this website was
            originally designed there! — making it easy for me to bridge the gap
            beGitHub also use <span className="accent">GitHub</span> daily to
            manage and share my work.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ amount: 1 }}
            className="text-sm leading-[140%] text-left pr-[12%]"
          >
            I’m detail-obsessed (some may say stubborn!) when it comes to
            solving problems — I don’t stop until I find a clean, accessible,
            and efficient solution. At the same time, I thrive in team settings
            and genuinely care about making people around me feel safe,
            supported, and inspired.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ amount: 1 }}
            className="text-base font-semibold leading-[140%] text-center px-[6%]"
          >
            Whether it’s writing elegant code or crafting smooth animations, I
            bring energy, kindness, and curiosity to everything I do. And yes —
            coffee definitely fuels the process ☕⚡
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
