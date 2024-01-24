import toast from "react-hot-toast";
import emailjs from "emailjs-com";
import supabase from "./db/supabaseConfig";

interface EmailFormEvent extends React.FormEvent<HTMLFormElement> {
  target: HTMLFormElement;
}

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

const handleSupabaseQuery = async (query: any): Promise<any> => {
  try {
    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return data || null;
  } catch (error) {
    console.error("Error handling Supabase query:", error);
    throw error;
  }
};

export const saveIssueToSupabase = async (issue: Issue): Promise<void> => {
  try {
    const { id, name, description, estimated_time } = issue;

    if (id) {
      await handleSupabaseQuery(supabase.from("issues").update({ name, description, estimated_time, update_time: new Date() }).match({ id }));
    } else {
      await handleSupabaseQuery(supabase.from("issues").upsert([issue as any]));
    }
  } catch (error) {
    console.error("Error saving issue");
    toast.error("Error saving issue");
  }
};

export const fetchAllIssues = async (): Promise<Issue[]> => {
  const query = supabase.from("issues").select("*");
  return handleSupabaseQuery(query) || [];
};

export const toggleDoneStatus = async (issue: Issue, setAllIssues: React.Dispatch<React.SetStateAction<Issue[]>>): Promise<void> => {
  try {
    const now = new Date();
    const updates = { done: !issue.done, success_time: !issue.done ? now.toISOString() : null };

    await handleSupabaseQuery(supabase.from("issues").update(updates).eq("id", issue.id));

    const updatedIssues = await handleSupabaseQuery(supabase.from("issues").select("*"));
    setAllIssues(updatedIssues.data || []);
  } catch (error) {
    console.error("Error toggling done status");
    toast.error("Error toggling done status");
  }
};

export const currentDate = new Date().toISOString().split("T")[0];

export const formatDate = (date: Date) => {
  return new Date(date).toLocaleString("cz-CZ", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
    timeZone: "Europe/Prague",
  });
};

export const fetchIssueById = async (id: number): Promise<Issue | null> => {
  try {
    const { data, error } = await supabase.from("issues").select("*").eq("id", id).single();

    if (error) {
      throw error;
    }

    return data || null;
  } catch (error) {
    console.error("Error fetching issue by ID:", error);
    throw error;
  }
};
