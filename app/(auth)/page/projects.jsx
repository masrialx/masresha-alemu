import React from 'react';
import projectsData from './ProjectData.js';

function Projects() {
  return (
    <div className="w-full flex justify-center py-6">
      <div className="w-[94%] lg:w-[60%]">
        {projectsData.map((item, index) => {
          return (
            <div key={item.projectType} className="mb-10">
              {/* Project Type Header */}
              <div className="text-[24px] font-semibold mb-4 text-center text-gradient bg-gradient-to-r from-indigo-500 to-purple-700 p-1 rounded-lg">
                <h1>{item.projectType}</h1>
              </div>

              {/* Projects List */}
              <div>
                {item.projcts.map((projItem, index) => {
                  return (
                    <div key={index} className="mb-8">
                      {/* Dashed Line */}
                      <div className="w-full h-fit pl-[25px]">
                        <div className="border-l h-9 border-dashed border-gray-400 w-4" />
                      </div>

                      {/* Project Card */}
                      <div className="md:flex justify-center items-center space-x-4 bg-white rounded-lg shadow-xl overflow-hidden mb-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                        {/* Project Image */}
                        <div className="w-[100%] md:w-[45%] lg:w-[30%] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                          <img
                            src={projItem.img}
                            className="w-full min-h-[222px] max-h-[244px] object-cover transform hover:scale-105 transition-transform duration-300"
                            alt={projItem.projectName}
                          />
                        </div>

                        {/* Spacing Between Image and Description */}
                        <div className="w-full h-[4px] md:w-[8px] md:h-full" />

                        {/* Project Description */}
                        <div className="border border-gray-300 p-4 md:w-[45%] lg:w-[65%] rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-teal-400 to-lime-500">
                          {/* Project Name */}
                          <div className="font-bold text-[18px] text-center text-gray-900 mb-2">
                            <p>{projItem.projectName}</p>
                          </div>

                          {/* Project Description */}
                          <div className="text-[14px] text-center text-gray-700 mb-4">
                            <p>{projItem.aboutProject}</p>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-x-4 mt-3 flex-wrap justify-center">
                            {/* View Live Button */}
                            <div className="border border-gradient-to-r from-green-400 to-teal-500 hover:border-black px-[12px] py-[6px] rounded-full flex justify-center items-center text-[14px] text-gray-500 hover:text-white mb-2 transition-all duration-300 hover:bg-gradient-to-r hover:from-green-400 hover:to-teal-500 shadow-lg hover:shadow-2xl transform hover:scale-105">
                              <a href={projItem.btns.live} className="hover:underline text-center">View Live</a>
                            </div>

                            {/* Source Code Button */}
                            <div className="border border-gradient-to-r from-yellow-400 to-orange-600 hover:border-black px-[12px] py-[6px] rounded-full flex justify-center items-center text-[14px] text-gray-500 hover:text-white mb-2 transition-all duration-300 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-600 shadow-lg hover:shadow-2xl transform hover:scale-105">
                              <a href={projItem.btns.sourceCode} className="hover:underline text-center">Source Code</a>
                            </div>

                            {/* Additional Link */}
                            <div className="border border-gradient-to-r from-pink-500 to-purple-700 hover:border-black px-[12px] py-[6px] rounded-full flex justify-center items-center text-[14px] text-gray-500 hover:text-white mb-2 transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-700 shadow-lg hover:shadow-2xl transform hover:scale-105">
                              <a href={projItem.btns.something} className="hover:underline text-center">Something</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Projects;
