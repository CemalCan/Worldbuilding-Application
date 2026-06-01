const STORAGE_KEY = "hikaye.mvp.state.v1";
const now = () => new Date().toISOString();
const id = (prefix) => `${prefix}_${crypto.randomUUID()}`;

const builtInTemplates = [
  ["blank", "Boş Evren", "Temel not, karakter, mekan ve olay yapısı.", ["Notlar", "Karakterler", "Mekanlar", "Olaylar"]],
  ["medieval", "Orta Çağ", "Hanedanlar, krallıklar, kaleler ve savaşlar.", ["Karakterler", "Aileler", "Hanedanlar", "Krallıklar", "Şehirler", "Köyler", "Kaleler", "Dinler", "Loncalar", "Ordular", "Savaşlar", "Eşyalar", "Zaman çizelgesi", "Notlar"]],
  ["fantasy", "Fantastik", "Büyü, tanrılar, ırklar, efsaneler ve artefaktlar.", ["Karakterler", "Aileler", "Irklar", "Krallıklar", "Mekanlar", "Büyüler", "Büyü sistemleri", "Dinler", "Tanrılar", "Canavarlar", "Artefaktlar", "Kehanetler", "Efsaneler", "Savaşlar", "Zaman çizelgesi", "Notlar"]],
  ["dark-fantasy", "Karanlık Fantastik", "Lanetler, tarikatlar ve yasak bilgiler.", ["Karakterler", "Lanetler", "Tarikatlar", "Canavarlar", "Tanrılar", "Yasak büyüler", "Kayıp şehirler", "Kurbanlar", "Günahlar", "Kehanetler", "Eşyalar", "Olaylar", "Notlar"]],
  ["cyberpunk", "Cyberpunk", "Megakentler, şirketler, çeteler ve siber implantlar.", ["Karakterler", "Megakentler", "Şirketler", "Çeteler", "Hacker grupları", "Siber implantlar", "Yapay zekalar", "Sanal ağlar", "Suç dosyaları", "Kara borsa", "Güvenlik güçleri", "Silahlar", "Notlar", "Zaman çizelgesi"]],
  ["sci-fi", "Bilim Kurgu", "Gezegenler, yıldız sistemleri ve teknolojiler.", ["Karakterler", "Gezegenler", "Yıldız sistemleri", "Uzay gemileri", "Uzaylı türler", "Teknolojiler", "Yapay zekalar", "Koloniler", "Federasyonlar", "Şirketler", "Silah sistemleri", "Bilimsel kurallar", "Görev kayıtları", "Notlar"]],
  ["space-opera", "Uzay Operası", "İmparatorluklar, filolar ve politik ittifaklar.", ["Karakterler", "Hanedanlar", "İmparatorluklar", "Gezegenler", "Yıldız sistemleri", "Filolar", "Uzay gemileri", "Komutanlar", "Savaşlar", "Politik ittifaklar", "Uzaylı türler", "Antik teknolojiler", "Notlar"]],
  ["post-apocalyptic", "Post-Apokaliptik", "Sığınaklar, kaynaklar, fraksiyonlar ve tehditler.", ["Karakterler", "Hayatta kalan gruplar", "Sığınaklar", "Tehlikeli bölgeler", "Kaynaklar", "Mutasyonlar", "Hastalıklar", "Eski dünya kalıntıları", "Fraksiyonlar", "Araçlar", "Tehditler", "Notlar"]],
  ["detective", "Polisiye", "Suç dosyaları, deliller, alibiler ve şüpheliler.", ["Dedektifler", "Şüpheliler", "Kurbanlar", "Suç dosyaları", "Deliller", "Tanıklar", "İfadeler", "Olay yerleri", "Alibiler", "Motifler", "Yanlış ipuçları", "Zaman çizelgesi", "Notlar"]],
  ["horror", "Korku", "Ritüeller, canavarlar, gizemler ve travmalar.", ["Karakterler", "Kurbanlar", "Canavarlar", "Lanetler", "Ritüeller", "Yasak bilgiler", "Mekanlar", "Günlükler", "Gizemler", "Travmalar", "Doğaüstü kurallar", "Notlar"]],
  ["romance", "Romantik Drama", "İlişkiler, sırlar ve duygusal çatışmalar.", ["Karakterler", "İlişkiler", "Aileler", "Sosyal çevreler", "Geçmiş ilişkiler", "Duygusal çatışmalar", "Sırlar", "Dönüm noktaları", "Sahneler", "Notlar"]],
  ["mythological", "Mitolojik", "Panteonlar, kutsal mekanlar ve ilahi yasalar.", ["Tanrılar", "Yarı tanrılar", "Panteonlar", "Kutsal mekanlar", "Ritüeller", "Kehanetler", "Efsaneler", "Kutsal eşyalar", "Ölüm sonrası alemler", "İlahi yasalar", "Notlar"]],
  ["rpg", "RPG / D&D Campaign", "Campaign, NPC, görev, oturum ve encounter takibi.", ["Campaign", "Oyuncu karakterleri", "NPC'ler", "Parti üyeleri", "Görevler", "Oturum notları", "Haritalar", "Şehirler", "Zindanlar", "Encounter'lar", "Canavarlar", "Loot / Ödüller", "Eşyalar", "Büyüler", "Fraksiyonlar", "Tanrılar", "Kural notları", "Zaman çizelgesi"]],
].map(([templateId, name, description, categories]) => ({
  id: templateId,
  name,
  description,
  isBuiltIn: true,
  categoryPresets: categories.map((categoryName, order) => ({
    id: `${templateId}_${order}`,
    name: categoryName,
    order,
  })),
  createdAt: now(),
  updatedAt: now(),
  deletedAt: null,
}));

const defaultSettings = {
  theme: "system",
  fontSize: "medium",
  accentColor: "#9a4f2e",
  compactMode: false,
  autoSave: true,
  trashRetentionDays: 30,
  language: "tr",
};

let storageRecoveryMessage = "";
let state = loadState();

function createDefaultState() {
  return {
    universes: [],
    templates: builtInTemplates,
    categories: [],
    entities: [],
    relationships: [],
    notes: [],
    tags: [],
    settings: { ...defaultSettings },
    selectedUniverseId: null,
    selectedCategoryId: null,
    selectedEntityId: null,
    view: "home",
    search: "",
  };
}

