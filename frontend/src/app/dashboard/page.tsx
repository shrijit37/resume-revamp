"use client"
import React, { useState } from 'react';

// Define types
interface DashboardOption {
  name: string;
  component: React.ReactNode;
}

interface SidebarData {
  userName: string;
  email: string;
  resumeOptimized: number;
  resumeAnalyzed: number;
  resumeSaved: number;
  resumeShared: number;
}

const dashboardOptions: DashboardOption[] = [
  //   { name: "Dashboard", component: <DashboardComponent /> },
  //   { name: "Optimize Resume with JD", component: <ResumeAnalysis /> },
  //   { name: "Analyse Resume", component: <ResumeAnalysis /> },
  { name: "Job Applications Tracker", component: <>Job Tracker</> },
  { name: "Community Resumes", component: <>Community Resumes</> },
  { name: "Profile", component: <>Profile</> },
];

const sidebarData: SidebarData[] = [
  {
    userName: "Shrijit",
    email: "shrijitsrivastav@gmail.com",
    resumeOptimized: 5,
    resumeAnalyzed: 10,
    resumeSaved: 3,
    resumeShared: 2,
  },
];

const Page: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<React.ReactNode>(dashboardOptions[0].component);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen w-full">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 h-full z-50 border-r-2 border-[#DCD0A8] transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isSidebarOpen ? 'w-80' : 'lg:w-16'} lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            {isSidebarOpen && (
              <div className="text-xl font-semibold text-[#fff1c1dc] flex-1 lg:h-8 overflow-hidden">
                Welcome back, {sidebarData[0].userName}
              </div>
            )}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-yellow-700 transition-colors flex-shrink-0"
              aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isSidebarOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {dashboardOptions.map((option: DashboardOption, index: number) => (
                <li key={index}>
                  <button
                    onClick={() => setSelectedOption(option.component)}
                    className={`w-full text-left p-3 rounded-lg hover:bg-[#DCD0A8] transition-colors duration-200 ${
                      isSidebarOpen ? 'text-base' : 'text-xs flex justify-center'
                    }`}
                    title={!isSidebarOpen ? option.name : ''}
                  >
                    {isSidebarOpen ? (
                      <span className="text-yellow-700">{option.name}</span>
                    ) : (
                      <span className="text-yellow-700 font-medium">
                        {option.name.charAt(0)}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <div className="lg:hidden shadow-sm p-4 border-b border-gray-200">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Open menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          {selectedOption}
        </div>
      </div>
    </div>
  );
};

export default Page;
