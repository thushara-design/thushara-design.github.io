import { AnimatedSection } from "../components/animated-section";
import { Seo } from "../components/Seo";
import { socialLinks } from "../data";
import ElegantLinkedin from "../assets/elegant-linkedin";
import ElegantMail from "../assets/elegant-mail";
import { navLinks } from "../data";
import { Header } from "../components/header";
import { profile } from "../assets/images";

export const AboutMe = () => {
    const linkedinLink = socialLinks.find((link) => link.label === "Linkedin")?.link;
    const emailLink = socialLinks.find((link) => link.label === "Email")?.link;
    const pinterestLink = socialLinks.find((link) => link.label === "Pinterest")?.link;
    const resumeLink = navLinks.find((link) => link.label === "Resume")?.link;

    return (
        <div className="min-h-screen bg-white">
            <Seo
                title="About Me | Thushara"
                description="Learn more about Thushara, a Product Designer (UX/UI)."
                url="https://thushara-design.github.io/about"
                robots="noindex"
            />
            <Header />
            <main className="container mx-auto max-w-7xl px-6 pt-32 pb-24">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Left Column: Profile & About */}
                    <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit space-y-8">
                        <div className="relative w-64 h-64 mx-auto lg:mx-0">
                            {/* Outer Ring */}
                            <div className="absolute -inset-4 animate-spin-slow rounded-full ring-1 ring-dark">
                                {/* Rotating Dots */}
                                <div className="absolute -top-2 left-1/2 size-3.5 -translate-x-1/2 rounded-full border border-black/5 bg-accent-primary" />
                                <div className="absolute left-1 top-1/3 size-3.5 -translate-x-1/2 rounded-full border border-black/5 bg-accent-secondary" />
                            </div>

                            {/* Profile Image */}
                            <img
                                src={profile}
                                alt="Profile"
                                className="w-full h-full rounded-full border-4 border-white object-cover"
                            />
                        </div>

                        <div className="space-y-6 text-center lg:text-left">
                            <h1 className="text-3xl font-medium text-ag-dark">Hi there,</h1>

                            <p className="text-lg leading-relaxed text-ag-grey">
                                I'm Thushara, a Product designer (UX/UI) focused on creating intuitive digital experiences that feel effortless and meaningful. My approach combines simplicity, clarity, and usability along with accessibility while ensuring that the design not only meets user needs but also supports business goals.
                                <br /><br />
                                With a deep interest in psychology and empathetic design, I enjoy transforming complex ideas into simple, user-centered solutions.
                            </p>

                            <div className="flex items-center justify-center lg:justify-start gap-4">
                                <a
                                    href={linkedinLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center justify-center w-12 h-12 rounded-full border border-ag-border hover:border-ag-grey hover:bg-ag-bg-light transition-all duration-200"
                                    aria-label="Connect on LinkedIn"
                                >
                                    <ElegantLinkedin className="w-5 h-5 text-ag-grey group-hover:text-ag-dark transition-colors duration-200" />
                                </a>
                                <a
                                    href={emailLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center justify-center w-12 h-12 rounded-full border border-ag-border hover:border-ag-grey hover:bg-ag-bg-light transition-all duration-200"
                                    aria-label="Send email"
                                >
                                    <ElegantMail className="w-5 h-5 text-ag-grey group-hover:text-ag-dark transition-colors duration-200" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Bento Grid */}
                    <div className="lg:w-2/3 space-y-16">
                        {/* Professional Work Section */}
                        <AnimatedSection id="about-me-grid" className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-[minmax(180px,auto)]">

                            {/* Row 1: Product Design & Resume */}
                            {/* Product Design */}
                            <a
                                href="/#case-studies"
                                className="group p-8 rounded-4xl bg-white border border-ag-border hover:border-ag-blue/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full"
                            >
                                <div>
                                    <div className="w-12 h-12 rounded-lg bg-gray-900 flex items-center justify-center mb-4">
                                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-medium text-ag-dark mb-3">Product Design</h3>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">UX</span>
                                        <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">UI</span>
                                        <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">Design Thinking</span>
                                        <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">Research</span>
                                    </div>
                                    <p className="text-ag-grey text-sm truncate">View Case Studies</p>
                                </div>
                            </a>

                            {/* Resume */}
                            <a
                                href={resumeLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-8 rounded-4xl bg-white border border-ag-border hover:border-ag-blue/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full"
                            >
                                <div className="w-full h-full flex flex-col">
                                    <div className="flex-1 w-full bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4 relative overflow-hidden group-hover:border-ag-blue/20 transition-colors">
                                        {/* Mini Resume Preview */}
                                        <div className="w-1/3 h-2 bg-gray-200 rounded mb-2"></div>
                                        <div className="w-full h-px bg-gray-200 mb-2"></div>
                                        <div className="space-y-1">
                                            <div className="w-3/4 h-1.5 bg-gray-200 rounded"></div>
                                            <div className="w-full h-1.5 bg-gray-100 rounded"></div>
                                            <div className="w-5/6 h-1.5 bg-gray-100 rounded"></div>
                                        </div>
                                        <div className="mt-3 space-y-1">
                                            <div className="w-1/2 h-1.5 bg-gray-200 rounded"></div>
                                            <div className="w-full h-1.5 bg-gray-100 rounded"></div>
                                            <div className="w-4/5 h-1.5 bg-gray-100 rounded"></div>
                                        </div>

                                        {/* PDF Badge */}
                                        <div className="absolute bottom-2 right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">PDF</div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-medium text-ag-dark mb-1">Resume</h3>
                                        <p className="text-ag-grey text-sm">drive.google.com</p>
                                    </div>
                                </div>
                            </a>

                            {/* Row 2: Visual Design Samples */}
                            <div className="group relative p-8 rounded-4xl bg-white border border-ag-border hover:border-ag-blue/30 hover:shadow-lg transition-all duration-300 flex flex-col gap-6 md:col-span-2 row-span-2">
                                <div>
                                    <div className="w-12 h-12 rounded-lg bg-gray-900 flex items-center justify-center mb-4">
                                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-medium text-ag-dark mb-3">Visual design samples</h3>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">Social Media Templates</span>
                                        <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">Branding</span>
                                        <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">Web Design</span>
                                    </div>
                                </div>

                                <div style={{
                                    position: 'relative',
                                    width: '100%',
                                    height: 0,
                                    paddingTop: '60.0781%',
                                    paddingBottom: 0,
                                    boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
                                    marginTop: '1.6em',
                                    marginBottom: '0.9em',
                                    overflow: 'hidden',
                                    borderRadius: '8px',
                                    willChange: 'transform'
                                }}>
                                    <iframe
                                        loading="lazy"
                                        style={{
                                            position: 'absolute',
                                            width: '100%',
                                            height: '100%',
                                            top: 0,
                                            left: 0,
                                            border: 'none',
                                            padding: 0,
                                            margin: 0
                                        }}
                                        src="https://www.canva.com/design/DAE-th9PWbU/S2C2tXYCEC5Qut6_Y3jkHw/view?embed"
                                        allowFullScreen
                                        allow="fullscreen"
                                        title="Visual Design Samples"
                                    >
                                    </iframe>
                                </div>
                                <a
                                    href="https://www.canva.com/design/DAE-th9PWbU/S2C2tXYCEC5Qut6_Y3jkHw/view?utm_content=DAE-th9PWbU&utm_campaign=designshare&utm_medium=embeds&utm_source=link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-ag-grey hover:underline"
                                >
                                    CANVA (712 × 430px) (1280 × 769px) by Mellow Templates
                                </a>
                            </div>

                            {/* Row 3: Children's Book */}
                            <a
                                href="https://www.behance.net/thusharavarghese"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative p-8 rounded-4xl bg-white border border-ag-border hover:border-ag-blue/30 hover:shadow-lg transition-all duration-300 md:col-span-2 overflow-hidden min-h-[250px] flex items-center"
                            >
                                {/* Left: Content */}
                                <div className="relative z-10 flex flex-col justify-between h-full max-w-[50%]">
                                    <div className="space-y-6">
                                        {/* Behance Logo */}
                                        <div className="w-12 h-12 rounded-lg bg-black flex items-center justify-center text-white font-bold text-lg">
                                            Bē
                                        </div>

                                        {/* Heading */}
                                        <h3 className="text-xl font-medium text-ag-dark">Illustration</h3>

                                        {/* Book Link */}
                                        <a
                                            href="https://www.waterstones.com/book/jovee-goes-to-rameshwaram/jordan-gupta/veer-raj-gupta/9798267333535"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="inline-flex items-center gap-1 text-sm text-ag-grey hover:text-ag-dark transition-colors border-b border-dotted border-ag-grey/50 hover:border-ag-dark pb-0.5 w-fit"
                                        >
                                            Here's a book I illustrated recently
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </a>
                                    </div>

                                    {/* Behance Button */}
                                    <div className="inline-flex items-center justify-center px-6 py-2 bg-black text-white rounded-full text-sm font-medium w-fit hover:bg-gray-800 transition-colors">
                                        Go to Behance
                                    </div>
                                </div>

                                {/* Right: Book Image */}
                                <div className="absolute right-8 top-0 bottom-0 h-full w-auto flex items-center">
                                    <img
                                        src="/images/children's book.png"
                                        alt="Jovee Goes to Rameshwaram Book Cover"
                                        className="h-full w-auto object-contain"
                                    />
                                </div>
                            </a>

                            {/* Row 4: Design Journey */}
                            <div className="group p-8 rounded-4xl bg-white border border-ag-border hover:border-ag-blue/30 hover:shadow-lg transition-all duration-300 md:col-span-2">
                                <div className="flex items-start gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-medium text-ag-dark">My design journey</h3>
                                </div>

                                <div className="space-y-4 text-ag-grey leading-relaxed">
                                    <p>
                                        I've always been drawn to creative problem-solving, exploring ideas, building things, and turning concepts into something real. I started designing during the pandemic, when I created a{" "}
                                        <a
                                            href="https://inkandpaint267109409.wordpress.com/about-us/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-ag-dark hover:text-ag-blue transition-colors border-b border-dotted border-ag-grey/50 hover:border-ag-blue"
                                        >
                                            small blog
                                        </a>
                                        {" "}with a friend and taught myself WordPress and Inkscape to build the site and logo.
                                    </p>

                                    <p>
                                        While studying psychology, I freelanced as a designer and illustrator, which introduced me to visual communication and user-focused thinking. My interest in Gestalt psychology pushed me toward formal UX training, leading me to complete the Google UX Certification and the Human–Computer Interaction course from Georgia Tech.
                                    </p>

                                    <p>
                                        Since then, I've worked with small teams, startups, and volunteer groups, applying psychology, research, and design to create clear, simple and thoughtful user experiences. This blend of psychology and design continues to shape how I understand people and build with intention.
                                    </p>
                                </div>
                            </div>

                        </AnimatedSection>

                        {/* Life & Inspiration Section */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-px bg-ag-border"></div>
                                <h2 className="text-sm font-medium text-ag-dark tracking-widest uppercase">Life & Inspiration</h2>
                                <div className="flex-1 h-px bg-ag-border"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-[minmax(180px,auto)]">
                                {/* Spotify Playlist */}
                                <a
                                    href="https://open.spotify.com/playlist/6CBBoSxUWLFCM6MIwiboJE"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group p-8 rounded-4xl bg-white border border-ag-border hover:border-ag-blue/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between md:col-span-1"
                                >
                                    <div>
                                        <div className="w-12 h-12 rounded-full bg-[#1DB954] flex items-center justify-center mb-4">
                                            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-medium text-ag-dark">My Playlist</h3>
                                        <p className="text-ag-grey text-sm mt-1">open.spotify.com</p>
                                    </div>
                                </a>

                                {/* Quote */}
                                <div className="p-8 rounded-4xl bg-white border border-ag-border flex flex-col justify-center md:col-span-1">
                                    <div className="text-4xl font-serif text-ag-dark mb-4">"</div>
                                    <blockquote className="text-2xl font-medium text-ag-dark italic mb-2">
                                        Simplicity is the ultimate sophistication.
                                    </blockquote>
                                    <cite className="text-ag-grey not-italic">— Leonardo da Vinci</cite>
                                </div>

                                {/* Patterns */}
                                <a
                                    href={pinterestLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group p-8 rounded-4xl bg-white border border-ag-border hover:border-ag-blue/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between md:col-span-1"
                                >
                                    <div>
                                        <div className="w-12 h-12 rounded-full bg-white border border-ag-border flex items-center justify-center mb-4">
                                            <svg className="w-6 h-6 text-[#E60023]" viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.399.165-1.495-.69-2.433-2.852-2.433-4.587 0-3.728 2.708-7.152 7.847-7.152 4.127 0 7.333 2.944 7.333 6.883 0 4.108-2.572 7.418-6.143 7.418-1.198 0-2.325-.62-2.711-1.356l-.736 2.802c-.268 1.035-.996 2.323-1.486 3.112 1.124.346 2.305.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.62 0 12.017 0z" /></svg>
                                        </div>
                                        <h3 className="text-lg font-medium text-ag-dark">Patterns</h3>
                                        <p className="text-ag-grey text-sm mt-1">in.pinterest.com</p>
                                    </div>
                                </a>

                                {/* LinkedIn */}
                                <a
                                    href={linkedinLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group p-8 rounded-4xl bg-[#F1F5F9] border border-transparent hover:border-ag-blue/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between md:col-span-1"
                                >
                                    <div>
                                        <div className="w-12 h-12 rounded-lg bg-[#0A66C2] flex items-center justify-center mb-4">
                                            <ElegantLinkedin className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-lg font-medium text-ag-dark">Let's connect on LinkedIn</h3>
                                        <p className="text-ag-grey text-sm mt-1">linkedin.com</p>
                                    </div>
                                </a>

                                {/* Email */}
                                <a
                                    href={emailLink}
                                    className="group p-8 rounded-4xl bg-white border border-ag-border hover:border-ag-blue/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between md:col-span-1"
                                >
                                    <div>
                                        <div className="w-12 h-12 rounded-xl border border-ag-border flex items-center justify-center mb-4 bg-white">
                                            <ElegantMail className="w-5 h-5 text-ag-dark" />
                                        </div>
                                        <h3 className="text-lg font-medium text-ag-dark">Send me a message</h3>
                                        <p className="text-ag-grey text-sm mt-1">gmail.com</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
