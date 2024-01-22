import toast from "react-hot-toast";
import emailjs from "emailjs-com";

interface EmailFormEvent extends React.FormEvent<HTMLFormElement> {
  target: HTMLFormElement;
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
        toast.success(`The email was sent! \n\n Name: ${from_name} ${from_surname} \n Email: ${from_email}`);
      },
      (error) => {
        console.log(error.text);
        toast.error("The email cannot be sent...");
      },
    );
};

