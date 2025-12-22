import "./Footer.css";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section */}
        <div className="footer-brand">
          <h2>NextStep</h2>
          <p>
            A community-driven platform where students and professionals share
            real interview experiences, career insights, and guidance to help
            others take their next step.
          </p>
        </div>

        {/* Middle Section */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/terms">Terms of Service</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/status">Status Page</Link>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="footer-connect">
          <h3>Connect with Developer</h3>
          <div className="social-links">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedin />
              <span>LinkedIn</span>
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <FaGithub />
              <span>GitHub</span>
            </a>
            <a href="mailto:yourmail@gmail.com">
              <FaEnvelope />
              <span>Email</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>
          Built with ❤️ by <span>Mahidharan</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
