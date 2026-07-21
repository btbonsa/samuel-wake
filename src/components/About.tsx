import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { Code2, Rocket, Users } from 'lucide-react';
import profileImage from '../assets/1Profile.JPG';

export function About() {
  const { ref, inView } = useInView();

  const highlights = [
    { icon: Code2, title: 'Clean Code', description: 'Maintainable & scalable solutions' },
    { icon: Rocket, title: 'Performance', description: 'Optimized for speed & efficiency' },
    { icon: Users, title: 'Team Player', description: 'Collaborative & communicative' },
  ];

  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-sm font-semibold text-foreground/80 uppercase tracking-widest mb-3">Who I am</p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">About Me</h2>
          <div className="section-divider" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative max-w-md mx-auto">
              <div className="w-64 sm:w-72 md:w-80 mx-auto">
                <div className="fancy-frame mx-auto">
                  <span className="sunlight" />
                  <span className="fancy-ring" />
                  <span className="glisten" />
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="photo"
                  />
                  <span className="rim" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-6"
          >
            <p className="text-lg text-foreground/75 leading-relaxed">
              I'm a passionate software developer with expertise in building modern web applications.
              With a strong foundation in both frontend and backend technologies, I love turning
              complex problems into simple, beautiful, and intuitive solutions.
            </p>
            <p className="text-lg text-foreground/75 leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, contributing to
              open-source projects, or sharing my knowledge with the developer community.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 pt-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="glass-card p-5 text-center hover:-translate-y-1 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="w-10 h-10 bg-transparent flex items-center justify-center mx-auto mb-3">
                    <item.icon className="w-5 h-5 text-foreground/80" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1 text-[#c9944a]">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
