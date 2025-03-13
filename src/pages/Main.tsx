import { createSignal, onMount } from "solid-js";

export default function Home() {
  const [cv, setCv] = createSignal<any>(null);

  onMount(async () => {
    try {
      const response = await fetch("/cv.json"); // Fetch JSON from public folder
      if (!response.ok) throw new Error("Failed to load JSON");
      const data = await response.json();
      setCv(data);
    } catch (error) {
      console.error("Error loading JSON:", error);
    }
  });

  return (
    <div class="container mt-5">
      {cv() ? (
        <>
          <div class="row">
            <div class="col-12 col-md-3">
              <div class="text-center">
                <h1 class="fw-bold">{cv().name}</h1>
                <h3 class="text-primary">{cv().title}</h3>
                <p class="lead">{cv().motto}</p>
              </div>
            </div>
            <div class="col-12 col-md-9">
              <div class="text-center my-3">
                <a
                  href={`mailto:${cv().contact.email}`}
                  class="btn btn-outline-primary mx-2"
                >
                  📧 {cv().contact.email}
                </a>
                <a
                  href={cv().contact.github}
                  target="_blank"
                  class="btn btn-outline-dark mx-2"
                >
                  🐙 GitHub
                </a>
                <a
                  href={cv().contact.website}
                  target="_blank"
                  class="btn btn-outline-success mx-2"
                >
                  🌍 Website
                </a>
                <span class="d-block mt-2">📞 {cv().contact.phone}</span>
              </div>
            </div>
          </div>
          <hr />
          {/* Profile Section */}
          <div class="my-4">
            <h2>👨‍💻 About Me</h2>
            <p>{cv().profile}</p>
          </div>

          {/* Skills Section */}
          <div class="row my-4">
            <h2>🚀 Skills</h2>
            {Object.entries(cv().skills).map(([category, skills]) => (
              <div class="col-md-6 my-2">
                <h5 class="text-primary">
                  {category.replace("_", " ").toUpperCase()}
                </h5>
                <ul class="list-group">
                  {skills.map((skill) => (
                    <li class="list-group-item">{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <hr />

          {/* Experience Section */}
          <div class="my-4">
            <h2>💼 Experience</h2>
            {cv().experience.map((job) => (
              <div class="card my-3 p-3 shadow-sm">
                <h5>
                  {job.year} - {job.company} ({job.location})
                </h5>
                <strong>{job.position}</strong>
                <ul class="mt-2">
                  {job.tasks.map((task) => (
                    <li>{task}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <hr />

          {/* Education Section */}
          <div class="my-4">
            <h2>🎓 Education</h2>
            {cv().education.map((edu) => (
              <div class="card my-3 p-3 shadow-sm">
                <h5>
                  {edu.year} - {edu.course}
                </h5>
                <p>{edu.institution ? edu.institution : edu.status}</p>
                {edu.location && <small>📍 {edu.location}</small>}
              </div>
            ))}
          </div>

          <hr />

          {/* Achievements Section */}
          <div class="my-4">
            <h2>🏆 Achievements & Expertise</h2>
            <ul>
              {cv().achievements_expertise.map((achievement) => (
                <li>{achievement}</li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <div class="text-center my-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p>Loading CV data...</p>
        </div>
      )}
    </div>
  );
}
