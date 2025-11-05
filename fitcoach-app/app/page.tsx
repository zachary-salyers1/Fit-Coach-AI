export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">
                FitCoach AI Assistant
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/auth/login"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign In
              </a>
              <a
                href="/auth/signup"
                className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
              >
                Start Free Trial
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Automate Your Lead Qualification
            <br />
            <span className="text-blue-600">Save 15+ Hours Per Week</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            AI-powered chatbot that qualifies leads, books sales calls, and
            nurtures prospects—so you can focus on coaching, not admin work.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="/auth/signup"
              className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 rounded-lg text-lg font-medium"
            >
              Start 14-Day Free Trial
            </a>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-600 mb-2">15+</p>
            <p className="text-gray-600">Hours Saved Per Week</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-600 mb-2">85%</p>
            <p className="text-gray-600">Show-Up Rate</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-600 mb-2">60%</p>
            <p className="text-gray-600">More Qualified Leads</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400">
            © 2025 FitCoach AI Assistant. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
