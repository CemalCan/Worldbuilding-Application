const STORAGE_KEY = "hikaye.mvp.state.v1";
const now = () => new Date().toISOString();
const id = (prefix) => `${prefix}_${crypto.randomUUID()}`;

const categoryFieldPresetGroups = {
  characters: [
    "Portrait image",
    "First name",
    "Last name",
    "Nickname",
    "Age",
    "Gender",
    "Species/Race",
    "Occupation",
    "Birthplace",
    "Current location",
    "Family",
    "Personality",
    "Goal",
    "Fear",
    "Secret",
    "Backstory",
  ],
  families: [
    "Crest image",
    "Family name",
    "Founder",
    "Current head",
    "Members",
    "Allies",
    "Enemies",
    "Family secret",
    "Symbol/Crest",
    "History",
  ],
  locations: [
    "Location image",
    "Location type",
    "Region",
    "Population",
    "Ruler/Owner",
    "Climate",
    "Important people",
    "Important events",
    "Description",
  ],
  events: [
    "Event type",
    "Date",
    "Location",
    "Participants",
    "Cause",
    "Result",
    "Public version",
    "True version",
  ],
  religions: [
    "Symbol image",
    "Deities",
    "Beliefs",
    "Rituals",
    "Holy places",
    "Symbols",
    "Rules/Taboos",
    "Followers",
  ],
  magic: [
    "Magic type",
    "Source",
    "Who can use it",
    "Cost",
    "Limits",
    "Risks",
    "Known users",
  ],
  items: [
    "Item image",
    "Item type",
    "Owner",
    "Previous owners",
    "Origin",
    "Powers/Properties",
    "Value",
    "History",
  ],
  organizations: [
    "Symbol image",
    "Organization type",
    "Leader",
    "Members",
    "Goal",
    "Allies",
    "Enemies",
    "Base",
    "Rules",
  ],
  rpgNpcs: [
    "Portrait image",
    "Role",
    "Voice/Mannerism",
    "Location",
    "Relationship to party",
    "Secret goal",
    "First session seen",
    "Alive/Dead",
  ],
  quests: [
    "Quest giver",
    "Location",
    "Objective",
    "Reward",
    "Status",
    "Related NPCs",
    "Hidden outcome",
  ],
  sessionNotes: [
    "Session number",
    "Date",
    "Players present",
    "Summary",
    "Decisions made",
    "Important events",
    "Loot/Rewards",
    "Next session prep",
  ],
};

const fieldPresetLabelTranslations = {
  "Portrait image": "Portre görseli",
  "Crest image": "Arma görseli",
  "Location image": "Mekan görseli",
  "Item image": "Eşya görseli",
  "Symbol image": "Sembol görseli",
  "First name": "Ad",
  "Last name": "Soyad",
  Nickname: "Lakap",
  Age: "Yaş",
  Gender: "Cinsiyet",
  "Species/Race": "Tür/Irk",
  Occupation: "Meslek",
  Birthplace: "Doğum yeri",
  "Current location": "Mevcut konum",
  Family: "Aile",
  Personality: "Kişilik",
  Goal: "Amaç",
  Fear: "Korku",
  Secret: "Sır",
  Backstory: "Geçmiş hikaye",
  "Family name": "Aile adı",
  Founder: "Kurucu",
  "Current head": "Mevcut lider",
  Members: "Üyeler",
  Allies: "Müttefikler",
  Enemies: "Düşmanlar",
  "Family secret": "Aile sırrı",
  "Symbol/Crest": "Sembol/Arma",
  History: "Tarihçe",
  "Location type": "Mekan türü",
  Region: "Bölge",
  Population: "Nüfus",
  "Ruler/Owner": "Yönetici/Sahip",
  Climate: "İklim",
  "Important people": "Önemli kişiler",
  "Important events": "Önemli olaylar",
  Description: "Açıklama",
  "Event type": "Olay türü",
  Date: "Tarih",
  Location: "Konum",
  Participants: "Katılımcılar",
  Cause: "Sebep",
  Result: "Sonuç",
  "Public version": "Herkesin bildiği versiyon",
  "True version": "Gerçek versiyon",
  Deities: "Tanrılar",
  Beliefs: "İnançlar",
  Rituals: "Ritüeller",
  "Holy places": "Kutsal mekanlar",
  Symbols: "Semboller",
  "Rules/Taboos": "Kurallar/Tabular",
  Followers: "Takipçiler",
  "Magic type": "Büyü türü",
  Source: "Kaynak",
  "Who can use it": "Kimler kullanabilir",
  Cost: "Bedel",
  Limits: "Sınırlar",
  Risks: "Riskler",
  "Known users": "Bilinen kullanıcılar",
  "Item type": "Eşya türü",
  Owner: "Sahip",
  "Previous owners": "Önceki sahipler",
  Origin: "Köken",
  "Powers/Properties": "Güçler/Özellikler",
  Value: "Değer",
  "Organization type": "Örgüt türü",
  Leader: "Lider",
  Base: "Merkez",
  Rules: "Kurallar",
  Role: "Rol",
  "Voice/Mannerism": "Ses/Tavır",
  "Relationship to party": "Partiyle ilişkisi",
  "Secret goal": "Gizli amaç",
  "First session seen": "İlk görüldüğü oturum",
  "Alive/Dead": "Yaşıyor/Ölü",
  "Quest giver": "Görevi veren",
  Objective: "Amaç",
  Reward: "Ödül",
  Status: "Durum",
  "Related NPCs": "Bağlı NPC'ler",
  "Hidden outcome": "Gizli sonuç",
  "Session number": "Oturum numarası",
  "Players present": "Katılan oyuncular",
  Summary: "Özet",
  "Decisions made": "Alınan kararlar",
  "Loot/Rewards": "Loot/Ödüller",
  "Next session prep": "Sonraki oturum hazırlığı",
};

const categoryPresetAliases = {
  characters: "characters",
  karakterler: "characters",
  detectives: "characters",
  dedektifler: "characters",
  suspects: "characters",
  "şüpheliler": "characters",
  victims: "characters",
  kurbanlar: "characters",
  commanders: "characters",
  komutanlar: "characters",
  "player characters": "characters",
  "oyuncu karakterleri": "characters",
  "party members": "characters",
  "parti üyeleri": "characters",
  "yarı tanrılar": "characters",
  families: "families",
  aileler: "families",
  dynasties: "families",
  hanedanlar: "families",
  locations: "locations",
  places: "locations",
  mekanlar: "locations",
  cities: "locations",
  "şehirler": "locations",
  villages: "locations",
  "köyler": "locations",
  castles: "locations",
  kaleler: "locations",
  megacities: "locations",
  megakentler: "locations",
  planets: "locations",
  gezegenler: "locations",
  colonies: "locations",
  koloniler: "locations",
  shelters: "locations",
  "sığınaklar": "locations",
  maps: "locations",
  haritalar: "locations",
  dungeons: "locations",
  zindanlar: "locations",
  "holy places": "locations",
  "kutsal mekanlar": "locations",
  events: "events",
  olaylar: "events",
  wars: "events",
  "savaşlar": "events",
  scenes: "events",
  sahneler: "events",
  encounters: "events",
  "encounter'lar": "events",
  religions: "religions",
  dinler: "religions",
  deities: "religions",
  gods: "religions",
  "tanrılar": "religions",
  pantheons: "religions",
  panteonlar: "religions",
  rituals: "religions",
  "ritüeller": "religions",
  magic: "magic",
  spells: "magic",
  "büyüler": "magic",
  "magic systems": "magic",
  "büyü sistemleri": "magic",
  curses: "magic",
  lanetler: "magic",
  "forbidden magic": "magic",
  "yasak büyüler": "magic",
  prophecies: "magic",
  kehanetler: "magic",
  items: "items",
  "eşyalar": "items",
  artifacts: "items",
  artefaktlar: "items",
  "sacred items": "items",
  "kutsal eşyalar": "items",
  weapons: "items",
  silahlar: "items",
  loot: "items",
  "loot / ödüller": "items",
  rewards: "items",
  organizations: "organizations",
  "örgütler": "organizations",
  guilds: "organizations",
  loncalar: "organizations",
  kingdoms: "organizations",
  "krallıklar": "organizations",
  empires: "organizations",
  "imparatorluklar": "organizations",
  companies: "organizations",
  "şirketler": "organizations",
  gangs: "organizations",
  "çeteler": "organizations",
  factions: "organizations",
  fraksiyonlar: "organizations",
  cults: "organizations",
  tarikatlar: "organizations",
  armies: "organizations",
  ordular: "organizations",
  federations: "organizations",
  federasyonlar: "organizations",
  "political alliances": "organizations",
  "politik ittifaklar": "organizations",
  "hacker groups": "organizations",
  "hacker grupları": "organizations",
  npcs: "rpgNpcs",
  "npc'ler": "rpgNpcs",
  quests: "quests",
  "görevler": "quests",
  "mission logs": "quests",
  "görev kayıtları": "quests",
  "session notes": "sessionNotes",
  "oturum notları": "sessionNotes",
};

