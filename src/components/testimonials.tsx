import { AnimatedSection } from "./animated-section";
import { testimonialData } from "../data";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const Testimonials = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    // Auto-rotate testimonials every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonialData.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    const testimonial = testimonialData[currentTestimonial];

    return (
        <AnimatedSection id="testimonials" className="space-y-32 max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-px bg-ag-border"></div>
                <h2 className="text-sm font-medium text-ag-dark tracking-widest uppercase">Testimonials</h2>
                <div className="flex-1 h-px bg-ag-border"></div>
            </div>

            {/* Elegant Testimonial Carousel */}
            <div className="relative max-w-4xl mx-auto py-8 md:py-16">
                <div className="text-center space-y-8 overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentTestimonial}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="space-y-8"
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
                    <div className="flex items-center justify-center gap-3 pt-8">
                        {testimonialData.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentTestimonial(index)}
                                className={`transition-all duration-300 rounded-full ${index === currentTestimonial
                                    ? "w-8 h-2 bg-ag-blue"
                                    : "w-2 h-2 bg-ag-border hover:bg-ag-grey"
                                    }`}
                                aria-label={`View testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
};
