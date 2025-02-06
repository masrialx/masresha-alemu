"use client"; // <-- Add this at the top
import { FaLinkedin, FaGithub, FaTelegram, FaPhoneAlt, FaEnvelope, FaLaptopCode } from 'react-icons/fa'; // Import icons
import { useState } from 'react';

export default function Contact() {
  const contactInfo = [
    {
      icon: <FaLinkedin size={15} />, // Set icon size to 15
      link: 'https://www.linkedin.com/in/your-profile', // Replace with your LinkedIn profile link
    },
    {
      icon: <FaGithub size={15} />, // Set icon size to 15
      link: 'https://github.com/your-profile', // Replace with your GitHub profile link
    },
    {
      icon: <FaTelegram size={15} />, // Set icon size to 15
      link: 'https://t.me/your-profile', // Replace with your Telegram username
    },
    {
      icon: <FaPhoneAlt size={15} />, // Set icon size to 15
      link: 'tel:+1234567890', // Replace with your phone number
    },
    {
      icon: <FaLaptopCode size={15} />, // Set icon size to 15
      link: 'https://leetcode.com/your-profile', // Replace with your LeetCode profile link
    },
    {
      icon: <FaEnvelope size={15} />, // Set icon size to 15
      link: 'mailto:your-email@example.com', // Replace with your email
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-center text-3xl font-bold mb-6">Contact</h1>
      <div className="flex justify-center space-x-6">
        {contactInfo.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              className={`p-4 rounded-full bg-gray-200 hover:bg-blue-600 transition-all ease-in-out duration-300 ${
                hoveredIndex === index ? 'scale-110' : ''
              }`}
            >
              {item.icon}
            </div>
            <span
              className={`absolute text-sm w-max ml-2 top-0 left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                hoveredIndex === index ? 'opacity-100' : ''
              }`}
            >
              {item.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