function normalizeCategoryName(name) {
  return String(name || "")
    .toLocaleLowerCase("tr")
    .trim();
}

function getFieldPresetNames(categoryName) {
  const normalized = normalizeCategoryName(categoryName);
  const group = categoryPresetAliases[normalized];
  return group ? categoryFieldPresetGroups[group] || [] : [];
}

const entityTypeLabels = {
  en: {
    characters: { singular: "character", plural: "characters" },
    families: { singular: "family", plural: "families" },
    locations: { singular: "location", plural: "locations" },
    events: { singular: "event", plural: "events" },
    religions: { singular: "religion", plural: "religions" },
    magic: { singular: "magic entry", plural: "magic entries" },
    items: { singular: "item", plural: "items" },
    organizations: { singular: "organization", plural: "organizations" },
    rpgNpcs: { singular: "NPC", plural: "NPCs" },
    quests: { singular: "quest", plural: "quests" },
    sessionNotes: { singular: "session note", plural: "session notes" },
    entry: { singular: "entry", plural: "entries" },
  },
  tr: {
    characters: { singular: "Karakter", plural: "karakter" },
    families: { singular: "Aile", plural: "aile" },
    locations: { singular: "Mekan", plural: "mekan" },
    events: { singular: "Olay", plural: "olay" },
    religions: { singular: "Din", plural: "din" },
    magic: { singular: "Büyü", plural: "büyü" },
    items: { singular: "Eşya", plural: "eşya" },
    organizations: { singular: "Örgüt", plural: "örgüt" },
    rpgNpcs: { singular: "NPC", plural: "NPC" },
    quests: { singular: "Görev", plural: "görev" },
    sessionNotes: { singular: "Oturum notu", plural: "oturum notu" },
    entry: { singular: "Kayıt", plural: "kayıt" },
  },
};

function getCategoryTypeKey(category) {
  return categoryPresetAliases[normalizeCategoryName(category?.name)] || "entry";
}

function getEntityTypeLabel(category, form = "singular") {
  const language = state?.settings?.language || "en";
  const key = getCategoryTypeKey(category);
  return entityTypeLabels[language]?.[key]?.[form] || entityTypeLabels.en.entry[form];
}

function createEntityLabel(category) {
  const language = state?.settings?.language || "en";
  const label = getEntityTypeLabel(category, "singular");
  return language === "tr" ? `${label} oluştur` : `Create ${label}`;
}

function editEntityLabel(category) {
  const language = state?.settings?.language || "en";
  const label = getEntityTypeLabel(category, "singular");
  return language === "tr" ? `${label} düzenle` : `Edit ${label}`;
}

function emptyEntityLabel(category) {
  const language = state?.settings?.language || "en";
  const label = getEntityTypeLabel(category, "plural");
  return language === "tr" ? `Henüz ${label} yok` : `No ${label} yet`;
}

function entityTitleRequiredMessage(category) {
  const language = state?.settings?.language || "en";
  const label = getEntityTypeLabel(category, "singular");
  return language === "tr" ? `${label} başlığı zorunludur.` : `${label[0].toUpperCase()}${label.slice(1)} title is required.`;
}

function lockedCategoryMessage(category) {
  const language = state?.settings?.language || "en";
  const typeLabel = getEntityTypeLabel(category, "singular");
  const categoryName = category?.name || "";
  if (language === "tr") {
    const entryLabel = typeLabel ? `${typeLabel[0].toLocaleLowerCase("tr")}${typeLabel.slice(1)}` : "kay\u0131t";
    return categoryName
      ? `Bu ${entryLabel} ${categoryName} kategorisine kaydedilecek.`
      : "Bu kay\u0131t bu kategoriye kaydedilecek.";
  }
  const entryLabel = typeLabel ? `${typeLabel[0].toLocaleLowerCase("en")}${typeLabel.slice(1)}` : "entry";
  return categoryName
    ? `This ${entryLabel} will be saved under ${categoryName}.`
    : "This entry will be saved under this category.";
}

function createFieldDefinitions(categoryName) {
  return getFieldPresetNames(categoryName).map((name) => ({
    id: id("field"),
    name,
    presetKey: fieldPresetKey(name),
    isBuiltIn: true,
    type: fieldTypeForPreset(name),
    required: false,
  }));
}

function fieldTypeForPreset(name) {
  return /image$/i.test(String(name || "")) ? "image" : "text";
}

function cloneFieldDefinitions(fields = []) {
  return fields.map((field) => ({ ...field, id: id("field") }));
}

function defaultFieldsForCategory(category) {
  if (!category?.isDefault) return [];
  return createFieldDefinitions(category.name);
}

function fieldPresetKey(name) {
  return `preset:${String(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "")}`;
}

function fieldStorageKey(field) {
  return field?.presetKey || field?.name || "";
}

function fieldLabel(field) {
  if (!field?.isBuiltIn && !field?.presetKey) return field?.name || "";
  if (state.settings.language === "tr") return fieldPresetLabelTranslations[field.name] || field.name;
  return field.name;
}

function isPreviewableImageUrl(value) {
  return /^(https?:\/\/|data:image\/)/i.test(String(value || "").trim());
}

function renderFieldValue(field, value) {
  if (field?.type === "image" && isPreviewableImageUrl(value)) {
    return `
      <div class="image-field-preview">
        <img src="${escapeHtml(value)}" alt="${escapeHtml(fieldLabel(field))}" loading="lazy" />
        <a href="${escapeHtml(value)}" target="_blank" rel="noreferrer">${escapeHtml(value)}</a>
      </div>
    `;
  }
  return `<p class="muted">${escapeHtml(value)}</p>`;
}

const fieldTypeOrder = [
  "text",
  "longText",
  "number",
  "date",
  "boolean",
  "select",
  "multiSelect",
  "entityReference",
  "entityReferenceList",
  "url",
  "image",
];

const fieldTypeText = {
  en: {
    text: { label: "Text", help: "Short single-line text." },
    longText: { label: "Long text", help: "Longer multi-line writing." },
    number: { label: "Number", help: "Numeric values such as age, population, or cost." },
    date: { label: "Date", help: "A calendar date or in-world date value." },
    boolean: { label: "Boolean", help: "A yes/no or true/false value." },
    select: { label: "Select", help: "Choose one value from a defined list." },
    multiSelect: { label: "Multi-select", help: "Choose multiple values from a defined list." },
    entityReference: { label: "Entity reference", help: "Link this field to another entry." },
    entityReferenceList: { label: "Entity reference list", help: "Link this field to multiple entries." },
    url: { label: "URL", help: "A web address or local URL-style value." },
    image: { label: "Image", help: "Image URL or supported local image value." },
  },
  tr: {
    text: { label: "Kısa metin", help: "Tek satırlık kısa metin." },
    longText: { label: "Uzun metin", help: "Daha uzun, çok satırlı yazı." },
    number: { label: "Sayı", help: "Yaş, nüfus veya bedel gibi sayısal değerler." },
    date: { label: "Tarih", help: "Takvim tarihi veya kurgu içi tarih değeri." },
    boolean: { label: "Evet/Hayır", help: "Evet/hayır ya da doğru/yanlış değeri." },
    select: { label: "Tek seçim", help: "Tanımlı bir listeden tek değer seçin." },
    multiSelect: { label: "Çoklu seçim", help: "Tanımlı bir listeden birden fazla değer seçin." },
    entityReference: { label: "Kayıt bağlantısı", help: "Bu alanı başka bir kayda bağlayın." },
    entityReferenceList: { label: "Kayıt bağlantı listesi", help: "Bu alanı birden fazla kayda bağlayın." },
    url: { label: "URL", help: "Web adresi veya yerel URL biçimli değer." },
    image: { label: "Görsel", help: "Görsel URL'si veya desteklenen yerel görsel değeri." },
  },
};

function fieldTypeInfo(type) {
  const language = state?.settings?.language || "en";
  return fieldTypeText[language]?.[type] || fieldTypeText.en[type] || { label: type, help: "" };
}

function fieldTypePromptText() {
  return `${t("fieldTypePrompt")}\n${fieldTypeOrder.map((type, index) => {
    const typeInfo = fieldTypeInfo(type);
    return `${index + 1}. ${typeInfo.label} (${type}) - ${typeInfo.help}`;
  }).join("\n")}`;
}

function resolveFieldTypeInput(value) {
  const input = String(value || "").trim();
  const numericIndex = Number(input);
  if (Number.isInteger(numericIndex) && numericIndex >= 1 && numericIndex <= fieldTypeOrder.length) {
    return fieldTypeOrder[numericIndex - 1];
  }
  const normalized = input.toLocaleLowerCase("tr");
  return fieldTypeOrder.find((type) => {
    const typeInfo = fieldTypeInfo(type);
    return type.toLocaleLowerCase("tr") === normalized || typeInfo.label.toLocaleLowerCase("tr") === normalized;
  }) || "";
}

