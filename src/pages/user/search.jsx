import React, { useState } from "react";
import Sidebar from "../../components/user/sidebar";
import "../../styles/user/search.scss";

const images = [
  "https://picsum.photos/400/600?random=1",
  "https://picsum.photos/400/500?random=2",
  "https://picsum.photos/400/700?random=3",
  "https://picsum.photos/400/550?random=4",
  "https://picsum.photos/400/650?random=5",
  "https://picsum.photos/400/600?random=6",
  "https://picsum.photos/400/450?random=7",
  "https://picsum.photos/400/750?random=8",
  "https://picsum.photos/400/500?random=9",
];

const peopleSuggestionsData = [
  { id: 1, name: "Anna Smith", avatar: "https://randomuser.me/api/portraits/women/45.jpg" },
  { id: 2, name: "John Doe", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 3, name: "Lucy Heart", avatar: "https://randomuser.me/api/portraits/women/55.jpg" },
  { id: 4, name: "Mark Twin", avatar: "https://randomuser.me/api/portraits/men/40.jpg" },
  { id: 5, name: "Sara Lee", avatar: "https://randomuser.me/api/portraits/women/65.jpg" },
];

const Search = () => {
  const [query, setQuery] = useState("");
  const [peopleSuggestions, setPeopleSuggestions] = useState(peopleSuggestionsData);

  const removePerson = (id) => {
    setPeopleSuggestions((prev) => prev.filter((p) => p.id !== id));
  };

  const followPerson = (id) => {
    alert(`Followed person with id: ${id}`);
  };

  return (
    <div className="search-page-container">
      <Sidebar />
      <div className="search-page-content">
        {/* Search bar */}
<div className="search-bar-container">
  <div className="search-input-wrapper">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      className="search-icon"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
    <input
      type="text"
      placeholder="Search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="search-input"
    />
  </div>
</div>


        {/* Horizontal People Carousel */}
        {peopleSuggestions.length > 0 && (
          <div className="people-carousel">
            {peopleSuggestions.map((person) => (
              <div key={person.id} className="person-card">
                <button className="remove-btn" onClick={() => removePerson(person.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24" width="14" height="14">
                    <path d="M18 6L6 18M6 6l12 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
                <img src={person.avatar} alt={person.name} className="person-avatar" />
                <span className="person-name">{person.name}</span>
                <button className="follow-btn" onClick={() => followPerson(person.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="14" height="14">
                    <path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Follow
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Masonry grid */}
        <div className="masonry-grid">
          {images
            .filter((img) => img.includes(query.toLowerCase()))
            .map((img, idx) => (
              <div key={idx} className="masonry-item">
                <img src={img} alt={`img-${idx}`} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
