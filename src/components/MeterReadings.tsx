import React, { useState, useMemo, useRef } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  SortingState,
} from '@tanstack/react-table';
import { Download, ArrowUpDown, Search, Loader2, Plus } from 'lucide-react';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import toast from 'react-hot-toast';

interface MeterReading {
  accountNumber: string;
  meterNumber: string;
  meterType: string;
  tariffCode: string;
  previousReading: number;
  previousReadingDate: Date;
  currentReading: number;
  currentReadingDate: Date;
  consumption: number;
}

const columnHelper = createColumnHelper<MeterReading>();

export default function MeterReadings() {
  const formRef = useRef<HTMLDivElement>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    meterNumber: '',
    currentReading: '',
    readingDate: new Date(),
    photo: null as File | null,
  });

  // Sample data - replace with actual API call
  const data = useMemo<MeterReading[]>(
    () => [
      {
        accountNumber: "ACC001",
        meterNumber: "MTR123456",
        meterType: "Electricity",
        tariffCode: "DOM01",
        previousReading: 1000,
        previousReadingDate: new Date(2024, 1, 1),
        currentReading: 1250,
        currentReadingDate: new Date(2024, 2, 1),
        consumption: 250
      },
      // Add more sample data as needed
    ],
    []
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor('accountNumber', {
        header: ({ column }) => (
          <button
            className="flex items-center gap-1"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Account Number
            <ArrowUpDown className="h-4 w-4" />
          </button>
        ),
      }),
      columnHelper.accessor('meterNumber', {
        header: 'Meter Number',
      }),
      columnHelper.accessor('meterType', {
        header: 'Meter Type',
      }),
      columnHelper.accessor('tariffCode', {
        header: 'Tariff Code',
      }),
      columnHelper.accessor('previousReading', {
        header: 'Previous Reading',
        cell: info => (
          <div>
            <div>{info.getValue()}</div>
            <div className="text-sm text-gray-500">
              {format(info.row.original.previousReadingDate, 'dd MMM yyyy')}
            </div>
          </div>
        ),
      }),
      columnHelper.accessor('currentReading', {
        header: 'Current Reading',
        cell: info => (
          <div>
            <div>{info.getValue()}</div>
            <div className="text-sm text-gray-500">
              {format(info.row.original.currentReadingDate, 'dd MMM yyyy')}
            </div>
          </div>
        ),
      }),
      columnHelper.accessor('consumption', {
        header: 'Consumption',
        cell: info => `${info.getValue()} kWh`,
      }),
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const handleExport = () => {
    setIsLoading(true);
    setTimeout(() => {
      try {
        const headers = columns.map(col => col.id).join(',');
        const rows = data.map(row => 
          Object.values(row).map(val => 
            val instanceof Date ? format(val, 'yyyy-MM-dd') : val
          ).join(',')
        ).join('\n');
        
        const csv = `${headers}\n${rows}`;
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `meter-readings-${format(new Date(), 'yyyy-MM-dd')}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        toast.success('Export completed successfully');
      } catch (error) {
        toast.error('Failed to export data');
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Meter reading submitted successfully');
      setFormData({
        meterNumber: '',
        currentReading: '',
        readingDate: new Date(),
        photo: null,
      });
      setShowForm(false);
      setIsLoading(false);
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, photo: e.target.files![0] }));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              value={globalFilter}
              onChange={e => setGlobalFilter(e.target.value)}
              placeholder="Search all columns..."
              className="pl-9 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => setDateRange(update)}
            placeholderText="Select date range"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setShowForm(true);
              setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Submit Reading
          </button>
          <button
            onClick={handleExport}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            Export
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map(row => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map(cell => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                >
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div ref={formRef} className="bg-white p-6 rounded-lg shadow-sm border mt-8">
          <h2 className="text-xl font-semibold mb-6">Submit Meter Reading</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="meterNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Meter Number
                </label>
                <input
                  type="text"
                  id="meterNumber"
                  value={formData.meterNumber}
                  onChange={e => setFormData(prev => ({ ...prev, meterNumber: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="currentReading" className="block text-sm font-medium text-gray-700 mb-1">
                  Current Reading
                </label>
                <input
                  type="number"
                  id="currentReading"
                  value={formData.currentReading}
                  onChange={e => setFormData(prev => ({ ...prev, currentReading: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="readingDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Reading Date
                </label>
                <DatePicker
                  selected={formData.readingDate}
                  onChange={(date) => setFormData(prev => ({ ...prev, readingDate: date || new Date() }))}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-1">
                  Meter Photo
                </label>
                <input
                  type="file"
                  id="photo"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                Submit Reading
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}