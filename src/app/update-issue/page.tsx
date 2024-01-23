"use client";

// TODO: We need to fetch the single issue with the id from the url

import IssueForm from "@components/IssueForm";
import React from "react";

const page = () => {
  return (
    <div className="mt-20">
      <IssueForm type="Update" />
    </div>
  );
};

export default page;
