import { useState, useEffect } from "react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";

// ── Design tokens (aligned with public site) ──────────────
const C = {
  terracotta: "#A0522D",
  terracottaLight: "#c4693a",
  oceanBlue: "#0A4C7E",
  tropicalGreen: "#2D8659",
  sand: "#D4C4A8",
  sandLight: "#f5f0e8",
  sandBorder: "#e0d4bc",
  text: "#2d2416",
  muted: "#7a6e61",
  white: "#ffffff",
  error: "#c0392b",
  errorBg: "#fff5f3",
};

function App() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [intro, setIntro] = useState("");
  const [history, setHistory] = useState("");
  const [partner, setPartner] = useState(false);
  const [partnerName, setPartnerName] = useState("");
  const [isCurrentEvent, setIsCurrentEvent] = useState(false);
  const [activityType, setActivityType] = useState("cultural");
  const [learnMore1, setLearnMore1] = useState("");
  const [learnMore2, setLearnMore2] = useState("");
  const [learnMore3, setLearnMore3] = useState("");
  const [learnMore4, setLearnMore4] = useState("");
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  const fetchActivities = () => {
    fetch(`${BACKEND_URL}/api/activities`)
      .then((res) => {
        if (!res.ok) throw new Error("Impossible de charger les activités");
        return res.json();
      })
      .then((data) => {
        setActivities(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(null);

    if (!title.trim()) { setFormError("Le titre est obligatoire."); return; }
    if (!link.trim()) { setFormError("Le lien est obligatoire (utilisé pour le QR code)."); return; }
    if (!image) { setFormError("L'image de couverture est obligatoire."); return; }
    if (!learnMore1.trim() && !learnMore2.trim() && !learnMore3.trim() && !learnMore4.trim()) {
      setFormError("Au moins un champ 'En savoir plus' doit être rempli.");
      return;
    }

    setSubmitting(true);
    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("slug", slug.trim());
    formData.append("subtitle", subtitle.trim());
    formData.append("category", category.trim());
    formData.append("description", description.trim());
    formData.append("link", link.trim());
    formData.append("intro", intro.trim());
    formData.append("history", history.trim());
    formData.append("partner", String(partner));
    formData.append("partner_name", partnerName.trim());
    formData.append("is_current_event", String(isCurrentEvent));
    formData.append("type", activityType);
    formData.append("learn_more_1", learnMore1.trim());
    formData.append("learn_more_2", learnMore2.trim());
    formData.append("learn_more_3", learnMore3.trim());
    formData.append("learn_more_4", learnMore4.trim());
    formData.append("image", image);

    fetch(`${BACKEND_URL}/api/activities`, { method: "POST", body: formData })
      .then((res) => {
        if (!res.ok) return res.json().then((d) => { throw new Error(d.error || "Impossible de créer l'activité"); });
        return res.json();
      })
      .then(() => {
        setTitle(""); setDescription(""); setLink(""); setIntro(""); setHistory("");
        setPartner(false); setActivityType("cultural");
        setLearnMore1(""); setLearnMore2(""); setLearnMore3(""); setLearnMore4("");
        setImage(null); setFormError(null); setShowModal(false);
        fetchActivities();
      })
      .catch((err) => setFormError(err.message))
      .finally(() => setSubmitting(false));
  };

  const closeModal = () => { setShowModal(false); setFormError(null); };

  const filtered = activities.filter((a) => {
    const q = search.toLowerCase();
    return a.title.toLowerCase().includes(q) || (a.description && a.description.toLowerCase().includes(q));
  });

  const learnMoreEmpty = !learnMore1.trim() && !learnMore2.trim() && !learnMore3.trim() && !learnMore4.trim();

  return (
    <div style={{ minHeight: "100vh", background: C.sandLight, fontFamily: "'Georgia', 'Garamond', serif" }}>

      {/* ── Header ── */}
      <header style={headerStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <img src="/logo2.png" alt="Zistoir" style={{ height: 56, mixBlendMode: "multiply" }}
            onError={(e) => { e.target.style.display = "none"; }} />
          <div style={{ width: 1, height: 36, background: C.sandBorder }} />
          <span style={{ fontSize: 13, color: C.muted, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "sans-serif" }}>
            Administration
          </span>
        </div>
      </header>

      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "40px 24px" }}>

        {/* ── Page title + toolbar ── */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: C.text, margin: "0 0 4px" }}>
            Activités & Histoires
          </h1>
          <p style={{ fontSize: 14, color: C.muted, margin: "0 0 24px", fontFamily: "sans-serif" }}>
            {activities.length} activité{activities.length !== 1 ? "s" : ""} enregistrée{activities.length !== 1 ? "s" : ""}
          </p>
          <div style={toolbarStyle}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher une activité…"
              style={searchInputStyle}
            />
            <button onClick={() => setShowModal(true)} style={createButtonStyle}
              onMouseEnter={(e) => e.target.style.background = C.terracottaLight}
              onMouseLeave={(e) => e.target.style.background = C.terracotta}>
              + Nouvelle activité
            </button>
          </div>
        </div>

        {/* ── Modale de création ── */}
        {showModal && (
          <div style={overlayStyle} onClick={closeModal}>
            <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
              <div style={modalHeaderStyle}>
                <div>
                  <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: C.white }}>Nouvelle activité</h2>
                  <p style={{ margin: "3px 0 0", fontSize: 12, color: "rgba(255,255,255,0.65)", fontFamily: "sans-serif" }}>
                    Les champs marqués <span style={{ color: "#fca5a5" }}>*</span> sont obligatoires
                  </p>
                </div>
                <button onClick={closeModal} style={closeButtonStyle}>&times;</button>
              </div>

              <div style={{ padding: "6px 24px 24px" }}>
                {formError && (
                  <div style={errorBannerStyle}>
                    <span style={{ marginRight: 8, fontSize: 16 }}>⚠</span>{formError}
                  </div>
                )}

                <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
                  <div style={sectionTitleStyle}>Informations générales</div>

                  <label style={labelStyle}>
                    Titre <span style={requiredMarkStyle}>*</span>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                      placeholder="Nom de l'activité"
                      style={{ ...inputStyle, ...(formError && !title.trim() ? errorInputStyle : {}) }} />
                  </label>

                  <label style={labelStyle}>
                    Slug <span style={requiredMarkStyle}>*</span>
                    <span style={{ fontWeight: 400, fontSize: 11, color: "#9ca3af", marginLeft: 4 }}>(identifiant URL, auto-généré)</span>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="mon-activite"
                      style={inputStyle}
                    />
                  </label>

                  <label style={labelStyle}>
                    Sous-titre
                    <input
                      type="text"
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      placeholder="Court sous-titre affiché sur la carte..."
                      style={inputStyle}
                    />
                  </label>

                  <label style={labelStyle}>
                    Lien <span style={requiredMarkStyle}>*</span>
                    <span style={{ fontWeight: 400, fontSize: 11, color: C.muted, marginLeft: 4, fontFamily: "sans-serif" }}>(utilisé pour le QR code)</span>
                    <input type="url" value={link} onChange={(e) => setLink(e.target.value)}
                      placeholder="https://…"
                      style={{ ...inputStyle, ...(formError && !link.trim() ? errorInputStyle : {}) }} />
                  </label>

                  <div style={{ display: "flex", gap: 12 }}>
                    <label style={{ ...labelStyle, flex: 1 }}>
                      Type <span style={requiredMarkStyle}>*</span>
                      <select value={activityType} onChange={(e) => setActivityType(e.target.value)}
                        style={{ ...inputStyle, cursor: "pointer" }}>
                        <option value="cultural">Culturel</option>
                        <option value="favorite">Favori</option>
                      </select>
                    </label>
                    <label style={{ ...labelStyle, flex: 1 }}>
                      Catégorie
                      <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Personnalités, Nature..."
                        style={inputStyle}
                      />
                    </label>
                  </div>

                  <div style={{ display: "flex", gap: 24, marginBottom: 14 }}>
                    <label style={{ ...labelStyle, marginBottom: 0, flex: 1 }}>
                      Partenaire
                      <div style={toggleRowStyle}>
                        <span style={{ color: partner ? C.text : C.muted, fontSize: 13, fontFamily: "sans-serif" }}>
                          {partner ? "Oui" : "Non"}
                        </span>
                        <button type="button" onClick={() => setPartner((p) => !p)}
                          style={{ ...toggleStyle, background: partner ? C.terracotta : "#d1d5db" }}
                          aria-label="Toggle partenaire">
                          <span style={{ ...toggleThumbStyle, transform: partner ? "translateX(18px)" : "translateX(2px)" }} />
                        </button>
                      </div>
                    </label>

                    <label style={{ ...labelStyle, marginBottom: 0, flex: 1 }}>
                      Actualité récente
                      <div style={toggleRowStyle}>
                        <span style={{ color: isCurrentEvent ? "#374151" : "#9ca3af", fontSize: 13 }}>
                          {isCurrentEvent ? "Oui" : "Non"}
                        </span>
                        <button
                          type="button"
                          onClick={() => setIsCurrentEvent((v) => !v)}
                          style={{ ...toggleStyle, background: isCurrentEvent ? "#0070f3" : "#d1d5db" }}
                          aria-label="Toggle actualité"
                        >
                          <span style={{ ...toggleThumbStyle, transform: isCurrentEvent ? "translateX(18px)" : "translateX(2px)" }} />
                        </button>
                      </div>
                    </label>
                  </div>

                  {partner && (
                    <label style={labelStyle}>
                      Nom du partenaire
                      <input
                        type="text"
                        value={partnerName}
                        onChange={(e) => setPartnerName(e.target.value)}
                        placeholder="Ex : Cité du Volcan"
                        style={inputStyle}
                      />
                    </label>
                  )}

                  <label style={labelStyle}>
                    Description
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                      rows={3} style={inputStyle} placeholder="Courte description de l'activité…" />
                  </label>

                  <div style={sectionTitleStyle}>Contenu</div>

                  <label style={labelStyle}>
                    Intro
                    <textarea value={intro} onChange={(e) => setIntro(e.target.value)}
                      rows={3} style={inputStyle} placeholder="Texte d'introduction…" />
                  </label>

                  <label style={labelStyle}>
                    Histoire
                    <textarea value={history} onChange={(e) => setHistory(e.target.value)}
                      rows={4} style={inputStyle} placeholder="Histoire complète de l'activité…" />
                  </label>

                  <div style={sectionTitleStyle}>
                    En savoir plus <span style={requiredMarkStyle}>*</span>
                    <span style={{ fontWeight: 400, fontSize: 11, color: C.muted, marginLeft: 4, fontFamily: "sans-serif" }}>(au moins 1 requis)</span>
                  </div>
                  <div style={learnMoreGridStyle}>
                    {[learnMore1, learnMore2, learnMore3, learnMore4].map((val, i) => {
                      const setters = [setLearnMore1, setLearnMore2, setLearnMore3, setLearnMore4];
                      return (
                        <label key={i} style={{ ...labelStyle, marginBottom: 8 }}>
                          Texte {i + 1}{i === 0 && <span style={requiredMarkStyle}> *</span>}
                          <textarea value={val} onChange={(e) => setters[i](e.target.value)} rows={2}
                            style={{ ...inputStyle, ...(formError && learnMoreEmpty ? errorInputStyle : {}) }}
                            placeholder={i === 0 ? "Requis si les autres sont vides" : `Texte ${i + 1}…`} />
                        </label>
                      );
                    })}
                  </div>

                  <div style={sectionTitleStyle}>Médias</div>

                  <label style={labelStyle}>
                    Image de couverture <span style={requiredMarkStyle}>*</span>
                    <div style={{ ...fileInputWrapperStyle, ...(formError && !image ? errorInputStyle : {}) }}>
                      <span style={{ color: image ? C.text : C.muted, fontSize: 13, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontFamily: "sans-serif" }}>
                        {image ? image.name : "Aucun fichier sélectionné (PNG uniquement)"}
                      </span>
                      <label style={fileButtonStyle}>
                        Parcourir
                        <input type="file" accept="image/png"
                          onChange={(e) => setImage(e.target.files[0] || null)}
                          style={{ display: "none" }} />
                      </label>
                    </div>
                  </label>

                  <div style={formActionsStyle}>
                    <button type="button" onClick={closeModal} style={cancelButtonStyle}>Annuler</button>
                    <button type="submit" disabled={submitting}
                      style={{ ...submitButtonStyle, ...(submitting ? { opacity: 0.65, cursor: "not-allowed" } : {}) }}>
                      {submitting ? "Création en cours…" : "✓ Créer l'activité"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ── États ── */}
        {loading && (
          <p style={{ color: C.muted, fontFamily: "sans-serif", textAlign: "center", padding: 48 }}>
            Chargement des activités…
          </p>
        )}
        {error && (
          <div style={{ ...errorBannerStyle, marginBottom: 24 }}>⚠ {error}</div>
        )}
        {!loading && filtered.length === 0 && (
          <p style={{ color: C.muted, fontFamily: "sans-serif", textAlign: "center", padding: 48 }}>
            Aucune activité trouvée.
          </p>
        )}

        {/* ── Grille des activités ── */}
        <div style={gridStyle}>
          {filtered.map((activity) => (
            <div key={activity.id} style={cardStyle}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 8px 32px rgba(160,82,45,0.15)"}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)"}>
              <div style={{ position: "relative" }}>
                <img
                  src={activity.image_path}
                  alt={activity.title}
                  style={imgStyle}
                  onError={(e) => { e.target.style.opacity = "0.3"; }}
                />
                {activity.partner && (
                  <span style={badgeStyle}>Partenaire</span>
                )}
                <span style={{ ...typeBadgeStyle, background: activity.type === "favorite" ? C.tropicalGreen : C.oceanBlue }}>
                  {activity.type === "favorite" ? "Favori" : "Culturel"}
                </span>
              </div>
              <div style={{ padding: "16px 18px 18px" }}>
                <h2 style={{ margin: "0 0 6px", fontSize: 17, fontWeight: 700, color: C.text }}>{activity.title}</h2>
                {activity.description && (
                  <p style={{ margin: "0 0 12px", color: C.muted, fontSize: 13, lineHeight: 1.5, fontFamily: "sans-serif" }}>
                    {activity.description}
                  </p>
                )}
                {activity.link && (
                  <a href={activity.link} target="_blank" rel="noreferrer"
                    style={{ color: C.terracotta, fontSize: 13, fontFamily: "sans-serif", fontWeight: 600, textDecoration: "none" }}>
                    Voir le lien →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────

const headerStyle = {
  background: C.white,
  borderBottom: `1px solid ${C.sandBorder}`,
  padding: "12px 32px",
  display: "flex",
  alignItems: "center",
  position: "sticky",
  top: 0,
  zIndex: 100,
  boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
};

const toolbarStyle = {
  display: "flex",
  gap: 12,
};

const searchInputStyle = {
  flex: 1,
  padding: "10px 16px",
  border: `1.5px solid ${C.sandBorder}`,
  borderRadius: 8,
  fontSize: 14,
  boxSizing: "border-box",
  background: C.white,
  fontFamily: "sans-serif",
  color: C.text,
  outline: "none",
};

const createButtonStyle = {
  padding: "10px 22px",
  background: C.terracotta,
  color: C.white,
  border: "none",
  borderRadius: 8,
  fontSize: 14,
  cursor: "pointer",
  whiteSpace: "nowrap",
  fontFamily: "sans-serif",
  fontWeight: 600,
  transition: "background 0.2s",
};

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(45,36,22,0.5)",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalStyle = {
  background: C.white,
  borderRadius: 14,
  width: "90%",
  maxWidth: 560,
  maxHeight: "92vh",
  overflowY: "auto",
  boxShadow: "0 24px 64px rgba(45,36,22,0.3)",
};

const modalHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: C.terracotta,
  borderRadius: "14px 14px 0 0",
  padding: "20px 24px",
};

const closeButtonStyle = {
  background: "rgba(255,255,255,0.2)",
  border: "none",
  fontSize: 18,
  cursor: "pointer",
  color: C.white,
  lineHeight: 1,
  width: 32,
  height: 32,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

const labelStyle = {
  display: "block",
  marginBottom: 14,
  fontWeight: 700,
  fontSize: 13,
  color: C.text,
  fontFamily: "sans-serif",
};

const inputStyle = {
  display: "block",
  width: "100%",
  marginTop: 5,
  padding: "9px 12px",
  border: `1.5px solid ${C.sandBorder}`,
  borderRadius: 7,
  fontSize: 14,
  boxSizing: "border-box",
  fontFamily: "sans-serif",
  resize: "vertical",
  outline: "none",
  background: C.sandLight,
  color: C.text,
  transition: "border-color 0.15s",
};

const cancelButtonStyle = {
  padding: "10px 20px",
  background: "transparent",
  color: C.muted,
  border: `1.5px solid ${C.sandBorder}`,
  borderRadius: 7,
  fontSize: 14,
  cursor: "pointer",
  fontWeight: 500,
  fontFamily: "sans-serif",
};

const submitButtonStyle = {
  padding: "10px 24px",
  background: C.terracotta,
  color: C.white,
  border: "none",
  borderRadius: 7,
  fontSize: 14,
  cursor: "pointer",
  fontWeight: 700,
  fontFamily: "sans-serif",
  boxShadow: "0 2px 8px rgba(160,82,45,0.35)",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: 24,
};

const cardStyle = {
  border: `1px solid ${C.sandBorder}`,
  borderRadius: 12,
  overflow: "hidden",
  background: C.white,
  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
  transition: "box-shadow 0.25s ease",
};

const imgStyle = {
  width: "100%",
  height: 190,
  objectFit: "cover",
  display: "block",
};

const badgeStyle = {
  position: "absolute",
  top: 10,
  right: 10,
  background: C.terracotta,
  color: C.white,
  fontSize: 11,
  fontWeight: 700,
  padding: "3px 10px",
  borderRadius: 20,
  fontFamily: "sans-serif",
  letterSpacing: "0.06em",
};

const typeBadgeStyle = {
  position: "absolute",
  top: 10,
  left: 10,
  color: C.white,
  fontSize: 11,
  fontWeight: 600,
  padding: "3px 10px",
  borderRadius: 20,
  fontFamily: "sans-serif",
  letterSpacing: "0.05em",
};

const sectionTitleStyle = {
  fontSize: 11,
  fontWeight: 700,
  color: C.muted,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  marginBottom: 12,
  marginTop: 20,
  paddingBottom: 6,
  borderBottom: `1px solid ${C.sandBorder}`,
  fontFamily: "sans-serif",
};

const requiredMarkStyle = { color: C.error, fontWeight: 700 };

const errorInputStyle = { borderColor: C.error, background: C.errorBg };

const errorBannerStyle = {
  display: "flex",
  alignItems: "center",
  background: C.errorBg,
  color: C.error,
  border: `1px solid #f5c6c1`,
  borderRadius: 7,
  padding: "10px 14px",
  marginTop: 12,
  fontSize: 14,
  fontFamily: "sans-serif",
};

const learnMoreGridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "0 12px",
};

const fileInputWrapperStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 10,
  marginTop: 5,
  padding: "8px 12px",
  border: `1.5px solid ${C.sandBorder}`,
  borderRadius: 7,
  background: C.sandLight,
};

const fileButtonStyle = {
  padding: "5px 14px",
  background: C.sand,
  color: C.text,
  border: `1px solid ${C.sandBorder}`,
  borderRadius: 5,
  fontSize: 13,
  cursor: "pointer",
  flexShrink: 0,
  fontWeight: 600,
  fontFamily: "sans-serif",
};

const formActionsStyle = {
  display: "flex",
  justifyContent: "flex-end",
  gap: 12,
  marginTop: 24,
  paddingTop: 16,
  borderTop: `1px solid ${C.sandBorder}`,
};

const toggleRowStyle = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  marginTop: 5,
  height: 38,
};

const toggleStyle = {
  position: "relative",
  width: 40,
  height: 22,
  border: "none",
  borderRadius: 11,
  cursor: "pointer",
  padding: 0,
  transition: "background 0.2s",
  flexShrink: 0,
};

const toggleThumbStyle = {
  position: "absolute",
  top: 2,
  width: 18,
  height: 18,
  background: C.white,
  borderRadius: "50%",
  boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
  transition: "transform 0.2s",
  display: "block",
};

export default App;
