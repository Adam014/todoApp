"use client";

import React from "react";
import { Toaster } from "react-hot-toast";
import IssueForm from "@components/IssueForm";

const CreateIssue = () => {
  return (
    <div className="pt-20">
      <Toaster />
      <IssueForm type="Create"/>
    </div>
  );
};

export default CreateIssue;
