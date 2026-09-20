import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight, BookOpen, CalendarDays, FileText, Headphones,
  Menu, Mic, Search, Tag, UserRound, Video, X
} from "lucide-react";
import "./styles.css";

const collections = [
  { title: "African Books", description: "Literature, research, academic works and more.", image: "/assets/books.jpg", icon: BookOpen, tone: "green" },
  { title: "History", description: "Ancient and modern history, struggles, leaders and movements.", image: "/assets/history.jpg", icon: FileText, tone: "gold" },
  { title: "Culture & Heritage", description: "Art, traditions, languages, festivals and way of life.", image: "/assets/culture.jpg", icon: Tag, tone: "dark" },
  { title: "Oral Histories", description: "Stories, interviews, memories and lived experiences.", image: "/assets/oral.jpg", icon: Headphones, tone: "green" },
  { title: "Audio & Video", description: "Documentaries, interviews, performances and recordings.", image: "/assets/audio.jpg", icon: Video, tone: "gold" }
];

const resources = [
  { title: "Things Fall Apart", author: "Chinua Achebe", year: "1958", format: "PDF", size: "2.4 MB", category: "African Books", icon: BookOpen, doc: "/assets/resources/things-fall-apart.pdf", cover: "/assets/resources/covers/things-fall-apart.svg" },
  { title: "Long Walk to Freedom", author: "Nelson Mandela", year: "1994", format: "EPUB", size: "3.2 MB", category: "History", icon: FileText, doc: "/assets/resources/long-walk-to-freedom.epub", cover: "/assets/resources/covers/long-walk-to-freedom.svg" },
  { title: "Zulu Beadwork: A Cultural Symbolism", author: "Zulu Heritage Centre", year: "2018", format: "Image (JPG)", size: "5.6 MB", category: "Culture & Heritage", icon: Tag, doc: "/assets/resources/zulu-beadwork.jpg", cover: "/assets/resources/covers/zulu-beadwork.svg" },
  { title: "The Story of the San People", author: "Kagiso Mofokeng", year: "2020", format: "Audio (MP3)", size: "45 MB", category: "Oral Histories", icon: Headphones, doc: "/assets/resources/the-story-of-the-san-people.mp3", cover: "/assets/resources/covers/san-people.svg" },
  { title: "African Wildlife & Conservation", author: "Wildlife Trust Africa", year: "2022", format: "Video (MP4)", size: "320 MB", category: "Audio & Video", icon: Video, doc: "/assets/resources/african-wildlife-conservation.mp4", cover: "/assets/resources/covers/wildlife-conservation.svg" },
  { title: "The Palm Wine Drinkard", author: "Amos Tutuola", year: "1952", format: "PDF", size: "1.8 MB", category: "African Books", icon: BookOpen, doc: "/assets/resources/the-palm-wine-drinkard.pdf", cover: "/assets/resources/covers/palm-wine-drinkard.svg" },
  { title: "The Story of South Africa", author: "A. C. Jordan", year: "1983", format: "EPUB", size: "2.9 MB", category: "History", icon: FileText, doc: "/assets/resources/the-story-of-south-africa.epub", cover: "/assets/resources/covers/south-africa-story.svg" },
  { title: "Kente Cloth and Identity", author: "Ghana Textile Council", year: "2019", format: "Image (JPG)", size: "4.3 MB", category: "Culture & Heritage", icon: Tag, doc: "/assets/resources/kente-cloth-and-identity.jpg", cover: "/assets/resources/covers/kente-cloth.svg" },
  { title: "Voices from the River", author: "Mariam Khamis", year: "2021", format: "Audio (MP3)", size: "38 MB", category: "Oral Histories", icon: Headphones, doc: "/assets/resources/voices-from-the-river.mp3", cover: "/assets/resources/covers/voices-from-the-river.svg" },
  { title: "Wild Coast Conservation", author: "Coastal Marine Trust", year: "2023", format: "Video (MP4)", size: "240 MB", category: "Audio & Video", icon: Video, doc: "/assets/resources/wild-coast-conservation.mp4", cover: "/assets/resources/covers/wild-coast.svg" }
];

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const resourceDetails = {
  "things-fall-apart": {
    description: "A classic African novel exploring community, tradition, identity and the effects of colonial change through the story of Okonkwo and his community.",
    language: "English",
    subject: "African literature; Igbo culture; colonialism",
    publisher: "Heinemann",
    rights: "Open access demonstration record",
    identifier: "AHDL-BOOK-001",
    contributor: "Chinua Achebe",
    source: "African literature archive",
    coverage: "Nigeria; postcolonial Africa; 1950s",
    keywords: "African fiction; Igbo culture; colonial transition",
    type: "Textual resource",
    access: "Public access"
  },
  "long-walk-to-freedom": {
    description: "An autobiographical record of Nelson Mandela's life, political journey and experiences during South Africa's struggle against apartheid.",
    language: "English",
    subject: "South African history; biography; apartheid",
    publisher: "Little, Brown and Company",
    rights: "Metadata demonstration record",
    identifier: "AHDL-HIST-002",
    contributor: "Nelson Mandela",
    source: "South African historical collections",
    coverage: "South Africa; 1918–1994",
    keywords: "Apartheid; political struggle; leadership",
    type: "Biography",
    access: "Public access"
  },
  "zulu-beadwork-a-cultural-symbolism": {
    description: "A visual cultural resource introducing the meanings, patterns and traditions associated with Zulu beadwork.",
    language: "English / isiZulu",
    subject: "Zulu culture; beadwork; visual heritage",
    publisher: "Zulu Heritage Centre",
    rights: "Open access demonstration record",
    identifier: "AHDL-CUL-003",
    contributor: "Zulu Heritage Centre",
    source: "Cultural heritage archive",
    coverage: "KwaZulu-Natal; southern Africa",
    keywords: "Beadwork; symbolism; identity",
    type: "Visual culture resource",
    access: "Public access"
  },
  "the-story-of-the-san-people": {
    description: "An oral-history resource presenting stories and lived experiences connected to San communities and heritage.",
    language: "English",
    subject: "San heritage; oral history; indigenous knowledge",
    publisher: "African Heritage Digital Library",
    rights: "Open access demonstration record",
    identifier: "AHDL-ORAL-004",
    contributor: "Kagiso Mofokeng",
    source: "Oral histories collection",
    coverage: "Southern Africa; indigenous communities",
    keywords: "San heritage; storytelling; indigenous history",
    type: "Audio recording",
    access: "Public access"
  },
  "african-wildlife-conservation": {
    description: "An educational video resource introducing African wildlife and the importance of conservation and environmental stewardship.",
    language: "English",
    subject: "African wildlife; conservation; environment",
    publisher: "Wildlife Trust Africa",
    rights: "Open access demonstration record",
    identifier: "AHDL-ENV-005",
    contributor: "Wildlife Trust Africa",
    source: "Environmental media archive",
    coverage: "Sub-Saharan Africa",
    keywords: "Wildlife; conservation; biodiversity",
    type: "Video resource",
    access: "Public access"
  }
};

