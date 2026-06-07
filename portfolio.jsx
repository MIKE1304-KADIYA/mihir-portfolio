import { useState, useEffect, useRef } from "react";

const NAV_ITEMS = ["Home", "Resume", "School Work"];

const COURSES = [
  {
    id: 1,
    title: "CCNA Cyber Ops",
    description: "CCNA Cyber Ops introduced the fundamental concepts of cybersecurity operations, threat monitoring, incident response, and network defense. The course focused on identifying cyber threats, analyzing security events, and understanding how Security Operations Centers (SOC) protect organizations from attacks.",
    reflection: [
      "This course provided me with a strong understanding of cybersecurity operations and the role of a SOC analyst. I learned how security teams monitor networks, investigate suspicious activities, and respond to security incidents.",
      "One of the most valuable skills I developed was analyzing network traffic and system logs to identify indicators of compromise. Through hands-on labs, I gained experience using security tools and understanding attack methodologies.",
      "The course challenged me to think critically about how attackers operate and how defenders detect malicious activity. I learned the importance of attention to detail and accurate incident documentation.",
      "This course directly supports my career goal of becoming a SOC Analyst. The knowledge gained in threat detection, monitoring, and incident response will help me contribute effectively to a cybersecurity team.",
    ],
    projects: ["SOC alert triage lab using Splunk", "Incident response documentation exercise", "Network traffic analysis with Wireshark", "Kill chain mapping using MITRE ATT&CK"],
    icon: "ti-shield-lock",
    color: "#0ea5e9",
  },
  {
    id: 2,
    title: "Cloud Foundations",
    description: "Cloud Foundations introduced the core concepts of cloud computing, including cloud service models (IaaS, PaaS, SaaS), deployment models, virtualization, and cloud security. The course provided a foundation in cloud infrastructure design and the principles that govern secure and scalable cloud environments.",
    reflection: [
      "This course gave me a solid understanding of cloud computing principles and how organizations leverage cloud infrastructure for scalability, reliability, and cost efficiency. I learned the differences between cloud service and deployment models and when each is appropriate.",
      "One of the most impactful skills I gained was designing AWS cloud architecture diagrams that model real-world enterprise environments. This hands-on experience helped me understand how components like VPCs, subnets, and security groups interact to protect cloud resources.",
      "The cloud security assessments in this course were particularly challenging and rewarding. I learned to evaluate cloud configurations for misconfigurations and vulnerabilities, which directly connects to my interest in cloud security as a growing domain within cybersecurity.",
      "Cloud Foundations strengthened my ability to think about infrastructure from a security-first perspective. As organizations continue migrating to the cloud, the skills I developed here will be essential for identifying and mitigating cloud-specific threats in a SOC environment.",
    ],
    projects: ["AWS cloud architecture diagrams", "Cloud security assessments", "Virtual machine deployment labs"],
    icon: "ti-cloud",
    color: "#8b5cf6",
  },
  {
    id: 3,
    title: "Ethical Hacking",
    description: "Ethical Hacking covered the methodology, tools, and techniques used by penetration testers and security professionals to identify vulnerabilities in systems and networks. The course emphasized legal and ethical considerations, structured penetration testing phases, and hands-on exploitation in controlled lab environments.",
    reflection: [
      "This course transformed how I think about security by teaching me to approach systems from an attacker's perspective. Understanding how vulnerabilities are discovered and exploited gave me a deeper appreciation for the importance of proactive security measures.",
      "Hands-on vulnerability scanning and Nmap reconnaissance labs were among the most valuable experiences in this course. I learned to systematically enumerate network assets, identify open ports and services, and prioritize findings based on risk severity.",
      "The penetration testing labs challenged me to apply a structured methodology — from reconnaissance through exploitation and reporting. Working through each phase reinforced the importance of documentation and clear communication of findings to stakeholders.",
      "The skills developed in this course directly complement my SOC analyst career goals. Understanding attacker techniques allows me to better detect malicious activity, write more effective detection rules, and anticipate how adversaries might move through a network.",
    ],
    projects: ["Vulnerability scanning", "Nmap network reconnaissance", "Penetration testing lab reports"],
    icon: "ti-bug",
    color: "#f43f5e",
  },
  {
    id: 4,
    title: "Operating Systems",
    description: "Operating Systems explored the design, functionality, and administration of modern operating systems with a focus on Linux and Windows environments. Topics included process management, memory allocation, file systems, user permissions, and system security configuration.",
    reflection: [
      "This course gave me a deep understanding of how operating systems function at the kernel level and how that knowledge applies to cybersecurity. Understanding OS internals — including process scheduling, memory management, and system calls — helps me better analyze malicious behavior on compromised systems.",
      "Linux administration labs were a highlight of this course. I gained proficiency in navigating the command line, managing processes, configuring services, and using tools like grep, awk, and tail for log analysis — skills I now apply daily in my SOC lab work.",
      "User and permission configuration projects taught me the principle of least privilege in practice. I configured file and directory permissions, managed user accounts, and hardened system configurations to reduce the attack surface of Linux environments.",
      "A strong command of operating systems is foundational to cybersecurity work. The skills from this course underpin my ability to perform log analysis, triage incidents on Linux-based systems, and understand how attackers escalate privileges or maintain persistence after a breach.",
    ],
    projects: ["Linux administration labs", "Process management exercises", "User and permission configuration projects"],
    icon: "ti-terminal-2",
    color: "#10b981",
  },
  {
    id: 5,
    title: "IT Project Management",
    description: "IT Project Management introduced the principles, frameworks, and tools used to plan, execute, and close technology projects successfully. The course was grounded in PMBOK guidelines and covered project lifecycle phases, risk management, scope definition, scheduling, and stakeholder communication.",
    reflection: [
      "This course gave me a structured framework for managing technology initiatives from initiation through closure. Learning the PMBOK-based project management methodology helped me understand how large cybersecurity programs — such as security audits, tool deployments, and incident response frameworks — are planned and executed.",
      "Creating the Project Charter and Gantt Chart were particularly valuable exercises. These deliverables taught me how to define project scope, set realistic timelines, allocate resources, and communicate project plans clearly to both technical and non-technical stakeholders.",
      "The Risk Management Plan assignment was directly relevant to cybersecurity. I applied risk identification, assessment, and mitigation strategies in a project context, reinforcing how risk management principles overlap between IT project management and cybersecurity operations.",
      "Project management skills are increasingly important in cybersecurity roles. Whether coordinating an incident response effort, managing a vulnerability remediation program, or rolling out new security tools, the organizational and planning skills from this course will help me lead and contribute to security initiatives effectively.",
    ],
    projects: ["Project Charter", "Gantt Chart", "Risk Management Plan", "PMBOK-based Project Documentation"],
    icon: "ti-chart-gantt",
    color: "#f59e0b",
  },
];

