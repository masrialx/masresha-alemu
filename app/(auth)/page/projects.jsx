"use client";

import React, { useState } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import Pagination from "./pagination";
import projectsData from "./ProjectData";
import SectionHeader from "./SectionHeader";

function Projects() {
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4;

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const flattenedProjects = projectsData.flatMap((item) => item.projects);
  const currentProjects = flattenedProjects.slice(indexOfFirstProject, indexOfLastProject);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="section-shell bg-white">
      <div className="section-inner">
        <div id="projects">
          <SectionHeader
            label="Work"
            title="Experience & Projects"
            subtitle="Production roles with international teams and selected technical projects"
          />
        </div>

        <div className="space-y-6">
          {currentProjects.map((projItem, index) => (
            <article
              key={`${projItem.projectName}-${index}`}
              className="card-modern overflow-hidden lg:flex lg:items-stretch"
            >
              <div className="lg:w-2/5 bg-slate-100 p-4 flex items-center justify-center">
                <img
                  src={projItem.btns.img}
                  className="max-h-48 w-full object-contain rounded-lg"
                  alt={projItem.projectName}
                />
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6 lg:p-7">
                <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">{projItem.projectName}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{projItem.aboutProject}</p>

                <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                  <span className="rounded-full bg-slate-100 px-3 py-1">{projItem.time}</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1">{projItem.location}</span>
                  <span className="rounded-full bg-rose-50 px-3 py-1 text-rose-600">{projItem.type}</span>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {projItem.btns.live && (
                    <a
                      href={projItem.btns.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary gap-2 px-4 py-2 text-xs sm:text-sm"
                    >
                      <FaExternalLinkAlt size={12} /> View Live
                    </a>
                  )}
                  {projItem.btns.github && (
                    <a
                      href={projItem.btns.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline gap-2 px-4 py-2 text-xs sm:text-sm"
                    >
                      <FaGithub size={14} /> Source
                    </a>
                  )}
                  {projItem.btns.documentation && (
                    <a
                      href={projItem.btns.documentation}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline px-4 py-2 text-xs sm:text-sm"
                    >
                      Docs
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(flattenedProjects.length / projectsPerPage)}
          onPageChange={handlePageChange}
        />

        <div className="mt-8 text-center">
          <a
            href="https://github.com/masrialx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-brand-navy"
          >
            <FaGithub size={20} />
            More projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

export default Projects;
