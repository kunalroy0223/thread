import React, { useState } from "react";
import Sidebar from "../../components/user/sidebar"; // optional
import "../../styles/user/dm.scss";

const DM = () => {
  const [conversations, setConversations] = useState([
    { id: 1, name: "Alice", lastMessage: "Hey, are you coming tonight?", avatar: "https://picsum.photos/50?random=1", unread: true },
    { id: 2, name: "Bob", lastMessage: "Sent the files!", avatar: "https://picsum.photos/50?random=2", unread: false },
    { id: 3, name: "Charlie", lastMessage: "Let's catch up tomorrow.", avatar: "https://picsum.photos/50?random=3", unread: true },
  ]);

  const [activeChatId, setActiveChatId] = useState(null);

  return (
    <div className="dm-page-container">
      <Sidebar />

      <div className="dm-content">
        {/* DM List */}
        <div className="dm-list">
          <h3>Direct Messages</h3>
          <div className="conversations">
            {conversations.map((c) => (
              <div
                key={c.id}
                className={`conversation ${activeChatId === c.id ? "active" : ""}`}
                onClick={() => setActiveChatId(c.id)}
              >
                <img src={c.avatar} alt={c.name} className="conv-avatar" />
                <div className="conv-info">
                  <span className="conv-name">{c.name}</span>
                  <span className="conv-last">{c.lastMessage}</span>
                  {c.unread && <span className="unread-dot"></span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Preview / Placeholder */}
        <div className="chat-preview">
          {activeChatId ? (
            <div className="chat-selected">
              <h4>Conversation with {conversations.find(c => c.id === activeChatId).name}</h4>
              <p>This page is read-only. You can see messages here but cannot reply.</p>
            </div>
          ) : (
            <div className="chat-placeholder">
              <p>Select a conversation to preview messages</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DM;
