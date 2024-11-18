import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import {
  ArrowDownTrayIcon,
  ArrowsUpDownIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';

interface MonthlyStats {
  month: string;
  sms: number;
  email: number;
  whatsapp: number;
}

const AdminReports: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<MonthlyStats[]>([]);
  const [sortField, setSortField] = useState<keyof MonthlyStats>('month');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filterMonth, setFilterMonth] = useState<string>('all');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Simulated API call - replace with actual data fetching
        const mockData: MonthlyStats[] = [
          { month: '2024-01', sms: 1200, email: 3500, whatsapp: 800 },
          { month: '2024-02', sms: 1500, email: 4000, whatsapp: 950 },
          { month: '2024-03', sms: 1800, email: 4200, whatsapp: 1100 }
        ];
        
        setStats(mockData);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load statistics');
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleSort = (field: keyof MonthlyStats) => {
    setSortDirection(current => current === 'asc' ? 'desc' : 'asc');
    setSortField(field);
  };

  const sortedStats = [...stats].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a[sortField] > b[sortField] ? 1 : -1;
    }
    return a[sortField] < b[sortField] ? 1 : -1;
  });

  const filteredStats = filterMonth === 'all' 
    ? sortedStats 
    : sortedStats.filter(stat => stat.month === filterMonth);

  const downloadPDF = (monthData: MonthlyStats) => {
    const doc = new jsPDF();
    const monthName = format(new Date(monthData.month), 'MMMM yyyy');
    
    doc.setFontSize(20);
    doc.text(`Monthly Communication Report - ${monthName}`, 20, 20);
    
    const tableData = [
      ['Channel', 'Count'],
      ['SMS', monthData.sms.toString()],
      ['Email', monthData.email.toString()],
      ['WhatsApp', monthData.whatsapp.toString()]
    ];

    doc.autoTable({
      startY: 40,
      head: [tableData[0]],
      body: tableData.slice(1),
    });

    doc.save(`communication-report-${monthData.month}.pdf`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-theme"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-white dark:bg-dark-card rounded-lg shadow">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-dark-text-primary">
          Monthly Communication Statistics
        </h2>
        
        <div className="flex gap-2">
          <select
            className="rounded-md border border-gray-300 dark:border-dark-border px-3 py-2 text-sm"
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
          >
            <option value="all">All Months</option>
            {stats.map(stat => (
              <option key={stat.month} value={stat.month}>
                {format(new Date(stat.month), 'MMMM yyyy')}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer>
          <BarChart data={filteredStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="month" 
              tickFormatter={(value) => format(new Date(value), 'MMM yyyy')}
            />
            <YAxis />
            <Tooltip 
              labelFormatter={(value) => format(new Date(value), 'MMMM yyyy')}
            />
            <Legend />
            <Bar dataKey="sms" fill="#3B82F6" name="SMS" />
            <Bar dataKey="email" fill="#22C55E" name="Email" />
            <Bar dataKey="whatsapp" fill="#8B5CF6" name="WhatsApp" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-border">
          <thead>
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('month')}
              >
                <div className="flex items-center gap-2">
                  Month
                  <ArrowsUpDownIcon className="w-4 h-4" />
                </div>
              </th>
              {['sms', 'email', 'whatsapp'].map((field) => (
                <th 
                  key={field}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort(field as keyof MonthlyStats)}
                >
                  <div className="flex items-center gap-2">
                    {field.toUpperCase()}
                    <ArrowsUpDownIcon className="w-4 h-4" />
                  </div>
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-dark-border">
            {filteredStats.map((stat) => (
              <tr key={stat.month}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-dark-text-primary">
                  {format(new Date(stat.month), 'MMMM yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-dark-text-primary">
                  {stat.sms.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-dark-text-primary">
                  {stat.email.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-dark-text-primary">
                  {stat.whatsapp.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-dark-text-primary">
                  <button
                    onClick={() => downloadPDF(stat)}
                    className="text-theme dark:text-theme-dark hover:text-theme-dark flex items-center gap-1"
                  >
                    <ArrowDownTrayIcon className="w-4 h-4" />
                    Download PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReports;