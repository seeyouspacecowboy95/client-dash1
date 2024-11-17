import React, { useState } from 'react';
import { Download, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { jsPDF } from 'jspdf';
import "react-datepicker/dist/react-datepicker.css";

interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: 'debit' | 'credit';
}

interface Statement {
  id: string;
  period: string;
  openingBalance: number;
  closingBalance: number;
  transactions: Transaction[];
}

const mockStatements: Statement[] = [
  {
    id: '1',
    period: 'March 2024',
    openingBalance: 2450.00,
    closingBalance: 2950.00,
    transactions: [
      {
        id: 't1',
        date: new Date('2024-03-15'),
        description: 'Payment Received',
        amount: 500.00,
        type: 'credit'
      },
      {
        id: 't2',
        date: new Date('2024-03-10'),
        description: 'Monthly Service Charge',
        amount: 150.00,
        type: 'debit'
      }
    ]
  }
];

export default function Statement() {
  const [selectedDateRange, setSelectedDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [currentStatement, setCurrentStatement] = useState<Statement>(mockStatements[0]);
  const [filterType, setFilterType] = useState<'all' | 'debit' | 'credit'>('all');

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Add header
    doc.setFontSize(16);
    doc.text('Statement', 20, 20);
    doc.setFontSize(12);
    doc.text(`Period: ${currentStatement.period}`, 20, 30);
    
    // Add transactions
    let yPos = 50;
    doc.text('Date', 20, yPos);
    doc.text('Description', 60, yPos);
    doc.text('Amount', 150, yPos);
    
    currentStatement.transactions.forEach((transaction, index) => {
      yPos = 60 + (index * 10);
      doc.text(format(transaction.date, 'dd/MM/yyyy'), 20, yPos);
      doc.text(transaction.description, 60, yPos);
      doc.text(
        `R ${transaction.amount.toFixed(2)}`,
        150,
        yPos,
        { align: 'right' }
      );
    });
    
    doc.save(`statement-${currentStatement.period}.pdf`);
  };

  const filteredTransactions = currentStatement.transactions.filter(transaction => {
    const dateInRange = (!selectedDateRange[0] || !selectedDateRange[1]) ? true :
      (transaction.date >= selectedDateRange[0] && transaction.date <= selectedDateRange[1]);
    
    const typeMatch = filterType === 'all' ? true : transaction.type === filterType;
    
    return dateInRange && typeMatch;
  });

  const metrics = {
    totalDebits: filteredTransactions
      .filter(t => t.type === 'debit')
      .reduce((sum, t) => sum + t.amount, 0),
    totalCredits: filteredTransactions
      .filter(t => t.type === 'credit')
      .reduce((sum, t) => sum + t.amount, 0),
    transactionCount: filteredTransactions.length
  };

  return (
    <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Statement
        </h2>
        <button
          onClick={handleDownloadPDF}
          className="flex items-center px-4 py-2 bg-theme text-white rounded-lg hover:bg-theme/90 transition-colors"
        >
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 dark:bg-dark-hover p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Outstanding Balance</p>
          <p className="text-xl font-semibold text-red-600">
            R {metrics.totalDebits.toFixed(2)}
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-dark-hover p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Previous Month Balance</p>
          <p className="text-xl font-semibold text-green-600">
            R {metrics.totalCredits.toFixed(2)}
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-dark-hover p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Transactions</p>
          <p className="text-xl font-semibold text-gray-900 dark:text-white">
            {metrics.transactionCount}
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Date Range
          </label>
          <div className="flex gap-2">
            <DatePicker
              selectsRange
              startDate={selectedDateRange[0]}
              endDate={selectedDateRange[1]}
              onChange={(dates) => setSelectedDateRange(dates)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-theme focus:border-theme dark:bg-dark-hover dark:text-white"
              placeholderText="Select date range"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Transaction Type
          </label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as 'all' | 'debit' | 'credit')}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-theme focus:border-theme dark:bg-dark-hover dark:text-white"
          >
            <option value="all">All Transactions</option>
            <option value="debit">Debits Only</option>
            <option value="credit">Credits Only</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b dark:border-gray-700">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Date
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Description
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-dark-hover"
              >
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                  {format(transaction.date, 'dd MMM yyyy')}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                  {transaction.description}
                </td>
                <td className={`px-4 py-3 text-sm text-right ${
                  transaction.type === 'credit'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}>
                  R {transaction.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Opening Balance: R {currentStatement.openingBalance.toFixed(2)}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Closing Balance: R {currentStatement.closingBalance.toFixed(2)}
        </div>
      </div>
    </div>
  );
}