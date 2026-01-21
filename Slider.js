const { useState, useRef, useEffect } = React;

function Slider() {
  const projects = [
    {
      title: "Portfolio Website",
      subtitle: "Personal Branding & Performance",
      img: "assets/portfolio mockup.png",

      problem:
        "Needed a fast, accessible portfolio that balances clean design with expressive motion.",
      solution:
        "Built a hybrid static + React architecture with CSS variables, glassmorphism and motion-safe animations.",

      role: [
        "UI/UX Design",
        "Front-End Development",
        "Accessibility & Performance"
      ],

      stack: ["HTML", "CSS", "JavaScript", "React"],
      highlights: [
        "Hybrid architecture (static + React islands)",
        "Theme & showcase toggles",
        "Accessible navigation & forms",
        "Motion respecting prefers-reduced-motion"
      ],

      result: "Improved Lighthouse score to 95+ and reduced load time under 1s."
    },
    {
      title: "Drag & Drop Uploader",
      subtitle: "File Handling & UX",
      img: "assets/drag and drop image.png",

      problem:
        "Users needed a simple and intuitive way to upload files without navigating complex forms or dialogs.",
      solution:
        "Built a drag-and-drop uploader with visual feedback, keyboard accessibility, and clear upload states to improve usability and reduce friction.",
      role: ["Front-End Development"],
      stack: ["React", "CSS Grid", "JavaScript"],
      highlights: [
        "Drag & drop + click upload support, Keyboard-accessible dropzone, Real-time upload feedback, Clear success & error states",
],
      result: "Improved user efficiency and reduced upload-related errors during internal testing"
    },
    {
      title: "Analytics Dashboard",
      subtitle: "Data Visualization & Layout",
      img: "assets/analytics db.png",

      problem:
        "Complex data was difficult to scan and understand quickly.",
      solution:
        "Created a responsive dashboard with clear data grouping and visual hierarchy.",
      role: ["Front-End Development"],
      stack: ["React", "CSS", "JavaScript"],
      highlights: [
        "Responsive grid layout",
        "Scalable component structure",
        "Readable data hierarchy"
      ],
      result: "Faster data comprehension and improved usability."
    }
  ];

  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIdx(i => (i + 1) % projects.length);
      setOpen(false);
    }, 6000);
    return () => clearInterval(timerRef.current);
  }, []);

  const p = projects[idx];

  return (
    <div
      className="slider"
      onMouseEnter={() => clearInterval(timerRef.current)}
      onMouseLeave={() => {
        timerRef.current = setInterval(() => {
          setIdx(i => (i + 1) % projects.length);
          setOpen(false);
        }, 6000);
      }}
    >
      <div className="slider-inner">
        <div className="slider-media">
          <img src={p.img} alt={p.title} loading="lazy" />
        </div>

        <div className="slider-body">
          <h3>{p.title}</h3>
          <p className="muted">{p.subtitle}</p>

          <p>{p.problem}</p>

          <div className="project-tags">
            {p.stack.map((tech, i) => (
              <span key={i} className="chip">{tech}</span>
            ))}
          </div>

          <button
            className="btn btn-ghost"
            style={{ marginTop: 12 }}
            onClick={() => setOpen(o => !o)}
          >
            {open ? "Hide details" : "View case study"}
          </button>

          {open && (
            <div className="project-details">
              <h4>Solution</h4>
              <p>{p.solution}</p>

              <h4>My Role</h4>
              <ul>
                {p.role.map((r, i) => <li key={i}>{r}</li>)}
              </ul>

              <h4>Key Highlights</h4>
              <ul>
                {p.highlights.map((h, i) => <li key={i}>{h}</li>)}
              </ul>

              <h4>Result</h4>
              <p><strong>{p.result}</strong></p>
            </div>
          )}

          <div className="slider-controls">
            <div className="dots">
              {projects.map((_, i) => (
                <button
                  key={i}
                  className={i === idx ? "dot active" : "dot"}
                  onClick={() => {
                    setIdx(i);
                    setOpen(false);
                  }}
                  aria-label={`Project ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("sliderRoot")).render(<Slider />);