const SKILLS = [
  "Splunk (SPL)", "Threat Detection", "Incident Response", "Log Analysis",
  "MITRE ATT&CK", "Wireshark", "Nmap", "Vulnerability Assessment",
  "Ethical Hacking", "Cloud Security (AWS)", "Python / Pandas", "Linux",
  "Network Security", "IDS/IPS", "SQL", "VirtualBox / VMware",
];

const CERTS = [
  { name: "CompTIA Security+", sub: "In Progress · Expected Q2 2026" },
  { name: "Splunk Core Certified User", sub: "In Progress" },
  { name: "TryHackMe — SOC Level 1", sub: "tryhackme.com/p/mihir" },
  { name: "Google Cybersecurity Certificate", sub: "Coursera · In Progress" },
  { name: "Python for Data Science", sub: "Coursera · 2024" },
];

const PROJECTS = [
  {
    title: "SOC Analyst Practice Lab",
    period: "2024 – 2025",
    stack: "Linux · Splunk · Alert Triage",
    bullets: [
      "Triaged simulated security alerts in Splunk — distinguished true positives from false positives using SPL queries to surface failed authentication events, cutting triage time to under 60 seconds per alert.",
      "Detected a brute-force attack by correlating 50+ failed SSH attempts from a single external IP within a 10-minute window; traced via MITRE ATT&CK (T1110) and documented the full kill chain.",
      "Identified post-brute-force successful login anomaly — flagged the compromised account, documented IOCs, and wrote a structured incident report following SOC runbook format.",
    ],
    icon: "ti-shield-check",
    color: "#0ea5e9",
  },
  {
    title: "Security Log Analysis — Python Automation",
    period: "2024",
    stack: "Python · Pandas · Auth Log Datasets",
    bullets: [
      "Parsed 10,000+ auth log entries with Python/Pandas to programmatically detect brute-force signatures — replaced manual log review with automated threshold-based alerting.",
      "Identified a high-confidence lateral movement indicator: 30 consecutive failed logins from one IP followed by a single successful authentication — documented as a breach scenario with IOCs.",
      "Visualized login attempt timelines and failure spikes using Pandas DataFrames — charts made attack windows immediately identifiable, similar to SIEM dashboard alerting logic.",
    ],
    icon: "ti-code",
    color: "#8b5cf6",
  },
  {
    title: "Cybersecurity Risk Assessment — Simulated Enterprise",
    period: "2024",
    stack: "Nmap · Wireshark · Risk Documentation",
    bullets: [
      "Performed network reconnaissance with Nmap across a simulated 20-node environment — identified 3 misconfigured open ports; mapped findings to CVE severity using CVSS scoring.",
      "Captured and analyzed live network traffic in Wireshark, detecting cleartext credential transmission and anomalous ARP patterns indicative of reconnaissance activity.",
      "Delivered a 12-page risk assessment report with CVSS-aligned severity rankings, actionable remediation steps, and firewall rule recommendations for each identified vulnerability.",
    ],
    icon: "ti-file-report",
    color: "#10b981",
  },
];

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function Fade({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

function MatrixRain() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const cols = Math.floor(canvas.width / 18);
    const drops = Array(cols).fill(1);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    let frame;
    const draw = () => {
      ctx.fillStyle = "rgba(3,7,18,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = "13px monospace";
      drops.forEach((y, i) => {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = `rgba(6,182,212,${Math.random() * 0.45 + 0.08})`;
        ctx.fillText(ch, i * 18, y * 18);
        if (y * 18 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.18 }} />;
}

export default function Portfolio() {
  const [page, setPage] = useState("Home");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = (p) => { setPage(p); setSelectedCourse(null); setMenuOpen(false); window.scrollTo(0, 0); };

  return (
    <div style={{ fontFamily: "'Sora', sans-serif", background: "#030712", color: "#e2e8f0", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.44.0/tabler-icons.min.css');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-track { background: #030712; } ::-webkit-scrollbar-thumb { background: #0ea5e9; border-radius: 3px; }
        .nav-link { background: none; border: none; color: #94a3b8; font-family: 'Sora', sans-serif; font-size: 14px; font-weight: 500; cursor: pointer; padding: 8px 16px; border-radius: 6px; transition: color 0.2s, background 0.2s; }
        .nav-link:hover, .nav-link.active { color: #0ea5e9; background: rgba(14,165,233,0.08); }
        .cyber-btn { background: transparent; border: 1px solid #0ea5e9; color: #0ea5e9; font-family: 'Sora', sans-serif; font-size: 14px; font-weight: 600; cursor: pointer; padding: 12px 28px; border-radius: 6px; transition: all 0.22s; letter-spacing: 0.05em; }
        .cyber-btn:hover { background: #0ea5e9; color: #030712; }
        .ghost-btn { background: transparent; border: 1px solid #1e293b; color: #94a3b8; font-family: 'Sora', sans-serif; font-size: 13px; cursor: pointer; padding: 9px 20px; border-radius: 6px; transition: all 0.2s; }
        .ghost-btn:hover { border-color: #0ea5e9; color: #0ea5e9; }
        .course-card { background: #0a0f1e; border: 1px solid #1e293b; border-radius: 12px; padding: 24px; cursor: pointer; transition: border-color 0.22s, transform 0.22s; height: 100%; }
        .course-card:hover { border-color: #0ea5e9; transform: translateY(-3px); }
        .skill-tag { background: rgba(14,165,233,0.07); border: 1px solid rgba(14,165,233,0.2); color: #7dd3fc; font-size: 12px; font-weight: 500; padding: 5px 12px; border-radius: 20px; font-family: 'Share Tech Mono', monospace; }
        .glow-line { height: 1px; background: linear-gradient(90deg, transparent, #0ea5e9, transparent); }
        .mono { font-family: 'Share Tech Mono', monospace; }
        .back-btn { background: none; border: none; color: #0ea5e9; font-family: 'Sora', sans-serif; font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 6px; padding: 0; margin-bottom: 24px; }
        .back-btn:hover { text-decoration: underline; }
        .hamburger { display: none; background: none; border: 1px solid #1e293b; color: #94a3b8; border-radius: 6px; padding: 8px 10px; cursor: pointer; font-size: 20px; }
        .proj-card { background: #0a0f1e; border: 1px solid #1e293b; border-radius: 12px; padding: 28px 32px; margin-bottom: 20px; }
        .bullet-item { display: flex; gap: 10px; margin-bottom: 10px; align-items: flex-start; }
        .bullet-dot { width: 6px; height: 6px; border-radius: 50%; background: #0ea5e9; margin-top: 7px; flex-shrink: 0; }
        @media (max-width: 640px) {
          .hamburger { display: flex; align-items: center; }
          .nav-links-wrap { display: none !important; }
          .nav-links-wrap.open { display: flex !important; flex-direction: column; position: absolute; top: 64px; left: 0; right: 0; background: #0a0f1e; border-bottom: 1px solid #1e293b; padding: 12px; gap: 4px; z-index: 100; }
        }
        @keyframes blink { 50% { border-color: transparent; } }
      `}</style>

      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(3,7,18,0.93)", backdropFilter: "blur(12px)", borderBottom: "1px solid #1e293b", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <span className="mono" style={{ color: "#0ea5e9", fontSize: 16, fontWeight: 700, letterSpacing: "0.08em" }}>MK<span style={{ color: "#475569" }}>.sec</span></span>
        <div className={`nav-links-wrap${menuOpen ? " open" : ""}`} style={{ display: "flex", gap: 4 }}>
          {NAV_ITEMS.map(n => (
            <button key={n} className={`nav-link${page === n ? " active" : ""}`} onClick={() => navigate(n)}>{n}</button>
          ))}
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(o => !o)}><i className="ti ti-menu-2" /></button>
      </nav>

      <main>
        {page === "Home" && <HomePage navigate={navigate} />}
        {page === "Resume" && <ResumePage />}
        {page === "School Work" && !selectedCourse && <SchoolWorkPage setSelectedCourse={setSelectedCourse} />}
        {page === "School Work" && selectedCourse && <CoursePage course={selectedCourse} back={() => setSelectedCourse(null)} />}
      </main>

      <footer style={{ background: "#030712", borderTop: "1px solid #1e293b", padding: "32px 24px", textAlign: "center", marginTop: 80 }}>
        <p className="mono" style={{ color: "#334155", fontSize: 13 }}>© 2026 Mihir Kadiya · Cybersecurity Portfolio · Jersey City, NJ</p>
      </footer>
    </div>
  );
}

function HomePage({ navigate }) {
  const [typed, setTyped] = useState("");
  const full = "Aspiring SOC Analyst";
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => { i++; setTyped(full.slice(0, i)); if (i >= full.length) clearInterval(t); }, 60);
    return () => clearInterval(t);
  }, []);

  return (
    <div>
      <section style={{ position: "relative", minHeight: "92vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: "60px 24px" }}>
        <MatrixRain />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 720, textAlign: "center" }}>
          <Fade>
            <div className="mono" style={{ color: "#0ea5e9", fontSize: 13, letterSpacing: "0.2em", marginBottom: 20 }}>CYBERSECURITY STUDENT · MONROE UNIVERSITY</div>
            <h1 style={{ fontSize: "clamp(42px, 8vw, 80px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.05, marginBottom: 16 }}>
              Mihir<br /><span style={{ color: "#0ea5e9" }}>Kadiya</span>
            </h1>
            <div style={{ height: 36, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28 }}>
              <span className="mono" style={{ color: "#7dd3fc", fontSize: 20 }}>{typed}<span style={{ borderRight: "2px solid #0ea5e9", animation: "blink 1s step-end infinite" }}></span></span>
            </div>
          </Fade>
          <Fade delay={200}>
            <p style={{ color: "#94a3b8", fontSize: 17, lineHeight: 1.75, maxWidth: 620, margin: "0 auto 40px" }}>
              Pursuing a B.S. in Cybersecurity &amp; Computer Science, graduating May 2026. Passionate about threat detection, incident response, and protecting organizations from cyber threats.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="cyber-btn" onClick={() => navigate("Resume")}>View Resume</button>
              <button className="ghost-btn" onClick={() => navigate("School Work")}>School Work</button>
            </div>
          </Fade>
        </div>
      </section>

      <div className="glow-line" style={{ margin: "0 48px" }} />

      <section style={{ maxWidth: 900, margin: "80px auto", padding: "0 24px" }}>
        <Fade>
          <div className="mono" style={{ color: "#0ea5e9", fontSize: 12, letterSpacing: "0.2em", marginBottom: 12 }}>// ABOUT.md</div>
          <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 24, letterSpacing: "-0.02em" }}>About Me</h2>
        </Fade>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
          {[
            { delay: 0, text: "Welcome to my professional e-Portfolio. I am currently pursuing a Bachelor of Science in Cybersecurity and Computer Science at Monroe University and expect to graduate in May 2026." },
            { delay: 80, text: "My academic journey has provided me with hands-on experience in cybersecurity operations, ethical hacking, network security, cloud computing, operating systems, and project management." },
            { delay: 140, text: "Through coursework, labs, and independent projects, I have developed skills in threat detection, incident response, vulnerability assessment, and security monitoring using tools like Splunk and Wireshark." },
            { delay: 200, text: "My career goal is to begin my professional journey as a SOC Analyst Level 1 and continue advancing in the cybersecurity field, continuously improving through certifications, labs, and practical experience." },
          ].map(({ delay, text }, i) => (
            <Fade key={i} delay={delay}>
              <p style={{ color: "#94a3b8", lineHeight: 1.75, fontSize: 15 }}>{text}</p>
            </Fade>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 900, margin: "0 auto 80px", padding: "0 24px" }}>
        <Fade>
          <div className="mono" style={{ color: "#0ea5e9", fontSize: 12, letterSpacing: "0.2em", marginBottom: 12 }}>// SKILLS[]</div>
          <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 24, letterSpacing: "-0.02em" }}>Technical Skills</h2>
        </Fade>
        <Fade delay={100}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {SKILLS.map(s => <span key={s} className="skill-tag">{s}</span>)}
          </div>
        </Fade>
      </section>

      <section style={{ maxWidth: 900, margin: "0 auto 80px", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
          {[
            { label: "SOC Lab Projects", value: "3", icon: "ti-shield-check" },
            { label: "Grad Year", value: "2026", icon: "ti-school" },
            { label: "Career Goal", value: "SOC L1", icon: "ti-radar" },
            { label: "Courses Showcased", value: "5", icon: "ti-books" },
          ].map(({ label, value, icon }, i) => (
            <Fade key={label} delay={i * 60}>
              <div style={{ background: "#0a0f1e", border: "1px solid #1e293b", borderRadius: 12, padding: "20px 24px" }}>
                <i className={`ti ${icon}`} style={{ fontSize: 22, color: "#0ea5e9", marginBottom: 10, display: "block" }} />
                <div style={{ fontSize: 26, fontWeight: 700, color: "#e2e8f0", marginBottom: 4 }}>{value}</div>
                <div style={{ fontSize: 12, color: "#64748b", fontWeight: 500 }}>{label}</div>
              </div>
            </Fade>
          ))}
        </div>
      </section>
    </div>
  );
}

function ResumePage() {
  return (
    <div style={{ maxWidth: 880, margin: "60px auto", padding: "0 24px" }}>
      <Fade>
        <div className="mono" style={{ color: "#0ea5e9", fontSize: 12, letterSpacing: "0.2em", marginBottom: 12 }}>// RESUME.pdf</div>
        <h1 style={{ fontSize: 40, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 12 }}>Resume</h1>
        <p style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.75, maxWidth: 640, marginBottom: 12 }}>
          This page contains my professional resume highlighting my education, technical skills, cybersecurity projects, certifications, and hands-on experience.
        </p>
        <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.7, marginBottom: 36 }}>
          Please download or view the attached resume for detailed information regarding my qualifications and professional experience.
        </p>
        <div style={{ marginBottom: 48 }}>
          <button className="cyber-btn" style={{ fontSize: 13, padding: "10px 22px" }}>
            <i className="ti ti-download" style={{ marginRight: 8 }} />Download Resume (PDF)
          </button>
        </div>
      </Fade>

      <Fade delay={100}>
        <div style={{ background: "#0a0f1e", border: "1px solid #1e293b", borderRadius: 14, padding: "40px 48px" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 32, paddingBottom: 28, borderBottom: "1px solid #1e293b" }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, color: "#e2e8f0", marginBottom: 6 }}>Mihir Kadiya</h2>
            <p className="mono" style={{ color: "#0ea5e9", fontSize: 13, marginBottom: 8 }}>SOC Analyst Level 1 · Threat Detection &amp; Incident Response</p>
            <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
              {[
                { icon: "ti-mail", text: "mihirkadia456@gmail.com" },
                { icon: "ti-phone", text: "551-554-8919" },
                { icon: "ti-map-pin", text: "Jersey City, NJ · Open to Remote" },
              ].map(({ icon, text }) => (
                <span key={text} style={{ color: "#64748b", fontSize: 13, display: "flex", alignItems: "center", gap: 5 }}>
                  <i className={`ti ${icon}`} style={{ color: "#475569" }} />{text}
                </span>
              ))}
            </div>
          </div>

          {/* Summary */}
          <ResumeSection icon="ti-user" title="Professional Summary">
            <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.75, paddingLeft: 26 }}>
              Cybersecurity graduate (May 2026) with hands-on SOC lab experience triaging alerts, analyzing authentication logs, and detecting attack patterns including brute-force, lateral movement, and anomalous login behavior using Splunk and Linux. Familiar with the MITRE ATT&amp;CK framework. Experienced with Splunk SPL queries, alert triage workflows, and structured incident documentation. Pursuing CompTIA Security+ (Q2 2026). Ready to contribute to a SOC Tier 1 team from day one.
            </p>
          </ResumeSection>

          {/* Skills */}
          <ResumeSection icon="ti-terminal-2" title="Core Competencies">
            <div style={{ paddingLeft: 26, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {SKILLS.map(s => <span key={s} className="skill-tag">{s}</span>)}
            </div>
          </ResumeSection>

          {/* Projects */}
          <ResumeSection icon="ti-code" title="SOC Projects & Lab Work">
            {PROJECTS.map(p => (
              <div key={p.title} style={{ paddingLeft: 26, marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 4, marginBottom: 4 }}>
                  <p style={{ color: "#cbd5e1", fontSize: 14, fontWeight: 600 }}>{p.title}</p>
                  <span className="mono" style={{ color: "#475569", fontSize: 12 }}>{p.period}</span>
                </div>
                <p style={{ color: "#475569", fontSize: 12, marginBottom: 8, fontStyle: "italic" }}>{p.stack}</p>
                {p.bullets.map((b, i) => (
                  <div key={i} className="bullet-item">
                    <div className="bullet-dot" />
                    <p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.65 }}>{b}</p>
                  </div>
                ))}
              </div>
            ))}
          </ResumeSection>

          {/* Education */}
          <ResumeSection icon="ti-school" title="Education">
            <div style={{ paddingLeft: 26 }}>
              <p style={{ color: "#cbd5e1", fontSize: 14, fontWeight: 600 }}>Bachelor of Science — Cybersecurity &amp; Computer Science</p>
              <p style={{ color: "#64748b", fontSize: 13 }}>Monroe University, New York · Expected May 2026</p>
            </div>
          </ResumeSection>

          {/* Experience */}
          <ResumeSection icon="ti-briefcase" title="Experience">
            <div style={{ paddingLeft: 26 }}>
              <p style={{ color: "#cbd5e1", fontSize: 14, fontWeight: 600 }}>ServiceNow University</p>
              <p style={{ color: "#64748b", fontSize: 13 }}>Training &amp; Certification Program</p>
            </div>
          </ResumeSection>

          {/* Certs */}
          <ResumeSection icon="ti-certificate" title="Certifications & Training" last>
            {CERTS.map(c => (
              <div key={c.name} style={{ paddingLeft: 26, marginBottom: 8 }}>
                <p style={{ color: "#cbd5e1", fontSize: 14, fontWeight: 500 }}>{c.name}</p>
                <p style={{ color: "#64748b", fontSize: 12 }}>{c.sub}</p>
              </div>
            ))}
          </ResumeSection>
        </div>
      </Fade>
    </div>
  );
}

function ResumeSection({ icon, title, children, last }) {
  return (
    <div style={{ marginBottom: last ? 0 : 32 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <i className={`ti ${icon}`} style={{ fontSize: 18, color: "#0ea5e9" }} />
        <h3 style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0", letterSpacing: "0.1em" }}>{title.toUpperCase()}</h3>
      </div>
      {children}
    </div>
  );
}

function SchoolWorkPage({ setSelectedCourse }) {
  return (
    <div style={{ maxWidth: 940, margin: "60px auto", padding: "0 24px" }}>
      <Fade>
        <div className="mono" style={{ color: "#0ea5e9", fontSize: 12, letterSpacing: "0.2em", marginBottom: 12 }}>// SCHOOL_WORK[]</div>
        <h1 style={{ fontSize: 40, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 12 }}>School Work</h1>
        <p style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.75, maxWidth: 640, marginBottom: 48 }}>
          Five courses that have shaped my cybersecurity knowledge and skills. Each includes a course description, personal reflection, and sample projects.
        </p>
      </Fade>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: 20 }}>
        {COURSES.map((c, i) => (
          <Fade key={c.id} delay={i * 80}>
            <div className="course-card" onClick={() => setSelectedCourse(c)}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: `${c.color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <i className={`ti ${c.icon}`} style={{ fontSize: 20, color: c.color }} />
                </div>
                <div>
                  <div className="mono" style={{ fontSize: 10, color: "#475569", letterSpacing: "0.1em" }}>COURSE {c.id}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0" }}>{c.title}</div>
                </div>
              </div>
              <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>{c.description.slice(0, 110)}…</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
                {c.projects.slice(0, 2).map(p => (
                  <span key={p} style={{ background: `${c.color}10`, border: `1px solid ${c.color}25`, color: c.color, fontSize: 10, padding: "3px 8px", borderRadius: 20, fontFamily: "'Share Tech Mono', monospace" }}>{p}</span>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <span style={{ color: "#0ea5e9", fontSize: 12, fontWeight: 600, letterSpacing: "0.05em" }}>VIEW DETAILS →</span>
              </div>
            </div>
          </Fade>
        ))}
      </div>
    </div>
  );
}

function CoursePage({ course, back }) {
  return (
    <div style={{ maxWidth: 840, margin: "60px auto", padding: "0 24px" }}>
      <button className="back-btn" onClick={back}><i className="ti ti-arrow-left" /> Back to School Work</button>

      <Fade>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 36 }}>
          <div style={{ width: 54, height: 54, borderRadius: 10, background: `${course.color}15`, border: `1px solid ${course.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <i className={`ti ${course.icon}`} style={{ fontSize: 26, color: course.color }} />
          </div>
          <div>
            <div className="mono" style={{ fontSize: 11, color: "#475569", letterSpacing: "0.15em", marginBottom: 4 }}>COURSE {course.id}</div>
            <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em", color: "#e2e8f0" }}>{course.title}</h1>
          </div>
        </div>
      </Fade>

      <Fade delay={80}>
        <div style={{ background: "#0a0f1e", border: "1px solid #1e293b", borderRadius: 12, padding: "28px 32px", marginBottom: 20 }}>
          <h2 style={{ fontSize: 13, fontWeight: 600, color: "#0ea5e9", marginBottom: 14, letterSpacing: "0.1em" }}>COURSE DESCRIPTION</h2>
          <p style={{ color: "#94a3b8", lineHeight: 1.8, fontSize: 15 }}>{course.description}</p>
        </div>
      </Fade>

      <Fade delay={140}>
        <div style={{ background: "#0a0f1e", border: "1px solid #1e293b", borderRadius: 12, padding: "28px 32px", marginBottom: 20 }}>
          <h2 style={{ fontSize: 13, fontWeight: 600, color: "#0ea5e9", marginBottom: 20, letterSpacing: "0.1em" }}>REFLECTION</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {course.reflection.map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 16 }}>
                <div className="mono" style={{ color: "#1e4d6b", fontSize: 12, minWidth: 24, paddingTop: 3 }}>0{i + 1}</div>
                <p style={{ color: "#94a3b8", lineHeight: 1.78, fontSize: 15 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </Fade>

      <Fade delay={200}>
        <div style={{ background: "#0a0f1e", border: `1px solid ${course.color}30`, borderRadius: 12, padding: "28px 32px" }}>
          <h2 style={{ fontSize: 13, fontWeight: 600, color: "#0ea5e9", marginBottom: 18, letterSpacing: "0.1em" }}>SAMPLE PROJECTS</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {course.projects.map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, background: `${course.color}08`, border: `1px solid ${course.color}20`, borderRadius: 8, padding: "12px 16px" }}>
                <i className="ti ti-folder-open" style={{ fontSize: 18, color: course.color, flexShrink: 0 }} />
                <span style={{ color: "#cbd5e1", fontSize: 14, fontWeight: 500 }}>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </Fade>
    </div>
  );
}
