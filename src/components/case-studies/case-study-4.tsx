import { AnimatedSection } from "../animated-section";

export const CaseStudy4 = () => {
    return (
        <div className="mx-auto mt-16 w-full max-w-5xl space-y-24 text-base text-black">
            {/* Embedded Presentation Section */}
            <AnimatedSection delay={0.1} className="mx-auto max-w-4xl space-y-8 mt-16">
                <div className="space-y-6">
                    <div className="w-full flex justify-center">
                        <iframe
                            style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
                            width="800"
                            height="450"
                            src="https://embed.figma.com/deck/etqtA0xDUb3XN62Nex3drO/Kite--1stpresentation?node-id=1-83&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&embed-host=share"
                            allowFullScreen
                            title="Kite Presentation"
                            className="w-full max-w-4xl"
                        />
                    </div>
                </div>
            </AnimatedSection>
        </div>
    );
};
