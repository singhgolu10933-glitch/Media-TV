import { useMemo, useState } from "react";
import "./style.css";

const initialStories = [
  {
    id: 1,
    title: "The Last Letter",
    description: "A mysterious letter changes everything.",
    category: "Drama",
    thumbnail: "",
    status: "Published",
    featured: true
  },
  {
    id: 2,
    title: "Midnight Secret",
    description: "A secret hidden after midnight.",
    category: "Mystery",
    thumbnail: "",
    status: "Published",
    featured: false
  },
  {
    id: 3,
    title: "Broken Promise",
    description: "A promise that was never forgotten.",
    category: "Romance",
    thumbnail: "",
    status: "Draft",
    featured: false
  }
];

function App() {
  const [active, setActive] = useState("dashboard");

  return (
    <div className="admin-app">

      <Sidebar
        active={active}
        setActive={setActive}
      />

      <main className="main-content">

        <TopBar />

        {active === "dashboard" && (
          <Dashboard />
        )}

        {active === "stories" && (
          <StoriesManager />
        )}

        {active === "episodes" && (
          <EpisodesManager />
        )}

        {active === "categories" && (
          <SimplePage
            title="Categories"
            description="Manage Media TV content categories."
          />
        )}

        {active === "users" && (
          <SimplePage
            title="Users"
            description="Manage registered Media TV users."
          />
        )}

        {active === "analytics" && (
          <Analytics />
        )}

        {active === "ads" && (
          <SimplePage
            title="Ads & Monetization"
            description="Manage advertising and monetization settings."
          />
        )}

        {active === "settings" && (
          <SimplePage
            title="Settings"
            description="Manage Media TV platform settings."
          />
        )}

      </main>

    </div>
  );
}


/* ============================================
   SIDEBAR
============================================ */

