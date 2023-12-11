import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../services/authService";
import Card from "../../components/card/Card";
import { FaPhoneAlt, FaEnvelope, FaLinkedin } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { toast } from "react-toastify";
import "./Contact.scss";


const Contact = () => { 
  const [subject, setSubject] = useState("");
   const [message, setMessage] = useState("");

  const data = {
    subject,
    message,
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
  
      const response = await axios.post(`${BACKEND_URL}/api/contactus`, data);
      setSubject("");
      setMessage("");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="contact">
      <h3 className="--mt">Contact Us</h3>
      <div className="section">
        <form onSubmit={sendEmail}>
          <Card cardClass="card">
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={subject}
              required
              onChange={(e) => setSubject(e.target.value)}
            />

            <label>Message</label>
            <textarea
              name="message"
              value={message}
              required
              cols="30"
              rows="10"
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button className="--btn --btn-primary">Send Message</button>
          </Card>
        </form>

        <div className="details">
          <Card cardClass={"card2"}>
            <h3>contact information </h3>
            <p>Fill the form or contact us via other channels listed below</p>

            <div className="icons">
              <span>
                <FaPhoneAlt />
                <p>+23408078870522</p>
              </span>
              <span>
                <FaEnvelope />
                <p>henry4we2008@gmail.com</p>
              </span>
              <span>
                <GoLocation />
                <p>London</p>
              </span>
              <span>
                <FaLinkedin />
                <p>www.linkedin.com/in/henry-ivwighre</p>
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
