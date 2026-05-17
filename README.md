# Masresha Alemu Portfolio

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) - a professional portfolio website showcasing software engineering skills, projects, and professional recommendations.

## Features

- 🎨 **Modern UI/UX**: Beautiful, responsive design with dark mode support
- 📱 **Fully Responsive**: Optimized for all device sizes
- 💼 **Portfolio Sections**: About, Skills, Projects, Education, Certificates, Recommendations, Contact
- 🤖 **AI Chatbot**: Interactive chatbot powered by Google Gemini AI
- ⭐ **Recommendations**: Professional recommendations from industry experts
- 📄 **Resume Viewer**: Interactive resume preview with zoom and download functionality

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Project Structure

```
masresha-alemu/
├── app/
│   ├── (auth)/
│   │   └── page/
│   │       ├── aboutme.jsx          # About Me & Recommendations section
│   │       ├── header.jsx            # Navigation header
│   │       ├── contact.jsx           # Contact information
│   │       ├── projects.jsx          # Projects showcase
│   │       ├── skill.jsx             # Skills section
│   │       ├── education.jsx         # Education section
│   │       ├── chatbot.jsx           # AI Chatbot component
│   │       └── ...
│   ├── api/
│   │   └── chatbot/
│   │       └── route.jsx             # Chatbot API endpoint
│   └── page.tsx                      # Main page component
├── public/                           # Static assets
└── README.md                         # This file
```

## Key Components

### Recommendations Feature

The portfolio includes a professional recommendations section that displays testimonials from industry professionals. 

**Documentation**: See [RECOMMENDATIONS_DOCUMENTATION.md](./RECOMMENDATIONS_DOCUMENTATION.md) for detailed information on:
- How to add new recommendations
- Customization options
- Navigation integration
- Styling details

### AI Chatbot

The website includes an AI-powered chatbot that simulates conversations about your professional background. The chatbot is powered by Google Gemini AI and uses information from your portfolio.

**Configuration**: Add to `.env` (see `.env.example`):

- `GEMINI_API_KEY` — from [Google AI Studio](https://aistudio.google.com/apikey)
- `GEMINI_MODEL` — defaults to `gemini-3-flash-preview` ([Gemini 3 Flash docs](https://ai.google.dev/gemini-api/docs/models/gemini-3-flash-preview))

## Technologies Used

- **Next.js 14+**: React framework for production
- **React**: UI library
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library (optional)
- **Google Gemini AI**: AI chatbot integration
- **React Icons**: Icon library

## Environment Variables

Create a `.env.local` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-3-flash-preview
```

## Customization

### Adding Recommendations

See [RECOMMENDATIONS_DOCUMENTATION.md](./RECOMMENDATIONS_DOCUMENTATION.md) for detailed instructions on adding new recommendations.

### Updating Contact Information

Edit `app/(auth)/page/contact.jsx` to update your contact links and information.

### Modifying Navigation

Edit `app/(auth)/page/header.jsx` to add, remove, or reorder navigation items.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - utility-first CSS framework.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Documentation

- [Recommendations Feature Documentation](./RECOMMENDATIONS_DOCUMENTATION.md) - Complete guide for the recommendations feature
- [Logo Documentation](./LOGO_DOCUMENTATION.md) - Guide for the text-based logo design and customization

## License

This project is private and proprietary.

---

**Last Updated**: January 2025
