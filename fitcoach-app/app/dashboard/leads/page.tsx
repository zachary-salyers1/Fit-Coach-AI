'use client';

import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/lib/context/AuthContext';
import { getLeadsByCoach, getConversation } from '@/lib/firebase/firestore';
import type { Lead, Conversation } from '@/lib/types/database';

export default function LeadsPage() {
  const { user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'qualified' | 'unqualified' | 'booked'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [viewingConversation, setViewingConversation] = useState(false);

  useEffect(() => {
    if (user) {
      loadLeads();
    }
  }, [user]);

  useEffect(() => {
    filterLeads();
  }, [leads, filter, searchQuery]);

  const loadLeads = async () => {
    if (!user) return;

    try {
      const allLeads = await getLeadsByCoach(user.uid);
      setLeads(allLeads);
      setLoading(false);
    } catch (error) {
      console.error('Error loading leads:', error);
      setLoading(false);
    }
  };

  const filterLeads = () => {
    let filtered = leads;

    // Apply status filter
    if (filter === 'qualified') {
      filtered = filtered.filter((lead) => lead.qualified);
    } else if (filter === 'unqualified') {
      filtered = filtered.filter((lead) => !lead.qualified);
    } else if (filter === 'booked') {
      filtered = filtered.filter((lead) => lead.status === 'booked');
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (lead) =>
          lead.name?.toLowerCase().includes(query) ||
          lead.email?.toLowerCase().includes(query) ||
          lead.goalType?.toLowerCase().includes(query)
      );
    }

    setFilteredLeads(filtered);
  };

  const handleViewConversation = async (lead: Lead) => {
    setSelectedLead(lead);
    setViewingConversation(true);

    try {
      const conv = await getConversation(lead.conversationId);
      setConversation(conv);
    } catch (error) {
      console.error('Error loading conversation:', error);
    }
  };

  const closeConversationView = () => {
    setViewingConversation(false);
    setSelectedLead(null);
    setConversation(null);
  };

  const getStatusBadge = (lead: Lead) => {
    if (lead.status === 'booked') {
      return <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">📅 Booked</span>;
    } else if (lead.qualified) {
      return <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">✅ Qualified</span>;
    } else {
      return <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">❌ Unqualified</span>;
    }
  };

  if (viewingConversation && selectedLead) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div>
            <button
              onClick={closeConversationView}
              className="mb-4 text-blue-600 hover:text-blue-700 flex items-center gap-2"
            >
              ← Back to Leads
            </button>

            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {selectedLead.name || 'Anonymous'}
                    </h2>
                    <p className="text-sm text-gray-600">{selectedLead.email}</p>
                  </div>
                  {getStatusBadge(selectedLead)}
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-600">Goal</p>
                    <p className="font-medium">{selectedLead.goalType || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Experience</p>
                    <p className="font-medium">{selectedLead.experienceLevel || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Timeline</p>
                    <p className="font-medium">{selectedLead.timeline || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Budget</p>
                    <p className="font-medium">{selectedLead.budgetResponse || 'Not specified'}</p>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversation</h3>
                <div className="space-y-4 max-h-96 overflow-y-auto bg-gray-50 p-4 rounded-lg">
                  {conversation?.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[75%] px-4 py-2 rounded-lg ${
                          message.role === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-900 border border-gray-200'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                          {message.timestamp.toDate().toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
            <button className="text-sm text-gray-600 hover:text-gray-800">
              Export CSV
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    filter === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All ({leads.length})
                </button>
                <button
                  onClick={() => setFilter('qualified')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    filter === 'qualified'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Qualified ({leads.filter((l) => l.qualified).length})
                </button>
                <button
                  onClick={() => setFilter('unqualified')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    filter === 'unqualified'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Unqualified ({leads.filter((l) => !l.qualified).length})
                </button>
                <button
                  onClick={() => setFilter('booked')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    filter === 'booked'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Booked ({leads.filter((l) => l.status === 'booked').length})
                </button>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, or goal..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
          </div>

          {/* Leads Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-gray-500">Loading leads...</div>
            ) : filteredLeads.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-500 mb-2">No leads found</p>
                {filter !== 'all' || searchQuery ? (
                  <button
                    onClick={() => {
                      setFilter('all');
                      setSearchQuery('');
                    }}
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    Clear filters
                  </button>
                ) : null}
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Goal
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {lead.name || 'Anonymous'}
                          </div>
                          <div className="text-sm text-gray-500">{lead.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {lead.goalType || 'Not specified'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(lead)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {lead.createdAt.toDate().toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleViewConversation(lead)}
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
