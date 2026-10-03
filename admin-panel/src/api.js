const API_BASE_URL = "https://media-tv.onrender.com/api";

async function request(endpoint, options = {}) {
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      }
    }
  );

  if (!response.ok) {
    let message = `API request failed: ${response.status}`;

    try {
      const error = await response.json();

      if (error?.error) {
        message = error.error;
      }
    } catch {
      // Keep the default error message.
    }

    throw new Error(message);
  }

  return response.json();
}

export async function getHealth() {
  return request("/health");
}

export async function getStories() {
  return request("/stories");
}

export async function getStory(storyId) {
  return request(`/stories/${storyId}`);
}

export async function getEpisodes(storyId) {
  return request(
    `/stories/${storyId}/episodes`
  );
}

export const api = {
  getHealth,
  getStories,
  getStory,
  getEpisodes
};
