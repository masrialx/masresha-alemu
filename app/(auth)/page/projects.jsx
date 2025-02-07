"use client"; // Add this to ensure the component is treated as a Client Component

import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa'; // Import GitHub icon from React Icons
import Pagination from './pagination'; // Assuming you already have the Pagination component
import projectsData from './ProjectData'; // Correct path to your data file

function Projects() {
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4;

  // Calculate the index of the first and last project on the current page
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;

  // Flatten the list of projects
  const flattenedProjects = projectsData.flatMap(item => item.projects);

  // Get the current projects to display based on the pagination
  const currentProjects = flattenedProjects.slice(indexOfFirstProject, indexOfLastProject);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-full flex justify-center py-6">
      <div className="w-full lg:w-[60%]">
        {/* Display projects for the current page */}
        {currentProjects.map((projItem, index) => {
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
                    src={projItem.btns.img}
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

                  {/* Time, Location, and Type */}
                  <div className="text-[12px] text-center text-gray-600 mb-4">
                    <p><strong>Time:</strong> {projItem.time} | <strong>Location:</strong> {projItem.location} | <strong>Type:</strong> {projItem.type}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-x-4 mt-3 flex-wrap justify-center">
                    {/* View Live Button */}
                    {projItem.btns.live && (
                      <div className="border border-gradient-to-r from-green-400 to-teal-500 hover:border-black px-[12px] py-[6px] rounded-full flex justify-center items-center text-[14px] text-gray-500 hover:text-white mb-2 transition-all duration-300 hover:bg-gradient-to-r hover:from-green-400 hover:to-teal-500 shadow-lg hover:shadow-2xl transform hover:scale-105">
                        <a href={projItem.btns.live} className="hover:underline text-center">View Live</a>
                      </div>
                    )}

                    {/* GitHub Button */}
                    {projItem.btns.github && (
                      <div className="border border-gradient-to-r from-yellow-400 to-orange-600 hover:border-black px-[12px] py-[6px] rounded-full flex justify-center items-center text-[14px] text-gray-500 hover:text-white mb-2 transition-all duration-300 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-600 shadow-lg hover:shadow-2xl transform hover:scale-105">
                        <a href={projItem.btns.github} className="hover:underline text-center">Source Code</a>
                      </div>
                    )}

                    {/* Documentation Button */}
                    {projItem.btns.documentation && (
                      <div className="border border-gradient-to-r from-blue-400 to-indigo-600 hover:border-black px-[12px] py-[6px] rounded-full flex justify-center items-center text-[14px] text-gray-500 hover:text-white mb-2 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-400 hover:to-indigo-600 shadow-lg hover:shadow-2xl transform hover:scale-105">
                        <a href={projItem.btns.documentation} className="hover:underline text-center">Documentation</a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(flattenedProjects.length / projectsPerPage)}
          onPageChange={handlePageChange}
        />

        {/* GitHub Link */}
        <div className="flex justify-center items-center mt-8">
          <a
            href="https://github.com/masrialx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900"
          >
            <FaGithub size={32} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Projects;
