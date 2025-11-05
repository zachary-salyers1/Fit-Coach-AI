# Product Requirements Document (PRD)
## FitCoach AI Assistant

**Version:** 1.0
**Last Updated:** 2025-11-05
**Status:** Draft
**Owner:** Product Team

---

## Executive Summary

FitCoach AI Assistant is a SaaS platform that helps fitness coaches automate their lead qualification and client acquisition process. The platform provides an embeddable AI-powered chatbot that qualifies leads, books sales calls with qualified prospects, and nurtures unqualified leads—saving coaches 15-20 hours per week and reducing client acquisition costs by 30-40%.

**Market Opportunity:**
- 380,000+ certified fitness coaches in the US alone
- Average coach spends 10-15 hours/week on lead qualification and admin
- 40-60% of sales calls are with unqualified leads
- $97-197/month price point = $50M+ TAM with just 5% market penetration

**Business Model:** Subscription SaaS ($97-197/month per coach)

---

## 1. Product Overview

### 1.1 Problem Statement

Fitness coaches face three critical challenges:
1. **Time waste on unqualified leads** - Spending hours on sales calls with people who can't afford or aren't ready for coaching
2. **Low show-up rates** - 30-50% no-show rate on discovery calls due to lack of pre-call engagement
3. **Manual lead management** - Tracking leads across email, DMs, and calendars is chaotic and leads fall through the cracks

### 1.2 Solution

An AI-powered lead qualification system that:
- **Qualifies leads automatically** using a conversational chatbot
- **Books calls only with qualified prospects** based on customizable criteria
- **Sends pre-call preparation materials** to increase show-up rates
- **Manages leads in a simple CRM** so nothing falls through the cracks
- **Nurtures unqualified leads** automatically until they're ready

### 1.3 Value Proposition

**For Fitness Coaches:**
- Save 15+ hours/week on lead qualification
- Increase sales call show-up rate from 50% to 85%+
- Only talk to qualified, pre-educated prospects
- Scale from 10 to 50+ clients without hiring staff
- Built on actual exercise science (not broscience)

**Competitive Advantages:**
- Fitness-specific AI trained on coaching terminology
- Founded by someone with physiology background + automation expertise
- All-in-one solution (chat + CRM + calendar + email)
- No technical skills required (vs. building Make.com workflows)
- White-label embeddable widget

---

## 2. Goals & Objectives

### 2.1 Business Goals (12 months)

- **Acquire 100 paying coaches** ($97/mo average = $116K ARR)
- **Achieve 90%+ retention rate** (proves product-market fit)
- **Generate 50+ testimonials/case studies**
- **Build waitlist of 500+ coaches** for additional features

### 2.2 Product Goals (MVP - 8 weeks)

- **Week 1-2:** Core authentication and coach dashboard
- **Week 3-4:** Chatbot widget with basic qualification logic
- **Week 5-6:** Calendar integration + email automation
- **Week 7-8:** Billing/subscriptions + polish
- **Week 8:** Beta launch with 5-10 test coaches

### 2.3 Success Metrics

**Usage Metrics:**
- Lead qualification completion rate: >75%
- Sales call booking rate (qualified leads): >60%
- Coach dashboard login frequency: 3x/week minimum
- Widget uptime: 99.5%+

**Business Metrics:**
- Customer Acquisition Cost (CAC): <$200
- Lifetime Value (LTV): >$1,200 (12+ month retention)
- Churn rate: <10%/month
- NPS Score: >50

**Impact Metrics:**
- Hours saved per coach per week: 10-15 hours
- Increase in show-up rate: +35%
- Reduction in unqualified calls: 60%+

---

## 3. Target Audience

### 3.1 Primary Target Market

**Online Fitness Coaches** who:
- Charge $200-500+/month for 1-on-1 coaching
- Have 5-20 active clients currently
- Want to scale to 20-50 clients
- Spend 10+ hours/week on sales/admin
- Have their own website or funnel
- Are active on Instagram/social media for lead gen

**Demographics:**
- Age: 25-45
- Tech-savvy enough to embed code on website
- Annual revenue: $50K-250K
- US-based (initially)

### 3.2 Secondary Markets (Future)

- Nutrition coaches
- Strength & conditioning coaches
- Corporate wellness coaches
- Coaches inside larger platforms (Future, Trainerize, etc.)

### 3.3 Anti-Personas (Not For)