function loadState() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return createDefaultState();

  try {
    const parsed = JSON.parse(stored);
    if (!parsed || typeof parsed !== "object") throw new Error("Stored data is not an object.");
    const customTemplates = Array.isArray(parsed.templates)
      ? parsed.templates.filter((template) => template && !template.isBuiltIn)
      : [];
    return {
      ...createDefaultState(),
      ...parsed,
      universes: Array.isArray(parsed.universes) ? parsed.universes : [],
      categories: Array.isArray(parsed.categories) ? parsed.categories : [],
      entities: Array.isArray(parsed.entities) ? parsed.entities : [],
      relationships: Array.isArray(parsed.relationships) ? parsed.relationships : [],
      notes: Array.isArray(parsed.notes) ? parsed.notes : [],
      tags: Array.isArray(parsed.tags) ? parsed.tags : [],
      templates: [...builtInTemplates, ...customTemplates],
      settings: { ...defaultSettings, ...(parsed.settings || {}) },
    };
  } catch (error) {
    console.warn("Loreforge could not read stored data.", error);
    storageRecoveryMessage = "Kaydedilmiş yerel veri okunamadı. Loreforge güvenli boş durumla başlatıldı. Tarayıcı verilerini temizlemeden önce varsa export yedeğini kontrol edin.";
    return createDefaultState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function setState(patch) {
  state = { ...state, ...patch };
  saveState();
  render();
}

function activeItems(collection) {
  return collection.filter((item) => !item.deletedAt);
}

function currentUniverse() {
  return state.universes.find((universe) => universe.id === state.selectedUniverseId && !universe.deletedAt);
}

function universeCategories(universeId = state.selectedUniverseId, includeHidden = false) {
  return activeItems(state.categories)
    .filter((category) => category.universeId === universeId && (includeHidden || !category.isHidden))
    .sort((a, b) => a.order - b.order);
}

function universeEntities(universeId = state.selectedUniverseId) {
  return activeItems(state.entities).filter((entity) => entity.universeId === universeId);
}

function currentCategory() {
  return state.categories.find((category) => category.id === state.selectedCategoryId && !category.deletedAt);
}

function currentEntity() {
  return state.entities.find((entity) => entity.id === state.selectedEntityId && !entity.deletedAt);
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function markdownToHtml(markdown = "") {
  const escaped = escapeHtml(markdown);
  const withBlocks = escaped
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/gim, "<em>$1</em>")
    .replace(/`([^`]+)`/gim, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/gim, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
  return withBlocks
    .split(/\n{2,}/)
    .map((block) => {
      if (/^<h[1-3]>/.test(block)) return block;
      if (/^- \[[ x]\] /im.test(block)) {
        return `<ul>${block
          .split("\n")
          .map((line) => `<li>${line.replace(/^- \[[ x]\] /i, "")}</li>`)
          .join("")}</ul>`;
      }
      if (/^- /m.test(block)) {
        return `<ul>${block
          .split("\n")
          .map((line) => `<li>${line.replace(/^- /, "")}</li>`)
          .join("")}</ul>`;
      }
      return `<p>${block.replace(/\n/g, "<br>")}</p>`;
    })
    .join("");
}

function applyTheme() {
  const theme = state.settings.theme === "system"
    ? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "minimal")
    : state.settings.theme;
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.setProperty("--font-size", {
    small: "14px",
    medium: "15px",
    large: "17px",
  }[state.settings.fontSize] || "15px");
  document.documentElement.style.setProperty("--accent", state.settings.accentColor || "#9a4f2e");
}

function render() {
  applyTheme();
  const app = document.getElementById("app");
  const universe = currentUniverse();
  app.innerHTML = `
    <div class="app-shell">
      ${renderTopbar(universe)}
      ${storageRecoveryMessage ? `<section class="recovery-banner">${escapeHtml(storageRecoveryMessage)}</section>` : ""}
      ${universe && state.view !== "home" ? renderWorkspace(universe) : renderHome()}
    </div>
  `;
  bindEvents();
}

function renderTopbar(universe) {
  return `
    <header class="topbar">
      <button class="brand ghost" data-action="home">
        <span class="brand__mark">H</span>
        <span>
          <h1>Loreforge</h1>
          <p>${universe ? escapeHtml(universe.name) : "Offline worldbuilding çekirdeği"}</p>
        </span>
      </button>
      <div class="topbar__actions">
        ${universe ? `<button class="secondary" data-action="quick-note">Fikir</button>` : ""}
        ${universe ? `<button class="secondary" data-action="export-universe">Export</button>` : ""}
        <button class="secondary" data-action="settings">Ayarlar</button>
        <button data-action="new-universe">Yeni Evren</button>
      </div>
    </header>
  `;
}

function renderHome() {
  return `
    <main class="home">
      <section class="home__header">
        <div>
          <h2>Evrenler</h2>
          <p>Veriler bu tarayıcıda yerel olarak saklanır.</p>
        </div>
        <div class="toolbar">
          <input class="search-box" data-search placeholder="Evren ara" value="${escapeHtml(state.search)}" />
          <button class="secondary" data-action="import-universe">Import</button>
        </div>
      </section>
      <div data-home-results>
        ${renderHomeResults()}
      </div>
    </main>
  `;
}

function renderHomeResults() {
  const universes = activeItems(state.universes);
  const query = state.search.trim().toLocaleLowerCase("tr");
  const visibleUniverses = universes.filter((universe) =>
    !query || `${universe.name} ${universe.description || ""}`.toLocaleLowerCase("tr").includes(query)
  );
  return visibleUniverses.length ? `
        <section class="grid">
          ${visibleUniverses.map(renderUniverseCard).join("")}
        </section>
      ` : `
        <section class="empty">
          <h3>Henüz evren yok</h3>
          <p>Bir şablon seçerek ya da boş evrenle başlayarak yerel arşivini oluştur.</p>
          <button data-action="new-universe">Yeni Evren</button>
        </section>
      `;
}

function renderUniverseCard(universe) {
  const template = state.templates.find((item) => item.id === universe.templateId);
  const categories = universeCategories(universe.id, true).length;
  const entities = universeEntities(universe.id).length;
  return `
    <article class="card universe-card">
      <div class="universe-card__cover"></div>
      <div>
        <h3>${escapeHtml(universe.name)}</h3>
        <p class="muted">${escapeHtml(universe.description || "Açıklama yok.")}</p>
      </div>
      <div class="badge-list">
        <span class="badge">${escapeHtml(template?.name || "Özel")}</span>
        <span class="badge">${categories} kategori</span>
        <span class="badge">${entities} sayfa</span>
      </div>
      <div class="button-row">
        <button data-action="open-universe" data-id="${universe.id}">Aç</button>
        <button class="secondary" data-action="edit-universe" data-id="${universe.id}">Düzenle</button>
        <button class="danger" data-action="delete-universe" data-id="${universe.id}">Sil</button>
      </div>
    </article>
  `;
}

function renderWorkspace(universe) {
  return `
    <div class="workspace">
      ${renderLeftPanel(universe)}
      ${renderMainPanel(universe)}
      ${renderRightPanel(universe)}
    </div>
  `;
}

function renderLeftPanel(universe) {
  const categories = universeCategories(universe.id);
  const hiddenCategories = universeCategories(universe.id, true).filter((category) => category.isHidden);
  return `
    <aside class="panel stack">
      <div class="row">
        <h2>Kategoriler</h2>
        <button class="icon-button" data-action="new-category" title="Kategori ekle">+</button>
      </div>
      <input data-search placeholder="Sayfa, not, etiket ara" value="${escapeHtml(state.search)}" />
      <div class="stack">
        ${categories.map((category) => {
          const count = universeEntities(universe.id).filter((entity) => entity.categoryId === category.id).length;
          return `
            <button class="category-button ${category.id === state.selectedCategoryId ? "is-active" : ""}" data-action="select-category" data-id="${category.id}">
              <strong>${escapeHtml(category.name)}</strong>
              <small>${count} sayfa</small>
            </button>
          `;
        }).join("")}
      </div>
      <div class="button-row">
        <button class="secondary" data-action="templates">Şablonlar</button>
        <button class="secondary" data-action="trash">Çöp Kutusu</button>
      </div>
      ${hiddenCategories.length ? `
        <div class="stack">
          <p class="muted">${hiddenCategories.length} kategori gizli.</p>
          ${hiddenCategories.map((category) => `
            <button class="secondary" data-action="show-category" data-id="${category.id}">${escapeHtml(category.name)} göster</button>
          `).join("")}
        </div>
      ` : ""}
    </aside>
  `;
}

function renderMainPanel(universe) {
  if (state.view === "trash") return renderTrash(universe);
  if (state.view === "templates") return renderTemplates();
  return `
    <main class="main stack" data-main-panel>
      ${renderMainPanelContent(universe)}
    </main>
  `;
}

function renderMainPanelContent(universe) {
  const category = currentCategory() || universeCategories(universe.id)[0];
  if (category && category.id !== state.selectedCategoryId) {
    state.selectedCategoryId = category.id;
    saveState();
  }
  const entity = currentEntity();
  const entities = category ? filteredEntities(universe.id).filter((item) => item.categoryId === category.id) : [];
  return `
      <section class="toolbar">
        <h2>${escapeHtml(category?.name || "Kategori yok")}</h2>
        ${category ? `
          <button data-action="new-entity">Sayfa</button>
          <button class="secondary" data-action="edit-category" data-id="${category.id}">Kategori</button>
          <button class="secondary" data-action="move-category-up" data-id="${category.id}">Yukarı</button>
          <button class="secondary" data-action="move-category-down" data-id="${category.id}">Aşağı</button>
          <button class="secondary" data-action="hide-category" data-id="${category.id}">Gizle</button>
          <button class="danger" data-action="delete-category" data-id="${category.id}">Sil</button>
        ` : ""}
      </section>
      ${entity ? renderEntityDetail(entity) : renderEntityList(entities)}
  `;
}

function filteredEntities(universeId) {
  const query = state.search.trim().toLocaleLowerCase("tr");
  const entities = universeEntities(universeId);
  if (!query) return entities;
  return entities.filter((entity) => {
    const tagNames = entity.tagIds
      .map((tagId) => state.tags.find((tag) => tag.id === tagId)?.name || "")
      .join(" ");
    const notes = activeItems(state.notes)
      .filter((note) => note.entityId === entity.id)
      .map((note) => `${note.title || ""} ${note.content}`)
      .join(" ");
    return `${entity.title} ${entity.summary || ""} ${entity.content || ""} ${tagNames} ${notes}`
      .toLocaleLowerCase("tr")
      .includes(query);
  });
}

function renderEntityList(entities) {
  if (!entities.length) {
    return `
      <section class="empty">
        <h3>Bu kategoride sayfa yok</h3>
        <p>Karakter, mekan, olay, görev veya kendi ihtiyacına göre herhangi bir sayfa oluştur.</p>
        <button data-action="new-entity">Sayfa Oluştur</button>
      </section>
    `;
  }
  return `
    <section class="entity-list">
      ${entities.map((entity) => `
        <button class="entity-row" data-action="select-entity" data-id="${entity.id}">
          <h3>${escapeHtml(entity.title)}</h3>
          <small>${escapeHtml(entity.summary || "Özet yok.")}</small>
        </button>
      `).join("")}
    </section>
  `;
}

function renderEntityDetail(entity) {
  const category = state.categories.find((item) => item.id === entity.categoryId);
  const tags = entity.tagIds
    .map((tagId) => state.tags.find((tag) => tag.id === tagId))
    .filter(Boolean);
  return `
    <section class="detail">
      <div class="detail-header">
        <div>
          <p class="muted">${escapeHtml(category?.name || "Kategori")}</p>
          <h2 class="detail-title">${escapeHtml(entity.title)}</h2>
          <p>${escapeHtml(entity.summary || "")}</p>
        </div>
        <div class="button-row">
          <button class="secondary" data-action="back-to-list">Liste</button>
          <button data-action="edit-entity" data-id="${entity.id}">Düzenle</button>
          <button class="danger" data-action="delete-entity" data-id="${entity.id}">Sil</button>
        </div>
      </div>
      <div class="badge-list">
        ${tags.map((tag) => `<span class="badge">${escapeHtml(tag.name)}</span>`).join("") || `<span class="badge">Etiket yok</span>`}
      </div>
      <article class="card markdown">${markdownToHtml(entity.content || "İçerik eklenmedi.")}</article>
      ${renderCustomFields(entity)}
    </section>
  `;
}

function renderCustomFields(entity) {
  const entries = Object.entries(entity.customFieldValues || {});
  if (!entries.length) return "";
  return `
    <section class="card stack">
      <h3 class="section-title">Özel Alanlar</h3>
      ${entries.map(([key, value]) => `
        <div>
          <strong>${escapeHtml(key)}</strong>
          <p class="muted">${escapeHtml(value)}</p>
        </div>
      `).join("")}
    </section>
  `;
}

function renderRightPanel() {
  const entity = currentEntity();
  if (!entity) {
    const inboxNotes = activeItems(state.notes).filter((note) => note.universeId === state.selectedUniverseId && !note.entityId);
    return `
      <aside class="side stack">
        <h2>Fikir Kutusu</h2>
        ${inboxNotes.length ? inboxNotes.map(renderNoteCard).join("") : `<p class="muted">Bağlanmamış hızlı not yok.</p>`}
      </aside>
    `;
  }
  const outgoing = activeItems(state.relationships).filter((rel) => rel.sourceEntityId === entity.id);
  const incoming = activeItems(state.relationships).filter((rel) => rel.targetEntityId === entity.id);
  const notes = activeItems(state.notes).filter((note) => note.entityId === entity.id);
  const relationshipTargets = getRelationshipTargets(entity);
  return `
    <aside class="side stack">
      <div class="row">
        <h2>Bağlantılar</h2>
        <button class="icon-button" data-action="new-relationship" title="İlişki ekle" ${relationshipTargets.length ? "" : "disabled"}>+</button>
      </div>
      ${relationshipTargets.length ? "" : `<p class="muted">İlişki oluşturmak için bu evrende en az bir başka sayfa olmalı.</p>`}
      ${outgoing.length ? outgoing.map((rel) => renderRelationship(rel, false)).join("") : `<p class="muted">Çıkış ilişkisi yok.</p>`}
      <h2>Backlinks</h2>
      ${incoming.length ? incoming.map((rel) => renderRelationship(rel, true)).join("") : `<p class="muted">Gelen ilişki yok.</p>`}
      <div class="row">
        <h2>Notlar</h2>
        <button class="icon-button" data-action="new-note" title="Not ekle">+</button>
      </div>
      ${notes.length ? notes.map(renderNoteCard).join("") : `<p class="muted">Bu sayfada not yok.</p>`}
    </aside>
  `;
}

function renderRelationship(rel, incoming) {
  const targetId = incoming ? rel.sourceEntityId : rel.targetEntityId;
  const entity = state.entities.find((item) => item.id === targetId);
  const label = incoming ? (rel.reverseType || "bağlı") : rel.type;
  return `
    <button class="entity-row" data-action="select-entity" data-id="${targetId}">
      <strong>${escapeHtml(entity?.title || "Silinmiş sayfa")}</strong>
      <small>${escapeHtml(label)}${rel.description ? ` · ${escapeHtml(rel.description)}` : ""}</small>
    </button>
    <button class="secondary" data-action="delete-relationship" data-id="${rel.id}">İlişkiyi Sil</button>
  `;
}

function getRelationshipTargets(source) {
  if (!source) return [];
  return universeEntities(source.universeId).filter((entity) => entity.id !== source.id);
}

function renderNoteCard(note) {
  return `
    <article class="card stack">
      <div class="row">
        <strong>${escapeHtml(note.title || "Not")}</strong>
        <span class="badge">${escapeHtml(note.type)}</span>
      </div>
      <div class="markdown">${markdownToHtml(note.content)}</div>
      <div class="button-row">
        ${!note.entityId && currentUniverse() ? `<button class="secondary" data-action="attach-note" data-id="${note.id}">Bağla</button>` : ""}
        <button class="danger" data-action="delete-note" data-id="${note.id}">Sil</button>
      </div>
    </article>
  `;
}

function renderTemplates() {
  const templates = activeItems(state.templates);
  return `
    <main class="main stack">
      <section class="toolbar">
        <h2>Şablonlar</h2>
        <button data-action="new-template">Özel Şablon</button>
      </section>
      <section class="grid">
        ${templates.map((template) => `
          <article class="card stack">
            <div>
              <h3>${escapeHtml(template.name)}</h3>
              <p class="muted">${escapeHtml(template.description || "")}</p>
            </div>
            <div class="badge-list">
              <span class="badge">${template.categoryPresets.length} kategori</span>
              <span class="badge">${template.isBuiltIn ? "Yerleşik" : "Özel"}</span>
            </div>
            ${template.isBuiltIn ? "" : `<button class="danger" data-action="delete-template" data-id="${template.id}">Sil</button>`}
          </article>
        `).join("")}
      </section>
    </main>
  `;
}

function renderTrash(universe) {
  const deleted = [
    ...state.categories.filter((item) => item.universeId === universe.id && item.deletedAt).map((item) => ["Kategori", item]),
    ...state.entities.filter((item) => item.universeId === universe.id && item.deletedAt).map((item) => ["Sayfa", item]),
    ...state.notes.filter((item) => item.universeId === universe.id && item.deletedAt).map((item) => ["Not", item]),
    ...state.relationships.filter((item) => item.universeId === universe.id && item.deletedAt).map((item) => ["İlişki", item]),
    ...state.tags.filter((item) => item.universeId === universe.id && item.deletedAt).map((item) => ["Etiket", item]),
  ];
  return `
    <main class="main stack">
      <h2>Geri Dönüşüm Kutusu</h2>
      ${deleted.length ? deleted.map(([type, item]) => `
        <article class="trash-row">
          <strong>${type}: ${escapeHtml(item.name || item.title || item.type || item.content?.slice(0, 32) || item.id)}</strong>
          <small>Silinme tarihi: ${new Date(item.deletedAt).toLocaleString("tr-TR")}</small>
          <div class="button-row">
            <button data-action="restore-item" data-kind="${type}" data-id="${item.id}">Geri Yükle</button>
            <button class="danger" data-action="purge-item" data-kind="${type}" data-id="${item.id}">Kalıcı Sil</button>
          </div>
        </article>
      `).join("") : `<section class="empty"><h3>Çöp kutusu boş</h3><p>Silinen öğeler önce burada tutulur.</p></section>`}
    </main>
  `;
}

function bindEvents() {
  bindActionEvents(document);
  document.querySelectorAll("[data-search]").forEach((input) => {
    input.addEventListener("input", (event) => {
      state.search = event.target.value;
      saveState();
      refreshSearchResults();
    });
  });
}

function bindActionEvents(root) {
  root.querySelectorAll("[data-action]").forEach((element) => {
    element.addEventListener("click", (event) => {
      const action = event.currentTarget.dataset.action;
      const dataset = event.currentTarget.dataset;
      actions[action]?.(dataset);
    });
  });
}

function refreshSearchResults() {
  if (state.view === "home" || !currentUniverse()) {
    const homeResults = document.querySelector("[data-home-results]");
    if (!homeResults) return render();
    homeResults.innerHTML = renderHomeResults();
    bindActionEvents(homeResults);
    return;
  }

  if (state.view !== "universe") return;
  const universe = currentUniverse();
  const mainPanel = document.querySelector("[data-main-panel]");
  if (!universe || !mainPanel) return render();
  mainPanel.innerHTML = renderMainPanelContent(universe);
  bindActionEvents(mainPanel);
}

const actions = {
  home() {
    setState({ view: "home", selectedUniverseId: null, selectedCategoryId: null, selectedEntityId: null, search: "" });
  },
  "new-universe": openUniverseModal,
  "open-universe"({ id: universeId }) {
    const firstCategory = universeCategories(universeId)[0];
    setState({
      selectedUniverseId: universeId,
      selectedCategoryId: firstCategory?.id || null,
      selectedEntityId: null,
      view: "universe",
      search: "",
    });
  },
  "edit-universe"({ id: universeId }) {
    const universe = state.universes.find((item) => item.id === universeId);
    openUniverseModal(universe);
  },
  "delete-universe"({ id: universeId }) {
    if (!confirm("Bu evren geri dönüşüm kutusuna taşınacak. Devam etmek istiyor musun?")) return;
    softDelete("universes", universeId);
    setState({ view: "home", selectedUniverseId: null });
  },
  "select-category"({ id: categoryId }) {
    setState({ selectedCategoryId: categoryId, selectedEntityId: null, view: "universe" });
  },
  "new-category": openCategoryModal,
  "edit-category"({ id: categoryId }) {
    openCategoryModal(state.categories.find((category) => category.id === categoryId));
  },
  "hide-category"({ id: categoryId }) {
    updateItem("categories", categoryId, { isHidden: true });
  },
  "show-category"({ id: categoryId }) {
    updateItem("categories", categoryId, { isHidden: false });
  },
  "move-category-up"({ id: categoryId }) {
    moveCategory(categoryId, -1);
  },
  "move-category-down"({ id: categoryId }) {
    moveCategory(categoryId, 1);
  },
  "delete-category"({ id: categoryId }) {
    const choice = prompt("Kategori silme: 1=sayfalarla çöpe taşı, 2=sayfaları başka kategoriye taşı, 3=sadece gizle", "1");
    if (choice === "3") return updateItem("categories", categoryId, { isHidden: true });
    if (choice === "2") {
      const targetName = prompt("Sayfalar hangi kategoriye taşınsın?");
      const target = universeCategories().find((category) => category.name.toLocaleLowerCase("tr") === targetName?.toLocaleLowerCase("tr"));
      if (!target || target.id === categoryId) return alert("Geçerli hedef kategori bulunamadı.");
      state.entities = state.entities.map((entity) => entity.categoryId === categoryId ? { ...entity, categoryId: target.id, updatedAt: now() } : entity);
    } else if (choice === "1") {
      state.entities = state.entities.map((entity) => entity.categoryId === categoryId ? { ...entity, deletedAt: now(), updatedAt: now() } : entity);
    } else {
      return;
    }
    softDelete("categories", categoryId);
    state.selectedEntityId = null;
    state.selectedCategoryId = universeCategories().find((category) => category.id !== categoryId)?.id || null;
    saveState();
    render();
  },
  "new-entity": openEntityModal,
  "select-entity"({ id: entityId }) {
    const entity = state.entities.find((item) => item.id === entityId);
    setState({ selectedEntityId: entityId, selectedCategoryId: entity?.categoryId || state.selectedCategoryId, view: "universe" });
  },
  "back-to-list"() {
    setState({ selectedEntityId: null });
  },
  "edit-entity"({ id: entityId }) {
    openEntityModal(state.entities.find((entity) => entity.id === entityId));
  },
  "delete-entity"({ id: entityId }) {
    if (!confirm("Bu sayfa geri dönüşüm kutusuna taşınacak. Devam etmek istiyor musun?")) return;
    softDelete("entities", entityId);
    setState({ selectedEntityId: null });
  },
  "new-relationship": openRelationshipModal,
  "delete-relationship"({ id: relationshipId }) {
    if (!confirm("Bu ilişki geri dönüşüm kutusuna taşınacak.")) return;
    softDelete("relationships", relationshipId);
  },
  "new-note": () => openNoteModal(currentEntity()?.id || null),
  "quick-note": () => openNoteModal(null),
  "delete-note"({ id: noteId }) {
    if (!confirm("Bu not geri dönüşüm kutusuna taşınacak.")) return;
    softDelete("notes", noteId);
  },
  "attach-note"({ id: noteId }) {
    const title = prompt("Not hangi sayfaya bağlansın? Sayfa başlığını yaz.");
    const entity = universeEntities().find((item) => item.title.toLocaleLowerCase("tr") === title?.toLocaleLowerCase("tr"));
    if (!entity) return alert("Sayfa bulunamadı.");
    updateItem("notes", noteId, { entityId: entity.id });
  },
  templates() {
    setState({ view: "templates", selectedEntityId: null });
  },
  "new-template": openTemplateModal,
  "delete-template"({ id: templateId }) {
    if (!confirm("Özel şablon silinsin mi?")) return;
    softDelete("templates", templateId);
  },
  trash() {
    setState({ view: "trash", selectedEntityId: null });
  },
  "restore-item"({ kind, id: itemId }) {
    restoreTrashItem(kind, itemId);
  },
  "purge-item"({ kind, id: itemId }) {
    if (!confirm("Bu işlem geri alınamaz. Kalıcı olarak silmek istediğine emin misin?")) return;
    purgeTrashItem(kind, itemId);
  },
  settings: openSettingsModal,
  "export-universe": exportUniverse,
  "import-universe": importUniverse,
};

function collectionForKind(kind) {
  return {
    Kategori: "categories",
    Sayfa: "entities",
    Not: "notes",
    İlişki: "relationships",
    Etiket: "tags",
  }[kind] || "entities";
}

function activeEntityExists(entityId) {
  return state.entities.some((entity) => entity.id === entityId && !entity.deletedAt);
}

function activeCategoryExists(categoryId) {
  return state.categories.some((category) => category.id === categoryId && !category.deletedAt);
}

function pickFallbackCategory(universeId, currentCategoryId) {
  const categories = universeCategories(universeId, true).filter((category) => category.id !== currentCategoryId);
  if (!categories.length) return null;
  const categoryList = categories.map((category) => category.name).join(", ");
  const targetName = prompt(`Bu sayfanın kategorisi artık mevcut değil. Geri yüklemek için mevcut bir kategori yaz: ${categoryList}`);
  if (!targetName) return null;
  return categories.find((category) => category.name.toLocaleLowerCase("tr") === targetName.toLocaleLowerCase("tr")) || null;
}

function restoreTrashItem(kind, itemId) {
  const collection = collectionForKind(kind);
  const item = state[collection].find((entry) => entry.id === itemId);
  if (!item) return;

  if (collection === "entities" && !activeCategoryExists(item.categoryId)) {
    const fallback = pickFallbackCategory(item.universeId, item.categoryId);
    if (!fallback) {
      alert("Bu sayfa geri yüklenemedi. Önce kategorisini geri yükleyin veya mevcut bir kategori seçin.");
      return;
    }
    updateItem(collection, itemId, { categoryId: fallback.id, deletedAt: null });
    return;
  }

  if (collection === "notes" && item.entityId && !activeEntityExists(item.entityId)) {
    alert("Bu not geri yüklenemedi çünkü bağlı olduğu sayfa mevcut değil.");
    return;
  }

  if (collection === "relationships" && (!activeEntityExists(item.sourceEntityId) || !activeEntityExists(item.targetEntityId))) {
    alert("Bu ilişki geri yüklenemedi çünkü bağlı sayfalardan biri mevcut değil.");
    return;
  }

  updateItem(collection, itemId, { deletedAt: null });
}

function purgeEntityCascade(entityIds) {
  const ids = new Set(entityIds);
  state.entities = state.entities.filter((entity) => !ids.has(entity.id));
  state.notes = state.notes.filter((note) => !note.entityId || !ids.has(note.entityId));
  state.relationships = state.relationships.filter((relationship) =>
    !ids.has(relationship.sourceEntityId) && !ids.has(relationship.targetEntityId)
  );
}

function purgeTrashItem(kind, itemId) {
  const collection = collectionForKind(kind);

  if (collection === "categories") {
    const entityIds = state.entities
      .filter((entity) => entity.categoryId === itemId)
      .map((entity) => entity.id);
    purgeEntityCascade(entityIds);
    state.categories = state.categories.filter((category) => category.id !== itemId);
  } else if (collection === "entities") {
    purgeEntityCascade([itemId]);
  } else {
    state[collection] = state[collection].filter((item) => item.id !== itemId);
  }

  if (state.selectedCategoryId === itemId) state.selectedCategoryId = universeCategories()[0]?.id || null;
  if (state.selectedEntityId === itemId) state.selectedEntityId = null;
  saveState();
  render();
}

function softDelete(collection, itemId) {
  updateItem(collection, itemId, { deletedAt: now() });
}

function updateItem(collection, itemId, patch) {
  state[collection] = state[collection].map((item) =>
    item.id === itemId ? { ...item, ...patch, updatedAt: now() } : item
  );
  saveState();
  render();
}

function moveCategory(categoryId, direction) {
  const categories = universeCategories(state.selectedUniverseId, true);
  const index = categories.findIndex((category) => category.id === categoryId);
  const targetIndex = index + direction;
  if (index < 0 || targetIndex < 0 || targetIndex >= categories.length) return;
  const current = categories[index];
  const target = categories[targetIndex];
  state.categories = state.categories.map((category) => {
    if (category.id === current.id) return { ...category, order: target.order, updatedAt: now() };
    if (category.id === target.id) return { ...category, order: current.order, updatedAt: now() };
    return category;
  });
  saveState();
  render();
}

function openModal(title, bodyHtml, onSubmit) {
  const template = document.getElementById("modal-template");
  const fragment = template.content.cloneNode(true);
  const backdrop = fragment.querySelector(".modal-backdrop");
  fragment.querySelector("[data-modal-title]").textContent = title;
  fragment.querySelector("[data-modal-body]").innerHTML = bodyHtml;
  backdrop.addEventListener("click", (event) => {
    if (event.target.dataset.modalClose !== undefined) backdrop.remove();
  });
  const form = fragment.querySelector("form");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      onSubmit?.(new FormData(form));
      backdrop.remove();
    });
  }
  document.body.appendChild(fragment);
}

function openUniverseModal(universe) {
  const templates = activeItems(state.templates);
  openModal(universe ? "Evren Düzenle" : "Yeni Evren", `
    <form class="form-grid">
      <label>Evren adı <input name="name" required value="${escapeHtml(universe?.name || "")}" /></label>
      <label>Açıklama <textarea name="description">${escapeHtml(universe?.description || "")}</textarea></label>
      <label>Tema
        <select name="themeId">
          ${["system", "light", "dark", "parchment", "neon", "minimal"].map((theme) => `<option value="${theme}" ${universe?.themeId === theme ? "selected" : ""}>${theme}</option>`).join("")}
        </select>
      </label>
      ${universe ? "" : `
        <div class="template-grid">
          ${templates.map((template, index) => `
            <label class="template-option">
              <span><input type="radio" name="templateId" value="${template.id}" ${index === 0 ? "checked" : ""} /> <strong>${escapeHtml(template.name)}</strong></span>
              <small>${escapeHtml(template.description || "")}</small>
            </label>
          `).join("")}
        </div>
      `}
      <div class="button-row"><button type="submit">${universe ? "Kaydet" : "Oluştur"}</button></div>
    </form>
  `, (form) => {
    if (universe) {
      updateItem("universes", universe.id, {
        name: form.get("name"),
        description: form.get("description"),
        themeId: form.get("themeId"),
      });
      return;
    }
    const universeId = id("universe");
    const template = state.templates.find((item) => item.id === form.get("templateId")) || builtInTemplates[0];
    const newUniverse = {
      id: universeId,
      name: form.get("name"),
      description: form.get("description"),
      templateId: template.id,
      coverImage: "",
      themeId: form.get("themeId"),
      createdAt: now(),
      updatedAt: now(),
      deletedAt: null,
    };
    const categories = template.categoryPresets.map((preset, order) => ({
      id: id("category"),
      universeId,
      name: preset.name,
      description: "",
      icon: "",
      color: "",
      order,
      isDefault: true,
      isHidden: false,
      customFields: [],
      createdAt: now(),
      updatedAt: now(),
      deletedAt: null,
    }));
    state.universes.push(newUniverse);
    state.categories.push(...categories);
    state.selectedUniverseId = universeId;
    state.selectedCategoryId = categories[0]?.id || null;
    state.selectedEntityId = null;
    state.view = "universe";
    saveState();
    render();
  });
}

function openCategoryModal(category) {
  openModal(category ? "Kategori Düzenle" : "Kategori Oluştur", `
    <form class="form-grid">
      <label>Ad <input name="name" required value="${escapeHtml(category?.name || "")}" /></label>
      <label>Açıklama <textarea name="description">${escapeHtml(category?.description || "")}</textarea></label>
      <div class="two-col">
        <label>İkon <input name="icon" value="${escapeHtml(category?.icon || "")}" /></label>
        <label>Renk <input name="color" type="color" value="${escapeHtml(category?.color || "#9a4f2e")}" /></label>
      </div>
      <label>Özel alanlar <textarea name="customFields" placeholder="Ad:text&#10;Yaş:number">${escapeHtml((category?.customFields || []).map((field) => `${field.name}:${field.type}`).join("\n"))}</textarea></label>
      <div class="button-row"><button type="submit">Kaydet</button></div>
    </form>
  `, (form) => {
    const fields = String(form.get("customFields") || "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [name, type = "text"] = line.split(":").map((part) => part.trim());
        return { id: id("field"), name, type, required: false };
      });
    if (category) {
      updateItem("categories", category.id, {
        name: form.get("name"),
        description: form.get("description"),
        icon: form.get("icon"),
        color: form.get("color"),
        customFields: fields,
      });
      return;
    }
    const order = universeCategories(state.selectedUniverseId, true).length;
    state.categories.push({
      id: id("category"),
      universeId: state.selectedUniverseId,
      name: form.get("name"),
      description: form.get("description"),
      icon: form.get("icon"),
      color: form.get("color"),
      order,
      isDefault: false,
      isHidden: false,
      customFields: fields,
      createdAt: now(),
      updatedAt: now(),
      deletedAt: null,
    });
    saveState();
    render();
  });
}

function openEntityModal(entity) {
  const category = currentCategory();
  const categories = universeCategories();
  const selectedCategory = entity ? state.categories.find((item) => item.id === entity.categoryId) : category;
  const customFields = selectedCategory?.customFields || [];
  openModal(entity ? "Sayfa Düzenle" : "Sayfa Oluştur", `
    <form class="form-grid">
      <label>Başlık <input name="title" required value="${escapeHtml(entity?.title || "")}" /></label>
      <label>Kategori
        <select name="categoryId">
          ${categories.map((item) => `<option value="${item.id}" ${item.id === selectedCategory?.id ? "selected" : ""}>${escapeHtml(item.name)}</option>`).join("")}
        </select>
      </label>
      <label>Özet <textarea name="summary">${escapeHtml(entity?.summary || "")}</textarea></label>
      <label>İçerik <textarea name="content" placeholder="Markdown desteklenir">${escapeHtml(entity?.content || "")}</textarea></label>
      <label>Etiketler <input name="tags" placeholder="Ana karakter, Gizli" value="${escapeHtml((entity?.tagIds || []).map((tagId) => state.tags.find((tag) => tag.id === tagId)?.name).filter(Boolean).join(", "))}" /></label>
      ${customFields.map((field) => `
        <label>${escapeHtml(field.name)} <input name="field:${escapeHtml(field.name)}" value="${escapeHtml(entity?.customFieldValues?.[field.name] || "")}" /></label>
      `).join("")}
      <div class="button-row"><button type="submit">Kaydet</button></div>
    </form>
  `, (form) => {
    const categoryId = form.get("categoryId");
    const tagIds = ensureTags(String(form.get("tags") || ""));
    const customFieldValues = {};
    for (const [key, value] of form.entries()) {
      if (key.startsWith("field:") && value) customFieldValues[key.slice(6)] = value;
    }
    if (entity) {
      updateItem("entities", entity.id, {
        title: form.get("title"),
        categoryId,
        summary: form.get("summary"),
        content: form.get("content"),
        tagIds,
        customFieldValues,
      });
      return;
    }
    const entityId = id("entity");
    state.entities.push({
      id: entityId,
      universeId: state.selectedUniverseId,
      categoryId,
      title: form.get("title"),
      summary: form.get("summary"),
      content: form.get("content"),
      customFieldValues,
      coverImage: "",
      icon: "",
      tagIds,
      createdAt: now(),
      updatedAt: now(),
      deletedAt: null,
    });
    state.selectedEntityId = entityId;
    saveState();
    render();
  });
}

function ensureTags(tagText) {
  return tagText
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
    .map((name) => {
      const existing = activeItems(state.tags).find((tag) => tag.universeId === state.selectedUniverseId && tag.name.toLocaleLowerCase("tr") === name.toLocaleLowerCase("tr"));
      if (existing) return existing.id;
      const tag = { id: id("tag"), universeId: state.selectedUniverseId, name, color: "", createdAt: now(), updatedAt: now(), deletedAt: null };
      state.tags.push(tag);
      return tag.id;
    });
}

function openRelationshipModal() {
  const source = currentEntity();
  const targets = getRelationshipTargets(source);
  if (!source || !targets.length) {
    openModal("İlişki Oluştur", `
      <section class="empty">
        <h3>Hedef sayfa yok</h3>
        <p>İlişki oluşturmak için bu evrende seçili sayfa dışında en az bir sayfa daha olmalı.</p>
      </section>
    `);
    return;
  }
  openModal("İlişki Oluştur", `
    <form class="form-grid">
      <label>Hedef sayfa
        <select name="targetEntityId" required>
          ${targets.map((entity) => `<option value="${entity.id}">${escapeHtml(entity.title)}</option>`).join("")}
        </select>
      </label>
      <div class="two-col">
        <label>İlişki tipi <input name="type" required placeholder="müttefiki" /></label>
        <label>Ters ilişki <input name="reverseType" placeholder="müttefiki" /></label>
      </div>
      <label>Açıklama <textarea name="description"></textarea></label>
      <label>Spoiler
        <select name="spoilerLevel">
          <option value="none">none</option>
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
      </label>
      <div class="button-row"><button type="submit">Bağla</button></div>
    </form>
  `, (form) => {
    const targetEntityId = form.get("targetEntityId");
    const validTarget = getRelationshipTargets(source).some((entity) => entity.id === targetEntityId);
    if (!source || !validTarget || targetEntityId === source.id) {
      alert("Geçerli bir hedef sayfa seçilmedi.");
      return;
    }
    state.relationships.push({
      id: id("relationship"),
      universeId: state.selectedUniverseId,
      sourceEntityId: source.id,
      targetEntityId,
      type: form.get("type"),
      reverseType: form.get("reverseType"),
      description: form.get("description"),
      startDate: "",
      endDate: "",
      isHidden: false,
      spoilerLevel: form.get("spoilerLevel"),
      createdAt: now(),
      updatedAt: now(),
      deletedAt: null,
    });
    saveState();
    render();
  });
}

function openNoteModal(entityId) {
  openModal(entityId ? "Not Ekle" : "Hızlı Fikir", `
    <form class="form-grid">
      <label>Başlık <input name="title" /></label>
      <label>Tür
        <select name="type">
          ${["general", "hidden", "spoiler", "author", "rpg", "idea", "todo", "inconsistency"].map((type) => `<option value="${type}">${type}</option>`).join("")}
        </select>
      </label>
      <label>Not <textarea name="content" required placeholder="Markdown desteklenir"></textarea></label>
      <div class="button-row"><button type="submit">Kaydet</button></div>
    </form>
  `, (form) => {
    const type = form.get("type");
    state.notes.push({
      id: id("note"),
      universeId: state.selectedUniverseId,
      entityId,
      title: form.get("title"),
      content: form.get("content"),
      type,
      isPinned: false,
      isHidden: type === "hidden",
      isSpoiler: type === "spoiler",
      createdAt: now(),
      updatedAt: now(),
      deletedAt: null,
    });
    saveState();
    render();
  });
}

function openTemplateModal() {
  openModal("Özel Şablon", `
    <form class="form-grid">
      <label>Ad <input name="name" required /></label>
      <label>Açıklama <textarea name="description"></textarea></label>
      <label>Kategoriler <textarea name="categories" required placeholder="Karakterler&#10;Hanedanlar&#10;Şehirler"></textarea></label>
      <div class="button-row"><button type="submit">Kaydet</button></div>
    </form>
  `, (form) => {
    const categories = String(form.get("categories"))
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    state.templates.push({
      id: id("template"),
      name: form.get("name"),
      description: form.get("description"),
      categoryPresets: categories.map((name, order) => ({ id: id("preset"), name, order })),
      isBuiltIn: false,
      createdAt: now(),
      updatedAt: now(),
      deletedAt: null,
    });
    saveState();
    render();
  });
}

function openSettingsModal() {
  openModal("Ayarlar", `
    <form class="form-grid">
      <div class="two-col">
        <label>Tema
          <select name="theme">
            ${["light", "dark", "system", "parchment", "neon", "minimal"].map((theme) => `<option value="${theme}" ${state.settings.theme === theme ? "selected" : ""}>${theme}</option>`).join("")}
          </select>
        </label>
        <label>Yazı boyutu
          <select name="fontSize">
            ${["small", "medium", "large"].map((size) => `<option value="${size}" ${state.settings.fontSize === size ? "selected" : ""}>${size}</option>`).join("")}
          </select>
        </label>
      </div>
      <div class="two-col">
        <label>Ana renk <input name="accentColor" type="color" value="${escapeHtml(state.settings.accentColor || "#9a4f2e")}" /></label>
        <label>Çöp saklama günü <input name="trashRetentionDays" type="number" min="1" value="${state.settings.trashRetentionDays}" /></label>
      </div>
      <label><span><input name="compactMode" type="checkbox" ${state.settings.compactMode ? "checked" : ""} /> Kompakt mod</span></label>
      <label><span><input name="autoSave" type="checkbox" ${state.settings.autoSave ? "checked" : ""} /> Otomatik kaydet</span></label>
      <div class="button-row">
        <button type="submit">Kaydet</button>
        <button class="secondary" type="button" data-reset="appearance">Görünümü sıfırla</button>
        <button class="secondary" type="button" data-reset="universe">Evren görünürlüğünü sıfırla</button>
        <button class="secondary" type="button" data-reset="app">Uygulama ayarlarını sıfırla</button>
      </div>
    </form>
  `, (form) => {
    state.settings = {
      ...state.settings,
      theme: form.get("theme"),
      fontSize: form.get("fontSize"),
      accentColor: form.get("accentColor"),
      compactMode: form.get("compactMode") === "on",
      autoSave: form.get("autoSave") === "on",
      trashRetentionDays: Number(form.get("trashRetentionDays") || 30),
    };
    saveState();
    render();
  });
  document.querySelectorAll("[data-reset]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.reset === "appearance") {
        state.settings = { ...state.settings, theme: "system", fontSize: "medium", accentColor: "#9a4f2e", compactMode: false };
      }
      if (button.dataset.reset === "universe") {
        state.categories = state.categories.map((category) => category.universeId === state.selectedUniverseId ? { ...category, isHidden: false } : category);
      }
      if (button.dataset.reset === "app") {
        state.settings = { ...defaultSettings };
      }
      saveState();
      document.querySelector(".modal-backdrop")?.remove();
      render();
    });
  });
}

function exportUniverse() {
  const universe = currentUniverse();
  if (!universe) return;
  const payload = {
    version: 1,
    exportedAt: now(),
    universe,
    categories: state.categories.filter((item) => item.universeId === universe.id),
    entities: state.entities.filter((item) => item.universeId === universe.id),
    relationships: state.relationships.filter((item) => item.universeId === universe.id),
    notes: state.notes.filter((item) => item.universeId === universe.id),
    tags: state.tags.filter((item) => item.universeId === universe.id),
    template: state.templates.find((item) => item.id === universe.templateId),
    settings: state.settings,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${universe.name.replace(/[^\wğüşöçıİĞÜŞÖÇ-]+/gi, "-")}.loreforge.json`;
  link.click();
  URL.revokeObjectURL(link.href);
}

