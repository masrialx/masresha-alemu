// // pages/api/chatbot.js
// import fetch from "node-fetch"; // For making the API request

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     const { contents } = req.body;

//     try {
//       // Make the API request to Gemini
//       const response = await fetch(
//         "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDs2iAsz7M51aWR3xbWxmlULgxqSJo5FRE",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             contents: contents,
//           }),
//         }
//       );

//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.error.message);
//       }

//       // Send back the response to the client
//       res.status(200).json(data);
//     } catch (error) {
//       console.error("Error fetching Gemini API:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   } else {
//     res.status(405).json({ error: "Method Not Allowed" });
//   }
// }
