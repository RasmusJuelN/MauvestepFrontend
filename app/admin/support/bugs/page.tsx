'use client';

import { useState, useEffect } from 'react';
import AdminButton from '@/components/admin/AdminButton';
import { BugReportService } from '@/lib/services/bugReportService';
import { BugReport, BugReportStatus, BugReportSeverity } from '@/lib/DTOs/bugReport';
import { getErrorMessage } from '@/lib/utilities/errorhandling/errorHandler';

export default function AdminBugs() {
  const [bugs, setBugs] = useState<BugReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterByStatus, setFilterByStatus] = useState<string>('all');
  const [filterBySeverity, setFilterBySeverity] = useState<string>('all');

  useEffect(() => {
    fetchBugs();
  }, [filterByStatus, filterBySeverity]);
  const fetchBugs = async () => {
    setLoading(true);
    setError('');
    
    try {
      let data: BugReport[];
      
      if (filterByStatus !== 'all' && filterBySeverity !== 'all') {
        // Fetch all and filter client-side when both filters are active
        const allBugs = await BugReportService.getAll();
        const statusEnum = parseInt(filterByStatus) as BugReportStatus;
        const severityEnum = parseInt(filterBySeverity) as BugReportSeverity;
        data = allBugs.filter(bug => bug.status === statusEnum && bug.severity === severityEnum);
      } else if (filterByStatus !== 'all') {
        const statusEnum = parseInt(filterByStatus) as BugReportStatus;
        data = await BugReportService.getByStatus(statusEnum);
      } else if (filterBySeverity !== 'all') {
        const severityEnum = parseInt(filterBySeverity) as BugReportSeverity;
        data = await BugReportService.getBySeverity(severityEnum);
      } else {
        data = await BugReportService.getAll();
      }
      
      setBugs(data);
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to load bug reports. Please try again.'));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: BugReportStatus) => {
    try {
      const bugToUpdate = bugs.find(b => b.id === id);
      if (!bugToUpdate) return;

      await BugReportService.update(id, {

        severity: bugToUpdate.severity,
        status: newStatus
      });

      setBugs(bugs.map(bug => bug.id === id ? { ...bug, status: newStatus } : bug));
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to update bug report status. Please try again.'));
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this bug report?')) return;

    try {
      await BugReportService.delete(id);
      setBugs(bugs.filter(b => b.id !== id));
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to delete bug report. Please try again.'));
      console.error(err);
    }
  };

  const getSeverityWithCorrespondingColor = (severity: BugReportSeverity) => {
    const severityWithColor: Record<number, { color: string; label: string }> = {
      [BugReportSeverity.Low]: { color: 'text-blue-400', label: 'Low' },
      [BugReportSeverity.Medium]: { color: 'text-yellow-400', label: 'Medium' },
      [BugReportSeverity.High]: { color: 'text-orange-400', label: 'High' },
      [BugReportSeverity.Critical]: { color: 'text-red-400', label: 'Critical' }
    };
    return severityWithColor[severity] || { color: 'text-indigo-400', label: 'Unknown' };
  };

  const getStatusWithCorrespondingColor = (status: BugReportStatus) => {
    const statusWithColor: Record<number, { color: string; label: string }> = {
      [BugReportStatus.Open]: { color: 'bg-red-600/20 text-red-300', label: 'Open' },
      [BugReportStatus.InProgress]: { color: 'bg-yellow-600/20 text-yellow-300', label: 'In Progress' },
      [BugReportStatus.Resolved]: { color: 'bg-green-600/20 text-green-300', label: 'Resolved' },
      [BugReportStatus.Closed]: { color: 'bg-gray-600/20 text-gray-300', label: 'Closed' }
      };
    return statusWithColor[status] || { color: 'bg-indigo-600/20 text-indigo-300', label: 'Unknown' };
  };


  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Bug Reports</h1>
        
        <div className="flex gap-4">
          <select
            value={filterByStatus}
            onChange={(e) => setFilterByStatus(e.target.value)}
            className="px-4 py-2 bg-indigo-950 hover:bg-indigo-900 border border-indigo-700 rounded text-sm text-indigo-200 cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value={BugReportStatus.Open}>Open</option>
            <option value={BugReportStatus.InProgress}>In Progress</option>
            <option value={BugReportStatus.Resolved}>Resolved</option>
            <option value={BugReportStatus.Closed}>Closed</option>
          </select>
      
          <select
            value={filterBySeverity}
            onChange={(e) => setFilterBySeverity(e.target.value)}
            className="px-4 py-2 bg-indigo-950 hover:bg-indigo-900 border border-indigo-700 rounded text-sm text-indigo-200 cursor-pointer"
          >
            <option value="all">All Severities</option>
            <option value={BugReportSeverity.Low}>Low</option>
            <option value={BugReportSeverity.Medium}>Medium</option>
            <option value={BugReportSeverity.High}>High</option>
            <option value={BugReportSeverity.Critical}>Critical</option>
          </select>
        </div>
      </div>

      {loading && <p className="text-indigo-300">Loading bug reports...</p>}
      
      {error && (
        <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      {!loading && bugs.length === 0 && (
        <p className="text-indigo-400">No bug reports found.</p>
      )}

      <div className="space-y-2">
        {bugs.map(bug => (
          <div key={bug.id} className="bg-indigo-900/30 rounded border border-indigo-700">
            <button
              onClick={() => setExpandedId(expandedId === bug.id ? null : bug.id)}
              className="w-full p-4 text-left hover:bg-indigo-900/50 transition flex justify-between items-center cursor-pointer"
            >
              <div className="flex-1">
                <h3 className="font-bold text-lg">{bug.title}</h3>
                <p className="text-xs text-indigo-400 mt-1">
                  {new Date(bug.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <span className={`px-2 py-1 rounded text-xs font-bold 
                  ${getSeverityWithCorrespondingColor(bug.severity).color}`}>
                  {getSeverityWithCorrespondingColor(bug.severity).label.toUpperCase()}
                </span>
                <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusWithCorrespondingColor(bug.status).color}`}>
                  {getStatusWithCorrespondingColor(bug.status).label.toUpperCase()}
                </span>
              </div>
            </button>

            {expandedId === bug.id && (
              <div className="border-t border-indigo-700 p-4 space-y-3 bg-indigo-950/20">
                <div>
                  <p className="text-xs text-indigo-400 mb-1">Reported by</p>
                  <p className="text-sm text-indigo-200">{bug.username}</p>
                </div>
                <div>
                  <p className="text-xs text-indigo-400 mb-1">Category</p>
                  <p className="text-sm text-indigo-200 capitalize">{bug.category}</p>
                </div>
                <div>
                  <p className="text-xs text-indigo-400 mb-1">Description</p>
                  <p className="text-sm text-indigo-300">{bug.description}</p>
                </div>
                {bug.resolvedAt && (
                  <div>
                    <p className="text-xs text-indigo-400 mb-1">Resolved At</p>
                    <p className="text-sm text-indigo-200">
                      {new Date(bug.resolvedAt).toLocaleString()}
                    </p>
                  </div>
                )}
                
                <div className="flex gap-2 pt-2">
                  <select 
                    value={bug.status}
                    onChange={(e) => handleStatusChange(bug.id, parseInt(e.target.value) as BugReportStatus)}
                    className="px-3 py-1 bg-indigo-950 hover:bg-indigo-900 border border-indigo-700 rounded text-sm text-indigo-200 cursor-pointer"
                  >
                    <option value={BugReportStatus.Open}>Open</option>
                    <option value={BugReportStatus.InProgress}>In Progress</option>
                    <option value={BugReportStatus.Resolved}>Resolved</option>
                    <option value={BugReportStatus.Closed}>Closed</option>
                  </select>
                  <div onClick={() => handleDelete(bug.id)}>
                    <AdminButton label="Delete" variant="delete" />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
