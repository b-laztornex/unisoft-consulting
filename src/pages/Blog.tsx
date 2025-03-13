import { createSignal, onMount } from "solid-js";

export default function Blog() {
  const [blogs, setBlogs] = createSignal<any[]>([]);
  const [videos, setVideos] = createSignal<any[]>([]);
  const [podcasts, setPodcasts] = createSignal<any[]>([]);

  onMount(async () => {
    try {
      const response = await fetch("/bl.json");
      if (!response.ok) throw new Error("Failed to load JSON");
      const data = await response.json();
      setBlogs(data.blogs);
      setVideos(data.videos);
      setPodcasts(data.podcasts);
    } catch (error) {
      console.error("Error loading JSON:", error);
    }
  });

  return (
    <div class="container mt-5">
      <div class="row">
        {/* Blog Posts Section (8 Columns) */}
        <div class="col-md-8">
          <h1 class="text-center fw-bold">📝 Blog Posts</h1>
          <hr />
          {blogs().length > 0 ? (
            blogs().map((blog) => (
              <div class="card my-4 shadow-sm">
                <img
                  src={blog.image_preview || blog.top_image}
                  class="card-img-top"
                  alt={blog.title}
                />
                <div class="card-body">
                  <h2 class="card-title text-primary">{blog.title}</h2>
                  <p class="text-muted">🕒 {blog.read_time} min read</p>
                  <p class="card-text">{blog.summary}</p>
                  <a href={blog.link} class="btn btn-outline-primary">
                    Read More ➡️
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div class="text-center my-5">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <p>Loading blog posts...</p>
            </div>
          )}
        </div>

        {/* Sidebar Section (4 Columns) */}
        <div class="col-md-4">
          {/* Podcast Section */}
          <div class="card my-4 shadow-sm">
            <div class="card-body">
              <h2 class="card-title text-primary">🎙 Podcasts</h2>
              <ul class="list-group list-group-flush">
                {podcasts().length > 0 ? (
                  podcasts().map((podcast) => (
                    <li class="list-group-item">
                      <img
                        src={podcast.thumbnail}
                        alt={podcast.title}
                        class="img-thumbnail me-2"
                        style="width: 50px; height: 50px;"
                      />
                      <a href={podcast.link} class="text-decoration-none">
                        {podcast.title} ({podcast.duration})
                      </a>
                    </li>
                  ))
                ) : (
                  <p class="text-muted">No podcasts available.</p>
                )}
              </ul>
            </div>
          </div>

          {/* Video Section */}
          <div class="card my-4 shadow-sm">
            <div class="card-body">
              <h2 class="card-title text-primary">📺 Videos</h2>
              <ul class="list-group list-group-flush">
                {videos().length > 0 ? (
                  videos().map((video) => (
                    <li class="list-group-item">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        class="img-thumbnail me-2"
                        style="width: 50px; height: 50px;"
                      />
                      <a href={video.link} class="text-decoration-none">
                        {video.title} ({video.duration})
                      </a>
                    </li>
                  ))
                ) : (
                  <p class="text-muted">No videos available.</p>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
