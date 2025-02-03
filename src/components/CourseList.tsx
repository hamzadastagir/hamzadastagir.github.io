import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Course {
  title: string;
  description: string;
  research: string[];
  link?: {
    text: string;
    url: string;
  };
}

interface CourseListProps {
  courses: Course[];
}

const CourseList: React.FC<CourseListProps> = ({ courses }) => {
  const [selectedCourse, setSelectedCourse] = useState<string>(courses[0]?.title || '');

  return (
    <div className="flex gap-8">
      {/* Course List */}
      <div className="w-1/3">
        <div className="space-y-2">
          {courses.map((course) => (
            <button
              key={course.title}
              onClick={() => setSelectedCourse(course.title)}
              className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                selectedCourse === course.title
                  ? 'bg-[#64CCC5]/10 text-[#64CCC5]'
                  : 'text-gray-400 hover:bg-[#1F2937]/30 hover:text-gray-300'
              }`}
            >
              {course.title}
            </button>
          ))}
        </div>
      </div>

      {/* Course Details */}
      <div className="w-2/3">
        <AnimatePresence mode="wait">
          {courses.map((course) => (
            course.title === selectedCourse && (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass-card p-8"
              >
                <h2 className="text-2xl font-medium text-white mb-6">
                  {course.title}
                </h2>
                
                <p className="text-gray-300 leading-relaxed mb-8">
                  {course.description}
                </p>

                <div className="space-y-6">
                  <h3 className="text-[#64CCC5] text-lg font-medium">Research Work</h3>
                  <ul className="space-y-4">
                    {course.research.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-[#64CCC5] mt-1.5">•</span>
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {course.link && (
                    <a
                      href={course.link.url}
                      className="inline-block mt-6 px-4 py-2 bg-[#64CCC5]/10 text-[#64CCC5] 
                               rounded-lg hover:bg-[#64CCC5]/20 transition-colors"
                    >
                      {course.link.text}
                    </a>
                  )}
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CourseList;