- Big-box gym trainers (not online)
- Coaches with <$100/month pricing (can't afford $97/mo tool)
- Celebrity trainers with full staff already
- Group fitness instructors

---

## 4. User Personas

### 4.1 Primary Persona: "Scaling Sarah"

**Background:**
- 32 years old, certified personal trainer + nutrition coach
- 3 years of online coaching experience
- Currently has 12 clients at $350/month
- Makes $4,200/month, wants to get to $10K+
- Active on Instagram (5K followers)

**Pain Points:**
- Gets 15-20 Instagram DM inquiries per month
- Spends 2 hours per inquiry (back-and-forth, sales call, follow-up)
- Only 3-4 actually become clients (80% waste rate)
- No-shows waste another 5 hours/week
- Can't scale beyond 15-20 clients with current process

**Goals:**
- Scale to 30+ clients
- Spend more time on actual coaching, less on sales
- Increase conversion rate from inquiry to client
- Reduce time per lead from 2 hours to <30 min

**Tech Comfort:**
- Uses Squarespace/Wix for website
- Comfortable with Calendly, ConvertKit, social media
- Not a developer, but can copy/paste embed codes

**Buying Behavior:**
- Willing to invest $100-200/month in tools that save time
- Subscribes to: ConvertKit ($29), Trainerize ($99), Canva Pro ($13)
- Needs to see ROI quickly (within 30 days)

---

### 4.2 Secondary Persona: "Science-Based Steve"

**Background:**
- 28 years old, exercise science degree
- Former strength coach, now online
- 8 clients at $400/month
- Very active on Twitter/X sharing research

**Pain Points:**
- Gets inquiries from people who don't understand science-based training
- Wastes time explaining why he doesn't do "6-week shred programs"
- Wants to pre-screen for clients who value evidence-based approach

**Goals:**
- Only talk to leads who align with his philosophy
- Educate leads before the sales call
- Build authority through his unique methodology

**Unique Needs:**
- Wants to customize qualification questions
- Wants bot to explain his science-based approach
- Cares about brand perception (white-label important)

---

## 5. Features & Requirements

### 5.1 MVP Features (Must-Have for Launch)

#### F1: Coach Authentication & Profile Setup
**Priority:** P0 (Critical)
**User Story:** As a coach, I want to create an account and set up my profile so I can start using the platform.

**Requirements:**
- Email/password signup and login
- Google OAuth login option
- Coach profile fields:
  - Full name
  - Business name
  - Email
  - Phone number (optional)
  - Website URL
  - Coaching niche/specialization
  - Pricing (for budget qualification)
  - Target client description
- Email verification required
- Password reset flow
- Profile editing capability

**Acceptance Criteria:**
- ✅ Coach can sign up in <2 minutes
- ✅ Email verification sent immediately
- ✅ Profile can be edited anytime from dashboard
- ✅ Password reset works via email link

---

#### F2: Embeddable Chat Widget
**Priority:** P0 (Critical)
**User Story:** As a coach, I want to embed an AI chatbot on my website so visitors can interact with my lead qualification system.

**Requirements:**
- Lightweight JavaScript widget (<50kb)
- Simple embed code: `<script src="..."></script>` + `<div id="fitcoach-widget"></div>`
- Configurable appearance:
  - Brand color customization
  - Position (bottom-right, bottom-left, etc.)
  - Welcome message customization
  - Avatar/logo upload
- Mobile-responsive design
- Loads asynchronously (doesn't block page load)
- Works on all major platforms (WordPress, Squarespace, Wix, Webflow, custom HTML)

**Technical Specs:**
- Built with vanilla JS (no framework dependencies)
- Communicates with backend via WebSocket or Firebase real-time
- Stores conversation state in Firestore
- Handles network failures gracefully

**Acceptance Criteria:**
- ✅ Widget loads in <1 second
- ✅ Works on 95%+ of browsers (Chrome, Safari, Firefox, Edge)
- ✅ Mobile-friendly and doesn't obscure content
- ✅ Coach can copy embed code with 1 click
- ✅ Changes to settings reflect immediately on widget

---

#### F3: AI-Powered Lead Qualification Chatbot
**Priority:** P0 (Critical)
**User Story:** As a website visitor, I want to chat with an AI assistant that asks me relevant questions and determines if I'm a good fit for coaching.

**Requirements:**

**Default Qualification Questions:**
1. What's your main fitness goal?
   - Lose weight
   - Build muscle
   - Get stronger
   - Improve athletic performance
   - General health/wellness
   - Other (text input)

2. How much experience do you have with structured training?
   - Complete beginner
   - Some experience (1-2 years)
   - Experienced (3+ years)
   - Very experienced athlete

3. Do you have any injuries or limitations?
   - No current injuries
   - Yes (text input)

4. What's your timeline to get started?
   - ASAP (this week)
   - Within 2 weeks
   - Within a month
   - Just exploring for now

5. Budget question:
   - "[Coach Name]'s coaching starts at $[X]/month. Does this fit your budget?"
   - Yes, that works
   - Need to know more first
   - That's more than I expected

**Qualification Logic:**
- **Qualified = TRUE** if:
  - Budget answer = "Yes, that works" OR "Need to know more first"
  - Timeline = "ASAP" OR "Within 2 weeks" OR "Within a month"
- **Qualified = FALSE** if:
  - Budget = "That's more than I expected"
  - Timeline = "Just exploring for now"

**AI Behavior:**
- Conversational tone (friendly, not robotic)
- Acknowledges answers ("Got it!" "That's awesome!" "Thanks for sharing")
- Asks follow-up questions if answers are vague
- For injury disclosures: "Thanks for letting me know. [Coach] will review this carefully."
- Maintains context throughout conversation

**Acceptance Criteria:**
- ✅ Conversation flows naturally (not rigid form)
- ✅ Completes qualification in <3 minutes
- ✅ Accurately determines qualification status
- ✅ Handles unexpected responses gracefully
- ✅ Conversation is saved for coach review

---

#### F4: Qualified Lead Booking Flow
**Priority:** P0 (Critical)
**User Story:** As a qualified lead, I want to book a sales call with the coach immediately after chatting.

**Requirements:**

**For Qualified Leads:**
1. Bot response: "Great! You sound like a perfect fit for [Coach Name]'s program. I'd love to get you on a quick 15-minute call to discuss your goals. Before we schedule, I'll send you a short video explaining exactly how the program works. Sound good?"

2. **Calendar Integration:**
   - Display Calendly embed (if coach uses Calendly)
   - OR display Cal.com embed (if coach uses Cal.com)
   - Lead books directly in widget
   - Booking data captured to Firestore

3. **Post-Booking Actions:**
   - Confirmation message in chat
   - Auto-send "Pre-Call Preparation" email within 1 minute
   - Lead marked as "Booked" in dashboard
   - Coach receives notification (email + in-app)

**Pre-Call Email Contents:**
- Subject: "Your call with [Coach Name] is confirmed! + Important pre-call info"
- Confirmation of date/time
- Link to coach's intro video (if provided)
- Intake form link (Google Form or Typeform)
- What to expect on the call
- Coach's contact info

**Acceptance Criteria:**
- ✅ Calendar embed displays correctly
- ✅ Booking syncs to coach's calendar
- ✅ Pre-call email sends within 60 seconds
- ✅ Lead receives confirmation
- ✅ Coach is notified of new booking

---

#### F5: Unqualified Lead Nurture Flow
**Priority:** P0 (Critical)
**User Story:** As an unqualified lead, I want to receive helpful information so I can learn more and potentially become a client later.

**Requirements:**

**For Unqualified Leads:**
1. Bot response (budget objection): "I totally understand—investing in coaching is a big decision. Here's what I'll do: I'll add you to [Coach Name]'s email list where you'll get free training tips and success stories. When you're ready to move forward, just reply to any email!"

2. Bot response (timeline objection): "No problem! It sounds like you're not quite ready to commit yet. I'll add you to [Coach Name]'s email list so you can learn more about the program. When you're ready to take the next step, you'll know exactly where to find us!"

3. **Lead Capture:**
   - Request name and email
   - Store in Firestore with "unqualified" status
   - Add reason for disqualification

4. **Nurture Email Sequence:**
   - Welcome email (immediate): "Thanks for your interest" + link to free resource
   - Email 2 (3 days later): Success story/testimonial
   - Email 3 (7 days later): Educational content (training tip or nutrition insight)
   - Email 4 (14 days later): "Still interested? Book a call" with Calendly link

**Acceptance Criteria:**
- ✅ Lead info captured even if unqualified
- ✅ Nurture sequence starts automatically
- ✅ Unqualified leads can convert to qualified later
- ✅ Coach can manually promote lead to qualified

---

#### F6: Coach Dashboard
**Priority:** P0 (Critical)
**User Story:** As a coach, I want to see all my leads in one place and manage conversations.

**Dashboard Sections:**

**A. Overview (Home Page)**
- Total leads this month
- Qualified vs. unqualified ratio
- Upcoming booked calls
- Recent conversations (last 10)
- Quick actions: "View all leads", "Settings", "Get embed code"

**B. Leads Page**
- Table view of all leads:
  - Name
  - Email
  - Status (New, Qualified, Unqualified, Booked, Contacted)
  - Date added
  - Actions (View conversation, Send message, Mark status)
- Filters: Status, Date range, Goal type
- Search by name/email
- Export to CSV

**C. Conversations Page**
- List of all chat conversations
- Click to view full transcript
- Ability to add notes to conversation
- Flag for follow-up

**D. Settings Page**
- Edit profile
- Customize qualification criteria
- Connect/disconnect calendar
- Update pricing
- Customize chatbot appearance
- Get embed code
- View billing/subscription

**Acceptance Criteria:**
- ✅ Dashboard loads in <2 seconds
- ✅ Data updates in real-time
- ✅ Mobile-responsive
- ✅ Easy navigation between sections
- ✅ Coach can complete key actions in <2 clicks

---

#### F7: Calendar Integration
**Priority:** P0 (Critical)
**User Story:** As a coach, I want to connect my Calendly or Cal.com account so leads can book calls automatically.

**Requirements:**

**Calendly Integration:**
- Coach pastes Calendly scheduling link
- System validates link
- Widget embeds Calendly iframe
- Booking events captured via Calendly webhook

**Cal.com Integration (Phase 2 - Post-MVP):**
- OAuth connection to Cal.com
- Select specific event type
- Booking events captured via Cal.com API

**Booking Data Captured:**
- Lead name, email, phone
- Selected date/time
- Event type
- Any answers to intake questions
- Synced to Firestore

**Acceptance Criteria:**
- ✅ Coach can connect calendar in <2 minutes
- ✅ Bookings sync to Firestore within 30 seconds
- ✅ Coach receives booking notification
- ✅ Lead receives confirmation email
- ✅ Connection can be updated/disconnected

---

#### F8: Email Automation
**Priority:** P0 (Critical)
**User Story:** As a coach, I want automated emails sent to leads so I don't have to manually follow up.

**Email Types:**

1. **Pre-Call Preparation Email** (Qualified + Booked)
   - Sent immediately after booking
   - Contains: Date/time, join link, what to prepare, intro video

2. **Welcome to Nurture List** (Unqualified)
   - Sent immediately after disqualification
   - Contains: Free resource, what to expect, social links

3. **Booking Confirmation to Coach**
   - Sent to coach when lead books
   - Contains: Lead name, goals, conversation summary, call details

4. **Daily Digest to Coach**
   - Sent once per day at 8am coach's timezone
   - Contains: New leads, upcoming calls, follow-up reminders

**Email Service:**
- Resend.com (preferred) or SendGrid
- Coach's domain for sending (DKIM/SPF setup)
- Unsubscribe link in all emails
- Track open/click rates

**Acceptance Criteria:**
- ✅ Emails send within 60 seconds of trigger
- ✅ >95% deliverability rate
- ✅ Coach can customize email templates
- ✅ Unsubscribe works properly
- ✅ Emails are mobile-friendly

---

#### F9: Subscription Billing
**Priority:** P0 (Critical)
**User Story:** As a coach, I want to subscribe and manage my billing so I can use the platform.

**Requirements:**

**Pricing Tiers:**
- **Starter Plan:** $97/month
  - Up to 100 leads/month
  - 1 chatbot widget
  - Email support

- **Pro Plan:** $197/month (future)
  - Unlimited leads
  - Multiple widgets
  - Advanced analytics
  - Priority support

**Billing Features:**
- Stripe integration (via Firebase Extension)
- Credit card payment
- Monthly or annual billing ($997/year = 2 months free)
- 14-day free trial (no credit card required)
- Cancel anytime
- Billing portal for invoices/receipts

**Trial Logic:**
- 14 days free, full access
- Email reminders at day 7, day 13
- Auto-convert to paid at day 14 if card added
- Downgrade to "view-only" if trial expires without payment

**Acceptance Criteria:**
- ✅ Stripe checkout works smoothly
- ✅ Subscription status updates in real-time
- ✅ Trial countdown visible in dashboard
- ✅ Failed payment recovery emails sent
- ✅ Easy cancellation process

---

### 5.2 Phase 2 Features (Post-MVP)

#### F10: Advanced Analytics Dashboard
- Conversion funnel visualization
- Response time analytics
- Peak inquiry times
- Goal breakdown (pie chart)
- Lead source tracking (UTM parameters)

#### F11: Custom Qualification Questions
- Coach can add/edit/remove questions
- Branching logic (if X, then ask Y)
- Custom qualification criteria per coach
- A/B test different question sets

#### F12: Multi-Language Support
- Spanish, Portuguese, French initially
- Auto-detect visitor language
- Translated widget UI
- Translated bot responses

#### F13: SMS Integration
- Send SMS notifications to coach on new leads
- SMS nurture sequences for leads
- Twilio integration

#### F14: Team Collaboration
- Multiple users per coach account
- Role-based permissions (Admin, Coach, Assistant)
- Internal notes on leads
- Lead assignment

#### F15: Zapier Integration
- Connect to 5000+ apps
- Trigger: New qualified lead
- Trigger: New booking
- Action: Create lead
- Action: Send message

---

## 6. Technical Architecture

### 6.1 System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    COACH DASHBOARD                      │
│                  (Next.js Frontend)                     │
│  - React components                                     │
│  - Tailwind CSS styling                                 │
│  - Firebase Auth for login                              │
│  - Real-time Firestore listeners                        │
│  - Hosted on Vercel                                     │
└─────────────────────────────────────────────────────────┘
                            │
                            ↓
┌─────────────────────────────────────────────────────────┐
│                  FIREBASE SERVICES                      │
│                                                         │
│  ┌─────────────────────────────────────────────────┐  │
│  │ AUTHENTICATION                                   │  │
│  │ - Email/password                                 │  │
│  │ - Google OAuth                                   │  │
│  │ - Session management                             │  │
│  └─────────────────────────────────────────────────┘  │
│                                                         │
│  ┌─────────────────────────────────────────────────┐  │
│  │ FIRESTORE DATABASE                               │  │
│  │ Collections:                                     │  │
│  │ - coaches                                        │  │
│  │ - leads                                          │  │
│  │ - conversations                                  │  │
│  │ - subscriptions                                  │  │
│  │ - analytics                                      │  │
│  └─────────────────────────────────────────────────┘  │
│                                                         │
│  ┌─────────────────────────────────────────────────┐  │
│  │ CLOUD FUNCTIONS (Node.js)                       │  │
│  │ - handleChatMessage()                            │  │
│  │ - qualifyLead()                                  │  │
│  │ - sendEmail()                                    │  │
│  │ - processBooking()                               │  │
│  │ - stripeWebhook()                                │  │
│  │ - dailyDigest() (scheduled)                      │  │
│  └─────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                            │
                            ↓
┌─────────────────────────────────────────────────────────┐
│                  EXTERNAL INTEGRATIONS                  │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │
│  │ OpenAI   │  │ Stripe   │  │ Resend   │  │Calendly│ │
│  │ API      │  │ Billing  │  │ Email    │  │ API    │ │
│  └──────────┘  └──────────┘  └──────────┘  └────────┘ │
└─────────────────────────────────────────────────────────┘
                            │
                            ↓
┌─────────────────────────────────────────────────────────┐
│              EMBEDDABLE CHAT WIDGET                     │
│                (Vanilla JavaScript)                     │
│  - Loads on coach's website                             │
│  - Connects to Firestore via SDK                        │
│  - Calls Cloud Functions for AI responses               │
│  - Renders calendar embed for booking                   │
│  - <script src="https://widget.fitcoach.ai/v1.js">     │
└─────────────────────────────────────────────────────────┘
```

### 6.2 Data Flow

**Lead Qualification Flow:**
```
1. Visitor lands on coach's website
2. Widget loads and displays chat interface
3. Visitor types message
4. Widget sends message to Cloud Function
5. Cloud Function calls OpenAI API with context
6. OpenAI generates response
7. Cloud Function saves message to Firestore
8. Widget displays response to visitor
9. Repeat until qualification complete
10. Cloud Function analyzes conversation
11. If qualified: Display calendar embed
12. If unqualified: Capture email, start nurture
```

**Booking Flow:**
```
1. Qualified lead sees Calendly embed
2. Lead selects time and books
3. Calendly webhook fires to Cloud Function
4. Cloud Function:
   - Updates lead status to "booked"
   - Sends pre-call email to lead
   - Sends notification to coach
   - Logs event to analytics
5. Coach sees new booking in dashboard
```

### 6.3 Technology Stack

**Frontend:**
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/ui
- **State Management:** React Context + Firebase listeners
- **Forms:** React Hook Form + Zod validation
- **Hosting:** Vercel

**Backend:**
- **Platform:** Firebase
  - Authentication: Firebase Auth
  - Database: Firestore
  - Functions: Cloud Functions (Node.js 18)
  - Storage: Firebase Storage (for images)
  - Hosting: Firebase Hosting (for widget)
- **Language:** TypeScript (Node.js)

**External Services:**
- **AI:** OpenAI API (GPT-4o-mini for cost efficiency)
- **Payments:** Stripe (via Firebase Extension)
- **Email:** Resend.com (primary) or SendGrid (backup)
- **Calendar:** Calendly API / Cal.com API
- **Analytics:** Google Analytics 4 + Custom events
- **Monitoring:** Sentry (error tracking)

**Development Tools:**
- **Version Control:** Git + GitHub
- **CI/CD:** GitHub Actions
- **Testing:** Jest (unit) + Playwright (e2e)
- **Linting:** ESLint + Prettier
- **Environment:** Node.js 18+, npm/pnpm

---

## 7. Database Schema

### 7.1 Firestore Collections

#### Collection: `coaches`
```typescript
interface Coach {
  id: string; // Auto-generated doc ID
  email: string;
  fullName: string;
  businessName: string;
  phoneNumber?: string;
  websiteUrl?: string;
  niche?: string; // "strength training", "weight loss", etc.
  pricing: {
    currency: string; // "USD"
    amount: number; // 350
    billingPeriod: "monthly" | "weekly";
  };
  targetClient?: string; // "busy professionals", "athletes", etc.
  qualificationCriteria: {
    budgetRequired: boolean; // true = must answer "yes" to budget
    timelineOptions: string[]; // ["ASAP", "Within 2 weeks"]
  };
  calendarIntegration?: {
    type: "calendly" | "cal.com";
    url: string; // Calendly link or Cal.com event ID
    webhookId?: string;
  };
  widgetSettings: {
    primaryColor: string; // "#3B82F6"
    position: "bottom-right" | "bottom-left";
    welcomeMessage: string;
    avatarUrl?: string;
  };
  emailSettings: {
    fromName: string;
    replyToEmail: string;
    introVideoUrl?: string;
    intakeFormUrl?: string;
  };
  subscription: {
    stripeCustomerId?: string;
    status: "trialing" | "active" | "past_due" | "canceled";
    plan: "starter" | "pro";
    trialEndsAt?: Timestamp;
    currentPeriodEnd?: Timestamp;
  };
  usage: {
    leadsThisMonth: number;
    leadsLimit: number; // 100 for starter, unlimited for pro
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

#### Collection: `leads`
```typescript
interface Lead {
  id: string;
  coachId: string; // Reference to coaches collection

  // Contact info
  name?: string;
  email?: string;
  phoneNumber?: string;

  // Qualification data
  goalType?: string; // "lose weight", "build muscle", etc.
  experienceLevel?: string; // "beginner", "intermediate", etc.
  injuries?: string;
  timeline?: string; // "ASAP", "Within 2 weeks", etc.
  budgetResponse?: string; // "Yes, that works", etc.

  // Status
  qualified: boolean;
  status: "new" | "qualified" | "unqualified" | "booked" | "contacted" | "converted" | "lost";
  disqualificationReason?: "budget" | "timeline" | "other";

  // Booking info (if qualified)
  bookingDetails?: {
    scheduledAt: Timestamp;
    calendlyEventId?: string;
    meetingUrl?: string;
  };

  // Metadata
  conversationId: string; // Reference to conversations collection
  source?: string; // UTM tracking
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastContactedAt?: Timestamp;

  // Coach notes
  notes?: string;
  flaggedForFollowUp: boolean;
}
```

#### Collection: `conversations`
```typescript
interface Conversation {
  id: string;
  coachId: string;
  leadId: string;

  messages: Array<{
    id: string;
    role: "user" | "assistant" | "system";
    content: string;
    timestamp: Timestamp;
  }>;

  status: "active" | "completed" | "abandoned";
  qualificationCompleted: boolean;

  metadata: {
    startedAt: Timestamp;
    completedAt?: Timestamp;
    messageCount: number;
    averageResponseTime?: number; // seconds
  };
}
```

#### Collection: `analytics`
```typescript
interface AnalyticsEvent {
  id: string;
  coachId: string;
  eventType: "widget_loaded" | "conversation_started" | "conversation_completed" |
             "lead_qualified" | "lead_disqualified" | "booking_made" | "email_sent";

  data: Record<string, any>; // Event-specific data
  timestamp: Timestamp;

  // For aggregation
  date: string; // "2025-11-05"
  hour: number; // 0-23
  dayOfWeek: number; // 0-6
}
```

### 7.2 Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Coaches can only read/write their own data
    match /coaches/{coachId} {
      allow read, write: if request.auth != null && request.auth.uid == coachId;
    }

    // Coaches can only access their own leads
    match /leads/{leadId} {
      allow read, update: if request.auth != null &&
                             get(/databases/$(database)/documents/leads/$(leadId)).data.coachId == request.auth.uid;
      allow create: if true; // Widget creates leads (authenticated via API key)
    }

    // Coaches can only access their own conversations
    match /conversations/{conversationId} {
      allow read: if request.auth != null &&
                    get(/databases/$(database)/documents/conversations/$(conversationId)).data.coachId == request.auth.uid;
      allow write: if true; // Widget writes messages (authenticated via API key)
    }

    // Analytics read-only for coaches
    match /analytics/{eventId} {
      allow read: if request.auth != null &&
                    get(/databases/$(database)/documents/analytics/$(eventId)).data.coachId == request.auth.uid;
      allow write: if false; // Only Cloud Functions can write analytics
    }
  }
}
```

---

## 8. API Specifications

### 8.1 Cloud Functions

#### Function: `handleChatMessage`
**Trigger:** HTTPS Callable
**Purpose:** Process chat messages and generate AI responses

**Input:**
```typescript
{
  coachId: string;
  conversationId: string;
  message: string;
  metadata?: {
    userAgent: string;
    source: string;
  }
}
```

**Output:**
```typescript
{
  response: string;
  conversationComplete: boolean;
  qualified?: boolean;
  nextStep?: "show_calendar" | "capture_email" | "continue";
}
```

**Logic:**
1. Validate coachId and retrieve coach config
2. Fetch conversation history from Firestore
3. Build OpenAI prompt with context + qualification criteria
4. Call OpenAI API
5. Parse response for qualification signals
6. Save message to Firestore
7. Return response to widget

**OpenAI Prompt Template:**
```
You are a friendly AI assistant for {coach.businessName}, a fitness coach specializing in {coach.niche}.

Your job is to qualify leads by asking these questions:
1. What's their main fitness goal?
2. Training experience level?
3. Any injuries or limitations?
4. Timeline to get started?
5. Budget fit: "{coach.businessName}'s coaching starts at ${coach.pricing.amount}/month. Does this fit your budget?"

Be conversational and friendly. Acknowledge their answers. If they seem hesitant, provide encouragement.

Qualification criteria:
- Budget: Must say yes or "need to know more"
- Timeline: Must be within a month

Previous conversation:
{conversationHistory}

User's latest message: {message}

Respond naturally and guide them through qualification. If all questions answered, determine if qualified.
```

---

#### Function: `processBooking`
**Trigger:** HTTPS Webhook (from Calendly)
**Purpose:** Handle calendar bookings and trigger post-booking actions

**Input (Calendly Webhook):**
```typescript
{
  event: "invitee.created",
  payload: {
    event_type: { name: string, slug: string },
    invitee: {
      name: string,
      email: string,
      phone_number?: string
    },
    scheduled_event: {
      start_time: string,
      end_time: string,
      location: { join_url?: string }
    }
  }
}
```

**Actions:**
1. Extract invitee email
2. Find matching lead in Firestore by email
3. Update lead status to "booked"
4. Store booking details
5. Trigger email to lead (pre-call prep)
6. Trigger email to coach (new booking notification)
7. Log analytics event

---

#### Function: `sendEmail`
**Trigger:** Callable / Internal
**Purpose:** Send transactional and nurture emails

**Input:**
```typescript
{
  to: string;
  templateId: "pre_call_prep" | "welcome_nurture" | "coach_notification" | "daily_digest";
  data: Record<string, any>;
}
```

**Email Templates:**

**Pre-Call Prep:**
```
Subject: Your call with {coachName} is confirmed! 📅

Hi {leadName},

Great news! Your 15-minute call with {coachName} is confirmed for:
📅 {date} at {time}

Before we talk, here's what to do:

1. Watch this quick intro video: {introVideoUrl}
2. Fill out this intake form: {intakeFormUrl}
3. Come prepared with your top 3 fitness goals

Talk soon!
{coachName}

P.S. Can't make it? Reschedule here: {rescheduleUrl}
```

---

#### Function: `dailyDigest`
**Trigger:** Scheduled (Cloud Scheduler - daily at 8am)
**Purpose:** Send daily summary to coaches

**Actions:**
1. Query all active coaches
2. For each coach:
   - Count new leads (last 24h)
   - List qualified leads not yet contacted
   - List upcoming calls (next 48h)
   - Send digest email if any activity

---

### 8.2 Widget API

The chat widget communicates with Firebase directly (not via REST API) for real-time updates.

**Widget Initialization:**
```javascript
<script>
  window.fitcoachConfig = {
    coachId: "abc123",
    apiKey: "pk_live_...", // Public API key
  };
</script>
<script src="https://widget.fitcoach.ai/v1.js"></script>
<div id="fitcoach-widget"></div>
```

**Widget Methods:**
```javascript
// Initialize
FitCoachWidget.init(config);

// Send message
FitCoachWidget.sendMessage(text);

// Close widget
FitCoachWidget.close();

// Open widget programmatically
FitCoachWidget.open();

// Event listeners
FitCoachWidget.on('conversation_complete', (data) => {
  console.log('Qualified:', data.qualified);
});
```

---

## 9. UI/UX Requirements

### 9.1 Design Principles

1. **Simplicity First**: Every feature should be usable by non-technical coaches
2. **Mobile-First**: 60% of coaches will use dashboard on mobile
3. **Speed**: Every page loads in <2 seconds
4. **Clarity**: No jargon, clear calls-to-action
5. **Trust**: Professional design, no "startup" aesthetic

### 9.2 Dashboard Wireframes

**Login Page:**
```
┌─────────────────────────────────────────┐
│          FitCoach AI Assistant          │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │ Email                             │ │
│  │ [__________________________]      │ │
│  │                                   │ │
│  │ Password                          │ │
│  │ [__________________________]      │ │
│  │                                   │ │
│  │     [Login]   [Sign Up]           │ │
│  │                                   │ │
│  │  ──────── or ────────             │ │
│  │                                   │ │
│  │  [🔵 Continue with Google]        │ │
│  └───────────────────────────────────┘ │
│                                         │
│  Forgot password? | Need help?          │
└─────────────────────────────────────────┘
```

**Dashboard Home:**
```
┌─────────────────────────────────────────────────────────────┐
│  FitCoach AI  |  Dashboard  Leads  Settings  [👤 Profile ▼] │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Welcome back, Sarah! 👋                                     │
│                                                              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │ 23 Leads    │ │ 14 Qualified│ │ 8 Booked    │           │
│  │ This month  │ │ 61% rate    │ │ This week   │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
│                                                              │
│  📅 Upcoming Calls                                           │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ • Tomorrow at 2pm - Mike Johnson (Build muscle)      │   │
│  │ • Friday at 10am - Lisa Chen (Weight loss)           │   │
│  │ • Friday at 3pm - David Smith (General fitness)      │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  💬 Recent Conversations                                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Mike J.  | "Lose 20lbs" | Qualified ✅ | 2 hours ago  │   │
│  │ Lisa C.  | "Build muscle"| Qualified ✅ | 5 hours ago │   │
│  │ David S. | "Get fit"    | Unqualified ❌| Yesterday   │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  [View All Leads →]                                          │
└─────────────────────────────────────────────────────────────┘
```

**Leads Page:**
```
┌─────────────────────────────────────────────────────────────┐
│  All Leads                                  [Export CSV ▼]   │
│                                                              │
│  Filters: [All ▼] [This Month ▼]     Search: [___________]  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Name      | Goal        | Status      | Date  | 👁️   │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │ Mike J.   | Lose weight | Qualified ✅ | Nov 5 | View │   │
│  │ Lisa C.   | Build muscle| Booked 📅   | Nov 5 | View │   │
│  │ David S.  | Get fit     | Nurture 📧  | Nov 4 | View │   │
│  │ Sarah W.  | Strength    | New 🆕      | Nov 4 | View │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  Showing 1-10 of 47        [← 1 2 3 4 5 →]                  │
└─────────────────────────────────────────────────────────────┘
```

### 9.3 Chat Widget Design

**Closed State:**
```
                                 ┌─────────┐
                                 │ 💬 Chat │
                                 └─────────┘
```

**Open State:**
```
┌─────────────────────────────┐
│ 💬 Chat with Sarah         ✕│
├─────────────────────────────┤
│                             │
│  🤖 Hi! I'm Sarah's AI      │
│     assistant. Ready for    │
│     a few quick questions?  │
│                             │
│                  Yes! 🟦    │
│                             │
│  💬 Great! What's your      │
│     main fitness goal?      │
│                             │
│     • Lose weight           │
│     • Build muscle          │
│     • Get stronger          │
│     • Other                 │
│                             │
├─────────────────────────────┤
│ Type a message...    [Send] │
└─────────────────────────────┘
```

### 9.4 Mobile Responsiveness

- Dashboard navigation collapses to hamburger menu
- Cards stack vertically on mobile
- Tables convert to card views on mobile
- Chat widget is full-screen on mobile
- All touch targets minimum 44x44px

---

## 10. Security & Compliance

### 10.1 Security Requirements

**Authentication:**
- Passwords must be 8+ characters
- Email verification required before full access
- Session timeout after 30 days of inactivity
- Two-factor authentication (Phase 2)

**Data Protection:**
- All data encrypted at rest (Firestore default)
- All connections over HTTPS only
- API keys rotated every 90 days
- No storage of credit card data (Stripe handles)

**Access Control:**
- Coaches can only access their own data
- Admin panel separate from coach dashboard
- Rate limiting on API endpoints (100 req/min per coach)
- Widget API key validated on every request

**Monitoring:**
- Sentry for error tracking
- Firebase monitoring for performance
- Alert on unusual activity (sudden spike in leads)
- Weekly security audit of Firestore rules

### 10.2 Compliance

**GDPR (EU users):**
- Cookie consent banner
- Data export functionality
- Account deletion (removes all data)
- Privacy policy clearly linked

**CAN-SPAM (Email):**
- Unsubscribe link in every email
- Physical address in footer
- Honor unsubscribe within 10 business days
- Clear "From" name

**CCPA (California users):**
- "Do Not Sell My Info" link
- Data access request handling
- Opt-out functionality

**Terms of Service:**
- Clear pricing and refund policy
- Service-level agreement (99% uptime)
- Acceptable use policy (no spam)
- Data retention policy (leads stored 2 years, then deleted)

### 10.3 Data Retention

- **Active coaches**: Data retained indefinitely
- **Canceled accounts**: Data retained 90 days, then deleted
- **Leads**: Retained 2 years from last activity, then deleted
- **Analytics**: Aggregated data retained indefinitely
- **Backups**: Daily backups, retained 30 days

---

## 11. Success Metrics & KPIs

### 11.1 Product Metrics

**Activation:**
- % of signups that complete onboarding: Target >80%
- Time to first lead: Target <24 hours
- % of coaches who embed widget: Target >90%

**Engagement:**
- Coach dashboard logins per week: Target 3+
- Leads per coach per month: Target 15+
- Conversations completed per lead: Target >75%

**Retention:**
- Month 1 retention: Target >85%
- Month 3 retention: Target >70%
- Month 12 retention: Target >50%

**Revenue:**
- Monthly Recurring Revenue (MRR): Target $10K by month 6
- Average Revenue Per User (ARPU): Target $130/mo
- Churn rate: Target <8%/month

### 11.2 Impact Metrics (Coach Outcomes)

- Hours saved per week: Target 10-15 hours
- Show-up rate improvement: Target +30%
- Qualified lead percentage: Target >60%
- Conversion from qualified to client: Target >40%

### 11.3 Analytics Dashboard

**Coach-Facing Analytics (in Dashboard):**
- Total leads this week/month
- Qualified vs. unqualified ratio
- Conversion funnel: Visitor → Lead → Qualified → Booked → Client
- Most common goals (pie chart)
- Peak inquiry times (heatmap)
- Average response time

**Internal Analytics (Admin Only):**
- Total coaches (active, churned, trial)
- MRR growth
- Churn rate by cohort
- Feature adoption rates
- Customer acquisition cost (CAC)
- Lifetime value (LTV)
- Support ticket volume

---

## 12. Launch Plan

### 12.1 Development Timeline (8 Weeks)

**Week 1-2: Foundation**
- Set up Next.js project
- Configure Firebase (Auth, Firestore, Functions)
- Build authentication flows (signup, login, password reset)
- Create basic dashboard shell
- Design database schema

**Week 3-4: Core Features**
- Build chat widget (vanilla JS)
- Implement OpenAI integration for conversations
- Build lead qualification logic
- Create coach profile setup flow
- Build leads management page

**Week 5-6: Integrations**
- Calendly integration (webhook + embed)
- Email automation (Resend setup)
- Pre-call email templates
- Nurture email sequences
- Dashboard real-time updates

**Week 7: Billing & Polish**
- Stripe integration
- Subscription management
- Trial logic
- UI polish and mobile responsiveness
- Error handling and loading states

**Week 8: Testing & Launch**
- End-to-end testing
- Beta coach onboarding (5 coaches)
- Bug fixes from beta feedback
- Performance optimization
- Official launch

### 12.2 Beta Program

**Goals:**
- 5-10 beta coaches
- Free lifetime access in exchange for feedback
- Weekly feedback sessions
- Case studies and testimonials

**Ideal Beta Coaches:**
- Active online coaches with existing lead flow
- Tech-savvy (can troubleshoot)
- Willing to share honest feedback
- Different niches (strength, weight loss, nutrition)

**Success Criteria:**
- 80%+ satisfaction rating
- At least 3 coaches willing to be case studies
- Average 10+ qualified leads per coach in month 1
- Zero critical bugs reported

### 12.3 Go-to-Market Strategy

**Pre-Launch (2 weeks before):**
- Create landing page with waitlist
- Share in fitness coaching Facebook groups
- Reach out to coaching influencers
- Create demo video (Loom)
- Build email sequence for waitlist

**Launch Week:**
- Email waitlist with beta access
- Post in 10+ coaching communities
- Reach out to 50 coaches via DM
- Publish launch blog post
- Run small Facebook ads ($500 budget)

**Post-Launch (First Month):**
- Weekly content marketing (1 blog post/week)
- Case studies from beta coaches
- Social proof campaign (testimonials)
- Refine onboarding based on feedback
- Plan first feature update

### 12.4 Pricing Strategy

**Launch Pricing:**
- **Starter Plan:** $97/month (or $997/year)
- 14-day free trial (no credit card)
- Money-back guarantee (30 days)
- Early adopter discount: First 50 coaches get 20% off forever

**Future Pricing:**
- Once product is validated, increase to $127/month
- Grandfather early adopters at $97/month
- Introduce Pro plan at $197/month with advanced features

---

## 13. Risks & Mitigation

### 13.1 Technical Risks

**Risk: OpenAI API downtime**
- **Mitigation:** Implement retry logic, fallback to simpler responses, status page notification

**Risk: High OpenAI costs**
- **Mitigation:** Use GPT-4o-mini, implement token limits, cache common responses, monitor spend daily

**Risk: Firebase scaling issues**
- **Mitigation:** Start with generous free tier, monitor quotas, optimize queries, plan for upgrade

**Risk: Email deliverability problems**
- **Mitigation:** Set up DKIM/SPF properly, use reputable ESP (Resend), monitor bounce rates

### 13.2 Business Risks

**Risk: Low coach adoption**
- **Mitigation:** Focus on beta coach success stories, iterate on onboarding, offer white-glove setup

**Risk: High churn rate**
- **Mitigation:** Weekly engagement emails, in-app tips, customer success check-ins, continuous feature updates

**Risk: Competition (larger players enter space)**
- **Mitigation:** Move fast, build loyal community, double down on fitness-specific features

**Risk: Coaches don't see ROI**
- **Mitigation:** Set clear expectations, provide best practices guide, track and display impact metrics

### 13.3 Legal Risks

**Risk: GDPR/privacy violations**
- **Mitigation:** Legal review before launch, clear privacy policy, GDPR compliance checklist

**Risk: Stripe account holds**
- **Mitigation:** Transparent business description, low chargeback rate, responsive support

**Risk: Trademark issues**
- **Mitigation:** Trademark search before launch, consult IP attorney

---

## 14. Future Roadmap (Post-MVP)

### Phase 2 (Months 3-6)

**Advanced Features:**
- Custom qualification questions (coach-configurable)
- A/B testing different chatbot scripts
- SMS notifications via Twilio
- Multi-language support (Spanish first)
- Team accounts (multiple users per coach)

**Integrations:**
- Cal.com native integration
- Zapier integration
- Instagram DM integration (auto-qualify from DMs)
- GoHighLevel integration

**Analytics:**
- Conversion funnel visualization
- Lead source attribution (UTM tracking)
- Peak inquiry times heatmap
- Revenue attribution per lead

### Phase 3 (Months 6-12)

**Additional Automation Modules:**
- Onboarding automation (welcome packets, intake forms)
- Check-in automation (weekly progress tracking)
- Program delivery (workout/nutrition plan generator)
- Client retention system (milestone celebrations)

**Enterprise Features:**
- White-label solution
- API access for custom integrations
- Dedicated account manager
- Custom SLA

**Marketplace:**
- Template library (different qualification scripts)
- Email template marketplace
- Chatbot personality packs
- Community-contributed resources

---

## 15. Open Questions & Decisions Needed

### Questions for Discussion:

1. **Should we support coaches who don't have a website?**
   - Option A: Require website for MVP
   - Option B: Provide hosted landing page with widget
   - Option C: Social media link-in-bio integration

2. **How do we handle coaches with multiple offerings?**
   - Example: Some coaches offer both 1-on-1 ($500/mo) and group coaching ($99/mo)
   - Should widget qualify for both? Or separate widgets?

3. **What's our refund policy?**
   - Option A: 30-day money-back guarantee (higher trust, more refunds)
   - Option B: Pro-rated refund only (lower refunds, less trust)
   - Option C: No refunds, but cancel anytime (simple, but risky for coaches)

4. **Should we build Cal.com integration for MVP or focus only on Calendly?**
   - Cal.com is open-source and growing
   - But Calendly is more popular among coaches
   - Building both adds 5-7 days to timeline

5. **Do we need phone number collection in qualification?**
   - Pro: Easier for coaches to call leads directly
   - Con: Some leads hesitant to give phone number, may reduce conversion

6. **Should we offer a freemium tier?**
   - Free: Up to 10 leads/month (to attract sign-ups)
   - Paid: Unlimited leads + advanced features
   - Risk: Lots of free users who never convert

---

## 16. Appendix

### A. Competitive Analysis

**Competitor 1: Landbot**
- **Price:** $40-300/month
- **Strengths:** Visual builder, many integrations
- **Weaknesses:** Not fitness-specific, complex setup, expensive
- **Our Advantage:** Fitness-focused, simpler, better qualification logic

**Competitor 2: ManyChat**
- **Price:** $15-145/month
- **Strengths:** Popular, Instagram/Facebook integration
- **Weaknesses:** Focused on social media, not websites, clunky UI
- **Our Advantage:** Website-first, AI-powered conversations, cleaner UX

**Competitor 3: Tawk.to**
- **Price:** Free (live chat only)
- **Strengths:** Free, easy setup
- **Weaknesses:** Requires manual responses, no AI, no qualification logic
- **Our Advantage:** Fully automated, AI-powered, built for sales

**Competitor 4: Drift**
- **Price:** $2,500+/month (enterprise)
- **Strengths:** Powerful, great integrations, ABM features
- **Weaknesses:** Insanely expensive, overkill for solopreneurs
- **Our Advantage:** Affordable, perfect for solo/small coaches

**Key Takeaway:** We're the only AI-powered, fitness-specific, affordable lead qualification solution.

### B. User Research Insights

**From 10 Coach Interviews:**
- 90% spend 10+ hours/week on unqualified leads
- 70% have missed qualified leads due to slow response
- 80% want automation but don't know how to set it up
- 60% use Calendly already
- 40% would pay $100+/month for a solution that saves 10+ hours/week
- Main objection: "Will it sound robotic?" (needs to be conversational)

### C. Technical Definitions

**Lead:** A person who has initiated a conversation with the chatbot
**Qualified Lead:** A lead who meets the coach's criteria (budget + timeline)
**Conversion:** A qualified lead who books a sales call
**Client:** A lead who becomes a paying client (tracked outside this system)
**Nurture:** Automated email sequence for unqualified leads

### D. Glossary

- **MVP:** Minimum Viable Product (first launchable version)
- **SaaS:** Software as a Service (subscription model)
- **ARR:** Annual Recurring Revenue
- **MRR:** Monthly Recurring Revenue
- **CAC:** Customer Acquisition Cost
- **LTV:** Lifetime Value
- **Churn:** Rate at which customers cancel
- **NPS:** Net Promoter Score (customer satisfaction metric)
- **GDPR:** General Data Protection Regulation (EU privacy law)
- **CAN-SPAM:** US law governing commercial email
- **CCPA:** California Consumer Privacy Act

---

## Sign-Off

**Prepared By:** Product Team
**Reviewed By:** [Pending]
**Approved By:** [Pending]

**Next Steps:**
1. Review and approve PRD
2. Finalize open questions
3. Set up development environment
4. Begin Week 1 development sprint

---

*This PRD is a living document and will be updated as we learn from users and iterate on the product.*
