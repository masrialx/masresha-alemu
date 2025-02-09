"use client"; // <-- Keep this at the top
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

    // Check if the fields are not empty
    if (email && title && description) {
      // Make the POST request to the API
      try {
        const response = await fetch('/api/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            title,
            description,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          // If the email is sent successfully
          setIsSuccess(true);
          setMessage('Your message has been successfully sent. We will get back to you shortly!');
        } else {
          // If there's an error sending the email
          setIsSuccess(false);
          setMessage(result.message || 'There was an issue with sending your message. Please try again later.');
        }
      } catch (error) {
        // Handle fetch or network error
        setIsSuccess(false);
        setMessage('An error occurred. Please try again later.');
        console.error('Error:', error);
      }
    } else {
      // If any field is empty
      setIsSuccess(false);
      setMessage('All fields are required. Please fill them in and try again.');
    }
  };

  useEffect(() => {
    if (message) {
      setIsMessageVisible(true);
      const timer = setTimeout(() => {
        setIsMessageVisible(false);
        setEmail('');
        setTitle('');
        setDescription('');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div id="contact" className="container mx-auto p-6 max-w-full">
      {/* Success/Error Message */}
      {message && isMessageVisible && (
        <div
          className={`max-w-md mx-auto mt-4 p-4 rounded-lg text-white text-center transition-all duration-500 ease-out ${
            isSuccess ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          {message}
        </div>
      )}

      <h1 className="text-center text-3xl font-bold mb-6 text-gray-800">Get in Touch</h1>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6 bg-white p-8 rounded-lg shadow-lg border border-gray-300">
        <div className="flex flex-col">
          <label htmlFor="email" className="text-lg font-semibold mb-2 text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="title" className="text-lg font-semibold mb-2 text-gray-700">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Message Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="text-lg font-semibold mb-2 text-gray-700">Description</label>
          <textarea
            id="description"
            placeholder="Message Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </form>
    </div>
  );
}
