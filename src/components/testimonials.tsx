import { AnimatedSection } from "./animated-section";
import { testimonialData } from "../data";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";

export const Testimonials = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const containerRef = useRef(null);
    const isInView = useInView(containerRef);

    // Auto-rotate testimonials every 5 seconds, unless paused or not in view
    useEffect(() => {
        if (isPaused || !isInView) return;

        const timer = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonialData.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [isPaused, isInView]);

    const testimonial = testimonialData[currentTestimonial];

    return (
        <AnimatedSection
            id="testimonials"
            className="space-y-32 max-w-6xl mx-auto px-4"
            viewport={{ once: true }}
            aria-label="Client Testimonials"
        >
            <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-px bg-ag-border"></div>
                <h2 className="text-sm font-medium text-ag-dark tracking-widest uppercase">Testimonials</h2>
                <div className="flex-1 h-px bg-ag-border"></div>
            </div>

            {/* Elegant Testimonial Carousel */}
            <div
                ref={containerRef}
                className="relative max-w-4xl mx-auto py-8 md:py-16"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onFocus={() => setIsPaused(true)}
                onBlur={() => setIsPaused(false)}
                role="region"
                aria-roledescription="carousel"
                aria-label="Client testimonials carousel"
            >
                <div className="text-center space-y-8 overflow-hidden" aria-live={isPaused ? "polite" : "off"}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentTestimonial}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="space-y-8"
                            role="group"
                            aria-roledescription="slide"
                            aria-label={`Testimonial ${currentTestimonial + 1} of ${testimonialData.length}`}
                        >
                            {/* Quote */}
                            <div className="relative px-4 md:px-0">
                                <p className="text-xl md:text-3xl lg:text-4xl font-normal text-ag-dark leading-relaxed italic">
                                    "{testimonial.quote}"
                                </p>
                            </div>

                            {/* Author Info */}
                            <div className="space-y-2">
                                <h3 className="text-lg md:text-xl font-medium text-ag-dark">{testimonial.author}</h3>
                                <p className="text-sm md:text-base text-ag-grey">{testimonial.contact}</p>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Dots */}
                    <div
                        className="flex items-center justify-center gap-3 pt-8"
                        role="tablist"
                        aria-label="Choose a testimonial"
                    >
                        {testimonialData.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setCurrentTestimonial(index);
                                    setIsPaused(true); // Ideally pause if manually interacting
                                }}
                                className={`transition-all duration-300 rounded-full ${index === currentTestimonial
                                    ? "w-8 h-2 bg-ag-blue"
                                    : "w-2 h-2 bg-ag-border hover:bg-ag-grey"
                                    }`}
                                aria-label={`View testimonial ${index + 1}`}
                                aria-selected={index === currentTestimonial}
                                role="tab"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
};