function renderEntityCustomFieldInput(field, entity) {
  return `
    <label>${escapeHtml(fieldLabel(field))}
      <input name="field:${escapeHtml(fieldStorageKey(field))}" value="${escapeHtml(entity?.customFieldValues?.[fieldStorageKey(field)] ?? entity?.customFieldValues?.[field.name] ?? "")}" />
    </label>
  `;
}

function renderFieldManager(fields, category) {
  const rows = [...fields, ...Array.from({ length: 3 }, () => ({ id: "", name: "", type: "text", required: false }))];
  return `
    <section class="card stack" data-field-manager>
      <div class="row">
        <h3 class="section-title">${t("customFieldsLabel")}</h3>
        <button class="secondary" type="button" data-reset-category-fields>${t("resetFields")}</button>
      </div>
      <p class="muted">${t("addFieldHint")}</p>
      <div class="stack">
        ${rows.map((field, index) => `
          <div class="two-col">
            <label>${t("fieldName")}
              <input name="fieldName" value="${escapeHtml(fieldLabel(field))}" />
            </label>
            <label>${t("fieldType")}
              <select name="fieldType" title="${escapeHtml(fieldTypeInfo(field.type || "text").help)}">
                ${fieldTypeOrder.map((type) => {
                  const typeInfo = fieldTypeInfo(type);
                  return `<option value="${type}" title="${escapeHtml(typeInfo.help)}" ${field.type === type ? "selected" : ""}>${escapeHtml(typeInfo.label)}</option>`;
                }).join("")}
              </select>
              <small class="muted">${escapeHtml(fieldTypeInfo(field.type || "text").help)}</small>
            </label>
            <label>${t("fieldOrder")}
              <input name="fieldOrder" type="number" min="1" value="${index + 1}" />
            </label>
            <input type="hidden" name="fieldId" value="${escapeHtml(field.id || "")}" />
            <input type="hidden" name="fieldPresetKey" value="${escapeHtml(field.presetKey || "")}" />
            <input type="hidden" name="fieldOriginalName" value="${escapeHtml(field.name || "")}" />
            <input type="hidden" name="fieldBuiltIn" value="${field.isBuiltIn ? "true" : "false"}" />
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function collectCategoryFields(form) {
  const names = form.getAll("fieldName");
  const types = form.getAll("fieldType");
  const orders = form.getAll("fieldOrder");
  const ids = form.getAll("fieldId");
  const presetKeys = form.getAll("fieldPresetKey");
  const originalNames = form.getAll("fieldOriginalName");
  const builtIns = form.getAll("fieldBuiltIn");
  return names
    .map((name, index) => ({
      id: ids[index] || id("field"),
      name: String(name || "").trim(),
      type: types[index] || "text",
      order: Number(orders[index] || index + 1),
      required: false,
      presetKey: presetKeys[index] || undefined,
      isBuiltIn: builtIns[index] === "true",
      originalName: originalNames[index] || "",
    }))
    .filter((field) => field.name)
    .sort((a, b) => a.order - b.order)
    .map(({ order, originalName, ...field }) => {
      if (field.isBuiltIn && field.presetKey && originalName) return { ...field, name: originalName };
      return { ...field, isBuiltIn: false, presetKey: undefined };
    });
}

function removedFieldsHaveValues(category, nextFields) {
  if (!category) return false;
  const nextKeys = new Set(nextFields.flatMap((field) => [fieldStorageKey(field), field.name]));
  return (category.customFields || []).some((field) => {
    const keys = [fieldStorageKey(field), field.name].filter(Boolean);
    if (keys.some((key) => nextKeys.has(key))) return false;
    return state.entities.some((entity) =>
      entity.categoryId === category.id && keys.some((key) => entity.customFieldValues?.[key])
    );
  });
}

function attachCategoryFieldReset(category) {
  document.querySelector("[data-reset-category-fields]")?.addEventListener("click", () => {
    const form = document.querySelector(".modal-backdrop form");
    const fieldSection = form?.querySelector("[data-field-manager]");
    if (!fieldSection) return;
    fieldSection.outerHTML = renderFieldManager(defaultFieldsForCategory(category), category);
    attachCategoryFieldReset(category);
  });
}

function hydrateCategoryFields(category) {
  const presetNames = new Set(getFieldPresetNames(category.name));
  return {
    ...category,
    customFields: (category.customFields || []).map((field) => {
      if (!category.isDefault || field.presetKey || !presetNames.has(field.name)) return field;
      return {
        ...field,
        presetKey: fieldPresetKey(field.name),
        isBuiltIn: true,
      };
    }),
  };
}

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
    customFields: createFieldDefinitions(categoryName),
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
  entityViewMode: "cards",
  autoSave: true,
  trashRetentionDays: 30,
  language: "en",
};

let storageRecoveryMessage = "";
let state = loadState();

