import React from 'react';
import { Download, FileText } from 'lucide-react';
import StatementTable from './StatementTable';
import DateRangeFilter from './DateRangeFilter';
import PdfPreviewModal from './PdfPreviewModal';
import { Statement, DateRange } from './types';
import { format } from 'date-fns';

// Mock data - replace with actual API call
const mockStatements: Statement[] = [
  {
    id: '1',
    date: '2024-01-15'
    amount: 1250.50,
    status: 'paid',
    reference: 'INV-2024-001',
    pdfUrl: 'https://example.com/statement1.pdf'
  },
  // Add more mock data as needed
];

export default function DashboardStatements() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [statements, setStatements] = React.useState<Statement[]>(mockStatements);
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [dateRange, setDateRange] = React.useState<DateRange>({
    startDate: null,
    endDate: null,
  });
  const [previewPdfUrl, setPreviewPdfUrl] = React.useState<string | null>(null);

  const filteredStatements = React.useMemo(() => {
    return statements.filter((statement) => {
      if (!dateRange.startDate && !dateRange.endDate) return true;
      
      const statementDate = new Date(statement.date);
      const isAfterStart = !dateRange.startDate || statementDate >= dateRange.startDate;
      const isBeforeEnd = !dateRange.endDate || statementDate <= dateRange.endDate;
      
      return isAfterStart && isBeforeEnd;
    });
  }, [statements, dateRange]);

  const handleDownloadSelected = () => {
    const selectedStatements = statements.filter((s) => selectedRows.includes(s.id));
    // Implement bulk download logic
    console.log('Downloading:', selectedStatements);
  };

  const handleExportCsv = () => {
    const csvContent = [
      ['Date', 'Amount', 'Status', 'Reference'],
      ...filteredStatements.map((s) => [
        format(new Date(s.date), 'yyyy-MM-dd'),
        s.amount.toString(),
        s.status,
        s.reference,
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `statements-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => setError(null)}
          className="mt-4 px-4 py-2 bg-theme text-white rounded-lg"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Financial Statements</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleDownloadSelected}
            disabled={selectedRows.length === 0}
            className="flex items-center space-x-2 px-4 py-2 bg-theme text-white rounded-lg disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>Download Selected</span>
          </button>
          <button
            onClick={handleExportCsv}
            className="flex items-center space-x-2 px-4 py-2 border border-theme text-theme rounded-lg"
          >
            <FileText className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <DateRangeFilter dateRange={dateRange} onDateRangeChange={setDateRange} />

      {isLoading ? (
        <div className="text-center py-8">Loading statements...</div>
      ) : (
        <StatementTable
          data={filteredStatements}
          onPreviewPdf={(url) => setPreviewPdfUrl(url)}
          selectedRows={selectedRows}
          onRowSelect={setSelectedRows}
        />
      )}

      {previewPdfUrl && (
        <PdfPreviewModal
          pdfUrl={previewPdfUrl}
          onClose={() => setPreviewPdfUrl(null)}
        />
      )}
    </div>
  );
}