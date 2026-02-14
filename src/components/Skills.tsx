import { Code2, Database, Layout, Server, Smartphone, Wrench } from 'lucide-react';

const skillCategories = [
  {
    title: 'Frontend',
    icon: Layout,
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'HTML/CSS', 'JavaScript'],
  },
  {
    title: 'Backend',
    icon: Server,
    skills: ['Node.js', 'Express', 'Python', 'REST APIs', 'GraphQL', 'Authentication'],
  },
  {
    title: 'Database',
    icon: Database,
    skills: ['MongoDB', 'PostgreSQL', 'Redis', 'Firebase', 'Supabase', 'Prisma'],
  },
  {
    title: 'Mobile',
    icon: Smartphone,
    skills: ['React Native', 'Expo', 'iOS', 'Android', 'Progressive Web Apps'],
  },
  {
    title: 'Tools & DevOps',
    icon: Wrench,
    skills: ['Git', 'Docker', 'CI/CD', 'AWS', 'Vercel', 'Testing'],
  },
  {
    title: 'Other',
    icon: Code2,
    skills: ['UI/UX Design', 'Agile', 'Problem Solving', 'Team Leadership', 'Technical Writing'],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">Skills & Expertise</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <category.icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-white text-gray-700 rounded-lg text-sm border border-gray-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
