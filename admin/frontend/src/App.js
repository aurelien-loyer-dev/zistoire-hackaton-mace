import { useState, useEffect } from "react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";

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

    if (!title.trim()) {
      setFormError("Le titre est obligatoire.");
      return;
    }
    if (!link.trim()) {
      setFormError("Le lien est obligatoire (utilisé pour le QR code).");
      return;
    }
    if (!image) {
      setFormError("L'image de couverture est obligatoire.");
      return;
    }
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

    fetch(`${BACKEND_URL}/api/activities`, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) return res.json().then((d) => { throw new Error(d.error || "Impossible de créer l'activité"); });
        return res.json();
      })
      .then(() => {
        setTitle("");
        setSlug("");
        setSubtitle("");
        setCategory("");
        setDescription("");
        setLink("");
        setIntro("");
        setHistory("");
        setPartner(false);
        setPartnerName("");
        setIsCurrentEvent(false);
        setActivityType("cultural");
        setLearnMore1("");
        setLearnMore2("");
        setLearnMore3("");
        setLearnMore4("");
        setImage(null);
        setFormError(null);
        setShowModal(false);
        fetchActivities();
      })
      .catch((err) => setFormError(err.message))
      .finally(() => setSubmitting(false));
  };

  const closeModal = () => {
    setShowModal(false);
    setFormError(null);
  };

  const filtered = activities.filter((a) => {
    const q = search.toLowerCase();
    return a.title.toLowerCase().includes(q) || (a.description && a.description.toLowerCase().includes(q));
  });

  const learnMoreEmpty = !learnMore1.trim() && !learnMore2.trim() && !learnMore3.trim() && !learnMore4.trim();

  return (
    <>
      {/* ── Header ── */}
      <header style={headerStyle}>
        <button style={menuButtonStyle}>
          <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
            <path d="M0 1C2 3 5 3 7 1C9 -1 12 -1 14 1C16 3 19 3 21 1C22 0 23 0 24 0.5" stroke="white" strokeWidth="2" fill="none" />
            <path d="M0 9C2 11 5 11 7 9C9 7 12 7 14 9C16 11 19 11 21 9C22 8 23 8 24 8.5" stroke="white" strokeWidth="2" fill="none" />
            <path d="M0 17C2 19 5 19 7 17C9 15 12 15 14 17C16 19 19 19 21 17C22 16 23 16 24 16.5" stroke="white" strokeWidth="2" fill="none" />
          </svg>
        </button>
        <img
          src="https://boucancanot.com/wp-content/themes/theme-apiandyou/public/images/logo-white.svg"
          alt="Boucan Canot"
          style={{ height: 50, margin: "0 auto" }}
        />
      </header>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: 32 }}>
        {/* ── Barre de recherche + bouton créer ── */}
        <div style={toolbarStyle}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher une activité..."
            style={searchInputStyle}
          />
          <button onClick={() => setShowModal(true)} style={createButtonStyle}>
            + Créer
          </button>
        </div>

        {/* ── Modale de création ── */}
        {showModal && (
          <div style={overlayStyle} onClick={closeModal}>
            <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
              {/* Header */}
              <div style={modalHeaderStyle}>
                <div>
                  <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#fff" }}>Nouvelle activité</h2>
                  <p style={{ margin: "3px 0 0", fontSize: 12, color: "rgba(255,255,255,0.65)" }}>
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
                  {/* ── Informations générales ── */}
                  <div style={sectionTitleStyle}>Informations générales</div>

                  <label style={labelStyle}>
                    Titre <span style={requiredMarkStyle}>*</span>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                        if (!slug) setSlug(e.target.value.toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").replace(/[-\s]+/g, "-").replace(/^-+|-+$/g, ""));
                      }}
                      placeholder="Nom de l'activité"
                      style={{ ...inputStyle, ...(formError && !title.trim() ? errorInputStyle : {}) }}
                    />
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
                    <span style={{ fontWeight: 400, fontSize: 11, color: "#9ca3af", marginLeft: 4 }}>(utilisé pour le QR code)</span>
                    <input
                      type="url"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      placeholder="https://..."
                      style={{ ...inputStyle, ...(formError && !link.trim() ? errorInputStyle : {}) }}
                    />
                  </label>

                  <div style={{ display: "flex", gap: 12 }}>
                    <label style={{ ...labelStyle, flex: 1 }}>
                      Type <span style={requiredMarkStyle}>*</span>
                      <select
                        value={activityType}
                        onChange={(e) => setActivityType(e.target.value)}
                        style={{ ...inputStyle, cursor: "pointer" }}
                      >
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
                        <span style={{ color: partner ? "#374151" : "#9ca3af", fontSize: 13 }}>
                          {partner ? "Oui" : "Non"}
                        </span>
                        <button
                          type="button"
                          onClick={() => setPartner((p) => !p)}
                          style={{ ...toggleStyle, background: partner ? "#0070f3" : "#d1d5db" }}
                          aria-label="Toggle partenaire"
                        >
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
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      style={inputStyle}
                      placeholder="Courte description de l'activité..."
                    />
                  </label>

                  {/* ── Contenu ── */}
                  <div style={sectionTitleStyle}>Contenu</div>

                  <label style={labelStyle}>
                    Intro
                    <textarea
                      value={intro}
                      onChange={(e) => setIntro(e.target.value)}
                      rows={3}
                      style={inputStyle}
                      placeholder="Texte d'introduction..."
                    />
                  </label>

                  <label style={labelStyle}>
                    Histoire
                    <textarea
                      value={history}
                      onChange={(e) => setHistory(e.target.value)}
                      rows={4}
                      style={inputStyle}
                      placeholder="Histoire complète de l'activité..."
                    />
                  </label>

                  {/* ── En savoir plus ── */}
                  <div style={sectionTitleStyle}>
                    En savoir plus <span style={requiredMarkStyle}>*</span>
                    <span style={{ fontWeight: 400, fontSize: 11, color: "#9ca3af", marginLeft: 4 }}>(au moins 1 requis)</span>
                  </div>
                  <div style={learnMoreGridStyle}>
                    {[learnMore1, learnMore2, learnMore3, learnMore4].map((val, i) => {
                      const setters = [setLearnMore1, setLearnMore2, setLearnMore3, setLearnMore4];
                      return (
                        <label key={i} style={{ ...labelStyle, marginBottom: 8 }}>
                          Texte {i + 1}{i === 0 && <span style={requiredMarkStyle}> *</span>}
                          <textarea
                            value={val}
                            onChange={(e) => setters[i](e.target.value)}
                            rows={2}
                            style={{ ...inputStyle, ...(formError && learnMoreEmpty ? errorInputStyle : {}) }}
                            placeholder={i === 0 ? "Requis si les autres sont vides" : `Texte ${i + 1}...`}
                          />
                        </label>
                      );
                    })}
                  </div>

                  {/* ── Médias ── */}
                  <div style={sectionTitleStyle}>Médias</div>

                  <label style={labelStyle}>
                    Image de couverture <span style={requiredMarkStyle}>*</span>
                    <div style={{ ...fileInputWrapperStyle, ...(formError && !image ? errorInputStyle : {}) }}>
                      <span style={{ color: image ? "#374151" : "#9ca3af", fontSize: 13, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {image ? image.name : "Aucun fichier sélectionné (PNG uniquement)"}
                      </span>
                      <label style={fileButtonStyle}>
                        Parcourir
                        <input
                          type="file"
                          accept="image/png"
                          onChange={(e) => setImage(e.target.files[0] || null)}
                          style={{ display: "none" }}
                        />
                      </label>
                    </div>
                  </label>

                  <div style={formActionsStyle}>
                    <button type="button" onClick={closeModal} style={cancelButtonStyle}>
                      Annuler
                    </button>
                    <button type="submit" disabled={submitting} style={{ ...submitButtonStyle, ...(submitting ? { opacity: 0.65, cursor: "not-allowed" } : {}) }}>
                      {submitting ? "Création en cours…" : "✓ Créer l'activité"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ── Liste des activités ── */}
        {loading && <p>Chargement des activités...</p>}
        {error && <p style={{ color: "red" }}>Erreur : {error}</p>}
        {!loading && filtered.length === 0 && <p>Aucune activité trouvée.</p>}

        <div style={gridStyle}>
          {filtered.map((activity) => (
            <div key={activity.id} style={cardStyle}>
              <img
                src={`${BACKEND_URL}/uploads/${encodeURIComponent(activity.title)}.png`}
                alt={activity.title}
                style={imgStyle}
              />
              <div style={{ padding: 16 }}>
                <h2 style={{ margin: "0 0 8px" }}>{activity.title}</h2>
                {activity.description && (
                  <p style={{ margin: "0 0 8px", color: "#555" }}>{activity.description}</p>
                )}
                {activity.link && (
                  <a href={activity.link} target="_blank" rel="noreferrer">
                    En savoir plus
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const headerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: "#2c3e50",
  padding: "12px 24px",
};

const menuButtonStyle = {
  display: "flex",
  alignItems: "center",
  background: "none",
  border: "none",
  color: "#fff",
  padding: 0,
};

const toolbarStyle = {
  display: "flex",
  gap: 12,
  marginBottom: 24,
};

const searchInputStyle = {
  flex: 1,
  padding: "10px 14px",
  border: "1px solid #ccc",
  borderRadius: 4,
  fontSize: 14,
  boxSizing: "border-box",
};

const createButtonStyle = {
  padding: "10px 20px",
  background: "#0070f3",
  color: "#fff",
  border: "none",
  borderRadius: 4,
  fontSize: 14,
  cursor: "pointer",
  whiteSpace: "nowrap",
};

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.45)",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalStyle = {
  background: "#fff",
  borderRadius: 12,
  width: "90%",
  maxWidth: 560,
  maxHeight: "92vh",
  overflowY: "auto",
  boxShadow: "0 24px 64px rgba(0,0,0,0.35), 0 4px 20px rgba(0,0,0,0.15)",
};

const modalHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "linear-gradient(135deg, #1e3a5f 0%, #2c3e50 100%)",
  borderRadius: "12px 12px 0 0",
  padding: "20px 24px",
};

const closeButtonStyle = {
  background: "rgba(255,255,255,0.15)",
  border: "none",
  fontSize: 18,
  cursor: "pointer",
  color: "#fff",
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
  fontWeight: 600,
  fontSize: 13,
  color: "#374151",
};

const inputStyle = {
  display: "block",
  width: "100%",
  marginTop: 5,
  padding: "9px 12px",
  border: "1.5px solid #d1d5db",
  borderRadius: 6,
  fontSize: 14,
  boxSizing: "border-box",
  fontFamily: "inherit",
  resize: "vertical",
  outline: "none",
  transition: "border-color 0.15s",
};

const cancelButtonStyle = {
  padding: "10px 20px",
  background: "transparent",
  color: "#6b7280",
  border: "1.5px solid #d1d5db",
  borderRadius: 6,
  fontSize: 14,
  cursor: "pointer",
  fontWeight: 500,
};

const submitButtonStyle = {
  padding: "10px 24px",
  background: "linear-gradient(135deg, #0070f3 0%, #0051b0 100%)",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  fontSize: 14,
  cursor: "pointer",
  fontWeight: 600,
  boxShadow: "0 2px 8px rgba(0,112,243,0.4)",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: 24,
};

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: 8,
  overflow: "hidden",
  background: "#fff",
};

const imgStyle = {
  width: "100%",
  height: 180,
  objectFit: "cover",
  display: "block",
};

const sectionTitleStyle = {
  fontSize: 11,
  fontWeight: 700,
  color: "#6b7280",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  marginBottom: 12,
  marginTop: 20,
  paddingBottom: 6,
  borderBottom: "1px solid #e5e7eb",
};

const requiredMarkStyle = {
  color: "#ef4444",
  fontWeight: 700,
};

const errorInputStyle = {
  borderColor: "#ef4444",
  background: "#fff5f5",
};

const errorBannerStyle = {
  display: "flex",
  alignItems: "center",
  background: "#fff5f5",
  color: "#c53030",
  border: "1px solid #feb2b2",
  borderRadius: 6,
  padding: "10px 14px",
  marginTop: 12,
  fontSize: 14,
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
  border: "1.5px solid #d1d5db",
  borderRadius: 6,
  background: "#f9fafb",
};

const fileButtonStyle = {
  padding: "5px 14px",
  background: "#f3f4f6",
  color: "#374151",
  border: "1px solid #d1d5db",
  borderRadius: 4,
  fontSize: 13,
  cursor: "pointer",
  flexShrink: 0,
  fontWeight: 500,
};

const formActionsStyle = {
  display: "flex",
  justifyContent: "flex-end",
  gap: 12,
  marginTop: 24,
  paddingTop: 16,
  borderTop: "1px solid #e5e7eb",
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
  background: "#fff",
  borderRadius: "50%",
  boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
  transition: "transform 0.2s",
  display: "block",
};

export default App;
