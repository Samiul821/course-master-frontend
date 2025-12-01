import React from "react";

const Home = () => {
  return (
    <div>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to CourseMaster
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Learn from industry experts and advance your skills with our
          comprehensive courses
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/courses"
            className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            Explore Courses
          </a>
          <a
            href="/register"
            className="px-6 py-3 border-2 border-green-600 text-green-600 font-medium rounded-lg hover:bg-green-50 transition-colors"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
