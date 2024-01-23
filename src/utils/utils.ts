import toast from "react-hot-toast";
import emailjs from "emailjs-com";
import supabase from "./db/supabaseConfig";

interface EmailFormEvent extends React.FormEvent<HTMLFormElement> {
  target: HTMLFormElement;
}

// Define a type for the issue
export interface Issue {
  id?: number;
  name: string;
  description: string;
  done: boolean;
  created_at: Date;
  update_time: Date;
  estimated_time: Date | null;
  success_time: Date | null;
}

// function for sending the email
export const sendEmail = (e: EmailFormEvent): void => {
  e.preventDefault();

  // Log the submitted values
  const formData = new FormData(e.target);
  const formObject = Object.fromEntries(formData);
  console.log("Submitted Values:", formObject);

  // Extract relevant data for the toast message
  const { from_name, from_surname, from_email } = formObject;

  emailjs
    .sendForm(
      "nomadify_contact",
      "template_fnex1n8",
      e.target,
      "jI57JPoeSeH54Dm4S",
    )
    .then(
      () => {
        e.target.reset();
        toast.success(
          `The email was sent! \n\n Name: ${from_name} ${from_surname} \n Email: ${from_email}`,
        );
      },
      (error) => {
        console.log(error.text);
        toast.error("The email cannot be sent...");
      },
    );
};

// Function to save an issue to Supabase
export const saveIssueToSupabase = async (issue: Issue): Promise<void> => {
  try {
    // Save the data to the 'issues' table in Supabase
    const { data, error } = await supabase
      .from("issues")
      .upsert([issue as any]);

    if (error) {
      throw error;
    }

    toast.success("Issue saved successfully");
    console.log("Issue saved successfully:");
  } catch (error) {
    console.error("Error saving issue");
    // Optionally, you can handle error feedback to the user
    toast.error("Error saving issue");
  }
};

// Get the current date in "YYYY-MM-DD" format
export const currentDate = new Date().toISOString().split("T")[0];

export const formatDate = (date: Date) => {
  return new Date(date).toLocaleString('cz-CZ', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
    timeZone: 'Europe/Prague',
  });
};

// Function to fetch all issues from Supabase
export const fetchAllIssues = async (): Promise<Issue[]> => {
  try {
    const { data, error } = await supabase.from("issues").select("*");

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching issues");
    throw error;
  }
};

// Function to toggle the 'done' status for an issue
export const toggleDoneStatus = async (issue: Issue): Promise<void> => {
  try {
    const { data, error } = await supabase.from('issues').update({ done: !issue.done }).eq('id', issue.id);

    if (error) {
      throw error;
    }

    toast.success(`Task ${issue.done ? 'Unfinished' : 'Finished'} successfully`);
  } catch (error) {
    console.error('Error toggling done status');
    toast.error('Error toggling done status');
  }
};