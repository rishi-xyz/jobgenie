# JobGenie

JobGenie is a modern web application built with Next.js that helps users with job-related tasks and career development. The application features a beautiful UI, AI-powered capabilities, and a robust authentication system.

## Features

- Modern and responsive UI with dark/light mode support
- AI-powered job assistance
- User authentication and authorization
- Interactive job-related tools and features
- PDF generation capabilities
- Real-time data visualization

## Tech Stack

- **Framework**: Next.js 15.2.0
- **Language**: TypeScript
- **UI Components**: 
  - Radix UI
  - Tailwind CSS
  - Lucide React icons
- **Authentication**: NextAuth.js
- **AI Integration**: Google Generative AI
- **Database**: Prisma
- **Form Handling**: React Hook Form with Zod validation
- **PDF Generation**: html2pdf.js, jspdf
- **Data Visualization**: Recharts
- **Markdown Editor**: React MD Editor
- **State Management**: React Hooks
- **Styling**: Tailwind CSS with class-variance-authority

## Prerequisites

- Node.js 18.x or later
- npm or yarn package manager
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/jobgenie.git
cd jobgenie
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add the following variables:
```env
# Add your environment variables here
NEXTAUTH_SECRET=your_secret_here
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

## Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building for Production

```bash
npm run build
# or
yarn build
```

To start the production server:

```bash
npm run start
# or
yarn start
```

## Project Structure

```
jobgenie/
├── app/                    # Next.js app directory
├── components/            # Reusable UI components
├── lib/                   # Utility functions and configurations
├── prisma/               # Database schema and migrations
├── public/               # Static assets
└── styles/               # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Vercel](https://vercel.com/) - The platform for deployment
- All the amazing open-source libraries used in this project
