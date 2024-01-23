"use client";

import { useEffect, useState } from "react";
import { fetchAllIssues, filterIssuesByStatus, Issue } from "../utils/utils";
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

  // Separate issues into two arrays based on their 'done' status
  const undoneIssues = filterIssuesByStatus(allIssues, false);
  const doneIssues = filterIssuesByStatus(allIssues, true);

  return (
    <>
      <section>
        <div className="flex">
          <div className="flex-1 p-10">
            <h2>Undone Issues</h2>
            {allIssues
              .filter((issue) => !issue.done)
              .map((undoneIssue) => (
                <IssueCard key={undoneIssue.id} issue={undoneIssue} />
              ))}
          </div>
          <div className="flex-1 p-10">
            <h2>Done Issues</h2>
            {allIssues
              .filter((issue) => issue.done)
              .map((doneIssue) => (
                <IssueCard key={doneIssue.id} issue={doneIssue} />
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
