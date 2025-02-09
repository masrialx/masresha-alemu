"use client";

import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa'; 
import Pagination from './pagination'; 
import projectsData from './ProjectData'; 

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
    <div  className="w-full flex justify-center py-10 bg-white">
      <div className="w-full lg:w-[70%] px-6">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
            Notable Projects & Contributions
          </h2>
          <p   id="projects"  key='projects' className="text-xl text-gray-600">
            Explore the impactful projects I've contributed to and developed.
          </p>
        </div>

        {/* Display Projects */}
        {currentProjects.map((projItem, index) => (
          <div key={index} className="mb-10">
            {/* Dashed Line */}
            <div className="w-full h-fit pl-[25px]">
              <div className="border-l h-9 border-dashed border-gray-400 w-4" />
            </div>

            {/* Project Card */}
            <div className={`md:flex justify-center items-center space-x-4 rounded-lg shadow-lg overflow-hidden mb-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl ${index % 2 === 0 ? 'bg-gradient-to-r from-teal-500 to-lime-400' : 'bg-gradient-to-r from-pink-400 to-yellow-400'}`}>
              {/* Project Image */}
              <div className="w-full md:w-[45%] lg:w-[30%] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img
                  src={projItem.btns.img}
                  className="w-full min-h-[222px] max-h-[244px] object-cover transform hover:scale-105 transition-transform duration-300"
                  alt={projItem.projectName}
                />
              </div>

              {/* Project Description */}
              <div className="border border-gray-300 p-6 md:w-[45%] lg:w-[65%] rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white">
                <div className="font-semibold text-2xl text-gray-900 mb-2 text-center">
                  {projItem.projectName}
                </div>

                <div className="text-lg text-gray-700 mb-4 text-center">
                  {projItem.aboutProject}
                </div>

                {/* Time, Location, and Type */}
                <div className="text-sm text-gray-600 mb-4 text-center">
                  <p><strong>Time:</strong> {projItem.time} | <strong>Location:</strong> {projItem.location} | <strong>Type:</strong> {projItem.type}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-x-4 mt-4 justify-center flex-wrap">
                  {/* View Live Button */}
                  {projItem.btns.live && (
                    <div className="bg-[#0a192f] hover:bg-white hover:text-black border border-[#0a192f] hover:border-black px-[12px] py-[6px] rounded-full flex justify-center items-center text-[14px] text-white hover:text-black hover:no-underline mb-2 transition-all duration-300 hover:shadow-lg transform hover:scale-105">
                      <a href={projItem.btns.live} className="text-center w-full">View Live</a>
                    </div>
                  )}

                  {/* GitHub Button */}
                  {projItem.btns.github && (
                    <div className="bg-[#0a192f] hover:bg-white hover:text-black border border-[#0a192f] hover:border-black px-[12px] py-[6px] rounded-full flex justify-center items-center text-[14px] text-white hover:text-black hover:no-underline mb-2 transition-all duration-300 hover:shadow-lg transform hover:scale-105">
                      <a href={projItem.btns.github} className="flex items-center space-x-2 hover:underline text-center w-full">
                        <FaGithub size={16} />
                        <span>Source Code</span>
                      </a>
                    </div>
                  )}

                  {/* Documentation Button */}
                  {projItem.btns.documentation && (
                    <div className="bg-[#0a192f] hover:bg-white hover:text-black border border-[#0a192f] hover:border-black px-[12px] py-[6px] rounded-full flex justify-center items-center text-[14px] text-white hover:text-black hover:no-underline mb-2 transition-all duration-300 hover:shadow-lg transform hover:scale-105">
                      <a href={projItem.btns.documentation} className="text-center w-full">Documentation</a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(flattenedProjects.length / projectsPerPage)}
          onPageChange={handlePageChange}
        />

        {/* GitHub Link for More Projects */}
        <div className="flex justify-center items-center mt-8">
          <a
            href="https://github.com/masrialx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900 flex items-center space-x-2"
          >
            <FaGithub size={32} />
            <span>See More Projects on GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Projects;
