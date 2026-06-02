const STORAGE_KEY = "hikaye.mvp.state.v1";
const now = () => new Date().toISOString();
const id = (prefix) => `${prefix}_${crypto.randomUUID()}`;
const IMAGE_UPLOAD_MAX_BYTES = 2 * 1024 * 1024;

const categoryFieldPresetGroups = {
  campaign: ["Campaign name", "Setting", "System", "Tone", "Current arc", "Party level", "Main conflict", "Important factions", "Open questions", "Next session prep"],
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
    "First name",
    "Last name",
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
  partyMembers: ["Portrait image", "Player", "Character name", "Class/Role", "Level", "Species/Race", "Party role", "Goals", "Secrets", "Important relationships"],
  sessionNotes: [
    "Session number",
    "Date",
    "Players present",
    "Summary",
    "Decisions made",
    "Important events",
    "Open questions",
    "Loot/rewards",
    "Next session prep",
  ],
  species: ["Species/Race", "Origin", "Homeland", "Physical traits", "Culture", "Language", "Abilities", "Weaknesses", "History"],
  cultures: ["Culture name", "Region", "Values", "Traditions", "Taboos", "Language", "Clothing", "Food", "History"],
  languages: ["Language name", "Speakers", "Region", "Writing system", "Common phrases", "Origin", "Related languages"],
  governments: ["Government type", "Ruler/Owner", "Capital", "Laws", "Allies", "Enemies", "History"],
  wars: ["War name", "Date", "Location", "Participants", "Cause", "Result", "Important events", "Aftermath"],
  creatures: ["Creature image", "Species/Race", "Habitat", "Behavior", "Abilities", "Weaknesses", "Threat level", "Description"],
  myths: ["Title", "Culture", "Origin", "Main figures", "Moral", "Public version", "True version"],
  technologies: ["Technology type", "Creator", "Users", "Purpose", "Limits", "Risks", "History"],
  planets: ["Planet image", "Region", "Population", "Climate", "Important people", "Important events", "Description"],
  starSystems: ["System name", "Region", "Planets", "Star type", "Factions", "Important events", "Description"],
  spaceships: ["Ship image", "Ship type", "Owner", "Crew", "Origin", "Powers/Properties", "History"],
  crimeCases: ["Case type", "Date", "Location", "Victim", "Suspects", "Evidence", "Clues", "Status", "True version"],
  evidence: ["Evidence type", "Location found", "Related people", "Public version", "True version", "Status"],
  clues: ["Clue type", "Location", "Related case", "Meaning", "False lead", "Status"],
  dungeons: ["Dungeon map", "Location", "Purpose", "Rooms", "Traps", "Enemies", "Treasure", "Secrets", "Description"],
  encounters: ["Encounter type", "Enemies", "Difficulty", "Map/Location", "Traps", "Alternative solutions", "Rewards", "Result"],
  lootRewards: ["Item image", "Reward type", "Owner", "Origin", "Powers/Properties", "Value", "Who received it", "History"],
  ruleNotes: ["Rule topic", "Source", "Ruling", "Applies to", "Example", "Session used", "Notes"],
};

const fieldPresetLabelTranslations = {
  "Portrait image": "Portre görseli",
  "Crest image": "Arma görseli",
  "Location image": "Mekân görseli",
  "Item image": "Eşya görseli",
  "Symbol image": "Sembol görseli",
  "Creature image": "Yaratık görseli",
  "Planet image": "Gezegen görseli",
  "Ship image": "Gemi görseli",
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
  Origin: "Köken",
  Homeland: "Anayurt",
  "Physical traits": "Fiziksel özellikler",
  Culture: "Kültür",
  Language: "Dil",
  Abilities: "Yetenekler",
  Weaknesses: "Zayıflıklar",
  "Culture name": "Kültür adı",
  Values: "Değerler",
  Traditions: "Gelenekler",
  Taboos: "Tabular",
  Clothing: "Giyim",
  Food: "Yemek",
  "Language name": "Dil adı",
  Speakers: "Konuşanlar",
  "Writing system": "Yazı sistemi",
  "Common phrases": "Yaygın ifadeler",
  "Related languages": "İlgili diller",
  "Government type": "Yönetim türü",
  Capital: "Başkent",
  Laws: "Yasalar",
  "War name": "Savaş adı",
  Aftermath: "Sonrası",
  Habitat: "Yaşam alanı",
  Behavior: "Davranış",
  "Threat level": "Tehdit seviyesi",
  "Main figures": "Ana figürler",
  Moral: "Ders",
  "Technology type": "Teknoloji türü",
  Creator: "Yaratıcı",
  Users: "Kullanıcılar",
  Purpose: "Amaç",
  "System name": "Sistem adı",
  Planets: "Gezegenler",
  "Star type": "Yıldız türü",
  Factions: "Fraksiyonlar",
  "Ship type": "Gemi türü",
  Crew: "Mürettebat",
  "Case type": "Dosya türü",
  Victim: "Kurban",
  Suspects: "Şüpheliler",
  Evidence: "Kanıt",
  Clues: "İpuçları",
  "Evidence type": "Kanıt türü",
  "Location found": "Bulunduğu yer",
  "Related people": "İlgili kişiler",
  "Clue type": "İpucu türü",
  "Related case": "İlgili dosya",
  Meaning: "Anlam",
  "False lead": "Yanlış ipucu",
  "Encounter type": "Karşılaşma türü",
  "Campaign name": "Campaign adı",
  Setting: "Ortam",
  System: "Sistem",
  Tone: "Ton",
  "Current arc": "Mevcut hikâye kolu",
  "Party level": "Parti seviyesi",
  "Main conflict": "Ana çatışma",
  "Important factions": "Önemli fraksiyonlar",
  "Open questions": "Açık sorular",
  Player: "Oyuncu",
  "Character name": "Karakter adı",
  "Class/Role": "Sınıf/Rol",
  Level: "Seviye",
  "Party role": "Parti rolü",
  Goals: "Hedefler",
  Secrets: "Sırlar",
  "Important relationships": "Önemli ilişkiler",
  "Loot/rewards": "Loot/ödüller",
  "Dungeon map": "Zindan haritası",
  Rooms: "Odalar",
  Traps: "Tuzaklar",
  Treasure: "Hazine",
  Enemies: "Düşmanlar",
  Difficulty: "Zorluk",
  "Map/Location": "Harita/Mekân",
  "Alternative solutions": "Alternatif çözümler",
  Rewards: "Ödüller",
  "Reward type": "Ödül türü",
  "Who received it": "Kim aldı",
  "Rule topic": "Kural konusu",
  Ruling: "Hüküm",
  "Applies to": "Uygulandığı durum",
  Example: "Örnek",
  "Session used": "Kullanıldığı oturum",
};

