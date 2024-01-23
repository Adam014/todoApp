import React from "react";
import { Issue } from "../utils/utils"; // Adjust the path accordingly

interface IssueCardProps {
  issue: Issue;
}

const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
  return (
    <div className="border p-4 mb-4 rounded-lg h-auto w-1/2">
      <h3 className="text-xl font-semibold">Name: {issue.name}</h3>
      <div className="text-wrap">
        <p className="text-gray-600">Description: <br/>{issue.description}</p>
      </div>
      <p className="text-gray-500">
        {issue.done ? <p className="text-green-400">Status: Done</p> : <p className="text-red-600">Status: Undone</p>}
      </p>
      <p className="text-gray-500">
        Created at: <b>{issue.created_at.toLocaleString()}</b>
      </p>
      <p className="text-gray-500">
        Updated at: <b>{issue.update_time.toLocaleString()}</b>
      </p>
      {issue.estimated_time && (
        <p className="text-gray-500">
          Estimated Time: <b>{issue.estimated_time.toLocaleString()}</b>
        </p>
      )}
      {issue.success_time && (
        <p className="text-gray-500">
          Success Time: <b>{issue.success_time.toLocaleString()}</b>
        </p>
      )}
    </div>
  );
};

export default IssueCard;
