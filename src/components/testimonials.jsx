/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import '../styles/testimonials.scss';

const TESTIMONIALS = [
  {
    initials: 'AS',
    name: 'Aditi Sharma',
    role: 'Blogger & Content Creator',
    rating: 5,
    review: `hread helped me grow my audience 3× in just two months. My posts are now connected, discoverable, and engaging like never before!`,
  },
  {
    initials: 'SR',
    name: 'Samir Rao',
    role: 'Tech Writer',
    rating: 5,
    review: `Finally, a platform where my posts don’t get lost. Thread makes publishing effortless and keeps my ideas linked for readers to explore.`,
  },
  {
    initials: 'RK',
    name: 'Riya Kapoor',
    role: 'Freelance Journalist',
    rating: 5,
    review: `I love how Thread combines simplicity with powerful features. Custom branding, audience engagement, and discoverability — everything my blog needed in one place.`,
  },
    {
    initials: 'NV',
    name: 'Neel Verma',
    role: 'Indie Blogger',
    rating: 5,
    review: `Thread makes writing and sharing simple yet powerful. My posts are now visible, interactive, and easier to manage than ever before.`,
  },
];

const Reviews = () => {
  return (
    <section className="reviews" id="reviews">
      <div className="t-container">
        <h1 className="t-title">
          Creators Love <span> Thread</span>
        </h1>
        <p className="t-subtitle">
          See how writers and bloggers are growing their audience, connecting ideas, and publishing effortlessly with Thread
        </p>
      </div>

      <div className="testimonial-cards">
        {TESTIMONIALS.map((t, idx) => (
          <div key={idx} className="testimonial-card">
            <div className="card-header">
              <div className="avatar">{t.initials}</div>
              <div className="user-info">
                <div className="user-name">{t.name}</div>
                <div className="role">{t.role}</div>
              </div>
            </div>

            <div className="rating">{'★'.repeat(t.rating)}</div>

            <p className="review">{t.review}</p>

          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
