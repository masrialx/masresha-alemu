"use client"; // <-- Add this at the top
import { useState, useEffect } from 'react';

export default function Connection() {
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(null);
  const [isMessageVisible, setIsMessageVisible] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulate sending email and showing a success or error message
    if (email && title && description) {
      setIsSuccess(true);
      setMessage('Your message has been successfully sent. We will get back to you shortly!');
    } else {
      setIsSuccess(false);
      setMessage('There was an issue with sending your message. Please check your inputs and try again.');
    }
  };

  useEffect(() => {
    if (message) {
      // Set the popup message to hide after 5 seconds
      setIsMessageVisible(true);
      const timer = setTimeout(() => {
        setIsMessageVisible(false);

        // Clear the input fields after the message disappears
        setEmail('');
        setTitle('');
        setDescription('');
      }, 5000); // 5 seconds delay

      return () => clearTimeout(timer); // Clear timer when component unmounts or message changes
    }
  }, [message]);

  return (
    <div className="container mx-auto p-6">
      {/* Success/Error Message - Positioned at the top with input width */}
      {message && isMessageVisible && (
        <div
          className={`max-w-md mx-auto mt-4 p-4 rounded-md text-white text-center transition-all duration-500 ease-out ${
            isSuccess ? 'bg-green-600' : 'bg-red-600'
          }`}
          style={{ opacity: isMessageVisible ? 1 : 0 }}
        >
          {message}
        </div>
      )}

      <h1 className="text-center text-3xl font-bold mb-6">Get in Touch</h1>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
        <div>
          <label htmlFor="email" className="block text-lg font-medium">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="title" className="block text-lg font-medium">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Message Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-lg font-medium">Description</label>
          <textarea
            id="description"
            placeholder="Message Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            rows="4"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-all duration-300"
        >
          Send
        </button>
      </form>
    </div>
  );
}
