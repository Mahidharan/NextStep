import "./Footer.css";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import logo from "../../assets/logo.jpg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="img-container">
              <img src={logo} alt="" />
              <h2>NextStep</h2>
            </div>
            <p>
              A community-driven platform where students and professionals share
              real interview experiences, career insights, and guidance to help
              others take their next step.
            </p>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <Link to="/terms">Terms of Service</Link>
              </li>
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          <div className="footer-connect">
            <h3>Connect with Developer</h3>
            <div className="social-links">
              <a
                href="www.linkedin.com/in/mahidharan-t-865325283/"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin /> LinkedIn
              </a>
              <a
                href="https://github.com/Mahidharan"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub /> GitHub
              </a>
              <a href="mahidharan5612@gmail.com">
                <FaEnvelope /> Email
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          Built with ❤️ by <span>Mahidharan</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
