import React from 'react';
import educationData from "./educationData.js";

function Education() {
  return (
    <div className="w-full flex justify-center py-6">
      <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%] bg-gradient-to-r from-blue-50 to-blue-200 p-6 rounded-lg shadow-lg">
        {/* Title */}
        <div className="text-[24px] font-semibold text-center text-gray-800 mb-6">
          <h1 id="education" key="education">Educational Background</h1>
        </div>

        {/* Education List */}
        <div>
          {educationData.map((item, index) => {
            return (
              <div key={index} className="mb-6">
                {/* Date Container */}
                <div className="border-2 border-blue-400 w-fit px-[12px] py-[4px] rounded-full text-[14px] font-medium text-blue-700 mx-auto mb-4">
                  <p>{item.date}</p>
                </div>

                {/* Education Card */}
                <div className="pl-[30px]">
                  <div className="border-l-4 border-blue-500 p-6 bg-white shadow-md rounded-lg">
                    {/* Title */}
                    <div className="font-semibold text-[18px] text-gray-900 mb-2">
                      <h1 className="hover:underline hover:text-blue-700">
                        <a href={item.link}>{item.title}</a>
                      </h1>
                    </div>
                    {/* Description */}
                    <div className="text-[15px] text-gray-700">
                      <p>{item.about}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Education;
