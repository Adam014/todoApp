"use client";

import React from "react";
import { Toaster } from "react-hot-toast";
import CreateIssueForm from "@components/CreateIssueForm";

const CreateIssue = () => {
  return (
    <div className="pt-20">
      <Toaster />
      <CreateIssueForm />
    </div>
  );
};

export default CreateIssue;
