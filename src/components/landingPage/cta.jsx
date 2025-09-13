/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import '../../styles/landingPage/cta.scss'; // Assuming the CSS file is in the same directory
import Post from '../../../public/assets/video/post.mp4';

const Cta = () => {
  const tickerItems = [
    {
      title: "Trusted",
      subtitle: "by creators worldwide",
      description: "Join thousands of writers and bloggers using Thread",
    },
    {
      title: "Privacy",
      subtitle: "Guaranteed",
      description: "We don’t spam or sell your data",
    },
    {
      title: "Secure",
      subtitle: "and Reliable",
      description: "Your posts are safe with us",
    },
    {
      title: "Instant",
      subtitle: "Publishing",
      description: "Start your first Thread in seconds",
    },
    {
      title: "No",
      subtitle: "Setup Needed",
      description: "No plugins, no hosting hassle",
    },
    {
      title: "Custom",
      subtitle: "Branding",
      description: "Make your blog truly yours",
    },
    {
      title: "Connected",
      subtitle: "Posts",
      description: "Link your ideas and stories seamlessly",
    },
    {
      title: "SEO",
      subtitle: "Friendly",
      description: "Your content is discoverable by search engines",
    },
    {
      title: "Interactive",
      subtitle: "Community",
      description: "Readers can comment, reply, and share easily",
    },
    {
      title: "Lightweight",
      subtitle: "Platform",
      description: "Fast and responsive for all devices",
    },
    {
      title: "Free",
      subtitle: "Forever",
      description: "Start blogging without paying a cent",
    },
    {
      title: "Your",
      subtitle: "Ideas",
      description: "Deserve more than just another blog post",
    },
    {
      title: "Global",
      subtitle: "Creators",
      description: "Join a worldwide community of bloggers",
    },
    {
      title: "No",
      subtitle: "Spam",
      description: "We respect your inbox and privacy",
    },
    {
      title: "Fast",
      subtitle: "Setup",
      description: "Get started in under a minute",
    },
    {
      title: "Trusted",
      subtitle: "by Writers",
      description: "Creators, journalists, and indie bloggers love Thread",
    },
  ];

  return (
    <section className="cta" id="cta">
      <div className="c-container">
        <h1 className="c-title">
          Start Your  
          <span> Thread</span>
        </h1>
        <p className="c-subtitle">
          Share your ideas, connect posts, and grow your audience in just 60 seconds
        </p> 
      </div>

      <div className="cta-container reverse">
        <div className="cta-video">
          <video src={Post} autoPlay loop muted />
        </div>
        <div className="cta-text">
          <h2>Get Started <span>Free</span></h2>
          <p>No setup. No plugins. Just write</p>
        </div>
      </div>

      <button className="btn">
        <div>GET STARTED</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25px"
          height="25px"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M11.6801 14.62L14.2401 12.06L11.6801 9.5"
            stroke="white"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M4 12.0601H14.17"
            stroke="white"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M12 4C16.42 4 20 7 20 12C20 17 16.42 20 12 20"
            stroke="white"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </button>

      <div className="stock-ticker">
        <ul>
          {tickerItems.map((item, idx) => (
            <li key={idx} className="minus">
              <span className="company">{item.title}</span>{" "}
              <span className="price">{item.subtitle}</span>{" "}
              <span className="change">{item.description}</span>
            </li>
          ))}
        </ul>
        <ul aria-hidden="true">
          {tickerItems.map((item, idx) => (
            <li key={idx} className="minus">
              <span className="company">{item.title}</span>{" "}
              <span className="price">{item.subtitle}</span>{" "}
              <span className="change">{item.description}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Cta;