function Sidebar({ active, setActive }) {

  const menu = [
    ["dashboard", "Dashboard", "⌂"],
    ["stories", "Stories", "▣"],
    ["episodes", "Episodes", "▶"],
    ["categories", "Categories", "◈"],
    ["users", "Users", "♙"],
    ["analytics", "Analytics", "⌁"],
    ["ads", "Ads & Monetization", "◉"],
    ["settings", "Settings", "⚙"]
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


      <nav className="sidebar-nav">

        <div className="nav-label">
          MANAGEMENT
        </div>

        {menu.map(([id, label, icon]) => (

          <button
            key={id}
            className={`nav-item ${
              active === id ? "active" : ""
            }`}
            onClick={() => setActive(id)}
          >

            <span className="nav-icon">
              {icon}
            </span>

            <span>
              {label}
            </span>

          </button>

        ))}

      </nav>


      <div className="sidebar-bottom">

        <div className="admin-user">

          <div className="admin-avatar">
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


/* ============================================
   TOP BAR
============================================ */

function TopBar() {

  return (
    <header className="topbar">

      <div>

        <div className="topbar-title">
          Media TV
        </div>

        <div className="topbar-subtitle">
          Content management dashboard
        </div>

      </div>


      <div className="topbar-right">

        <div className="live-status">
          <span />
          System Online
        </div>

        <div className="top-avatar">
          A
        </div>

      </div>

    </header>
  );
}


/* ============================================
   DASHBOARD
============================================ */

function Dashboard() {

  const stats = [
    ["Total Stories", "128", "+12%"],
    ["Episodes", "846", "+18%"],
    ["Users", "24.8K", "+9.4%"],
    ["Watch Time", "186K h", "+22%"]
  ];

  return (
    <section className="page">

      <div className="page-heading">

        <div>
          <h1>Dashboard</h1>

          <p>
            Overview of your Media TV platform.
          </p>
        </div>

        <button className="primary-button">
          + New Story
        </button>

      </div>


      <div className="stats-grid">

        {stats.map(([title, value, change]) => (

          <div className="stat-card" key={title}>

            <span className="stat-title">
              {title}
            </span>

            <strong className="stat-value">
              {value}
            </strong>

            <span className="stat-change">
              {change}
            </span>

          </div>

        ))}

      </div>


      <div className="dashboard-grid">

        <div className="panel">

          <div className="panel-header">

            <div>
              <h2>Content Overview</h2>
              <p>Stories and episodes activity.</p>
            </div>

            <span className="panel-badge">
              30 Days
            </span>

          </div>


          <div className="chart">

            <div className="chart-bars">

              {[35, 48, 42, 62, 55, 73, 66, 81, 70, 88, 76, 94].map(
                (height, index) => (

                  <div
                    className="chart-bar"
                    style={{ height: `${height}%` }}
                    key={index}
                  />

                )
              )}

            </div>

          </div>

        </div>


        <div className="panel">

          <div className="panel-header">

            <div>
              <h2>Recent Activity</h2>
              <p>Latest platform activity.</p>
            </div>

          </div>


          <div className="activity-list">

            <Activity
              title="New story published"
              subtitle="The Last Letter"
              time="5 min ago"
            />

            <Activity
              title="Episode uploaded"
              subtitle="Midnight Secret · EP 4"
              time="28 min ago"
            />

            <Activity
              title="New user registered"
              subtitle="User #24801"
              time="1 hour ago"
            />

            <Activity
              title="Story updated"
              subtitle="Broken Promise"
              time="2 hours ago"
            />

          </div>

        </div>

      </div>

    </section>
  );
}


/* ============================================
   STORIES MANAGER
============================================ */

function StoriesManager() {

  const [stories, setStories] = useState(initialStories);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Drama",
    thumbnail: "",
    status: "Draft",
    featured: false
  });


  const filteredStories = useMemo(() => {

    return stories.filter((story) =>
      story.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  }, [stories, search]);


  function createStory(event) {

    event.preventDefault();

    if (!form.title.trim()) {
      return;
    }

    const newStory = {
      id: Date.now(),
      ...form
    };

    setStories([
      newStory,
      ...stories
    ]);

    setForm({
      title: "",
      description: "",
      category: "Drama",
      thumbnail: "",
      status: "Draft",
      featured: false
    });

    setShowModal(false);
  }


  function deleteStory(id) {

    const confirmed =
      window.confirm(
        "Delete this story?"
      );

    if (!confirmed) {
      return;
    }

    setStories(
      stories.filter(
        (story) => story.id !== id
      )
    );
  }


  function toggleFeatured(id) {

    setStories(
      stories.map((story) =>
        story.id === id
          ? {
              ...story,
              featured: !story.featured
            }
          : story
      )
    );
  }


  return (
    <section className="page">

      <div className="page-heading">

        <div>
          <h1>Stories</h1>

          <p>
            Manage all stories available on Media TV.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowModal(true)}
        >
          + Add Story
        </button>

      </div>


      <div className="panel">

        <div className="panel-header">

          <div>
            <h2>All Stories</h2>

            <p>
              {stories.length} stories
            </p>
          </div>


          <input
            className="search-input"
            placeholder="Search stories..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

        </div>


        <div className="story-table">

          <div className="story-row story-header">

            <span>STORY</span>
            <span>CATEGORY</span>
            <span>STATUS</span>
            <span>FEATURED</span>
            <span>ACTIONS</span>

          </div>


          {filteredStories.map((story) => (

            <div
              className="story-row"
              key={story.id}
            >

              <div className="story-main">

                <div className="story-thumb">

                  {story.thumbnail ? (
                    <img
                      src={story.thumbnail}
                      alt=""
                    />
                  ) : (
                    <span>▶</span>
                  )}

                </div>


                <div>

                  <strong>
                    {story.title}
                  </strong>

                  <span>
                    {story.description}
                  </span>

                </div>

              </div>


              <div className="story-data">
                {story.category}
              </div>


              <div>

                <span
                  className={`status ${
                    story.status === "Published"
                      ? "published"
                      : "draft"
                  }`}
                >
                  {story.status}
                </span>

              </div>


              <div>

                <button
                  className={`featured-button ${
                    story.featured
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    toggleFeatured(story.id)
                  }
                >
                  ★
                </button>

              </div>


              <div className="story-actions">

                <button
                  className="small-action"
                  title="Edit"
                >
                  ✎
                </button>

                <button
                  className="small-action delete"
                  title="Delete"
                  onClick={() =>
                    deleteStory(story.id)
                  }
                >
                  ×
                </button>

              </div>

            </div>

          ))}


          {filteredStories.length === 0 && (

            <div className="empty-state">
              No stories found.
            </div>

          )}

        </div>

      </div>


      {showModal && (

        <div
          className="modal-overlay"
          onClick={() =>
            setShowModal(false)
          }
        >

          <div
            className="modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>

                <h2>
                  Add New Story
                </h2>

                <p>
                  Create a new Media TV story.
                </p>

              </div>


              <button
                className="modal-close"
                onClick={() =>
                  setShowModal(false)
                }
              >
                ×
              </button>

            </div>


            <form onSubmit={createStory}>

              <label>
                Story Title
              </label>

              <input
                className="form-input"
                value={form.title}
                onChange={(event) =>
                  setForm({
                    ...form,
                    title: event.target.value
                  })
                }
                placeholder="Enter story title"
              />


              <label>
                Description
              </label>

              <textarea
                className="form-input textarea"
                value={form.description}
                onChange={(event) =>
                  setForm({
                    ...form,
                    description:
                      event.target.value
                  })
                }
                placeholder="Story description"
              />


              <label>
                Category
              </label>

              <select
                className="form-input"
                value={form.category}
                onChange={(event) =>
                  setForm({
                    ...form,
                    category:
                      event.target.value
                  })
                }
              >
                <option>Drama</option>
                <option>Romance</option>
                <option>Mystery</option>
                <option>Thriller</option>
                <option>Comedy</option>
                <option>Action</option>
                <option>Horror</option>
              </select>


              <label>
                Thumbnail URL
              </label>

              <input
                className="form-input"
                value={form.thumbnail}
                onChange={(event) =>
                  setForm({
                    ...form,
                    thumbnail:
                      event.target.value
                  })
                }
                placeholder="https://..."
              />


              <label>
                Status
              </label>

              <select
                className="form-input"
                value={form.status}
                onChange={(event) =>
                  setForm({
                    ...form,
                    status:
                      event.target.value
                  })
                }
              >
                <option>Draft</option>
                <option>Published</option>
              </select>


              <label className="checkbox-row">

                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      featured:
                        event.target.checked
                    })
                  }
                />

                <span>
                  Featured story
                </span>

              </label>


              <div className="modal-actions">

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                >
                  Create Story
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </section>
  );
}


/* ============================================
   EPISODES MANAGER
============================================ */

function EpisodesManager() {

  const [selectedStory, setSelectedStory] =
    useState("The Last Letter");

  const [episodes, setEpisodes] = useState([
    {
      id: 1,
      number: 1,
      title: "The Beginning",
      duration: "08:42",
      status: "Published"
    },
    {
      id: 2,
      number: 2,
      title: "The Letter",
      duration: "10:15",
      status: "Published"
    },
    {
      id: 3,
      number: 3,
      title: "The Secret",
      duration: "11:08",
      status: "Draft"
    }
  ]);

  const [showModal, setShowModal] =
    useState(false);

  const [form, setForm] = useState({
    number: "",
    title: "",
    description: "",
    videoUrl: "",
    thumbnail: "",
    duration: "",
    status: "Draft"
  });


  function createEpisode(event) {

    event.preventDefault();

    if (
      !form.title.trim() ||
      !form.number
    ) {
      return;
    }

    setEpisodes([
      ...episodes,
      {
        id: Date.now(),
        number: Number(form.number),
        title: form.title,
        duration:
          form.duration || "--:--",
        status: form.status
      }
    ]);

    setForm({
      number: "",
      title: "",
      description: "",
      videoUrl: "",
      thumbnail: "",
      duration: "",
      status: "Draft"
    });

    setShowModal(false);
  }


  function deleteEpisode(id) {

    const confirmed =
      window.confirm(
        "Delete this episode?"
      );

    if (!confirmed) {
      return;
    }

    setEpisodes(
      episodes.filter(
        (episode) =>
          episode.id !== id
      )
    );
  }


  return (
    <section className="page">

      <div className="page-heading">

        <div>

          <h1>Episodes</h1>

          <p>
            Manage episodes and streaming videos.
          </p>

        </div>


        <button
          className="primary-button"
          onClick={() =>
            setShowModal(true)
          }
        >
          + Add Episode
        </button>

      </div>


      <div className="panel">

        <div className="panel-header">

          <div>

            <h2>
              Episode Manager
            </h2>

            <p>
              Select a story to manage episodes.
            </p>

          </div>


          <select
            className="form-input story-select"
            value={selectedStory}
            onChange={(event) =>
              setSelectedStory(
                event.target.value
              )
            }
          >
            <option>
              The Last Letter
            </option>

            <option>
              Midnight Secret
            </option>

            <option>
              Broken Promise
            </option>
          </select>

        </div>


        <div className="episode-list">

          {episodes.map((episode) => (

            <div
              className="episode-row"
              key={episode.id}
            >

              <div className="episode-number">
                {String(
                  episode.number
                ).padStart(2, "0")}
              </div>


              <div className="episode-info">

                <strong>
                  {episode.title}
                </strong>

                <span>
                  Episode {episode.number}
                </span>

              </div>


              <div className="episode-duration">
                {episode.duration}
              </div>


              <span
                className={`status ${
                  episode.status ===
                  "Published"
                    ? "published"
                    : "draft"
                }`}
              >
                {episode.status}
              </span>


              <div className="story-actions">

                <button
                  className="small-action"
                  title="Edit"
                >
                  ✎
                </button>

                <button
                  className="small-action delete"
                  title="Delete"
                  onClick={() =>
                    deleteEpisode(
                      episode.id
                    )
                  }
                >
                  ×
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>


      <div className="info-card">

        <div className="info-icon">
          ▶
        </div>

        <div>

          <strong>
            Video streaming
          </strong>

          <p>
            Media TV supports HLS video
            streams using .m3u8 URLs.
            Upload your video to a
            compatible storage/CDN and
            paste the stream URL here.
          </p>

        </div>

      </div>


      {showModal && (

        <div
          className="modal-overlay"
          onClick={() =>
            setShowModal(false)
          }
        >

          <div
            className="modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>

                <h2>
                  Add Episode
                </h2>

                <p>
                  Add an episode to {selectedStory}.
                </p>

              </div>


              <button
                className="modal-close"
                onClick={() =>
                  setShowModal(false)
                }
              >
                ×
              </button>

            </div>


            <form onSubmit={createEpisode}>

              <label>
                Episode Number
              </label>

              <input
                className="form-input"
                type="number"
                min="1"
                value={form.number}
                onChange={(event) =>
                  setForm({
                    ...form,
                    number:
                      event.target.value
                  })
                }
                placeholder="1"
              />


              <label>
                Episode Title
              </label>

              <input
                className="form-input"
                value={form.title}
                onChange={(event) =>
                  setForm({
                    ...form,
                    title:
                      event.target.value
                  })
                }
                placeholder="Episode title"
              />


              <label>
                Description
              </label>

              <textarea
                className="form-input textarea"
                value={form.description}
                onChange={(event) =>
                  setForm({
                    ...form,
                    description:
                      event.target.value
                  })
                }
                placeholder="Episode description"
              />


              <label>
                Video URL
              </label>

              <input
                className="form-input"
                value={form.videoUrl}
                onChange={(event) =>
                  setForm({
                    ...form,
                    videoUrl:
                      event.target.value
                  })
                }
                placeholder="https://.../video.m3u8"
              />


              <label>
                Thumbnail URL
              </label>

              <input
                className="form-input"
                value={form.thumbnail}
                onChange={(event) =>
                  setForm({
                    ...form,
                    thumbnail:
                      event.target.value
                  })
                }
                placeholder="https://..."
              />


              <label>
                Duration
              </label>

              <input
                className="form-input"
                value={form.duration}
                onChange={(event) =>
                  setForm({
                    ...form,
                    duration:
                      event.target.value
                  })
                }
                placeholder="10:30"
              />


              <label>
                Status
              </label>

              <select
                className="form-input"
                value={form.status}
                onChange={(event) =>
                  setForm({
                    ...form,
                    status:
                      event.target.value
                  })
                }
              >
                <option>
                  Draft
                </option>

                <option>
                  Published
                </option>
              </select>


              <div className="modal-actions">

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                >
                  Add Episode
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </section>
  );
}


/* ============================================
   ANALYTICS
============================================ */

function Analytics() {

  return (
    <section className="page">

      <div className="page-heading">

        <div>

          <h1>Analytics</h1>

          <p>
            Track Media TV performance.
          </p>

        </div>

      </div>


      <div className="stats-grid">

        <div className="stat-card">
          <span className="stat-title">
            Daily Views
          </span>

          <strong className="stat-value">
            42.8K
          </strong>

          <span className="stat-change">
            +14.8%
          </span>
        </div>


        <div className="stat-card">
          <span className="stat-title">
            Avg. Watch Time
          </span>

          <strong className="stat-value">
            18m 42s
          </strong>

          <span className="stat-change">
            +8.2%
          </span>
        </div>


        <div className="stat-card">
          <span className="stat-title">
            Completion Rate
          </span>

          <strong className="stat-value">
            74.6%
          </strong>

          <span className="stat-change">
            +5.7%
          </span>
        </div>


        <div className="stat-card">
          <span className="stat-title">
            Returning Users
          </span>

          <strong className="stat-value">
            68.2%
          </strong>

          <span className="stat-change">
            +11.1%
          </span>
        </div>

      </div>

    </section>
  );
}


/* ============================================
   SIMPLE PAGE
============================================ */

function SimplePage({
  title,
  description
}) {

  return (
    <section className="page">

      <div className="page-heading">

        <div>

          <h1>{title}</h1>

          <p>{description}</p>

        </div>

      </div>


      <div className="panel">

        <div className="empty-state">

          <div className="empty-icon">
            ◈
          </div>

          <h3>
            {title}
          </h3>

          <p>
            This section is ready for
            backend integration.
          </p>

        </div>

      </div>

    </section>
  );
}


/* ============================================
   ACTIVITY
============================================ */

function Activity({
  title,
  subtitle,
  time
}) {

  return (
    <div className="activity-item">

      <div className="activity-dot" />

      <div className="activity-content">

        <strong>
          {title}
        </strong>

        <span>
          {subtitle}
        </span>

      </div>

      <time>
        {time}
      </time>

    </div>
  );
}


export default App;
