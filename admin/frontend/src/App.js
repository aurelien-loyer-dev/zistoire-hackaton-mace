import { useState, useEffect } from "react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";

function App() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [intro, setIntro] = useState("");
  const [history, setHistory] = useState("");
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

    setSubmitting(true);
    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("description", description.trim());
    formData.append("link", link.trim());
    formData.append("intro", intro.trim());
    formData.append("history", history.trim());
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
        setDescription("");
        setLink("");
        setIntro("");
        setHistory("");
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
              <div style={modalHeaderStyle}>
                <h2 style={{ margin: 0 }}>Nouvelle activité</h2>
                <button onClick={closeModal} style={closeButtonStyle}>&times;</button>
              </div>
              {formError && <p style={{ color: "red", margin: "12px 0 0" }}>{formError}</p>}
              <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
                <label style={labelStyle}>
                  Titre *
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={inputStyle}
                  />
                </label>

                <label style={labelStyle}>
                  Description
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    style={inputStyle}
                  />
                </label>

                <label style={labelStyle}>
                  Lien * (utilisé pour le QR code)
                  <input
                    type="url"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="https://..."
                    required
                    style={inputStyle}
                  />
                </label>

                <label style={labelStyle}>
                  Intro
                  <textarea
                    value={intro}
                    onChange={(e) => setIntro(e.target.value)}
                    rows={3}
                    style={inputStyle}
                  />
                </label>

                <label style={labelStyle}>
                  Histoire
                  <textarea
                    value={history}
                    onChange={(e) => setHistory(e.target.value)}
                    rows={5}
                    style={inputStyle}
                  />
                </label>

                <fieldset style={{ border: "1px solid #ccc", borderRadius: 4, padding: "12px 16px", marginBottom: 12 }}>
                  <legend style={{ fontWeight: 600, padding: "0 4px" }}>En savoir plus (jusqu'à 4 textes)</legend>
                  {[learnMore1, learnMore2, learnMore3, learnMore4].map((val, i) => {
                    const setters = [setLearnMore1, setLearnMore2, setLearnMore3, setLearnMore4];
                    return (
                      <label key={i} style={{ ...labelStyle, marginBottom: 8 }}>
                        Texte {i + 1}
                        <textarea
                          value={val}
                          onChange={(e) => setters[i](e.target.value)}
                          rows={2}
                          style={inputStyle}
                        />
                      </label>
                    );
                  })}
                </fieldset>

                <label style={labelStyle}>
                  Image de couverture *
                  <input
                    type="file"
                    accept="image/png"
                    onChange={(e) => setImage(e.target.files[0] || null)}
                    style={{ marginTop: 4 }}
                  />
                </label>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 8 }}>
                  <button type="button" onClick={closeModal} style={cancelButtonStyle}>
                    Annuler
                  </button>
                  <button type="submit" disabled={submitting} style={submitButtonStyle}>
                    {submitting ? "Création en cours..." : "Créer l'activité"}
                  </button>
                </div>
              </form>
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
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalStyle = {
  background: "#fff",
  borderRadius: 8,
  padding: 24,
  width: "90%",
  maxWidth: 480,
  maxHeight: "90vh",
  overflowY: "auto",
};

const modalHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const closeButtonStyle = {
  background: "none",
  border: "none",
  fontSize: 24,
  cursor: "pointer",
  color: "#333",
  lineHeight: 1,
};

const labelStyle = {
  display: "block",
  marginBottom: 16,
  fontWeight: 600,
};

const inputStyle = {
  display: "block",
  width: "100%",
  marginTop: 4,
  padding: "8px 10px",
  border: "1px solid #ccc",
  borderRadius: 4,
  fontSize: 14,
  boxSizing: "border-box",
};

const cancelButtonStyle = {
  padding: "10px 20px",
  background: "#e0e0e0",
  color: "#333",
  border: "none",
  borderRadius: 4,
  fontSize: 14,
  cursor: "pointer",
};

const submitButtonStyle = {
  padding: "10px 20px",
  background: "#0070f3",
  color: "#fff",
  border: "none",
  borderRadius: 4,
  fontSize: 14,
  cursor: "pointer",
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

export default App;
