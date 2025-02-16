import { HTMLMotionProps, motion } from "framer-motion";

const ScrollFade: React.FC<HTMLMotionProps<"section">> = ({ children, ...props }) => {
  return (
    <motion.section
      initial={{ opacity: 0, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }} // Triggers when 20% of the element is visible
      {...props}>
      {children}
    </motion.section>
  );
};

const ScrollGlass: React.FC<HTMLMotionProps<"div">> = ({ children, className, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, backdropFilter: "blur(20px)" }}
      whileInView={{ opacity: 1, backdropFilter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className={`bg-white/20 backdrop-blur-lg p-4 rounded-lg ${className}`} // Adds a frosted effect
      {...props}>
      {children}
    </motion.div>
  );
};

export { ScrollFade, ScrollGlass };
