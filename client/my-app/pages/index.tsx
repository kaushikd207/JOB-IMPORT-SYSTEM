// pages/index.tsx
import { useEffect, useState } from "react";

export default function Home() {
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch("/api/logs"); // rewrites to localhost:5000
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch logs:", error);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Job Import History</h1>
      <table className="w-full table-auto border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Time</th>
            <th>Total</th>
            <th>New</th>
            <th>Updated</th>
            <th>Failed</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log._id} className="border-b">
              <td className="p-2">
                {new Date(log.timestamp).toLocaleString()}
              </td>
              <td>{log.totalFetched}</td>
              <td>{log.newJobs}</td>
              <td>{log.updatedJobs}</td>
              <td className="text-red-500">{log.failedJobs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
