import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <h2>Our Team</h2>
        <div className="footer-info-wrapper">
          <ul className="member-block">
            <li>
              <a>Member 1</a>
            </li>
            <li>
              <a>Member 2</a>
            </li>
            <li>
              <a>Member 3</a>
            </li>
            <li>
              <a>Member 4</a>
            </li>
            <li>
              <a>Member 5</a>
            </li>
          </ul>
          <ul className="project-block">
            <li>
              <a>github</a>
            </li>
            <li>
              <a>docs</a>
            </li>
          </ul>
        </div>
        {/* Credit */}
        <div className="footer-divider"></div>
        <div className="credit">
          <p>Đồ án Nhập môn công nghệ phần mềm (SE104.N22)</p>
          <p>UIT 2023</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
