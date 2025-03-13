import { createSignal, onMount } from "solid-js";
import ServicesPage from "./Services";
import Portfolio from "./Portafolio";
import Contact from "./Contact";
import About from "./About";

export default function LandingPage() {
  const [scrolled, setScrolled] = createSignal(false);

  onMount(() => {
    window.addEventListener("scroll", () => {
      setScrolled(window.scrollY > 50);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  });

  return (
    <div class="container-fluid p-0 m-0">
      {/* Hero Section */}
      <div
        class="d-flex justify-content-center align-items-center text-center text-white p-0 m-0 position-relative"
        style={{
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          background: `url('/digital_world.jpg') center/cover no-repeat`,
        }}
      >
        {/* Overlay Layer */}
        <div
          class="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: "0",
          }}
        ></div>

        {/* Content */}
        <div style={{ zIndex: "2" }}>
          <h2>Marco Casanova</h2>
          <h1
            class="fw-bold text-white p-4 rounded"
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              display: "inline-block",
            }}
          >
            Grow Your Business now!
          </h1>
        </div>
      </div>

      <section id="services" class="py-1">
        <ServicesPage />
      </section>
      <section id="portfolio" class="py-1">
        <Portfolio />
      </section>
      <section id="about" class="py-1">
        <About />
      </section>
      <section id="contact" class="py-1">
        <Contact />
      </section>

      <section id="about" class="py-5">
        <h2 class="text-center text-primary">About Us</h2>
        <p class="text-muted text-center">
          We help businesses scale through innovation and strategy.
        </p>
      </section>
      <section id="services" class="py-5 bg-light">
        <h2 class="text-center text-primary">Our Services</h2>
        <p class="text-muted text-center">
          Offering top-notch business growth strategies.
        </p>
      </section>
      <section id="contact" class="py-5">
        <h2 class="text-center text-primary">Contact Us</h2>
        <p class="text-muted text-center">
          Get in touch to elevate your business.
        </p>
      </section>
    </div>
  );
}
