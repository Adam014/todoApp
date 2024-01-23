import React from "react";
import { Issue, formatDate } from "../utils/utils";
import Link from "next/link";

interface IssueCardProps {
  issue: Issue;
  onToggleDone: (issue: Issue) => void;
}

const IssueCard: React.FC<IssueCardProps> = ({ issue, onToggleDone }) => {
  const handleToggleDone = async () => {
    onToggleDone(issue);
  };

  return (
    <div className="border p-4 mb-4 rounded-lg h-auto">
      <h3 className="text-xl font-semibold">Name: {issue.name}</h3>
      <div className="text-wrap">
        <p className="text-gray-600 p-2">
          Description: <br />
          {issue.description}
        </p>
      </div>
      <p className="text-gray-500">
        {issue.done ? (
          <span className="text-green-400">Status: Done</span>
        ) : (
          <span className="text-red-600">Status: Undone</span>
        )}
      </p>
      <p className="text-gray-500">
        Created at: <b>{formatDate(issue.created_at)}</b>
      </p>
      <p className="text-gray-500">
        Updated at: <b>{formatDate(issue.update_time)}</b>
      </p>
      {issue.estimated_time && (
        <p className="text-gray-500">
          Estimated Time: <b>{formatDate(issue.estimated_time)}</b>
        </p>
      )}
      {issue.success_time && (
        <p className="text-gray-500">
          Success Time: <b>{formatDate(issue.success_time)}</b>
        </p>
      )}
      <button
        className="px-4 py-2 mt-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
        onClick={handleToggleDone}
      >
        {issue.done ? "Unfinish Issue" : "Finish Issue"}
      </button>
      <button
        className="ml-2 px-4 h-10 mt-2 font-medium border-indigo-600 border-2 rounded-lg"
      >
        <Link href={`/update-issue?id=${issue?.id}`}>
            Edit issue
        </Link>
      </button>
    </div>
  );
};

export default IssueCard;
