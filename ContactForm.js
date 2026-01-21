const { useState } = React;

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function submit(e) {
    e.preventDefault();
    setStatus("Sending...");

    setTimeout(() => {
      setStatus("Message sent — thank you!");
      setForm({ name: "", email: "", message: "" });
    }, 900);
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-row">
        <input name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email address" value={form.email} onChange={handleChange} required />
      </div>

      <textarea
        name="message"
        placeholder="Your message"
        rows="6"
        value={form.message}
        onChange={handleChange}
        required
      />

      {status && <div className="status ok">{status}</div>}

      <button className="btn" type="submit">Send Message</button>
    </form>
  );
}

ReactDOM.createRoot(document.getElementById('contactRoot')).render(<ContactForm />);
