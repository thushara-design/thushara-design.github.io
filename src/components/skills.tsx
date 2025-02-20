import { skills } from "@/data";

export const Skills = () => {
  const renderSkills = (skills: string[]) => {
    if (!skills) return null;
    return skills.map((skill) => (
      <li key={skill} className="rounded-sm border border-solid border-border px-4 py-3">
        {skill}
      </li>
    ));
  };

  return (
    <section id="skills" className="space-y-6">
      <h2 className="text-2xl font-bold text-dark">Skills and expertise</h2>
      <ul className="flex flex-wrap gap-2.5">{renderSkills(skills)}</ul>
    </section>
  );
};