const categoryPresetAliases = {
  campaign: "campaign",
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
  species: "species",
  races: "species",
  "species/races": "species",
  irklar: "species",
  türler: "species",
  "uzaylı türler": "species",
  cultures: "cultures",
  kültürler: "cultures",
  languages: "languages",
  diller: "languages",
  governments: "governments",
  kingdoms: "governments",
  empires: "governments",
  "governments/kingdoms": "governments",
  krallıklar: "governments",
  imparatorluklar: "governments",
  wars: "wars",
  savaşlar: "wars",
  creatures: "creatures",
  bestiary: "creatures",
  monsters: "creatures",
  canavarlar: "creatures",
  yaratıklar: "creatures",
  "creatures/bestiary": "creatures",
  myths: "myths",
  legends: "myths",
  "myths/legends": "myths",
  efsaneler: "myths",
  mitler: "myths",
  prophecies: "myths",
  kehanetler: "myths",
  technologies: "technologies",
  teknolojiler: "technologies",
  "siber implantlar": "technologies",
  "antik teknolojiler": "technologies",
  planets: "planets",
  gezegenler: "planets",
  "star systems": "starSystems",
  "yıldız sistemleri": "starSystems",
  spaceships: "spaceships",
  "space ships": "spaceships",
  "uzay gemileri": "spaceships",
  corporations: "organizations",
  şirketler: "organizations",
  gangs: "organizations",
  çeteler: "organizations",
  "crime cases": "crimeCases",
  "suç dosyaları": "crimeCases",
  mysteries: "crimeCases",
  gizemler: "crimeCases",
  evidence: "evidence",
  deliller: "evidence",
  witnesses: "evidence",
  tanıklar: "evidence",
  statements: "evidence",
  ifadeler: "evidence",
  clues: "clues",
  ipuçları: "clues",
  alibis: "clues",
  alibiler: "clues",
  motives: "clues",
  motifler: "clues",
  encounters: "encounters",
  "encounter'lar": "encounters",
  "player characters": "partyMembers",
  "oyuncu karakterleri": "partyMembers",
  "party members": "partyMembers",
  "parti üyeleri": "partyMembers",
  dungeons: "dungeons",
  zindanlar: "dungeons",
  "loot / ödüller": "lootRewards",
  "loot/rewards": "lootRewards",
  rewards: "lootRewards",
  loot: "lootRewards",
  gods: "religions",
  tanrılar: "religions",
  "rule notes": "ruleNotes",
  "kural notları": "ruleNotes",
  encounters: "encounters",
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
    species: { singular: "species", plural: "species" },
    cultures: { singular: "culture", plural: "cultures" },
    languages: { singular: "language", plural: "languages" },
    governments: { singular: "government", plural: "governments" },
    wars: { singular: "war", plural: "wars" },
    creatures: { singular: "creature", plural: "creatures" },
    myths: { singular: "myth", plural: "myths" },
    technologies: { singular: "technology", plural: "technologies" },
    planets: { singular: "planet", plural: "planets" },
    starSystems: { singular: "star system", plural: "star systems" },
    spaceships: { singular: "spaceship", plural: "spaceships" },
    crimeCases: { singular: "crime case", plural: "crime cases" },
    evidence: { singular: "evidence item", plural: "evidence" },
    clues: { singular: "clue", plural: "clues" },
    encounters: { singular: "encounter", plural: "encounters" },
    campaign: { singular: "campaign note", plural: "campaign notes" },
    partyMembers: { singular: "party member", plural: "party members" },
    dungeons: { singular: "dungeon", plural: "dungeons" },
    lootRewards: { singular: "reward", plural: "rewards" },
    ruleNotes: { singular: "rule note", plural: "rule notes" },
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
    species: { singular: "Tür", plural: "tür" },
    cultures: { singular: "Kültür", plural: "kültür" },
    languages: { singular: "Dil", plural: "dil" },
    governments: { singular: "Yönetim", plural: "yönetim" },
    wars: { singular: "Savaş", plural: "savaş" },
    creatures: { singular: "Yaratık", plural: "yaratık" },
    myths: { singular: "Efsane", plural: "efsane" },
    technologies: { singular: "Teknoloji", plural: "teknoloji" },
    planets: { singular: "Gezegen", plural: "gezegen" },
    starSystems: { singular: "Yıldız sistemi", plural: "yıldız sistemi" },
    spaceships: { singular: "Uzay gemisi", plural: "uzay gemisi" },
    crimeCases: { singular: "Suç dosyası", plural: "suç dosyası" },
    evidence: { singular: "Kanıt", plural: "kanıt" },
    clues: { singular: "İpucu", plural: "ipucu" },
    encounters: { singular: "Karşılaşma", plural: "karşılaşma" },
    campaign: { singular: "Campaign notu", plural: "campaign notu" },
    partyMembers: { singular: "Parti üyesi", plural: "parti üyesi" },
    dungeons: { singular: "Zindan", plural: "zindan" },
    lootRewards: { singular: "Ödül", plural: "ödül" },
    ruleNotes: { singular: "Kural notu", plural: "kural notu" },
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

function emptyEntityHelp(category) {
  const key = getCategoryTypeKey(category);
  if (key === "characters") return t("noCharactersHelp");
  if (key === "locations") return t("noLocationsHelp");
  if (key === "quests") return t("noQuestsHelp");
  if (key === "sessionNotes") return t("noSessionNotesHelp");
  if (key === "encounters") return t("noEncountersHelp");
  if (key === "lootRewards") return t("noLootHelp");
  if (key === "partyMembers") return t("noPartyMembersHelp");
  if (key === "ruleNotes") return t("noRuleNotesHelp");
  return t("noPagesHelp");
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
  return getFieldPresetNames(categoryName).map((name) => {
    const targetCategoryTypes = referenceTargetTypes(categoryName, name);
    return {
      id: id("field"),
      name,
      presetKey: fieldPresetKey(name),
      isBuiltIn: true,
      type: targetCategoryTypes.length
        ? (referenceListFieldNames.has(name) ? "entityReferenceList" : "entityReference")
        : fieldTypeForPreset(name),
      targetCategoryTypes,
      required: false,
    };
  });
}

function fieldTypeForPreset(name) {
  const fieldName = String(name || "");
  if (/image$/i.test(fieldName)) return "image";
  return referenceTargetTypes(null, fieldName).length
    ? (referenceListFieldNames.has(fieldName) ? "entityReferenceList" : "entityReference")
    : "text";
}

const referenceListFieldNames = new Set([
  "Members",
  "Allies",
  "Enemies",
  "Important people",
  "Important events",
  "Participants",
  "Related organizations",
  "Related items",
  "Deities",
  "Followers",
  "Holy places",
  "Previous owners",
  "Players present",
  "Loot/rewards",
  "Enemies",
  "Who received it",
  "Crew",
  "Planets",
  "Factions",
  "Suspects",
  "Evidence",
  "Clues",
  "Related people",
  "Related NPCs",
  "Rewards",
]);

const referenceFieldTargets = {
  campaign: {
    "Important factions": ["organizations"],
  },
  characters: {
    Family: ["families"],
    Birthplace: ["locations"],
    "Current location": ["locations"],
    Religion: ["religions"],
    Organization: ["organizations"],
    Faction: ["organizations"],
    "Owned items": ["items"],
    Items: ["items"],
  },
  families: {
    Founder: ["characters"],
    "Current head": ["characters"],
    Members: ["characters"],
    Allies: ["families", "organizations"],
    Enemies: ["families", "organizations"],
  },
  locations: {
    "Ruler/Owner": ["characters", "governments", "organizations"],
    "Important people": ["characters"],
    "Important events": ["events"],
  },
  events: {
    Location: ["locations"],
    Participants: ["characters"],
    "Related organizations": ["organizations"],
    "Related items": ["items"],
  },
  religions: {
    Deities: ["religions"],
    Followers: ["characters", "cultures"],
    "Holy places": ["locations"],
  },
  items: {
    Owner: ["characters"],
    "Previous owners": ["characters"],
    Origin: ["locations"],
    Location: ["locations"],
  },
  organizations: {
    Leader: ["characters"],
    Members: ["characters"],
    Base: ["locations"],
    Allies: ["organizations"],
    Enemies: ["organizations"],
  },
  quests: {
    "Quest giver": ["rpgNpcs", "characters"],
    "Related NPCs": ["rpgNpcs", "characters"],
    Location: ["locations", "dungeons"],
    Reward: ["lootRewards", "items"],
  },
  sessionNotes: {
    "Players present": ["partyMembers", "characters"],
    "Loot/rewards": ["lootRewards", "items"],
  },
  encounters: {
    Enemies: ["creatures", "rpgNpcs"],
    "Map/Location": ["locations", "dungeons"],
    Rewards: ["lootRewards", "items"],
  },
  dungeons: {
    Location: ["locations"],
    Enemies: ["creatures", "rpgNpcs"],
    Treasure: ["lootRewards", "items"],
  },
  lootRewards: {
    Owner: ["characters"],
    "Who received it": ["partyMembers", "characters"],
    Origin: ["locations"],
  },
  governments: {
    "Ruler/Owner": ["characters"],
    Capital: ["locations"],
    Allies: ["governments", "organizations"],
    Enemies: ["governments", "organizations"],
  },
  wars: {
    Location: ["locations"],
    Participants: ["governments", "organizations", "characters"],
    "Important events": ["events"],
  },
  planets: {
    "Important people": ["characters"],
    "Important events": ["events"],
  },
  starSystems: {
    Planets: ["planets"],
    Factions: ["organizations", "governments"],
    "Important events": ["events"],
  },
  spaceships: {
    Owner: ["characters", "organizations"],
    Crew: ["characters", "partyMembers"],
    Origin: ["locations", "planets"],
  },
  crimeCases: {
    Location: ["locations"],
    Suspects: ["characters"],
    Evidence: ["evidence"],
    Clues: ["clues"],
  },
  evidence: {
    "Location found": ["locations"],
    "Related people": ["characters"],
  },
  clues: {
    Location: ["locations"],
    "Related case": ["crimeCases"],
  },
};

function referenceTargetTypes(categoryName, fieldName) {
  const categoryType = categoryName ? getCategoryTypeKey({ name: categoryName }) : null;
  const name = String(fieldName || "");
  const byCategory = categoryType ? referenceFieldTargets[categoryType]?.[name] : null;
  if (byCategory) return byCategory;
  const generic = {
    Family: ["families"],
    Birthplace: ["locations"],
    "Current location": ["locations"],
    Location: ["locations"],
    "Map/Location": ["locations", "dungeons"],
    "Ruler/Owner": ["characters", "organizations", "governments"],
    Owner: ["characters"],
    "Previous owners": ["characters"],
    Origin: ["locations"],
    Founder: ["characters"],
    "Current head": ["characters"],
    Members: ["characters"],
    Allies: ["organizations", "families"],
    Enemies: ["organizations", "families"],
    Leader: ["characters"],
    Base: ["locations"],
    Participants: ["characters"],
    "Important people": ["characters"],
    "Important events": ["events"],
    "Quest giver": ["rpgNpcs", "characters"],
    "Related NPCs": ["rpgNpcs", "characters"],
    "Players present": ["partyMembers", "characters"],
    "Loot/rewards": ["lootRewards", "items"],
    Rewards: ["lootRewards", "items"],
    Deities: ["religions"],
    Followers: ["characters", "cultures"],
    "Holy places": ["locations"],
  };
  return generic[name] || [];
}

function enrichFieldDefinition(category, field) {
  if (!field?.isBuiltIn && !field?.presetKey) return field;
  const targets = field.targetCategoryTypes?.length ? field.targetCategoryTypes : referenceTargetTypes(category?.name, field.name);
  if (!targets.length) return field;
  return {
    ...field,
    type: field.type === "text" ? (referenceListFieldNames.has(field.name) ? "entityReferenceList" : "entityReference") : field.type,
    targetCategoryTypes: targets,
  };
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

function fieldInputValue(field, entity) {
  return entity?.customFieldValues?.[fieldStorageKey(field)] ?? entity?.customFieldValues?.[field.name] ?? "";
}

function imagePositionKey(fieldOrKey) {
  const key = typeof fieldOrKey === "string" ? fieldOrKey : fieldStorageKey(fieldOrKey);
  return `${key}:position`;
}

function parseImagePosition(value) {
  const [rawX, rawY] = String(value || "50,50").split(",");
  const x = Math.min(100, Math.max(0, Number(rawX) || 50));
  const y = Math.min(100, Math.max(0, Number(rawY) || 50));
  return { x, y };
}

function imagePositionStyle(positionValue) {
  const { x, y } = parseImagePosition(positionValue);
  return `object-position: ${x}% ${y}%;`;
}

function fieldImagePositionValue(field, entity) {
  const key = fieldStorageKey(field);
  return entity?.customFieldValues?.[imagePositionKey(key)] || entity?.customFieldValues?.[imagePositionKey(field.name)] || "50,50";
}

const fieldSectionPresets = {
  campaign: {
    Identity: ["Campaign name", "Setting", "System", "Tone"],
    Story: ["Current arc", "Main conflict", "Important factions", "Open questions"],
    Notes: ["Next session prep"],
  },
  characters: {
    Identity: ["First name", "Last name", "Nickname", "Age", "Gender", "Species/Race", "Birthplace"],
    Appearance: ["Portrait image"],
    Role: ["Occupation", "Current location", "Goal"],
    Personality: ["Personality", "Fear", "Secret"],
    Story: ["Backstory"],
    Connections: ["Family"],
  },
  families: {
    Identity: ["Crest image", "Family name", "Founder", "Current head", "Symbol/Crest"],
    Members: ["Members"],
    Politics: ["Allies", "Enemies"],
    Secrets: ["Family secret"],
    History: ["History"],
  },
  locations: {
    Basics: ["Location image", "Location type", "Description"],
    Geography: ["Region", "Climate"],
    Population: ["Population", "Important people"],
    Politics: ["Ruler/Owner"],
    "Story relevance": ["Important events"],
  },
  rpgNpcs: {
    Identity: ["Portrait image", "Role", "Location"],
    "Table use": ["Voice/Mannerism", "First session seen", "Alive/Dead"],
    "Party relationship": ["Relationship to party"],
    Secrets: ["Secret goal"],
  },
  partyMembers: {
    Identity: ["Portrait image", "Player", "Character name", "Class/Role", "Level", "Species/Race"],
    Role: ["Party role", "Goals"],
    Secrets: ["Secrets"],
    Connections: ["Important relationships"],
  },
  quests: {
    Basics: ["Quest giver", "Location", "Objective", "Status"],
    "Story relevance": ["Related NPCs", "Hidden outcome"],
    Details: ["Reward"],
  },
  sessionNotes: {
    Basics: ["Session number", "Date", "Players present"],
    Story: ["Summary", "Decisions made", "Important events", "Open questions"],
    Notes: ["Loot/rewards", "Next session prep"],
  },
  encounters: {
    Basics: ["Encounter type", "Difficulty", "Map/Location"],
    Details: ["Enemies", "Traps", "Alternative solutions", "Rewards", "Result"],
  },
  dungeons: {
    Basics: ["Dungeon map", "Location", "Purpose"],
    Details: ["Rooms", "Traps", "Enemies", "Treasure", "Secrets"],
  },
  lootRewards: {
    Basics: ["Item image", "Reward type", "Value"],
    Connections: ["Owner", "Who received it"],
    Story: ["Origin", "Powers/Properties", "History"],
  },
  ruleNotes: {
    Basics: ["Rule topic", "Source", "Ruling"],
    Details: ["Applies to", "Example", "Session used", "Notes"],
  },
};

const sectionLabelTranslations = {
  Identity: "Kimlik",
  Appearance: "Görünüm",
  Role: "Rol",
  Personality: "Kişilik",
  Story: "Hikâye",
  Connections: "Bağlantılar",
  Notes: "Notlar",
  Members: "Üyeler",
  Politics: "Politika",
  Secrets: "Sırlar",
  History: "Tarihçe",
  Basics: "Temel bilgiler",
  Geography: "Coğrafya",
  Population: "Nüfus",
  "Story relevance": "Hikâyedeki rolü",
  "Table use": "Masa kullanımı",
  "Party relationship": "Parti ilişkisi",
  Details: "Detaylar",
};

function sectionLabel(name) {
  return state.settings.language === "tr" ? sectionLabelTranslations[name] || name : name;
}

function fieldSectionName(category, field) {
  const preset = fieldSectionPresets[getCategoryTypeKey(category)] || {};
  const fieldName = field?.name || "";
  const storageKey = fieldStorageKey(field);
  for (const [section, names] of Object.entries(preset)) {
    if (names.some((name) => name === fieldName || fieldPresetKey(name) === storageKey)) return section;
  }
  return "Details";
}

function isPreviewableImageUrl(value) {
  return /^(https?:\/\/|data:image\/)/i.test(String(value || "").trim());
}

function renderFieldValue(field, value) {
  if (field?.type === "image" && isPreviewableImageUrl(value)) {
    return renderImageFieldPreview(value, fieldLabel(field), "50,50");
  }
  if (field?.type === "entityReference") {
    return renderReferenceValue(value);
  }
  if (field?.type === "entityReferenceList") {
    return renderReferenceListValue(value);
  }
  return `<p class="muted">${escapeHtml(value)}</p>`;
}

function entityByReferenceId(entityId) {
  return state.entities.find((entity) => entity.id === entityId && !entity.deletedAt) || null;
}

function renderReferenceChip(entityId) {
  const entity = entityByReferenceId(entityId);
  if (!entity) return `<span class="badge">${t("missingEntry")}</span>`;
  return `<button class="badge link-chip" data-action="select-entity" data-id="${entity.id}">${escapeHtml(entity.title)}</button>`;
}

function renderReferenceValue(value) {
  if (!value) return `<p class="muted">${t("noneCreateNew")}</p>`;
  if (!isExistingEntityId(value)) return `<p class="muted">${escapeHtml(String(value))}</p>`;
  return `<div class="tag-row">${renderReferenceChip(value)}</div>`;
}

function renderReferenceListValue(value) {
  const values = normalizeReferenceListValue(value);
  if (!values.length) return `<p class="muted">${t("noneCreateNew")}</p>`;
  const known = values.filter(isExistingEntityId);
  const legacy = values.filter((item) => !isExistingEntityId(item));
  return `
    <div class="tag-row">
      ${known.map(renderReferenceChip).join("")}
      ${legacy.map((item) => `<span class="badge">${escapeHtml(item)}</span>`).join("")}
    </div>
  `;
}

function referenceDisplayText(field, value) {
  if (field?.type === "entityReference") {
    if (!value) return "";
    return entityByReferenceId(value)?.title || (isExistingEntityId(value) ? t("missingEntry") : String(value));
  }
  if (field?.type === "entityReferenceList") {
    return normalizeReferenceListValue(value)
      .map((item) => entityByReferenceId(item)?.title || (isExistingEntityId(item) ? t("missingEntry") : item))
      .join(", ");
  }
  return String(value);
}

function renderImageFieldPreview(value, label, position = "50,50", options = {}) {
  return `
    <div class="image-field-preview" ${options.interactive ? `data-image-position-frame data-image-position="${escapeHtml(position)}"` : ""}>
      <img src="${escapeHtml(value)}" alt="${escapeHtml(label)}" loading="lazy" draggable="false" style="${imagePositionStyle(position)}" />
      ${String(value || "").startsWith("data:image/") ? `<span class="muted">${t("uploadedImage")}</span>` : `<a href="${escapeHtml(value)}" target="_blank" rel="noreferrer">${escapeHtml(value)}</a>`}
    </div>
  `;
}

function setDragImageToElement(event, element) {
  if (!event.dataTransfer || !element) return;
  const rect = element.getBoundingClientRect();
  event.dataTransfer.setDragImage(element, Math.max(0, rect.width / 2), Math.max(0, Math.min(rect.height / 2, 32)));
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
    boolean: { label: "Yes/No", help: "A yes/no or true/false value." },
    select: { label: "Single choice", help: "Choose one value from a defined list." },
    multiSelect: { label: "Multiple choice", help: "Choose multiple values from a defined list." },
    entityReference: { label: "Entry link", help: "Link this field to another entry." },
    entityReferenceList: { label: "Entry link list", help: "Link this field to multiple entries." },
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

function renderFieldTypeOptions(selectedType = "text") {
  return fieldTypeOrder.map((type) => {
    const typeInfo = fieldTypeInfo(type);
    return `<option value="${type}" title="${escapeHtml(typeInfo.help)}" ${selectedType === type ? "selected" : ""}>${escapeHtml(typeInfo.label)}</option>`;
  }).join("");
}

function renderEntityCustomFieldInput(field, entity) {
  const value = fieldInputValue(field, entity);
  const isImage = field.type === "image";
  const isReference = field.type === "entityReference" || field.type === "entityReferenceList";
  if (isReference) return renderReferenceFieldInput(field, entity, value);
  const visibleUrlValue = isImage && String(value).startsWith("data:image/") ? "" : value;
  const position = isImage ? fieldImagePositionValue(field, entity) : "50,50";
  const positionKey = imagePositionKey(field);
  return `
    <div class="field-entry ${isImage ? "field-entry--image" : ""}" data-entity-field data-field-id="${escapeHtml(field.id || "")}" data-field-key="${escapeHtml(fieldStorageKey(field))}" data-field-name="${escapeHtml(field.name || "")}">
      <button class="field-drag-handle" type="button" draggable="true" tabindex="-1" data-entity-field-drag-handle title="${escapeHtml(t("dragToReorder"))}" aria-label="${escapeHtml(t("dragToReorder"))}">☰</button>
      <label>${escapeHtml(fieldLabel(field))}
        ${isImage ? `<span class="muted">${t("uploadImage")}</span><small class="muted">${t("imageStorageHelp")}</small><input type="file" accept="image/png,image/jpeg,image/webp,image/gif" data-image-file-input />` : ""}
        ${isImage ? `<span class="muted">${t("pasteImageUrl")}</span>` : ""}
        <input
          ${isImage ? "" : `name="field:${escapeHtml(fieldStorageKey(field))}"`}
          ${isImage ? `inputmode="url" placeholder="${escapeHtml(t("imageFieldPlaceholder"))}" data-image-url-input` : ""}
          value="${escapeHtml(visibleUrlValue)}"
        />
        ${isImage ? `<input type="hidden" name="field:${escapeHtml(fieldStorageKey(field))}" value="${escapeHtml(value)}" data-image-field-input />` : ""}
        ${isImage ? `<input type="hidden" name="field:${escapeHtml(positionKey)}" value="${escapeHtml(position)}" data-image-position-input />` : ""}
      </label>
      ${isImage ? `<div class="image-field-preview-slot">${isPreviewableImageUrl(value) ? renderImageFieldPreview(value, fieldLabel(field), position, { interactive: true }) : ""}</div>` : ""}
      ${isImage ? `<div class="button-row image-position-actions"><button class="secondary" type="button" tabindex="-1" data-reset-image-position>${t("resetImagePosition")}</button><button class="secondary danger-text" type="button" tabindex="-1" data-remove-image-field>${t("removeImage")}</button></div>` : ""}
      <button class="secondary danger-text" type="button" tabindex="-1" data-remove-entity-field>${t("removeField")}</button>
    </div>
  `;
}

function groupFieldsBySection(category, fields) {
  return fields.reduce((groups, field) => {
    const section = fieldSectionName(category, field);
    if (!groups.has(section)) groups.set(section, []);
    groups.get(section).push(field);
    return groups;
  }, new Map());
}

function renderEntityFormSections(category, fields, entity) {
  const groups = groupFieldsBySection(category, fields);
  return [...groups.entries()].map(([section, sectionFields]) => `
    <section class="form-section stack" data-form-section="${escapeHtml(section)}">
      <h3 class="section-title">${escapeHtml(sectionLabel(section))}</h3>
      ${sectionFields.map((field) => renderEntityCustomFieldInput(field, entity)).join("")}
    </section>
  `).join("");
}

function appendFieldToEntityForm(container, category, field, entity) {
  const section = fieldSectionName(category, field);
  let sectionElement = [...container.querySelectorAll("[data-form-section]")].find((item) => item.dataset.formSection === section);
  if (!sectionElement) {
    container.insertAdjacentHTML("beforeend", `
      <section class="form-section stack" data-form-section="${escapeHtml(section)}">
        <h3 class="section-title">${escapeHtml(sectionLabel(section))}</h3>
      </section>
    `);
    sectionElement = [...container.querySelectorAll("[data-form-section]")].find((item) => item.dataset.formSection === section);
  }
  sectionElement?.insertAdjacentHTML("beforeend", renderEntityCustomFieldInput(field, entity));
}

function syncEntityFieldValuesFromForm(container, values = {}) {
  container.querySelectorAll("[name^='field:']").forEach((input) => {
    values[input.name.slice(6)] = input.value;
  });
  return values;
}

function refreshEntityFieldSections(container, category, entity, values) {
  const draftEntity = {
    ...(entity || {}),
    customFieldValues: values,
  };
  container.innerHTML = renderEntityFormSections(category, category.customFields || [], draftEntity);
}

function moveEntityFormField(container, category, fieldElement, direction, entity) {
  const fieldId = fieldElement?.dataset.fieldId || "";
  const fieldKey = fieldElement?.dataset.fieldKey || "";
  const fields = [...(category.customFields || [])];
  const index = fields.findIndex((field) => (fieldId && field.id === fieldId) || fieldStorageKey(field) === fieldKey);
  const targetIndex = index + direction;
  if (index < 0 || targetIndex < 0 || targetIndex >= fields.length) return;
  const values = syncEntityFieldValuesFromForm(container, { ...(entity?.customFieldValues || {}) });
  [fields[index], fields[targetIndex]] = [fields[targetIndex], fields[index]];
  category.customFields = fields;
  category.updatedAt = now();
  state.categories = state.categories.map((item) => item.id === category.id ? category : item);
  saveState();
  refreshEntityFieldSections(container, category, entity, values);
}

function reorderEntityFormField(container, category, sourceElement, targetElement, entity) {
  const sourceId = sourceElement?.dataset.fieldId || "";
  const sourceKey = sourceElement?.dataset.fieldKey || "";
  const targetId = targetElement?.dataset.fieldId || "";
  const targetKey = targetElement?.dataset.fieldKey || "";
  const fields = [...(category.customFields || [])];
  const sourceIndex = fields.findIndex((field) => (sourceId && field.id === sourceId) || fieldStorageKey(field) === sourceKey);
  const targetIndex = fields.findIndex((field) => (targetId && field.id === targetId) || fieldStorageKey(field) === targetKey);
  if (sourceIndex < 0 || targetIndex < 0 || sourceIndex === targetIndex) return;
  const values = syncEntityFieldValuesFromForm(container, { ...(entity?.customFieldValues || {}) });
  const [source] = fields.splice(sourceIndex, 1);
  fields.splice(targetIndex, 0, source);
  category.customFields = fields;
  category.updatedAt = now();
  state.categories = state.categories.map((item) => item.id === category.id ? category : item);
  saveState();
  refreshEntityFieldSections(container, category, entity, values);
}

function setImagePreviewPosition(fieldElement, x, y) {
  const positionInput = fieldElement?.querySelector("[data-image-position-input]");
  const preview = fieldElement?.querySelector("[data-image-position-frame]");
  const image = preview?.querySelector("img");
  const position = `${Math.round(x)},${Math.round(y)}`;
  if (positionInput) positionInput.value = position;
  if (preview) preview.dataset.imagePosition = position;
  if (image) image.style.objectPosition = `${x}% ${y}%`;
}

function setImagePreviewPositionFromPointer(fieldElement, event) {
  const preview = fieldElement?.querySelector("[data-image-position-frame]");
  if (!preview) return;
  const rect = preview.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  const x = Math.min(100, Math.max(0, ((event.clientX - rect.left) / rect.width) * 100));
  const y = Math.min(100, Math.max(0, ((event.clientY - rect.top) / rect.height) * 100));
  setImagePreviewPosition(fieldElement, x, y);
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
          <div class="field-editor-row two-col" data-field-editor-row>
            <button class="field-drag-handle" type="button" draggable="true" tabindex="-1" data-field-drag-handle title="${escapeHtml(t("dragToReorder"))}" aria-label="${escapeHtml(t("dragToReorder"))}">☰</button>
            <label>${t("fieldName")}
              <input name="fieldName" value="${escapeHtml(fieldLabel(field))}" />
            </label>
            <label>${t("fieldType")}
              <select name="fieldType" title="${escapeHtml(fieldTypeInfo(field.type || "text").help)}">
                ${renderFieldTypeOptions(field.type || "text")}
              </select>
              <small class="muted">${escapeHtml(fieldTypeInfo(field.type || "text").help)}</small>
            </label>
            <div class="field-row-actions" aria-label="${escapeHtml(t("fieldActions"))}">
              <button class="secondary danger-text" type="button" tabindex="-1" data-remove-category-field title="${escapeHtml(t("removeField"))}">× ${t("removeField")}</button>
            </div>
            <input type="hidden" name="fieldId" value="${escapeHtml(field.id || "")}" />
            <input type="hidden" name="fieldPresetKey" value="${escapeHtml(field.presetKey || "")}" />
            <input type="hidden" name="fieldOriginalName" value="${escapeHtml(field.name || "")}" />
            <input type="hidden" name="fieldBuiltIn" value="${field.isBuiltIn ? "true" : "false"}" />
            <input type="hidden" name="fieldTargetTypes" value="${escapeHtml(JSON.stringify(field.targetCategoryTypes || []))}" />
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function collectCategoryFields(form) {
  return [...form.querySelectorAll("[data-field-editor-row]")]
    .map((row, index) => ({
      id: row.querySelector('[name="fieldId"]')?.value || id("field"),
      name: String(row.querySelector('[name="fieldName"]')?.value || "").trim(),
      type: row.querySelector('[name="fieldType"]')?.value || "text",
      order: index + 1,
      required: false,
      presetKey: row.querySelector('[name="fieldPresetKey"]')?.value || undefined,
      isBuiltIn: row.querySelector('[name="fieldBuiltIn"]')?.value === "true",
      targetCategoryTypes: parseJsonArray(row.querySelector('[name="fieldTargetTypes"]')?.value),
      originalName: row.querySelector('[name="fieldOriginalName"]')?.value || "",
    }))
    .filter((field) => field.name)
    .sort((a, b) => a.order - b.order)
    .map(({ order, originalName, ...field }) => {
      if (field.isBuiltIn && field.presetKey && originalName) return { ...field, name: originalName };
      return { ...field, isBuiltIn: false, presetKey: undefined };
    });
}

function parseJsonArray(value) {
  try {
    const parsed = JSON.parse(value || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
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

function fieldHasValues(category, field) {
  if (!category || !field) return false;
  const keys = [fieldStorageKey(field), field.name].filter(Boolean);
  return state.entities.some((entity) =>
    entity.categoryId === category.id && keys.some((key) => entity.customFieldValues?.[key])
  );
}

async function confirmFieldRemoval(category, field) {
  const confirmed = await openChoiceModal(t("removeField"), t("confirmRemoveField"), [
    { value: "remove", label: t("removeField"), className: "danger" },
    { value: "cancel", label: t("cancel"), className: "secondary" },
  ]);
  if (confirmed !== "remove") return false;
  if (!fieldHasValues(category, field)) return true;
  const removeAnyway = await openChoiceModal(t("removeField"), t("fieldHasValuesWarning"), [
    { value: "remove", label: t("removeAnyway"), className: "danger" },
    { value: "cancel", label: t("cancel"), className: "secondary" },
  ]);
  return removeAnyway === "remove";
}

function fieldFromEditorRow(row) {
  return {
    id: row.querySelector('[name="fieldId"]')?.value || "",
    name: row.querySelector('[name="fieldOriginalName"]')?.value || row.querySelector('[name="fieldName"]')?.value || "",
    presetKey: row.querySelector('[name="fieldPresetKey"]')?.value || undefined,
  };
}

function attachCategoryFieldActions(category) {
  document.querySelector("[data-reset-category-fields]")?.addEventListener("click", () => {
    const form = document.querySelector(".modal-backdrop form");
    const fieldSection = form?.querySelector("[data-field-manager]");
    if (!fieldSection) return;
    fieldSection.outerHTML = renderFieldManager(defaultFieldsForCategory(category), category);
    attachCategoryFieldActions(category);
  });
  document.querySelectorAll("[data-remove-category-field]").forEach((button) => {
    button.addEventListener("click", async () => {
      const row = button.closest("[data-field-editor-row]");
      if (!row) return;
      const field = fieldFromEditorRow(row);
      const fieldName = row.querySelector('[name="fieldName"]')?.value?.trim();
      if (fieldName && !(await confirmFieldRemoval(category, field))) return;
      row.remove();
    });
  });
  attachFieldDragReorder();
}

function attachFieldDragReorder() {
  const manager = document.querySelector("[data-field-manager]");
  if (!manager) return;
  let draggedRow = null;
  manager.querySelectorAll("[data-field-drag-handle]").forEach((handle) => {
    handle.addEventListener("dragstart", (event) => {
      draggedRow = handle.closest("[data-field-editor-row]");
      if (!draggedRow) return;
      draggedRow.classList.add("is-dragging");
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", draggedRow.querySelector('[name="fieldId"]')?.value || "");
      setDragImageToElement(event, draggedRow);
    });
    handle.addEventListener("dragend", () => {
      draggedRow?.classList.remove("is-dragging");
      draggedRow = null;
      manager.querySelectorAll("[data-field-editor-row]").forEach((row) => row.classList.remove("is-drop-target"));
    });
  });
  manager.querySelectorAll("[data-field-editor-row]").forEach((row) => {
    row.addEventListener("dragover", (event) => {
      if (!draggedRow || draggedRow === row) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      row.classList.add("is-drop-target");
    });
    row.addEventListener("dragleave", () => row.classList.remove("is-drop-target"));
    row.addEventListener("drop", (event) => {
      if (!draggedRow || draggedRow === row) return;
      event.preventDefault();
      row.classList.remove("is-drop-target");
      const rows = [...row.parentElement.querySelectorAll("[data-field-editor-row]")];
      const draggedIndex = rows.indexOf(draggedRow);
      const targetIndex = rows.indexOf(row);
      if (draggedIndex < targetIndex) {
        row.after(draggedRow);
      } else {
        row.before(draggedRow);
      }
    });
  });
}

function hydrateCategoryFields(category) {
  const presetNames = new Set(getFieldPresetNames(category.name));
  const fields = (category.customFields || []).map((field) => {
    if (!category.isDefault || field.presetKey || !presetNames.has(field.name)) return field;
    return {
      ...field,
      presetKey: fieldPresetKey(field.name),
      isBuiltIn: true,
    };
  }).map((field) => enrichFieldDefinition(category, field));
  const knownKeys = new Set(fields.flatMap((field) => [fieldStorageKey(field), field.name]));
  const missingImageFields = category.isDefault
    ? createFieldDefinitions(category.name).filter((field) =>
      field.type === "image" && !knownKeys.has(fieldStorageKey(field)) && !knownKeys.has(field.name)
    )
    : [];
  return {
    ...category,
    customFields: [...missingImageFields, ...fields],
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
  ["rpg", "RPG / D&D Campaign", "Campaign, NPC, görev, oturum ve encounter takibi.", ["Campaign", "Oyuncu karakterleri", "NPC'ler", "Parti üyeleri", "Görevler", "Oturum notları", "Mekanlar", "Zindanlar", "Encounter'lar", "Canavarlar", "Loot / Ödüller", "Fraksiyonlar", "Tanrılar", "Kural notları"]],
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
  startupBehavior: "continue",
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
    back: "Back",
    edit: "Edit",
    delete: "Delete",
    categories: "Categories",
    homeNav: "Home",
    projectHome: "Project home",
    categoryOverview: "Category overview",
    recentEntries: "Recent entries",
    template: "Template",
    noRecentEntries: "No recent entries yet.",
    createEntry: "Create entry",
    addCategory: "Add category",
    addFromTemplate: "Add from template",
    templateCategories: "Template categories",
    alreadyExists: "Already exists",
    renameToAdd: "Rename to add",
    addSelectedCategories: "Add selected categories",
    organizationEditMode: "Organization edit mode",
    done: "Done",
    organizationEditHelp: "Reorder, edit, hide, or delete categories.",
    appTrash: "App trash",
    projectTrash: "Project trash",
    duplicateCategoryConfirm: "This category already exists. Add another copy anyway?",
    noneCreateNew: "None / create new",
    missingEntry: "Missing entry",
    createLinkedEntry: "Create linked entry",
    copySuffix: "copy",
    moveToTrash: "Move to trash",
    moveEntriesToCategory: "Move entries to another category",
    hideCategory: "Hide category",
    chooseTargetCategory: "Choose target category",
    removeAnyway: "Remove anyway",
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
    noCharactersHelp: "No characters yet. Create your first character to start building this cast.",
    noLocationsHelp: "No locations yet. Add a place where your story can happen.",
    noQuestsHelp: "No quests yet. Add your first quest hook.",
    noSessionNotesHelp: "No session notes yet. Add a recap for your first session.",
    noEncountersHelp: "No encounters yet. Build the next challenge for your table.",
    noLootHelp: "No loot or rewards yet. Track treasure, magic items, and payouts here.",
    noPartyMembersHelp: "No party members yet. Add the player characters at the table.",
    noRuleNotesHelp: "No rule notes yet. Record table rulings and references here.",
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
    backlinks: "Backlinks",
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
    categoryDeletePrompt: "Choose how to handle this category and its entries.",
    categoryMovePrompt: "Move pages to which category?",
    targetCategoryMissing: "Valid target category not found.",
    confirmPageDelete: "This page will be moved to trash. Continue?",
    confirmRelationshipDelete: "This relationship will be moved to trash.",
    confirmNoteDelete: "This note will be moved to trash.",
    attachNotePrompt: "Which page should this note attach to? Enter the page title.",
    pageNotFound: "Page not found.",
    confirmTemplateDelete: "Delete custom template?",
    confirmPermanentDelete: "This cannot be undone. Are you sure you want to permanently delete it?",
    fallbackCategoryPrompt: "This page's category no longer exists. Choose a category to restore it into.",
    entityRestoreBlocked: "This page could not be restored. Restore its category first or choose an existing category.",
    noteRestoreBlocked: "This note could not be restored because its linked page does not exist.",
    relationshipRestoreBlocked: "This relationship could not be restored because one of its linked pages does not exist.",
    universeEdit: "Edit Universe",
    universeCreate: "New Universe",
    universeName: "Universe name",
    description: "Description",
    theme: "Theme",
    save: "Save",
    cancel: "Cancel",
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
    addFieldHint: "Use empty rows to add custom fields. Drag rows to reorder or use remove to hide a field.",
    resetFields: "Reset fields to default",
    removedFieldWarning: "Some removed fields have existing page values. The values will be preserved as raw data, but hidden from the category form. Continue?",
    addFieldToCategory: "Add field to this category",
    imageFieldPlaceholder: "Paste an image URL",
    uploadImage: "Upload image",
    imageUrlOption: "Or paste image URL",
    pasteImageUrl: "Paste image URL",
    removeImage: "Remove image",
    uploadedImage: "Uploaded image",
    imageTooLarge: "Image file is too large. Please choose an image under 2 MB.",
    imageStorageHelp: "Images are stored locally in your browser. Smaller files are recommended.",
    resetImagePosition: "Reset position",
    fieldActions: "Field actions",
    dragToReorder: "Drag to reorder",
    moveFieldUp: "Move up",
    moveFieldDown: "Move down",
    removeField: "Remove field",
    deleteField: "Delete field",
    confirmRemoveField: "Remove field?",
    fieldHasValuesWarning: "This field has existing values. Remove it anyway?",
    fieldNameRequired: "Field name is required.",
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
    startupBehavior: "Startup behavior",
    startupContinue: "Continue where I left off",
    startupProjectHome: "Open project home page",
    startupAppHome: "Open app home page",
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
    back: "Geri",
    edit: "Düzenle",
    delete: "Sil",
    categories: "Kategoriler",
    homeNav: "Ana Sayfa",
    projectHome: "Proje ana sayfası",
    categoryOverview: "Kategori özeti",
    recentEntries: "Son kayıtlar",
    template: "Şablon",
    noRecentEntries: "Henüz son kayıt yok.",
    createEntry: "Kayıt oluştur",
    addCategory: "Kategori ekle",
    addFromTemplate: "Şablondan ekle",
    templateCategories: "Şablon kategorileri",
    alreadyExists: "Zaten var",
    renameToAdd: "Eklemek için yeniden adlandır",
    addSelectedCategories: "Seçili kategorileri ekle",
    organizationEditMode: "Düzenleme modu",
    done: "Bitir",
    organizationEditHelp: "Kategorileri sırala, düzenle, gizle veya sil.",
    appTrash: "Uygulama çöp kutusu",
    projectTrash: "Proje çöp kutusu",
    duplicateCategoryConfirm: "Bu kategori zaten var. Yine de bir kopyasını eklemek istiyor musun?",
    noneCreateNew: "Yok / yeni oluÅŸtur",
    missingEntry: "Eksik kayÄ±t",
    createLinkedEntry: "BaÄŸlÄ± kayÄ±t oluÅŸtur",
    copySuffix: "kopya",
    moveToTrash: "Çöpe taşı",
    moveEntriesToCategory: "Kayıtları başka kategoriye taşı",
    hideCategory: "Kategoriyi gizle",
    chooseTargetCategory: "Hedef kategori seç",
    removeAnyway: "Yine de kaldır",
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
    noCharactersHelp: "Henüz karakter yok. Kadronu oluşturmaya başlamak için ilk karakterini oluştur.",
    noLocationsHelp: "Henüz mekân yok. Hikâyenin geçeceği bir yer ekle.",
    noQuestsHelp: "Henüz görev yok. İlk görev fikrini ekle.",
    noSessionNotesHelp: "Henüz oturum notu yok. İlk oturumun özetini ekle.",
    noEncountersHelp: "Henüz karşılaşma yok. Masan için sıradaki meydan okumayı hazırla.",
    noLootHelp: "Henüz loot veya ödül yok. Hazineyi, büyülü eşyaları ve ödülleri burada takip et.",
    noPartyMembersHelp: "Henüz parti üyesi yok. Masadaki oyuncu karakterlerini ekle.",
    noRuleNotesHelp: "Henüz kural notu yok. Masa kararlarını ve referansları burada kaydet.",
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
    backlinks: "Geri bağlantılar",
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
    categoryDeletePrompt: "Bu kategori ve içindeki kayıtlar için ne yapılacağını seç.",
    categoryMovePrompt: "Sayfalar hangi kategoriye taşınsın?",
    targetCategoryMissing: "Geçerli hedef kategori bulunamadı.",
    confirmPageDelete: "Bu sayfa geri dönüşüm kutusuna taşınacak. Devam etmek istiyor musun?",
    confirmRelationshipDelete: "Bu ilişki geri dönüşüm kutusuna taşınacak.",
    confirmNoteDelete: "Bu not geri dönüşüm kutusuna taşınacak.",
    attachNotePrompt: "Not hangi sayfaya bağlansın? Sayfa başlığını yaz.",
    pageNotFound: "Sayfa bulunamadı.",
    confirmTemplateDelete: "Özel şablon silinsin mi?",
    confirmPermanentDelete: "Bu işlem geri alınamaz. Kalıcı olarak silmek istediğine emin misin?",
    fallbackCategoryPrompt: "Bu sayfanın kategorisi artık mevcut değil. Geri yüklemek için bir kategori seç.",
    entityRestoreBlocked: "Bu sayfa geri yüklenemedi. Önce kategorisini geri yükleyin veya mevcut bir kategori seçin.",
    noteRestoreBlocked: "Bu not geri yüklenemedi çünkü bağlı olduğu sayfa mevcut değil.",
    relationshipRestoreBlocked: "Bu ilişki geri yüklenemedi çünkü bağlı sayfalardan biri mevcut değil.",
    universeEdit: "Evren Düzenle",
    universeCreate: "Yeni Evren",
    universeName: "Evren adı",
    description: "Açıklama",
    theme: "Tema",
    save: "Kaydet",
    cancel: "İptal",
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
    addFieldHint: "Özel alan eklemek için boş satırları kullanın. Alanları taşımak veya kaldırmak için satır düğmelerini kullanın.",
    resetFields: "Alanları varsayılana döndür",
    removedFieldWarning: "Kaldırılan bazı alanlarda mevcut sayfa verileri var. Veriler ham veri olarak korunacak, ancak kategori formunda gizlenecek. Devam edilsin mi?",
    addFieldToCategory: "Bu kategoriye alan ekle",
    imageFieldPlaceholder: "Görsel URL’si yapıştır",
    uploadImage: "Görsel yükle",
    imageUrlOption: "Ya da görsel URL’si yapıştır",
    pasteImageUrl: "Görsel URL’si yapıştır",
    removeImage: "Görseli kaldır",
    uploadedImage: "Yüklenen görsel",
    imageTooLarge: "Görsel dosyası çok büyük. Lütfen 2 MB altında bir görsel seç.",
    imageStorageHelp: "Görseller tarayıcında yerel olarak saklanır. Daha küçük dosyalar önerilir.",
    resetImagePosition: "Konumu sıfırla",
    fieldActions: "Alan işlemleri",
    dragToReorder: "Sıralamak için sürükle",
    moveFieldUp: "Yukarı taşı",
    moveFieldDown: "Aşağı taşı",
    removeField: "Alanı kaldır",
    deleteField: "Alanı sil",
    confirmRemoveField: "Alan kaldırılsın mı?",
    fieldHasValuesWarning: "Bu alanın mevcut kayıtlarda değerleri var. Yine de kaldırmak istiyor musun?",
    fieldNameRequired: "Alan adı zorunludur.",
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
    startupBehavior: "Başlangıç davranışı",
    startupContinue: "Kaldığım yerden devam et",
    startupProjectHome: "Proje ana sayfasını aç",
    startupAppHome: "Uygulama ana sayfasını aç",
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
    projectEditModes: {},
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
    const migratedProjectEditModes = {
      ...(parsed.projectEditModes && typeof parsed.projectEditModes === "object" ? parsed.projectEditModes : {}),
    };
    if (parsed.settings?.organizationEditMode && parsed.selectedUniverseId) {
      migratedProjectEditModes[parsed.selectedUniverseId] = true;
    }
    return applyStartupBehavior({
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
      projectEditModes: migratedProjectEditModes,
    });
  } catch (error) {
    console.warn("Loreforge could not read stored data.", error);
    storageRecoveryMessage = "Saved local data could not be read. Loreforge started with a safe empty state. Check any exported backup before clearing browser data.";
    return createDefaultState();
  }
}

function applyStartupBehavior(loadedState) {
  const appHome = () => ({
    ...loadedState,
    selectedUniverseId: null,
    selectedCategoryId: null,
    selectedEntityId: null,
    view: "home",
    search: "",
  });
  const activeUniverse = loadedState.universes.find((universe) => universe.id === loadedState.selectedUniverseId && !universe.deletedAt);
  const activeCategories = loadedState.categories
    .filter((category) => category.universeId === activeUniverse?.id && !category.deletedAt && !category.isHidden)
    .sort((a, b) => a.order - b.order);
  const activeCategory = activeCategories.find((category) => category.id === loadedState.selectedCategoryId);
  const activeEntity = loadedState.entities.find((entity) =>
    entity.id === loadedState.selectedEntityId &&
    entity.universeId === activeUniverse?.id &&
    !entity.deletedAt
  );

  if (loadedState.settings.startupBehavior === "appHome") return appHome();
  if (loadedState.settings.startupBehavior === "projectHome") {
    if (!activeUniverse) return appHome();
    return {
      ...loadedState,
      selectedCategoryId: activeCategory?.id || activeCategories[0]?.id || null,
      selectedEntityId: null,
      view: "projectHome",
      search: "",
    };
  }
  if (!loadedState.selectedUniverseId) return appHome();
  if (!activeUniverse) return appHome();
  if (loadedState.selectedEntityId && (!activeEntity || activeEntity.categoryId !== loadedState.selectedCategoryId)) return appHome();
  if (loadedState.selectedCategoryId && !activeCategory) return appHome();
  return {
    ...loadedState,
    selectedCategoryId: activeEntity?.categoryId || activeCategory?.id || activeCategories[0]?.id || null,
    view: loadedState.view === "home" ? "projectHome" : loadedState.view,
  };
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

function isProjectEditMode(universeId = state.selectedUniverseId) {
  return Boolean(universeId && state.projectEditModes?.[universeId]);
}

function setProjectEditMode(universeId, value) {
  if (!universeId) return;
  state.projectEditModes = {
    ...(state.projectEditModes || {}),
    [universeId]: Boolean(value),
  };
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
        </div>
      </section>
      <div data-home-results>
        ${renderHomeResults()}
      </div>
      <button class="home-trash-button secondary" data-action="trash">${t("trash")}</button>
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
    <article class="card universe-card" data-action="open-universe" data-id="${universe.id}" role="button" tabindex="0">
      <button class="universe-card__open" data-action="open-universe" data-id="${universe.id}">
        <span class="universe-card__cover"></span>
        <span>
          <h3>${escapeHtml(universe.name)}</h3>
          <p class="muted">${escapeHtml(universe.description || t("noDescription"))}</p>
        </span>
        <span class="badge-list">
          <span class="badge">${escapeHtml(template?.name || t("custom"))}</span>
          <span class="badge">${categories} ${t("itemCategory")}</span>
          <span class="badge">${entities} ${t("itemPage")}</span>
        </span>
      </button>
      <div class="universe-card__actions">
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
  const isEditingOrganization = isProjectEditMode(universe.id);
  return `
    <aside class="panel stack">
      <div class="row">
        <h2>${t("categories")}</h2>
        <div class="button-row">
          <button class="icon-button" data-action="new-category" title="${t("addCategory")}">+</button>
        </div>
      </div>
      ${isEditingOrganization ? `<p class="muted edit-mode-help">${t("organizationEditHelp")}</p>` : ""}
      <input data-search placeholder="${t("searchPages")}" value="${escapeHtml(state.search)}" />
      <div class="stack" data-category-list>
        <button class="category-button ${state.view === "projectHome" ? "is-active" : ""}" data-action="project-home">
          <strong>${t("homeNav")}</strong>
          <small>${t("projectHome")}</small>
        </button>
        ${categories.map((category) => {
          const count = universeEntities(universe.id).filter((entity) => entity.categoryId === category.id).length;
          return `
            <div class="category-nav-row" data-category-row data-id="${category.id}">
              <button class="category-button ${category.id === state.selectedCategoryId ? "is-active" : ""}" data-action="select-category" data-id="${category.id}">
                <strong>${escapeHtml(category.name)}</strong>
                <small>${count} ${t("itemPage")}</small>
              </button>
              ${isEditingOrganization ? `
                <div class="category-controls" aria-label="${escapeHtml(t("organizationEditMode"))}">
                  <span class="drag-handle" draggable="true" tabindex="-1" data-category-drag-handle title="${escapeHtml(t("dragToReorder"))}" aria-label="${escapeHtml(t("dragToReorder"))}">☰</span>
                  <button class="secondary" tabindex="-1" data-action="edit-category" data-id="${category.id}">${t("edit")}</button>
                  <button class="secondary" tabindex="-1" data-action="hide-category" data-id="${category.id}">${t("hide")}</button>
                  <button class="danger" tabindex="-1" data-action="delete-category" data-id="${category.id}">${t("delete")}</button>
                </div>
              ` : ""}
            </div>
          `;
        }).join("")}
      </div>
      <div class="button-row">
        <button class="secondary" data-action="add-from-template">${t("addFromTemplate")}</button>
        <button class="secondary" data-action="templates">${t("templates")}</button>
        <button class="secondary" data-action="trash">${t("trash")}</button>
      </div>
      ${hiddenCategories.length && isEditingOrganization ? `
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
  if (state.view === "projectHome") return renderProjectHome(universe);
  const category = currentCategory() || universeCategories(universe.id)[0];
  const isEditingOrganization = isProjectEditMode(universe.id);
  if (category && category.id !== state.selectedCategoryId) {
    state.selectedCategoryId = category.id;
    saveState();
  }
  const entity = currentEntity();
  const entities = category ? filteredEntities(universe.id).filter((item) => item.categoryId === category.id) : [];
  return `
      <section class="category-overview">
        <div class="category-overview__main">
          <div>
            <p class="muted">${entities.length} ${t("itemPage")}</p>
            <h2>${escapeHtml(category?.name || t("noCategory"))}</h2>
            ${category?.description ? `<p>${escapeHtml(category.description)}</p>` : ""}
          </div>
          ${category ? `
            <div class="category-overview__actions">
              <button class="secondary" data-action="toggle-organization-edit" aria-pressed="${isEditingOrganization}">${isEditingOrganization ? t("done") : t("edit")}</button>
              <button data-action="new-entity">${createEntityLabel(category)}</button>
              ${renderEntityViewToggle()}
            </div>
          ` : ""}
        </div>
        ${category && isEditingOrganization ? `
          <p class="muted edit-mode-help">${t("organizationEditHelp")}</p>
          <div class="button-row category-overview__edit-actions">
            <button class="secondary" data-action="edit-category" data-id="${category.id}">${t("edit")}</button>
            <button class="secondary" data-action="hide-category" data-id="${category.id}">${t("hide")}</button>
            <button class="danger" data-action="delete-category" data-id="${category.id}">${t("delete")}</button>
          </div>
        ` : ""}
      </section>
      ${entity ? renderEntityDetail(entity) : renderEntityList(entities, category)}
  `;
}

function renderEntityViewToggle() {
  const viewMode = state.settings.entityViewMode === "list" ? "list" : "cards";
  return `
    <div class="list-toolbar">
      <div class="segmented-control" aria-label="${escapeHtml(t("view"))}">
        <button class="${viewMode === "cards" ? "is-active" : ""}" data-action="set-entity-view" data-mode="cards">${t("cards")}</button>
        <button class="${viewMode === "list" ? "is-active" : ""}" data-action="set-entity-view" data-mode="list">${t("listView")}</button>
      </div>
    </div>
  `;
}

function renderProjectHome(universe) {
  const template = state.templates.find((item) => item.id === universe.templateId);
  const categories = universeCategories(universe.id);
  const isEditingOrganization = isProjectEditMode(universe.id);
  const entities = universeEntities(universe.id)
    .sort((a, b) => String(b.updatedAt || b.createdAt || "").localeCompare(String(a.updatedAt || a.createdAt || "")))
    .slice(0, 6);
  return `
    <section class="project-home stack">
      <div class="project-home__header">
        <div>
          <p class="muted">${t("projectHome")}</p>
          <h2>${escapeHtml(universe.name)}</h2>
          <p>${escapeHtml(universe.description || "")}</p>
          <div class="button-row">
            ${template ? `<span class="badge">${t("template")}: ${escapeHtml(template.name)}</span>` : ""}
          </div>
        </div>
        <div class="button-row">
          <button class="secondary" data-action="toggle-organization-edit" aria-pressed="${isEditingOrganization}">${isEditingOrganization ? t("done") : t("edit")}</button>
          <button data-action="new-entity">${t("createEntry")}</button>
          <button class="secondary" data-action="new-category">${t("addCategory")}</button>
          <button class="secondary" data-action="add-from-template">${t("addFromTemplate")}</button>
          <button class="secondary" data-action="quick-note">${t("idea")}</button>
        </div>
      </div>
      ${isEditingOrganization ? `<p class="muted edit-mode-help">${t("organizationEditHelp")}</p>` : ""}
      <section class="stack">
        <h3 class="section-title">${t("categoryOverview")}</h3>
        <div class="home-card-grid">
          ${categories.map((category) => {
            const count = universeEntities(universe.id).filter((entity) => entity.categoryId === category.id).length;
            return `
              <button class="home-card" data-action="select-category" data-id="${category.id}">
                <strong>${escapeHtml(category.name)}</strong>
                <small>${count} ${t("itemPage")}</small>
                <span class="muted">${escapeHtml(category.description || "")}</span>
              </button>
            `;
          }).join("")}
        </div>
      </section>
      <section class="stack">
        <h3 class="section-title">${t("recentEntries")}</h3>
        ${entities.length ? `
          <div class="entity-list entity-list--cards">
            ${entities.map(renderEntityCard).join("")}
          </div>
        ` : `<p class="muted">${t("noRecentEntries")}</p>`}
      </section>
    </section>
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
        <p>${emptyEntityHelp(category)}</p>
        <button data-action="new-entity">${createEntityLabel(category)}</button>
      </section>
    `;
  }
  return `
    <section class="entity-list entity-list--${viewMode}">
      ${entities.map((entity) => viewMode === "list" ? renderEntityRow(entity) : renderEntityCard(entity)).join("")}
    </section>
  `;
}

function entityImageInfo(entity) {
  const category = state.categories.find((item) => item.id === entity.categoryId);
  const imageField = (category?.customFields || []).find((field) => field.type === "image");
  const value = imageField ? entity.customFieldValues?.[fieldStorageKey(imageField)] || entity.customFieldValues?.[imageField.name] : "";
  if (!isPreviewableImageUrl(value)) return null;
  return {
    value,
    position: imageField ? fieldImagePositionValue(imageField, entity) : "50,50",
  };
}

function entityImageValue(entity) {
  return entityImageInfo(entity)?.value || "";
}

function entityTagNames(entity) {
  return (entity.tagIds || [])
    .map((tagId) => state.tags.find((tag) => tag.id === tagId)?.name)
    .filter(Boolean);
}

const importantFieldNamesByType = {
  characters: ["First name", "Last name", "Nickname", "Age", "Species/Race", "Occupation"],
  locations: ["Location type", "Region", "Population", "Ruler/Owner"],
  families: ["Family name", "Founder", "Current head"],
  quests: ["Status", "Quest giver", "Location", "Reward"],
  sessionNotes: ["Session number", "Date", "Players present"],
};

function importantEntityFields(entity, limit = 3) {
  const category = state.categories.find((item) => item.id === entity.categoryId);
  const entries = entityFieldEntries(entity).filter((entry) => entry.field?.type !== "image");
  const preferredNames = importantFieldNamesByType[getCategoryTypeKey(category)] || [];
  const selected = [];

  preferredNames.forEach((name) => {
    const key = fieldPresetKey(name);
    const match = entries.find((entry) => entry.field?.name === name || fieldStorageKey(entry.field) === key);
    if (match && !selected.some((entry) => entry.key === match.key)) {
      selected.push(match);
    }
  });

  entries.forEach((entry) => {
    if (selected.length < limit && !selected.some((item) => item.key === entry.key)) {
      selected.push(entry);
    }
  });

  return selected.slice(0, limit);
}

function renderEntityPreviewFields(entity, limit) {
  const fields = importantEntityFields(entity, limit);
  if (!fields.length) return "";
  return `
    <span class="entity-preview-fields">
      ${fields.map((entry) => `<span><strong>${escapeHtml(entry.label)}:</strong> ${escapeHtml(referenceDisplayText(entry.field, entry.value))}</span>`).join("")}
    </span>
  `;
}

function renderEntityRow(entity) {
  const imageInfo = entityImageInfo(entity);
  const tags = entityTagNames(entity).slice(0, 3);
  return `
    <button class="entity-row entity-row--rich" data-action="select-entity" data-id="${entity.id}">
      ${imageInfo ? `<img class="entity-row__image" src="${escapeHtml(imageInfo.value)}" alt="${escapeHtml(entity.title)}" loading="lazy" style="${imagePositionStyle(imageInfo.position)}" />` : ""}
      <span class="entity-row__body">
        <strong>${escapeHtml(entity.title)}</strong>
        ${entity.summary ? `<small>${escapeHtml(entity.summary)}</small>` : ""}
        ${renderEntityPreviewFields(entity, 2)}
        ${tags.length ? `<span class="tag-row">${tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</span>` : ""}
      </span>
    </button>
  `;
}

function renderEntityCard(entity) {
  const imageInfo = entityImageInfo(entity);
  const tags = entityTagNames(entity).slice(0, 3);
  return `
    <button class="entity-card" data-action="select-entity" data-id="${entity.id}">
      ${imageInfo ? `<img class="entity-card__image" src="${escapeHtml(imageInfo.value)}" alt="${escapeHtml(entity.title)}" loading="lazy" style="${imagePositionStyle(imageInfo.position)}" />` : ""}
      <span class="entity-card__body">
        <strong>${escapeHtml(entity.title)}</strong>
        ${entity.summary ? `<small>${escapeHtml(entity.summary)}</small>` : ""}
        ${renderEntityPreviewFields(entity, 3)}
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
  const imageInfo = entityImageInfo(entity);
  return `
    <section class="detail">
      <div class="subview-bar">
        <button class="secondary" data-action="back-to-list">← ${t("back")}</button>
      </div>
      <div class="detail-hero">
        ${imageInfo ? `<img class="detail-hero__image" src="${escapeHtml(imageInfo.value)}" alt="${escapeHtml(entity.title)}" loading="lazy" style="${imagePositionStyle(imageInfo.position)}" />` : ""}
        <div class="detail-hero__body">
          <div class="detail-header">
            <div>
              <p class="muted">${escapeHtml(category?.name || t("category"))}</p>
              <h2 class="detail-title">${escapeHtml(entity.title)}</h2>
              <p>${escapeHtml(entity.summary || "")}</p>
            </div>
            <div class="button-row">
              <button data-action="edit-entity" data-id="${entity.id}">${t("edit")}</button>
              <button class="danger" data-action="delete-entity" data-id="${entity.id}">${t("delete")}</button>
            </div>
          </div>
          <div class="badge-list">
            ${tags.map((tag) => `<span class="badge">${escapeHtml(tag.name)}</span>`).join("") || `<span class="badge">${t("noTags")}</span>`}
          </div>
          ${renderKeyFields(entity)}
        </div>
      </div>
      ${renderCustomFields(entity)}
      <section class="card stack">
        <h3 class="section-title">${sectionLabel("Notes")}</h3>
        <article class="markdown">${markdownToHtml(entity.content || t("noContent"))}</article>
      </section>
    </section>
  `;
}

function entityFieldEntries(entity) {
  const category = state.categories.find((item) => item.id === entity.categoryId);
  const values = entity.customFieldValues || {};
  const builtInEntries = (category?.customFields || [])
    .map((field) => {
      const key = fieldStorageKey(field);
      const value = values[key] ?? values[field.name];
      return value ? { label: fieldLabel(field), value, key, field, section: fieldSectionName(category, field) } : null;
    })
    .filter(Boolean);
  const knownKeys = new Set((category?.customFields || []).flatMap((field) => [fieldStorageKey(field), field.name]));
  const extraEntries = Object.entries(values)
    .filter(([key]) => !knownKeys.has(key))
    .filter(([key]) => !key.endsWith(":position"))
    .filter(([, value]) => value)
    .map(([key, value]) => ({ label: key, value, key, field: null, section: "Details" }));
  return [...builtInEntries, ...extraEntries];
}

function renderKeyFields(entity) {
  const entries = keyFieldEntries(entity);
  if (!entries.length) return "";
  return `
    <div class="key-field-grid">
      ${entries.map((entry) => `
        <div class="key-field">
          <span>${escapeHtml(entry.label)}</span>
          ${renderFieldValue(entry.field, entry.value)}
        </div>
      `).join("")}
    </div>
  `;
}

function keyFieldEntries(entity) {
  return entityFieldEntries(entity)
    .filter((entry) => entry.field?.type !== "image")
    .slice(0, 4);
}

function renderCustomFields(entity) {
  const keyFields = new Set(keyFieldEntries(entity).map((entry) => entry.key));
  const entries = entityFieldEntries(entity)
    .filter((entry) => entry.field?.type !== "image")
    .filter((entry) => !keyFields.has(entry.key));
  if (!entries.length) return "";
  const sections = entries.reduce((groups, entry) => {
    if (!groups.has(entry.section)) groups.set(entry.section, []);
    groups.get(entry.section).push(entry);
    return groups;
  }, new Map());
  return `
    <div class="detail-section-grid">
      ${[...sections.entries()].map(([section, sectionEntries]) => `
        <section class="card stack">
          <h3 class="section-title">${escapeHtml(sectionLabel(section))}</h3>
          ${sectionEntries.map((entry) => `
            <div class="field-display">
              <strong>${escapeHtml(entry.label)}</strong>
              ${renderFieldValue(entry.field, entry.value)}
            </div>
          `).join("")}
        </section>
      `).join("")}
    </div>
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
      <h2>${t("backlinks")}</h2>
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
        <div class="subview-bar">
          <button class="secondary" data-action="back-from-subview">← ${t("back")}</button>
          <h2>${t("templates")}</h2>
        </div>
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
  const isProjectTrash = Boolean(universe?.id);
  const deletedUniverses = isProjectTrash ? [] : state.universes.filter((item) => item.deletedAt).map((item) => ["universe", item]);
  const deletedUniverseItems = universeId ? [
    ...state.categories.filter((item) => item.universeId === universeId && item.deletedAt).map((item) => ["category", item]),
    ...state.entities.filter((item) => item.universeId === universeId && item.deletedAt).map((item) => ["page", item]),
    ...state.notes.filter((item) => item.universeId === universeId && item.deletedAt).map((item) => ["note", item]),
    ...state.relationships.filter((item) => item.universeId === universeId && item.deletedAt).map((item) => ["relationship", item]),
    ...state.tags.filter((item) => item.universeId === universeId && item.deletedAt).map((item) => ["tag", item]),
  ] : [];
  const deleted = isProjectTrash ? deletedUniverseItems : deletedUniverses;
  return `
    <main class="main stack">
      <section class="toolbar">
        <div class="subview-bar">
          <button class="secondary" data-action="back-from-subview">← ${t("back")}</button>
          <h2>${isProjectTrash ? t("projectTrash") : t("appTrash")}</h2>
        </div>
      </section>
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
  bindCategoryDragEvents(document);
  document.querySelectorAll("[data-search]").forEach((input) => {
    input.addEventListener("input", (event) => {
      state.search = event.target.value;
      saveState();
      refreshSearchResults();
    });
  });
}

function bindCategoryDragEvents(root) {
  let draggedId = null;
  root.querySelectorAll("[data-category-drag-handle]").forEach((handle) => {
    handle.addEventListener("dragstart", (event) => {
      const row = handle.closest("[data-category-row]");
      draggedId = row?.dataset.id || null;
      row?.classList.add("is-dragging");
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", draggedId || "");
      setDragImageToElement(event, row);
    });
    handle.addEventListener("dragend", () => {
      root.querySelectorAll("[data-category-row].is-dragging").forEach((row) => row.classList.remove("is-dragging"));
      root.querySelectorAll("[data-category-row].is-drop-target").forEach((row) => row.classList.remove("is-drop-target"));
      draggedId = null;
    });
  });

  root.querySelectorAll("[data-category-row]").forEach((row) => {
    row.addEventListener("dragover", (event) => {
      if (!draggedId || draggedId === row.dataset.id) return;
      event.preventDefault();
      row.classList.add("is-drop-target");
    });
    row.addEventListener("dragleave", () => row.classList.remove("is-drop-target"));
    row.addEventListener("drop", (event) => {
      event.preventDefault();
      row.classList.remove("is-drop-target");
      const sourceId = event.dataTransfer.getData("text/plain") || draggedId;
      const targetId = row.dataset.id;
      if (sourceId && targetId && sourceId !== targetId) reorderCategory(sourceId, targetId);
    });
  });
}

function bindActionEvents(root) {
  root.querySelectorAll("[data-action]").forEach((element) => {
    element.addEventListener("click", (event) => {
      event.stopPropagation();
      const action = event.currentTarget.dataset.action;
      const dataset = event.currentTarget.dataset;
      actions[action]?.(dataset);
    });
    if (element.getAttribute("role") === "button") {
      element.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          element.click();
        }
      });
    }
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
      view: "projectHome",
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
  "project-home"() {
    setState({ view: "projectHome", selectedEntityId: null, search: "" });
  },
  "back-from-subview"() {
    if (currentUniverse()) {
      setState({ view: "projectHome", selectedEntityId: null, search: "" });
    } else {
      setState({ view: "home", selectedUniverseId: null, selectedCategoryId: null, selectedEntityId: null, search: "" });
    }
  },
  "new-category": openCategoryModal,
  "add-from-template": openTemplateExpansionModal,
  "toggle-organization-edit"() {
    const universe = currentUniverse();
    if (!universe) return;
    setProjectEditMode(universe.id, !isProjectEditMode(universe.id));
    saveState();
    render();
  },
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
  "delete-category": async function ({ id: categoryId }) {
    await openCategoryDeleteDialog(categoryId);
  },
  "new-entity"() {
    if (!currentCategory()) {
      state.selectedCategoryId = universeCategories()[0]?.id || null;
    }
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
    openAttachNoteDialog(noteId);
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
  "restore-item": async function ({ kind, id: itemId }) {
    await restoreTrashItem(kind, itemId);
  },
  "purge-item": async function ({ kind, id: itemId }) {
    const confirmed = await openChoiceModal(t("permanentDelete"), t("confirmPermanentDelete"), [
      { value: "delete", label: t("permanentDelete"), className: "danger" },
      { value: "cancel", label: t("cancel"), className: "secondary" },
    ]);
    if (confirmed !== "delete") return;
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

async function openCategoryDeleteDialog(categoryId) {
  const category = state.categories.find((item) => item.id === categoryId);
  if (!category) return;
  const choice = await openChoiceModal(t("delete"), t("categoryDeletePrompt"), [
    { value: "trash", label: t("moveToTrash"), className: "danger" },
    { value: "move", label: t("moveEntriesToCategory"), className: "secondary" },
    { value: "hide", label: t("hideCategory"), className: "secondary" },
    { value: "cancel", label: t("cancel"), className: "secondary" },
  ]);
  if (choice === "cancel" || !choice) return;
  if (choice === "hide") {
    updateItem("categories", categoryId, { isHidden: true });
    return;
  }
  if (choice === "move") {
    const targetId = await openTargetCategoryChoice(categoryId);
    const target = universeCategories().find((item) => item.id === targetId);
    if (!target) return;
    state.entities = state.entities.map((entity) => entity.categoryId === categoryId ? { ...entity, categoryId: target.id, updatedAt: now() } : entity);
  } else {
    state.entities = state.entities.map((entity) => entity.categoryId === categoryId ? { ...entity, deletedAt: now(), updatedAt: now() } : entity);
  }
  softDelete("categories", categoryId);
  state.selectedEntityId = null;
  state.selectedCategoryId = universeCategories().find((item) => item.id !== categoryId)?.id || null;
  saveState();
  render();
}

function openTargetCategoryChoice(currentCategoryId) {
  const targets = universeCategories().filter((category) => category.id !== currentCategoryId);
  if (!targets.length) {
    alert(t("targetCategoryMissing"));
    return Promise.resolve(null);
  }
  return new Promise((resolve) => {
    let resolved = false;
    const finish = (value) => {
      if (resolved) return;
      resolved = true;
      resolve(value);
    };
    const backdrop = openModal(t("chooseTargetCategory"), `
      <form class="form-grid">
        <label>${t("category")}
          <select name="targetCategoryId">
            ${targets.map((category) => `<option value="${category.id}">${escapeHtml(category.name)}</option>`).join("")}
          </select>
        </label>
        <div class="button-row">
          <button type="submit">${t("save")}</button>
          <button class="secondary" type="button" data-modal-close>${t("cancel")}</button>
        </div>
      </form>
    `, (form) => {
      finish(form.get("targetCategoryId"));
    }, () => finish(null));
  });
}

function referenceTargetEntities(field, sourceEntity) {
  const universeId = sourceEntity?.universeId || state.selectedUniverseId;
  const targetTypes = field.targetCategoryTypes || [];
  const targetCategoryIds = new Set(
    state.categories
      .filter((category) => category.universeId === universeId && !category.deletedAt)
      .filter((category) => !targetTypes.length || targetTypes.includes(getCategoryTypeKey(category)))
      .map((category) => category.id)
  );
  return state.entities
    .filter((entity) => entity.universeId === universeId && !entity.deletedAt && entity.id !== sourceEntity?.id)
    .filter((entity) => !targetCategoryIds.size || targetCategoryIds.has(entity.categoryId))
    .sort((a, b) => a.title.localeCompare(b.title, state.settings.language === "tr" ? "tr" : "en"));
}

function normalizeReferenceListValue(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (!value) return [];
  return String(value).split(",").map((item) => item.trim()).filter(Boolean);
}

function isExistingEntityId(value) {
  return state.entities.some((entity) => entity.id === value);
}

function renderReferenceFieldInput(field, entity, value) {
  const targets = referenceTargetEntities(field, entity);
  const storageKey = fieldStorageKey(field);
  const isList = field.type === "entityReferenceList";
  const selectedIds = new Set(isList ? normalizeReferenceListValue(value).filter(isExistingEntityId) : []);
  const legacyText = isList
    ? normalizeReferenceListValue(value).filter((item) => !isExistingEntityId(item)).join(", ")
    : (value && !isExistingEntityId(value) ? String(value) : "");
  const targetIds = new Set(targets.map((target) => target.id));
  const selectedValue = !isList && targetIds.has(value) ? value : "";
  const missingReference = !isList && value && isExistingEntityId(value) && !selectedValue;
  return `
    <div class="field-entry" data-entity-field data-field-id="${escapeHtml(field.id || "")}" data-field-key="${escapeHtml(storageKey)}" data-field-name="${escapeHtml(field.name || "")}">
      <button class="field-drag-handle" type="button" draggable="true" tabindex="-1" data-entity-field-drag-handle title="${escapeHtml(t("dragToReorder"))}" aria-label="${escapeHtml(t("dragToReorder"))}">☰</button>
      <div class="stack">
        <label>${escapeHtml(fieldLabel(field))}
          ${isList ? "" : `
            <select name="field:${escapeHtml(storageKey)}" data-reference-select>
              <option value="">${t("noneCreateNew")}</option>
              ${targets.map((target) => `<option value="${target.id}" ${target.id === selectedValue ? "selected" : ""}>${escapeHtml(target.title)}</option>`).join("")}
            </select>
            ${missingReference ? `<input type="hidden" name="field:${escapeHtml(storageKey)}" value="${escapeHtml(value)}" data-missing-reference-value />` : ""}
          `}
        </label>
        ${isList ? `
          <input type="hidden" name="field:${escapeHtml(storageKey)}" value="${escapeHtml([...selectedIds].join(","))}" data-reference-list-value />
          <div class="reference-checkbox-list">
            <label class="checkbox-line"><input type="checkbox" data-reference-list-empty ${selectedIds.size ? "" : "checked"} /> ${t("noneCreateNew")}</label>
            ${targets.map((target) => `
              <label class="checkbox-line">
                <input type="checkbox" value="${target.id}" data-reference-list-option ${selectedIds.has(target.id) ? "checked" : ""} />
                ${escapeHtml(target.title)}
              </label>
            `).join("")}
          </div>
        ` : ""}
        ${missingReference ? `<small class="muted">${t("missingEntry")}</small>` : ""}
        ${legacyText ? `<small class="muted">${escapeHtml(legacyText)}</small>` : ""}
      </div>
      <button class="secondary danger-text" type="button" tabindex="-1" data-remove-entity-field>${t("removeField")}</button>
    </div>
  `;
}

function openAttachNoteDialog(noteId) {
  const entities = universeEntities();
  if (!entities.length) {
    alert(t("pageNotFound"));
    return;
  }
  openModal(t("attach"), `
    <form class="form-grid">
      <label>${t("page")}
        <select name="entityId">
          ${entities.map((entity) => `<option value="${entity.id}">${escapeHtml(entity.title)}</option>`).join("")}
        </select>
      </label>
      <div class="button-row">
        <button type="submit">${t("attach")}</button>
        <button class="secondary" type="button" data-modal-close>${t("cancel")}</button>
      </div>
    </form>
  `, (form) => {
    const entity = entities.find((item) => item.id === form.get("entityId"));
    if (!entity) {
      alert(t("pageNotFound"));
      return false;
    }
    updateItem("notes", noteId, { entityId: entity.id });
  });
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
  return new Promise((resolve) => {
    let resolved = false;
    const finish = (value) => {
      if (resolved) return;
      resolved = true;
      resolve(value || null);
    };
    openModal(t("restore"), `
      <form class="form-grid">
        <p>${escapeHtml(t("fallbackCategoryPrompt"))}</p>
        <label>${t("category")}
          <select name="targetCategoryId">
            ${categories.map((category) => `<option value="${category.id}">${escapeHtml(category.name)}</option>`).join("")}
          </select>
        </label>
        <div class="button-row">
          <button type="submit">${t("restore")}</button>
          <button class="secondary" type="button" data-modal-close>${t("cancel")}</button>
        </div>
      </form>
    `, (form) => {
      const targetId = form.get("targetCategoryId");
      finish(categories.find((category) => category.id === targetId) || null);
    }, () => finish(null));
  });
}

async function restoreTrashItem(kind, itemId) {
  const collection = collectionForKind(kind);
  const item = state[collection].find((entry) => entry.id === itemId);
  if (!item) return;

  if (collection === "universes") {
    updateItem(collection, itemId, { deletedAt: null });
    state.selectedUniverseId = itemId;
    state.selectedCategoryId = universeCategories(itemId)[0]?.id || null;
    state.selectedEntityId = null;
    state.view = "projectHome";
    saveState();
    render();
    return;
  }

  if (collection === "entities" && !activeCategoryExists(item.categoryId)) {
    const fallback = await pickFallbackCategory(item.universeId, item.categoryId);
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

function reorderCategory(sourceId, targetId) {
  const categories = universeCategories(state.selectedUniverseId, true);
  const sourceIndex = categories.findIndex((category) => category.id === sourceId);
  const targetIndex = categories.findIndex((category) => category.id === targetId);
  if (sourceIndex < 0 || targetIndex < 0 || sourceIndex === targetIndex) return;
  const [source] = categories.splice(sourceIndex, 1);
  categories.splice(targetIndex, 0, source);
  const orderById = new Map(categories.map((category, index) => [category.id, index]));
  state.categories = state.categories.map((category) =>
    orderById.has(category.id) ? { ...category, order: orderById.get(category.id), updatedAt: now() } : category
  );
  saveState();
  render();
}

function bindModalBackdropClose(backdrop, close) {
  let startedOnBackdrop = false;
  backdrop.addEventListener("pointerdown", (event) => {
    startedOnBackdrop = event.target === backdrop;
  });
  backdrop.addEventListener("pointerup", (event) => {
    if (event.target === backdrop && startedOnBackdrop) close();
    startedOnBackdrop = false;
  });
  backdrop.addEventListener("click", (event) => {
    if (event.target.dataset.modalClose !== undefined) close();
    startedOnBackdrop = false;
  });
}

function openModal(title, bodyHtml, onSubmit, onClose) {
  const template = document.getElementById("modal-template");
  const fragment = template.content.cloneNode(true);
  const backdrop = fragment.querySelector(".modal-backdrop");
  fragment.querySelector("[data-modal-title]").textContent = title;
  fragment.querySelector("[data-modal-body]").innerHTML = bodyHtml;
  const close = () => {
    if (!backdrop.isConnected) return;
    backdrop.remove();
    onClose?.();
  };
  bindModalBackdropClose(backdrop, close);
  const form = fragment.querySelector("form");
  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const result = await onSubmit?.(new FormData(form));
      if (result !== false) close();
    });
  }
  document.body.appendChild(fragment);
  return backdrop;
}

function openChoiceModal(title, message, choices) {
  return new Promise((resolve) => {
    let resolved = false;
    const finish = (value) => {
      if (resolved) return;
      resolved = true;
      resolve(value);
    };
    const backdrop = openModal(title, `
      <section class="stack">
        <p>${escapeHtml(message)}</p>
        <div class="button-row">
          ${choices.map((choice) => `<button type="button" class="${escapeHtml(choice.className || "secondary")}" data-choice-value="${escapeHtml(choice.value)}">${escapeHtml(choice.label)}</button>`).join("")}
        </div>
      </section>
    `, null, () => finish(null));
    backdrop.querySelectorAll("[data-choice-value]").forEach((button) => {
      button.addEventListener("click", () => {
        const value = button.dataset.choiceValue;
        backdrop.remove();
        finish(value);
      });
    });
  });
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
  `, async (form) => {
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
  state.view = "projectHome";
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
  bindModalBackdropClose(backdrop, close);

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
  `, async (form) => {
    const fields = collectCategoryFields(form);
    if (removedFieldsHaveValues(category, fields)) {
      const keepRemoving = await openChoiceModal(t("removeField"), t("removedFieldWarning"), [
        { value: "remove", label: t("removeAnyway"), className: "danger" },
        { value: "cancel", label: t("cancel"), className: "secondary" },
      ]);
      if (keepRemoving !== "remove") return false;
    }
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
  attachCategoryFieldActions(category);
}

function renderTemplateExpansionRows(template, universeId) {
  const existingNames = new Set(universeCategories(universeId, true).map((category) => normalizeCategoryName(category.name)));
  return `
    <div class="stack" data-template-category-list>
      ${(template?.categoryPresets || []).map((preset) => {
        const exists = existingNames.has(normalizeCategoryName(preset.name));
        return `
          <label class="template-category-row">
            <span>
              <input name="templateCategory" type="checkbox" value="${escapeHtml(preset.id)}" ${exists ? "" : "checked"} />
              <strong>${escapeHtml(preset.name)}</strong>
              ${exists ? `<span class="badge">${t("alreadyExists")}</span>` : ""}
            </span>
            ${exists ? `<input name="rename:${escapeHtml(preset.id)}" placeholder="${t("renameToAdd")}" />` : ""}
          </label>
        `;
      }).join("")}
    </div>
  `;
}

function uniqueCategoryCopyName(baseName, existingNames) {
  const suffix = t("copySuffix");
  let candidate = `${baseName} ${suffix}`;
  let index = 2;
  while (existingNames.has(normalizeCategoryName(candidate))) {
    candidate = `${baseName} ${suffix} ${index}`;
    index += 1;
  }
  return candidate;
}

function uniqueCategoryName(baseName, existingNames) {
  let candidate = baseName;
  let index = 2;
  while (existingNames.has(normalizeCategoryName(candidate))) {
    candidate = `${baseName} ${index}`;
    index += 1;
  }
  return candidate;
}

function openTemplateExpansionModal() {
  const universe = currentUniverse();
  if (!universe) return;
  const templates = activeItems(state.templates);
  const initialTemplate = templates[0] || builtInTemplates[0];
  const backdrop = openModal(t("addFromTemplate"), `
    <form class="form-grid">
      <label>${t("templates")}
        <select name="templateId" data-template-picker>
          ${templates.map((template) => `<option value="${template.id}">${escapeHtml(template.name)}</option>`).join("")}
        </select>
      </label>
      <section class="stack">
        <h3 class="section-title">${t("templateCategories")}</h3>
        <div data-template-preview>
          ${renderTemplateExpansionRows(initialTemplate, universe.id)}
        </div>
      </section>
      <div class="button-row">
        <button class="secondary" type="button" data-modal-close>← ${t("back")}</button>
        <button type="submit">${t("addSelectedCategories")}</button>
      </div>
    </form>
  `, async (form) => {
    const template = templates.find((item) => item.id === form.get("templateId")) || initialTemplate;
    const selectedIds = new Set(form.getAll("templateCategory"));
    const existingNames = new Set(universeCategories(universe.id, true).map((category) => normalizeCategoryName(category.name)));
    const startOrder = universeCategories(universe.id, true).length;
    const added = [];
    for (const preset of template.categoryPresets || []) {
      if (!selectedIds.has(preset.id)) continue;
      const renamed = String(form.get(`rename:${preset.id}`) || "").trim();
      const duplicate = existingNames.has(normalizeCategoryName(preset.name));
      if (duplicate) {
        const shouldCopy = await openChoiceModal(t("addFromTemplate"), t("duplicateCategoryConfirm"), [
          { value: "copy", label: t("addSelectedCategories"), className: "secondary" },
          { value: "cancel", label: t("cancel"), className: "secondary" },
        ]);
        if (shouldCopy !== "copy") continue;
      }
      const finalName = duplicate
        ? (renamed ? uniqueCategoryName(renamed, existingNames) : uniqueCategoryCopyName(preset.name, existingNames))
        : uniqueCategoryName(preset.name, existingNames);
      existingNames.add(normalizeCategoryName(finalName));
      const presetFields = preset.customFields?.length ? cloneFieldDefinitions(preset.customFields) : createFieldDefinitions(finalName);
      added.push({
        id: id("category"),
        universeId: universe.id,
        name: finalName,
        description: "",
        icon: "",
        color: "",
        order: startOrder + added.length,
        isDefault: template.isBuiltIn || Boolean(getFieldPresetNames(finalName).length),
        isHidden: false,
        customFields: presetFields.length ? presetFields : createFieldDefinitions(finalName),
        createdAt: now(),
        updatedAt: now(),
        deletedAt: null,
      });
    }
    if (!added.length) return;
    state.categories.push(...added);
    state.selectedCategoryId = added[0].id;
    state.selectedEntityId = null;
    state.view = "universe";
    saveState();
    render();
  });
  backdrop?.querySelector("[data-template-picker]")?.addEventListener("change", (event) => {
    const template = templates.find((item) => item.id === event.target.value) || initialTemplate;
    const preview = backdrop.querySelector("[data-template-preview]");
    if (preview) preview.innerHTML = renderTemplateExpansionRows(template, universe.id);
  });
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
      <label>${t("tags")} <input name="tags" placeholder="Main character, Secret" value="${escapeHtml((entity?.tagIds || []).map((tagId) => state.tags.find((tag) => tag.id === tagId)?.name).filter(Boolean).join(", "))}" /></label>
      <div class="stack" data-entity-fields>
        ${renderEntityFormSections(selectedCategory, customFields, entity)}
      </div>
      <section class="form-section stack">
        <h3 class="section-title">${sectionLabel("Notes")}</h3>
        <label>${t("content")} <textarea name="content" placeholder="${t("markdownSupported")}">${escapeHtml(entity?.content || "")}</textarea></label>
      </section>
      <div class="button-row">
        <button class="secondary" type="button" data-add-entity-field>${t("addFieldToCategory")}</button>
      </div>
      <div class="button-row">
        <button type="submit">${t("save")}</button>
        <button class="secondary" type="button" data-modal-close>${t("cancel")}</button>
      </div>
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
    const customFieldValues = isEditing ? { ...(entity.customFieldValues || {}) } : {};
    for (const [key, value] of form.entries()) {
      if (key.startsWith("field:") && value) customFieldValues[key.slice(6)] = value;
      if (key.startsWith("field:") && !value) delete customFieldValues[key.slice(6)];
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
    openModal(t("addFieldToCategory"), `
      <form class="form-grid">
        <label>${t("fieldName")} <input name="fieldName" required /></label>
        <label>${t("fieldType")}
          <select name="fieldType">
            ${renderFieldTypeOptions("text")}
          </select>
        </label>
        <div class="button-row"><button type="submit">${t("addFieldToCategory")}</button></div>
      </form>
    `, (form) => {
      const fieldName = String(form.get("fieldName") || "").trim();
      if (!fieldName) {
        alert(t("fieldNameRequired"));
        return false;
      }
      const field = {
        id: id("field"),
        name: fieldName,
        type: form.get("fieldType") || "text",
        required: false,
        isBuiltIn: false,
      };
      selectedCategory.customFields = [...(selectedCategory.customFields || []), field];
      selectedCategory.updatedAt = now();
      state.categories = state.categories.map((item) => item.id === selectedCategory.id ? selectedCategory : item);
      saveState();
      const fieldContainer = backdrop.querySelector("[data-entity-fields]");
      if (fieldContainer) appendFieldToEntityForm(fieldContainer, selectedCategory, field, entity);
    });
  });
  const entityFieldsContainer = backdrop?.querySelector("[data-entity-fields]");
  let draggedEntityField = null;
  let draggedImageField = null;
  entityFieldsContainer?.addEventListener("dragstart", (event) => {
    const handle = event.target.closest("[data-entity-field-drag-handle]");
    if (!handle) return;
    draggedEntityField = handle.closest("[data-entity-field]");
    draggedEntityField?.classList.add("is-dragging");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", draggedEntityField?.dataset.fieldKey || "");
    setDragImageToElement(event, draggedEntityField);
  });
  entityFieldsContainer?.addEventListener("dragover", (event) => {
    if (!draggedEntityField) return;
    const target = event.target.closest("[data-entity-field]");
    if (!target || target === draggedEntityField) return;
    event.preventDefault();
    target.classList.add("is-drop-target");
  });
  entityFieldsContainer?.addEventListener("dragleave", (event) => {
    event.target.closest("[data-entity-field]")?.classList.remove("is-drop-target");
  });
  entityFieldsContainer?.addEventListener("drop", (event) => {
    if (!draggedEntityField) return;
    const target = event.target.closest("[data-entity-field]");
    if (!target || target === draggedEntityField) return;
    event.preventDefault();
    target.classList.remove("is-drop-target");
    reorderEntityFormField(entityFieldsContainer, selectedCategory, draggedEntityField, target, entity);
  });
  entityFieldsContainer?.addEventListener("dragend", () => {
    entityFieldsContainer.querySelectorAll("[data-entity-field].is-dragging").forEach((field) => field.classList.remove("is-dragging"));
    entityFieldsContainer.querySelectorAll("[data-entity-field].is-drop-target").forEach((field) => field.classList.remove("is-drop-target"));
    draggedEntityField = null;
  });
  entityFieldsContainer?.addEventListener("click", async (event) => {
    const resetPositionButton = event.target.closest("[data-reset-image-position]");
    if (resetPositionButton) {
      const fieldElement = resetPositionButton.closest("[data-entity-field]");
      setImagePreviewPosition(fieldElement, 50, 50);
      return;
    }
    const removeImageButton = event.target.closest("[data-remove-image-field]");
    if (removeImageButton) {
      const fieldElement = removeImageButton.closest("[data-entity-field]");
      const valueInput = fieldElement?.querySelector("[data-image-field-input]");
      const positionInput = fieldElement?.querySelector("[data-image-position-input]");
      const urlInput = fieldElement?.querySelector("[data-image-url-input]");
      const fileInput = fieldElement?.querySelector("[data-image-file-input]");
      const previewSlot = fieldElement?.querySelector(".image-field-preview-slot");
      if (valueInput) valueInput.value = "";
      if (positionInput) positionInput.value = "";
      if (urlInput) urlInput.value = "";
      if (fileInput) fileInput.value = "";
      if (previewSlot) previewSlot.innerHTML = "";
      return;
    }
    const button = event.target.closest("[data-remove-entity-field]");
    if (!button) return;
    const fieldElement = button.closest("[data-entity-field]");
    const fieldId = fieldElement?.dataset.fieldId || "";
    const fieldKey = fieldElement?.dataset.fieldKey || "";
    const fieldName = fieldElement?.dataset.fieldName || "";
    const field = (selectedCategory.customFields || []).find((item) =>
      (fieldId && item.id === fieldId) || fieldStorageKey(item) === fieldKey || item.name === fieldName
    );
    if (!(await confirmFieldRemoval(selectedCategory, field || { name: fieldName, id: fieldId }))) return;
    selectedCategory.customFields = (selectedCategory.customFields || []).filter((item) =>
      !((fieldId && item.id === fieldId) || fieldStorageKey(item) === fieldKey || item.name === fieldName)
    );
    selectedCategory.updatedAt = now();
    state.categories = state.categories.map((item) => item.id === selectedCategory.id ? selectedCategory : item);
    saveState();
    fieldElement?.remove();
  });
  entityFieldsContainer?.addEventListener("input", (event) => {
    const input = event.target.closest("[data-image-url-input]");
    if (!input) return;
    const fieldElement = input.closest("[data-entity-field]");
    const valueInput = fieldElement?.querySelector("[data-image-field-input]");
    const previewSlot = fieldElement?.querySelector(".image-field-preview-slot");
    if (valueInput) valueInput.value = input.value;
    if (!previewSlot) return;
    const position = fieldElement?.querySelector("[data-image-position-input]")?.value || "50,50";
    previewSlot.innerHTML = isPreviewableImageUrl(input.value)
      ? renderImageFieldPreview(input.value, fieldElement.dataset.fieldName || "Image", position, { interactive: true })
      : "";
  });
  entityFieldsContainer?.addEventListener("change", (event) => {
    const referenceSelect = event.target.closest("[data-reference-select]");
    if (referenceSelect) {
      const fieldElement = referenceSelect.closest("[data-entity-field]");
      if (referenceSelect.value) fieldElement?.querySelector("[data-missing-reference-value]")?.remove();
      return;
    }
    const referenceCheckbox = event.target.closest("[data-reference-list-option], [data-reference-list-empty]");
    if (referenceCheckbox) {
      const fieldElement = referenceCheckbox.closest("[data-entity-field]");
      const emptyOption = fieldElement?.querySelector("[data-reference-list-empty]");
      const options = [...(fieldElement?.querySelectorAll("[data-reference-list-option]") || [])];
      if (referenceCheckbox.matches("[data-reference-list-empty]") && referenceCheckbox.checked) {
        options.forEach((option) => {
          option.checked = false;
        });
      }
      if (referenceCheckbox.matches("[data-reference-list-option]") && referenceCheckbox.checked && emptyOption) {
        emptyOption.checked = false;
      }
      const selected = options.filter((option) => option.checked).map((option) => option.value);
      if (emptyOption) emptyOption.checked = !selected.length;
      const valueInput = fieldElement?.querySelector("[data-reference-list-value]");
      if (valueInput) valueInput.value = selected.join(",");
      return;
    }
    const fileInput = event.target.closest("[data-image-file-input]");
    if (!fileInput) return;
    const file = fileInput.files?.[0];
    if (!file) return;
    if (file.size > IMAGE_UPLOAD_MAX_BYTES) {
      fileInput.value = "";
      alert(t("imageTooLarge"));
      return;
    }
    const fieldElement = fileInput.closest("[data-entity-field]");
    const valueInput = fieldElement?.querySelector("[data-image-field-input]");
    const previewSlot = fieldElement?.querySelector(".image-field-preview-slot");
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const value = String(reader.result || "");
      if (valueInput) valueInput.value = value;
      const urlInput = fieldElement?.querySelector("[data-image-url-input]");
      if (urlInput) urlInput.value = "";
      const position = fieldElement?.querySelector("[data-image-position-input]")?.value || "50,50";
      if (previewSlot) previewSlot.innerHTML = renderImageFieldPreview(value, fieldElement.dataset.fieldName || "Image", position, { interactive: true });
    });
    reader.readAsDataURL(file);
  });
  entityFieldsContainer?.addEventListener("pointerdown", (event) => {
    const preview = event.target.closest("[data-image-position-frame]");
    if (!preview) return;
    event.preventDefault();
    draggedImageField = preview.closest("[data-entity-field]");
    preview.classList.add("is-positioning");
    preview.setPointerCapture?.(event.pointerId);
    setImagePreviewPositionFromPointer(draggedImageField, event);
  });
  entityFieldsContainer?.addEventListener("pointermove", (event) => {
    if (!draggedImageField) return;
    event.preventDefault();
    setImagePreviewPositionFromPointer(draggedImageField, event);
  });
  entityFieldsContainer?.addEventListener("pointerup", () => {
    entityFieldsContainer.querySelectorAll("[data-image-position-frame].is-positioning").forEach((preview) => preview.classList.remove("is-positioning"));
    draggedImageField = null;
  });
  entityFieldsContainer?.addEventListener("pointercancel", () => {
    entityFieldsContainer.querySelectorAll("[data-image-position-frame].is-positioning").forEach((preview) => preview.classList.remove("is-positioning"));
    draggedImageField = null;
  });
  entityFieldsContainer?.addEventListener("dragstart", (event) => {
    if (event.target.closest("[data-image-position-frame]")) event.preventDefault();
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
      <label>${t("startupBehavior")}
        <select name="startupBehavior">
          <option value="continue" ${state.settings.startupBehavior === "continue" ? "selected" : ""}>${t("startupContinue")}</option>
          <option value="projectHome" ${state.settings.startupBehavior === "projectHome" ? "selected" : ""}>${t("startupProjectHome")}</option>
          <option value="appHome" ${state.settings.startupBehavior === "appHome" ? "selected" : ""}>${t("startupAppHome")}</option>
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
      startupBehavior: form.get("startupBehavior"),
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
      const importedEntityIds = new Set(validated.entities.map((item) => item.id));
      const remapCustomFieldValues = (values = {}) => Object.fromEntries(Object.entries(values || {}).map(([key, value]) => {
        if (Array.isArray(value)) {
          return [key, value.map((item) => importedEntityIds.has(item) ? mapId(item, "entity") : item)];
        }
        if (typeof value === "string" && importedEntityIds.has(value)) {
          return [key, mapId(value, "entity")];
        }
        if (typeof value === "string" && value.includes(",")) {
          return [key, value.split(",").map((item) => {
            const trimmed = item.trim();
            return importedEntityIds.has(trimmed) ? mapId(trimmed, "entity") : trimmed;
          }).join(",")];
        }
        return [key, value];
      }));
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
        customFieldValues: remapCustomFieldValues(item.customFieldValues || {}),
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
