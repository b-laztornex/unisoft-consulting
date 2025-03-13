import { createSignal, onMount, For, Show } from "solid-js";

export default function Portfolio() {
  const [portfolio, setPortfolio] = createSignal<any[]>([]);
  const [error, setError] = createSignal<string | null>(null);
  const [modalProject, setModalProject] = createSignal<any | null>(null);
  const [activeTab, setActiveTab] = createSignal("gallery");
  // New signal for full screen preview image
  const [previewImage, setPreviewImage] = createSignal<string | null>(null);

  // Pagination signals
  const PAGE_SIZE = 3;
  const [currentPage, setCurrentPage] = createSignal(1);

  onMount(async () => {
    try {
      const response = await fetch("/pf.json");
      if (!response.ok)
        throw new Error(`HTTP Error! Status: ${response.status}`);
      const data = await response.json();
      setPortfolio(data.portfolio);
    } catch (err) {
      console.error("Error loading portfolio:", err);
      setError("Failed to load portfolio data. Please try again later.");
    }
  });

  // Modal handlers
  const openModal = (project: any) => {
    setModalProject(project);
    setActiveTab("gallery");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalProject(null);
    document.body.style.overflow = "auto";
  };

  // Handlers for the full screen preview
  const openPreview = (img: string) => {
    setPreviewImage(img);
  };

  const closePreview = () => {
    setPreviewImage(null);
  };

  // Calculate total pages
  const totalPages = () => Math.ceil(portfolio().length / PAGE_SIZE);

  // Slice the portfolio items for the current page
  const paginatedProjects = () => {
    const start = (currentPage() - 1) * PAGE_SIZE;
    return portfolio().slice(start, start + PAGE_SIZE);
  };

  // Go to a specific page (1-based index)
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div class="container-fluid">
      <h2 class="text-center text-primary">Portfolio</h2>
      <p class="text-center lead">
        Explore my projects across multiple industries.
      </p>

      {/* Render error or the paginated items */}
      <Show
        when={!error()}
        fallback={
          <div class="alert alert-danger text-center">❌ {error()}</div>
        }
      >
        <div class="row">
          <For each={paginatedProjects()}>
            {(project) => (
              <div
                class="col-md-4 portfolio-item mb-4"
                onClick={() => openModal(project)}
              >
                {/* Fixed-size box for the image */}
                <div class="portfolio-image-box">
                  <img
                    src={project.image}
                    alt={project.title}
                    class="img-fluid portfolio-image"
                  />
                </div>
                <div class="portfolio-title-overlay">
                  <h4>{project.title}</h4>
                </div>
              </div>
            )}
          </For>
        </div>
        {/* Pagination Bar */}
        <div class="text-center my-3">
          <For each={Array.from({ length: totalPages() }, (_, i) => i + 1)}>
            {(pageNumber) => (
              <button
                class={
                  pageNumber === currentPage()
                    ? "btn btn-primary me-2"
                    : "btn btn-outline-primary me-2"
                }
                onClick={() => goToPage(pageNumber)}
              >
                {pageNumber}
              </button>
            )}
          </For>
        </div>
      </Show>

      {/* The Modal */}
      {modalProject() && (
        <div class="modal-overlay" onClick={closeModal}>
          <div
            class="modal-content-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <button class="close-button" onClick={closeModal}>
              &times;
            </button>
            <div class="row">
              <div class="col-md-8">
                {/* Tabs */}
                <ul class="nav nav-tabs">
                  <li class="nav-item">
                    <button
                      class={
                        activeTab() === "gallery"
                          ? "nav-link active"
                          : "nav-link"
                      }
                      onClick={() => setActiveTab("gallery")}
                    >
                      Gallery
                    </button>
                  </li>
                  <li class="nav-item">
                    <button
                      class={
                        activeTab() === "video" ? "nav-link active" : "nav-link"
                      }
                      onClick={() => setActiveTab("video")}
                    >
                      Video
                    </button>
                  </li>
                  <li class="nav-item">
                    <button
                      class={
                        activeTab() === "live" ? "nav-link active" : "nav-link"
                      }
                      onClick={() => setActiveTab("live")}
                    >
                      Live Demo
                    </button>
                  </li>
                </ul>
                {/* Tab content */}
                <div class="tab-content mt-3">
                  {activeTab() === "gallery" && (
                    <div class="gallery">
                      {modalProject().images.map((img: any) => (
                        <img
                          src={`/portafolio/${img}`}
                          width="150"
                          height="100%"
                          alt="Image"
                          onClick={(e) => {
                            e.stopPropagation();
                            openPreview(img);
                          }}
                          style={{ cursor: "pointer" }}
                        />
                      ))}
                    </div>
                  )}
                  {activeTab() === "video" && (
                    <video width="100%" height="315" controls autoplay>
                      <source src={`/intromov/${modalProject().video}`} />
                    </video>
                  )}
                  {activeTab() === "live" && (
                    <a
                      href={modalProject().live_demo}
                      target="_blank"
                      class="btn btn-success"
                    >
                      Visit Live Demo
                    </a>
                  )}
                </div>
              </div>
              <div class="col-md-4">
                <h5 class="fw-bold">{modalProject().title}</h5>
                <p>{modalProject().description}</p>
                <h6 class="text-success">🏢 Sectors:</h6>
                <ul class="list-group list-group-flush">
                  {modalProject().sectors.map((sector: any) => (
                    <li class="list-group-item">{sector}</li>
                  ))}
                </ul>
                <h6 class="text-primary mt-2">🛠 Technologies:</h6>
                <ul class="list-group list-group-flush">
                  {modalProject().technologies.map((tech: any) => (
                    <li class="list-group-item">{tech}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Screen Preview Modal */}
      <Show when={previewImage()}>
        <div
          class="fullscreen-preview"
          onClick={closePreview}
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            "align-items": "center",
            "justify-content": "center",
            "z-index": "1100",
          }}
        >
          <img
            width="70%"
            height="70%"
            src={`/portafolio/${previewImage()}`}
            alt="Image"
          />
        </div>
      </Show>

      {/* Styles */}
      <style>
        {`
          .potafolio-box {
            max-width: 1300px;
            background: rgba(0, 0, 0, 0.7);
          }
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1050;
          }
          .modal-content-centered {
            background: white;
            padding: 20px;
            border-radius: 10px;
            max-width: 80%;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
          }
          .close-button {
            position: absolute;
            top: 10px;
            right: 15px;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
          }
          .portfolio-item {
            position: relative;
            overflow: hidden;
            transition: transform 0.3s ease-in-out;
            cursor: pointer;
          }
          .portfolio-item:hover {
            transform: scale(1.05);
          }
          .portfolio-image-box {
            width: 100%;
            height: 220px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #ddd;
            background: #f9f9f9;
          }
          .portfolio-image {
            max-width: 100%;
            max-height: 100%;
            object-fit: cover;
          }
          .portfolio-title-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            background: rgba(0, 0, 0, 0.6);
            color: white;
            text-align: center;
            padding: 5px;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
            pointer-events: none;
          }
          .portfolio-item:hover .portfolio-title-overlay {
            opacity: 1;
          }
          .pagination button.active {
            pointer-events: none;
          }
        `}
      </style>
    </div>
  );
}
