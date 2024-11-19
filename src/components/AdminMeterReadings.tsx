import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { format } from 'date-fns';
import Modal from 'react-modal';
import { Info } from 'lucide-react';
import clsx from 'clsx';
import ViewModal from './meter-readings/ViewModal';
import FilterBar from './meter-readings/FilterBar';
import type { MeterReading } from './meter-readings/types';

const columnHelper = createColumnHelper<MeterReading>();

function AdminMeterReadings() {
  const [data] = useState<MeterReading[]>([
    {
      id: '1',
      accountNumber: 'ACC001',
      meterNumber: 'MTR001',
      meterType: 'Water',
      tariffCode: 'T001',
      previousReading: {
        value: 1000,
        date: new Date('2024-02-01'),
      },
      currentReading: {
        value: 1200,
        date: new Date('2024-03-01'),
        image: 'https://switchd.co.uk/energy/wp-content/uploads/2018/07/gas-meter-imperial-metric2.jpg',
      },
      isAnomaly: false,
    },
  ]);

  const [selectedReading, setSelectedReading] = useState<MeterReading | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [selectedMeterType, setSelectedMeterType] = useState<string>('all');

  const columns = useMemo(
    () => [
      columnHelper.accessor('accountNumber', {
        header: 'Account/Meter Number',
        cell: (info) => (
          <div>
            <div className="font-medium dark:text-white">{info.row.original.accountNumber}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{info.row.original.meterNumber}</div>
          </div>
        ),
      }),
      columnHelper.accessor('meterType', {
        header: () => (
          <div className="flex items-center gap-1">
            Meter Type
            <Info className="w-4 h-4" title="Type of utility meter" />
          </div>
        ),
      }),
      columnHelper.accessor('tariffCode', {
        header: 'Tariff Code',
      }),
      columnHelper.accessor('previousReading', {
        header: 'Previous Reading',
        cell: (info) => (
          <div>
            <div className="dark:text-white">{info.getValue().value}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {format(info.getValue().date, 'dd/MM/yyyy')}
            </div>
          </div>
        ),
      }),
      columnHelper.accessor('currentReading', {
        header: 'Current Reading',
        cell: (info) => (
          <div>
            <div className="dark:text-white">{info.getValue().value}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {format(info.getValue().date, 'dd/MM/yyyy')}
            </div>
          </div>
        ),
      }),
      columnHelper.accessor('id', {
        header: 'Actions',
        cell: (info) => (
          <button
            onClick={() => {
              setSelectedReading(info.row.original);
              setIsModalOpen(true);
            }}
            className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors duration-200"
          >
            View
          </button>
        ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter: searchTerm,
    },
    onGlobalFilterChange: setSearchTerm,
  });

  return (
    <div className="p-6">
      <div className="mb-6 space-y-4">
        <h1 className="text-2xl font-bold dark:text-white">Meter Readings</h1>
        
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedMeterType={selectedMeterType}
          onMeterTypeChange={setSelectedMeterType}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />
      </div>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={clsx('hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150', {
                  'bg-red-50 dark:bg-red-900/20': row.original.isAnomaly,
                })}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-hidden"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
        closeTimeoutMS={300}
      >
        {selectedReading && (
          <ViewModal reading={selectedReading} onClose={() => setIsModalOpen(false)} />
        )}
      </Modal>

      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(156, 163, 175, 0.7);
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(75, 85, 99, 0.5);
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(75, 85, 99, 0.7);
        }
      `}</style>
    </div>
  );
}

export default AdminMeterReadings;