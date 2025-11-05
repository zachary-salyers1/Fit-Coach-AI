'use client';

import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/lib/context/AuthContext';
import { getLeadsByCoach, getQualifiedLeadsByCoach } from '@/lib/firebase/firestore';
import type { Lead } from '@/lib/types/database';

export default function DashboardPage() {
  const { user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [qualifiedLeads, setQualifiedLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    if (!user) return;

    try {
      const [allLeads, qualified] = await Promise.all([
        getLeadsByCoach(user.uid, 10),
        getQualifiedLeadsByCoach(user.uid),
      ]);
      setLeads(allLeads);
      setQualifiedLeads(qualified);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const bookedLeads = leads.filter((lead) => lead.status === 'booked');
  const thisMonthLeads = leads.filter((lead) => {
    const leadDate = lead.createdAt.toDate();
    const now = new Date();
    return (
      leadDate.getMonth() === now.getMonth() &&
      leadDate.getFullYear() === now.getFullYear()
    );
  });

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-gray-600 mb-8">Here's what's happening today.</p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Leads This Month
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {loading ? '...' : thisMonthLeads.length}
                  </p>
                </div>
                <div className="bg-blue-100 rounded-full p-3">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Qualified Leads
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {loading ? '...' : qualifiedLeads.length}
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    {loading
                      ? ''
                      : leads.length > 0
                      ? `${Math.round(
                          (qualifiedLeads.length / leads.length) * 100
                        )}% rate`
                      : '0% rate'}
                  </p>
                </div>
                <div className="bg-green-100 rounded-full p-3">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Booked Calls
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {loading ? '...' : bookedLeads.length}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">This week</p>
                </div>
                <div className="bg-purple-100 rounded-full p-3">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Calls */}
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                📅 Upcoming Calls
              </h2>
            </div>
            <div className="p-6">
              {loading ? (
                <p className="text-gray-500">Loading...</p>
              ) : bookedLeads.length > 0 ? (
                <div className="space-y-3">
                  {bookedLeads.slice(0, 3).map((lead) => (
                    <div
                      key={lead.id}
                      className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {lead.name || 'New Lead'}
                          </p>
                          <p className="text-sm text-gray-500">
                            {lead.goalType || 'General fitness'}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-900">
                          {lead.bookingDetails?.scheduledAt
                            ? new Date(
                                lead.bookingDetails.scheduledAt.toDate()
                              ).toLocaleDateString()
                            : 'TBD'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No upcoming calls scheduled yet.</p>
              )}
            </div>
          </div>

          {/* Recent Conversations */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                💬 Recent Conversations
              </h2>
              <a
                href="/dashboard/leads"
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                View All →
              </a>
            </div>
            <div className="p-6">
              {loading ? (
                <p className="text-gray-500">Loading...</p>
              ) : leads.length > 0 ? (
                <div className="space-y-3">
                  {leads.slice(0, 5).map((lead) => (
                    <div
                      key={lead.id}
                      className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium">
                          {lead.name?.charAt(0) || '?'}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {lead.name || 'Anonymous'}
                          </p>
                          <p className="text-sm text-gray-500">
                            {lead.goalType || 'No goal specified'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            lead.qualified
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {lead.qualified ? '✅ Qualified' : '❌ Unqualified'}
                        </span>
                        <span className="text-sm text-gray-500">
                          {lead.createdAt.toDate().toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">
                    No leads yet. Get started by embedding your chat widget!
                  </p>
                  <a
                    href="/dashboard/settings"
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Get Widget Code
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