function ensureArray(value, name) {
  if (!Array.isArray(value)) throw new Error(`Import geçersiz: ${name} listesi eksik veya hatalı.`);
  return value;
}

function optionalArray(value, name) {
  if (value === undefined) return [];
  return ensureArray(value, name);
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function requireString(value, label) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Import geçersiz: ${label} eksik veya hatalı.`);
  }
}

function ensureUniqueIds(items, label) {
  const seen = new Set();
  for (const item of items) {
    if (!isPlainObject(item)) throw new Error(`Import geçersiz: ${label} içinde hatalı kayıt var.`);
    requireString(item.id, `${label}.id`);
    if (seen.has(item.id)) throw new Error(`Import geçersiz: ${label} içinde tekrarlanan id var.`);
    seen.add(item.id);
  }
  return seen;
}

function validateImportPayload(payload) {
  if (!isPlainObject(payload)) throw new Error("Geçersiz Loreforge JSON dosyası.");
  if (!isPlainObject(payload.universe)) throw new Error("Import geçersiz: evren bilgisi eksik.");
  requireString(payload.universe.id, "universe.id");
  requireString(payload.universe.name, "universe.name");

  const categories = ensureArray(payload.categories, "categories");
  const entities = ensureArray(payload.entities, "entities");
  const relationships = optionalArray(payload.relationships, "relationships");
  const notes = optionalArray(payload.notes, "notes");
  const tags = optionalArray(payload.tags, "tags");

  const categoryIds = ensureUniqueIds(categories, "categories");
  const entityIds = ensureUniqueIds(entities, "entities");
  const tagIds = ensureUniqueIds(tags, "tags");
  ensureUniqueIds(relationships, "relationships");
  ensureUniqueIds(notes, "notes");

  for (const category of categories) {
    requireString(category.name, "category.name");
  }

  for (const tag of tags) {
    requireString(tag.name, "tag.name");
  }

  for (const entity of entities) {
    requireString(entity.title, "entity.title");
    requireString(entity.categoryId, "entity.categoryId");
    if (!categoryIds.has(entity.categoryId)) {
      throw new Error(`Import geçersiz: "${entity.title}" sayfası var olmayan bir kategoriye bağlı.`);
    }
    if (!Array.isArray(entity.tagIds)) {
      throw new Error(`Import geçersiz: "${entity.title}" sayfasının tagIds alanı hatalı.`);
    }
    for (const tagId of entity.tagIds) {
      if (!tagIds.has(tagId)) {
        throw new Error(`Import geçersiz: "${entity.title}" sayfası var olmayan bir etikete bağlı.`);
      }
    }
  }

  for (const relationship of relationships) {
    requireString(relationship.sourceEntityId, "relationship.sourceEntityId");
    requireString(relationship.targetEntityId, "relationship.targetEntityId");
    requireString(relationship.type, "relationship.type");
    if (!entityIds.has(relationship.sourceEntityId) || !entityIds.has(relationship.targetEntityId)) {
      throw new Error("Import geçersiz: ilişki var olmayan bir sayfaya bağlı.");
    }
    if (relationship.sourceEntityId === relationship.targetEntityId) {
      throw new Error("Import geçersiz: bir ilişki kendi sayfasını hedefliyor.");
    }
  }

  for (const note of notes) {
    requireString(note.content, "note.content");
    if (note.entityId !== null && note.entityId !== undefined && !entityIds.has(note.entityId)) {
      throw new Error("Import geçersiz: not var olmayan bir sayfaya bağlı.");
    }
  }

  return { categories, entities, relationships, notes, tags };
}

function importUniverse() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "application/json,.json";
  input.addEventListener("change", async () => {
    const file = input.files?.[0];
    if (!file) return;
    try {
      const payload = JSON.parse(await file.text());
      const validated = validateImportPayload(payload);
      const ok = confirm(`${payload.universe.name} import edilecek. ${validated.categories.length} kategori, ${validated.entities.length} sayfa bulundu.`);
      if (!ok) return;
      const idMap = new Map();
      const mapId = (oldId, prefix) => {
        if (!idMap.has(oldId)) idMap.set(oldId, id(prefix));
        return idMap.get(oldId);
      };
      const universeId = mapId(payload.universe.id, "universe");
      state.universes.push({ ...payload.universe, id: universeId, name: `${payload.universe.name} (Import)`, createdAt: now(), updatedAt: now(), deletedAt: null });
      state.categories.push(...validated.categories.map((item) => ({ ...item, id: mapId(item.id, "category"), universeId, deletedAt: null })));
      state.tags.push(...validated.tags.map((item) => ({ ...item, id: mapId(item.id, "tag"), universeId })));
      state.entities.push(...validated.entities.map((item) => ({
        ...item,
        id: mapId(item.id, "entity"),
        universeId,
        categoryId: mapId(item.categoryId, "category"),
        tagIds: (item.tagIds || []).map((tagId) => mapId(tagId, "tag")),
        deletedAt: null,
      })));
      state.relationships.push(...validated.relationships.map((item) => ({
        ...item,
        id: mapId(item.id, "relationship"),
        universeId,
        sourceEntityId: mapId(item.sourceEntityId, "entity"),
        targetEntityId: mapId(item.targetEntityId, "entity"),
      })));
      state.notes.push(...validated.notes.map((item) => ({
        ...item,
        id: mapId(item.id, "note"),
        universeId,
        entityId: item.entityId ? mapId(item.entityId, "entity") : null,
      })));
      state.selectedUniverseId = universeId;
      state.selectedCategoryId = universeCategories(universeId, true)[0]?.id || null;
      state.selectedEntityId = null;
      state.view = "universe";
      saveState();
      render();
    } catch (error) {
      alert(error.message);
    }
  });
  input.click();
}

render();