const translations = {
  en: {
    idea: "Idea",
    export: "Export",
    settings: "Settings",
    newUniverse: "New Universe",
    deletedUniverses: "Deleted Universes",
    itemUniverse: "Universe",
    itemCategory: "Category",
    itemPage: "Page",
    itemNote: "Note",
    itemRelationship: "Relationship",
    itemTag: "Tag",
    universes: "Universes",
    localData: "Data is stored locally in this browser.",
    searchUniverses: "Search universes",
    noUniverses: "No universes yet",
    noUniversesHelp: "Start with a template or a blank universe to create your local archive.",
    open: "Open",
    edit: "Edit",
    delete: "Delete",
    categories: "Categories",
    addCategory: "Add category",
    searchPages: "Search pages, notes, tags",
    templates: "Templates",
    trash: "Trash",
    hiddenCategory: "category hidden.",
    hiddenCategories: "categories hidden.",
    show: "show",
    noCategory: "No category",
    page: "Page",
    category: "Category",
    up: "Up",
    down: "Down",
    hide: "Hide",
    noPages: "No pages in this category",
    noPagesHelp: "Create a character, place, event, quest, or any page you need.",
    view: "View",
    cards: "Cards",
    listView: "List",
    noSummary: "No summary.",
    createPage: "Create Page",
    editPage: "Edit Page",
    list: "List",
    noTags: "No tags",
    noContent: "No content added.",
    customFields: "Custom Fields",
    ideaInbox: "Idea Inbox",
    noInboxNotes: "No unattached quick notes.",
    links: "Links",
    addRelationship: "Add relationship",
    relationshipNeedsTarget: "Create another page in this universe before adding a relationship.",
    noOutgoing: "No outgoing relationships.",
    noIncoming: "No incoming relationships.",
    notes: "Notes",
    addNote: "Add note",
    noNotes: "No notes on this page.",
    deleteRelationship: "Delete Relationship",
    attach: "Attach",
    customTemplate: "Custom Template",
    builtIn: "Built-in",
    custom: "Custom",
    deletedAt: "Deleted at",
    restore: "Restore",
    permanentDelete: "Delete Permanently",
    emptyTrash: "Trash is empty",
    emptyTrashHelp: "Deleted items are kept here first.",
    confirmUniverseDelete: "This universe will be moved to trash. Continue?",
    categoryDeletePrompt: "Category delete: 1=move pages to trash, 2=move pages to another category, 3=hide only",
    categoryMovePrompt: "Move pages to which category?",
    targetCategoryMissing: "Valid target category not found.",
    confirmPageDelete: "This page will be moved to trash. Continue?",
    confirmRelationshipDelete: "This relationship will be moved to trash.",
    confirmNoteDelete: "This note will be moved to trash.",
    attachNotePrompt: "Which page should this note attach to? Enter the page title.",
    pageNotFound: "Page not found.",
    confirmTemplateDelete: "Delete custom template?",
    confirmPermanentDelete: "This cannot be undone. Are you sure you want to permanently delete it?",
    fallbackCategoryPrompt: "This page's category no longer exists. Enter an existing category to restore it:",
    entityRestoreBlocked: "This page could not be restored. Restore its category first or choose an existing category.",
    noteRestoreBlocked: "This note could not be restored because its linked page does not exist.",
    relationshipRestoreBlocked: "This relationship could not be restored because one of its linked pages does not exist.",
    universeEdit: "Edit Universe",
    universeCreate: "New Universe",
    universeName: "Universe name",
    description: "Description",
    theme: "Theme",
    save: "Save",
    create: "Create",
    universeNameRequired: "Universe name is required.",
    pageTitleRequired: "Page title is required.",
    categoryEdit: "Edit Category",
    categoryCreate: "Create Category",
    name: "Name",
    icon: "Icon",
    color: "Color",
    customFieldsLabel: "Custom fields",
    fieldName: "Field name",
    fieldType: "Field type",
    fieldOrder: "Order",
    addFieldHint: "Use empty rows to add custom fields. Clear a field name to remove it. Change order numbers to reorder.",
    resetFields: "Reset fields to default",
    removedFieldWarning: "Some removed fields have existing page values. The values will be preserved as raw data, but hidden from the category form. Continue?",
    addFieldToCategory: "Add field to this category",
    fieldNameRequired: "Field name is required.",
    fieldTypePrompt: "Choose a field type by number or key:",
    categoryLocked: "Category is locked for this entry.",
    title: "Title",
    summary: "Summary",
    content: "Content",
    markdownSupported: "Markdown supported",
    tags: "Tags",
    targetPageMissingTitle: "No target page",
    targetPageMissingHelp: "Create at least one other page in this universe before adding a relationship.",
    targetPage: "Target page",
    relationshipType: "Relationship type",
    reverseRelationship: "Reverse relationship",
    validTargetMissing: "A valid target page was not selected.",
    noteType: "Type",
    note: "Note",
    templateName: "Template name",
    categoriesLabel: "Categories",
    fontSize: "Font size",
    accentColor: "Accent color",
    trashRetention: "Trash retention days",
    compactMode: "Compact mode",
    autoSave: "Auto-save",
    language: "Language",
    english: "English",
    turkish: "Turkish",
    resetAppearance: "Reset appearance",
    resetUniverse: "Reset universe visibility",
    resetApp: "Reset app settings",
    importConfirm: "will be imported.",
    importCounts: "categories,",
    importPages: "pages found.",
    wizardBasicInfo: "Basic Info",
    wizardTemplate: "Template",
    wizardCategories: "Categories",
    wizardAppearance: "Appearance",
    wizardReview: "Review",
    next: "Next",
    back: "Back",
    selectedCategories: "Selected categories",
    selectAtLeastOneCategory: "Select at least one category.",
    reviewName: "Name",
    reviewTemplate: "Template",
    reviewAppearance: "Appearance",
    reviewCategories: "Categories",
    noDescription: "No description.",
  },
  tr: {
    idea: "Fikir",
    export: "Export",
    settings: "Ayarlar",
    newUniverse: "Yeni Evren",
    deletedUniverses: "Silinen Evrenler",
    itemUniverse: "Evren",
    itemCategory: "Kategori",
    itemPage: "Sayfa",
    itemNote: "Not",
    itemRelationship: "İlişki",
    itemTag: "Etiket",
    universes: "Evrenler",
    localData: "Veriler bu tarayıcıda yerel olarak saklanır.",
    searchUniverses: "Evren ara",
    noUniverses: "Henüz evren yok",
    noUniversesHelp: "Bir şablon seçerek ya da boş evrenle başlayarak yerel arşivini oluştur.",
    open: "Aç",
    edit: "Düzenle",
    delete: "Sil",
    categories: "Kategoriler",
    addCategory: "Kategori ekle",
    searchPages: "Sayfa, not, etiket ara",
    templates: "Şablonlar",
    trash: "Çöp Kutusu",
    hiddenCategory: "kategori gizli.",
    hiddenCategories: "kategori gizli.",
    show: "göster",
    noCategory: "Kategori yok",
    page: "Sayfa",
    category: "Kategori",
    up: "Yukarı",
    down: "Aşağı",
    hide: "Gizle",
    noPages: "Bu kategoride sayfa yok",
    noPagesHelp: "Karakter, mekan, olay, görev veya kendi ihtiyacına göre herhangi bir sayfa oluştur.",
    view: "Görünüm",
    cards: "Kartlar",
    listView: "Liste",
    noSummary: "Özet yok.",
    createPage: "Sayfa Oluştur",
    editPage: "Sayfa Düzenle",
    list: "Liste",
    noTags: "Etiket yok",
    noContent: "İçerik eklenmedi.",
    customFields: "Özel Alanlar",
    ideaInbox: "Fikir Kutusu",
    noInboxNotes: "Bağlanmamış hızlı not yok.",
    links: "Bağlantılar",
    addRelationship: "İlişki ekle",
    relationshipNeedsTarget: "İlişki oluşturmak için bu evrende en az bir başka sayfa olmalı.",
    noOutgoing: "Çıkış ilişkisi yok.",
    noIncoming: "Gelen ilişki yok.",
    notes: "Notlar",
    addNote: "Not ekle",
    noNotes: "Bu sayfada not yok.",
    deleteRelationship: "İlişkiyi Sil",
    attach: "Bağla",
    customTemplate: "Özel Şablon",
    builtIn: "Yerleşik",
    custom: "Özel",
    deletedAt: "Silinme tarihi",
    restore: "Geri Yükle",
    permanentDelete: "Kalıcı Sil",
    emptyTrash: "Çöp kutusu boş",
    emptyTrashHelp: "Silinen öğeler önce burada tutulur.",
    confirmUniverseDelete: "Bu evren geri dönüşüm kutusuna taşınacak. Devam etmek istiyor musun?",
    categoryDeletePrompt: "Kategori silme: 1=sayfalarla çöpe taşı, 2=sayfaları başka kategoriye taşı, 3=sadece gizle",
    categoryMovePrompt: "Sayfalar hangi kategoriye taşınsın?",
    targetCategoryMissing: "Geçerli hedef kategori bulunamadı.",
    confirmPageDelete: "Bu sayfa geri dönüşüm kutusuna taşınacak. Devam etmek istiyor musun?",
    confirmRelationshipDelete: "Bu ilişki geri dönüşüm kutusuna taşınacak.",
    confirmNoteDelete: "Bu not geri dönüşüm kutusuna taşınacak.",
    attachNotePrompt: "Not hangi sayfaya bağlansın? Sayfa başlığını yaz.",
    pageNotFound: "Sayfa bulunamadı.",
    confirmTemplateDelete: "Özel şablon silinsin mi?",
    confirmPermanentDelete: "Bu işlem geri alınamaz. Kalıcı olarak silmek istediğine emin misin?",
    fallbackCategoryPrompt: "Bu sayfanın kategorisi artık mevcut değil. Geri yüklemek için mevcut bir kategori yaz:",
    entityRestoreBlocked: "Bu sayfa geri yüklenemedi. Önce kategorisini geri yükleyin veya mevcut bir kategori seçin.",
    noteRestoreBlocked: "Bu not geri yüklenemedi çünkü bağlı olduğu sayfa mevcut değil.",
    relationshipRestoreBlocked: "Bu ilişki geri yüklenemedi çünkü bağlı sayfalardan biri mevcut değil.",
    universeEdit: "Evren Düzenle",
    universeCreate: "Yeni Evren",
    universeName: "Evren adı",
    description: "Açıklama",
    theme: "Tema",
    save: "Kaydet",
    create: "Oluştur",
    universeNameRequired: "Evren adı zorunludur.",
    pageTitleRequired: "Sayfa başlığı zorunludur.",
    categoryEdit: "Kategori Düzenle",
    categoryCreate: "Kategori Oluştur",
    name: "Ad",
    icon: "İkon",
    color: "Renk",
    customFieldsLabel: "Özel alanlar",
    fieldName: "Alan adı",
    fieldType: "Alan türü",
    fieldOrder: "Sıra",
    addFieldHint: "Özel alan eklemek için boş satırları kullanın. Bir alanı kaldırmak için adını boş bırakın. Sıralamak için sıra numaralarını değiştirin.",
    resetFields: "Alanları varsayılana döndür",
    removedFieldWarning: "Kaldırılan bazı alanlarda mevcut sayfa verileri var. Veriler ham veri olarak korunacak, ancak kategori formunda gizlenecek. Devam edilsin mi?",
    addFieldToCategory: "Bu kategoriye alan ekle",
    fieldNameRequired: "Alan adı zorunludur.",
    fieldTypePrompt: "Alan türünü numara veya anahtarla seçin:",
    categoryLocked: "Bu kayıt için kategori kilitlidir.",
    title: "Başlık",
    summary: "Özet",
    content: "İçerik",
    markdownSupported: "Markdown desteklenir",
    tags: "Etiketler",
    targetPageMissingTitle: "Hedef sayfa yok",
    targetPageMissingHelp: "İlişki oluşturmak için bu evrende seçili sayfa dışında en az bir sayfa daha olmalı.",
    targetPage: "Hedef sayfa",
    relationshipType: "İlişki tipi",
    reverseRelationship: "Ters ilişki",
    validTargetMissing: "Geçerli bir hedef sayfa seçilmedi.",
    noteType: "Tür",
    note: "Not",
    templateName: "Şablon adı",
    categoriesLabel: "Kategoriler",
    fontSize: "Yazı boyutu",
    accentColor: "Ana renk",
    trashRetention: "Çöp saklama günü",
    compactMode: "Kompakt mod",
    autoSave: "Otomatik kaydet",
    language: "Dil",
    english: "İngilizce",
    turkish: "Türkçe",
    resetAppearance: "Görünümü sıfırla",
    resetUniverse: "Evren görünürlüğünü sıfırla",
    resetApp: "Uygulama ayarlarını sıfırla",
    importConfirm: "import edilecek.",
    importCounts: "kategori,",
    importPages: "sayfa bulundu.",
    wizardBasicInfo: "Temel Bilgi",
    wizardTemplate: "Şablon",
    wizardCategories: "Kategoriler",
    wizardAppearance: "Görünüm",
    wizardReview: "Önizleme",
    next: "İleri",
    back: "Geri",
    selectedCategories: "Seçili kategoriler",
    selectAtLeastOneCategory: "En az bir kategori seçin.",
    reviewName: "Ad",
    reviewTemplate: "Şablon",
    reviewAppearance: "Görünüm",
    reviewCategories: "Kategoriler",
    noDescription: "Açıklama yok.",
  },
};

