import { AnimatedSection } from "../animated-section";

export const CaseStudy3 = () => {
    return (
        <div className="mx-auto mt-16 w-full max-w-5xl space-y-24 text-base text-black">
            {/* Introduction Section */}
            <AnimatedSection delay={0.1} className="mx-auto max-w-4xl space-y-8 mt-16">
                <div className="space-y-6">
                    <p className="text-lg font-medium leading-relaxed text-gray-800">
                        This was my first project where I designed and shipped a full mobile app, despite having zero coding experience.
                    </p>
                    <p className="leading-relaxed text-gray-600">
                        With AI-assisted development tools becoming more common, I always wanted to see what I could create in a short, intense sprint. That's when I discovered the AI Bolt Hackathon. I joined extremely late and had just seven days to ideate, build, test, and submit.
                    </p>
                    <div className="pt-2">
                        <a
                            href="#app-demo"
                            className="inline-flex items-center space-x-2 text-sm font-medium text-gray-800 hover:text-black transition-colors group"
                        >
                            <span>See the app</span>
                            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>
                </div>
            </AnimatedSection>

            {/* Problem Section */}
            <AnimatedSection delay={0.2} className="mx-auto max-w-4xl space-y-8">
                <div className="space-y-4">
                    <h1 className="text-3xl font-light tracking-tight">Problem</h1>
                    <div className="h-px w-16 bg-black"></div>
                </div>

                <div className="space-y-6">
                    <p className="leading-relaxed text-gray-600">
                        The idea came from a simple conversation. A friend suggested I keep a small list of things I enjoy doing whenever I feel overwhelmed. As someone interested in psychology and mental health, that struck me. Many people now turn to GPT-style models for emotional support, and the usual advice "talk to a friend," "go for a walk" often isn't practical or personal.
                    </p>
                    <p className="text-lg font-medium leading-relaxed text-gray-800 italic">
                        In moments of stress or overwhelm, people often forget the coping strategies that normally work for them. What if an app could remember the specific activities that actually help you, and bring them back when you need them most? Especially during those moments when you forget what's good for you.
                    </p>
                    <p className="leading-relaxed text-gray-600">
                        With only seven days, I validated the idea quickly. I spoke to a few target users and got the same reaction: "Interesting." Enough to proceed with a quick project.
                    </p>
                </div>
            </AnimatedSection>

            {/* Constraints Section */}
            <AnimatedSection delay={0.3} className="mx-auto max-w-4xl space-y-8">
                <div className="space-y-4">
                    <h1 className="text-3xl font-light tracking-tight">Constraints</h1>
                    <div className="h-px w-16 bg-black"></div>
                </div>

                <div className="space-y-6">
                    <p className="leading-relaxed text-gray-600">
                        I built the entire app under heavy limits:
                    </p>
                    <ul className="space-y-3 text-gray-600">
                        <li className="flex items-start space-x-3">
                            <div className="mt-2 h-1 w-1 rounded-full bg-black"></div>
                            <span>7 days from idea to submission</span>
                        </li>
                        <li className="flex items-start space-x-3">
                            <div className="mt-2 h-1 w-1 rounded-full bg-black"></div>
                            <span>zero coding experience</span>
                        </li>
                        <li className="flex items-start space-x-3">
                            <div className="mt-2 h-1 w-1 rounded-full bg-black"></div>
                            <span>one-person team</span>
                        </li>
                        <li className="flex items-start space-x-3">
                            <div className="mt-2 h-1 w-1 rounded-full bg-black"></div>
                            <span>learning APIs, LLMs, debugging, and architecture from scratch</span>
                        </li>
                        <li className="flex items-start space-x-3">
                            <div className="mt-2 h-1 w-1 rounded-full bg-black"></div>
                            <span>strict token limits and rapid iteration cycles</span>
                        </li>
                    </ul>
                </div>
            </AnimatedSection>

            {/* The Plan Section */}
            <AnimatedSection delay={0.4} className="mx-auto max-w-4xl space-y-8">
                <div className="space-y-4">
                    <h2 className="text-2xl font-light tracking-tight">The Plan</h2>
                    <div className="h-px w-16 bg-black"></div>
                </div>

                <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start space-x-3">
                        <div className="mt-2 h-1 w-1 rounded-full bg-black"></div>
                        <span>Let users type or talk .</span>
                    </li>
                    <li className="flex items-start space-x-3">
                        <div className="mt-2 h-1 w-1 rounded-full bg-black"></div>
                        <span>Use basic NLP to detect their emotional state.</span>
                    </li>
                    <li className="flex items-start space-x-3">
                        <div className="mt-2 h-1 w-1 rounded-full bg-black"></div>
                        <span>Show them personalized, saved activities that match how they feel.</span>
                    </li>
                    <li className="flex items-start space-x-3">
                        <div className="mt-2 h-1 w-1 rounded-full bg-black"></div>
                        <span>Add optional AI for deeper interpretation and more nuanced responses.</span>
                    </li>
                    <li className="flex items-start space-x-3">
                        <div className="mt-2 h-1 w-1 rounded-full bg-black"></div>
                        <span>Experiment with detecting cognitive distortions and offering reframes (with low expectations, given how unpredictable AI can be in this space).</span>
                    </li>
                    <li className="flex items-start space-x-3">
                        <div className="mt-2 h-1 w-1 rounded-full bg-black"></div>
                        <span>Explore mood tracking as a future direction.</span>
                    </li>
                </ul>
            </AnimatedSection>

            {/* Building the App Section */}
            <AnimatedSection delay={0.5} className="mx-auto max-w-4xl space-y-8">
                <div className="space-y-4">
                    <h2 className="text-2xl font-light tracking-tight">Building the App</h2>
                    <div className="h-px w-16 bg-black"></div>
                </div>

                <div className="space-y-6">
                    <p className="leading-relaxed text-gray-600">
                        I began with Figma so I wouldn't burn tokens going in circles.
                    </p>
                    <p className="leading-relaxed text-gray-600">
                        Then I used <strong>Bolt.ai</strong> to auto-generate the code structure and UI. I wired it to the Deepgram API and a free LLaMA 8B instruct model despite having zero background in APIs. Google, documentation, and a lot of trial-and-error carried me through.
                    </p>
                    <p className="leading-relaxed text-gray-600">
                        As a designer, I wanted finer control over the interface, so I moved to <strong>Cursor</strong>. Bolt rewrote the entire codebase every time I updated something, which slowed me down. Cursor gave me the freedom to iterate and troubleshoot. Shipping a working app in six days with no prior coding experience felt like a win in itself.
                    </p>
                </div>
            </AnimatedSection>

            {/* Mobile App Demo Section */}
            <AnimatedSection delay={0.55} className="mx-auto max-w-4xl space-y-8" id="app-demo">
                <div className="space-y-4">
                    <h2 className="text-2xl font-light tracking-tight">App Demo</h2>
                    <div className="h-px w-16 bg-black"></div>
                </div>

                <div className="space-y-6">
                    <p className="leading-relaxed text-gray-600">
                        Experience the live mobile app below. The interface is designed to be simple and calming, helping users quickly log their emotional state and receive personalized coping strategies.
                    </p>

                    <div className="flex justify-center items-center py-8">
                        <div className="relative" style={{ width: '375px', height: '760px' }}>
                            {/* Mobile frame border */}
                            <div className="absolute inset-0 rounded-[3rem] border-[14px] border-gray-800 shadow-2xl overflow-hidden bg-white">
                                <iframe
                                    src="https://creative-cactus-89c627.netlify.app"
                                    className="w-full h-full"
                                    title="Reflect Mobile App Demo"
                                    style={{ border: 'none' }}
                                />
                            </div>
                            {/* Mobile notch */}
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-gray-800 rounded-b-3xl z-10"></div>
                        </div>
                    </div>

                    <p className="text-sm text-gray-500 italic text-center">
                        Interactive demo - try exploring the app features
                    </p>
                </div>
            </AnimatedSection>

            {/* Testing the Idea Section */}
            <AnimatedSection delay={0.6} className="mx-auto max-w-4xl space-y-8">
                <div className="space-y-4">
                    <h1 className="text-3xl font-light tracking-tight">Testing the Idea</h1>
                    <div className="h-px w-16 bg-black"></div>
                </div>

                <div className="space-y-6">
                    <p className="leading-relaxed text-gray-600">
                        After the hackathon, I ran usability tests with people who:
                    </p>
                    <ul className="space-y-3 text-gray-600">
                        <li className="flex items-start space-x-3">
                            <div className="mt-2 h-1 w-1 rounded-full bg-black"></div>
                            <span>journal regularly</span>
                        </li>
                        <li className="flex items-start space-x-3">
                            <div className="mt-2 h-1 w-1 rounded-full bg-black"></div>
                            <span>use mental-health tools</span>
                        </li>
                        <li className="flex items-start space-x-3">
                            <div className="mt-2 h-1 w-1 rounded-full bg-black"></div>
                            <span>prefer structured, actionable support</span>
                        </li>
                    </ul>

                    <p className="leading-relaxed text-gray-600">
                        People liked the design and the idea—but those who entered real emotional content said something that changed the direction:
                    </p>

                    <div className="space-y-3 pl-6 border-l-2 border-gray-300">
                        <p className="leading-relaxed text-gray-600 italic">
                            "I don't trust AI with emotional data."
                        </p>
                        <p className="leading-relaxed text-gray-600 italic">
                            "The structure is nice, but the AI part makes me hesitate."
                        </p>
                    </div>

                    <p className="leading-relaxed text-gray-600">
                        So I added an AI toggle right into onboarding and made keyword detection more transparent.
                    </p>

                    <p className="leading-relaxed text-gray-600">
                        Then another pattern emerged:
                    </p>

                    <ul className="space-y-3 text-gray-600">
                        <li className="flex items-start space-x-3">
                            <div className="mt-2 h-1 w-1 rounded-full bg-black"></div>
                            <span>Most of my target users <strong>dislike AI</strong></span>
                        </li>
                        <li className="flex items-start space-x-3">
                            <div className="mt-2 h-1 w-1 rounded-full bg-black"></div>
                            <span>They also care about <strong>productivity, structure, and human connection</strong></span>
                        </li>
                        <li className="flex items-start space-x-3">
                            <div className="mt-2 h-1 w-1 rounded-full bg-black"></div>
                            <span>They want emotional support without emotional surveillance</span>
                        </li>
                    </ul>

                    <p className="leading-relaxed text-gray-600">
                        That insight revealed a new opportunity.
                    </p>
                </div>
            </AnimatedSection>

            {/* What's Next Section */}
            <AnimatedSection delay={0.7} className="mx-auto max-w-4xl space-y-8">
                <div className="space-y-4">
                    <h1 className="text-3xl font-light tracking-tight">What's Next?</h1>
                    <div className="h-px w-16 bg-black"></div>
                </div>

                <div className="space-y-6">
                    <p className="leading-relaxed text-gray-600">
                        Instead of forcing AI to act as an emotional companion, what if the app helped people connect with someone who could motivate them gently and safely?
                    </p>
                    <p className="text-lg font-medium leading-relaxed text-gray-800">
                        A simple, human accountability loop.
                    </p>

                    <div className="space-y-4 pt-4">
                        <h3 className="text-lg font-medium">The Feature Concept:</h3>
                        <ul className="space-y-3 text-gray-600">
                            <li className="flex items-start space-x-3">
                                <div className="mt-2 h-1 w-1 rounded-full bg-black"></div>
                                <span>Users add their tasks or goals</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <div className="mt-2 h-1 w-1 rounded-full bg-black"></div>
                                <span>The system pairs them with a supportive accountability partner</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <div className="mt-2 h-1 w-1 rounded-full bg-black"></div>
                                <span>Each person checks in on the other</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <div className="mt-2 h-1 w-1 rounded-full bg-black"></div>
                                <span>They build consistency together through micro-progress</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </AnimatedSection>

            {/* Key Learnings Section */}
            <AnimatedSection delay={0.8} className="mx-auto max-w-4xl space-y-8">
                <div className="space-y-4">
                    <h1 className="text-3xl font-light tracking-tight">Key Learnings</h1>
                    <div className="h-px w-16 bg-black"></div>
                </div>

                <div className="space-y-6">
                    <div className="space-y-4 text-gray-600">
                        <div className="flex items-start space-x-3">
                            <div className="mt-2 h-1 w-1 rounded-full bg-black"></div>
                            <p className="leading-relaxed"><strong>Ship fast, learn faster:</strong> Building and testing in seven days forced me to prioritize ruthlessly and validate assumptions quickly.</p>
                        </div>
                        <div className="flex items-start space-x-3">
                            <div className="mt-2 h-1 w-1 rounded-full bg-black"></div>
                            <p className="leading-relaxed"><strong>Technical constraints breed creativity:</strong> Limited coding experience and tight deadlines pushed me to find simpler, more elegant solutions.</p>
                        </div>
                        <div className="flex items-start space-x-3">
                            <div className="mt-2 h-1 w-1 rounded-full bg-black"></div>
                            <p className="leading-relaxed"><strong>Human connection over automation:</strong> Sometimes the best technology solution is facilitating human interaction, not replacing it.</p>
                        </div>
                    </div>
                </div>
            </AnimatedSection>
        </div>
    );
};
