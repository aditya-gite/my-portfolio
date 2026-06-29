import { createFileRoute } from "@tanstack/react-router";
import { Suspense, lazy, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MatrixRain } from "@/components/portfolio/MatrixRain";
import { Scramble, Counter } from "@/components/portfolio/Effects";
import {
  PROFILE, PROJECTS, EXPERIENCE, SKILLS, SERVICES, PRINCIPLES, INSIGHTS, STATS,
} from "@/data/portfolio";

const ThreeScene = lazy(() =>
  import("@/components/portfolio/ThreeScene").then((m) => ({ default: m.ThreeScene })),
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aditya Gite // Digital Architect & Creative Engineer" },
      { name: "description", content: "Cinematic 3D portfolio of Aditya Gite — Full-Stack Web Developer, 3D UI Engineer, and Video Editor based in Sinnar, Nashik." },
      { property: "og:title", content: "Aditya Gite // Digital Architect" },
      { property: "og:description", content: "Cinematic 3D portfolio — Full-Stack, 3D Interfaces, Video Editing." },
      { property: "og:image", content: "/photo2.png" },
    ],
  }),
  component: Portfolio,
});

const NAV = [
  ["hero", "HUB"], ["about", "ABOUT"], ["timeline", "TIMELINE"], ["projects", "PROJECTS"],
  ["skills", "SKILLS"], ["services", "SERVICES"], ["philosophy", "PHILOSOPHY"],
  ["insights", "INSIGHTS"], ["stats", "STATS"], ["contact", "CONTACT"],
];

function Portfolio() {
  const whatsappMsg = encodeURIComponent("Hi Aditya Gite, I reviewed your 3D Portfolio and want to discuss a project...");
  const whatsappUrl = `https://wa.me/${PROFILE.whatsapp}?text=${whatsappMsg}`;

  return (
    <div className="relative min-h-screen bg-black text-[#E6FFFB] overflow-x-hidden">
      <MatrixRain />
      <div className="cyber-grid-bg fixed inset-0 z-0 opacity-40" />
      <TopNav />

      <main className="relative z-10">
        <Hero />
        <About />
        <Timeline />
        <Projects />
        <Skills />
        <Services />
        <Philosophy />
        <Insights />
        <Stats />
        <Contact whatsappUrl={whatsappUrl} />
      </main>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="pulse-ring fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#7CFFCB] px-5 py-3 text-sm font-bold text-black shadow-lg hover:scale-105 transition"
      >
        <span className="text-base">▷</span> WHATSAPP // LIVE
      </a>

      <footer className="relative z-10 border-t border-[#00F0FF]/20 px-6 py-8 text-center text-xs text-[#7CFFCB]/60">
        © {new Date().getFullYear()} ADITYA GITE // SYSTEM SECURE // BUILT WITH REACT · THREE.JS · SUPABASE
      </footer>
    </div>
  );
}

