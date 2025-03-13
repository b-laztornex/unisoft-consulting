import { Route, Router } from "@solidjs/router";
import Home from "./pages/Home";
import Portfolio from "./pages/Portafolio";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Blog from "./pages/Blog";

export default function App() {
  return (
    <div class="">
      <Router
        root={(props) => (
          <>
            <Navbar />
            <div>{props.children}</div>
          </>
        )}
      >
        <Route path="/" component={Home} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/services" component={Services} />
        <Route path="/contact" component={Contact} />
        <Route path="/blog" component={Blog} />
      </Router>
    </div>
  );
}
