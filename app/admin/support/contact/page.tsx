'use client';

import { useState, useEffect } from 'react';
import { SupportTicketService } from '@/lib/services/supportTicketService';
import { SupportTicket, SupportTicketStatus } from '@/lib/types';
import AdminButton from '@/components/admin/AdminButton';
import { getErrorMessage } from '@/lib/utilities/errorhandling/errorHandler';

export default function AdminContact() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterByStatus, setFilterByStatus] = useState<string>('all');

  useEffect(() => {
    fetchTickets();
  }, [filterByStatus]);
  // fetches all tickets or tickets by the chosen status to filter
  const fetchTickets = async () => {
    setIsLoading(true);
    setError(null);
    try {
      let data: SupportTicket[];
      if (filterByStatus === 'all') {
        data = await SupportTicketService.getAll();
      } else if (filterByStatus === 'open') {
        data = await SupportTicketService.getOpenTickets();
      } else {
        data = await SupportTicketService.getByStatus(filterByStatus);
      }
      setTickets(data);
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to fetch tickets. Please try again.'));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // handles when admin changes the ticket status from the dropdown and sets a timestamp if chosing resolved
  const handleStatusChange = async (id: string, newStatus: SupportTicketStatus) => {
    try {
      const updatedTicket = await SupportTicketService.update(id, {
        status: newStatus,
        resolvedAt: newStatus === SupportTicketStatus.Resolved ? new Date().toISOString() : undefined
      });
      setTickets(tickets.map(t => t.id === id ? updatedTicket : t)); // updates the ticket matching the id in the array
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to update ticket status. Please try again.'));
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this ticket?')) return;
    
    try {
      await SupportTicketService.delete(id);
      setTickets(tickets.filter(t => t.id !== id)); // removes the deleted ticket from the list if matches id
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to delete ticket. Please try again.'));
      console.error(err);
    }
  };

  const getStatusBadge = (status: SupportTicketStatus) => {
    const statusMap = {
      [SupportTicketStatus.Open]: { label: 'Open', color: 'bg-blue-600' },
      [SupportTicketStatus.InProgress]: { label: 'In Progress', color: 'bg-yellow-600' },
      [SupportTicketStatus.Resolved]: { label: 'Resolved', color: 'bg-green-600' },
      [SupportTicketStatus.Closed]: { label: 'Closed', color: 'bg-gray-600' }
    };
    const { label, color } = statusMap[status];
    return <span className={`px-2 py-1 ${color} rounded text-xs font-bold`}>{label}</span>;
  };

  const openTicketsCount = tickets.filter(t => t.status === SupportTicketStatus.Open).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Support Tickets</h1>
        <div className="flex items-center gap-4">
          <select
          // sets the selected status to filter tickets by from the dropdown
            value={filterByStatus}
            onChange={(e) => setFilterByStatus(e.target.value)}
            className="px-3 py-2 bg-indigo-950 border border-indigo-700/30 rounded text-indigo-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Tickets</option>
            <option value="open">Open</option>
            <option value="InProgress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
          <span className="px-3 py-1 bg-red-600 rounded text-sm font-bold">{openTicketsCount} Open</span>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-900/30 border border-red-600/50 text-red-200 rounded">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-8 text-indigo-300">Loading tickets...</div>
      ) : tickets.length === 0 ? (
        <div className="text-center py-8 text-indigo-400">No tickets found.</div>
      ) : (
        <div className="space-y-3">
          {tickets.map(ticket => (
            <div key={ticket.id} className="p-4 rounded border bg-indigo-900/20 border-indigo-700/50">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg text-indigo-100">
                    {ticket.subject}
                  </h3>
                  <p className="text-sm text-indigo-400 mt-1">
                    {ticket.name} ({ticket.email}) - User: {ticket.username}
                  </p>
                </div>
                {getStatusBadge(ticket.status)}
              </div>
              <p className="text-sm text-indigo-300 mb-2">{ticket.message}</p>
              <div className="flex justify-between items-center text-xs text-indigo-400">
                <span>Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
                {ticket.resolvedAt && (
                  <span>Resolved: {new Date(ticket.resolvedAt).toLocaleDateString()}</span>
                )}
              </div>
              
              <div className="mt-3 flex gap-2 flex-wrap">
                <select
                  value={ticket.status}
                  onChange={(e) => handleStatusChange(ticket.id, parseInt(e.target.value) as SupportTicketStatus)}
                  className="px-3 py-1 bg-indigo-950 border border-indigo-700/30 rounded text-sm text-indigo-200 focus:outline-none focus:border-indigo-500"
                >
                  <option value={SupportTicketStatus.Open}>Open</option>
                  <option value={SupportTicketStatus.InProgress}>In Progress</option>
                  <option value={SupportTicketStatus.Resolved}>Resolved</option>
                  <option value={SupportTicketStatus.Closed}>Closed</option>
                </select>
                <AdminButton label="Delete" variant="delete" onClick={() => handleDelete(ticket.id)} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
