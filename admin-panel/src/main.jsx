import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./style.css";

const menuItems = [
  { id: "dashboard", icon: "▦", label: "Dashboard" },
  { id: "stories", icon: "▶", label: "Stories" },
  { id: "episodes", icon: "▤", label: "Episodes" },
  { id: "categories", icon: "◈", label: "Categories" },
  { id: "users", icon: "♙", label: "Users" },
  { id: "analytics", icon: "⌁", label: "Analytics" },
  { id: "ads", icon: "▣", label: "Ads & Monetization" },
  { id: "settings", icon: "⚙", label: "Settings" }
];

function App() {
  const [active, setActive] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="admin-app">

      <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>

        <div className="brand">
          <div className="brand-logo">S</div>

          {sidebarOpen && (
            <div>
              <div className="brand-name">Story TV</div>
              <div className="brand-subtitle">ADMIN PANEL</div>
            </div>
          )}
        </div>

        <div className="menu-title">
          {sidebarOpen && "MAIN MENU"}
        </div>

        <nav>
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`menu-item ${
                active === item.id ? "active" : ""
              }`}
              onClick={() => setActive(item.id)}
            >
              <span className="menu-icon">{item.icon}</span>

              {sidebarOpen && (
                <span>{item.label}</span>
              )}
            </button>
          ))}
        </nav>

        {sidebarOpen && (
          <div className="sidebar-bottom">

            <div className="storage-box">
              <div className="storage-title">
                Storage
              </div>

              <div className="storage-value">
                24.8 GB / 100 GB
              </div>

              <div className="storage-bar">
                <div className="storage-progress"></div>
              </div>

              <button className="upgrade-button">
                Manage Storage
              </button>
            </div>

            <div className="admin-profile">
              <div className="avatar">A</div>

              <div>
                <div className="admin-name">
                  Administrator
                </div>

                <div className="admin-email">
                  admin@storytv.app
                </div>
              </div>
            </div>

          </div>
        )}

      </aside>

      <main className="main-content">

        <header className="topbar">

          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>

          <div className="page-heading">
            <h1>
              {menuItems.find(
                (item) => item.id === active
              )?.label || "Dashboard"}
            </h1>

            <p>
              Manage your Story TV platform
            </p>
          </div>

          <div className="topbar-actions">

            <button className="icon-button">
              ◔
            </button>

            <button className="icon-button notification">
              ♢
              <span></span>
            </button>

            <div className="top-profile">
              <div className="avatar small">
                A
              </div>

              <div className="profile-text">
                <strong>Admin</strong>
                <small>Super Admin</small>
              </div>
            </div>

          </div>

        </header>

        {active === "dashboard" && (
          <Dashboard />
        )}

        {active !== "dashboard" && (
          <ComingSoon title={
            menuItems.find(
              (item) => item.id === active
            )?.label
          } />
        )}

      </main>

    </div>
  );
}