function TopNav() {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    NAV.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 border-b border-[#00F0FF]/20 bg-black/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <a href="#hero" className="neon-text font-bold tracking-widest text-xs sm:text-sm">
          ▣ ADITYA_GITE.SYS
        </a>
        <ul className="hidden md:flex gap-1 text-[10px] tracking-wider">
          {NAV.map(([id, label]) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`px-3 py-1 rounded transition ${active === id ? "neon-text bg-[#00F0FF]/10" : "text-[#7CFFCB]/70 hover:text-[#00F0FF]"}`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <span className="hidden sm:inline text-[10px] neon-mint flicker">● LIVE</span>
      </div>
    </nav>
  );
}

function SectionHeader({ tag, title }: { tag: string; title: string }) {
  return (
    <div className="mb-10">
      <div className="text-xs tracking-[0.3em] text-[#7CFFCB]/80">{tag}</div>
      <h2 className="mt-2 text-3xl md:text-5xl font-bold neon-text">
        <Scramble text={title} />
      </h2>
      <div className="mt-3 h-px w-32 bg-gradient-to-r from-[#00F0FF] to-transparent" />
    </div>
  );
}

function Section({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative px-6 py-24 md:py-32 scanlines ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

function Hero() {
  return (
    <Section id="hero" className="pt-32">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="text-xs tracking-[0.4em] text-[#7CFFCB]/80 mb-4">▣ CORE_INTERFACE // ONLINE</div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-[1.05] neon-text">
            <Scramble text="ADITYA GITE" />
            <br />
            <span className="neon-mint text-2xl sm:text-3xl md:text-4xl tracking-widest">// WEB ARCHITECT</span>
          </h1>
          <p className="mt-6 max-w-lg text-sm md:text-base text-[#B8FFF1]/80 leading-relaxed">
            Digital Architect & Creative Engineer. Building cinematic full-stack web systems,
            interactive 3D interfaces, and high-end video editing pipelines from Sinnar, Nashik.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-3 max-w-md">
            {[
              { l: "EXPERIENCE", v: PROFILE.experience },
              { l: "STACK", v: "FULL-STACK" },
              { l: "STATUS", v: "AVAILABLE" },
            ].map((s) => (
              <div key={s.l} className="neon-border rounded p-3 bg-black/50">
                <div className="text-[9px] tracking-widest text-[#7CFFCB]/70">{s.l}</div>
                <div className="text-xs sm:text-sm neon-text font-bold mt-1">{s.v}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="neon-border rounded px-5 py-3 text-sm font-bold neon-text hover:bg-[#00F0FF]/10">
              ▶ ENTER_MATRIX
            </a>
            <a href="#contact" className="rounded px-5 py-3 text-sm font-bold bg-[#7CFFCB] text-black hover:bg-[#00F0FF]">
              ◉ INITIATE_CONTACT
            </a>
          </div>
        </div>

        <div className="relative aspect-square w-full max-w-xl ml-auto">
          <div className="absolute inset-0 neon-border rounded-2xl overflow-hidden bg-black">
            <img
              src="/photo2.png"
              alt="Aditya Gite working on multi-monitor cyberpunk setup"
              width={1536}
              height={1024}
              className="h-full w-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
            <HoloOverlay />
          </div>
          <div className="absolute -inset-4 -z-10 cyber-grid-bg opacity-40 rounded-3xl" />
          <div className="absolute -bottom-6 -right-6 hidden md:block w-48 h-48 neon-border rounded-xl bg-black/70 backdrop-blur p-3 text-[10px] leading-tight">
            <div className="neon-text font-bold mb-1">▣ SYSTEM_LOG</div>
            <div className="opacity-80">[OK] React 19 mounted</div>
            <div className="opacity-80">[OK] Three.js scene loaded</div>
            <div className="opacity-80">[OK] Supabase fallback ready</div>
            <div className="neon-mint">[SECURE] Netlify deploy verified</div>
          </div>
        </div>
      </div>

      <div className="mt-20 h-[420px] md:h-[520px] neon-border rounded-2xl overflow-hidden bg-black">
        <Suspense fallback={<div className="h-full grid place-items-center neon-text text-sm">▣ INITIALIZING 3D CORE...</div>}>
          <ThreeScene />
        </Suspense>
      </div>
    </Section>
  );
}

function HoloOverlay() {
  const lines = [
    "ADITYA GITE // WEB ARCHITECT",
    "+91 9359507047",
    "agite416@gmail.com",
    "1 YEAR EXP // FULL-STACK",
    "STACK: REACT · NEXT · SUPABASE",
    "DEPLOY: NETLIFY // SECURE",
  ];
  return (
    <div className="absolute top-4 left-4 text-[10px] sm:text-xs neon-text font-mono space-y-1">
      {lines.map((l, i) => (
        <motion.div
          key={l}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15 }}
        >
          &gt; {l}
        </motion.div>
      ))}
    </div>
  );
}

function About() {
  return (
    <Section id="about">
      <SectionHeader tag="// 02 — IDENTITY DECRYPT" title="ABOUT_THE_ARCHITECT" />
      <div className="grid md:grid-cols-2 gap-10">
        <div className="neon-border rounded-xl p-6 bg-black/60">
          <p className="text-sm md:text-base leading-relaxed text-[#B8FFF1]/90">
            Born from the quiet streets of <span className="neon-mint">Sinnar, Nashik</span>, Aditya Gite
            is a developer who treats code like cinematography — every component framed, every transition
            scored. With <span className="neon-text">1 year</span> of focused, daily production work, he
            bridges intense backend logic with high-end creative design.
          </p>
          <p className="mt-4 text-sm md:text-base leading-relaxed text-[#B8FFF1]/80">
            His command center: a high-performance laptop, multiple monitors, the hum of caffeine, and a
            rendering queue that never sleeps. From Supabase schemas to Three.js shaders, every artifact
            ships production-ready.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            ["LOCATION", "Sinnar, Nashik, MH"],
            ["FOCUS", "Full-Stack + 3D"],
            ["WORKSTATION", "Laptop / Multi-Monitor"],
            ["PHILOSOPHY", "Ship · Iterate · Polish"],
          ].map(([k, v]) => (
            <div key={k} className="neon-border rounded p-4 bg-black/50">
              <div className="text-[10px] tracking-widest text-[#7CFFCB]/70">{k}</div>
              <div className="mt-2 neon-text text-sm font-bold">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Timeline() {
  return (
    <Section id="timeline">
      <SectionHeader tag="// 03 — DEPLOYMENT LOG" title="TECH_TIMELINE" />
      <div className="relative overflow-x-auto pb-4">
        <div className="flex gap-6 min-w-max">
          {EXPERIENCE.map((e, i) => (
            <motion.div
              key={e.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="neon-border rounded-lg p-5 w-72 bg-black/60 relative"
            >
              <div className="absolute -top-3 left-5 text-[10px] tracking-widest bg-black px-2 neon-mint">
                {e.year}
              </div>
              <h3 className="mt-2 neon-text font-bold text-base">{e.title}</h3>
              <p className="mt-2 text-xs text-[#B8FFF1]/80 leading-relaxed">{e.desc}</p>
              <div className="mt-3 text-[10px] text-[#7CFFCB]/60">[OK] commit_log/{i + 1}.sig</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Projects() {
  return (
    <Section id="projects">
      <SectionHeader tag="// 04 — MATRIX GRID" title="PROJECTS_VAULT" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {PROJECTS.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="group neon-border rounded-xl p-5 bg-black/60 relative overflow-hidden"
          >
            <div className="text-[10px] tracking-widest text-[#7CFFCB]/70">PROJECT_{String(i + 1).padStart(3, "0")}</div>
            <h3 className="mt-2 text-xl font-bold neon-text">{p.title}</h3>
            <p className="mt-3 text-xs text-[#B8FFF1]/80 leading-relaxed min-h-[60px]">{p.desc}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span key={s} className="text-[10px] px-2 py-0.5 border border-[#00F0FF]/40 rounded neon-mint">
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-5 flex gap-3 text-xs">
              <a href={p.link} className="neon-text hover:underline">▶ LIVE</a>
              <a href={p.github} className="text-[#7CFFCB]/80 hover:text-[#00F0FF]">◉ GITHUB</a>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills">
      <SectionHeader tag="// 05 — SKILL MATRIX" title="STACK_SURGE" />
      <div className="grid md:grid-cols-2 gap-5">
        {Object.entries(SKILLS).map(([cat, list]) => (
          <div key={cat} className="neon-border rounded-xl p-6 bg-black/60">
            <div className="text-[10px] tracking-widest text-[#7CFFCB]/70">▣ {cat.toUpperCase()}</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {list.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1.5 text-xs border border-[#00F0FF]/40 rounded neon-text bg-[#00F0FF]/5 hover:bg-[#00F0FF]/20 transition"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Services() {
  return (
    <Section id="services">
      <SectionHeader tag="// 06 — SERVICE MENU" title="OPERATIONS_AVAILABLE" />
      <div className="grid sm:grid-cols-2 gap-5">
        {SERVICES.map((s, i) => (
          <div key={s.title} className="neon-border rounded-xl p-6 bg-black/60">
            <div className="text-3xl neon-mint">0{i + 1}</div>
            <h3 className="mt-3 text-lg font-bold neon-text">{s.title}</h3>
            <p className="mt-2 text-sm text-[#B8FFF1]/80 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Philosophy() {
  return (
    <Section id="philosophy">
      <SectionHeader tag="// 07 — CORE PRINCIPLES" title="PHILOSOPHY.DOC" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {PRINCIPLES.map((p, i) => (
          <motion.div
            key={p}
            initial={{ rotateX: -20, opacity: 0 }}
            whileInView={{ rotateX: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="neon-border rounded-xl p-6 bg-black/60 text-center"
            style={{ perspective: 800 }}
          >
            <div className="text-4xl neon-text mb-3">"</div>
            <p className="text-sm font-bold neon-mint">{p}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Insights() {
  return (
    <Section id="insights">
      <SectionHeader tag="// 08 — KNOWLEDGE BASE" title="REPOSITORIES_&_INSIGHTS" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {INSIGHTS.map((b) => (
          <article key={b.title} className="neon-border rounded-xl p-5 bg-black/60">
            <div className="text-[10px] tracking-widest neon-mint">▣ {b.tag}</div>
            <h3 className="mt-2 text-lg font-bold neon-text">{b.title}</h3>
            <p className="mt-2 text-xs text-[#B8FFF1]/80 leading-relaxed">{b.desc}</p>
            <div className="mt-4 text-[10px] text-[#7CFFCB]/60 hover:text-[#00F0FF] cursor-pointer">▶ READ_LOG</div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Stats() {
  return (
    <Section id="stats">
      <SectionHeader tag="// 09 — LIVE METRICS" title="CORE_DEV_STATS" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {STATS.map((s) => (
          <div key={s.label} className="neon-border rounded-xl p-6 bg-black/60 text-center">
            <div className="text-3xl md:text-5xl font-extrabold neon-text">
              <Counter to={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-2 text-[10px] tracking-widest text-[#7CFFCB]/80">{s.label.toUpperCase()}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Contact({ whatsappUrl }: { whatsappUrl: string }) {
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    if (form.name.trim().length < 2) return setErr("Name too short.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setErr("Invalid email.");
    if (form.msg.trim().length < 10) return setErr("Message must be at least 10 chars.");
    if (form.msg.length > 1000) return setErr("Message too long.");
    const body = encodeURIComponent(`From: ${form.name} <${form.email}>\n\n${form.msg}`);
    window.location.href = `mailto:${PROFILE.email}?subject=Portfolio%20Contact&body=${body}`;
    setSent(true);
  };

  return (
    <Section id="contact">
      <SectionHeader tag="// 10 — TRANSMISSION" title="CONTACT_GATEWAY" />
      <div className="grid md:grid-cols-2 gap-8">
        <form onSubmit={submit} className="neon-border rounded-xl p-6 bg-black/60 space-y-4">
          <div>
            <label className="text-[10px] tracking-widest text-[#7CFFCB]/80">▣ HANDLE</label>
            <input
              value={form.name}
              maxLength={100}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1 w-full bg-black border border-[#00F0FF]/30 rounded px-3 py-2 text-sm neon-text focus:border-[#00F0FF] outline-none"
              placeholder="your_name"
            />
          </div>
          <div>
            <label className="text-[10px] tracking-widest text-[#7CFFCB]/80">▣ EMAIL_NODE</label>
            <input
              type="email"
              maxLength={255}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-1 w-full bg-black border border-[#00F0FF]/30 rounded px-3 py-2 text-sm neon-text focus:border-[#00F0FF] outline-none"
              placeholder="user@domain.net"
            />
          </div>
          <div>
            <label className="text-[10px] tracking-widest text-[#7CFFCB]/80">▣ PAYLOAD</label>
            <textarea
              rows={5}
              maxLength={1000}
              value={form.msg}
              onChange={(e) => setForm({ ...form, msg: e.target.value })}
              className="mt-1 w-full bg-black border border-[#00F0FF]/30 rounded px-3 py-2 text-sm neon-text focus:border-[#00F0FF] outline-none resize-none"
              placeholder="describe_your_project..."
            />
          </div>
          {err && <div className="text-xs text-red-400">▣ ERR // {err}</div>}
          {sent && <div className="text-xs neon-mint">▣ OK // transmission_dispatched</div>}
          <button type="submit" className="w-full rounded bg-[#00F0FF] text-black font-bold py-3 text-sm hover:bg-[#7CFFCB]">
            ▶ TRANSMIT_SECURE
          </button>
        </form>

        <div className="space-y-4">
          <div className="neon-border rounded-xl p-6 bg-black/60">
            <div className="text-[10px] tracking-widest text-[#7CFFCB]/80">▣ DIRECT_CHANNELS</div>
            <div className="mt-4 space-y-3 text-sm">
              <a href={`tel:${PROFILE.phone}`} className="block neon-text hover:underline">
                ☏ {PROFILE.phone}
              </a>
              <a href={`mailto:${PROFILE.email}`} className="block neon-text hover:underline">
                ✉ {PROFILE.email}
              </a>
              <div className="text-[#B8FFF1]/80">⌖ {PROFILE.location}</div>
            </div>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="block neon-border rounded-xl p-6 bg-[#7CFFCB]/10 hover:bg-[#7CFFCB]/20 transition"
          >
            <div className="text-[10px] tracking-widest neon-mint">▣ INSTANT_LINK</div>
            <div className="mt-2 text-xl font-bold neon-text">▷ OPEN WHATSAPP</div>
            <div className="mt-1 text-xs text-[#B8FFF1]/80">Pre-filled project intro → {PROFILE.phone}</div>
          </a>
        </div>
      </div>
    </Section>
  );
}
