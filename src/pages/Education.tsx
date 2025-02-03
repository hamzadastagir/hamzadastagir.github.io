import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { loadMarkdown } from '../utils/markdown';
import CourseList from '../components/CourseList';

interface Course {
  title: string;
  description: string;
  research: string[];
  link?: {
    text: string;
    url: string;
  };
}

interface Degree {
  title: string;
  subtitle: string;
  year: string;
  courses: Course[];
  achievements: string[];
}

const Education = () => {
  const [content, setContent] = useState<{ attributes: any; body: string } | null>(null);
  const [selectedDegree, setSelectedDegree] = useState<'masters' | 'bachelors'>('masters');
  const [parsedDegrees, setParsedDegrees] = useState<Record<'masters' | 'bachelors', Degree>>({
    masters: {
      title: "Johns Hopkins University, SAIS",
      subtitle: "Master of Arts in International Affairs",
      year: "2021",
      courses: [],
      achievements: []
    },
    bachelors: {
      title: "National University of Science & Technology",
      subtitle: "Bachelor of Military Arts & Sciences",
      year: "2015",
      courses: [],
      achievements: []
    }
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const result = await loadMarkdown('/src/content/education.md');
        setContent(result);
        
        // Parse the markdown content to extract courses and achievements
        const sections = result.body.split('\n# ');
        
        const degrees: Record<'masters' | 'bachelors', Degree> = {
          masters: {
            ...parsedDegrees.masters,
            courses: [],
            achievements: []
          },
          bachelors: {
            ...parsedDegrees.bachelors,
            courses: [],
            achievements: []
          }
        };

        sections.forEach(section => {
          if (section.includes('Johns Hopkins')) {
            const courses = extractCourses(section);
            const achievements = extractAchievements(section);
            degrees.masters.courses = courses;
            degrees.masters.achievements = achievements;
          } else if (section.includes('National University')) {
            const courses = extractCourses(section);
            const achievements = extractAchievements(section);
            degrees.bachelors.courses = courses;
            degrees.bachelors.achievements = achievements;
          }
        });

        setParsedDegrees(degrees);
      } catch (err) {
        console.error('Error loading education content:', err);
      }
    };

    fetchContent();
  }, []);

  const extractCourses = (section: string): Course[] => {
    const courses: Course[] = [];
    const courseMatches = section.split('\n### ').slice(1);

    courseMatches.forEach(match => {
      const lines = match.split('\n');
      const title = lines[0].trim();
      
      // Find description (text before "Research Work:")
      const descriptionEnd = lines.findIndex(line => line.includes('**Research Work:**'));
      const description = lines.slice(1, descriptionEnd)
        .filter(line => line.trim() !== '')
        .join(' ')
        .trim();

      // Find research items
      const researchStart = lines.findIndex(line => line.includes('**Research Work:**'));
      const researchEnd = lines.findIndex(line => line.includes('[View'));
      const research = lines
        .slice(researchStart + 1, researchEnd !== -1 ? researchEnd : undefined)
        .filter(line => line.startsWith('- '))
        .map(line => line.replace('- ', '').trim());

      // Find link if exists
      const linkLine = lines.find(line => line.includes('[View'));
      let link;
      if (linkLine) {
        const linkMatch = linkLine.match(/\[(.*?)\].*?\((.*?)\)/);
        if (linkMatch) {
          link = {
            text: linkMatch[1],
            url: linkMatch[2]
          };
        }
      }

      courses.push({
        title,
        description,
        research,
        link
      });
    });

    return courses;
  };

  const extractAchievements = (section: string): string[] => {
    const achievementsSection = section.split('\n## Achievements\n')[1];
    if (!achievementsSection) return [];
    
    return achievementsSection
      .split('\n')
      .filter(line => line.startsWith('- '))
      .map(line => line.replace('- ', '').trim());
  };

  if (!content) {
    return (
      <div className="pt-20 min-h-screen bg-[#0A0B0F] flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  const currentDegree = parsedDegrees[selectedDegree];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20 min-h-screen bg-[#0A0B0F]"
    >
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-medium mb-4 gradient-text">
            {content.attributes.title}
          </h1>
          <p className="text-lg text-gray-400">
            {content.attributes.subtitle}
          </p>
        </motion.div>

        {/* Degree Selection */}
        <div className="flex gap-4 mb-12">
          {(['masters', 'bachelors'] as const).map((degree) => (
            <button
              key={degree}
              onClick={() => setSelectedDegree(degree)}
              className={`flex-1 p-6 rounded-lg transition-all duration-300 ${
                selectedDegree === degree
                  ? 'bg-[#12131A] border-[#64CCC5] border'
                  : 'bg-[#12131A]/50 border-[#2A2F42] border hover:border-[#64CCC5]/30'
              }`}
            >
              <div className="flex flex-col items-center gap-4">
                <GraduationCap className={`h-8 w-8 ${
                  selectedDegree === degree ? 'text-[#64CCC5]' : 'text-gray-400'
                }`} />
                <div className="text-center">
                  <h3 className={`font-medium mb-1 ${
                    selectedDegree === degree ? 'text-[#64CCC5]' : 'text-gray-300'
                  }`}>
                    {parsedDegrees[degree].title}
                  </h3>
                  <p className="text-sm text-gray-400">{parsedDegrees[degree].subtitle}</p>
                  <p className="text-sm text-gray-500 mt-1">{parsedDegrees[degree].year}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Course Content */}
        <motion.div
          key={selectedDegree}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-12"
        >
          <div>
            <h2 className="text-2xl font-medium mb-8 text-white">Coursework</h2>
            <CourseList courses={currentDegree.courses} />
          </div>

          <div className="glass-card p-8">
            <h2 className="text-xl font-medium mb-6 text-white">Achievements</h2>
            <ul className="space-y-3">
              {currentDegree.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-300">
                  <span className="text-[#64CCC5]">•</span>
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Education;