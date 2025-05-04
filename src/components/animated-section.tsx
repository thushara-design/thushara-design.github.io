import type { PropsWithChildren, ElementType } from "react";
import { type HTMLMotionProps, motion } from "framer-motion";

interface AnimatedSectionProps extends HTMLMotionProps<"section"> {
  as?: ElementType;
  delay?: number;
  viewport?: any;
  initial?: any;
  whileInView?: any;
}

const AnimatedSection: React.FC<PropsWithChildren<AnimatedSectionProps>> = ({ 
  children, 
  as: Component = "section", 
  delay = 0, 
  viewport: customViewport,
  initial: customInitial,
  whileInView: customWhileInView,
  ...props 
}) => {
  const MotionComponent = motion(Component);
  return (
    <MotionComponent
      initial={customInitial ?? { opacity: 0, y: 100 }}
      whileInView={customWhileInView ?? { opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut", delay }}
      viewport={customViewport ?? { once: true }}
      {...props}>
      {children}
    </MotionComponent>
  );
};

export { AnimatedSection };
