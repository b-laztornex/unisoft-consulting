import { createSignal } from "solid-js";

export default function Contact() {
  const [email, setEmail] = createSignal("");
  const [message, setMessage] = createSignal("");

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    alert(`Thank you for contacting me! I will get back to you soon.`);
  };

  return (
    <div class="contact-container">
      <h1 class="text-center text-primary">Contact Me</h1>
      <p class="text-center text-muted">
        Feel free to reach out for any inquiries or collaborations!
      </p>
      <div class="contact-content">
        <form onSubmit={handleSubmit} class="contact-form">
          <div class="mb-3">
            <label class="form-label">Your Email</label>
            <input
              class="form-control"
              type="email"
              value={email()}
              onInput={(e) => setEmail(e.currentTarget.value)}
              required
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Your Message</label>
            <textarea
              class="form-control"
              value={message()}
              onInput={(e) => setMessage(e.currentTarget.value)}
              required
            ></textarea>
          </div>
          <button class="btn btn-primary w-100" type="submit">
            Send Message
          </button>
        </form>

        <div class="consultation-section">
          <h2 class="text-center text-success">Let's Chat</h2>
          <p class="text-center text-muted">
            Click below to schedule a free 30-minute consultation with me.
          </p>
          <div class="text-center">
            <a
              href="https://calendly.com/m-casanova-dev"
              target="_blank"
              class="btn btn-success btn-lg"
            >
              Schedule a Consultation
            </a>
          </div>
        </div>
      </div>

      <style>
        {`
          .contact-container {
            max-width: 1200px;
            margin: auto;
            padding: 40px;
            background: #f8f9fa;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          .contact-content {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            gap: 20px;
          }
          .contact-form, .consultation-section {
            flex: 1;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .btn-primary {
            background-color: #007bff;
            border-color: #007bff;
          }
          .btn-primary:hover {
            background-color: #0056b3;
          }
          .btn-success {
            background-color: #28a745;
            border-color: #28a745;
          }
          .btn-success:hover {
            background-color: #1e7e34;
          }
          @media (max-width: 768px) {
            .contact-content {
              flex-direction: column;
            }
          }
        `}
      </style>
    </div>
  );
}
