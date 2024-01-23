"use client";

import { useEffect, useState } from "react";
import { fetchAllIssues, Issue, toggleDoneStatus } from "../utils/utils";
import IssueCard from "@components/IssueCard";

export default function Home() {
  const [allIssues, setAllIssues] = useState<Issue[]>([]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const issues = await fetchAllIssues();
        setAllIssues(issues);
      } catch (error) {
        console.error("Error fetching issues");
      }
    };

    fetchIssues();
  }, []);

  const handleToggleDone = async (issue: Issue) => {
    try {
      await toggleDoneStatus(issue);
      // Update the local state to reflect the change
      setAllIssues((prevIssues) =>
        prevIssues.map((prevIssue) =>
          prevIssue.id === issue.id ? { ...prevIssue, done: !prevIssue.done } : prevIssue
        )
      );
    } catch (error) {
      console.error('Error toggling done status');
    }
  };

  return (
    <>
      <section>
        <div className="flex">
          <div className="flex-1 p-10">
            <h2>Undone Issues</h2>
            {allIssues
              .filter((issue) => !issue.done)
              .map((undoneIssue) => (
                <IssueCard key={undoneIssue.id} issue={undoneIssue} onToggleDone={handleToggleDone} />
              ))}
          </div>
          <div className="flex-1 p-10">
            <h2>Done Issues</h2>
            {allIssues
              .filter((issue) => issue.done)
              .map((doneIssue) => (
                <IssueCard key={doneIssue.id} issue={doneIssue} onToggleDone={handleToggleDone} />
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
