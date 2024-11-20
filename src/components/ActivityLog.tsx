import React, { useEffect, useState } from "react";
import { listenToActivities } from "../firebaseServices";

const ITEMS_PER_PAGE = 10;

const ActivityLog: React.FC = () => {
  const [activities, setActivities] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const unsubscribe = listenToActivities((allActivities) => {
      setActivities(allActivities);
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, []);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentActivities = activities.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(activities.length / ITEMS_PER_PAGE);

  return (
    <div>
      <h3>Activity Log</h3>
      <ul>
        {currentActivities.map((activity) => (
          <li key={activity.id}>
            <strong>{activity.activityType}</strong>: {JSON.stringify(activity.details)} <br />
            <small>{new Date(activity.timestamp.seconds * 1000).toLocaleString()}</small>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            disabled={page === currentPage}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActivityLog;
