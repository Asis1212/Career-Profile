import { SiteHeader } from "@/components/site-header";
import { chapters, path, profile, schools, skillGroups } from "@/lib/profile";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="wrap">
            <div className="hero-grid">
              <div>
                <p className="eyebrow">
                  <span className="pulse" aria-hidden="true" />
                  Full-stack and AI · Software developer at SAP
                </p>
                <h1 id="hero-title">
                  <span className="line">Elad</span>
                  <span className="line">Asis</span>
                </h1>
                <p className="headline">{profile.headline}</p>
                <p className="lede">{profile.lede}</p>
                <div className="actions">
                  <a className="btn btn-primary" href={`mailto:${profile.email}`}>
                    Email Elad
                  </a>
                  <a className="btn btn-ghost" href={profile.linkedin} target="_blank" rel="noreferrer">
                    View LinkedIn
                  </a>
                </div>
              </div>
              <aside className="dossier" aria-label="At a glance">
                <p className="dossier-label">At a glance</p>
                <div className="fact">
                  <span>Current role</span>
                  <strong>Software Developer, SAP</strong>
                  <em>Ra&apos;anana · since September 2024</em>
                </div>
                <div className="fact">
                  <span>Focus</span>
                  <strong>Full-stack and AI</strong>
                  <em>React, Node.js, Python, LangChain, RAG</em>
                </div>
                <div className="fact">
                  <span>Education</span>
                  <strong>B.Sc. Computer Science</strong>
                  <em>Holon Institute of Technology, 2023</em>
                </div>
                <div className="fact">
                  <span>Based in</span>
                  <strong>{profile.location}</strong>
                  <em>{profile.region}</em>
                </div>
              </aside>
            </div>
            <ol className="path" aria-label="Career in four beats">
              {path.map((step) => (
                <li key={step.year}>
                  <span className="year">{step.year}</span>
                  <span className="label">{step.label}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="band" id="about" aria-labelledby="about-title">
          <div className="wrap split">
            <div>
              <p className="section-kicker">About</p>
              <h2 id="about-title">A career built in layers.</h2>
            </div>
            <div className="story">
              <p>
                I am a software developer in Givat Shmuel. The work today is at{" "}
                <strong>SAP</strong> in Ra&apos;anana. Before that I spent two years as a
                full-stack developer at <strong>Singit</strong>, building an English-learning
                product that uses music.
              </p>
              <p>
                The earlier layers are the reason the later ones make sense. In the Israeli Air
                Force&apos;s <strong>Ofek 324</strong> unit I learned networks, Windows support,
                and how to keep a knowledge base useful for the people who actually need it. A
                season in IT at <strong>ActiveTrail</strong> and a return to Ofek as senior QA
                taught me to stay close to the failure, not only the feature.
              </p>
              <p>
                I studied computer science at the Holon Institute of Technology from 2020 to 2023
                and finished the degree while already shipping product. The work I want next
                holds both sides together: full-stack product engineering, and AI that can
                retrieve and answer from real sources.
              </p>
            </div>
          </div>
        </section>

        <section id="journey" aria-labelledby="journey-title">
          <div className="wrap">
            <p className="section-kicker">Journey</p>
            <h2 id="journey-title">Where I have worked.</h2>
            <p className="section-intro">
              From the service desk in 2017 to enterprise software today. Newest first.
            </p>
            <ol className="timeline">
              {chapters.map((chapter) => (
                <li key={`${chapter.org}-${chapter.when}`}>
                  <div className="when">
                    <time>{chapter.when}</time>
                    <span className="place">{chapter.place}</span>
                  </div>
                  <div className="what">
                    <h3 className="org">{chapter.org}</h3>
                    <p className="role">{chapter.role}</p>
                    <p>{chapter.summary}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="band" id="skills" aria-labelledby="skills-title">
          <div className="wrap">
            <p className="section-kicker">Skills</p>
            <h2 id="skills-title">Full-stack and AI, side by side.</h2>
            <p className="section-intro">
              These are one practice for me. I build the interface and the service, and I use
              Python, LangChain, and retrieval-augmented generation when the product needs to
              reason over real sources. The systems work underneath is how I got here.
            </p>
            <div className="skill-stack">
              {skillGroups.map((group) => (
                <article key={group.id} className={`panel ${group.tone}`}>
                  <div className="panel-head">
                    <div>
                      <p className="section-kicker">{group.kicker}</p>
                      <h3>{group.title}</h3>
                    </div>
                    <p>{group.intro}</p>
                  </div>
                  <div className="chips">
                    {group.items.map((item) => (
                      <div className="chip" key={item.name}>
                        <strong>{item.name}</strong>
                        <span>{item.detail}</span>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="education" aria-labelledby="education-title">
          <div className="wrap">
            <p className="section-kicker">Education</p>
            <h2 id="education-title">Computer science, twice over.</h2>
            <p className="section-intro">
              A bachelor&apos;s degree from HIT, and earlier computer science studies at ORT.
            </p>
            <div className="schools">
              {schools.map((school) => (
                <article className="school" key={school.school}>
                  <time>{school.when}</time>
                  <h3>{school.school}</h3>
                  <p className="credential">{school.credential}</p>
                  <p>{school.note}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <div className="wrap">
            <div className="contact-panel">
              <div>
                <p className="section-kicker">For hiring teams</p>
                <h2 id="contact-title">Tell me what you are building.</h2>
                <p className="contact-lead">
                  If you are considering me for a software role, write directly. I read every
                  note. I am based in Givat Shmuel and currently a software developer at SAP.
                </p>
              </div>
              <div className="contact-card">
                <a href={`mailto:${profile.email}`}>
                  <span className="label">Email</span>
                  <strong>{profile.email}</strong>
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  <span className="label">LinkedIn</span>
                  <strong>{profile.linkedinLabel}</strong>
                </a>
                <div>
                  <span className="label">Location</span>
                  <strong>{profile.location}</strong>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="wrap">
          <span>© {new Date().getFullYear()} Elad Asis</span>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </div>
      </footer>
    </>
  );
}