function Dashboard() {

  return (
    <div className="dashboard">

      <div className="welcome-section">

        <div>
          <h2>
            Good evening, Admin 👋
          </h2>

          <p>
            Here's what's happening on Story TV today.
          </p>
        </div>

        <button className="primary-button">
          + Add New Story
        </button>

      </div>

      <div className="stats-grid">

        <StatCard
          title="Total Stories"
          value="128"
          change="+12.5%"
          icon="▶"
        />

        <StatCard
          title="Total Episodes"
          value="846"
          change="+8.2%"
          icon="▤"
        />

        <StatCard
          title="Total Users"
          value="24,680"
          change="+18.4%"
          icon="♙"
        />

        <StatCard
          title="Total Views"
          value="2.84M"
          change="+24.7%"
          icon="◉"
        />

      </div>

      <div className="content-grid">

        <section className="panel large-panel">

          <div className="panel-header">

            <div>
              <h3>
                Content Overview
              </h3>

              <p>
                Story and episode performance
              </p>
            </div>

            <select>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
            </select>

          </div>

          <div className="chart">

            <div className="chart-y">
              <span>100K</span>
              <span>75K</span>
              <span>50K</span>
              <span>25K</span>
              <span>0</span>
            </div>

            <div className="chart-area">

              <div className="chart-line"></div>

              <div className="chart-bars">
                {[42, 65, 48, 82, 58, 76, 91].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="chart-bar"
                      style={{
                        height: `${height}%`
                      }}
                    />
                  )
                )}
              </div>

              <div className="chart-days">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>

            </div>

          </div>

        </section>

        <section className="panel">

          <div className="panel-header">

            <div>
              <h3>
                Quick Actions
              </h3>

              <p>
                Manage your content
              </p>
            </div>

          </div>

          <div className="quick-actions">

            <button className="quick-action">
              <span>＋</span>
              <div>
                <strong>Add Story</strong>
                <small>Create a new story</small>
              </div>
            </button>

            <button className="quick-action">
              <span>▶</span>
              <div>
                <strong>Add Episode</strong>
                <small>Upload new episode</small>
              </div>
            </button>

            <button className="quick-action">
              <span>▧</span>
              <div>
                <strong>Upload Banner</strong>
                <small>Update homepage banner</small>
              </div>
            </button>

            <button className="quick-action">
              <span>⚙</span>
              <div>
                <strong>App Settings</strong>
                <small>Configure Story TV</small>
              </div>
            </button>

          </div>

        </section>

      </div>

      <div className="content-grid">

        <section className="panel large-panel">

          <div className="panel-header">

            <div>
              <h3>
                Recent Stories
              </h3>

              <p>
                Recently added content
              </p>
            </div>

            <button className="text-button">
              View All →
            </button>

          </div>

          <div className="story-table">

            <StoryRow
              title="The Last Letter"
              category="Drama"
              episodes="24"
              views="842K"
              status="Published"
            />

            <StoryRow
              title="Midnight Mystery"
              category="Mystery"
              episodes="18"
              views="624K"
              status="Published"
            />

            <StoryRow
              title="Campus Days"
              category="Romance"
              episodes="32"
              views="1.2M"
              status="Published"
            />

            <StoryRow
              title="The Hidden Room"
              category="Thriller"
              episodes="12"
              views="384K"
              status="Draft"
            />

          </div>

        </section>

        <section className="panel">

          <div className="panel-header">

            <div>
              <h3>
                Platform Status
              </h3>

              <p>
                System health
              </p>
            </div>

          </div>

          <div className="status-list">

            <StatusItem
              name="API Server"
              status="Operational"
            />

            <StatusItem
              name="Database"
              status="Operational"
            />

            <StatusItem
              name="Video Streaming"
              status="Operational"
            />

            <StatusItem
              name="Storage"
              status="Operational"
            />

          </div>

        </section>

      </div>

    </div>
  );
}

function StatCard({
  title,
  value,
  change,
  icon
}) {

  return (
    <div className="stat-card">

      <div className="stat-top">

        <div className="stat-icon">
          {icon}
        </div>

        <span className="positive">
          {change}
        </span>

      </div>

      <div className="stat-value">
        {value}
      </div>

      <div className="stat-title">
        {title}
      </div>

    </div>
  );
}

function StoryRow({
  title,
  category,
  episodes,
  views,
  status
}) {

  return (
    <div className="story-row">

      <div className="story-thumbnail">
        ▶
      </div>

      <div className="story-info">
        <strong>{title}</strong>
        <small>{category}</small>
      </div>

      <div className="story-data">
        <strong>{episodes}</strong>
        <small>Episodes</small>
      </div>

      <div className="story-data">
        <strong>{views}</strong>
        <small>Views</small>
      </div>

      <span
        className={`status ${
          status === "Published"
            ? "published"
            : "draft"
        }`}
      >
        {status}
      </span>

    </div>
  );
}

function StatusItem({
  name,
  status
}) {

  return (
    <div className="status-item">

      <div className="status-name">

        <span className="status-dot"></span>

        {name}

      </div>

      <span className="operational">
        {status}
      </span>

    </div>
  );
}

function ComingSoon({ title }) {

  return (
    <div className="coming-soon">

      <div className="coming-icon">
        ⚙
      </div>

      <h2>{title}</h2>

      <p>
        This section is ready for the next
        production module.
      </p>

    </div>
  );
}

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
