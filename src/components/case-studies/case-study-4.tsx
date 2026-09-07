import { AnimatedSection } from "../animated-section";

export const CaseStudy4 = () => {
    return (
        <div className="mx-auto mt-16 w-full max-w-5xl space-y-24 text-base text-black">
            {/* Embedded Presentation Section */}
            <AnimatedSection delay={0.1} className="mx-auto max-w-4xl space-y-8 mt-16">
                <div className="space-y-6 px-4 md:px-0">
                    <div className="w-full flex justify-center">
                        <div className="relative w-full aspect-video border border-black/10 rounded-xl overflow-hidden">
                            <iframe
                                src="https://embed.figma.com/deck/etqtA0xDUb3XN62Nex3drO/Kite--1stpresentation?node-id=1-83&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&embed-host=share"
                                allowFullScreen
                                title="Kite Presentation"
                                className="absolute top-0 left-0 w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            </AnimatedSection>
        </div>
    );
};
