import goal from "/images/serenity/icons/goal.svg";
import mindMap from "/images/serenity/icons/mind-map.svg";

export const CaseStudy2 = () => {
  return (
    <div className="mt-9 w-full space-y-12 text-base text-dark">
      <div className="mx-auto max-w-4xl space-y-12">
        <section className="flex w-full flex-col justify-between space-y-6 sm:flex-row">
          <div className="flex flex-col space-y-12 sm:w-2/3">
            <div>
              <img src={mindMap} alt="Mind Map" />
              <h1 className="mt-6 text-2xl font-bold">The problem</h1>
              <p className="mt-3">Gallery visitors having hard time in finding artist info, saving it and keeping up with events.</p>
            </div>
            <div>
              <img src={goal} alt="Goal" />
              <h1 className="mt-6 text-2xl font-bold">The Goal</h1>
              <p className="mt-3">Design an app for the gallery where the visitors can quickly scan artwork to know about the artwork and the artists and add them to favorites.</p>
            </div>
          </div>
          <div>
            <img src="/images/serenity/aif-1.gif" alt="iPad Mockup 1.png" className="h-[25rem] object-contain" />
          </div>
        </section>
        <section className="space-y-3">
          <h1 className="text-2xl font-bold">Understanding the user</h1>
          <p>
            A primary user group identified through research was art enthusiasts who visited the gallery. I interviewed five art enthusiasts who had visited various art galleries, including individuals from diverse backgrounds. I created
            empathy maps to understand the users I'm designing for and their needs. A primary user group identified through research was art enthusiasts who visited the gallery. Often gallery visitors feel frustrated when they are not able
            to know more about the artworks and artists displayed in the gallery. As a gallery that supports emerging artists, the info available on this is inadequate.
          </p>

          <ol className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {data.map((item, index) => (
              <li key={index} className="flex flex-col gap-5 rounded-4xl bg-accent-quaternary p-5">
                <span className="flex size-7 items-center justify-center rounded-full border border-solid font-bold">{item.id}</span>
                <p className="font-normal">{item.description}</p>
              </li>
            ))}
          </ol>
        </section>
        <section className="space-y-3">
          <img src="/images/serenity/image-1.png" alt="Image 1" className="w-full object-contain" />
          <div>
            <h1 className="text-base font-bold">Problem statement:</h1>
            <p>Dana Walter is an English literature student who needs to contact an artist because she needs to organize an event at her university.</p>
          </div>
        </section>
      </div>
      <section className="mx-auto max-w-[950px]">
        <img src="/images/serenity/image-2.png" alt="Image 2" className="w-full object-contain" />
      </section>
      <section className="mx-auto max-w-4xl space-y-12">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold">Ideation phase</h1>
          <div className="space-y-3">
            <p>
              How do other galleries approach this challenge? I conducted a comprehensive competitive audit to find this out. Galleries such as Tate Modern and Whitechapel Gallery, both based in London, have websites featuring blogs, artist
              information, and various other features to promote their artists and events. Based on the audit, I created a competitive audit report to identify gaps and opportunities.{" "}
            </p>
            <p>
              Notably, there are no prominent art galleries with a dedicated artist bio app. Smartify is an application that enables users to scan artwork worldwide for information and is widely popular among art enthusiasts, but many
              reviews claim it's not accurate. A modern gallery could make use of a scanning feature for the artworks presented within the gallery, which may allow for more accurate scan results. As our target audience is more open-minded
              to new things like emerging artists and artworks and proficient in technology, we could provide a specific artist bio app for the gallery that addresses all the pain points.{" "}
            </p>
            <p>I created big-picture and close-up storyboards to further develop my idea.</p>
          </div>
          <img src="/images/serenity/image-3.png" alt="Image 3" className="w-full object-contain" />
          <img src="/images/serenity/image-4.png" alt="Image 4" className="w-full object-contain" />
        </div>
        <div className="space-y-3">
          <h1 className="text-2xl font-bold">The Design phase</h1>
          <p>I created basic paper wireframes, with a focus on layout and structure. I made five variations for each page. I marked the features I wanted to include with a star and created a final version based on this.</p>
          <img src="/images/serenity/image-5.png" alt="Image 5" className="w-full object-contain" />
          <span className="block text-center italic">User-flow diagram</span>
        </div>
        <div className="space-y-3">
          <img src="/images/serenity/image-6.png" alt="Image 5" className="w-full object-contain" />
          <span className="block text-center italic">Paper wireframes</span>
        </div>
        <div className="space-y-3">
          <p>After deciding on the layout and structure, I used Figma to create lo-fi designs. After finishing the wireframes, I created a Lo-Fi prototype to test it out.</p>
          <img src="/images/serenity/aif-2.gif" alt="Image 5" className="w-full object-contain" />
        </div>
        <div className="space-y-6">
          <div className="space-y-3">
            <h1 className="text-2xl font-bold">The Testing phase</h1>
            <div>
              A usability testing was conducted with 5 participants to validate the designs. I asked to participants to follow the prompts while I recorded the observations. System Usability scale was incorporated into a Google form and
              provided at the end of the session. See my UX Research Study Plan here.
              <br />I analyzed various responses from the participants to identify various patterns and derive insights from them.
              <br />I iterated on my designs to solve these usability issues.
              <ol className="list-inside list-decimal">
                <li>
                  I decided to include labels for the navigation options, making the scan feature easier to discover from the homepage. To ensure the users are able to find the saved profiles easily, I added a favorites nav button with a
                  clear label.
                </li>
                <li>The Artist Bio app is unique, and users require an introduction to its features. Therefore, I incorporated an onboarding screen featuring illustrations to explain the various app features.</li>
              </ol>
            </div>
          </div>
          <img src="/images/serenity/image-7.png" alt="Image 5" className="w-full object-contain" />
          <p>
            Above is the redesign of the homepage after the usability study. The redesign aims for a more personalized homepage, with a focus on promoting more artists to meet the goals of the art gallery, including additional details, and
            making better use of the space without cluttering the interface.
          </p>
        </div>
        <div className="space-y-3">
          <h1 className="text-2xl font-bold">High-Fidelity Designs</h1>
          <p>After iterating on the low-fidelity prototype, I moved to high-fidelity designs. I chose a calming color palette and the simple, clean font Lato for styling.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl">
        <img src="/images/serenity/image-8.png" alt="Image 5" className="w-full object-contain" />
      </section>
      <section className="max-w-screen -mx-6">
        <img src="/images/serenity/image-9.svg" alt="Image 5" className="w-full object-contain" />
      </section>
      <section className="mx-auto max-w-sm">
        <img src="/images/serenity/aif-3.gif" alt="Image 5" className="w-full object-contain" />
        <span className="block text-center italic">High Fidelity Prototype</span>
      </section>
      <section className="mx-auto max-w-4xl space-y-12">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold">Accessibility considerations</h1>
          <ol className="grid gap-6 sm:grid-cols-3">
            {data2.map((item, index) => (
              <li key={index} className="flex flex-col gap-5 rounded-4xl bg-accent-quinary p-5">
                <span className="flex size-7 items-center justify-center rounded-full border border-solid border-black font-bold">{item.id}</span>
                <p className="font-normal">{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="space-y-3">
          <h1 className="text-2xl font-bold">Design Critique session</h1>
          <p>
            I participated in a design critique session that included heuristic evaluation and predictive evaluation from a design community group that I am a part of. The session illuminated both the successes and areas that required more
            work. I made minor changes to font sizes and opacity based on the feedback received. I had included a "work in progress" page connected to features that were still under development. The critique session made me reconsider, as
            it could be quite distracting to test participants. I scaled it down to a small popup with an easily clickable close button.
          </p>
        </div>
        <div className="space-y-3">
          <h1 className="text-2xl font-bold">Impact and Takeaways</h1>
          <div className="space-y-6">
            <p>Here are some reviews I got:</p>
            <p>"I love the scan functionality! It's going to make gallery visits so much more interesting."</p>
            <p>"The colors are so pleasing in your app!"</p>
            <p>
              This was my first project where I engaged with a diverse group of people to genuinely understand their needs and pain points. It was an enlightening experience to bridge the gap between what I assumed the users might need and
              what they actually wanted. I learned the significance of thorough research in the early stages of the project. It's essential to do a solid research during the beginning stages -foundational research to understand user needs
              better. Making major changes to the designs later especially during the later phases can be expensive and time consuming. Since there were no artist bio apps in the market, conducting a competitive audit was challenging, but
              it presented an opportunity to offer something unique and valuable. Overall, this project was an exciting learning experience for me.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

const data = [
  {
    id: 1,
    description: "Users often find artworks that move them, but easily forget about them after they leave the gallery",
  },
  {
    id: 2,
    description: "Finding verified information about new artists is challenging",
  },
  {
    id: 3,
    description: "Users find keeping track of the events of their favorite artists difficult",
  },
  {
    id: 4,
    description: "Users are unable to express their appreciation and connect with others.",
  },
];

const data2 = [
  {
    id: 1,
    description: "Added ALT texts for artworks and images",
  },
  {
    id: 2,
    description: "Followed WCAG guidelines on color contrast",
  },
  {
    id: 3,
    description: "Added text to bottom navigation options for the screen reading feature.",
  },
];
