"use client";
  
import React from "react";

const ProjectDetailsSidebar = () => {
  return (
    <>
      <div className="projects-details-info">
        <ul>
          <li>
            <i className="ri-shield-user-line"></i>
            <span>Client:</span>
            <a href="https://envytheme.com/" target="_blank">
              EnvyTheme.com
            </a>
            <br />
            <a href="https://themeforest.net/" target="_blank">
              ThemeForest.com
            </a>
          </li>
          <li>
            <i className="ri-map-pin-2-line"></i>
            <span>Location:</span>
            New York, USA
          </li>
          <li>
            <i className="ri-price-tag-3-line"></i>
            <span>Technologies:</span>
            Python, Data Science
          </li>
          <li>
            <i className="ri-calendar-2-line"></i>
            <span>Completed:</span>
            25 January 2024
          </li>
          <li>
            <i className="ri-global-line"></i>
            <span>Website:</span>
            <a href="https://envytheme.com/" target="_blank">
              EnvyTheme.com
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ProjectDetailsSidebar;
