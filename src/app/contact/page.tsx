"use client";

import React from "react";
import { Toaster } from "react-hot-toast";
import ContactForm from "@components/ContactForm";

const ContactPage = () => {
  return (
    <section className="pt-20">
      <Toaster />
      <ContactForm />
    </section>
  );
};

export default ContactPage;
