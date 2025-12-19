import React from "react";
import "./Terms.css";

function Privacy() {
  return (
    <div className="legal-page">
      <div className="legal-card">
        <h1>Privacy Policy</h1>
        <p className="updated">Last updated: 19/12/2025</p>

        <section>
          <h3>1. Introduction</h3>
          <p>
            Your privacy is important to us. This Privacy Policy explains how
            NextStep collects, uses, and protects your personal information.
          </p>
        </section>

        <section>
          <h3>2. Information We Collect</h3>
          <p>We may collect the following information:</p>
          <ul>
            <li>Name, email address, and profile picture (via Google login)</li>
            <li>Username, bio, and LinkedIn profile (optional)</li>
            <li>Interview experiences, posts, comments, and images</li>
            <li>Uploaded resumes (file name and URL)</li>
          </ul>
        </section>

        <section>
          <h3>3. How We Use Your Information</h3>
          <p>
            We use your data to operate and improve the platform, display
            content, personalize your experience, and maintain security.
          </p>
        </section>

        <section>
          <h3>4. Publicly Visible Information</h3>
          <p>
            Your username, profile picture, posts, and comments may be visible
            to other users. Please avoid sharing sensitive personal information
            publicly.
          </p>
        </section>

        <section>
          <h3>5. Resume Uploads</h3>
          <p>
            If you upload a resume, it is stored securely and may be visible on
            your public profile depending on your settings. Do not upload
            confidential or sensitive documents.
          </p>
        </section>

        <section>
          <h3>6. Data Storage and Security</h3>
          <p>
            We store user data securely using trusted third-party services.
            Reasonable measures are taken to protect your information from
            unauthorized access.
          </p>
        </section>

        <section>
          <h3>7. Third-Party Services</h3>
          <p>
            NextStep uses third-party services such as Google OAuth for
            authentication and Cloud storage services for file uploads. These
            services have their own privacy policies.
          </p>
        </section>

        <section>
          <h3>8. Cookies and Sessions</h3>
          <p>
            We use authentication tokens and session storage to keep you logged
            in securely. We do not use advertising or tracking cookies.
          </p>
        </section>

        <section>
          <h3>9. Your Rights</h3>
          <p>
            You may update your profile information, remove content, or request
            account deletion by contacting us.
          </p>
        </section>

        <section>
          <h3>10. Changes to This Policy</h3>
          <p>
            We may update this Privacy Policy from time to time. Continued use
            of NextStep means you accept the updated policy.
          </p>
        </section>

        <section>
          <h3>11. Contact Information</h3>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at <strong>mahidharan5612@gmail.com</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}

export default Privacy;
