import { createSignal, onMount } from "solid-js";

export default function ServicesPage() {
  const [scrolled, setScrolled] = createSignal(false);

  onMount(() => {
    window.addEventListener("scroll", () => {
      setScrolled(window.scrollY > 50);
    });
  });

  return (
    <div>
      {/* Services Section */}
      <div class="container mt-5">
        <h2 class="text-center text-primary">What I Offer</h2>
        <p class="text-muted text-center">
          With over 10 years of experience in web development, I specialize in
          building scalable, high-performance applications.
        </p>
        <div class="row mt-4">
          <div class="col-md-6">
            <h4>Full-Stack Development</h4>
            <p>
              Expertise in front-end (React, Angular, SolidJS) and back-end
              (Node.js, PHP, Python) development, delivering robust solutions.
            </p>
          </div>
          <div class="col-md-6">
            <h4>3D Web Development</h4>
            <p>
              Advanced WebGL and three.js implementations for interactive 3D
              applications and visualizations.
            </p>
          </div>
          <div class="col-md-6">
            <h4>API & Cloud Solutions</h4>
            <p>
              Designing and developing RESTful APIs with secure cloud-based
              integrations using Docker, Kubernetes, and Azure.
            </p>
          </div>
          <div class="col-md-6">
            <h4>Technical Mentoring</h4>
            <p>
              Helping teams grow through mentoring in Agile methodologies,
              testing automation, and software architecture.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
