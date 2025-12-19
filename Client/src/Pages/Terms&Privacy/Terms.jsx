import React from "react";
import "./Terms.css";

function Terms() {
  return (
    <div className="legal-page">
      <div className="legal-card">
        <h1>Terms and Conditions</h1>
        <p className="updated">Last updated: 19/12/2025</p>

        <section>
          <h3>1. Acceptance of Terms</h3>
          <p>
            By accessing and using NextStep, you agree to be bound by these
            Terms of Service.
          </p>
        </section>

        <section>
          <h3>2. Service Description</h3>
          <p>
            NextStep allows users to share interview experiences, upload
            resumes, and interact with peers.
          </p>
        </section>

        <section>
          <h3>3. User Responsibilities</h3>
          <ul>
            <li>Provide accurate information</li>
            <li>Do not post harmful or misleading content</li>
            <li>Respect community guidelines</li>
          </ul>
        </section>
        <section>
          <h3>Prohibited Activities </h3>
          <ul>
            <li>Post false or misleading information </li>
            <li>Upload malicious files</li>
            <li>Harass or abuse other users </li>
            <li>Attempt to exploit or damage the platform/</li>
          </ul>
        </section>
        <section>
          <h3>4. Termination</h3>
          <p>
            We reserve the right to suspend or terminate access if these terms
            are violated.
          </p>
        </section>
      </div>
    </div>
  );
}

export default Terms;
