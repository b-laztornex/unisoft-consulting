import { For } from "solid-js";
import createSlider from "solid-slider";
import "solid-slider/dist/slider.css";

export default function CarouselPortafolio(props) {
  // Initialize the slider with any desired options
  const [slider, { current, next, prev, moveTo }] = createSlider({
    duration: 800, // Example: slide transition duration in ms
    loop: true, // Example: loop back to the first slide
    // ... add more config if needed
  });

  return (
    <div use:slider class="portfolio-carousel">
      <For each={props.data}>
        {(item) => (
          <div class="portfolio-item" onClick={() => props.onOpenModal(item)}>
            <img src={item.thumbnail} alt={item.title} class="img-fluid" />
            <div class="portfolio-title-overlay">
              <h4>{item.title}</h4>
            </div>
          </div>
        )}
      </For>
    </div>
  );
}
