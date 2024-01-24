// IssueForm.tsx
import React, { useState, useEffect } from "react";
import { saveIssueToSupabase, Issue, currentDate } from "@utils/utils";

interface IssueFormProps {
  type: "Create" | "Update";
  issue?: Issue; // Only required when type is "Update"
}

// TODO: Fix two things
// 1. When user gets to update-issue, we need to pre-fill the inputs with the name, description
// and estimated time of the issue that user clicks
// 2. When user submits the update form, we need to update the issue of the id from the url
// not create a new one

const IssueForm: React.FC<IssueFormProps> = ({ type, issue }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    estimatedTime: "",
  });

  useEffect(() => {
    // Update form fields when the issue prop changes
    if (type === "Update" && issue) {
      setFormData({
        name: issue.name,
        description: issue.description,
        estimatedTime: issue.estimated_time
          ? issue.estimated_time.toISOString().split("T")[0]
          : "",
      });
    }
  }, [type, issue]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newIssue: Issue = {
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
      if (newIssue.estimated_time && newIssue.estimated_time <= new Date()) {
        newIssue.done = true;
      }

      // Save the issue to Supabase
      await saveIssueToSupabase(newIssue);

      // Optionally, you can reset the form or redirect the user to a different page
      setFormData({ name: "", description: "", estimatedTime: "" });
    } catch (error) {
      console.error("Error saving issue");
      // Optionally, you can handle error feedback to the user
    }
  };

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
        <form className="space-y-5" onSubmit={handleSubmit}>
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
              value={formData.estimatedTime}
              onChange={handleChange}
              min={currentDate} // Set the min attribute to the current date
            />
          </div>
          <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
            {type === "Create" ? "Submit" : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default IssueForm;
