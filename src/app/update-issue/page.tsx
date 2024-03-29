"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchIssueById, Issue } from "@utils/utils";
import IssueForm from "@components/IssueForm";
import { Toaster } from "react-hot-toast";

const UpdateIssuePage = () => {
  const [issue, setIssue] = useState<Issue | null>(null);
  console.log(issue);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      fetchIssueById(Number(id))
        .then((fetchedIssue) => {
          setIssue(fetchedIssue);
        })
        .catch((error) => {
          console.error("Error fetching issue:", error);
        });
    }
  }, [id]);

  return (
    <div className="mt-20">
      <Toaster />
      {issue && <IssueForm type="Update" issue={issue} />}
    </div>
  );
};

export default UpdateIssuePage;
