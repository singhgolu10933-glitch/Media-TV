import { useEffect, useMemo, useState } from "react";
import {
  getHealth,
  getStories,
  getEpisodes
} from "./api";
import "./style.css";

const demoStories = [
  {
    id: 1,
    title: "The Last Letter",
    description:
      "A mysterious letter changes everything.",
    category: "Drama",
    thumbnail_url: "",
    featured: true
  }
];

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [stories, setStories] = useState([]);
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInitialData();
  }, []);

  async function loadInitialData() {
    setLoading(true);

    try {
      const [storyData, healthData] =
        await Promise.all([
          getStories(),
          getHealth()
        ]);

      setStories(
        Array.isArray(storyData)
          ? storyData
          : demoStories
      );

      setHealth(healthData);
    } catch (error) {
      console.error(
        "Media TV API error:",
        error
      );

      setStories(demoStories);
      setHealth({
        ok: false,
        service: "media-tv-backend"
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-shell">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="main-content">
        <Topbar
          activePage={activePage}
          health={health}
        />

        {activePage === "dashboard" && (
          <Dashboard
            stories={stories}
            loading={loading}
            health={health}
          />
        )}

        {activePage === "stories" && (
          <StoriesManager
            stories={stories}
            setStories={setStories}
            loading={loading}
            reload={loadInitialData}
          />
        )}

        {activePage === "episodes" && (
          <EpisodesManager
            stories={stories}
          />
        )}

        {activePage === "analytics" && (
          <Analytics />
        )}

        {activePage === "categories" && (
          <PlaceholderPage
            title="Categories"
            description="Manage Media TV content categories."
            icon="▦"
          />
        )}

        {activePage === "users" && (
          <PlaceholderPage
            title="Users"
            description="Manage registered Media TV users."
            icon="◉"
          />
        )}

        {activePage === "ads" && (
          <PlaceholderPage
            title="Ads & Monetization"
            description="Manage advertisements, placements and monetization."
            icon="◈"
          />
        )}

        {activePage === "settings" && (
          <PlaceholderPage
            title="Settings"
            description="Configure Media TV platform settings."
            icon="⚙"
          />
        )}
      </main>
    </div>
  );
}

function Sidebar({
  activePage,
  setActivePage
}) {
  const menu = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "⌂"
    },
    {
      id: "stories",
      label: "Stories",
      icon: "▣"
    },
    {
      id: "episodes",
      label: "Episodes",
      icon: "▶"
    },
    {
      id: "categories",
      label: "Categories",
      icon: "▦"
    },
    {
      id: "users",
      label: "Users",
      icon: "◉"
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: "⌁"
    },
    {
      id: "ads",
      label: "Ads & Revenue",
      icon: "◈"
    },
    {
      id: "settings",
      label: "Settings",
      icon: "⚙"
    }
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-logo">
          ▶
        </div>

        <div>
          <strong>Media TV</strong>
          <span>ADMIN PANEL</span>
        </div>
      </div>

      <div className="sidebar-label">
        MANAGEMENT
      </div>

      <nav>
        {menu.map((item) => (
          <button
            key={item.id}
            className={
              activePage === item.id
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() =>
              setActivePage(item.id)
            }
          >
            <span className="nav-icon">
              {item.icon}
            </span>

            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="admin-profile">
          <div className="avatar">
            A
          </div>

          <div>
            <strong>Administrator</strong>
            <span>Media TV</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

function Topbar({
  activePage,
  health
}) {
  const titles = {
    dashboard: "Dashboard",
    stories: "Stories",
    episodes: "Episodes",
    categories: "Categories",
    users: "Users",
    analytics: "Analytics",
    ads: "Ads & Revenue",
    settings: "Settings"
  };

  return (
    <header className="topbar">
      <div>
        <div className="breadcrumb">
          Media TV
          <span>/</span>
          {titles[activePage]}
        </div>

        <h1>
          {titles[activePage]}
        </h1>
      </div>

      <div className="topbar-actions">
        <div
          className={
            health?.ok
              ? "api-status online"
              : "api-status offline"
          }
        >
          <span className="status-dot" />

          {health?.ok
            ? "API Online"
            : "API Offline"}
        </div>

        <button className="icon-button">
          🔔
        </button>

        <div className="top-avatar">
          A
        </div>
      </div>
    </header>
  );
}

function Dashboard({
  stories,
  loading,
  health
}) {
  const totalStories =
    stories.length;

  const categories = new Set(
    stories.map(
      (story) => story.category
    )
  ).size;

  return (
    <section className="page">
      <div className="welcome-card">
        <div>
          <span className="eyebrow">
            MEDIA TV CONTROL CENTER
          </span>

          <h2>
            Welcome back, Admin
          </h2>

          <p>
            Manage your stories, episodes,
            users and Media TV platform
            from one place.
          </p>
        </div>

        <div className="welcome-icon">
          ▶
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Total Stories"
          value={
            loading
              ? "..."
              : totalStories
          }
          change="From database"
          icon="▣"
        />

        <StatCard
          title="Categories"
          value={
            loading
              ? "..."
              : categories
          }
          change="Active categories"
          icon="▦"
        />

        <StatCard
          title="API Status"
          value={
            health?.ok
              ? "Online"
              : "Offline"
          }
          change={
            health?.version
              ? `v${health.version}`
              : "Backend"
          }
          icon="⌁"
        />

        <StatCard
          title="Users"
          value="0"
          change="Ready for users"
          icon="◉"
        />
      </div>

      <div className="dashboard-grid">
        <div className="panel-card">
          <div className="panel-header">
            <div>
              <span className="panel-kicker">
                CONTENT
              </span>

              <h3>
                Recent Stories
              </h3>
            </div>

            <span className="panel-link">
              Live API
            </span>
          </div>

          <div className="recent-list">
            {loading ? (
              <div className="empty-state">
                Loading stories...
              </div>
            ) : stories.length === 0 ? (
              <div className="empty-state">
                No stories found.
              </div>
            ) : (
              stories
                .slice(0, 5)
                .map((story) => (
                  <div
                    className="recent-item"
                    key={story.id}
                  >
                    <StoryThumb
                      story={story}
                    />

                    <div className="recent-info">
                      <strong>
                        {story.title}
                      </strong>

                      <span>
                        {story.category ||
                          "Uncategorized"}
                      </span>
                    </div>

                    <span className="item-arrow">
                      →
                    </span>
                  </div>
                ))
            )}
          </div>
        </div>

        <div className="panel-card">
          <div className="panel-header">
            <div>
              <span className="panel-kicker">
                PLATFORM
              </span>

              <h3>
                System Overview
              </h3>
            </div>
          </div>

          <div className="system-list">
            <SystemRow
              name="Backend API"
              status={
                health?.ok
                  ? "Operational"
                  : "Offline"
              }
              active={Boolean(
                health?.ok
              )}
            />

            <SystemRow
              name="PostgreSQL"
              status={
                health?.ok
                  ? "Connected"
                  : "Unknown"
              }
              active={Boolean(
                health?.ok
              )}
            />

            <SystemRow
              name="Stories API"
              status="Ready"
              active
            />

            <SystemRow
              name="Episodes API"
              status="Ready"
              active
            />
          </div>
        </div>
      </div>
    </section>
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
        <span className="stat-title">
          {title}
        </span>

        <span className="stat-icon">
          {icon}
        </span>
      </div>

      <strong className="stat-value">
        {value}
      </strong>

      <span className="stat-change">
        {change}
      </span>
    </div>
  );
}

function SystemRow({
  name,
  status,
  active
}) {
  return (
    <div className="system-row">
      <div>
        <strong>{name}</strong>
      </div>

      <span
        className={
          active
            ? "system-status active"
            : "system-status"
        }
      >
        <span />
        {status}
      </span>
    </div>
  );
}

function StoriesManager({
  stories,
  setStories,
  loading,
  reload
}) {
  const [search, setSearch] =
    useState("");

  const [showAdd, setShowAdd] =
    useState(false);

  const [newStory, setNewStory] =
    useState({
      title: "",
      description: "",
      category: ""
    });

  const filteredStories =
    useMemo(() => {
      const value =
        search.trim().toLowerCase();

      if (!value) {
        return stories;
      }

      return stories.filter(
        (story) =>
          story.title
            ?.toLowerCase()
            .includes(value) ||
          story.category
            ?.toLowerCase()
            .includes(value)
      );
    }, [stories, search]);

  function addLocalStory(event) {
    event.preventDefault();

    if (!newStory.title.trim()) {
      return;
    }

    const story = {
      id: `local-${Date.now()}`,
      title: newStory.title,
      description:
        newStory.description,
      category:
        newStory.category ||
        "Drama",
      thumbnail_url: "",
      featured: false
    };

    setStories([
      story,
      ...stories
    ]);

    setNewStory({
      title: "",
      description: "",
      category: ""
    });

    setShowAdd(false);
  }

  function deleteStory(id) {
    const confirmed =
      window.confirm(
        "Remove this story from the admin view?"
      );

    if (!confirmed) {
      return;
    }

    setStories(
      stories.filter(
        (story) =>
          story.id !== id
      )
    );
  }

  return (
    <section className="page">
      <div className="page-toolbar">
        <div>
          <span className="panel-kicker">
            CONTENT MANAGEMENT
          </span>

          <h2>
            Stories
          </h2>

          <p>
            Stories are loaded directly
            from the Media TV backend.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() =>
            setShowAdd(true)
          }
        >
          + Add Story
        </button>
      </div>

      <div className="table-card">
        <div className="table-toolbar">
          <div className="search-box">
            <span>⌕</span>

            <input
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search stories..."
            />
          </div>

          <button
            className="secondary-button"
            onClick={reload}
          >
            ↻ Refresh
          </button>
        </div>

        {loading ? (
          <div className="empty-state large">
            Loading stories from API...
          </div>
        ) : filteredStories.length ===
          0 ? (
          <div className="empty-state large">
            No stories found.
          </div>
        ) : (
          <div className="story-table">
            <div className="table-head">
              <span>STORY</span>
              <span>CATEGORY</span>
              <span>STATUS</span>
              <span>ACTIONS</span>
            </div>

            {filteredStories.map(
              (story) => (
                <div
                  className="table-row"
                  key={story.id}
                >
                  <div className="story-cell">
                    <StoryThumb
                      story={story}
                    />

                    <div>
                      <strong>
                        {story.title}
                      </strong>

                      <span>
                        ID: {story.id}
                      </span>
                    </div>
                  </div>

                  <span className="category-badge">
                    {story.category ||
                      "Uncategorized"}
                  </span>

                  <span className="status-badge">
                    Published
                  </span>

                  <div className="row-actions">
                    <button
                      className="small-button"
                      title="Delete"
                      onClick={() =>
                        deleteStory(
                          story.id
                        )
                      }
                    >
                      🗑
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {showAdd && (
        <Modal
          title="Add Story"
          onClose={() =>
            setShowAdd(false)
          }
        >
          <form
            className="form"
            onSubmit={addLocalStory}
          >
            <label>
              Story title
              <input
                value={newStory.title}
                onChange={(event) =>
                  setNewStory({
                    ...newStory,
                    title:
                      event.target.value
                  })
                }
                placeholder="Enter story title"
              />
            </label>

            <label>
              Category
              <input
                value={newStory.category}
                onChange={(event) =>
                  setNewStory({
                    ...newStory,
                    category:
                      event.target.value
                  })
                }
                placeholder="Drama"
              />
            </label>

            <label>
              Description
              <textarea
                value={
                  newStory.description
                }
                onChange={(event) =>
                  setNewStory({
                    ...newStory,
                    description:
                      event.target.value
                  })
                }
                placeholder="Story description"
                rows="4"
              />
            </label>

            <div className="modal-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() =>
                  setShowAdd(false)
                }
              >
                Cancel
              </button>

              <button
                type="submit"
                className="primary-button"
              >
                Add Story
              </button>
            </div>

            <p className="form-note">
              This button currently adds the
              story to the admin interface only.
              Permanent CRUD will be connected
              after the backend POST endpoint is
              added.
            </p>
          </form>
        </Modal>
      )}
    </section>
  );
}

function EpisodesManager({
  stories
}) {
  const [selectedStory, setSelectedStory] =
    useState(
      stories[0]?.id || ""
    );

  const [episodes, setEpisodes] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (
      selectedStory
    ) {
      loadEpisodes(
        selectedStory
      );
    }
  }, [selectedStory]);

  async function loadEpisodes(
    storyId
  ) {
    setLoading(true);

    try {
      const data =
        await getEpisodes(
          storyId
        );

      setEpisodes(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (error) {
      console.error(
        "Episodes API error:",
        error
      );

      setEpisodes([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="page">
      <div className="page-toolbar">
        <div>
          <span className="panel-kicker">
            CONTENT MANAGEMENT
          </span>

          <h2>
            Episodes
          </h2>

          <p>
            Episodes are loaded from the
            Media TV backend.
          </p>
        </div>

        <button
          className="primary-button"
          disabled={!selectedStory}
        >
          + Add Episode
        </button>
      </div>

      <div className="episode-selector">
        <label>
          Select Story
        </label>

        <select
          value={selectedStory}
          onChange={(event) =>
            setSelectedStory(
              event.target.value
            )
          }
        >
          {stories.map(
            (story) => (
              <option
                key={story.id}
                value={story.id}
              >
                {story.title}
              </option>
            )
          )}
        </select>
      </div>

      <div className="episodes-grid">
        {loading ? (
          <div className="empty-state large">
            Loading episodes...
          </div>
        ) : episodes.length === 0 ? (
          <div className="empty-state large">
            No episodes found.
          </div>
        ) : (
          episodes.map(
            (episode) => (
              <div
                className="episode-card"
                key={episode.id}
              >
                <div className="episode-number">
                  {String(
                    episode.episode_number
                  ).padStart(2, "0")}
                </div>

                <div className="episode-info">
                  <span>
                    EPISODE{" "}
                    {episode.episode_number}
                  </span>

                  <h3>
                    {episode.title}
                  </h3>

                  <p>
                    {episode.description}
                  </p>

                  <div className="episode-meta">
                    <span>
                      ⏱{" "}
                      {formatDuration(
                        episode.duration_seconds
                      )}
                    </span>

                    <span>
                      ▶ Video ready
                    </span>
                  </div>
                </div>

                <button className="small-button">
                  →
                </button>
              </div>
            )
          )
        )}
      </div>
    </section>
  );
}

function Analytics() {
  return (
    <section className="page">
      <div className="page-toolbar">
        <div>
          <span className="panel-kicker">
            PLATFORM INSIGHTS
          </span>

          <h2>
            Analytics
          </h2>

          <p>
            Analytics infrastructure is ready
            for watch and user events.
          </p>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card">
          <span>
            TOTAL VIEWS
          </span>
          <strong>0</strong>
          <small>
            Waiting for viewing events
          </small>
        </div>

        <div className="analytics-card">
          <span>
            WATCH TIME
          </span>
          <strong>0h</strong>
          <small>
            Waiting for watch history
          </small>
        </div>

        <div className="analytics-card">
          <span>
            ACTIVE USERS
          </span>
          <strong>0</strong>
          <small>
            User system not activated
          </small>
        </div>
      </div>

      <div className="panel-card chart-placeholder">
        <span className="panel-kicker">
          PERFORMANCE
        </span>

        <h3>
          Viewing activity
        </h3>

        <div className="fake-chart">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    </section>
  );
}

function PlaceholderPage({
  title,
  description,
  icon
}) {
  return (
    <section className="page">
      <div className="placeholder-card">
        <div className="placeholder-icon">
          {icon}
        </div>

        <span className="panel-kicker">
          MEDIA TV ADMIN
        </span>

        <h2>{title}</h2>

        <p>
          {description}
        </p>

        <span className="coming-badge">
          MODULE READY
        </span>
      </div>
    </section>
  );
}

function StoryThumb({
  story
}) {
  if (
    story.thumbnail_url
  ) {
    return (
      <img
        className="story-thumb"
        src={story.thumbnail_url}
        alt={story.title}
      />
    );
  }

  return (
    <div className="story-thumb fallback">
      ▶
    </div>
  );
}

function Modal({
  title,
  children,
  onClose
}) {
  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal-box"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <div className="modal-header">
          <h3>{title}</h3>

          <button
            className="modal-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

function formatDuration(
  seconds
) {
  const value =
    Number(seconds) || 0;

  if (value <= 0) {
    return "--:--";
  }

  const minutes =
    Math.floor(value / 60);

  const remaining =
    value % 60;

  return `${String(minutes).padStart(
    2,
    "0"
  )}:${String(remaining).padStart(
    2,
    "0"
  )}`;
}

export default App;
