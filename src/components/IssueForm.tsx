import React, { useState, useEffect } from "react";
import { saveIssueToSupabase, Issue, currentDate } from "@utils/utils";
import toast from "react-hot-toast";

interface IssueFormProps {
  type: "Create" | "Update";
  issue?: Issue; // Only required when type is "Update"
}

// TODO: Fix one thing
// 1. When user submits the update form, we need to update the issue of the id from the url
// not create a new one

const IssueForm: React.FC<IssueFormProps> = ({ type, issue }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    estimatedTime: new Date(),
  });

  useEffect(() => {
    if (type === "Update" && issue && issue.estimated_time) {
      setFormData({
        name: issue.name,
        description: issue.description,
        estimatedTime: issue.estimated_time,
      });
    }
  }, [type, issue]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateOrUpdateIssue = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updatedIssue: Issue = {
        name: formData.name,
        description: formData.description,
        done: false,
        created_at: new Date(),
        update_time: new Date(),
        estimated_time: formData.estimatedTime
          ? new Date(formData.estimatedTime)
          : null,
        success_time: null,
      };

      // Automatically set 'done' to true if the current date is equal to or later than the estimated time
      if (
        updatedIssue.estimated_time &&
        updatedIssue.estimated_time <= new Date()
      ) {
        updatedIssue.done = true;
      }

      if (type === "Update" && issue) {
        // Update the existing issue by its ID
        updatedIssue.id = issue.id;
        await saveIssueToSupabase(updatedIssue);
        toast.success("The issue was updated successfully..");
      } else {
        // Create a new issue
        await saveIssueToSupabase(updatedIssue);
        toast.success("The issue was created successfully..");
      }

      // Optionally, you can reset the form or redirect the user to a different page
      setFormData({ name: "", description: "", estimatedTime: new Date() });
    } catch (error) {
      console.error("Error saving issue");
      toast.error("Error saving issue");
    }
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
      <div className="max-w-lg mx-auto space-y-3 sm:text-center">
        <h3 className="text-indigo-600 font-semibold">
          {type === "Create" ? "Create" : "Update"}
        </h3>
        <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
          {type === "Create" ? "Create an issue" : "Update an issue"}
        </p>
      </div>
      <div className="mt-12 max-w-lg mx-auto">
        <form className="space-y-5" onSubmit={handleCreateOrUpdateIssue}>
          <div className="[&>*]:w-full">
            <div>
              <label className="font-medium">Name</label>
              <input
                type="text"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label className="font-medium">Description</label>
            <textarea
              required
              name="description"
              className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            <label className="font-medium">Estimated Time</label>
            <input
              type="date"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              name="estimatedTime"
              value={
                formData.estimatedTime instanceof Date
                  ? ""
                  : formData.estimatedTime
              }
              onChange={handleChange}
              min={currentDate}
            />
          </div>
          <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
            {type === "Create" ? "Create" : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default IssueForm;