import React from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

function App() {
  return (
    <main className="app">

      <aside className="sidebar">
        <h2>Story TV</h2>
        <p>Admin Panel</p>

        <nav>
          <a href="#">Dashboard</a>
          <a href="#">Stories</a>
          <a href="#">Episodes</a>
          <a href="#">Users</a>
        </nav>
      </aside>

      <section className="content">

        <h1>Dashboard</h1>

        <div className="cards">

          <div className="card">
            <b>0</b>
            <span>Stories</span>
          </div>

          <div className="card">
            <b>0</b>
            <span>Episodes</span>
          </div>

          <div className="card">
            <b>0</b>
            <span>Users</span>
          </div>

        </div>

        <div className="panel">

          <h2>Content Management</h2>

          <p>
            Manage stories, episodes and users from the
            Story TV administration panel.
          </p>

          <button>
            Add New Story
          </button>

        </div>

      </section>

    </main>
  );
}

createRoot(
  document.getElementById("root")
).render(
  <App />
);
