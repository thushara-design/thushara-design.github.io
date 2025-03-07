import type { PropsWithChildren, ElementType } from "react";
import { type HTMLMotionProps, motion } from "framer-motion";

interface AnimatedSectionProps extends HTMLMotionProps<"section"> {
  as?: ElementType;
  delay?: number;
}

const AnimatedSection: React.FC<PropsWithChildren<AnimatedSectionProps>> = ({ children, as: Component = "section", delay = 0, ...props }) => {
  const MotionComponent = motion(Component);
  return (
    <MotionComponent
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut", delay }}
      viewport={{ once: true }}
      {...props}>
      {children}
    </MotionComponent>
  );
};

export { AnimatedSection };
