import { AnimatedSection } from "../animated-section";

export const CaseStudy2 = () => {
  return (
    <div className="mx-auto mt-16 w-full max-w-5xl space-y-24 text-base text-black">
      {/* Problem Section */}
      <AnimatedSection delay={0.1} className="mx-auto max-w-4xl space-y-8 mt-16">
        <div className="space-y-4">
          <h1 className="text-3xl font-light tracking-tight">The Problem</h1>
          <div className="h-px w-16 bg-black"></div>
        </div>
        
        <div className="space-y-6">
          <p className="text-lg font-medium leading-relaxed text-gray-800">
            Gallery visitors having hard time in finding artist info, saving it and keeping up with events.
          </p>
          <p className="leading-relaxed text-gray-600">
            People often find breathtaking artworks in various art galleries but spend hours getting enough info on the artist of the artwork, especially if they are new artists. This app has all the verified info on the artist including a biography, details on other works, social media accounts, personal websites, and info on events and exhibitions.
          </p>
        </div>
      </AnimatedSection>

      {/* Goal Section */}
      <AnimatedSection delay={0.2} className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-light tracking-tight">The Goal</h1>
          <div className="h-px w-16 bg-black"></div>
        </div>
        
        <div className="space-y-6">
          <p className="text-lg font-medium leading-relaxed text-gray-800">
            Design an app for the gallery where the visitors can quickly scan artwork to know about the artwork and the artists and add them to favorites.
          </p>
        </div>

        <div className="mt-8">
          <img src="/images/serenity/aif-1.gif" alt="iPad Mockup 1.png" className="h-[25rem] object-contain" />
        </div>
      </AnimatedSection>

      {/* User Research Section */}
      <AnimatedSection delay={0.3} className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-light tracking-tight">Understanding the Users</h1>
          <div className="h-px w-16 bg-black"></div>
        </div>
        
        <div className="space-y-6">
          <p className="text-lg font-medium leading-relaxed text-gray-800">
            A primary user group identified through research was art enthusiasts who visited the gallery. I interviewed five art enthusiasts who had visited various art galleries, including individuals from diverse backgrounds.
          </p>
          <p className="leading-relaxed text-gray-600">
            I created empathy maps to understand the users I'm designing for and their needs. Often gallery visitors feel frustrated when they are not able to know more about the artworks and artists displayed in the gallery. As a gallery that supports emerging artists, the info available on this is inadequate.
          </p>
        </div>

        {/* User Pain Points */}
        <div className="grid grid-cols-1 gap-8 pt-8 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Key Pain Points</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start space-x-3">
                <div className="mt-2 h-1 w-1 rounded-full bg-black"></div>
                <span>Users often find artworks that move them, but easily forget about them after they leave the gallery</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="mt-2 h-1 w-1 rounded-full bg-black"></div>
                <span>Finding verified information about new artists is challenging</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="mt-2 h-1 w-1 rounded-full bg-black"></div>
                <span>Users find keeping track of the events of their favorite artists difficult</span>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">User Persona</h3>
            <div className="space-y-3 text-gray-600">
              <p className="font-medium text-gray-800">Dana Walter</p>
              <p className="leading-relaxed">English literature student who needs to contact an artist because she needs to organize an event at her university.</p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Research Insights */}
      <AnimatedSection delay={0.4} className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-light tracking-tight">Research Insights</h1>
          <div className="h-px w-16 bg-black"></div>
        </div>
        
        <div className="space-y-6">
          <img src="/images/serenity/image-1.png" alt="Research Insights" className="w-full object-contain" />
          <img src="/images/serenity/image-2.png" alt="User Journey" className="w-full object-contain" />
        </div>
      </AnimatedSection>

      {/* Ideation Phase */}
      <AnimatedSection delay={0.5} className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-light tracking-tight">Ideation Phase</h1>
          <div className="h-px w-16 bg-black"></div>
        </div>
        
        <div className="space-y-6">
          <p className="text-lg font-medium leading-relaxed text-gray-800">
            How do other galleries approach this challenge? I conducted a comprehensive competitive audit to find this out.
          </p>
          <p className="leading-relaxed text-gray-600">
            Galleries such as Tate Modern and Whitechapel Gallery, both based in London, have websites featuring blogs, artist information, and various other features to promote their artists and events. Based on the audit, I created a competitive audit report to identify gaps and opportunities.
          </p>
          <p className="leading-relaxed text-gray-600">
            Notably, there are no prominent art galleries with a dedicated artist bio app. Smartify is an application that enables users to scan artwork worldwide for information and is widely popular among art enthusiasts, but many reviews claim it's not accurate. A modern gallery could make use of a scanning feature for the artworks presented within the gallery, which may allow for more accurate scan results.
          </p>
        </div>

        <div className="space-y-6 mt-8">
          <img src="/images/serenity/image-3.png" alt="Storyboards" className="w-full object-contain" />
          <img src="/images/serenity/image-4.png" alt="User Journey" className="w-full object-contain" />
          <span className="block text-center text-sm text-gray-500 italic">
            Big-picture and close-up storyboards
          </span>
        </div>
      </AnimatedSection>

      {/* Design Process */}
      <AnimatedSection delay={0.6} className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-light tracking-tight">Design Process</h1>
          <div className="h-px w-16 bg-black"></div>
        </div>
        
        <div className="space-y-6">
          <p className="text-lg font-medium leading-relaxed text-gray-800">
            I created basic paper wireframes, with a focus on layout and structure. I made five variations for each page and marked the features I wanted to include with a star.
          </p>
        </div>

        <div className="space-y-6 mt-8">
          <img src="/images/serenity/image-5.png" alt="User Flow Diagram" className="w-full object-contain" />
          <span className="block text-center text-sm text-gray-500 italic">
            User-flow diagram
          </span>
        </div>

        <div className="space-y-6 mt-8">
          <img src="/images/serenity/image-6.png" alt="Paper Wireframes" className="w-full object-contain" />
          <span className="block text-center text-sm text-gray-500 italic">
            Paper wireframes
          </span>
        </div>
      </AnimatedSection>

      {/* Low-Fidelity Prototyping */}
      <AnimatedSection delay={0.7} className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-light tracking-tight">Low-Fidelity Prototyping</h1>
          <div className="h-px w-16 bg-black"></div>
        </div>
        
        <div className="space-y-6">
          <p className="leading-relaxed text-gray-600">
            After deciding on the layout and structure, I used Figma to create lo-fi designs. After finishing the wireframes, I created a Lo-Fi prototype to test it out.
          </p>
        </div>

        <div className="mt-8">
          <img src="/images/serenity/aif-2.gif" alt="Low Fidelity Prototype" className="w-full object-contain" />
        </div>
      </AnimatedSection>

      {/* Usability Testing */}
      <AnimatedSection delay={0.8} className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-light tracking-tight">Usability Testing</h1>
          <div className="h-px w-16 bg-black"></div>
        </div>
        
        <div className="space-y-6">
          <p className="text-lg font-medium leading-relaxed text-gray-800">
            A usability testing was conducted with 5 participants to validate the designs. I asked participants to follow the prompts while I recorded the observations.
          </p>
          <p className="leading-relaxed text-gray-600">
            System Usability scale was incorporated into a Google form and provided at the end of the session. I analyzed various responses from the participants to identify various patterns and derive insights from them.
          </p>
        </div>

        <div className="space-y-6 mt-8">
          <h3 className="text-lg font-medium">Key Improvements Made</h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start space-x-3">
              <div className="mt-2 h-1 w-1 rounded-full bg-black"></div>
              <span>I decided to include labels for the navigation options, making the scan feature easier to discover from the homepage</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="mt-2 h-1 w-1 rounded-full bg-black"></div>
              <span>To ensure the users are able to find the saved profiles easily, I added a favorites nav button with a clear label</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="mt-2 h-1 w-1 rounded-full bg-black"></div>
              <span>The Artist Bio app is unique, and users require an introduction to its features. Therefore, I incorporated an onboarding screen featuring illustrations to explain the various app features</span>
            </li>
          </ul>
        </div>

        <div className="space-y-4 mt-8">
          <img src="/images/serenity/image-7.png" alt="Redesigned Homepage" className="w-full object-contain" />
          <p className="text-sm text-gray-500 italic text-center">
            Redesigned homepage after usability study - more personalized with focus on promoting artists
          </p>
        </div>
      </AnimatedSection>

      {/* High-Fidelity Designs */}
      <AnimatedSection delay={0.9} className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-light tracking-tight">High-Fidelity Designs</h1>
          <div className="h-px w-16 bg-black"></div>
        </div>
        
        <div className="space-y-6">
          <p className="text-lg font-medium leading-relaxed text-gray-800">
            After iterating on the low-fidelity prototype, I moved to high-fidelity designs. I chose a calming color palette and the simple, clean font Lato for styling.
          </p>
        </div>

        <div className="space-y-6 mt-8">
          <img src="/images/serenity/image-8.png" alt="High Fidelity Designs" className="w-full object-contain" />
        </div>

        <div className="space-y-6 mt-8">
          <img src="/images/serenity/image-9.svg" alt="Design System" className="w-full object-contain" />
        </div>

        <div className="space-y-4 mt-8">
          <img src="/images/serenity/aif-3.gif" alt="High Fidelity Prototype" className="mx-auto max-w-sm object-contain" />
          <span className="block text-center text-sm text-gray-500 italic">
            High Fidelity Prototype
          </span>
        </div>
      </AnimatedSection>

      {/* Accessibility */}
      <AnimatedSection delay={1.0} className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-light tracking-tight">Accessibility Considerations</h1>
          <div className="h-px w-16 bg-black"></div>
        </div>
        
        <div className="grid grid-cols-1 gap-8 pt-8 md:grid-cols-3">
          <div className="space-y-4 text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-lg font-bold text-black">1</span>
            </div>
            <h3 className="font-medium">ALT Texts</h3>
            <p className="text-sm text-gray-600">Added ALT texts for artworks and images</p>
          </div>
          <div className="space-y-4 text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-lg font-bold text-black">2</span>
            </div>
            <h3 className="font-medium">Color Contrast</h3>
            <p className="text-sm text-gray-600">Followed WCAG guidelines on color contrast</p>
          </div>
          <div className="space-y-4 text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-lg font-bold text-black">3</span>
            </div>
            <h3 className="font-medium">Screen Reading</h3>
            <p className="text-sm text-gray-600">Added text to bottom navigation options for screen reading feature</p>
          </div>
        </div>
      </AnimatedSection>

      {/* Design Critique */}
      <AnimatedSection delay={1.1} className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-light tracking-tight">Design Critique Session</h1>
          <div className="h-px w-16 bg-black"></div>
        </div>
        
        <div className="space-y-6">
          <p className="leading-relaxed text-gray-600">
            I participated in a design critique session that included heuristic evaluation and predictive evaluation from a design community group that I am a part of. The session illuminated both the successes and areas that required more work.
          </p>
          <p className="leading-relaxed text-gray-600">
            I made minor changes to font sizes and opacity based on the feedback received. I had included a "work in progress" page connected to features that were still under development. The critique session made me reconsider, as it could be quite distracting to test participants. I scaled it down to a small popup with an easily clickable close button.
          </p>
        </div>
      </AnimatedSection>

      {/* Key Learnings */}
      <AnimatedSection delay={1.2} className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-light tracking-tight">Key Learnings</h1>
          <div className="h-px w-16 bg-black"></div>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-4 text-gray-600">
            <div className="flex items-start space-x-3">
              <div className="mt-2 h-1 w-1 rounded-full bg-black"></div>
              <p className="leading-relaxed"><strong>User feedback is invaluable:</strong> "I love the scan functionality! It's going to make gallery visits so much more interesting."</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="mt-2 h-1 w-1 rounded-full bg-black"></div>
              <p className="leading-relaxed"><strong>Design choices matter:</strong> "The colors are so pleasing in your app!"</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="mt-2 h-1 w-1 rounded-full bg-black"></div>
              <p className="leading-relaxed"><strong>Research is foundational:</strong> This was my first project where I engaged with a diverse group of people to genuinely understand their needs and pain points. It was an enlightening experience to bridge the gap between what I assumed the users might need and what they actually wanted.</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="mt-2 h-1 w-1 rounded-full bg-black"></div>
              <p className="leading-relaxed"><strong>Early research prevents costly changes:</strong> It's essential to do solid research during the beginning stages - foundational research to understand user needs better. Making major changes to the designs later especially during the later phases can be expensive and time consuming.</p>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};



