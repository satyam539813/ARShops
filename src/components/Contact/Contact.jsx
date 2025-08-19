import React from "react";
import "./Contact.css";

const Contact = () => {
    const team = [
        { name: "Satyam Kumar", role: "Frontend Developer" },
        { name: "Shaswat Singh", role: "Backend Developer" },
        { name: "Shivang Verma", role: "UI/UX Designer" },
        { name: "Jatin", role: "3D Artist" },
    ];

    return (
        <div className="contact-container">
            <h1 className="contact-title">Contact Us</h1>
            <p className="contact-subtitle">
                We'd love to hear from you! Whether it's a project idea, collaboration, or just to say hi. 🚀
            </p>

            <div className="contact-info">
                <p>Email: <span>support@arshopsy.com</span></p>
                <p>Phone: <span>+91 9876543210</span></p>
                <p>Address: <span>Patna, Bihar, India</span></p>
            </div>

            <h2 className="team-title">Meet Our Team</h2>
            <div className="team-grid">
                {team.map((member, index) => (
                    <div className="team-card" key={index}>
                        <div className="avatar">{member.name[0]}</div>
                        <h3>{member.name}</h3>
                        <p>{member.role}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Contact;
