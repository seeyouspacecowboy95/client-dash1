import React from 'react';

interface Task {
  id: string;
  title: string;
  status: 'pending' | 'inProgress' | 'completed';
}

const tasks: Task[] = [
  { id: '1', title: 'Generate Monthly Statements', status: 'completed' },
  { id: '2', title: 'Send Payment Reminders', status: 'inProgress' },
  { id: '3', title: 'Process Meter Readings', status: 'pending' },
  { id: '4', title: 'Handle Customer Queries', status: 'inProgress' },
  { id: '5', title: 'Update Contact Information', status: 'pending' },
];

function TaskBoard() {
  const columns = [
    { title: 'Pending', status: 'pending' },
    { title: 'In Progress', status: 'inProgress' },
    { title: 'Completed', status: 'completed' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Task Management</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((column) => (
          <div key={column.status} className="bg-gray-50 p-4 rounded-md">
            <h4 className="font-medium mb-3">{column.title}</h4>
            <div className="space-y-2">
              {tasks
                .filter((task) => task.status === column.status)
                .map((task) => (
                  <div
                    key={task.id}
                    className="bg-white p-3 rounded shadow-sm border border-gray-200"
                  >
                    {task.title}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskBoard;