import { createSignal, onMount } from "solid-js";
import { A } from "@solidjs/router";

const Navbar = () => {
  const [scrolled, setScrolled] = createSignal(false);

  onMount(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight - 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <nav
      class={`navbar navbar-expand-lg fixed-top ${
        scrolled() ? "navbar-dark shadow-sm" : "bg-transparent"
      }`}
      style={{
        background: scrolled() ? "rgba(55, 55, 56, 0.8)" : "transparent",
        transition: "background-color 0.3s ease-in-out",
      }}
    >
      <div class="container">
        <a class="navbar-brand fw-bold text-white" href="#">
          Unisoft Consulting
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <A class="nav-link text-white" href="#services">
                Services
              </A>
            </li>
            <li class="nav-item">
              <A class="nav-link text-white" href="#portfolio">
                Portfolio
              </A>
            </li>
            <li class="nav-item">
              <A class="nav-link text-white" href="#about">
                About me
              </A>
            </li>
            <li class="nav-item">
              <A class="nav-link text-white" href="#contact">
                Contact
              </A>
            </li>
            <li class="nav-item">
              <A class="nav-link text-white" href="#blog">
                Blog
              </A>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
