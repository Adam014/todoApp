import React from 'react';
import { Issue } from '../utils/utils'; // Adjust the path accordingly

interface IssueCardProps {
  issue: Issue;
}

const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
  return (
    <div className="border p-4 mb-4 rounded-lg">
      <h3 className="text-xl font-semibold">{issue.name}</h3>
      <p className="text-gray-600">{issue.description}</p>
      <p className="text-gray-500">
        {issue.done ? 'Status: Done' : 'Status: Undone'}
      </p>
      <p className="text-gray-500">Created at: {issue.created_at.toLocaleString()}</p>
      <p className="text-gray-500">Updated at: {issue.update_time.toLocaleString()}</p>
      {issue.estimated_time && (
        <p className="text-gray-500">Estimated Time: {issue.estimated_time.toLocaleString()}</p>
      )}
      {issue.success_time && (
        <p className="text-gray-500">Success Time: {issue.success_time.toLocaleString()}</p>
      )}
    </div>
  );
};

export default IssueCard;
