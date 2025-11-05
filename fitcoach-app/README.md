# FitCoach AI Assistant

AI-powered lead qualification and client acquisition system for fitness coaches. Automate your lead qualification process, save 15+ hours per week, and only talk to qualified prospects.

## Features

- **AI-Powered Chatbot**: Automatically qualify leads through natural conversations
- **Smart Booking**: Qualified leads book calls instantly via Calendly integration
- **Lead Dashboard**: Manage all leads and conversations in one place
- **Embeddable Widget**: Add to any website with one line of code
- **Real-time Qualification**: AI determines if leads are qualified based on budget and timeline
- **Email Automation**: Pre-call prep and nurture sequences (coming soon)
- **Subscription Billing**: Stripe integration for payments (coming soon)

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Backend**: Firebase Cloud Functions (Admin SDK)
- **AI**: OpenAI GPT-4o-mini
- **Payments**: Stripe (coming soon)
- **Email**: Resend (coming soon)
- **Calendar**: Calendly

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Firebase account
- OpenAI API key
- Calendly account (for booking integration)

### Installation

1. **Clone the repository**
   ```bash
   cd fitcoach-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a new Firebase project at [firebase.google.com](https://firebase.google.com)
   - Enable Authentication (Email/Password and Google)
   - Create a Firestore database
   - Generate a service account key for Firebase Admin SDK

4. **Set up environment variables**
   - Copy `.env.example` to `.env.local`
   ```bash
   cp .env.example .env.local
   ```
   - Fill in your credentials:

   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

   # Firebase Admin SDK
   FIREBASE_ADMIN_PROJECT_ID=your_project_id
   FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk@your_project.iam.gserviceaccount.com
   FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key\n-----END PRIVATE KEY-----\n"

   # OpenAI API
   OPENAI_API_KEY=sk-your_openai_api_key

   # App URLs
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

5. **Deploy Firestore security rules**
   ```bash
   firebase deploy --only firestore:rules
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open the app**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - Sign up for a new coach account
   - Configure your widget settings
   - Get your embed code!

## Project Structure

```
fitcoach-app/
├── app/                          # Next.js app directory
│   ├── api/                      # API routes
│   │   └── chat/                 # Chat endpoints
│   ├── auth/                     # Authentication pages
│   │   ├── login/
│   │   └── signup/
│   ├── dashboard/                # Dashboard pages
│   │   ├── leads/                # Leads management
│   │   ├── settings/             # Settings page
│   │   └── page.tsx              # Dashboard home
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
├── components/                   # React components
│   ├── auth/                     # Auth components
│   └── dashboard/                # Dashboard components
├── lib/                          # Utilities and libraries
│   ├── context/                  # React contexts
│   ├── firebase/                 # Firebase configuration
│   │   ├── admin.ts              # Firebase Admin SDK
│   │   ├── auth.ts               # Auth helpers
│   │   ├── config.ts             # Client config
│   │   └── firestore.ts          # Firestore helpers
│   ├── openai/                   # OpenAI integration
│   │   ├── client.ts             # OpenAI client
│   │   └── qualification.ts      # Qualification logic
│   └── types/                    # TypeScript types
│       └── database.ts           # Database types
├── public/                       # Static files
│   └── widget/                   # Chat widget
│       └── fitcoach-widget.js    # Embeddable widget
├── firestore.rules               # Firestore security rules
└── README.md                     # This file
```

## Using the Chat Widget

### For Coaches

1. Sign up and log into your dashboard
2. Go to Settings → Widget Setup
3. Configure your widget:
   - Choose primary color
   - Set welcome message
   - Add your Calendly URL
4. Copy the embed code
5. Paste it before the `</body>` tag on your website

### Embed Code Example

```html
<!-- FitCoach AI Widget -->
<script>
  window.fitcoachConfig = {
    coachId: "your_coach_id",
    primaryColor: "#3B82F6",
    calendlyUrl: "https://calendly.com/your-username/15min"
  };
</script>
<script src="https://your-domain.com/widget/fitcoach-widget.js"></script>
```

## Database Schema

### Collections

**coaches**
- User authentication and profile data
- Widget settings and customization
- Subscription and usage information

**leads**
- Contact information
- Qualification data (goals, experience, timeline, budget)
- Status (new, qualified, unqualified, booked)

**conversations**
- Message history
- Qualification status
- Metadata

**analytics**
- Event tracking
- Usage metrics

See `lib/types/database.ts` for full TypeScript interfaces.

## API Endpoints

### `POST /api/chat/start`
Start a new conversation

**Request:**
```json
{
  "coachId": "string",
  "source": "string"
}
```

**Response:**
```json
{
  "conversationId": "string",
  "leadId": "string",
  "welcomeMessage": "string"
}
```

### `POST /api/chat`
Send a message and get AI response

**Request:**
```json
{
  "coachId": "string",
  "conversationId": "string",
  "message": "string"
}
```

**Response:**
```json
{
  "response": "string",
  "qualificationComplete": "boolean",
  "qualified": "boolean"
}
```

## Development

### Running Tests
```bash
npm test
```

### Building for Production
```bash
npm run build
```

### Linting
```bash
npm run lint
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables in Vercel

Add all environment variables from `.env.local` to your Vercel project settings.

## Roadmap

- [x] Authentication system
- [x] Chat widget
- [x] AI-powered qualification
- [x] Lead management dashboard
- [x] Calendly integration
- [ ] Email automation (Resend)
- [ ] Stripe subscription billing
- [ ] SMS notifications
- [ ] Analytics dashboard
- [ ] Custom qualification questions
- [ ] Multi-language support

## Contributing

This is a private project. For questions or issues, please contact the development team.

## License

Proprietary - All rights reserved

## Support

For support, email support@fitcoach-ai.com or open an issue in this repository.
