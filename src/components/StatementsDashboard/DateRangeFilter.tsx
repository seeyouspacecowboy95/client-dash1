import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DateRange } from './types';

interface DateRangeFilterProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
}

export default function DateRangeFilter({
  dateRange,
  onDateRangeChange,
}: DateRangeFilterProps) {
  return (
    <div className="flex items-center space-x-4">
      <div>
        <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Start Date
        </label>
        <DatePicker
          id="start-date"
          selected={dateRange.startDate}
          onChange={(date) =>
            onDateRangeChange({ ...dateRange, startDate: date })
          }
          selectsStart
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-theme focus:ring focus:ring-theme focus:ring-opacity-50"
          placeholderText="Select start date"
        />
      </div>
      <div>
        <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          End Date
        </label>
        <DatePicker
          id="end-date"
          selected={dateRange.endDate}
          onChange={(date) =>
            onDateRangeChange({ ...dateRange, endDate: date })
          }
          selectsEnd
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          minDate={dateRange.startDate}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-theme focus:ring focus:ring-theme focus:ring-opacity-50"
          placeholderText="Select end date"
        />
      </div>
    </div>
  );
}