'use client';

import { useState } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/lib/context/AuthContext';
import { updateCoach } from '@/lib/firebase/firestore';

export default function SettingsPage() {
  const { user, coach, refreshCoach } = useAuth();
  const [activeTab, setActiveTab] = useState('widget');
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const [widgetColor, setWidgetColor] = useState(
    coach?.widgetSettings.primaryColor || '#3B82F6'
  );
  const [welcomeMessage, setWelcomeMessage] = useState(
    coach?.widgetSettings.welcomeMessage || ''
  );
  const [calendlyUrl, setCalendlyUrl] = useState(
    coach?.calendarIntegration?.url || ''
  );

  const embedCode = `<!-- FitCoach AI Widget -->
<script>
  window.fitcoachConfig = {
    coachId: "${user?.uid || 'YOUR_COACH_ID'}",
    primaryColor: "${widgetColor}",
    calendlyUrl: "${calendlyUrl}"
  };
</script>
<script src="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/widget/fitcoach-widget.js"></script>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveSettings = async () => {
    if (!user) return;

    setSaving(true);
    setMessage('');

    try {
      await updateCoach(user.uid, {
        widgetSettings: {
          ...coach!.widgetSettings,
          primaryColor: widgetColor,
          welcomeMessage,
        },
        calendarIntegration: calendlyUrl
          ? {
              type: 'calendly',
              url: calendlyUrl,
            }
          : undefined,
      });

      await refreshCoach();
      setMessage('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('widget')}
                className={`${
                  activeTab === 'widget'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Widget Setup
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`${
                  activeTab === 'profile'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab('billing')}
                className={`${
                  activeTab === 'billing'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Billing
              </button>
            </nav>
          </div>

          {/* Widget Setup Tab */}
          {activeTab === 'widget' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Widget Configuration
                </h2>

                {message && (
                  <div
                    className={`mb-4 p-4 rounded ${
                      message.includes('success')
                        ? 'bg-green-50 text-green-700'
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {message}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Primary Color
                    </label>
                    <div className="flex gap-4 items-center">
                      <input
                        type="color"
                        value={widgetColor}
                        onChange={(e) => setWidgetColor(e.target.value)}
                        className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={widgetColor}
                        onChange={(e) => setWidgetColor(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="#3B82F6"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Welcome Message
                    </label>
                    <textarea
                      value={welcomeMessage}
                      onChange={(e) => setWelcomeMessage(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Hi! I'm your AI assistant. Ready for a few quick questions?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Calendly URL
                    </label>
                    <input
                      type="url"
                      value={calendlyUrl}
                      onChange={(e) => setCalendlyUrl(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="https://calendly.com/your-username/15min"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Your Calendly scheduling link for qualified leads
                    </p>
                  </div>

                  <button
                    onClick={handleSaveSettings}
                    disabled={saving}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Save Settings'}
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Embed Code
                </h2>
                <p className="text-gray-600 mb-4">
                  Copy and paste this code before the closing{' '}
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                    &lt;/body&gt;
                  </code>{' '}
                  tag on your website.
                </p>

                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                    {embedCode}
                  </pre>
                  <button
                    onClick={handleCopyCode}
                    className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
                  >
                    {copied ? 'Copied!' : 'Copy Code'}
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  📝 Setup Instructions
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-blue-800 text-sm">
                  <li>Configure your widget settings above</li>
                  <li>Add your Calendly URL for booking qualified leads</li>
                  <li>Copy the embed code</li>
                  <li>
                    Paste it before the{' '}
                    <code className="bg-blue-100 px-1 rounded">&lt;/body&gt;</code>{' '}
                    tag on your website
                  </li>
                  <li>Your chat widget will appear in the bottom-right corner!</li>
                </ol>
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Profile Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={coach?.fullName || ''}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={coach?.businessName || ''}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={coach?.email || ''}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  />
                </div>
                <p className="text-sm text-gray-500">
                  To update your profile information, please contact support.
                </p>
              </div>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Subscription & Billing
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-blue-900">
                      {coach?.subscription.plan === 'starter' ? 'Starter' : 'Pro'}{' '}
                      Plan
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        coach?.subscription.status === 'trialing'
                          ? 'bg-green-100 text-green-800'
                          : coach?.subscription.status === 'active'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {coach?.subscription.status === 'trialing'
                        ? 'Trial'
                        : coach?.subscription.status}
                    </span>
                  </div>
                  <p className="text-sm text-blue-800">
                    {coach?.subscription.status === 'trialing'
                      ? 'Your 14-day free trial is active. No credit card required.'
                      : 'Your subscription is active.'}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Usage This Month</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${Math.min(
                            100,
                            ((coach?.usage.leadsThisMonth || 0) /
                              (coach?.usage.leadsLimit || 100)) *
                              100
                          )}%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">
                      {coach?.usage.leadsThisMonth || 0} / {coach?.usage.leadsLimit || 100}{' '}
                      leads
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mt-4">
                  Stripe billing integration coming soon. For now, enjoy your free trial!
                </p>
              </div>
            </div>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
