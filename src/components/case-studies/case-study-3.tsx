export const CaseStudy3 = () => {
  return (
    <div className="absolute text-base w-full mt-9 text-dark">
      <div className="mx-auto max-w-4xl space-y-12">
        <img src="/images/gistly/image-1.png" alt="iPad Mockup 1.png" className="object-cover w-full h-full rounded-lg" />
        <div className="space-y-3">
          <h1 className="text-2xl font-bold">The problem</h1>
          <p>
            <strong className="font-bold italic">
              Managers need to upload their organization's call auditing templates to Gistly.ai in order to audit agent calls and evaluate whether they meet the quality standards set by the organization.
            </strong>
          </p>
          <p className="mt-2">
            The templates will include specific parameters defined by each organization to ensure that agents are meeting the call quality standards. In a traditional setting without AI, the templates are manually given to call quality
            analysts, who then check each parameter manually. Gistly automates this process using AI and provides scores, transcriptions, and summaries to the organization. To make this possible, the organization needs to create and save
            the template within the platform. The parameters are grouped into categories, and each parameter has a weight. There is also an overall weight for each category. Each parameter needs to be configured individually, which can make
            the process complex.
          </p>
        </div>
        <div className="space-y-3">
          <h1 className="text-2xl font-bold">The solution</h1>
          <p className="mt-2">
            The issue was addressed by conducting UX research, performing task analysis, and genuinely empathizing with the users in order to simplify the process and make it more intuitive. The users' technological expertise, the context
            of the task, and their experience with similar applications such as spreadsheets were taken into account. The tasks were grouped based on their priority.
          </p>
        </div>
        <div className="space-y-3">
          <h1 className="text-2xl font-bold">Now the design process!</h1>
          <p className="mt-2">
            Thee design process at Gistly is influenced by Agile and Lean UX methodologies. It combines the iterative, feedback-driven approach of Agile with the focus on delivering minimal, high-value solutions quickly and efficiently, as
            seen in Lean UX, to ensure continuous improvement and user-centered design. The focus of this process is on delivering a working user-friendly product quickly and iteratively, with regular stakeholder input, and adapting based
            on feedback.
          </p>
        </div>
      </div>
      <div className="w-full space-y-3">
        <img src="/images/gistly/image-2.png" alt="iPad Mockup 1.png" className="object-cover w-full h-full rounded-lg" />
        <span className="block text-center text-base dd font-light italic">Diagrammatic Representation of Gistly's UX Process</span>
      </div>
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">The problem</h1>
        <p>
          <strong className="font-bold italic">
            Managers need to upload their organization's call auditing templates to Gistly.ai in order to audit agent calls and evaluate whether they meet the quality standards set by the organization.
          </strong>
        </p>
        <p className="mt-2">
          The templates will include specific parameters defined by each organization to ensure that agents are meeting the call quality standards. In a traditional setting without AI, the templates are manually given to call quality
          analysts, who then check each parameter manually. Gistly automates this process using AI and provides scores, transcriptions, and summaries to the organization. To make this possible, the organization needs to create and save the
          template within the platform. The parameters are grouped into categories, and each parameter has a weight. There is also an overall weight for each category. Each parameter needs to be configured individually, which can make the
          process complex.
        </p>
      </div>
    </div>
  );
};