function t(key) {
  const language = state?.settings?.language || "en";
  return translations[language]?.[key] || translations.en[key] || key;
}

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
      categories: Array.isArray(parsed.categories) ? parsed.categories.map(hydrateCategoryFields) : [],
      entities: Array.isArray(parsed.entities) ? parsed.entities : [],
      relationships: Array.isArray(parsed.relationships) ? parsed.relationships : [],
      notes: Array.isArray(parsed.notes) ? parsed.notes : [],
      tags: Array.isArray(parsed.tags) ? parsed.tags : [],
      templates: [...builtInTemplates, ...customTemplates],
      settings: { ...defaultSettings, ...(parsed.settings || {}) },
    };
  } catch (error) {
    console.warn("Loreforge could not read stored data.", error);
    storageRecoveryMessage = "Saved local data could not be read. Loreforge started with a safe empty state. Check any exported backup before clearing browser data.";
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
      ${state.view === "trash" && !universe ? renderTrash(null) : universe && state.view !== "home" ? renderWorkspace(universe) : renderHome()}
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
        ${universe ? `<button class="secondary" data-action="quick-note">${t("idea")}</button>` : ""}
        ${universe ? `<button class="secondary" data-action="export-universe">${t("export")}</button>` : ""}
        <button class="secondary" data-action="settings">${t("settings")}</button>
        <button data-action="new-universe">${t("newUniverse")}</button>
      </div>
    </header>
  `;
}

function renderHome() {
  return `
    <main class="home">
      <section class="home__header">
        <div>
          <h2>${t("universes")}</h2>
          <p>${t("localData")}</p>
        </div>
        <div class="toolbar">
          <input class="search-box" data-search placeholder="${t("searchUniverses")}" value="${escapeHtml(state.search)}" />
          <button class="secondary" data-action="import-universe">Import</button>
          <button class="secondary" data-action="trash">${t("trash")}</button>
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
          <h3>${t("noUniverses")}</h3>
          <p>${t("noUniversesHelp")}</p>
          <button data-action="new-universe">${t("newUniverse")}</button>
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
        <button data-action="open-universe" data-id="${universe.id}">${t("open")}</button>
        <button class="secondary" data-action="edit-universe" data-id="${universe.id}">${t("edit")}</button>
        <button class="danger" data-action="delete-universe" data-id="${universe.id}">${t("delete")}</button>
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
        <h2>${t("categories")}</h2>
        <button class="icon-button" data-action="new-category" title="${t("addCategory")}">+</button>
      </div>
      <input data-search placeholder="${t("searchPages")}" value="${escapeHtml(state.search)}" />
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
        <button class="secondary" data-action="templates">${t("templates")}</button>
        <button class="secondary" data-action="trash">${t("trash")}</button>
      </div>
      ${hiddenCategories.length ? `
        <div class="stack">
          <p class="muted">${hiddenCategories.length} ${hiddenCategories.length === 1 ? t("hiddenCategory") : t("hiddenCategories")}</p>
          ${hiddenCategories.map((category) => `
            <button class="secondary" data-action="show-category" data-id="${category.id}">${escapeHtml(category.name)} ${t("show")}</button>
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
        <h2>${escapeHtml(category?.name || t("noCategory"))}</h2>
        ${category ? `
          <button data-action="new-entity">${createEntityLabel(category)}</button>
          <button class="secondary" data-action="edit-category" data-id="${category.id}">${t("category")}</button>
          <button class="secondary" data-action="move-category-up" data-id="${category.id}">${t("up")}</button>
          <button class="secondary" data-action="move-category-down" data-id="${category.id}">${t("down")}</button>
          <button class="secondary" data-action="hide-category" data-id="${category.id}">${t("hide")}</button>
          <button class="danger" data-action="delete-category" data-id="${category.id}">${t("delete")}</button>
        ` : ""}
      </section>
      ${entity ? renderEntityDetail(entity) : renderEntityList(entities, category)}
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

function renderEntityList(entities, category) {
  const viewMode = state.settings.entityViewMode === "list" ? "list" : "cards";
  if (!entities.length) {
    return `
      <section class="empty">
        <h3>${emptyEntityLabel(category)}</h3>
        <p>${t("noPagesHelp")}</p>
        <button data-action="new-entity">${createEntityLabel(category)}</button>
      </section>
    `;
  }
  return `
    <div class="list-toolbar">
      <div class="segmented-control" aria-label="${escapeHtml(t("view"))}">
        <button class="${viewMode === "cards" ? "is-active" : ""}" data-action="set-entity-view" data-mode="cards">${t("cards")}</button>
        <button class="${viewMode === "list" ? "is-active" : ""}" data-action="set-entity-view" data-mode="list">${t("listView")}</button>
      </div>
    </div>
    <section class="entity-list entity-list--${viewMode}">
      ${entities.map((entity) => viewMode === "list" ? renderEntityRow(entity) : renderEntityCard(entity)).join("")}
    </section>
  `;
}

function entityImageValue(entity) {
  const category = state.categories.find((item) => item.id === entity.categoryId);
  const imageField = (category?.customFields || []).find((field) => field.type === "image");
  const value = imageField ? entity.customFieldValues?.[fieldStorageKey(imageField)] || entity.customFieldValues?.[imageField.name] : "";
  return isPreviewableImageUrl(value) ? value : "";
}

function entityTagNames(entity) {
  return (entity.tagIds || [])
    .map((tagId) => state.tags.find((tag) => tag.id === tagId)?.name)
    .filter(Boolean);
}

function renderEntityRow(entity) {
  return `
    <button class="entity-row" data-action="select-entity" data-id="${entity.id}">
      <h3>${escapeHtml(entity.title)}</h3>
      <small>${escapeHtml(entity.summary || t("noSummary"))}</small>
    </button>
  `;
}

function renderEntityCard(entity) {
  const imageValue = entityImageValue(entity);
  const tags = entityTagNames(entity).slice(0, 3);
  return `
    <button class="entity-card" data-action="select-entity" data-id="${entity.id}">
      ${imageValue ? `<img class="entity-card__image" src="${escapeHtml(imageValue)}" alt="${escapeHtml(entity.title)}" loading="lazy" />` : ""}
      <span class="entity-card__body">
        <strong>${escapeHtml(entity.title)}</strong>
        <small>${escapeHtml(entity.summary || t("noSummary"))}</small>
        ${tags.length ? `<span class="tag-row">${tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</span>` : ""}
      </span>
    </button>
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
          <button class="secondary" data-action="back-to-list">${t("list")}</button>
          <button data-action="edit-entity" data-id="${entity.id}">${t("edit")}</button>
          <button class="danger" data-action="delete-entity" data-id="${entity.id}">${t("delete")}</button>
        </div>
      </div>
      <div class="badge-list">
        ${tags.map((tag) => `<span class="badge">${escapeHtml(tag.name)}</span>`).join("") || `<span class="badge">${t("noTags")}</span>`}
      </div>
      <article class="card markdown">${markdownToHtml(entity.content || t("noContent"))}</article>
      ${renderCustomFields(entity)}
    </section>
  `;
}

function renderCustomFields(entity) {
  const category = state.categories.find((item) => item.id === entity.categoryId);
  const values = entity.customFieldValues || {};
  const builtInEntries = (category?.customFields || [])
    .map((field) => {
      const key = fieldStorageKey(field);
      const value = values[key] ?? values[field.name];
      return value ? [fieldLabel(field), value, key, field] : null;
    })
    .filter(Boolean);
  const knownKeys = new Set((category?.customFields || []).flatMap((field) => [fieldStorageKey(field), field.name]));
  const extraEntries = Object.entries(values)
    .filter(([key]) => !knownKeys.has(key))
    .map(([key, value]) => [key, value, key, null]);
  const entries = [...builtInEntries, ...extraEntries];
  if (!entries.length) return "";
  return `
    <section class="card stack">
      <h3 class="section-title">${t("customFields")}</h3>
      ${entries.map(([label, value, , field]) => `
        <div>
          <strong>${escapeHtml(label)}</strong>
          ${renderFieldValue(field, value)}
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
        <h2>${t("ideaInbox")}</h2>
        ${inboxNotes.length ? inboxNotes.map(renderNoteCard).join("") : `<p class="muted">${t("noInboxNotes")}</p>`}
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
        <h2>${t("links")}</h2>
        <button class="icon-button" data-action="new-relationship" title="${t("addRelationship")}" ${relationshipTargets.length ? "" : "disabled"}>+</button>
      </div>
      ${relationshipTargets.length ? "" : `<p class="muted">${t("relationshipNeedsTarget")}</p>`}
      ${outgoing.length ? outgoing.map((rel) => renderRelationship(rel, false)).join("") : `<p class="muted">${t("noOutgoing")}</p>`}
      <h2>Backlinks</h2>
      ${incoming.length ? incoming.map((rel) => renderRelationship(rel, true)).join("") : `<p class="muted">${t("noIncoming")}</p>`}
      <div class="row">
        <h2>${t("notes")}</h2>
        <button class="icon-button" data-action="new-note" title="${t("addNote")}">+</button>
      </div>
      ${notes.length ? notes.map(renderNoteCard).join("") : `<p class="muted">${t("noNotes")}</p>`}
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
    <button class="secondary" data-action="delete-relationship" data-id="${rel.id}">${t("deleteRelationship")}</button>
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
        ${!note.entityId && currentUniverse() ? `<button class="secondary" data-action="attach-note" data-id="${note.id}">${t("attach")}</button>` : ""}
        <button class="danger" data-action="delete-note" data-id="${note.id}">${t("delete")}</button>
      </div>
    </article>
  `;
}

function renderTemplates() {
  const templates = activeItems(state.templates);
  return `
    <main class="main stack">
      <section class="toolbar">
        <h2>${t("templates")}</h2>
        <button data-action="new-template">${t("customTemplate")}</button>
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
              <span class="badge">${template.isBuiltIn ? t("builtIn") : t("custom")}</span>
            </div>
            ${template.isBuiltIn ? "" : `<button class="danger" data-action="delete-template" data-id="${template.id}">${t("delete")}</button>`}
          </article>
        `).join("")}
      </section>
    </main>
  `;
}

function renderTrash(universe) {
  const universeId = universe?.id || state.selectedUniverseId;
  const deletedUniverses = state.universes.filter((item) => item.deletedAt).map((item) => ["universe", item]);
  const deletedUniverseItems = universeId ? [
    ...state.categories.filter((item) => item.universeId === universeId && item.deletedAt).map((item) => ["category", item]),
    ...state.entities.filter((item) => item.universeId === universeId && item.deletedAt).map((item) => ["page", item]),
    ...state.notes.filter((item) => item.universeId === universeId && item.deletedAt).map((item) => ["note", item]),
    ...state.relationships.filter((item) => item.universeId === universeId && item.deletedAt).map((item) => ["relationship", item]),
    ...state.tags.filter((item) => item.universeId === universeId && item.deletedAt).map((item) => ["tag", item]),
  ] : [];
  const deleted = [...deletedUniverses, ...deletedUniverseItems];
  return `
    <main class="main stack">
      <h2>${t("trash")}</h2>
      ${deletedUniverses.length ? `<p class="muted">${t("deletedUniverses")}: ${deletedUniverses.length}</p>` : ""}
      ${deleted.length ? deleted.map(([type, item]) => `
        <article class="trash-row">
          <strong>${trashKindLabel(type)}: ${escapeHtml(item.name || item.title || item.type || item.content?.slice(0, 32) || item.id)}</strong>
          <small>${t("deletedAt")}: ${new Date(item.deletedAt).toLocaleString(state.settings.language === "tr" ? "tr-TR" : "en-US")}</small>
          <div class="button-row">
            <button data-action="restore-item" data-kind="${type}" data-id="${item.id}">${t("restore")}</button>
            <button class="danger" data-action="purge-item" data-kind="${type}" data-id="${item.id}">${t("permanentDelete")}</button>
          </div>
        </article>
      `).join("") : `<section class="empty"><h3>${t("emptyTrash")}</h3><p>${t("emptyTrashHelp")}</p></section>`}
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
  "new-universe"() {
    openUniverseModal();
  },
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
    if (!confirm(t("confirmUniverseDelete"))) return;
    softDelete("universes", universeId);
    if (state.selectedUniverseId === universeId) {
      state.selectedUniverseId = null;
      state.selectedCategoryId = null;
      state.selectedEntityId = null;
      state.view = "home";
    }
    saveState();
    render();
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
    const choice = prompt(t("categoryDeletePrompt"), "1");
    if (choice === "3") return updateItem("categories", categoryId, { isHidden: true });
    if (choice === "2") {
      const targetName = prompt(t("categoryMovePrompt"));
      const target = universeCategories().find((category) => category.name.toLocaleLowerCase("tr") === targetName?.toLocaleLowerCase("tr"));
      if (!target || target.id === categoryId) return alert(t("targetCategoryMissing"));
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
  "new-entity"() {
    openEntityModal();
  },
  "set-entity-view"({ mode }) {
    state.settings.entityViewMode = mode === "list" ? "list" : "cards";
    saveState();
    refreshSearchResults();
  },
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
    if (!confirm(t("confirmPageDelete"))) return;
    softDelete("entities", entityId);
    setState({ selectedEntityId: null });
  },
  "new-relationship": openRelationshipModal,
  "delete-relationship"({ id: relationshipId }) {
    if (!confirm(t("confirmRelationshipDelete"))) return;
    softDelete("relationships", relationshipId);
  },
  "new-note": () => openNoteModal(currentEntity()?.id || null),
  "quick-note": () => openNoteModal(null),
  "delete-note"({ id: noteId }) {
    if (!confirm(t("confirmNoteDelete"))) return;
    softDelete("notes", noteId);
  },
  "attach-note"({ id: noteId }) {
    const title = prompt(t("attachNotePrompt"));
    const entity = universeEntities().find((item) => item.title.toLocaleLowerCase("tr") === title?.toLocaleLowerCase("tr"));
    if (!entity) return alert(t("pageNotFound"));
    updateItem("notes", noteId, { entityId: entity.id });
  },
  templates() {
    setState({ view: "templates", selectedEntityId: null });
  },
  "new-template": openTemplateModal,
  "delete-template"({ id: templateId }) {
    if (!confirm(t("confirmTemplateDelete"))) return;
    softDelete("templates", templateId);
  },
  trash() {
    setState({ view: "trash", selectedEntityId: null });
  },
  "restore-item"({ kind, id: itemId }) {
    restoreTrashItem(kind, itemId);
  },
  "purge-item"({ kind, id: itemId }) {
    if (!confirm(t("confirmPermanentDelete"))) return;
    purgeTrashItem(kind, itemId);
  },
  settings: openSettingsModal,
  "export-universe": exportUniverse,
  "import-universe": importUniverse,
};

function collectionForKind(kind) {
  return {
    universe: "universes",
    category: "categories",
    page: "entities",
    note: "notes",
    relationship: "relationships",
    tag: "tags",
  }[kind] || "entities";
}

function trashKindLabel(kind) {
  return {
    universe: t("itemUniverse"),
    category: t("itemCategory"),
    page: t("itemPage"),
    note: t("itemNote"),
    relationship: t("itemRelationship"),
    tag: t("itemTag"),
  }[kind] || kind;
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
  const targetName = prompt(`${t("fallbackCategoryPrompt")} ${categoryList}`);
  if (!targetName) return null;
  return categories.find((category) => category.name.toLocaleLowerCase("tr") === targetName.toLocaleLowerCase("tr")) || null;
}

function restoreTrashItem(kind, itemId) {
  const collection = collectionForKind(kind);
  const item = state[collection].find((entry) => entry.id === itemId);
  if (!item) return;

  if (collection === "universes") {
    updateItem(collection, itemId, { deletedAt: null });
    state.selectedUniverseId = itemId;
    state.selectedCategoryId = universeCategories(itemId)[0]?.id || null;
    state.selectedEntityId = null;
    state.view = "universe";
    saveState();
    render();
    return;
  }

  if (collection === "entities" && !activeCategoryExists(item.categoryId)) {
    const fallback = pickFallbackCategory(item.universeId, item.categoryId);
    if (!fallback) {
      alert(t("entityRestoreBlocked"));
      return;
    }
    updateItem(collection, itemId, { categoryId: fallback.id, deletedAt: null });
    return;
  }

  if (collection === "notes" && item.entityId && !activeEntityExists(item.entityId)) {
    alert(t("noteRestoreBlocked"));
    return;
  }

  if (collection === "relationships" && (!activeEntityExists(item.sourceEntityId) || !activeEntityExists(item.targetEntityId))) {
    alert(t("relationshipRestoreBlocked"));
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

function purgeUniverseCascade(universeId) {
  state.relationships = state.relationships.filter((relationship) => relationship.universeId !== universeId);
  state.notes = state.notes.filter((note) => note.universeId !== universeId);
  state.tags = state.tags.filter((tag) => tag.universeId !== universeId);
  state.entities = state.entities.filter((entity) => entity.universeId !== universeId);
  state.categories = state.categories.filter((category) => category.universeId !== universeId);
  state.universes = state.universes.filter((universe) => universe.id !== universeId);
}

function purgeTrashItem(kind, itemId) {
  const collection = collectionForKind(kind);

  if (collection === "universes") {
    purgeUniverseCascade(itemId);
  } else if (collection === "categories") {
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

  if (state.selectedUniverseId === itemId) state.selectedUniverseId = null;
  if (state.selectedCategoryId === itemId) state.selectedCategoryId = universeCategories()[0]?.id || null;
  if (state.selectedEntityId === itemId) state.selectedEntityId = null;
  if (!currentUniverse()) {
    state.selectedUniverseId = null;
    state.selectedCategoryId = null;
    state.selectedEntityId = null;
    state.view = state.view === "trash" ? "trash" : "home";
  }
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
      const result = onSubmit?.(new FormData(form));
      if (result !== false) backdrop.remove();
    });
  }
  document.body.appendChild(fragment);
  return backdrop;
}

function openUniverseModal(universe) {
  const isEditing = Boolean(universe?.id);
  if (!isEditing) {
    openUniverseWizard();
    return;
  }

  openModal(t("universeEdit"), `
    <form class="form-grid">
      <label>${t("universeName")} <input name="name" required value="${escapeHtml(universe?.name || "")}" /></label>
      <label>${t("description")} <textarea name="description">${escapeHtml(universe?.description || "")}</textarea></label>
      <label>${t("theme")}
        <select name="themeId">
          ${["system", "light", "dark", "parchment", "neon", "minimal"].map((theme) => `<option value="${theme}" ${universe?.themeId === theme ? "selected" : ""}>${theme}</option>`).join("")}
        </select>
      </label>
      <div class="button-row"><button type="submit">${t("save")}</button></div>
    </form>
  `, (form) => {
    const name = String(form.get("name") || "").trim();
    if (!name) {
      alert(t("universeNameRequired"));
      return false;
    }

    updateItem("universes", universe.id, {
      name,
      description: form.get("description"),
      themeId: form.get("themeId"),
    });
  });
}

function createUniverseFromSelection({ name, description, templateId, themeId, categoryPresets }) {
  const universeId = id("universe");
  const selectedPresets = categoryPresets.length ? categoryPresets : [{ name: t("notes") }];
  const newUniverse = {
    id: universeId,
    name,
    description,
    templateId,
    coverImage: "",
    themeId,
    createdAt: now(),
    updatedAt: now(),
    deletedAt: null,
  };
  const categories = selectedPresets.map((preset, order) => ({
    id: id("category"),
    universeId,
    name: preset.name,
    description: "",
    icon: "",
    color: "",
    order,
    isDefault: true,
    isHidden: false,
    customFields: cloneFieldDefinitions(preset.customFields || []),
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
  state.search = "";
  saveState();
  render();
}

function openUniverseWizard() {
  const templates = activeItems(state.templates);
  const wizard = {
    step: 0,
    name: "",
    description: "",
    templateId: templates[0]?.id || builtInTemplates[0].id,
    themeId: state.settings.theme || "system",
    selectedCategoryNames: new Set((templates[0] || builtInTemplates[0]).categoryPresets.map((preset) => preset.name)),
  };
  const stepKeys = ["wizardBasicInfo", "wizardTemplate", "wizardCategories", "wizardAppearance", "wizardReview"];
  const template = document.getElementById("modal-template");
  const fragment = template.content.cloneNode(true);
  const backdrop = fragment.querySelector(".modal-backdrop");
  const title = fragment.querySelector("[data-modal-title]");
  const body = fragment.querySelector("[data-modal-body]");

  const getTemplate = () => templates.find((item) => item.id === wizard.templateId) || templates[0] || builtInTemplates[0];
  const close = () => backdrop.remove();
  backdrop.addEventListener("click", (event) => {
    if (event.target.dataset.modalClose !== undefined) close();
  });

  function syncInputs() {
    const nameInput = body.querySelector("[data-wizard-name]");
    const descriptionInput = body.querySelector("[data-wizard-description]");
    const themeInput = body.querySelector("[data-wizard-theme]");
    if (nameInput) wizard.name = nameInput.value.trim();
    if (descriptionInput) wizard.description = descriptionInput.value;
    if (themeInput) wizard.themeId = themeInput.value;
  }

  function validateStep() {
    syncInputs();
    if (wizard.step === 0 && !wizard.name) {
      alert(t("universeNameRequired"));
      return false;
    }
    if (wizard.step === 2 && wizard.selectedCategoryNames.size === 0) {
      alert(t("selectAtLeastOneCategory"));
      return false;
    }
    return true;
  }

  function renderWizard() {
    const currentTemplate = getTemplate();
    title.textContent = t("universeCreate");
    const stepLabel = `${wizard.step + 1}. ${t(stepKeys[wizard.step])}`;
    const categoryPresets = currentTemplate.categoryPresets || [];
    const selectedCategories = categoryPresets.filter((preset) => wizard.selectedCategoryNames.has(preset.name));
    const content = [
      `<div class="wizard-steps">${stepKeys.map((key, index) => `<span class="badge ${index === wizard.step ? "is-active" : ""}">${index + 1}. ${t(key)}</span>`).join("")}</div>`,
      `<h3>${stepLabel}</h3>`,
      wizard.step === 0 ? `
        <div class="form-grid">
          <label>${t("universeName")} <input data-wizard-name required value="${escapeHtml(wizard.name)}" /></label>
          <label>${t("description")} <textarea data-wizard-description>${escapeHtml(wizard.description)}</textarea></label>
        </div>
      ` : "",
      wizard.step === 1 ? `
        <div class="template-grid">
          ${templates.map((item) => `
            <label class="template-option">
              <span><input type="radio" name="wizardTemplate" value="${item.id}" ${item.id === wizard.templateId ? "checked" : ""} /> <strong>${escapeHtml(item.name)}</strong></span>
              <small>${escapeHtml(item.description || t("noDescription"))}</small>
            </label>
          `).join("")}
        </div>
      ` : "",
      wizard.step === 2 ? `
        <p class="muted">${t("selectedCategories")}: ${selectedCategories.length}</p>
        <div class="template-grid">
          ${categoryPresets.map((preset) => `
            <label class="template-option">
              <span><input type="checkbox" data-wizard-category value="${escapeHtml(preset.name)}" ${wizard.selectedCategoryNames.has(preset.name) ? "checked" : ""} /> <strong>${escapeHtml(preset.name)}</strong></span>
            </label>
          `).join("")}
        </div>
      ` : "",
      wizard.step === 3 ? `
        <label>${t("theme")}
          <select data-wizard-theme>
            ${["system", "light", "dark", "parchment", "neon", "minimal"].map((theme) => `<option value="${theme}" ${wizard.themeId === theme ? "selected" : ""}>${theme}</option>`).join("")}
          </select>
        </label>
      ` : "",
      wizard.step === 4 ? `
        <div class="card stack">
          <p><strong>${t("reviewName")}:</strong> ${escapeHtml(wizard.name)}</p>
          <p><strong>${t("description")}:</strong> ${escapeHtml(wizard.description || t("noDescription"))}</p>
          <p><strong>${t("reviewTemplate")}:</strong> ${escapeHtml(currentTemplate.name)}</p>
          <p><strong>${t("reviewAppearance")}:</strong> ${escapeHtml(wizard.themeId)}</p>
          <p><strong>${t("reviewCategories")}:</strong> ${selectedCategories.map((preset) => escapeHtml(preset.name)).join(", ")}</p>
        </div>
      ` : "",
      `<div class="button-row">
        <button class="secondary" type="button" data-wizard-back ${wizard.step === 0 ? "disabled" : ""}>${t("back")}</button>
        ${wizard.step < stepKeys.length - 1
          ? `<button type="button" data-wizard-next>${t("next")}</button>`
          : `<button type="button" data-wizard-create>${t("create")}</button>`}
      </div>`,
    ].join("");
    body.innerHTML = content;

    body.querySelectorAll("input[name='wizardTemplate']").forEach((input) => {
      input.addEventListener("change", () => {
        syncInputs();
        wizard.templateId = input.value;
        wizard.selectedCategoryNames = new Set(getTemplate().categoryPresets.map((preset) => preset.name));
        renderWizard();
      });
    });
    body.querySelectorAll("[data-wizard-category]").forEach((input) => {
      input.addEventListener("change", () => {
        if (input.checked) wizard.selectedCategoryNames.add(input.value);
        else wizard.selectedCategoryNames.delete(input.value);
      });
    });
    body.querySelector("[data-wizard-back]")?.addEventListener("click", () => {
      syncInputs();
      wizard.step = Math.max(0, wizard.step - 1);
      renderWizard();
    });
    body.querySelector("[data-wizard-next]")?.addEventListener("click", () => {
      if (!validateStep()) return;
      wizard.step = Math.min(stepKeys.length - 1, wizard.step + 1);
      renderWizard();
    });
    body.querySelector("[data-wizard-create]")?.addEventListener("click", () => {
      if (!validateStep()) return;
      createUniverseFromSelection({
        name: wizard.name,
        description: wizard.description,
        templateId: wizard.templateId,
        themeId: wizard.themeId,
        categoryPresets: categoryPresets.filter((preset) => wizard.selectedCategoryNames.has(preset.name)),
      });
      close();
    });
  }

  renderWizard();
  document.body.appendChild(fragment);
}

function openCategoryModal(category) {
  const fields = category?.customFields || [];
  openModal(category ? t("categoryEdit") : t("categoryCreate"), `
    <form class="form-grid">
      <label>${t("name")} <input name="name" required value="${escapeHtml(category?.name || "")}" /></label>
      <label>${t("description")} <textarea name="description">${escapeHtml(category?.description || "")}</textarea></label>
      <div class="two-col">
        <label>${t("icon")} <input name="icon" value="${escapeHtml(category?.icon || "")}" /></label>
        <label>${t("color")} <input name="color" type="color" value="${escapeHtml(category?.color || "#9a4f2e")}" /></label>
      </div>
      ${renderFieldManager(fields, category)}
      <div class="button-row"><button type="submit">${t("save")}</button></div>
    </form>
  `, (form) => {
    const fields = collectCategoryFields(form);
    if (removedFieldsHaveValues(category, fields) && !confirm(t("removedFieldWarning"))) return false;
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
  attachCategoryFieldReset(category);
}

function openEntityModal(entity) {
  const isEditing = Boolean(entity?.id);
  const category = currentCategory();
  const categories = universeCategories();
  const selectedCategory = isEditing ? state.categories.find((item) => item.id === entity.categoryId) : category;
  const customFields = selectedCategory?.customFields || [];
  if (!selectedCategory) {
    alert(t("targetCategoryMissing"));
    return;
  }
  const backdrop = openModal(isEditing ? editEntityLabel(selectedCategory) : createEntityLabel(selectedCategory), `
    <form class="form-grid">
      <label>${t("title")} <input name="title" required value="${escapeHtml(entity?.title || "")}" /></label>
      <div class="card stack">
        <strong>${t("category")}: ${escapeHtml(selectedCategory.name)}</strong>
        <p class="muted">${escapeHtml(lockedCategoryMessage(selectedCategory))}</p>
      </div>
      <label>${t("summary")} <textarea name="summary">${escapeHtml(entity?.summary || "")}</textarea></label>
      <label>${t("content")} <textarea name="content" placeholder="${t("markdownSupported")}">${escapeHtml(entity?.content || "")}</textarea></label>
      <label>${t("tags")} <input name="tags" placeholder="Main character, Secret" value="${escapeHtml((entity?.tagIds || []).map((tagId) => state.tags.find((tag) => tag.id === tagId)?.name).filter(Boolean).join(", "))}" /></label>
      <div class="stack" data-entity-fields>
        ${customFields.map((field) => renderEntityCustomFieldInput(field, entity)).join("")}
      </div>
      <button class="secondary" type="button" data-add-entity-field>${t("addFieldToCategory")}</button>
      <div class="button-row"><button type="submit">${t("save")}</button></div>
    </form>
  `, (form) => {
    const title = String(form.get("title") || "").trim();
    if (!title) {
      alert(entityTitleRequiredMessage(selectedCategory));
      return false;
    }
    const categoryId = selectedCategory.id;
    if (!categories.some((item) => item.id === categoryId)) {
      alert(t("targetCategoryMissing"));
      return false;
    }
    const tagIds = ensureTags(String(form.get("tags") || ""));
    const customFieldValues = {};
    for (const [key, value] of form.entries()) {
      if (key.startsWith("field:") && value) customFieldValues[key.slice(6)] = value;
    }
    if (isEditing) {
      updateItem("entities", entity.id, {
        title,
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
      title,
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
    state.selectedCategoryId = categoryId;
    saveState();
    render();
  });
  backdrop?.querySelector("[data-add-entity-field]")?.addEventListener("click", () => {
    const fieldName = String(prompt(t("fieldName")) || "").trim();
    if (!fieldName) return alert(t("fieldNameRequired"));
    const fieldType = resolveFieldTypeInput(prompt(fieldTypePromptText(), "1"));
    if (!fieldType) return alert(t("fieldType"));
    const field = {
      id: id("field"),
      name: fieldName,
      type: fieldType,
      required: false,
      isBuiltIn: false,
    };
    selectedCategory.customFields = [...(selectedCategory.customFields || []), field];
    selectedCategory.updatedAt = now();
    state.categories = state.categories.map((item) => item.id === selectedCategory.id ? selectedCategory : item);
    saveState();
    backdrop.querySelector("[data-entity-fields]")?.insertAdjacentHTML("beforeend", renderEntityCustomFieldInput(field, entity));
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
    openModal(t("addRelationship"), `
      <section class="empty">
        <h3>${t("targetPageMissingTitle")}</h3>
        <p>${t("targetPageMissingHelp")}</p>
      </section>
    `);
    return;
  }
  openModal(t("addRelationship"), `
    <form class="form-grid">
      <label>${t("targetPage")}
        <select name="targetEntityId" required>
          ${targets.map((entity) => `<option value="${entity.id}">${escapeHtml(entity.title)}</option>`).join("")}
        </select>
      </label>
      <div class="two-col">
        <label>${t("relationshipType")} <input name="type" required placeholder="ally" /></label>
        <label>${t("reverseRelationship")} <input name="reverseType" placeholder="ally" /></label>
      </div>
      <label>${t("description")} <textarea name="description"></textarea></label>
      <label>Spoiler
        <select name="spoilerLevel">
          <option value="none">none</option>
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
      </label>
      <div class="button-row"><button type="submit">${t("attach")}</button></div>
    </form>
  `, (form) => {
    const targetEntityId = form.get("targetEntityId");
    const validTarget = getRelationshipTargets(source).some((entity) => entity.id === targetEntityId);
    if (!source || !validTarget || targetEntityId === source.id) {
      alert(t("validTargetMissing"));
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
  openModal(entityId ? t("addNote") : t("idea"), `
    <form class="form-grid">
      <label>${t("title")} <input name="title" /></label>
      <label>${t("noteType")}
        <select name="type">
          ${["general", "hidden", "spoiler", "author", "rpg", "idea", "todo", "inconsistency"].map((type) => `<option value="${type}">${type}</option>`).join("")}
        </select>
      </label>
      <label>${t("note")} <textarea name="content" required placeholder="${t("markdownSupported")}"></textarea></label>
      <div class="button-row"><button type="submit">${t("save")}</button></div>
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
  openModal(t("customTemplate"), `
    <form class="form-grid">
      <label>${t("name")} <input name="name" required /></label>
      <label>${t("description")} <textarea name="description"></textarea></label>
      <label>${t("categoriesLabel")} <textarea name="categories" required placeholder="Characters&#10;Families&#10;Cities"></textarea></label>
      <div class="button-row"><button type="submit">${t("save")}</button></div>
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
  openModal(t("settings"), `
    <form class="form-grid">
      <div class="two-col">
        <label>${t("theme")}
          <select name="theme">
            ${["light", "dark", "system", "parchment", "neon", "minimal"].map((theme) => `<option value="${theme}" ${state.settings.theme === theme ? "selected" : ""}>${theme}</option>`).join("")}
          </select>
        </label>
        <label>${t("fontSize")}
          <select name="fontSize">
            ${["small", "medium", "large"].map((size) => `<option value="${size}" ${state.settings.fontSize === size ? "selected" : ""}>${size}</option>`).join("")}
          </select>
        </label>
      </div>
      <div class="two-col">
        <label>${t("accentColor")} <input name="accentColor" type="color" value="${escapeHtml(state.settings.accentColor || "#9a4f2e")}" /></label>
        <label>${t("trashRetention")} <input name="trashRetentionDays" type="number" min="1" value="${state.settings.trashRetentionDays}" /></label>
      </div>
      <label>${t("language")}
        <select name="language">
          <option value="en" ${state.settings.language === "en" ? "selected" : ""}>${t("english")}</option>
          <option value="tr" ${state.settings.language === "tr" ? "selected" : ""}>${t("turkish")}</option>
        </select>
      </label>
      <label><span><input name="compactMode" type="checkbox" ${state.settings.compactMode ? "checked" : ""} /> ${t("compactMode")}</span></label>
      <label><span><input name="autoSave" type="checkbox" ${state.settings.autoSave ? "checked" : ""} /> ${t("autoSave")}</span></label>
      <div class="button-row">
        <button type="submit">${t("save")}</button>
        <button class="secondary" type="button" data-reset="appearance">${t("resetAppearance")}</button>
        <button class="secondary" type="button" data-reset="universe">${t("resetUniverse")}</button>
        <button class="secondary" type="button" data-reset="app">${t("resetApp")}</button>
      </div>
    </form>
  `, (form) => {
    state.settings = {
      ...state.settings,
      theme: form.get("theme"),
      fontSize: form.get("fontSize"),
      accentColor: form.get("accentColor"),
      language: form.get("language"),
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
      const ok = confirm(`${payload.universe.name} ${t("importConfirm")} ${validated.categories.length} ${t("importCounts")} ${validated.entities.length} ${t("importPages")}`);
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