function App() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [category, setCategory] = useState("All Collections");
  const [format, setFormat] = useState("All Formats");
  const [menuOpen, setMenuOpen] = useState(false);
  const [page, setPage] = useState("home");
  const [selected, setSelected] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return undefined;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join(" ")
        .trim();

      if (transcript) {
        setQuery(transcript);
        setSubmitted(transcript);
        setPage("collections");
        window.location.hash = "collections";
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, []);

  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice search is not supported in this browser.");
      return;
    }

    if (!recognitionRef.current) {
      alert("Voice search is not ready yet. Please try again.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    setIsListening(true);
    recognitionRef.current.start();
  };

  const allCategories = ["All Collections", ...collections.map(c => c.title)];

  const filtered = useMemo(() => {
    return resources.filter((item) => {
      const matchesQuery =
        !submitted ||
        `${item.title} ${item.author} ${item.category}`.toLowerCase().includes(submitted.toLowerCase());
      const matchesCategory =
        category === "All Collections" || item.category === category;
      const matchesFormat =
        format === "All Formats" || item.format.startsWith(format);
      return matchesQuery && matchesCategory && matchesFormat;
    });
  }, [submitted, category, format]);

  const openResource = (item) => {
    setSelected(item);
    setPage("resource");
    window.location.hash = `resource/${slugify(item.title)}`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openCollection = (name) => {
    setCategory(name);
    setSubmitted("");
    setQuery("");
    setPage("collections");
    window.location.hash = "collections";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goHome = () => {
    setPage("home");
    setSelected(null);
    window.location.hash = "home";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const search = (e) => {
    e.preventDefault();
    setSubmitted(query.trim());
    setPage("collections");
    window.location.hash = "collections";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentDetails = selected ? resourceDetails[slugify(selected.title)] : null;

  return (
    <div className="app">
      <header className="header">
        <button className="brand" onClick={goHome} aria-label="African Heritage Digital Library home">
          <img src="/assets/logo.jpg" alt="African Heritage Digital Library logo" />
        </button>

        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={menuOpen ? "nav open" : "nav"}>
          <button className={page === "home" ? "active" : ""} onClick={() => { goHome(); setMenuOpen(false); }}>Home</button>
          <button className={page === "collections" ? "active" : ""} onClick={() => { openCollection("All Collections"); setMenuOpen(false); }}>Collections</button>
          <button onClick={() => { setPage("about"); window.location.hash = "about"; setMenuOpen(false); window.scrollTo({top:0,behavior:"smooth"}); }}>About</button>
          <button onClick={() => { setPage("help"); window.location.hash = "help"; setMenuOpen(false); window.scrollTo({top:0,behavior:"smooth"}); }}>Help</button>
        </nav>

        <button className="access-btn" onClick={() => openCollection("All Collections")}>
          <BookOpen size={21} /> Public Access
        </button>
      </header>

      <main>
        {page === "home" && (
          <>
            <section className="hero" id="home">
              <div className="hero-copy">
                <h1>Preserving Africa’s Knowledge for a Brighter Tomorrow</h1>
                <p className="hero-text">
                  Discover African books, history, culture, oral traditions,
                  audio and visual materials from across the continent.
                </p>
                <form className="search" onSubmit={search}>
                  <Search size={22} />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search books, authors, topics..."
                    aria-label="Search library"
                  />
                  <button type="button" className={isListening ? "voice-btn listening" : "voice-btn"} onClick={handleVoiceSearch} aria-label={isListening ? "Stop voice search" : "Search by voice"}>
                    <Mic size={18} />
                    {isListening && <span className="voice-status">Listening...</span>}
                  </button>
                  <button type="submit">Search</button>
                </form>
              </div>
              <div className="hero-image" aria-label="African heritage landscape"></div>
            </section>

            <section className="section" id="collections">
              <div className="section-heading">
                <div>
                  <h2>Browse Collections</h2>
                  <span className="gold-line"></span>
                </div>
                <button className="text-link" onClick={() => openCollection("All Collections")}>View all collections <ArrowRight size={17} /></button>
              </div>

              <div className="collection-grid">
                {collections.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button className={`collection-card ${item.tone}`} key={item.title} onClick={() => openCollection(item.title)}>
                      <img src={item.image} alt="" />
                      <div className="collection-content">
                        <span className="round-icon"><Icon size={22} /></span>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <ArrowRight className="card-arrow" size={20} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="section resources">
              <div className="section-heading">
                <div>
                  <h2>Featured Resources</h2>
                  <span className="gold-line"></span>
                </div>
                <button className="text-link" onClick={() => openCollection("All Collections")}>Browse all <ArrowRight size={17} /></button>
              </div>

              <div className="resource-grid">
                {resources.map((item, index) => <ResourceCard key={item.title} item={item} index={index} onOpen={openResource} />)}
              </div>
            </section>
          </>
        )}

        {page === "collections" && (
          <section className="section collection-page">
            <div className="breadcrumb">
              <button onClick={goHome}>Home</button><span>/</span><strong>Collections</strong>
            </div>
            <div className="page-title">
              <div>
                <p className="eyebrow">DIGITAL COLLECTIONS</p>
                <h2>Explore African Heritage</h2>
                <span className="gold-line"></span>
              </div>
              <p></p>
            </div>

            <form className="search collection-search" onSubmit={search}>
              <Search size={22} />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by title, author or topic..." />
              <button type="button" className={isListening ? "voice-btn listening" : "voice-btn"} onClick={handleVoiceSearch} aria-label={isListening ? "Stop voice search" : "Search by voice"}>
                <Mic size={18} />
                {isListening && <span className="voice-status">Listening...</span>}
              </button>
              <button type="submit">Search</button>
            </form>

            <div className="collection-page-layout">
              <aside className="filter-panel">
                <h3>Collections</h3>
                {allCategories.map((name) => (
                  <button key={name} className={category === name ? "selected" : ""} onClick={() => setCategory(name)}>
                    {name}<span>{name === "All Collections" ? resources.length : resources.filter(r => r.category === name).length}</span>
                  </button>
                ))}
                <h3 className="filter-heading">Format</h3>
                {["All Formats", "PDF", "EPUB", "Image", "Audio", "Video"].map((name) => (
                  <button key={name} className={format === name ? "selected" : ""} onClick={() => setFormat(name)}>
                    {name}
                  </button>
                ))}
              </aside>

              <div className="collection-results">
                <div className="result-row">
                  <span><Search size={17} /> {filtered.length} resources found</span>
                  {(submitted || category !== "All Collections" || format !== "All Formats") && (
                    <button className="clear" onClick={() => { setQuery(""); setSubmitted(""); setCategory("All Collections"); setFormat("All Formats"); }}>Clear filters</button>
                  )}
                </div>
                <div className="resource-grid">
                  {filtered.map((item, index) => <ResourceCard key={item.title} item={item} index={index} onOpen={openResource} />)}
                </div>
                {filtered.length === 0 && <div className="empty"><Search size={34}/><h3>No resources found</h3><p>Try another search term or change the filters.</p></div>}
              </div>
            </div>
          </section>
        )}

        {page === "resource" && selected && (
          <section className="section resource-page">
            <div className="breadcrumb">
              <button onClick={goHome}>Home</button><span>/</span>
              <button onClick={() => openCollection(selected.category)}>Collections</button><span>/</span>
              <strong>{selected.title}</strong>
            </div>

            <button className="back-btn" onClick={() => openCollection(selected.category)}>← Back to {selected.category}</button>

            <div className="resource-detail">
              <div className={`detail-cover cover-${resources.findIndex(r => r.title === selected.title) + 1}`}>
                {selected.cover ? <img src={selected.cover} alt={selected.title} className="resource-cover-image" /> : <selected.icon size={72} />}
                <span>{selected.format}</span>
              </div>

              <div className="detail-main">
                <p className="eyebrow">{selected.category.toUpperCase()}</p>
                <h2>{selected.title}</h2>
                <p className="lead">{currentDetails?.description}</p>
                <div className="detail-actions">
                  <button className="primary-btn" onClick={() => alert(`Open access: ${selected.title}`)}>
                    <BookOpen size={18}/> Open Resource
                  </button>
                  <button className="secondary-btn" onClick={() => navigator.clipboard?.writeText(window.location.href)}>
                    Copy Link
                  </button>
                </div>
              </div>
            </div>

            <div className="metadata-section">
              <div>
                <p className="eyebrow">METADATA RECORD</p>
                <h2>Resource Information</h2>
                <span className="gold-line"></span>
              </div>
              <div className="metadata-grid">
                <Meta label="Title" value={selected.title} />
                <Meta label="Creator / Author" value={selected.author} />
                <Meta label="Date" value={selected.year} />
                <Meta label="Format" value={selected.format} />
                <Meta label="File Size" value={selected.size} />
                <Meta label="Collection" value={selected.category} />
                <Meta label="Language" value={currentDetails?.language} />
                <Meta label="Subject" value={currentDetails?.subject} />
                <Meta label="Contributor" value={currentDetails?.contributor} />
                <Meta label="Coverage" value={currentDetails?.coverage} />
                <Meta label="Source" value={currentDetails?.source} />
                <Meta label="Keywords" value={currentDetails?.keywords} />
                <Meta label="Resource Type" value={currentDetails?.type} />
                <Meta label="Publisher" value={currentDetails?.publisher} />
                <Meta label="Rights" value={currentDetails?.rights} />
                <Meta label="Access" value={currentDetails?.access} />
                <Meta label="Identifier" value={currentDetails?.identifier} />
              </div>
            </div>

          </section>
        )}

        {page === "about" && (
          <section className="section info-page">
            <div className="breadcrumb"><button onClick={goHome}>Home</button><span>/</span><strong>About</strong></div>
            <p className="eyebrow">ABOUT THE LIBRARY</p>
            <h2>A digital home for African knowledge.</h2>
            <span className="gold-line"></span>
            <p className="info-copy">African Heritage Digital Library is a demonstration digital library created to preserve, organise and make African books, history, culture, oral traditions and multimedia resources easier to discover.</p>
          </section>
        )}

        {page === "help" && (
          <section className="section info-page">
            <div className="breadcrumb"><button onClick={goHome}>Home</button><span>/</span><strong>Help</strong></div>
            <p className="eyebrow">HELP & SEARCH</p>
            <h2>How to find a resource</h2>
            <span className="gold-line"></span>
            <div className="help-steps">
              <div><b>1</b><span>Use the search bar to enter a title, author or topic.</span></div>
              <div><b>2</b><span>Use Collections and Format filters to narrow your results.</span></div>
              <div><b>3</b><span>Select <strong>View Details</strong> on a resource to see its metadata.</span></div>
              <div><b>4</b><span>Explore each result to view full resource information and access details.</span></div>
            </div>
          </section>
        )}
      </main>

      <footer>
        <div className="footer-brand">
          <img src="/assets/logo.jpg" alt="" />
          <div><strong>AFRICAN HERITAGE</strong><span>DIGITAL LIBRARY</span><small>Preserving Africa’s Knowledge for a Brighter Tomorrow</small></div>
        </div>
        <div className="footer-links">
          <button onClick={goHome}>Home</button>
          <button onClick={() => openCollection("All Collections")}>Collections</button>
          <button onClick={() => { setPage("about"); window.scrollTo({top:0,behavior:"smooth"}); }}>About</button>
          <button onClick={() => { setPage("help"); window.scrollTo({top:0,behavior:"smooth"}); }}>Help</button>
        </div>
        <div className="footer-bottom">© 2026 African Heritage Digital Library. Open Access Knowledge for All.</div>
      </footer>
    </div>
  );
}

function ResourceCard({ item, index, onOpen }) {
  const Icon = item.icon;
  return (
    <article className="resource-card" onClick={() => onOpen(item)} tabIndex="0" onKeyDown={(e) => e.key === "Enter" && onOpen(item)}>
      <div className={`resource-cover cover-${index + 1}`}>
        {item.cover ? <img src={item.cover} alt={item.title} className="resource-cover-image" /> : <Icon size={44} />}
        <span>{item.format}</span>
      </div>
      <div className="resource-body">
        <h3>{item.title}</h3>
        <p><UserRound size={15} /> {item.author}</p>
        <p><CalendarDays size={15} /> {item.year}</p>
        <p><FileText size={15} /> {item.format} ({item.size})</p>
        <p><Tag size={15} /> {item.category}</p>
        <button className="details" onClick={(e) => { e.stopPropagation(); onOpen(item); }}>View Details <ArrowRight size={16} /></button>
      </div>
    </article>
  );
}

function Meta({ label, value }) {
  return <div className="meta-item"><span>{label}</span><strong>{value || "—"}</strong></div>;
}

createRoot(document.getElementById("root")).render(<App />);
