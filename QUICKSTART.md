# FitCoach AI Assistant - Quickstart Guide

Get the application running locally in under 15 minutes and start testing the AI chat widget!

## Prerequisites

Before you begin, make sure you have:
- Node.js 18+ installed ([Download here](https://nodejs.org/))
- A Google account (for Firebase)
- An OpenAI account with API access

---

## Step 1: Firebase Setup (5 minutes)

### 1.1 Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter project name: `fitcoach-ai-test` (or any name)
4. Disable Google Analytics (optional for testing)
5. Click **"Create project"**

### 1.2 Enable Authentication

1. In your Firebase project, click **"Authentication"** in the left sidebar
2. Click **"Get started"**
3. Enable **"Email/Password"** provider:
   - Click on "Email/Password"
   - Toggle "Enable"
   - Click "Save"
4. Enable **"Google"** provider (optional):
   - Click on "Google"
   - Toggle "Enable"
   - Enter project support email
   - Click "Save"

### 1.3 Create Firestore Database

1. Click **"Firestore Database"** in the left sidebar
2. Click **"Create database"**
3. Select **"Start in test mode"** (we'll add security rules later)
4. Choose a location closest to you
5. Click **"Enable"**

### 1.4 Get Firebase Configuration

1. Click the **gear icon** ⚙️ next to "Project Overview"
2. Click **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click the **Web icon** `</>`
5. Register app with nickname: `fitcoach-web`
6. Click **"Register app"**
7. **COPY** the `firebaseConfig` object - you'll need these values:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc123"
   };
   ```

### 1.5 Generate Service Account Key (for Admin SDK)

1. Still in **"Project settings"**
2. Click the **"Service accounts"** tab
3. Click **"Generate new private key"**
4. Click **"Generate key"** (a JSON file will download)
5. **SAVE THIS FILE** - you'll need it for environment variables

---

## Step 2: OpenAI API Setup (2 minutes)

### 2.1 Get OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Click on your profile (top-right) → **"API keys"**
4. Click **"Create new secret key"**
5. Name it: `fitcoach-test`
6. **COPY** the key (starts with `sk-...`) - you won't see it again!

**Note:** OpenAI requires a paid account with credits. Make sure you have at least $5 in credits.

---

## Step 3: Install Dependencies (2 minutes)

Open your terminal and navigate to the project:

```bash
cd /path/to/Fit-Coach-AI/fitcoach-app
```

Install all dependencies:

```bash
npm install
```

Wait for installation to complete...

---

## Step 4: Configure Environment Variables (3 minutes)

### 4.1 Create .env.local file

In the `fitcoach-app/` directory, create a file named `.env.local`:

```bash
touch .env.local
```

### 4.2 Add Configuration

Open `.env.local` in your text editor and paste this template:

```env
# ==================== FIREBASE CONFIGURATION ====================
# From Firebase Console → Project Settings → Web App Config
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

# ==================== FIREBASE ADMIN SDK ====================
# From the service account JSON file you downloaded
FIREBASE_ADMIN_PROJECT_ID=your-project-id
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key content here\n-----END PRIVATE KEY-----\n"

# ==================== OPENAI API ====================
# From OpenAI Platform → API Keys
OPENAI_API_KEY=sk-your_openai_api_key_here

# ==================== APP CONFIGURATION ====================
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_WIDGET_URL=http://localhost:3000
```

### 4.3 Fill in Your Values

Replace the placeholder values with your actual credentials:

**Firebase Config** (from Step 1.4):
- Copy each value from the `firebaseConfig` object

**Firebase Admin** (from Step 1.5 - the downloaded JSON file):
- Open the JSON file
- Copy `project_id` → `FIREBASE_ADMIN_PROJECT_ID`
- Copy `client_email` → `FIREBASE_ADMIN_CLIENT_EMAIL`
- Copy `private_key` → `FIREBASE_ADMIN_PRIVATE_KEY`
  - **IMPORTANT:** Keep the private key in quotes and preserve the `\n` characters

**OpenAI** (from Step 2.1):
- Paste your API key that starts with `sk-...`

### 4.4 Example of Correct Format

```env
# Example (with fake values)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyABcD1234567890eFgHiJkLmNoPqRsTuVwX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=fitcoach-ai-test.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=fitcoach-ai-test
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=fitcoach-ai-test.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abc123def456

FIREBASE_ADMIN_PROJECT_ID=fitcoach-ai-test
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xyz@fitcoach-ai-test.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQE...(rest of key)...==\n-----END PRIVATE KEY-----\n"

OPENAI_API_KEY=sk-proj-abc123def456ghi789jkl012mno345

NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_WIDGET_URL=http://localhost:3000
```

---

## Step 5: Deploy Firestore Security Rules (1 minute)

### 5.1 Install Firebase CLI (if not already installed)

```bash
npm install -g firebase-tools
```

### 5.2 Login to Firebase

```bash
firebase login
```

This will open a browser - log in with your Google account.

### 5.3 Initialize Firebase in Project

```bash
firebase init
```

- Select: **Firestore** (use spacebar to select, enter to confirm)
- Use existing project: Select your project
- Firestore rules file: Press enter (use default `firestore.rules`)
- Firestore indexes: Press enter (use default)

### 5.4 Deploy Security Rules

```bash
firebase deploy --only firestore:rules
```

You should see: `✔ Deploy complete!`

---

## Step 6: Start the Development Server (30 seconds)

```bash
npm run dev
```

Wait for the server to start. You should see:

```
✓ Ready in 3.2s
○ Local:        http://localhost:3000
```

---

## Step 7: Test the Application! 🎉

### 7.1 Create Your Coach Account

1. Open browser to [http://localhost:3000](http://localhost:3000)
2. Click **"Start Free Trial"** or **"Sign Up"**
3. Fill in the form:
   - Full Name: `Test Coach`
   - Business Name: `Test Fitness Coaching`
   - Email: Your email
   - Password: (at least 8 characters)
4. Click **"Create Account"**
5. You'll be redirected to the dashboard!

### 7.2 Configure Your Widget

1. Click **"Settings"** in the top navigation
2. Under **"Widget Setup"** tab:
   - **Primary Color**: Choose a color (default blue is fine)
   - **Welcome Message**: Leave default or customize
   - **Calendly URL**: Add your Calendly link (e.g., `https://calendly.com/your-username/15min`)
     - *Don't have Calendly?* Sign up for free at [calendly.com](https://calendly.com) or leave blank for now
3. Click **"Save Settings"**

### 7.3 Get Your Embed Code

1. Scroll down to **"Embed Code"** section
2. Click **"Copy Code"**
3. You now have the code to embed on any website!

### 7.4 Test the Chat Widget Locally

Create a test HTML file to test the widget:

```bash
# In the fitcoach-app directory
cat > test-widget.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FitCoach Widget Test</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 50px auto;
      padding: 20px;
    }
    h1 { color: #3B82F6; }
  </style>
</head>
<body>
  <h1>Test Fitness Coaching</h1>
  <p>Welcome to my coaching website! I help people achieve their fitness goals.</p>
  <p>Chat with my AI assistant in the bottom-right corner to see if we're a good fit!</p>

  <!-- PASTE YOUR EMBED CODE HERE -->
  <script>
    window.fitcoachConfig = {
      coachId: "YOUR_USER_ID_HERE",
      primaryColor: "#3B82F6",
      calendlyUrl: "https://calendly.com/your-username/15min"
    };
  </script>
  <script src="http://localhost:3000/widget/fitcoach-widget.js"></script>

</body>
</html>
EOF
```

**Replace `YOUR_USER_ID_HERE`** with your actual coach ID:
- Go to Settings → Widget Setup
- Look at the embed code - copy the `coachId` value

Open the test file in your browser:

```bash
open test-widget.html
# Or manually open it in your browser
```

### 7.5 Have a Test Conversation

1. Click the **blue chat button** in the bottom-right
2. The AI should greet you with your welcome message
3. Try a conversation:

**Example conversation:**
```
You: Hi, I want to get in shape
AI: Hey! Great to meet you! So you want to get in shape - that's awesome.
    Can you tell me more about your specific goal?

You: I want to lose 20 pounds
AI: Got it! Losing 20 pounds is a solid goal. How much experience do you
    have with structured training programs?

You: I'm a complete beginner
AI: Perfect! No problem at all. Do you have any injuries or limitations
    I should know about?

You: No injuries
AI: Great! What's your timeline to get started?

You: ASAP, I want to start this week
AI: Awesome! One last question - [Your Business Name]'s coaching starts
    at $350/month. Does this fit your budget?

You: Yes, that works for me
AI: Awesome! You sound like a great fit for [Your Business]'s program...
```

If you added a Calendly URL, you should see the calendar booking appear!

### 7.6 View Leads in Dashboard

1. Go back to [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
2. Click **"Leads"** in the navigation
3. You should see your test conversation!
4. Click **"View"** to see the full conversation transcript
5. Check the qualification data:
   - Goal: Lose weight
   - Experience: Complete beginner
   - Status: Qualified ✅

---

## Step 8: Explore the Dashboard

### Dashboard Home
- View stats: total leads, qualified leads, booked calls
- See upcoming calls
- Recent conversations

### Leads Page
- Filter by: All / Qualified / Unqualified / Booked
- Search by name, email, or goal
- View full conversation transcripts
- See qualification details

### Settings
- Configure widget appearance
- Update Calendly URL
- Copy embed code
- View subscription status

---

## Troubleshooting

### Problem: "Firebase: Error (auth/operation-not-allowed)"
**Solution:** Enable Email/Password authentication in Firebase Console → Authentication → Sign-in method

### Problem: "OpenAI API error"
**Solution:**
- Check that your API key is correct in `.env.local`
- Verify you have credits in your OpenAI account
- Make sure there are no extra spaces in the API key

### Problem: "Firebase Admin SDK error"
**Solution:**
- Check that `FIREBASE_ADMIN_PRIVATE_KEY` is in quotes
- Ensure the `\n` characters are preserved in the private key
- Verify the service account email is correct

### Problem: Widget doesn't appear
**Solution:**
- Check browser console for errors
- Verify `coachId` in the embed code matches your user ID
- Make sure the widget script URL is correct: `http://localhost:3000/widget/fitcoach-widget.js`

### Problem: "Conversation not found" error
**Solution:**
- Check Firestore security rules are deployed
- Verify you're logged in as the correct coach
- Try creating a new conversation

### Problem: Can't see private key properly
**Solution:**
In the service account JSON file, the private key looks like:
```json
{
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADA...\n-----END PRIVATE KEY-----\n"
}
```
Copy the entire value including the quotes, and paste it in `.env.local`

---

## Next Steps

### ✅ You're Ready to Test!

Now you can:
1. **Create multiple test conversations** with different responses
2. **Test the qualification logic** by answering "no" to budget or "just exploring" to timeline
3. **View qualified vs unqualified leads** in the dashboard
4. **Test on different devices** - the widget is mobile-responsive
5. **Customize the AI** by editing `lib/openai/qualification.ts`

### 🚀 When You're Ready to Deploy

1. **Deploy to Vercel:**
   - Push code to GitHub
   - Connect repository to Vercel
   - Add environment variables
   - Deploy!

2. **Update URLs:**
   - Change `NEXT_PUBLIC_APP_URL` to your Vercel domain
   - Update widget script src in embed code

3. **Update Firestore Rules:**
   - Switch from "test mode" to production rules
   - Deploy the security rules from `firestore.rules`

### 📧 Want to Add Email Automation?

Let me know and I'll add:
- Resend integration for email sending
- Pre-call preparation emails
- Nurture sequence for unqualified leads
- Coach notifications

### 💳 Want to Add Stripe Billing?

Let me know and I'll implement:
- Subscription plans (Starter $97/mo, Pro $197/mo)
- 14-day free trial
- Billing portal
- Usage limits

---

## Quick Reference

**Start dev server:**
```bash
cd fitcoach-app && npm run dev
```

**Deploy Firestore rules:**
```bash
firebase deploy --only firestore:rules
```

**View logs:**
- Browser console (F12)
- Terminal where `npm run dev` is running

**Important URLs:**
- App: http://localhost:3000
- Dashboard: http://localhost:3000/dashboard
- Login: http://localhost:3000/auth/login
- Widget script: http://localhost:3000/widget/fitcoach-widget.js

**Important Files:**
- Environment: `.env.local`
- Widget: `public/widget/fitcoach-widget.js`
- API: `app/api/chat/`
- Qualification logic: `lib/openai/qualification.ts`

---

## Support

If you run into issues:
1. Check the troubleshooting section above
2. Review error messages in browser console (F12)
3. Check terminal logs where `npm run dev` is running
4. Verify all environment variables are set correctly

Happy testing! 🎉
