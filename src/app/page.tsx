"use client";

import { useEffect, useState } from "react";
import { fetchAllIssues, Issue, toggleDoneStatus } from "../utils/utils";
import { Toaster } from "react-hot-toast";
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

  const handleToggleDone = async (
    issue: Issue,
    setAllIssues: React.Dispatch<React.SetStateAction<Issue[]>>,
  ) => {
    await toggleDoneStatus(issue, setAllIssues);
  };

  return (
    <>
      <Toaster />
      <section>
        <div className="flex issues-container">
          <div className="flex-1 p-10">
            <h2>Undone Issues</h2>
            {allIssues
              .filter((issue) => !issue.done)
              .map((undoneIssue) => (
                <IssueCard
                  key={undoneIssue.id}
                  issue={undoneIssue}
                  onToggleDone={(issue) =>
                    handleToggleDone(issue, setAllIssues)
                  }
                />
              ))}
          </div>
          <div className="flex-1 p-10">
            <h2>Done Issues</h2>
            {allIssues
              .filter((issue) => issue.done)
              .map((doneIssue) => (
                <IssueCard
                  key={doneIssue.id}
                  issue={doneIssue}
                  onToggleDone={(issue) =>
                    handleToggleDone(issue, setAllIssues)
                  }
                />
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
