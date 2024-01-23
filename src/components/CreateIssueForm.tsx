import React from 'react'

const CreateIssueForm = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
      <div className="max-w-lg mx-auto space-y-3 sm:text-center">
        <h3 className="text-indigo-600 font-semibold">Create</h3>
        <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
          Create an issue
        </p>
      </div>
      <div className="mt-12 max-w-lg mx-auto">
        <form className="space-y-5">
          <div className="[&>*]:w-full">
            <div>
              <label className="font-medium">Name</label>
              <input
                type="text"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                name="name"
              />
            </div>
          </div>
          <div>
            <label className="font-medium">Description</label>
            <textarea
              required
              name="description"
              className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            ></textarea>
          </div>
          <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateIssueForm;
