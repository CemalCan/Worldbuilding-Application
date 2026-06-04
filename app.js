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
    "Status",
    "Start date",
    "End date",
    "Location",
    "Quest giver",
    "Related NPCs",
    "Objective",
    "Reward",
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
    "Loot/Rewards",
    "Next session prep",
  ],
  species: ["Species/Race", "Origin", "Homeland", "Physical traits", "Culture", "Language", "Abilities", "Weaknesses", "History"],
  cultures: ["Culture name", "Region", "Values", "Traditions", "Taboos", "Language", "Clothing", "Food", "History"],
  languages: ["Language name", "Speakers", "Region", "Writing system", "Common phrases", "Origin", "Related languages"],
  governments: ["Government type", "Ruler/Owner", "Capital", "Laws", "Allies", "Enemies", "History"],
  wars: ["War name", "Start date", "End date", "Location", "Sides", "Commanders", "Cause", "Result", "Casualties", "Consequences"],
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
  stories: ["Story title", "Genre", "Status", "Main characters", "Main conflict", "Theme", "Synopsis", "Start event", "End event", "Related timeline entries"],
  books: ["Book number", "Title", "Status", "Summary", "Main plot", "POV characters", "Start chapter", "End chapter"],
  chapters: ["Chapter number", "Title", "Status", "Summary", "POV character", "Location", "Related scenes", "Related events", "Word count goal", "Draft notes"],
  scenes: ["Scene number", "Title", "Status", "POV character", "Location", "Characters present", "Time/date", "Purpose", "Conflict", "Outcome", "Related event", "Draft text", "Revision notes"],
  plotThreads: ["Thread type", "Status", "Related characters", "Related scenes", "Setup", "Payoff", "Notes"],
  themes: ["Theme type", "Related characters", "Related scenes", "Symbolism", "Notes"],
  draftNotes: ["Status", "Related scenes", "Related characters", "Draft text", "Revision notes", "Notes"],
  maps: ["Map name", "Map type", "Map image", "Description", "Related locations", "Related regions", "Related events", "Notes"],
  mapPins: ["Pin label", "Pin type", "Linked entry", "Map", "X position", "Y position", "Description", "Visible/hidden", "Related event", "Related quest"],
  routes: ["Route name", "Start location", "End location", "Stops", "Distance", "Travel time", "Danger level", "Notes"],
  regions: ["Region name", "Region type", "Parent location", "Ruler/Owner", "Climate", "Population", "Important places", "Notes"],
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
  "Story title": "Hikaye başlığı",
  Genre: "Tür",
  Theme: "Tema",
  Synopsis: "Sinopsis",
  "Start event": "Başlangıç olayı",
  "End event": "Bitiş olayı",
  "Related timeline entries": "Bağlı zaman çizelgesi kayıtları",
  "Book number": "Kitap numarası",
  "Main plot": "Ana olay örgüsü",
  "POV characters": "Bakış açısı karakterleri",
  "Start chapter": "Başlangıç bölümü",
  "End chapter": "Bitiş bölümü",
  "Chapter number": "Bölüm numarası",
  "POV character": "Bakış açısı karakteri",
  "Related scenes": "Bağlı sahneler",
  "Related events": "Bağlı olaylar",
  "Word count goal": "Kelime hedefi",
  "Draft notes": "Taslak notları",
  "Scene number": "Sahne numarası",
  "Characters present": "Sahnede olan karakterler",
  "Time/date": "Zaman/tarih",
  Purpose: "Amaç",
  Conflict: "Çatışma",
  Outcome: "Sonuç",
  "Related event": "Bağlı olay",
  "Draft text": "Taslak metin",
  "Revision notes": "Revizyon notları",
  "Thread type": "Örgü türü",
  "Related characters": "Bağlı karakterler",
  Setup: "Kurulum",
  Payoff: "Karşılık",
  "Theme type": "Tema türü",
  Symbolism: "Sembolizm",
  "Map name": "Harita adı",
  "Map type": "Harita türü",
  "Map image": "Harita görseli",
  "Related locations": "Bağlı mekânlar",
  "Related regions": "Bağlı bölgeler",
  "Pin label": "Pin etiketi",
  "Pin type": "Pin türü",
  "Linked entry": "Bağlı kayıt",
  Map: "Harita",
  "X position": "X konumu",
  "Y position": "Y konumu",
  "Visible/hidden": "Görünür/gizli",
  "Related quest": "Bağlı görev",
  "Route name": "Rota adı",
  "Start location": "Başlangıç mekânı",
  "End location": "Bitiş mekânı",
  Stops: "Duraklar",
  Distance: "Mesafe",
  "Travel time": "Seyahat süresi",
  "Danger level": "Tehlike seviyesi",
  "Region name": "Bölge adı",
  "Region type": "Bölge türü",
  "Parent location": "Üst mekân",
  "Important places": "Önemli yerler",
};

const categoryPresetAliases = {
  campaign: "campaign",
  stories: "stories",
  story: "stories",
  hikayeler: "stories",
  "hikâyeler": "stories",
  books: "books",
  kitaplar: "books",
  chapters: "chapters",
  bolumler: "chapters",
  bölümler: "chapters",
  scenes: "scenes",
  sahneler: "scenes",
  "plot threads": "plotThreads",
  "olay örgüleri": "plotThreads",
  "plot thread": "plotThreads",
  themes: "themes",
  temalar: "themes",
  "draft notes": "draftNotes",
  "taslak notları": "draftNotes",
  maps: "maps",
  map: "maps",
  haritalar: "maps",
  harita: "maps",
  "map pins": "mapPins",
  pins: "mapPins",
  pinler: "mapPins",
  routes: "routes",
  rotalar: "routes",
  regions: "regions",
  bolgeler: "regions",
  bölgeler: "regions",
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
  dungeons: "locations",
  zindanlar: "locations",
  "holy places": "locations",
  "kutsal mekanlar": "locations",
  events: "events",
  olaylar: "events",
  wars: "wars",
  savaslar: "wars",
  "savaşlar": "events",
  scenes: "scenes",
  sahneler: "scenes",
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
  armies: "armies",
  ordular: "armies",
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
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function getFieldPresetNames(categoryName) {
  const normalized = normalizeCategoryName(categoryName);
  const group = categoryPresetAliases[normalized];
  return group ? categoryFieldPresetGroups[group] || [] : [];
}

function inferCategoryTypeFromFields(category) {
  const keys = new Set((category?.customFields || []).map((field) => fieldStorageKey(field)));
  let bestType = "";
  let bestScore = 0;
  Object.entries(categoryFieldPresetGroups).forEach(([type, names]) => {
    const score = names.filter((name) => keys.has(fieldPresetKey(name))).length;
    if (score > bestScore) {
      bestType = type;
      bestScore = score;
    }
  });
  return bestScore >= 2 ? bestType : "";
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
    armies: { singular: "army", plural: "armies" },
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
    stories: { singular: "story", plural: "stories" },
    books: { singular: "book", plural: "books" },
    chapters: { singular: "chapter", plural: "chapters" },
    scenes: { singular: "scene", plural: "scenes" },
    plotThreads: { singular: "plot thread", plural: "plot threads" },
    themes: { singular: "theme", plural: "themes" },
    draftNotes: { singular: "draft note", plural: "draft notes" },
    maps: { singular: "map", plural: "maps" },
    mapPins: { singular: "map pin", plural: "map pins" },
    routes: { singular: "route", plural: "routes" },
    regions: { singular: "region", plural: "regions" },
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
    stories: { singular: "Hikaye", plural: "hikaye" },
    books: { singular: "Kitap", plural: "kitap" },
    chapters: { singular: "Bölüm", plural: "bölüm" },
    scenes: { singular: "Sahne", plural: "sahne" },
    plotThreads: { singular: "Olay örgüsü", plural: "olay örgüsü" },
    themes: { singular: "Tema", plural: "tema" },
    draftNotes: { singular: "Taslak notu", plural: "taslak notu" },
    maps: { singular: "Harita", plural: "harita" },
    mapPins: { singular: "Harita pini", plural: "harita pini" },
    routes: { singular: "Rota", plural: "rota" },
    regions: { singular: "Bölge", plural: "bölge" },
    partyMembers: { singular: "Parti üyesi", plural: "parti üyesi" },
    dungeons: { singular: "Zindan", plural: "zindan" },
    lootRewards: { singular: "Ödül", plural: "ödül" },
    ruleNotes: { singular: "Kural notu", plural: "kural notu" },
    entry: { singular: "Kayıt", plural: "kayıt" },
  },
};

function getCategoryTypeKey(category) {
  if (!category) return "entry";
  const explicitType = category.presetType || category.typeKey || category.categoryType;
  if (explicitType && categoryFieldPresetGroups[explicitType]) return explicitType;
  return categoryPresetAliases[normalizeCategoryName(category.name)] || inferCategoryTypeFromFields(category) || "entry";
}

function getEntityTypeLabel(category, form = "singular") {
  const language = state?.settings?.language || "en";
  const key = getCategoryTypeKey(category);
  if (language === "tr" && key === "armies") return form === "plural" ? "ordu" : "Ordu";
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
  const categoryType = categoryTypeForName(categoryName);
  return getFieldPresetNames(categoryName).map((name) => {
    const targetCategoryTypes = referenceTargetTypes(categoryType || categoryName, name);
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
  if (["Synopsis", "Summary", "Main plot", "Draft notes", "Draft text", "Revision notes", "Setup", "Payoff", "Notes", "Symbolism"].includes(fieldName)) return "longText";
  if (["Book number", "Chapter number", "Scene number", "Word count goal", "X position", "Y position", "Distance", "Travel time", "Population"].includes(fieldName)) return "number";
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
  "Main characters",
  "POV characters",
  "Related timeline entries",
  "Related scenes",
  "Related events",
  "Characters present",
  "Related characters",
  "Related locations",
  "Related regions",
  "Stops",
  "Important places",
  "Rewards",
  "Commanders",
  "Sides",
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
  stories: {
    "Main characters": ["characters"],
    "Start event": ["events", "wars", "sessionNotes", "quests"],
    "End event": ["events", "wars", "sessionNotes", "quests"],
    "Related timeline entries": ["events", "wars", "sessionNotes", "quests"],
  },
  books: {
    "POV characters": ["characters"],
    "Start chapter": ["chapters"],
    "End chapter": ["chapters"],
  },
  chapters: {
    "POV character": ["characters"],
    Location: ["locations"],
    "Related scenes": ["scenes"],
    "Related events": ["events", "wars"],
  },
  scenes: {
    "POV character": ["characters"],
    Location: ["locations"],
    "Characters present": ["characters"],
    "Related event": ["events", "wars"],
  },
  plotThreads: {
    "Related characters": ["characters"],
    "Related scenes": ["scenes"],
  },
  themes: {
    "Related characters": ["characters"],
    "Related scenes": ["scenes"],
  },
  draftNotes: {
    "Related scenes": ["scenes"],
    "Related characters": ["characters"],
  },
  maps: {
    "Related locations": ["locations"],
    "Related regions": ["regions"],
    "Related events": ["events", "wars", "sessionNotes", "quests"],
  },
  mapPins: {
    "Linked entry": ["locations", "characters", "events", "quests", "organizations", "items", "creatures", "regions"],
    Map: ["maps"],
    "Related event": ["events", "wars", "sessionNotes", "quests"],
    "Related quest": ["quests"],
  },
  routes: {
    "Start location": ["locations", "regions"],
    "End location": ["locations", "regions"],
    Stops: ["locations", "regions"],
  },
  regions: {
    "Parent location": ["locations", "regions"],
    "Ruler/Owner": ["characters", "organizations", "governments"],
    "Important places": ["locations"],
  },
  sessionNotes: {
    "Players present": ["partyMembers", "characters"],
    "Loot/rewards": ["lootRewards", "items"],
    "Loot/Rewards": ["lootRewards", "items"],
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
    Sides: ["governments", "organizations"],
    Commanders: ["characters"],
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
    "Main characters": ["characters"],
    "POV character": ["characters"],
    "POV characters": ["characters"],
    "Characters present": ["characters"],
    "Related characters": ["characters"],
    "Related scenes": ["scenes"],
    "Related events": ["events", "wars"],
    "Related event": ["events", "wars"],
    "Start event": ["events", "wars"],
    "End event": ["events", "wars"],
    "Start chapter": ["chapters"],
    "End chapter": ["chapters"],
    "Related timeline entries": ["events", "wars", "sessionNotes", "quests"],
    "Related locations": ["locations"],
    "Related regions": ["regions"],
    "Linked entry": ["locations", "characters", "events", "quests", "organizations", "items", "creatures", "regions"],
    Map: ["maps"],
    "Related quest": ["quests"],
    "Start location": ["locations", "regions"],
    "End location": ["locations", "regions"],
    Stops: ["locations", "regions"],
    "Parent location": ["locations", "regions"],
    "Important places": ["locations"],
    "Players present": ["partyMembers", "characters"],
    "Loot/rewards": ["lootRewards", "items"],
    "Loot/Rewards": ["lootRewards", "items"],
    Rewards: ["lootRewards", "items"],
    Sides: ["governments", "organizations"],
    Commanders: ["characters"],
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

function isSystemFieldValueKey(key) {
  const valueKey = String(key || "");
  return valueKey.endsWith(":label")
    || valueKey.endsWith(":labels")
    || valueKey.endsWith(":position")
    || /^preset:[^:]+:(label|labels|position)$/i.test(valueKey)
    || valueKey.startsWith("__")
    || valueKey.startsWith("sync:");
}

function isSystemFieldValueEntry(key, value) {
  if (isSystemFieldValueKey(key)) return true;
  if (String(key || "").startsWith("preset:") && /labels?/i.test(String(key))) return true;
  if (typeof value === "string" && value.trim().startsWith("{")) {
    const parsed = parseJsonObject(value);
    const keys = Object.keys(parsed);
    if (keys.length && keys.every((item) => looksLikeEntityId(item))) return true;
  }
  return false;
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
  stories: {
    Basics: ["Story title", "Genre", "Status", "Synopsis"],
    Cast: ["Main characters"],
    Plot: ["Main conflict", "Start event", "End event", "Related timeline entries"],
    Themes: ["Theme"],
  },
  books: {
    Basics: ["Book number", "Title", "Status", "Summary"],
    Plot: ["Main plot", "Start chapter", "End chapter"],
    Cast: ["POV characters"],
  },
  chapters: {
    Basics: ["Chapter number", "Title", "Status", "Summary", "Word count goal"],
    Story: ["POV character", "Location", "Related scenes", "Related events"],
    Draft: ["Draft notes"],
  },
  scenes: {
    Basics: ["Scene number", "Title", "Status", "Time/date"],
    Story: ["POV character", "Location", "Characters present", "Related event"],
    Conflict: ["Purpose", "Conflict", "Outcome"],
    Draft: ["Draft text", "Revision notes"],
  },
  plotThreads: {
    Basics: ["Thread type", "Status"],
    Connections: ["Related characters", "Related scenes"],
    Story: ["Setup", "Payoff", "Notes"],
  },
  themes: {
    Basics: ["Theme type", "Symbolism"],
    Connections: ["Related characters", "Related scenes"],
    Notes: ["Notes"],
  },
  draftNotes: {
    Basics: ["Status"],
    Connections: ["Related scenes", "Related characters"],
    Draft: ["Draft text", "Revision notes", "Notes"],
  },
  maps: {
    Basics: ["Map name", "Map type", "Map image", "Description"],
    Connections: ["Related locations", "Related regions", "Related events"],
    Notes: ["Notes"],
  },
  mapPins: {
    Basics: ["Pin label", "Pin type", "Visible/hidden", "Description"],
    Connections: ["Linked entry", "Map", "Related event", "Related quest"],
    Position: ["X position", "Y position"],
  },
  routes: {
    Basics: ["Route name", "Distance", "Travel time", "Danger level"],
    Connections: ["Start location", "End location", "Stops"],
    Notes: ["Notes"],
  },
  regions: {
    Basics: ["Region name", "Region type", "Climate", "Population"],
    Connections: ["Parent location", "Ruler/Owner", "Important places"],
    Notes: ["Notes"],
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
  Cast: "Kadro",
  Plot: "Olay örgüsü",
  Themes: "Temalar",
  Draft: "Taslak",
  Conflict: "Çatışma",
  Position: "Konum",
};

function sectionLabel(name) {
  return state.settings.language === "tr" ? sectionLabelTranslations[name] || name : name;
}

function fieldSectionName(category, field) {
  if (field?.section) return field.section;
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

function renderFieldValue(field, value, values = {}) {
  if (field?.type === "image" && isPreviewableImageUrl(value)) {
    return renderImageFieldPreview(value, fieldLabel(field), "50,50");
  }
  if (field?.type === "entityReference") {
    return renderReferenceValue(value, referenceLabelSnapshot(values, fieldStorageKey(field)));
  }
  if (field?.type === "entityReferenceList") {
    return renderReferenceListValue(value, referenceLabelsSnapshot(values, fieldStorageKey(field)));
  }
  return `<p class="muted">${escapeHtml(value)}</p>`;
}

function entityByReferenceId(entityId) {
  return state.entities.find((entity) => entity.id === entityId && !entity.deletedAt) || null;
}

function renderReferenceChip(entityId, fallbackLabel = "") {
  const entity = entityByReferenceId(entityId);
  if (!entity) return `<span class="badge">${escapeHtml(missingReferenceLabel(fallbackLabel))}</span>`;
  return `<button class="badge link-chip" data-action="select-entity" data-id="${entity.id}">${escapeHtml(entity.title)}</button>`;
}

function missingReferenceLabel(label = "") {
  return label ? `${t("missingEntry")} (${label})` : t("missingEntry");
}

function referenceLabelSnapshot(values, key) {
  return values?.[`${key}:label`] || "";
}

function referenceLabelsSnapshot(values, key) {
  try {
    const parsed = JSON.parse(values?.[`${key}:labels`] || "{}");
    return isPlainObject(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function renderReferenceValue(value, label = "") {
  if (!value) return `<p class="muted">${t("noneCreateNew")}</p>`;
  if (!isExistingEntityId(value)) return `<p class="muted">${escapeHtml(String(value))}</p>`;
  return `<div class="tag-row">${renderReferenceChip(value, label)}</div>`;
}

function renderReferenceListValue(value, labels = {}) {
  const values = normalizeReferenceListValue(value);
  if (!values.length) return `<p class="muted">${t("noneCreateNew")}</p>`;
  const known = values.filter(isExistingEntityId);
  const legacy = values.filter((item) => !isExistingEntityId(item));
  return `
    <div class="tag-row">
      ${known.map((item) => renderReferenceChip(item, labels[item])).join("")}
      ${legacy.map((item) => `<span class="badge">${escapeHtml(item)}</span>`).join("")}
    </div>
  `;
}

function referenceDisplayText(field, value, values = {}) {
  const key = fieldStorageKey(field);
  if (field?.type === "entityReference") {
    if (!value) return "";
    return entityByReferenceId(value)?.title || (isExistingEntityId(value) ? missingReferenceLabel(referenceLabelSnapshot(values, key)) : String(value));
  }
  if (field?.type === "entityReferenceList") {
    const labels = referenceLabelsSnapshot(values, key);
    return normalizeReferenceListValue(value)
      .map((item) => entityByReferenceId(item)?.title || (isExistingEntityId(item) ? missingReferenceLabel(labels[item]) : item))
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
  if (language === "tr") {
    const trLabels = {
      text: "KÄ±sa Metin",
      longText: "Uzun Metin",
      number: "SayÄ±",
      date: "Tarih",
      boolean: "Evet/HayÄ±r",
      select: "Tek SeÃ§im",
      multiSelect: "Ã‡oklu SeÃ§im",
      entityReference: "KayÄ±t BaÄŸlantÄ±sÄ±",
      entityReferenceList: "KayÄ±t BaÄŸlantÄ± Listesi",
      url: "URL",
      image: "GÃ¶rsel",
    };
    const base = fieldTypeText.tr?.[type] || fieldTypeText.en[type] || { help: "" };
    return { ...base, label: trLabels[type] || base.label || type };
  }
  return fieldTypeText[language]?.[type] || fieldTypeText.en[type] || { label: type, help: "" };
}

function renderFieldTypeOptions(selectedType = "text") {
  return fieldTypeOrder.map((type) => {
    const typeInfo = fieldTypeInfo(type);
    return `<option value="${type}" title="${escapeHtml(typeInfo.help)}" ${selectedType === type ? "selected" : ""}>${escapeHtml(typeInfo.label)}</option>`;
  }).join("");
}

function addFieldButtonLabel() {
  return state.settings.language === "tr" ? "Alan Ekle" : "Add Field";
}

function linkedCategoryLabel() {
  return state.settings.language === "tr" ? "BaÄŸlÄ± Kategori" : "Linked Category";
}

function addRequiredCategoryLabel() {
  return state.settings.language === "tr" ? "Gerekli kategoriyi ÅŸablondan ekle" : "Add required category from template";
}

function editCategoryLabel() {
  return state.settings.language === "tr" ? "Kategoriyi DÃ¼zenle" : "Edit Category";
}

function editEntryLabel() {
  return state.settings.language === "tr" ? "KaydÄ± DÃ¼zenle" : "Edit Entry";
}

function organizeCategoriesLabel() {
  return state.settings.language === "tr" ? "Kategorileri DÃ¼zenle" : "Organize Categories";
}

function categoryTypeOptions(selectedTypes = []) {
  const selected = new Set(selectedTypes || []);
  const language = state?.settings?.language || "en";
  return Object.entries(entityTypeLabels.en)
    .filter(([type]) => type !== "entry")
    .map(([type, labels]) => {
      const label = entityTypeLabels[language]?.[type]?.plural || labels.plural || type;
      return `<option value="${type}" ${selected.has(type) ? "selected" : ""}>${escapeHtml(label)}</option>`;
    })
    .join("");
}

function renderEntityCustomFieldInput(field, entity, categoryOverride = null) {
  const value = fieldInputValue(field, entity);
  const category = categoryOverride || entityCategory(entity);
  const isImage = field.type === "image";
  const isReference = field.type === "entityReference" || field.type === "entityReferenceList";
  if (isReference) return renderReferenceFieldInput(field, entity, value);
  if (field.name === "Status" && category && storyCategoryTypes.has(getCategoryTypeKey(category))) {
    return `
      <div class="field-entry" data-entity-field data-field-id="${escapeHtml(field.id || "")}" data-field-key="${escapeHtml(fieldStorageKey(field))}" data-field-name="${escapeHtml(field.name || "")}">
        <button class="field-drag-handle" type="button" draggable="true" tabindex="-1" data-entity-field-drag-handle title="${escapeHtml(t("dragToReorder"))}" aria-label="${escapeHtml(t("dragToReorder"))}">☰</button>
        <label>${escapeHtml(fieldLabel(field))}
          <select name="field:${escapeHtml(fieldStorageKey(field))}">
            ${["Idea", "Planned", "Drafting", "Revising", "Revised", "Done", "Archived"].map((status) => `<option value="${status}" ${storyStatusKey(value) === storyStatusKey(status) ? "selected" : ""}>${storyStatusLabel(storyStatusKey(status))}</option>`).join("")}
          </select>
        </label>
        <button class="secondary danger-text" type="button" tabindex="-1" data-remove-entity-field>${t("removeField")}</button>
      </div>
    `;
  }
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
    <details class="form-section stack collapsible-section" data-form-section="${escapeHtml(section)}" open>
      <summary class="section-title">${escapeHtml(sectionLabel(section))}</summary>
      ${sectionFields.map((field) => renderEntityCustomFieldInput(field, entity, category)).join("")}
    </details>
  `).join("");
}

function appendFieldToEntityForm(container, category, field, entity) {
  const section = fieldSectionName(category, field);
  let sectionElement = [...container.querySelectorAll("[data-form-section]")].find((item) => item.dataset.formSection === section);
  if (!sectionElement) {
    container.insertAdjacentHTML("beforeend", `
      <details class="form-section stack collapsible-section" data-form-section="${escapeHtml(section)}" open>
        <summary class="section-title">${escapeHtml(sectionLabel(section))}</summary>
      </details>
    `);
    sectionElement = [...container.querySelectorAll("[data-form-section]")].find((item) => item.dataset.formSection === section);
  }
  sectionElement?.insertAdjacentHTML("beforeend", renderEntityCustomFieldInput(field, entity, category));
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
  const rows = [...fields];
  return `
    <section class="card stack" data-field-manager>
      <div class="row">
        <h3 class="section-title">${t("customFieldsLabel")}</h3>
        <div class="button-row">
          <button class="secondary" type="button" tabindex="-1" data-reset-field-order>${t("resetFieldOrder")}</button>
          <button class="secondary" type="button" tabindex="-1" data-reset-category-fields>${t("resetFields")}</button>
          <button class="secondary" type="button" data-add-category-field>${addFieldButtonLabel()}</button>
        </div>
      </div>
      <p class="muted">${t("addFieldHint")}</p>
      <datalist id="field-section-options">
        ${Object.keys(sectionLabelTranslations).map((section) => `<option value="${escapeHtml(sectionLabel(section))}"></option>`).join("")}
      </datalist>
      <div class="stack" data-field-editor-list>
        ${rows.map((field) => renderFieldEditorRow(field, category)).join("")}
      </div>
    </section>
  `;
}

function renderFieldEditorRow(field = { id: "", name: "", type: "text", required: false }, category) {
  const fieldType = field.type || "text";
  const isLinkType = fieldType === "entityReference" || fieldType === "entityReferenceList";
  const sectionValue = field.section || fieldSectionName(category, field);
  return `
    <div class="field-editor-row two-col" data-field-editor-row>
      <button class="field-drag-handle" type="button" draggable="true" tabindex="-1" data-field-drag-handle title="${escapeHtml(t("dragToReorder"))}" aria-label="${escapeHtml(t("dragToReorder"))}">::</button>
      <label>${t("fieldName")}
        <input name="fieldName" value="${escapeHtml(fieldLabel(field))}" />
      </label>
      <label>${t("fieldType")}
        <select name="fieldType" title="${escapeHtml(fieldTypeInfo(fieldType).help)}">
          ${renderFieldTypeOptions(fieldType)}
        </select>
        <small class="muted">${escapeHtml(fieldTypeInfo(fieldType).help)}</small>
      </label>
      <label>${state.settings.language === "tr" ? "BÃ¶lÃ¼m" : "Section"}
        <input name="fieldSection" list="field-section-options" value="${escapeHtml(sectionLabel(sectionValue))}" data-section-input />
      </label>
      <label data-link-target-field ${isLinkType ? "" : "hidden"}>${linkedCategoryLabel()}
        <select name="fieldTargetTypes" multiple size="5">
          ${categoryTypeOptions(field.targetCategoryTypes || [])}
        </select>
        <small class="muted">${fieldTypeInfo("entityReference").help}</small>
      </label>
      <div class="field-row-actions" aria-label="${escapeHtml(t("fieldActions"))}">
        <button class="secondary danger-text" type="button" tabindex="-1" data-remove-category-field title="${escapeHtml(t("removeField"))}">x ${t("removeField")}</button>
      </div>
      <input type="hidden" name="fieldId" value="${escapeHtml(field.id || "")}" />
      <input type="hidden" name="fieldPresetKey" value="${escapeHtml(field.presetKey || "")}" />
      <input type="hidden" name="fieldOriginalName" value="${escapeHtml(field.name || "")}" />
      <input type="hidden" name="fieldBuiltIn" value="${field.isBuiltIn ? "true" : "false"}" />
    </div>
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
      targetCategoryTypes: [...(row.querySelector('[name="fieldTargetTypes"]')?.selectedOptions || [])].map((option) => option.value),
      section: sectionKeyFromLabel(String(row.querySelector('[name="fieldSection"]')?.value || "").trim()) || undefined,
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

function parseJsonObject(value) {
  try {
    const parsed = JSON.parse(value || "{}");
    return isPlainObject(parsed) ? parsed : {};
  } catch {
    return {};
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
  const syncLinkTargetVisibility = (row) => {
    const type = row.querySelector('[name="fieldType"]')?.value || "text";
    const target = row.querySelector("[data-link-target-field]");
    if (target) target.hidden = !(type === "entityReference" || type === "entityReferenceList");
  };
  const attachDynamicFieldControls = () => {
    document.querySelectorAll("[data-field-editor-row]").forEach((row) => {
      syncLinkTargetVisibility(row);
      row.querySelector('[name="fieldType"]')?.addEventListener("change", () => syncLinkTargetVisibility(row));
    });
  };
  document.querySelector("[data-add-category-field]")?.addEventListener("click", () => {
    const list = document.querySelector("[data-field-editor-list]");
    if (!list) return;
    list.insertAdjacentHTML("beforeend", renderFieldEditorRow({ id: "", name: "", type: "text", required: false }, category));
    attachCategoryFieldActions(category);
  });
  document.querySelector("[data-reset-field-order]")?.addEventListener("click", () => {
    const form = document.querySelector(".modal-backdrop form");
    const fieldSection = form?.querySelector("[data-field-manager]");
    if (!fieldSection) return;
    const fields = collectCategoryFields(form);
    const defaultNames = getFieldPresetNames(category.name);
    const orderIndex = new Map(defaultNames.map((name, index) => [fieldPresetKey(name), index]));
    const reordered = [...fields].sort((a, b) => {
      const aIndex = orderIndex.has(fieldStorageKey(a)) ? orderIndex.get(fieldStorageKey(a)) : Number.MAX_SAFE_INTEGER;
      const bIndex = orderIndex.has(fieldStorageKey(b)) ? orderIndex.get(fieldStorageKey(b)) : Number.MAX_SAFE_INTEGER;
      if (aIndex !== bIndex) return aIndex - bIndex;
      return fields.indexOf(a) - fields.indexOf(b);
    });
    fieldSection.outerHTML = renderFieldManager(reordered, category);
    attachCategoryFieldActions(category);
  });
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
  attachDynamicFieldControls();
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
  ["blank", "Boş Evren", "Temel not, karakter, mekan ve olay yapısı.", ["Notlar", "Karakterler", "Mekanlar", "Olaylar", "Stories", "Chapters", "Scenes", "Maps", "Map Pins"]],
  ["writing", "Writing / Story Planning", "Stories, books, chapters, scenes, plot threads, themes, and draft notes.", ["Stories", "Books", "Chapters", "Scenes", "Plot Threads", "Themes", "Draft Notes", "Characters", "Locations", "Events", "Notes"]],
  ["medieval", "Orta Çağ", "Hanedanlar, krallıklar, kaleler ve savaşlar.", ["Karakterler", "Aileler", "Hanedanlar", "Krallıklar", "Şehirler", "Köyler", "Kaleler", "Dinler", "Loncalar", "Ordular", "Savaşlar", "Eşyalar", "Zaman çizelgesi", "Notlar"]],
  ["fantasy", "Fantastik", "Büyü, tanrılar, ırklar, efsaneler ve artefaktlar.", ["Karakterler", "Aileler", "Irklar", "Krallıklar", "Mekanlar", "Regions", "Maps", "Map Pins", "Routes", "Büyüler", "Büyü sistemleri", "Dinler", "Tanrılar", "Canavarlar", "Artefaktlar", "Kehanetler", "Efsaneler", "Savaşlar", "Zaman çizelgesi", "Notlar"]],
  ["dark-fantasy", "Karanlık Fantastik", "Lanetler, tarikatlar ve yasak bilgiler.", ["Karakterler", "Lanetler", "Tarikatlar", "Canavarlar", "Tanrılar", "Yasak büyüler", "Kayıp şehirler", "Kurbanlar", "Günahlar", "Kehanetler", "Eşyalar", "Olaylar", "Notlar"]],
  ["cyberpunk", "Cyberpunk", "Megakentler, şirketler, çeteler ve siber implantlar.", ["Karakterler", "Megakentler", "Şirketler", "Çeteler", "Hacker grupları", "Siber implantlar", "Yapay zekalar", "Sanal ağlar", "Suç dosyaları", "Kara borsa", "Güvenlik güçleri", "Silahlar", "Notlar", "Zaman çizelgesi"]],
  ["sci-fi", "Bilim Kurgu", "Gezegenler, yıldız sistemleri ve teknolojiler.", ["Karakterler", "Gezegenler", "Yıldız sistemleri", "Uzay gemileri", "Uzaylı türler", "Teknolojiler", "Yapay zekalar", "Koloniler", "Federasyonlar", "Şirketler", "Silah sistemleri", "Bilimsel kurallar", "Görev kayıtları", "Notlar"]],
  ["space-opera", "Uzay Operası", "İmparatorluklar, filolar ve politik ittifaklar.", ["Karakterler", "Hanedanlar", "İmparatorluklar", "Gezegenler", "Yıldız sistemleri", "Filolar", "Uzay gemileri", "Komutanlar", "Savaşlar", "Politik ittifaklar", "Uzaylı türler", "Antik teknolojiler", "Notlar"]],
  ["post-apocalyptic", "Post-Apokaliptik", "Sığınaklar, kaynaklar, fraksiyonlar ve tehditler.", ["Karakterler", "Hayatta kalan gruplar", "Sığınaklar", "Tehlikeli bölgeler", "Kaynaklar", "Mutasyonlar", "Hastalıklar", "Eski dünya kalıntıları", "Fraksiyonlar", "Araçlar", "Tehditler", "Notlar"]],
  ["detective", "Polisiye", "Suç dosyaları, deliller, alibiler ve şüpheliler.", ["Dedektifler", "Şüpheliler", "Kurbanlar", "Suç dosyaları", "Deliller", "Tanıklar", "İfadeler", "Olay yerleri", "Alibiler", "Motifler", "Yanlış ipuçları", "Zaman çizelgesi", "Notlar"]],
  ["horror", "Korku", "Ritüeller, canavarlar, gizemler ve travmalar.", ["Karakterler", "Kurbanlar", "Canavarlar", "Lanetler", "Ritüeller", "Yasak bilgiler", "Mekanlar", "Günlükler", "Gizemler", "Travmalar", "Doğaüstü kurallar", "Notlar"]],
  ["romance", "Romantik Drama", "İlişkiler, sırlar ve duygusal çatışmalar.", ["Stories", "Books", "Chapters", "Scenes", "Plot Threads", "Themes", "Karakterler", "İlişkiler", "Aileler", "Sosyal çevreler", "Geçmiş ilişkiler", "Duygusal çatışmalar", "Sırlar", "Dönüm noktaları", "Notlar"]],
  ["mythological", "Mitolojik", "Panteonlar, kutsal mekanlar ve ilahi yasalar.", ["Tanrılar", "Yarı tanrılar", "Panteonlar", "Kutsal mekanlar", "Ritüeller", "Kehanetler", "Efsaneler", "Kutsal eşyalar", "Ölüm sonrası alemler", "İlahi yasalar", "Notlar"]],
  ["rpg", "RPG / D&D Campaign", "Campaign, NPC, görev, oturum ve encounter takibi.", ["Campaign", "Oyuncu karakterleri", "NPC'ler", "Parti üyeleri", "Görevler", "Oturum notları", "Mekanlar", "Maps", "Map Pins", "Routes", "Regions", "Zindanlar", "Encounter'lar", "Canavarlar", "Loot / Ödüller", "Fraksiyonlar", "Tanrılar", "Kural notları"]],
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
let latestConsistencyFixes = new Map();

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
    workspace: "Workspace",
    more: "More",
    homeNav: "Home",
    projectHome: "Project home",
    projectSummary: "Project summary",
    nextSteps: "Next Steps",
    categoryOverview: "Category overview",
    moduleOverview: "Module overview",
    continueWorking: "Continue working",
    emptyProjectGuidance: "Next steps",
    lastUpdated: "Last updated",
    entries: "Entries",
    consistencyIssues: "Consistency issues",
    activeTodos: "Active todos",
    createFirstCharacter: "Create your first character",
    addLocationStep: "Add a location",
    addEventStep: "Add an event",
    writeQuickIdea: "Write a quick idea",
    recentEntries: "Recent entries",
    template: "Template",
    noRecentEntries: "No recent entries yet.",
    createEntry: "Create entry",
    addCategory: "Add category",
    addFromTemplate: "Add from template",
    addTemplateFirst: "Add the matching category from a template first.",
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
    selectPlaceholder: "Select...",
    noneCreateNew: "None",
    createNew: "Create new",
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
    referencedBy: "Referenced by",
    details: "Details",
    connections: "Connections",
    relationshipOverview: "Relationship Overview",
    relationshipGraph: "Relationship Graph",
    mapBoard: "Map Board",
    consistencyChecker: "Consistency Checker",
    runCheck: "Run check",
    critical: "Critical",
    warning: "Warning",
    info: "Info",
    type: "Type",
    severity: "Severity",
    suggestedFix: "Suggested fix",
    openEntry: "Open entry",
    ignore: "Ignore",
    ignored: "Ignored",
    fix: "Fix",
    applyFix: "Apply fix",
    confirmApplyFix: "This will clean up the broken reference or inconsistency. Continue?",
    pinWithoutLabel: "Pin without label.",
    pinWithoutLinkedEntry: "Pin has no linked entry.",
    missingDateOrChronology: "Missing date or chronology label.",
    missingLocation: "Missing location.",
    missingParticipants: "Missing participants.",
    missingStatus: "Missing status.",
    missingSessionNumberOrDate: "Missing session number or date.",
    endDateBeforeStartDate: "End date is before start date.",
    duplicateTitle: "Duplicate title",
    duplicateMapPin: "Duplicate map pin",
    mapWithoutImage: "Map without image.",
    noConsistencyIssues: "No consistency issues found.",
    findingType: "Finding type",
    showIgnored: "Show ignored",
    missingLinkedEntry: "Missing linked entry",
    removeMissingReference: "Remove missing reference",
    addCharacterToFamilyMembers: "Add character to family members",
    updateCharacterFamilyField: "Update character family field",
    mapPins: "Map pins",
    selectMap: "Select map",
    addMapImageHelp: "Add a map image to start placing pins.",
    addPin: "Add pin",
    editPin: "Edit pin",
    deletePin: "Delete pin",
    openLinkedEntry: "Open linked entry",
    pinTypeLocation: "Location",
    pinTypeCharacter: "Character",
    pinTypeEvent: "Event",
    pinTypeQuest: "Quest",
    pinTypeOrganization: "Organization",
    pinTypeItem: "Item",
    pinTypeDanger: "Danger",
    pinTypeSecret: "Secret",
    pinTypeCustom: "Custom",
    storyPlanner: "Story Planner",
    sceneBoard: "Scene Board",
    storyPlanning: "Story planning",
    storyStatus: "Status",
    statusIdea: "Idea",
    emptyStatusIdea: "No ideas yet.",
    emptyStatusPlanned: "No planned scenes yet.",
    emptyStatusDrafting: "No drafting scenes yet.",
    emptyStatusRevised: "No revised scenes yet.",
    emptyStatusDone: "No finished scenes yet.",
    statusPlanned: "Planned",
    statusDrafting: "Drafting",
    statusRevising: "Revising",
    statusRevised: "Revised",
    statusDone: "Done",
    statusArchived: "Archived",
    povCharacter: "POV character",
    relatedStoryBook: "Story / Book",
    createStory: "Create story",
    createChapter: "Create chapter",
    createScene: "Create scene",
    viewGraph: "View graph",
    graphDepth: "Depth",
    graphDepthOne: "1 step",
    graphDepthTwo: "2 steps",
    graphDepthAll: "All",
    graphHelp: "Click a node to open it. Drag nodes to arrange the graph.",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    resetView: "Reset view",
    createQuickPlaceholder: "Create quick placeholder",
    createAndEditDetails: "Create and edit details",
    addMapsFromTemplate: "Add Maps category from template",
    manualRelationships: "Manual relationships",
    linkedFields: "Linked fields",
    backlinks: "Backlinks",
    graphLimited: "Showing a limited project graph. Use filters or search to narrow the map.",
    timeline: "Timeline",
    timelineOrder: "Timeline order",
    chronologyOrder: "Chronology order",
    timelineEntries: "Timeline entries",
    noTimelineEntries: "No timeline entries yet.",
    noTimelineEntriesHelp: "Add an event to start building your chronology.",
    allCategories: "All categories",
    allTags: "All tags",
    allLocations: "All locations",
    allParticipants: "All participants",
    chronology: "Chronology",
    moveEarlier: "Move earlier",
    moveLater: "Move later",
    familyTree: "Family Tree",
    founder: "Founder",
    currentHead: "Current head",
    members: "Members",
    relatedCharacters: "Related characters",
    locationsGroup: "Locations",
    organizationsGroup: "Organizations",
    itemsGroup: "Items",
    eventsGroup: "Events",
    questsGroup: "Quests/RPG",
    otherGroup: "Other",
    noConnections: "No connections yet.",
    notes: "Notes",
    addNote: "Add note",
    editNote: "Edit note",
    noNotes: "No notes on this page.",
    noteMatch: "Note match",
    pinnedNotes: "Pinned notes",
    recentNotes: "Recent notes",
    quickIdeas: "Quick ideas",
    pin: "Pin",
    unpin: "Unpin",
    markSpoiler: "Mark as spoiler",
    markHidden: "Mark as hidden",
    markDone: "Mark done",
    markActive: "Mark active",
    noteHidden: "Hidden note",
    noteSpoiler: "Spoiler",
    showNote: "Show",
    hideNote: "Hide",
    noteFilterAll: "All",
    noteFilterUnattached: "Unattached",
    noteFilterAttached: "Attached",
    noteFilterIdeas: "Ideas",
    noteFilterTodos: "Todos",
    attachTo: "Attach to",
    attachToProject: "Project",
    attachToCategory: "Category",
    attachToEntry: "Entry",
    noteTypeGeneral: "General",
    noteTypeIdea: "Idea",
    noteTypeTodo: "Todo",
    noteTypeSpoiler: "Spoiler",
    noteTypeSecret: "Secret",
    noteTypeAuthor: "Author note",
    noteTypeRpg: "RPG/GM note",
    noteTypeInconsistency: "Inconsistency",
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
    confirmMapPinDelete: "Move map pin to trash?",
    confirmMapPinPermanentDelete: "Delete map pin permanently?",
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
    close: "Close",
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
    addField: "Add Field",
    linkedCategory: "Linked Category",
    addFieldHint: "Use Add Field to create custom fields. Drag rows to reorder or use remove to hide a field.",
    addRequiredCategory: "Add required category from template",
    resetFields: "Reset fields to default",
    resetFieldOrder: "Reset field order to default",
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
    importAction: "Import",
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
    workspace: "Çalışma Alanı",
    more: "Diğer",
    homeNav: "Ana Sayfa",
    projectHome: "Proje ana sayfası",
    projectSummary: "Proje özeti",
    nextSteps: "Sonraki Adımlar",
    categoryOverview: "Kategori özeti",
    moduleOverview: "Modül özeti",
    continueWorking: "Çalışmaya devam et",
    emptyProjectGuidance: "Sonraki adımlar",
    lastUpdated: "Son güncelleme",
    entries: "Kayıtlar",
    consistencyIssues: "Tutarlılık sorunları",
    activeTodos: "Aktif yapılacaklar",
    createFirstCharacter: "İlk karakterini oluştur",
    addLocationStep: "Bir mekân ekle",
    addEventStep: "Bir olay ekle",
    writeQuickIdea: "Hızlı fikir yaz",
    recentEntries: "Son kayıtlar",
    template: "Şablon",
    noRecentEntries: "Henüz son kayıt yok.",
    createEntry: "Kayıt oluştur",
    addCategory: "Kategori ekle",
    addFromTemplate: "Şablondan ekle",
    addTemplateFirst: "Önce eşleşen kategoriyi bir şablondan ekle.",
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
    selectPlaceholder: "Seçiniz...",
    noneCreateNew: "Yok",
    createNew: "Yeni oluştur",
    missingEntry: "Eksik kayıt",
    createLinkedEntry: "Bağlı kayıt oluştur",
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
    referencedBy: "Başvuran kayıtlar",
    details: "Detaylar",
    connections: "Bağlantılar",
    relationshipOverview: "Bağlantı görünümü",
    relationshipGraph: "Bağlantı Haritası",
    mapBoard: "Harita Panosu",
    consistencyChecker: "Tutarlılık Kontrolü",
    runCheck: "Kontrol et",
    critical: "Kritik",
    warning: "Uyarı",
    info: "Bilgi",
    type: "Tür",
    severity: "Önem düzeyi",
    suggestedFix: "Önerilen düzeltme",
    openEntry: "Kaydı aç",
    ignore: "Yoksay",
    ignored: "Yoksayıldı",
    fix: "Düzelt",
    applyFix: "Düzeltmeyi uygula",
    confirmApplyFix: "Bu işlem bozuk bağlantıyı veya tutarsızlığı temizleyecek. Devam edilsin mi?",
    pinWithoutLabel: "Etiketsiz pin.",
    pinWithoutLinkedEntry: "Pinin bağlı kaydı yok.",
    missingDateOrChronology: "Tarih veya kronoloji etiketi eksik.",
    missingLocation: "Mekân eksik.",
    missingParticipants: "Katılımcılar eksik.",
    missingStatus: "Durum eksik.",
    missingSessionNumberOrDate: "Oturum numarası veya tarih eksik.",
    endDateBeforeStartDate: "Bitiş tarihi başlangıç tarihinden önce.",
    duplicateTitle: "Tekrarlanan başlık",
    duplicateMapPin: "Tekrarlanan harita pini",
    mapWithoutImage: "Harita görseli eksik.",
    noConsistencyIssues: "Tutarlılık sorunu bulunamadı.",
    findingType: "Bulgu türü",
    showIgnored: "Yoksayılanları göster",
    missingLinkedEntry: "Eksik bağlı kayıt",
    removeMissingReference: "Eksik referansı kaldır",
    addCharacterToFamilyMembers: "Karakteri aile üyelerine ekle",
    updateCharacterFamilyField: "Karakterin aile alanını güncelle",
    mapPins: "Harita pinleri",
    selectMap: "Harita seç",
    addMapImageHelp: "Pin eklemeye başlamak için bir harita görseli ekle.",
    addPin: "Pin ekle",
    editPin: "Pini düzenle",
    deletePin: "Pini sil",
    openLinkedEntry: "Bağlı kaydı aç",
    pinTypeLocation: "Mekân",
    pinTypeCharacter: "Karakter",
    pinTypeEvent: "Olay",
    pinTypeQuest: "Görev",
    pinTypeOrganization: "Örgüt",
    pinTypeItem: "Eşya",
    pinTypeDanger: "Tehlike",
    pinTypeSecret: "Gizli",
    pinTypeCustom: "Özel",
    storyPlanner: "Hikâye Planlayıcı",
    sceneBoard: "Sahne Panosu",
    storyPlanning: "Hikâye planlama",
    storyStatus: "Durum",
    statusIdea: "Fikir",
    statusPlanned: "Planlandı",
    statusDrafting: "Yazılıyor",
    statusRevising: "Düzenleniyor",
    statusRevised: "Düzenlendi",
    statusDone: "Tamamlandı",
    statusArchived: "Arşivlendi",
    povCharacter: "Bakış açısı karakteri",
    relatedStoryBook: "Hikâye / Kitap",
    createStory: "Hikâye oluştur",
    createChapter: "Bölüm oluştur",
    createScene: "Sahne oluştur",
    viewGraph: "Grafikte göster",
    graphDepth: "Derinlik",
    graphDepthOne: "1 adım",
    graphDepthTwo: "2 adım",
    graphDepthAll: "Tümü",
    graphHelp: "Açmak için düğüme tıkla. Haritayı düzenlemek için düğümleri sürükle.",
    zoomIn: "Yakınlaştır",
    zoomOut: "Uzaklaştır",
    resetView: "Görünümü Sıfırla",
    createQuickPlaceholder: "Hızlı kayıt oluştur",
    createAndEditDetails: "Oluştur ve detayları düzenle",
    addMapsFromTemplate: "Maps kategorisini şablondan ekle",
    manualRelationships: "Manuel ilişkiler",
    linkedFields: "Bağlı alanlar",
    backlinks: "Geri bağlantılar",
    graphLimited: "Sınırlı bir proje haritası gösteriliyor. Haritayı daraltmak için filtreleri veya aramayı kullan.",
    timeline: "Zaman Çizelgesi",
    timelineOrder: "Zaman çizelgesi sırası",
    chronologyOrder: "Kronoloji sırası",
    timelineEntries: "Zaman çizelgesi kayıtları",
    noTimelineEntries: "Henüz zaman çizelgesi kaydı yok.",
    noTimelineEntriesHelp: "Kronolojini oluşturmaya başlamak için bir olay ekle.",
    allCategories: "Tüm Kategoriler",
    allTags: "Tüm etiketler",
    allLocations: "Tüm mekânlar",
    allParticipants: "Tüm katılımcılar",
    chronology: "Kronoloji",
    moveEarlier: "Daha Erkene Taşı",
    moveLater: "Daha Geçe Taşı",
    familyTree: "Soy Ağacı",
    founder: "Kurucu",
    currentHead: "Mevcut lider",
    members: "Üyeler",
    relatedCharacters: "Bağlı karakterler",
    locationsGroup: "Mekânlar",
    organizationsGroup: "Örgütler",
    itemsGroup: "Eşyalar",
    eventsGroup: "Olaylar",
    questsGroup: "Görevler/RPG",
    otherGroup: "Diğer",
    noConnections: "Henüz bağlantı yok.",
    notes: "Notlar",
    addNote: "Not ekle",
    editNote: "Notu düzenle",
    noNotes: "Bu sayfada not yok.",
    noteMatch: "Not eşleşmesi",
    pinnedNotes: "Sabitlenmiş notlar",
    recentNotes: "Son notlar",
    quickIdeas: "Hızlı fikirler",
    pin: "Sabitle",
    unpin: "Sabitlemeyi kaldır",
    markSpoiler: "Spoiler yap",
    markHidden: "Gizli yap",
    markDone: "Tamamlandı",
    markActive: "Aktif yap",
    noteHidden: "Gizli not",
    noteSpoiler: "Spoiler",
    showNote: "Göster",
    hideNote: "Gizle",
    noteFilterAll: "Tümü",
    noteFilterUnattached: "Bağlanmamış",
    noteFilterAttached: "Bağlanmış",
    noteFilterIdeas: "Fikirler",
    noteFilterTodos: "Yapılacaklar",
    attachTo: "Şuna bağla",
    attachToProject: "Proje",
    attachToCategory: "Kategori",
    attachToEntry: "Kayıt",
    noteTypeGeneral: "Genel",
    noteTypeIdea: "Fikir",
    noteTypeTodo: "Yapılacak",
    noteTypeSpoiler: "Spoiler",
    noteTypeSecret: "Gizli",
    noteTypeAuthor: "Yazar notu",
    noteTypeRpg: "RPG/GM notu",
    noteTypeInconsistency: "Tutarsızlık",
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
    confirmMapPinDelete: "Harita pini geri dönüşüme taşınsın mı?",
    confirmMapPinPermanentDelete: "Harita pini kalıcı olarak silinsin mi?",
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
    close: "Kapat",
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
    addFieldHint: "Özel alan eklemek için boş satırları kullanın. Sıralamak için satırları sürükleyin veya alanı kaldırın.",
    resetFields: "Alanları varsayılana döndür",
    resetFieldOrder: "Alan sırasını varsayılana döndür",
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
    importAction: "İçe aktar",
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
    collapsedPanels: {},
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
      collapsedPanels: parsed.collapsedPanels && typeof parsed.collapsedPanels === "object" ? parsed.collapsedPanels : {},
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

function sectionKeyFromLabel(label) {
  const value = String(label || "").trim();
  if (!value) return "";
  if (state.settings.language !== "tr") return value;
  const match = Object.entries(sectionLabelTranslations).find(([, translated]) => translated === value);
  return match?.[0] || value;
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

function categoryByType(type, universeId = state.selectedUniverseId, options = {}) {
  const categories = universeCategories(universeId, Boolean(options.includeHidden));
  return categories.find((category) => getCategoryTypeKey(category) === type) || null;
}

function categoriesByTypes(types, universeId = state.selectedUniverseId, options = {}) {
  const allowed = new Set(types || []);
  return universeCategories(universeId, Boolean(options.includeHidden))
    .filter((category) => allowed.has(getCategoryTypeKey(category)));
}

function entitiesByCategoryTypes(types, universeId = state.selectedUniverseId) {
  const categoryIds = new Set(categoriesByTypes(types, universeId, { includeHidden: true }).map((category) => category.id));
  return universeEntities(universeId).filter((entity) => categoryIds.has(entity.categoryId));
}

function templatePresetForType(type) {
  for (const template of activeItems(state.templates || [])) {
    const preset = (template.categoryPresets || []).find((item) => getCategoryTypeKey({ ...item, presetType: item.presetType || categoryTypeForName(item.name) }) === type);
    if (preset) return { template, preset };
  }
  for (const template of builtInTemplates) {
    const preset = (template.categoryPresets || []).find((item) => getCategoryTypeKey({ ...item, presetType: item.presetType || categoryTypeForName(item.name) }) === type);
    if (preset) return { template, preset };
  }
  return null;
}

function createRequiredCategory(type, universeId = state.selectedUniverseId) {
  const universe = state.universes.find((item) => item.id === universeId && !item.deletedAt);
  if (!universe) return null;
  const existing = categoryByType(type, universeId, { includeHidden: true });
  if (existing) {
    if (existing.isHidden) updateItem("categories", existing.id, { isHidden: false });
    return state.categories.find((category) => category.id === existing.id) || existing;
  }
  const match = templatePresetForType(type);
  const preset = match?.preset || { name: defaultRequiredCategoryNames[type] || type };
  const name = preset.name || defaultRequiredCategoryNames[type] || type;
  const fields = preset.customFields?.length ? cloneFieldDefinitions(preset.customFields) : createFieldDefinitions(name);
  const category = {
    id: id("category"),
    universeId,
    name,
    presetType: type,
    description: preset.description || "",
    icon: "",
    color: "",
    order: universeCategories(universeId, true).length,
    isDefault: true,
    isHidden: false,
    customFields: fields.length ? fields : createFieldDefinitions(name),
    createdAt: now(),
    updatedAt: now(),
    deletedAt: null,
  };
  state.categories.push(category);
  saveState();
  return category;
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
  document.documentElement.lang = state.settings.language === "tr" ? "tr" : "en";
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
      ${universe && state.view !== "home" ? renderWorkspaceTopNav() : ""}
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
  const collapsed = state.collapsedPanels || {};
  return `
    <div class="workspace ${collapsed.left ? "is-left-collapsed" : ""} ${collapsed.right ? "is-right-collapsed" : ""}">
      ${collapsed.left ? `<button class="panel-restore panel-restore--left secondary" data-action="toggle-left-panel">${t("categories")}</button>` : renderLeftPanel(universe)}
      ${renderMainPanel(universe)}
      ${collapsed.right ? `<button class="panel-restore panel-restore--right secondary" data-action="toggle-right-panel">${t("notes")}</button>` : renderRightPanel(universe)}
    </div>
  `;
}

function renderLeftPanel(universe) {
  const categories = universeCategories(universe.id);
  const hiddenCategories = universeCategories(universe.id, true).filter((category) => category.isHidden);
  const isEditingOrganization = isProjectEditMode(universe.id);
  return `
    <aside class="panel stack">
      <div class="sidebar-section">
        <div class="row">
          <h2>${t("categories")}</h2>
          <span class="button-row">
            <button class="icon-button" data-action="new-category" title="${t("addCategory")}">+</button>
            <button class="icon-button" data-action="toggle-left-panel" title="${t("hide")}">‹</button>
          </span>
        </div>
        ${isEditingOrganization ? `<p class="muted edit-mode-help">${t("organizationEditHelp")}</p>` : ""}
        <input data-search placeholder="${t("searchPages")}" value="${escapeHtml(state.search)}" />
        <div class="stack sidebar-nav-group" data-category-list>
          ${categories.map((category) => {
            const count = universeEntities(universe.id).filter((entity) => entity.categoryId === category.id).length;
            const activeCategory = state.view === "universe" && category.id === state.selectedCategoryId;
            return `
              <div class="category-nav-row" data-category-row data-id="${category.id}">
                <button class="category-button ${activeCategory ? "is-active" : ""}" data-action="select-category" data-id="${category.id}">
                  <strong>${escapeHtml(category.name)}</strong>
                  <small>${count} ${t("itemPage")}</small>
                </button>
                ${isEditingOrganization ? `
                  <div class="category-controls" aria-label="${escapeHtml(t("organizationEditMode"))}">
                    <span class="drag-handle" draggable="true" tabindex="-1" data-category-drag-handle title="${escapeHtml(t("dragToReorder"))}" aria-label="${escapeHtml(t("dragToReorder"))}">::</span>
                    <button class="secondary" tabindex="-1" data-action="edit-category" data-id="${category.id}">${editCategoryLabel()}</button>
                    <button class="secondary" tabindex="-1" data-action="hide-category" data-id="${category.id}">${t("hide")}</button>
                    <button class="danger" tabindex="-1" data-action="delete-category" data-id="${category.id}">${t("delete")}</button>
                  </div>
                ` : ""}
              </div>
            `;
          }).join("")}
        </div>
      </div>
      <div class="sidebar-section sidebar-section--compact">
        <h2>${t("more")}</h2>
        <div class="button-row">
          <button class="secondary" data-action="add-from-template">${t("addFromTemplate")}</button>
          <button class="secondary" data-action="templates">${t("templates")}</button>
          <button class="secondary" data-action="trash">${t("trash")}</button>
        </div>
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
  if (state.view === "storyPlanner") return renderStoryPlannerView(universe);
  if (state.view === "mapBoard") return renderMapBoardView(universe);
  if (state.view === "consistencyChecker") return renderConsistencyCheckerView(universe);
  if (state.view === "timeline") return renderTimelineView(universe);
  if (state.view === "relationshipGraph") return renderRelationshipGraphView(universe);
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
        <div class="category-overview__main page-toolbar">
          <div>
            <p class="muted">${entities.length} ${t("itemPage")}</p>
            <h2>${escapeHtml(category?.name || t("noCategory"))}</h2>
            ${category?.description ? `<p>${escapeHtml(category.description)}</p>` : ""}
          </div>
          ${category ? `
            <div class="category-overview__actions page-toolbar__actions">
              <button class="secondary" data-action="toggle-organization-edit" aria-pressed="${isEditingOrganization}">${isEditingOrganization ? t("done") : organizeCategoriesLabel()}</button>
              ${category && storyCategoryTypes.has(getCategoryTypeKey(category)) ? `<button class="secondary" data-action="story-planner">${t("storyPlanner")}</button>` : ""}
              ${category && mapCategoryTypes.has(getCategoryTypeKey(category)) ? `<button class="secondary" data-action="map-board">${t("mapBoard")}</button>` : ""}
              <button data-action="new-entity">${createEntityLabel(category)}</button>
              ${renderEntityViewToggle()}
            </div>
          ` : ""}
        </div>
        ${category && isEditingOrganization ? `
          <p class="muted edit-mode-help">${t("organizationEditHelp")}</p>
          <div class="button-row category-overview__edit-actions">
            <button class="secondary" data-action="edit-category" data-id="${category.id}">${editCategoryLabel()}</button>
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

function dashboardEntitiesByTypes(universeId, types) {
  return entitiesByCategoryTypes(types, universeId);
}

function dashboardCategoryByTypes(universeId, types) {
  return categoriesByTypes(types, universeId, { includeHidden: true })[0] || null;
}

function dashboardCategoryForType(universeId, type) {
  const aliases = {
    characters: ["characters"],
    locations: ["locations"],
    events: ["events"],
  };
  return dashboardCategoryByTypes(universeId, aliases[type] || [type]);
}

function renderDashboardMetric(label, value, action = "", extra = "") {
  const content = `
    <strong>${escapeHtml(String(value))}</strong>
    <small>${escapeHtml(label)}</small>
    ${extra ? `<span class="muted">${escapeHtml(extra)}</span>` : ""}
  `;
  return action
    ? `<button class="dashboard-metric" data-action="${action}">${content}</button>`
    : `<span class="dashboard-metric">${content}</span>`;
}

function renderDashboardModuleCard({ label, count, action, categoryId = "", help = "" }) {
  if (action === "select-category" && !categoryId) {
    return `
      <button class="dashboard-module-card" data-action="add-from-template">
        <strong>${escapeHtml(label)}</strong>
        <span class="badge">${count}</span>
        <small>${escapeHtml(t("addTemplateFirst"))}</small>
      </button>
    `;
  }
  return `
    <button class="dashboard-module-card" data-action="${action}" ${categoryId ? `data-id="${categoryId}"` : ""}>
      <strong>${escapeHtml(label)}</strong>
      <span class="badge">${count}</span>
      ${help ? `<small>${escapeHtml(help)}</small>` : ""}
    </button>
  `;
}

function renderDashboardEntityLink(entity) {
  const category = entityCategory(entity);
  return `
    <button class="dashboard-list-item" data-action="select-entity" data-id="${entity.id}">
      <strong>${escapeHtml(entity.title)}</strong>
      <small>${escapeHtml(category?.name || t("category"))}${entity.summary ? ` · ${escapeHtml(entity.summary)}` : ""}</small>
    </button>
  `;
}

function renderDashboardNoteLink(note) {
  return `
    <button class="dashboard-list-item" data-action="${note.entityId ? "select-entity" : "edit-note"}" data-id="${note.entityId || note.id}">
      <strong>${escapeHtml(note.title || noteTypeLabel(note.type))}</strong>
      <small>${escapeHtml(String(note.content || "").slice(0, 90))}</small>
    </button>
  `;
}

function renderConsistencyDashboardSummary(findings) {
  if (!findings.length) {
    return renderDashboardMetric(t("consistencyIssues"), 0, "consistency-checker", t("noConsistencyIssues"));
  }
  const counts = ["critical", "warning", "info"].map((severity) => `${severityLabel(severity)} ${findings.filter((finding) => finding.severity === severity).length}`);
  return renderDashboardMetric(t("consistencyIssues"), findings.length, "consistency-checker", counts.join(" · "));
}

function renderEmptyProjectGuidance(universe) {
  if (universeEntities(universe.id).length) return "";
  return `
    <section class="dashboard-card stack">
      <h3 class="section-title">${t("emptyProjectGuidance")}</h3>
      <div class="dashboard-actions">
        <button data-action="new-dashboard-entry" data-type="characters">${t("createFirstCharacter")}</button>
        <button class="secondary" data-action="new-dashboard-entry" data-type="locations">${t("addLocationStep")}</button>
        <button class="secondary" data-action="new-dashboard-entry" data-type="events">${t("addEventStep")}</button>
        <button class="secondary" data-action="quick-note">${t("writeQuickIdea")}</button>
        <button class="secondary" data-action="add-from-template">${t("addFromTemplate")}</button>
      </div>
    </section>
  `;
}

function renderProjectHome(universe) {
  const template = state.templates.find((item) => item.id === universe.templateId);
  const categories = universeCategories(universe.id);
  const allEntities = universeEntities(universe.id);
  const isEditingOrganization = isProjectEditMode(universe.id);
  const recentEntities = [...allEntities]
    .sort((a, b) => String(b.updatedAt || b.createdAt || "").localeCompare(String(a.updatedAt || a.createdAt || "")))
    .slice(0, 5);
  const timelineCount = timelineEntities(universe.id).length;
  const maps = mapEntities(universe.id);
  const pins = mapPinEntities(universe.id);
  const notesCount = activeItems(state.notes).filter((note) => note.universeId === universe.id).length;
  const recentNotes = sortedNotes(activeItems(state.notes).filter((note) => note.universeId === universe.id)).slice(0, 4);
  const quickIdeas = activeItems(state.notes).filter((note) => note.universeId === universe.id && note.type === "idea" && !note.entityId && !note.categoryId);
  const storyItems = storyPlannerEntities(universe.id);
  const dashboardConsistencyFindings = consistencyFindings(universe.id).filter((finding) => !(state.ignoredConsistencyFindings || []).includes(finding.id));
  const nextSteps = [
    { label: t("createEntry"), action: "new-entity", primary: true },
    { label: t("addFromTemplate"), action: "add-from-template" },
    { label: t("writeQuickIdea"), action: "quick-note" },
  ];
  const updatedAt = universe.updatedAt || recentEntities[0]?.updatedAt || recentEntities[0]?.createdAt || universe.createdAt;
  return `
    <section class="project-home stack">
      <div class="page-toolbar">
        <div class="page-toolbar__title">
          <p class="muted">${t("projectSummary")}</p>
          <h2>${escapeHtml(universe.name)}</h2>
        </div>
        <div class="page-toolbar__actions">
          <button data-action="new-entity">${t("createEntry")}</button>
          <details class="action-menu">
            <summary class="secondary">${t("more")}</summary>
            <div class="action-menu__items">
              <button class="secondary" data-action="toggle-organization-edit" aria-pressed="${isEditingOrganization}">${isEditingOrganization ? t("done") : organizeCategoriesLabel()}</button>
              <button class="secondary" data-action="new-category">${t("addCategory")}</button>
              <button class="secondary" data-action="add-from-template">${t("addFromTemplate")}</button>
              <button class="secondary" data-action="quick-note">${t("idea")}</button>
              <button class="secondary" data-action="trash">${t("trash")}</button>
            </div>
          </details>
        </div>
      </div>
      ${isEditingOrganization ? `<p class="muted edit-mode-help">${t("organizationEditHelp")}</p>` : ""}
      <section class="dashboard-summary card">
        <div>
          <p>${escapeHtml(universe.description || t("noDescription"))}</p>
          <div class="badge-list">
            ${template ? `<span class="badge">${t("template")}: ${escapeHtml(template.name)}</span>` : ""}
            ${updatedAt ? `<span class="badge">${t("lastUpdated")}: ${new Date(updatedAt).toLocaleDateString(state.settings.language === "tr" ? "tr-TR" : "en-US")}</span>` : ""}
          </div>
        </div>
        <div class="dashboard-stats dashboard-stats--compact">
          ${renderDashboardMetric(t("categories"), categories.length)}
          ${renderDashboardMetric(t("entries"), allEntities.length)}
          ${renderDashboardMetric(t("notes"), notesCount)}
          ${renderDashboardMetric(t("consistencyIssues"), dashboardConsistencyFindings.length, "consistency-checker")}
        </div>
      </section>
      ${renderEmptyProjectGuidance(universe)}
      <section class="dashboard-grid dashboard-grid--focus">
        <div class="dashboard-card stack">
          <h3 class="section-title">${t("continueWorking")}</h3>
          ${recentEntities.length ? recentEntities.map(renderDashboardEntityLink).join("") : `<p class="muted">${t("noRecentEntries")}</p>`}
        </div>
        <div class="dashboard-card stack dashboard-card--next">
          <h3 class="section-title">${t("nextSteps")}</h3>
          <div class="dashboard-actions dashboard-actions--stacked">
            ${nextSteps.map((item) => `<button class="${item.primary ? "" : "secondary"}" data-action="${item.action}">${item.label}</button>`).join("")}
          </div>
          <p class="muted">${quickIdeas.length} ${t("quickIdeas")}</p>
        </div>
      </section>
      <section class="dashboard-grid dashboard-grid--compact">
        <div class="dashboard-card stack">
          <h3 class="section-title">${t("notes")}</h3>
          ${recentNotes.length ? recentNotes.map(renderDashboardNoteLink).join("") : `<p class="muted">${t("noNotes")}</p>`}
        </div>
        <div class="dashboard-card stack">
          <h3 class="section-title">${t("consistencyChecker")}</h3>
          <div class="badge-list">
            <span class="badge">${timelineCount} ${t("timelineEntries")}</span>
            <span class="badge">${storyItems.length} ${t("storyPlanner")}</span>
            <span class="badge">${maps.length} ${t("mapBoard")}</span>
            <span class="badge">${dashboardConsistencyFindings.length} ${t("consistencyIssues")}</span>
          </div>
          <button class="secondary" data-action="consistency-checker">${t("runCheck")}</button>
        </div>
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
      .map((note) => `${note.title || ""} ${note.content} ${noteTypeLabel(note.type)}`)
      .join(" ");
    const customValues = Object.entries(entity.customFieldValues || {}).filter(([key, value]) => !isSystemFieldValueEntry(key, value)).map(([, value]) => {
      const entityValue = entityForId(value);
      if (entityValue) return entityValue.title;
      if (Array.isArray(value)) return value.map((item) => entityForId(item)?.title || item).join(" ");
      return value;
    }).join(" ");
    return `${entity.title} ${entity.summary || ""} ${entity.content || ""} ${tagNames} ${notes} ${customValues}`
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
      ${fields.map((entry) => `<span><strong>${escapeHtml(entry.label)}:</strong> ${escapeHtml(referenceDisplayText(entry.field, entry.value, entity.customFieldValues || {}))}</span>`).join("")}
    </span>
  `;
}

function entityHasNoteSearchMatch(entity) {
  const query = state.search.trim().toLocaleLowerCase("tr");
  if (!query) return false;
  return activeItems(state.notes)
    .filter((note) => note.entityId === entity.id)
    .some((note) => `${note.title || ""} ${note.content || ""} ${noteTypeLabel(note.type)}`.toLocaleLowerCase("tr").includes(query));
}

function renderEntityRow(entity) {
  const imageInfo = entityImageInfo(entity);
  const tags = entityTagNames(entity).slice(0, 3);
  const noteMatch = entityHasNoteSearchMatch(entity);
  return `
    <button class="entity-row entity-row--rich" data-action="select-entity" data-id="${entity.id}">
      ${imageInfo ? `<img class="entity-row__image" src="${escapeHtml(imageInfo.value)}" alt="${escapeHtml(entity.title)}" loading="lazy" style="${imagePositionStyle(imageInfo.position)}" />` : ""}
      <span class="entity-row__body">
        <strong>${escapeHtml(entity.title)}</strong>
        ${entity.summary ? `<small>${escapeHtml(entity.summary)}</small>` : ""}
        ${renderEntityPreviewFields(entity, 2)}
        ${tags.length || noteMatch ? `<span class="tag-row">${noteMatch ? `<span class="tag">${t("noteMatch")}</span>` : ""}${tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</span>` : ""}
      </span>
    </button>
  `;
}

function renderEntityCard(entity) {
  const imageInfo = entityImageInfo(entity);
  const tags = entityTagNames(entity).slice(0, 3);
  const noteMatch = entityHasNoteSearchMatch(entity);
  return `
    <button class="entity-card" data-action="select-entity" data-id="${entity.id}">
      ${imageInfo ? `<img class="entity-card__image" src="${escapeHtml(imageInfo.value)}" alt="${escapeHtml(entity.title)}" loading="lazy" style="${imagePositionStyle(imageInfo.position)}" />` : ""}
      <span class="entity-card__body">
        <strong>${escapeHtml(entity.title)}</strong>
        ${entity.summary ? `<small>${escapeHtml(entity.summary)}</small>` : ""}
        ${renderEntityPreviewFields(entity, 3)}
        ${tags.length || noteMatch ? `<span class="tag-row">${noteMatch ? `<span class="tag">${t("noteMatch")}</span>` : ""}${tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</span>` : ""}
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
  const showFamilyTree = hasFamilyTree(entity);
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
              ${showFamilyTree ? `<button class="secondary" data-action="scroll-family-tree">${t("familyTree")}</button>` : ""}
              <button class="secondary" data-action="view-entity-graph" data-id="${entity.id}">${t("viewGraph")}</button>
              <button data-action="edit-entity" data-id="${entity.id}">${editEntryLabel()}</button>
              <button class="danger" data-action="delete-entity" data-id="${entity.id}">${t("delete")}</button>
            </div>
          </div>
          <div class="badge-list">
            ${tags.map((tag) => `<span class="badge">${escapeHtml(tag.name)}</span>`).join("") || `<span class="badge">${t("noTags")}</span>`}
          </div>
          <div class="detail-tabs">
            <span class="badge">${t("details")}</span>
            <span class="badge">${t("connections")}</span>
            ${showFamilyTree ? `<span class="badge">${t("familyTree")}</span>` : ""}
          </div>
          ${renderKeyFields(entity)}
        </div>
      </div>
      ${renderCustomFields(entity)}
      <section class="card stack">
        <h3 class="section-title">${sectionLabel("Notes")}</h3>
        <article class="markdown">${markdownToHtml(entity.content || t("noContent"))}</article>
      </section>
      ${renderLinkedMapPins(entity)}
      ${renderRelationshipOverview(entity)}
      ${showFamilyTree ? renderFamilyTree(entity) : ""}
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
    .filter(([key, value]) => !isSystemFieldValueEntry(key, value))
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
          ${renderFieldValue(entry.field, entry.value, entity.customFieldValues || {})}
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
        <details class="card stack collapsible-section" open>
          <summary class="section-title">${escapeHtml(sectionLabel(section))}</summary>
          ${sectionEntries.map((entry) => `
            <div class="field-display">
              <strong>${escapeHtml(entry.label)}</strong>
              ${renderFieldValue(entry.field, entry.value, entity.customFieldValues || {})}
            </div>
          `).join("")}
        </details>
      `).join("")}
    </div>
  `;
}

function renderLinkedMapPins(entity) {
  const pins = mapPinEntities(entity.universeId).filter((pin) => pinField(pin, "Linked entry") === entity.id || pinField(pin, "Related event") === entity.id || pinField(pin, "Related quest") === entity.id);
  if (!pins.length) return "";
  return `
    <section class="card stack">
      <div class="row">
        <h3 class="section-title">${t("mapPins")}</h3>
        <button class="secondary" data-action="map-board-for-entity" data-id="${entity.id}">${t("mapBoard")}</button>
      </div>
      <div class="connection-card-grid">
        ${pins.map((pin) => {
          const map = entityForId(pinField(pin, "Map"));
          return `
            <button class="connection-card" data-action="select-map-pin" data-id="${pin.id}">
              <strong>${escapeHtml(pin.title || pinField(pin, "Pin label") || t("mapPins"))}</strong>
              <small>${escapeHtml(map?.title || t("selectMap"))}</small>
              <span class="muted">${escapeHtml(pinTypeLabel(pinField(pin, "Pin type")))}</span>
            </button>
          `;
        }).join("")}
      </div>
    </section>
  `;
}

function entityCategory(entity) {
  return state.categories.find((item) => item.id === entity?.categoryId);
}

function entityCategoryType(entity) {
  return getCategoryTypeKey(entityCategory(entity));
}

function uniqueEntities(entities) {
  const seen = new Set();
  return entities.filter((entity) => {
    if (!entity?.id || seen.has(entity.id)) return false;
    seen.add(entity.id);
    return true;
  });
}

function entityForId(entityId) {
  return state.entities.find((entity) => entity.id === entityId && !entity.deletedAt) || null;
}

function familyForCharacter(character) {
  const category = entityCategory(character);
  const familyId = fieldValueForName(character, category, "Family");
  return entityForId(familyId);
}

function hasFamilyTree(entity) {
  if (entityCategoryType(entity) === "families") return true;
  return entityCategoryType(entity) === "characters" && Boolean(familyForCharacter(entity));
}

function renderEntityChip(entity, label = "") {
  if (!entity) return `<span class="badge">${escapeHtml(missingReferenceLabel(label))}</span>`;
  return `<button class="badge link-chip" data-action="select-entity" data-id="${entity.id}">${escapeHtml(entity.title)}</button>`;
}

function renderConnectionItemChip(item) {
  return renderEntityChip(item.entity, item.label || "");
}

function uniqueConnectionItems(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = item.entity?.id || `${item.id || ""}:${item.label || ""}`;
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function renderConnectionItemGroup(title, items, options = {}) {
  const chips = uniqueConnectionItems(items).map(renderConnectionItemChip).join("");
  if (!chips && options.hideEmpty) return "";
  return `
    <section class="connection-group">
      <h4>${escapeHtml(title)}</h4>
      <div class="tag-row">${chips || `<span class="muted">${t("noConnections")}</span>`}</div>
    </section>
  `;
}

function referenceItemsForName(entity, category, presetName) {
  const field = fieldByPresetName(category, presetName);
  if (!field) return [];
  const key = fieldStorageKey(field);
  const value = entity.customFieldValues?.[key] || entity.customFieldValues?.[field.name];
  const labels = field.type === "entityReferenceList"
    ? referenceLabelsSnapshot(entity.customFieldValues || {}, key)
    : { [value]: referenceLabelSnapshot(entity.customFieldValues || {}, key) };
  return normalizeReferenceListValue(value).map((entityId) => ({
    id: entityId,
    entity: entityForId(entityId),
    label: labels[entityId] || "",
  }));
}

function familyTreeData(entity) {
  const family = entityCategoryType(entity) === "families" ? entity : familyForCharacter(entity);
  if (!family) return null;
  const familyCategory = entityCategory(family);
  const founderItems = referenceItemsForName(family, familyCategory, "Founder");
  const currentHeadItems = referenceItemsForName(family, familyCategory, "Current head");
  const explicitMemberItems = referenceItemsForName(family, familyCategory, "Members");
  const linkedCharacters = universeEntities(family.universeId).filter((item) => {
    if (entityCategoryType(item) !== "characters") return false;
    return fieldValueForName(item, entityCategory(item), "Family") === family.id;
  });
  const linkedMemberItems = linkedCharacters.map((item) => ({ id: item.id, entity: item, label: "" }));
  const memberItems = uniqueConnectionItems([...explicitMemberItems, ...linkedMemberItems, ...founderItems, ...currentHeadItems]);
  const leaderIds = new Set([...founderItems, ...currentHeadItems].map((item) => item.entity?.id || item.id).filter(Boolean));
  const relatedItems = memberItems.filter((item) => !leaderIds.has(item.entity?.id || item.id));
  return { family, founderItems, currentHeadItems, memberItems, relatedItems };
}

function characterFamilyTreeData(character) {
  if (entityCategoryType(character) !== "characters") return null;
  const category = entityCategory(character);
  const referenceNames = {
    parents: ["Parents", "Parent", "Mother", "Father"],
    siblings: ["Siblings", "Sibling"],
    partners: ["Spouse", "Partner", "Partners"],
    children: ["Children", "Child"],
  };
  const fromFields = (names) => uniqueConnectionItems(names.flatMap((name) => referenceItemsForName(character, category, name)));
  const family = familyForCharacter(character);
  const familyData = family ? familyTreeData(family) : null;
  const memberItems = familyData?.memberItems || [];
  const characterId = character.id;
  return {
    family,
    parents: fromFields(referenceNames.parents),
    siblings: fromFields(referenceNames.siblings).length
      ? fromFields(referenceNames.siblings)
      : memberItems.filter((item) => item.entity?.id && item.entity.id !== characterId).slice(0, 8),
    partners: fromFields(referenceNames.partners),
    children: fromFields(referenceNames.children),
  };
}

function renderFamilyTree(entity) {
  if (entityCategoryType(entity) === "characters") return renderCharacterFamilyTree(entity);
  const data = familyTreeData(entity);
  if (!data) return "";
  const renderTreeNode = (item) => `<li>${renderConnectionItemChip(item)}</li>`;
  return `
    <section class="card stack relationship-view" data-family-tree-view>
      <div class="row">
        <h3 class="section-title">${t("familyTree")}</h3>
        ${renderEntityChip(data.family)}
      </div>
      <div class="family-tree">
        <div class="family-tree__root">${renderEntityChip(data.family)}</div>
        <div class="family-tree__branches">
          <section>
            <h4>${t("founder")}</h4>
            <ul>${data.founderItems.length ? data.founderItems.map(renderTreeNode).join("") : `<li><span class="muted">${t("noConnections")}</span></li>`}</ul>
          </section>
          <section>
            <h4>${t("currentHead")}</h4>
            <ul>${data.currentHeadItems.length ? data.currentHeadItems.map(renderTreeNode).join("") : `<li><span class="muted">${t("noConnections")}</span></li>`}</ul>
          </section>
          <section class="family-tree__members">
            <h4>${t("members")}</h4>
            <ul>${data.relatedItems.length ? data.relatedItems.map(renderTreeNode).join("") : `<li><span class="muted">${t("noConnections")}</span></li>`}</ul>
          </section>
        </div>
      </div>
    </section>
  `;
}

function renderCharacterFamilyTree(entity) {
  const data = characterFamilyTreeData(entity);
  if (!data) return "";
  const renderItems = (items, empty = t("noConnections")) => items.length
    ? items.map((item) => `<li>${renderConnectionItemChip(item)}</li>`).join("")
    : `<li><span class="muted">${empty}</span></li>`;
  return `
    <section class="card stack relationship-view" data-family-tree-view>
      <div class="row">
        <h3 class="section-title">${t("familyTree")}</h3>
        ${data.family ? renderEntityChip(data.family) : ""}
      </div>
      <div class="family-tree family-tree--person">
        <section class="family-tree__tier family-tree__tier--parents">
          <h4>${state.settings.language === "tr" ? "Ebeveynler" : "Parents"}</h4>
          <ul>${renderItems(data.parents)}</ul>
        </section>
        <div class="family-tree__center">
          <section>
            <h4>${state.settings.language === "tr" ? "EÅŸ / Partner" : "Spouse / Partner"}</h4>
            <ul>${renderItems(data.partners)}</ul>
          </section>
          <div class="family-tree__root is-focus">${renderEntityChip(entity)}</div>
          <section>
            <h4>${state.settings.language === "tr" ? "KardeÅŸler / Akrabalar" : "Siblings / Relatives"}</h4>
            <ul>${renderItems(data.siblings, data.family ? data.family.title : t("noConnections"))}</ul>
          </section>
        </div>
        <section class="family-tree__tier family-tree__tier--children">
          <h4>${state.settings.language === "tr" ? "Ã‡ocuklar" : "Children"}</h4>
          <ul>${renderItems(data.children)}</ul>
        </section>
      </div>
    </section>
  `;
}

function workspaceNavItems() {
  return [
    { view: "projectHome", action: "project-home", label: t("homeNav") },
    { view: "timeline", action: "timeline", label: t("timeline") },
    { view: "storyPlanner", action: "story-planner", label: t("storyPlanner") },
    { view: "mapBoard", action: "map-board", label: t("mapBoard") },
    { view: "relationshipGraph", action: "relationship-graph", label: t("relationshipGraph") },
    { view: "consistencyChecker", action: "consistency-checker", label: t("consistencyChecker") },
  ];
}

function renderWorkspaceTopNav() {
  return `
    <nav class="workspace-tabs" aria-label="${escapeHtml(t("workspace"))}">
      ${workspaceNavItems().map((item) => `
        <button class="${state.view === item.view ? "is-active" : ""}" data-action="${item.action}">
          ${escapeHtml(item.label)}
        </button>
      `).join("")}
    </nav>
  `;
}

function connectionGroupKey(entity) {
  const type = entityCategoryType(entity);
  if (type === "families" || type === "characters") return "family";
  if (type === "locations" || type === "planets" || type === "starSystems" || type === "dungeons") return "locations";
  if (type === "organizations" || type === "governments" || type === "cultures" || type === "religions") return "organizations";
  if (type === "items" || type === "lootRewards" || type === "technologies" || type === "evidence" || type === "clues") return "items";
  if (type === "events" || type === "wars" || type === "myths") return "events";
  if (type === "quests" || type === "rpgNpcs" || type === "partyMembers" || type === "encounters" || type === "creatures" || type === "ruleNotes" || type === "campaign") return "quests";
  return "other";
}

function connectionGroupLabel(groupKey) {
  return {
    family: t("familyTree"),
    locations: t("locationsGroup"),
    organizations: t("organizationsGroup"),
    items: t("itemsGroup"),
    events: t("eventsGroup"),
    quests: t("questsGroup"),
    other: t("otherGroup"),
  }[groupKey] || t("otherGroup");
}

function addConnection(groups, entity, sourceLabel = "") {
  if (!entity) return;
  const groupKey = connectionGroupKey(entity);
  if (!groups[groupKey]) groups[groupKey] = new Map();
  if (!groups[groupKey].has(entity.id)) groups[groupKey].set(entity.id, { entity, labels: new Set() });
  if (sourceLabel) groups[groupKey].get(entity.id).labels.add(sourceLabel);
}

function linkedFieldConnections(entity) {
  const category = entityCategory(entity);
  const values = entity.customFieldValues || {};
  return (category?.customFields || []).flatMap((field) => {
    if (field.type !== "entityReference" && field.type !== "entityReferenceList") return [];
    const value = values[fieldStorageKey(field)] || values[field.name];
    const ids = field.type === "entityReferenceList" ? normalizeReferenceListValue(value) : [value].filter(Boolean);
    return ids.map((entityId) => ({ entity: entityForId(entityId), label: fieldLabel(field) })).filter((item) => item.entity);
  });
}

function manualRelationshipConnections(entity) {
  return activeItems(state.relationships)
    .filter((relationship) => relationship.sourceEntityId === entity.id || relationship.targetEntityId === entity.id)
    .map((relationship) => {
      const incoming = relationship.targetEntityId === entity.id;
      const targetId = incoming ? relationship.sourceEntityId : relationship.targetEntityId;
      return {
        entity: entityForId(targetId),
        label: incoming ? (relationship.reverseType || relationship.type) : relationship.type,
      };
    })
    .filter((item) => item.entity);
}

function backReferenceConnections(entity) {
  return entityFieldBackReferences(entity).map((reference) => ({ entity: reference.entity, label: fieldLabel(reference.field) }));
}

function relationshipOverviewGroups(entity) {
  const groups = {};
  [...manualRelationshipConnections(entity), ...linkedFieldConnections(entity), ...backReferenceConnections(entity)].forEach((connection) => {
    addConnection(groups, connection.entity, connection.label);
  });
  return groups;
}

function renderRelationshipOverview(entity) {
  const groups = relationshipOverviewGroups(entity);
  const order = ["family", "locations", "organizations", "items", "events", "quests", "other"];
  const content = order.map((groupKey) => {
    const entries = [...(groups[groupKey]?.values() || [])];
    if (!entries.length) return "";
    return `
      <section class="connection-group">
        <h4>${connectionGroupLabel(groupKey)}</h4>
        <div class="connection-card-grid">
          ${entries.map(({ entity: linkedEntity, labels }) => `
            <button class="connection-card" data-action="select-entity" data-id="${linkedEntity.id}">
              <strong>${escapeHtml(linkedEntity.title)}</strong>
              <small>${escapeHtml(entityCategory(linkedEntity)?.name || t("category"))}</small>
              ${labels.size ? `<span class="muted">${escapeHtml([...labels].join(", "))}</span>` : ""}
            </button>
          `).join("")}
        </div>
      </section>
    `;
  }).join("");
  return `
    <section class="card stack relationship-view">
      <h3 class="section-title">${t("relationshipOverview")}</h3>
      ${content || `<p class="muted">${t("noConnections")}</p>`}
    </section>
  `;
}

function graphFilters() {
  return {
    search: "",
    categoryId: "",
    relationshipType: "",
    depth: "1",
    manual: true,
    linked: true,
    backlinks: true,
    ...(state.graphFilters || {}),
  };
}

function graphAddEdge(edges, seen, edge) {
  if (!edge.sourceId || !edge.targetId || edge.sourceId === edge.targetId) return;
  const pair = [edge.sourceId, edge.targetId].sort().join(":");
  const key = `${pair}:${String(edge.label || "").toLocaleLowerCase("tr")}`;
  if (seen.has(key)) return;
  seen.add(key);
  edges.push(edge);
}

function graphEdges(universeId, filters = graphFilters()) {
  const edges = [];
  const seen = new Set();
  const activeEntityIds = new Set(universeEntities(universeId).map((entity) => entity.id));
  if (filters.manual) {
    activeItems(state.relationships)
      .filter((relationship) => relationship.universeId === universeId)
      .forEach((relationship) => {
        if (!activeEntityIds.has(relationship.sourceEntityId) || !activeEntityIds.has(relationship.targetEntityId)) return;
        graphAddEdge(edges, seen, {
          sourceId: relationship.sourceEntityId,
          targetId: relationship.targetEntityId,
          label: relationship.type || t("manualRelationships"),
          kind: "manual",
        });
      });
  }
  if (filters.linked || filters.backlinks) {
    universeEntities(universeId).forEach((entity) => {
      linkedFieldConnections(entity).forEach((connection) => {
        if (!connection.entity) return;
        if (filters.linked) {
          graphAddEdge(edges, seen, {
            sourceId: entity.id,
            targetId: connection.entity.id,
            label: connection.label || t("linkedFields"),
            kind: "linked",
          });
        }
        if (filters.backlinks) {
          graphAddEdge(edges, seen, {
            sourceId: connection.entity.id,
            targetId: entity.id,
            label: connection.label || t("backlinks"),
            kind: "backlink",
          });
        }
      });
    });
  }
  if (!filters.relationshipType) return edges;
  return edges.filter((edge) => edge.label === filters.relationshipType || edge.kind === filters.relationshipType);
}

function graphRelationshipTypes(edges) {
  return [...new Set(edges.map((edge) => edge.label).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, state.settings.language === "tr" ? "tr" : "en"));
}

function graphNodeIdsForDepth(focusEntityId, edges, depth) {
  if (!focusEntityId || depth === "all") return null;
  const maxDepth = depth === "2" ? 2 : 1;
  const adjacency = new Map();
  edges.forEach((edge) => {
    if (!adjacency.has(edge.sourceId)) adjacency.set(edge.sourceId, new Set());
    if (!adjacency.has(edge.targetId)) adjacency.set(edge.targetId, new Set());
    adjacency.get(edge.sourceId).add(edge.targetId);
    adjacency.get(edge.targetId).add(edge.sourceId);
  });
  const visited = new Set([focusEntityId]);
  const queue = [{ id: focusEntityId, depth: 0 }];
  while (queue.length) {
    const current = queue.shift();
    if (current.depth >= maxDepth) continue;
    [...(adjacency.get(current.id) || [])].forEach((nextId) => {
      if (visited.has(nextId)) return;
      visited.add(nextId);
      queue.push({ id: nextId, depth: current.depth + 1 });
    });
  }
  return visited;
}

function graphNodeMatches(entity, filters) {
  if (filters.categoryId && entity.categoryId !== filters.categoryId) return false;
  const query = String(filters.search || "").trim().toLocaleLowerCase("tr");
  if (!query) return true;
  const category = entityCategory(entity);
  return `${entity.title} ${entity.summary || ""} ${category?.name || ""}`.toLocaleLowerCase("tr").includes(query);
}

function relationshipGraphData(universe) {
  const filters = graphFilters();
  const focusEntityId = state.graphFocusEntityId && entityForId(state.graphFocusEntityId)?.universeId === universe.id
    ? state.graphFocusEntityId
    : null;
  const typeEdges = graphEdges(universe.id, { ...filters, relationshipType: "" });
  const baseFilters = { ...filters, categoryId: "" };
  const allEdges = graphEdges(universe.id, filters);
  const categoryContextEdges = graphEdges(universe.id, baseFilters);
  const depthIds = graphNodeIdsForDepth(focusEntityId, allEdges, filters.depth);
  const categoryDepthIds = graphNodeIdsForDepth(focusEntityId, categoryContextEdges, filters.depth);
  const activeEntities = universeEntities(universe.id);
  const searchOrCategoryActive = Boolean(filters.search || filters.categoryId);
  const visibleEntities = activeEntities
    .filter((entity) => !depthIds || depthIds.has(entity.id))
    .filter((entity) => graphNodeMatches(entity, filters));
  const limited = !focusEntityId && !searchOrCategoryActive && visibleEntities.length > 80;
  const nodes = (limited ? visibleEntities.slice(0, 80) : visibleEntities);
  const nodeIds = new Set(nodes.map((entity) => entity.id));
  const edges = allEdges.filter((edge) => nodeIds.has(edge.sourceId) && nodeIds.has(edge.targetId));
  return { nodes, edges, allEdges, typeEdges, categoryContextEdges, categoryDepthIds, focusEntityId, filters, limited };
}

function graphManualPositions(universeId = state.selectedUniverseId) {
  state.graphPositions = state.graphPositions || {};
  state.graphPositions[universeId] = state.graphPositions[universeId] || {};
  return state.graphPositions[universeId];
}

function graphViewport(universeId = state.selectedUniverseId) {
  state.graphView = state.graphView || {};
  state.graphView[universeId] = { scale: 1, x: 0, y: 0, ...(state.graphView[universeId] || {}) };
  return state.graphView[universeId];
}

function graphLayout(nodes, focusEntityId) {
  const count = Math.max(nodes.length, 1);
  const ringCount = Math.max(1, Math.ceil(count / 8));
  const width = Math.max(980, 520 + ringCount * 360);
  const height = Math.max(680, 420 + ringCount * 260);
  const center = { x: width / 2, y: height / 2 };
  if (!nodes.length) return { width, height, positions: new Map() };
  const focusIndex = focusEntityId ? nodes.findIndex((node) => node.id === focusEntityId) : -1;
  const ordered = focusIndex > -1 ? [nodes[focusIndex], ...nodes.filter((node) => node.id !== focusEntityId)] : nodes;
  const manual = graphManualPositions(nodes[0]?.universeId || state.selectedUniverseId);
  const positions = new Map();
  if (focusIndex > -1) positions.set(focusEntityId, manual[focusEntityId] || center);
  const ringNodes = focusIndex > -1 ? ordered.slice(1) : ordered;
  ringNodes.forEach((node, index) => {
    if (manual[node.id]) {
      positions.set(node.id, {
        x: Math.min(width - 120, Math.max(120, manual[node.id].x)),
        y: Math.min(height - 90, Math.max(90, manual[node.id].y)),
      });
      return;
    }
    const ring = Math.floor(index / 8);
    const ringStart = ring * 8;
    const ringSize = Math.min(8 + ring * 4, ringNodes.length - ringStart);
    const ringIndex = index - ringStart;
    const radiusX = 210 + ring * 170;
    const radiusY = 145 + ring * 125;
    const angle = (-Math.PI / 2) + (ringIndex / Math.max(ringSize, 1)) * Math.PI * 2 + ring * 0.17;
    positions.set(node.id, {
      x: Math.min(width - 120, Math.max(120, center.x + Math.cos(angle) * radiusX)),
      y: Math.min(height - 90, Math.max(90, center.y + Math.sin(angle) * radiusY)),
    });
  });
  return { width, height, positions };
}

function graphContentStyle(universeId) {
  const view = graphViewport(universeId);
  return `transform: translate(${Number(view.x) || 0}px, ${Number(view.y) || 0}px) scale(${Number(view.scale) || 1});`;
}

function renderRelationshipGraphFilters(universe, data) {
  const connectedNodeIds = new Set(data.categoryContextEdges.flatMap((edge) => [edge.sourceId, edge.targetId]));
  const graphSearchFilters = { ...data.filters, categoryId: "" };
  const categories = universeCategories(universe.id, true)
    .map((category) => ({
      category,
      count: universeEntities(universe.id).filter((entity) =>
        entity.categoryId === category.id
        && connectedNodeIds.has(entity.id)
        && (!data.categoryDepthIds || data.categoryDepthIds.has(entity.id))
        && graphNodeMatches(entity, graphSearchFilters)
      ).length,
    }))
    .filter((item) => item.count || data.filters.categoryId === item.category.id);
  const relationshipTypes = graphRelationshipTypes(data.typeEdges);
  const filters = data.filters;
  return `
    <section class="timeline-filters graph-filters">
      <label>${t("searchPages")} <input data-graph-filter="search" data-preserve-focus="graph-search" value="${escapeHtml(filters.search || "")}" /></label>
      <label>${t("category")}
        <select data-graph-filter="categoryId">
          <option value="">${t("allCategories")}</option>
          ${categories.map(({ category, count }) => `<option value="${category.id}" ${filters.categoryId === category.id ? "selected" : ""} ${count ? "" : "disabled"}>${escapeHtml(category.name)}${count ? ` (${count})` : ""}</option>`).join("")}
        </select>
      </label>
      <label>${t("type")}
        <select data-graph-filter="relationshipType">
          <option value="">${t("graphDepthAll")}</option>
          ${relationshipTypes.map((type) => `<option value="${escapeHtml(type)}" ${filters.relationshipType === type ? "selected" : ""}>${escapeHtml(type)}</option>`).join("")}
        </select>
      </label>
      <label>${t("graphDepth")}
        <select data-graph-filter="depth">
          <option value="1" ${filters.depth === "1" ? "selected" : ""}>${t("graphDepthOne")}</option>
          <option value="2" ${filters.depth === "2" ? "selected" : ""}>${t("graphDepthTwo")}</option>
          <option value="all" ${filters.depth === "all" ? "selected" : ""}>${t("graphDepthAll")}</option>
        </select>
      </label>
      <label class="checkbox-line"><input type="checkbox" data-graph-filter="manual" ${filters.manual ? "checked" : ""} /> ${t("manualRelationships")}</label>
      <label class="checkbox-line"><input type="checkbox" data-graph-filter="linked" ${filters.linked ? "checked" : ""} /> ${t("linkedFields")}</label>
      <label class="checkbox-line"><input type="checkbox" data-graph-filter="backlinks" ${filters.backlinks ? "checked" : ""} /> ${t("backlinks")}</label>
    </section>
  `;
}

function renderGraphNode(entity, point, focusEntityId) {
  const category = entityCategory(entity);
  const imageInfo = entityImageInfo(entity);
  const color = category?.color || state.settings.accentColor || "#9a4f2e";
  return `
    <button class="graph-node ${entity.id === focusEntityId ? "is-focus" : ""}" data-action="select-entity" data-id="${entity.id}" data-graph-node draggable="true" style="left:${point.x}px; top:${point.y}px; --node-color:${escapeHtml(color)}">
      ${imageInfo ? `<img src="${escapeHtml(imageInfo.value)}" alt="${escapeHtml(entity.title)}" loading="lazy" style="${imagePositionStyle(imageInfo.position)}" />` : ""}
      <span>
        <strong>${escapeHtml(entity.title)}</strong>
        <small>${escapeHtml(category?.name || t("category"))}</small>
      </span>
    </button>
  `;
}

function renderRelationshipGraphView(universe) {
  const data = relationshipGraphData(universe);
  const layout = graphLayout(data.nodes, data.focusEntityId);
  const edgeLines = data.edges.map((edge, index) => {
    const source = layout.positions.get(edge.sourceId);
    const target = layout.positions.get(edge.targetId);
    if (!source || !target) return "";
    const midX = (source.x + target.x) / 2;
    const midY = (source.y + target.y) / 2;
    const edgeId = `edge-${index}`;
    return `
      <line data-edge-line data-edge-id="${edgeId}" data-source-id="${edge.sourceId}" data-target-id="${edge.targetId}" x1="${source.x}" y1="${source.y}" x2="${target.x}" y2="${target.y}" />
      <text data-edge-label="${edgeId}" x="${midX}" y="${midY}">${escapeHtml(edge.label || "")}</text>
    `;
  }).join("");
  return `
    <main class="main stack" data-main-panel>
      <section class="stack">
        <div class="subview-bar">
          <button class="secondary" data-action="${data.focusEntityId ? "back-from-graph" : "project-home"}">← ${t("back")}</button>
        </div>
        <div class="page-toolbar">
          <div>
            <p class="muted">${escapeHtml(universe.name)}</p>
            <h2>${t("relationshipGraph")}</h2>
          </div>
        </div>
        <p class="muted">${t("graphHelp")}</p>
        ${renderRelationshipGraphFilters(universe, data)}
        ${data.limited ? `<p class="muted">${t("graphLimited")}</p>` : ""}
        ${data.nodes.length && data.edges.length ? `
          <section class="graph-map" data-graph-map data-universe-id="${universe.id}" style="--graph-width:${layout.width}px; --graph-height:${layout.height}px">
            <div class="graph-content" data-graph-content style="${graphContentStyle(universe.id)}">
              <svg viewBox="0 0 ${layout.width} ${layout.height}" aria-hidden="true">
                ${edgeLines}
              </svg>
              ${data.nodes.map((entity) => renderGraphNode(entity, layout.positions.get(entity.id), data.focusEntityId)).join("")}
            </div>
            <div class="graph-controls">
              <button class="icon-button" data-action="graph-zoom-in" title="${t("zoomIn")}">+</button>
              <button class="icon-button" data-action="graph-zoom-out" title="${t("zoomOut")}">-</button>
              <button class="secondary" data-action="graph-reset-view">${t("resetView")}</button>
            </div>
          </section>
        ` : `<section class="empty"><h3>${t("noConnections")}</h3><p>${t("relationshipGraph")}</p></section>`}
      </section>
    </main>
  `;
}

function renderRightPanel() {
  const entity = currentEntity();
  if (!entity) {
    const category = state.view === "universe" ? currentCategory() : null;
    const inboxNotes = filterInboxNotes(activeItems(state.notes).filter((note) => note.universeId === state.selectedUniverseId));
    const scopedNotes = category ? sortedNotes(categoryNotes(category.id)) : sortedNotes(projectNotes());
    const hasContent = scopedNotes.length || inboxNotes.length;
    return `
      <aside class="side stack ${hasContent ? "" : "side--compact"}">
        <div class="row">
          <h2>${category ? t("notes") : `${t("notes")} / ${t("ideaInbox")}`}</h2>
          <span class="button-row">
            <button class="icon-button" data-action="quick-note" title="${t("addNote")}">+</button>
            <button class="icon-button" data-action="toggle-right-panel" title="${t("hide")}">›</button>
          </span>
        </div>
        ${scopedNotes.length ? `<div class="note-grid note-grid--compact">${scopedNotes.slice(0, 4).map(renderNoteCard).join("")}</div>` : ""}
        ${category ? `<details class="side-section" ${hasContent ? "open" : ""}>
          <summary>${t("ideaInbox")}</summary>
          ${renderNoteFilterBar()}
          ${inboxNotes.length ? `<div class="note-grid note-grid--compact">${sortedNotes(inboxNotes).slice(0, 6).map(renderNoteCard).join("")}</div>` : `<p class="muted">${t("noInboxNotes")}</p>`}
        </details>` : `
          ${renderNoteFilterBar()}
          ${inboxNotes.length ? `<div class="note-grid note-grid--compact">${sortedNotes(inboxNotes).slice(0, 6).map(renderNoteCard).join("")}</div>` : `<p class="muted">${t("noInboxNotes")}</p>`}
        `}
      </aside>
    `;
  }
  const outgoing = activeItems(state.relationships).filter((rel) => rel.sourceEntityId === entity.id);
  const incoming = activeItems(state.relationships).filter((rel) => rel.targetEntityId === entity.id);
  const notes = sortedNotes(activeItems(state.notes).filter((note) => note.entityId === entity.id));
  const relationshipTargets = getRelationshipTargets(entity);
  const fieldBackReferences = entityFieldBackReferences(entity);
  return `
    <aside class="side stack ${outgoing.length || incoming.length || notes.length || fieldBackReferences.length ? "" : "side--compact"}">
      <div class="row">
        <h2>${t("links")}</h2>
        <span class="button-row">
          <button class="icon-button" data-action="new-relationship" title="${t("addRelationship")}" ${relationshipTargets.length ? "" : "disabled"}>+</button>
          <button class="icon-button" data-action="toggle-right-panel" title="${t("hide")}">›</button>
        </span>
      </div>
      ${relationshipTargets.length ? "" : `<p class="muted">${t("relationshipNeedsTarget")}</p>`}
      ${outgoing.length ? outgoing.map((rel) => renderRelationship(rel, false)).join("") : `<p class="muted">${t("noOutgoing")}</p>`}
      <h2>${t("backlinks")}</h2>
      ${incoming.length ? incoming.map((rel) => renderRelationship(rel, true)).join("") : `<p class="muted">${t("noIncoming")}</p>`}
      <h2>${t("referencedBy")}</h2>
      ${fieldBackReferences.length ? fieldBackReferences.map(renderFieldBackReference).join("") : `<p class="muted">${t("noIncoming")}</p>`}
      <div class="row">
        <h2>${t("notes")}</h2>
        <button class="icon-button" data-action="new-note" title="${t("addNote")}">+</button>
      </div>
      ${notes.length ? `<div class="note-grid">${notes.map(renderNoteCard).join("")}</div>` : `<p class="muted">${t("noNotes")}</p>`}
    </aside>
  `;
}

function entityFieldBackReferences(targetEntity) {
  return universeEntities(targetEntity.universeId)
    .filter((entity) => entity.id !== targetEntity.id)
    .flatMap((entity) => {
      const category = state.categories.find((item) => item.id === entity.categoryId);
      return (category?.customFields || []).flatMap((field) => {
        if (field.type !== "entityReference" && field.type !== "entityReferenceList") return [];
        const value = entity.customFieldValues?.[fieldStorageKey(field)] || entity.customFieldValues?.[field.name];
        const values = field.type === "entityReferenceList" ? normalizeReferenceListValue(value) : [value].filter(Boolean);
        return values.includes(targetEntity.id) ? [{ entity, field }] : [];
      });
    });
}

function renderFieldBackReference(reference) {
  return `
    <button class="entity-row" data-action="select-entity" data-id="${reference.entity.id}">
      <strong>${escapeHtml(reference.entity.title)}</strong>
      <small>${escapeHtml(fieldLabel(reference.field))}</small>
    </button>
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
  const hiddenCollapsed = note.isHidden && !note.isRevealed;
  const preview = hiddenCollapsed ? t("noteHidden") : notePreview(note.content);
  const typeLabel = noteTypeLabel(note.type);
  const classes = [
    "note-card",
    note.isPinned ? "is-pinned" : "",
    note.isSpoiler ? "is-spoiler" : "",
    note.isHidden ? "is-hidden" : "",
    note.completed ? "is-complete" : "",
  ].filter(Boolean).join(" ");
  return `
    <article class="${classes}">
      <div class="row">
        <strong>${escapeHtml(note.title || typeLabel)}</strong>
        <span class="badge-list">
          <span class="badge">${escapeHtml(typeLabel)}</span>
          ${note.isPinned ? `<span class="badge">${t("pin")}</span>` : ""}
          ${note.isSpoiler ? `<span class="badge">${t("noteSpoiler")}</span>` : ""}
          ${note.isHidden ? `<span class="badge">${t("noteHidden")}</span>` : ""}
          ${note.updatedAt ? `<span class="badge">${new Date(note.updatedAt).toLocaleDateString(state.settings.language === "tr" ? "tr-TR" : "en-US")}</span>` : ""}
        </span>
      </div>
      <p class="note-preview">${escapeHtml(preview)}</p>
      <div class="button-row">
        <button class="secondary" data-action="edit-note" data-id="${note.id}">${t("edit")}</button>
        <button class="secondary" data-action="toggle-note-pin" data-id="${note.id}">${note.isPinned ? t("unpin") : t("pin")}</button>
        ${note.type === "todo" ? `<button class="secondary" data-action="toggle-note-complete" data-id="${note.id}">${note.completed ? t("markActive") : t("markDone")}</button>` : ""}
        <button class="secondary" data-action="toggle-note-spoiler" data-id="${note.id}">${t("markSpoiler")}</button>
        <button class="secondary" data-action="toggle-note-hidden" data-id="${note.id}">${note.isHidden && note.isRevealed ? t("hideNote") : note.isHidden ? t("showNote") : t("markHidden")}</button>
        ${!note.entityId && currentUniverse() ? `<button class="secondary" data-action="attach-note" data-id="${note.id}">${t("attach")}</button>` : ""}
        <button class="danger" data-action="delete-note" data-id="${note.id}">${t("delete")}</button>
      </div>
    </article>
  `;
}

function notePreview(content = "") {
  const text = String(content || "").replace(/\s+/g, " ").trim();
  return text.length > 160 ? `${text.slice(0, 157)}...` : text;
}

function noteTypeLabel(type = "general") {
  return {
    general: t("noteTypeGeneral"),
    idea: t("noteTypeIdea"),
    todo: t("noteTypeTodo"),
    spoiler: t("noteTypeSpoiler"),
    secret: t("noteTypeSecret"),
    hidden: t("noteTypeSecret"),
    author: t("noteTypeAuthor"),
    rpg: t("noteTypeRpg"),
    inconsistency: t("noteTypeInconsistency"),
  }[type] || type;
}

function sortedNotes(notes) {
  return [...notes].sort((a, b) => {
    if (Boolean(a.isPinned) !== Boolean(b.isPinned)) return a.isPinned ? -1 : 1;
    if (Boolean(a.completed) !== Boolean(b.completed)) return a.completed ? 1 : -1;
    return String(b.updatedAt || b.createdAt || "").localeCompare(String(a.updatedAt || a.createdAt || ""));
  });
}

function projectNotes(universeId = state.selectedUniverseId) {
  return activeItems(state.notes).filter((note) => note.universeId === universeId && !note.entityId && !note.categoryId);
}

function categoryNotes(categoryId) {
  return activeItems(state.notes).filter((note) => note.categoryId === categoryId && !note.entityId);
}

function inboxFilterValue() {
  return state.noteInboxFilter || "all";
}

function filterInboxNotes(notes) {
  const filter = inboxFilterValue();
  return notes.filter((note) => {
    const attached = Boolean(note.entityId || note.categoryId);
    if (filter === "attached") return attached;
    if (filter === "unattached") return !attached;
    if (filter === "ideas") return !attached && note.type === "idea";
    if (filter === "todos") return !attached && note.type === "todo";
    return !attached;
  });
}

function renderNoteFilterBar() {
  const active = inboxFilterValue();
  const filters = [
    ["all", t("noteFilterAll")],
    ["unattached", t("noteFilterUnattached")],
    ["attached", t("noteFilterAttached")],
    ["ideas", t("noteFilterIdeas")],
    ["todos", t("noteFilterTodos")],
  ];
  return `
    <div class="segmented-control note-filter">
      ${filters.map(([value, label]) => `<button class="${active === value ? "is-active" : ""}" data-action="set-note-filter" data-filter="${value}">${label}</button>`).join("")}
    </div>
  `;
}

function renderProjectNotesSummary(universe) {
  const notes = sortedNotes(projectNotes(universe.id));
  const pinned = notes.filter((note) => note.isPinned).slice(0, 3);
  const recent = notes.filter((note) => !note.isPinned).slice(0, 3);
  const quickIdeas = activeItems(state.notes).filter((note) => note.universeId === universe.id && note.type === "idea" && !note.entityId && !note.categoryId).length;
  if (!notes.length && !quickIdeas) return "";
  return `
    <section class="stack">
      <div class="row">
        <h3 class="section-title">${t("notes")}</h3>
        <span class="badge">${quickIdeas} ${t("quickIdeas")}</span>
      </div>
      ${pinned.length ? `<h4 class="mini-heading">${t("pinnedNotes")}</h4><div class="note-grid">${pinned.map(renderNoteCard).join("")}</div>` : ""}
      ${recent.length ? `<h4 class="mini-heading">${t("recentNotes")}</h4><div class="note-grid">${recent.map(renderNoteCard).join("")}</div>` : ""}
    </section>
  `;
}

const mapCategoryTypes = new Set(["maps", "mapPins", "routes", "regions"]);

function mapEntities(universeId = state.selectedUniverseId) {
  return universeEntities(universeId).filter((entity) => entityCategoryType(entity) === "maps");
}

function mapPinEntities(universeId = state.selectedUniverseId) {
  return universeEntities(universeId).filter((entity) => entityCategoryType(entity) === "mapPins");
}

function mapImageValue(mapEntity) {
  return fieldValueForName(mapEntity, entityCategory(mapEntity), "Map image");
}

function mapPinsForMap(mapId) {
  return mapPinEntities().filter((pin) => fieldValueForName(pin, entityCategory(pin), "Map") === mapId);
}

function pinField(pin, name) {
  if (!pin) return "";
  return fieldValueForName(pin, entityCategory(pin), name);
}

function pinTypeLabel(type) {
  return {
    location: t("pinTypeLocation"),
    character: t("pinTypeCharacter"),
    event: t("pinTypeEvent"),
    quest: t("pinTypeQuest"),
    organization: t("pinTypeOrganization"),
    item: t("pinTypeItem"),
    danger: t("pinTypeDanger"),
    secret: t("pinTypeSecret"),
    custom: t("pinTypeCustom"),
  }[String(type || "").toLocaleLowerCase("tr")] || type || t("pinTypeCustom");
}

function mapBoardState(universe) {
  const maps = mapEntities(universe.id);
  const selectedMap = maps.find((map) => map.id === state.selectedMapId) || maps[0] || null;
  const pins = selectedMap ? mapPinsForMap(selectedMap.id).filter((pin) => String(pinField(pin, "Visible/hidden") || "visible").toLocaleLowerCase("tr") !== "hidden") : [];
  const selectedPin = pins.find((pin) => pin.id === state.selectedMapPinId) || null;
  return { maps, selectedMap, pins, selectedPin };
}

function renderMapPin(pin) {
  const x = Math.min(100, Math.max(0, Number(pinField(pin, "X position") || 50)));
  const y = Math.min(100, Math.max(0, Number(pinField(pin, "Y position") || 50)));
  const type = String(pinField(pin, "Pin type") || "custom").toLocaleLowerCase("tr");
  return `
    <button class="map-pin map-pin--${escapeHtml(type)} ${state.selectedMapPinId === pin.id ? "is-active" : ""}" data-action="select-map-pin" data-id="${pin.id}" data-map-pin style="left:${x}%; top:${y}%;" title="${escapeHtml(pin.title)}">
      <span></span>
    </button>
  `;
}

function renderMapPinPopover(pin) {
  if (!pin) return "";
  const linked = entityForId(pinField(pin, "Linked entry"));
  return `
    <aside class="map-pin-popover card stack">
      <div>
        <p class="muted">${escapeHtml(pinTypeLabel(pinField(pin, "Pin type")))}</p>
        <h3>${escapeHtml(pin.title || pinField(pin, "Pin label") || t("mapPins"))}</h3>
        ${pin.summary ? `<p>${escapeHtml(pin.summary)}</p>` : ""}
      </div>
      ${linked ? `<button class="secondary" data-action="select-entity" data-id="${linked.id}">${t("openLinkedEntry")}: ${escapeHtml(linked.title)}</button>` : ""}
      ${pinField(pin, "Description") ? `<p class="muted">${escapeHtml(pinField(pin, "Description"))}</p>` : ""}
      <div class="button-row">
        <button class="secondary" data-action="edit-map-pin" data-id="${pin.id}">${t("editPin")}</button>
        <button class="danger" data-action="delete-map-pin" data-id="${pin.id}">${t("deletePin")}</button>
      </div>
    </aside>
  `;
}

function renderMapBoardView(universe) {
  const { maps, selectedMap, pins, selectedPin } = mapBoardState(universe);
  const imageValue = selectedMap ? mapImageValue(selectedMap) : "";
  return `
    <main class="main stack" data-main-panel>
      <section class="toolbar">
        <div class="subview-bar">
          <button class="secondary" data-action="back-from-subview">← ${t("back")}</button>
          <h2>${t("mapBoard")}</h2>
        </div>
        <button data-action="new-map-entry" data-type="maps">${createEntityLabel({ name: "Maps" })}</button>
      </section>
      <section class="timeline-filters">
        <label>${t("selectMap")}
          <select data-map-select>
            ${maps.map((map) => `<option value="${map.id}" ${selectedMap?.id === map.id ? "selected" : ""}>${escapeHtml(map.title)}</option>`).join("")}
          </select>
        </label>
        <button class="secondary" data-action="add-map-pin" ${selectedMap ? "" : "disabled"}>${t("addPin")}</button>
      </section>
      ${selectedMap && imageValue ? `
        <section class="map-board-layout">
          <div class="map-canvas" data-map-canvas data-map-id="${selectedMap.id}">
            <img src="${escapeHtml(imageValue)}" alt="${escapeHtml(selectedMap.title)}" draggable="false" />
            ${pins.map(renderMapPin).join("")}
          </div>
          ${renderMapPinPopover(selectedPin)}
        </section>
      ` : `<section class="empty"><h3>${t("mapBoard")}</h3><p>${t("addMapImageHelp")}</p></section>`}
    </main>
  `;
}

function findingId(parts) {
  return parts.map((part) => String(part || "")).join("|");
}

function consistencyFilters() {
  return { severity: "", categoryId: "", type: "", search: "", showIgnored: false, ...(state.consistencyFilters || {}) };
}

function createFinding(severity, type, title, message, entries = [], suggestion = "", fix = null) {
  const idValue = findingId([severity, type, title, ...entries.map((entry) => entry?.id || entry), suggestion]);
  return { id: idValue, severity, type, title, message, entries: entries.filter(Boolean), suggestion, fix };
}

function safeDate(value) {
  if (!value || typeof value !== "string") return null;
  if (!/\d{4}-\d{1,2}-\d{1,2}|\d{1,2}\/\d{1,2}\/\d{2,4}/.test(value)) return null;
  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? null : timestamp;
}

function looksLikeEntityId(value) {
  return /^entity[_-]/.test(String(value || ""));
}

function isBrokenEntityReferenceValue(value, values, key) {
  if (!value || activeEntityExists(value)) return false;
  if (looksLikeEntityId(value)) return true;
  const labels = referenceLabelsSnapshot(values, key);
  return Boolean(
    values?.[`${key}:label`] ||
    labels[value] ||
    state.entities.some((entity) => entity.id === value && entity.deletedAt)
  );
}

function fieldReferenceFindings(entity, category) {
  const findings = [];
  (category?.customFields || []).forEach((field) => {
    if (field.type !== "entityReference" && field.type !== "entityReferenceList") return;
    const key = fieldStorageKey(field);
    const value = entity.customFieldValues?.[key] || entity.customFieldValues?.[field.name];
    const values = field.type === "entityReferenceList" ? normalizeReferenceListValue(value) : [value].filter(Boolean);
    values.forEach((targetId) => {
      if (!isBrokenEntityReferenceValue(targetId, entity.customFieldValues || {}, key)) return;
      findings.push(createFinding(
        "critical",
        "missing-reference",
        t("missingLinkedEntry"),
        `${entity.title} -> ${fieldLabel(field)}`,
        [entity],
        t("removeMissingReference"),
        { action: "remove-field-reference", entityId: entity.id, fieldKey: key, targetId, isList: field.type === "entityReferenceList" }
      ));
    });
  });
  return findings;
}

function mapPinConsistencyFindings(universeId) {
  const mapFindings = mapEntities(universeId)
    .filter((map) => !mapImageValue(map))
    .map((map) => createFinding("warning", "incomplete", t("mapBoard"), `${map.title}: ${t("mapWithoutImage")}`, [map], t("edit")));
  return [
    ...mapFindings,
    ...mapPinEntities(universeId).flatMap((pin) => {
    const findings = [];
    const linkedFields = ["Linked entry", "Map", "Related event", "Related quest"];
    linkedFields.forEach((fieldName) => {
      const targetId = pinField(pin, fieldName);
      if (targetId && !activeEntityExists(targetId)) {
        findings.push(createFinding("critical", "map-pin", t("missingLinkedEntry"), `${pin.title} ${fieldName}`, [pin], t("removeMissingReference"), { action: "clear-pin-field", pinId: pin.id, fieldName }));
      }
    });
    if (!pin.title && !pinField(pin, "Pin label")) findings.push(createFinding("warning", "incomplete", t("mapPins"), t("pinWithoutLabel"), [pin], t("edit")));
    if (!pinField(pin, "Linked entry")) findings.push(createFinding("info", "incomplete", t("mapPins"), t("pinWithoutLinkedEntry"), [pin], t("edit")));
    return findings;
    }),
  ];
}

function familyConsistencyFindings(universeId) {
  const findings = [];
  const families = universeEntities(universeId).filter((entity) => entityCategoryType(entity) === "families");
  const characters = universeEntities(universeId).filter((entity) => entityCategoryType(entity) === "characters");
  families.forEach((family) => {
    const category = entityCategory(family);
    ["Founder", "Current head"].forEach((fieldName) => {
      const targetId = fieldValueForName(family, category, fieldName);
      if (targetId && !activeEntityExists(targetId)) {
        findings.push(createFinding("critical", "family", t("missingLinkedEntry"), `${family.title}: ${fieldName}`, [family], t("removeMissingReference"), { action: "clear-family-field", entityId: family.id, fieldName }));
      }
    });
    const members = normalizeReferenceListValue(fieldValueForName(family, category, "Members"));
    members.forEach((memberId) => {
      const character = entityForId(memberId);
      if (!character) {
        findings.push(createFinding("critical", "family", t("missingLinkedEntry"), `${family.title}: Members`, [family], t("removeMissingReference"), { action: "remove-family-member", familyId: family.id, memberId }));
        return;
      }
      const characterFamilyId = fieldValueForName(character, entityCategory(character), "Family");
      if (characterFamilyId && characterFamilyId !== family.id) {
        findings.push(createFinding("warning", "family", "Family membership mismatch", `${character.title} belongs to another family field.`, [family, character], t("updateCharacterFamilyField"), { action: "set-character-family", characterId: character.id, familyId: family.id }));
      }
    });
  });
  characters.forEach((character) => {
    const familyId = fieldValueForName(character, entityCategory(character), "Family");
    if (!familyId) return;
    const family = entityForId(familyId);
    if (!family) {
      findings.push(createFinding("critical", "family", t("missingLinkedEntry"), "This character references a deleted family.", [character], t("removeMissingReference"), { action: "clear-character-family", characterId: character.id }));
      return;
    }
    const members = normalizeReferenceListValue(fieldValueForName(family, entityCategory(family), "Members"));
    if (!members.includes(character.id)) {
      findings.push(createFinding("warning", "family", "Family membership mismatch", `${character.title} is not listed in ${family.title}.`, [character, family], t("addCharacterToFamilyMembers"), { action: "add-family-member", familyId: family.id, characterId: character.id }));
    }
  });
  return findings;
}

function timelineConsistencyFindings(universeId) {
  const findings = [];
  timelineEntities(universeId).forEach((entity) => {
    const type = entityCategoryType(entity);
    if (!timelineDateValue(entity)) findings.push(createFinding("info", "timeline", t("timeline"), `${entity.title}: ${t("missingDateOrChronology")}`, [entity], t("edit")));
    if (type === "events") {
      if (!timelineLocationEntities(entity).length) findings.push(createFinding("warning", "timeline", t("timeline"), `${entity.title}: ${t("missingLocation")}`, [entity], t("edit")));
      if (!timelineParticipantEntities(entity).length) findings.push(createFinding("warning", "timeline", t("timeline"), `${entity.title}: ${t("missingParticipants")}`, [entity], t("edit")));
    }
    if (type === "quests" && !storyFieldValue(entity, ["Status"])) findings.push(createFinding("warning", "timeline", t("timeline"), `${entity.title}: ${t("missingStatus")}`, [entity], t("edit")));
    if (type === "sessionNotes" && (!storyFieldValue(entity, ["Session number"]) || !timelineDateValue(entity))) findings.push(createFinding("info", "timeline", t("timeline"), `${entity.title}: ${t("missingSessionNumberOrDate")}`, [entity], t("edit")));
    if (type === "wars") {
      const start = safeDate(storyFieldValue(entity, ["Start date"]));
      const end = safeDate(storyFieldValue(entity, ["End date"]));
      if (start && end && end < start) findings.push(createFinding("warning", "timeline", t("timeline"), `${entity.title}: ${t("endDateBeforeStartDate")}`, [entity], t("edit")));
    }
  });
  return findings;
}

function incompleteEntryFindings(universeId) {
  const findings = [];
  universeEntities(universeId).forEach((entity) => {
    const type = entityCategoryType(entity);
    const category = entityCategory(entity);
    const missing = (fieldName) => !fieldValueForName(entity, category, fieldName);
    const hasField = (fieldName) => Boolean(fieldByPresetName(category, fieldName));
    if (type === "characters" && ((hasField("Backstory") && missing("Backstory")) || (hasField("Role") && missing("Role")))) findings.push(createFinding("info", "incomplete", t("relatedCharacters"), `${entity.title}: missing role or backstory.`, [entity], t("edit")));
    if (type === "locations" && (missing("Location type") || missing("Description"))) findings.push(createFinding("info", "incomplete", t("locationsGroup"), `${entity.title}: missing type or description.`, [entity], t("edit")));
    if (type === "events" && (missing("Date") || missing("Participants") || missing("Location"))) findings.push(createFinding("warning", "incomplete", t("eventsGroup"), `${entity.title}: missing event fields.`, [entity], t("edit")));
    if (type === "quests" && (missing("Status") || missing("Objective"))) findings.push(createFinding("warning", "incomplete", t("questsGroup"), `${entity.title}: missing status or objective.`, [entity], t("edit")));
    if (type === "maps" && missing("Map image")) findings.push(createFinding("warning", "incomplete", t("mapBoard"), `${entity.title}: map has no image.`, [entity], t("edit")));
  });
  activeItems(state.notes).filter((note) => note.universeId === universeId && note.type === "todo" && !note.completed && note.entityId && !activeEntityExists(note.entityId)).forEach((note) => {
    findings.push(createFinding("warning", "notes", t("notes"), "Active todo is attached to a deleted entry.", [], t("edit")));
  });
  return findings;
}

function duplicateFindings(universeId) {
  const findings = [];
  const seenCategories = new Map();
  universeCategories(universeId).forEach((category) => {
    const name = normalizeCategoryName(category.name);
    if (seenCategories.has(name)) findings.push(createFinding("warning", "duplicate", t("categories"), `Duplicate category: ${category.name}`, [category], t("edit")));
    seenCategories.set(name, category);
  });
  const byCategoryTitle = new Map();
  universeEntities(universeId).forEach((entity) => {
    const key = `${entity.categoryId}:${normalizeCategoryName(entity.title)}`;
    if (byCategoryTitle.has(key)) findings.push(createFinding("warning", "duplicate", t("itemPage"), `${t("duplicateTitle")}: ${entity.title}`, [byCategoryTitle.get(key), entity], t("edit")));
    byCategoryTitle.set(key, entity);
  });
  const rels = new Map();
  activeItems(state.relationships).filter((relationship) => relationship.universeId === universeId).forEach((relationship) => {
    const key = [relationship.sourceEntityId, relationship.targetEntityId, relationship.type].join(":");
    if (rels.has(key)) findings.push(createFinding("warning", "duplicate", t("relationshipType"), `Duplicate relationship: ${relationship.type}`, [], t("delete"), { action: "delete-relationship", relationshipId: relationship.id }));
    rels.set(key, relationship);
  });
  const pins = new Map();
  mapPinEntities(universeId).forEach((pin) => {
    const key = `${pinField(pin, "Map")}:${normalizeCategoryName(pin.title || pinField(pin, "Pin label"))}`;
    if (pins.has(key)) findings.push(createFinding("info", "duplicate", t("mapPins"), `${t("duplicateMapPin")}: ${pin.title}`, [pin], t("edit")));
    pins.set(key, pin);
  });
  return findings;
}

function relationshipConsistencyFindings(universeId) {
  return activeItems(state.relationships).filter((relationship) => relationship.universeId === universeId).flatMap((relationship) => {
    if (activeEntityExists(relationship.sourceEntityId) && activeEntityExists(relationship.targetEntityId)) return [];
    return [createFinding("critical", "relationship", t("missingLinkedEntry"), `Relationship points to a missing entry: ${relationship.type}`, [], t("delete"), { action: "delete-relationship", relationshipId: relationship.id })];
  });
}

function noteConsistencyFindings(universeId) {
  return activeItems(state.notes).filter((note) => note.universeId === universeId).flatMap((note) => {
    if (note.entityId && !activeEntityExists(note.entityId)) return [createFinding("warning", "notes", t("notes"), "Note is attached to a missing entry.", [], t("removeMissingReference"), { action: "detach-note", noteId: note.id })];
    if (note.categoryId && !activeCategoryExists(note.categoryId)) return [createFinding("warning", "notes", t("notes"), "Note is attached to a missing category.", [], t("removeMissingReference"), { action: "detach-note", noteId: note.id })];
    return [];
  });
}

function consistencyFindings(universeId) {
  const entities = universeEntities(universeId);
  return [
    ...entities.flatMap((entity) => fieldReferenceFindings(entity, entityCategory(entity))),
    ...relationshipConsistencyFindings(universeId),
    ...mapPinConsistencyFindings(universeId),
    ...noteConsistencyFindings(universeId),
    ...familyConsistencyFindings(universeId),
    ...timelineConsistencyFindings(universeId),
    ...incompleteEntryFindings(universeId),
    ...duplicateFindings(universeId),
  ];
}

function filteredConsistencyFindings(universe) {
  const filters = consistencyFilters();
  const ignored = new Set(state.ignoredConsistencyFindings || []);
  const query = String(filters.search || "").toLocaleLowerCase("tr").trim();
  return consistencyFindings(universe.id).filter((finding) => {
    if (!filters.showIgnored && ignored.has(finding.id)) return false;
    if (filters.severity && finding.severity !== filters.severity) return false;
    if (filters.type && finding.type !== filters.type) return false;
    if (filters.categoryId && !finding.entries.some((entry) => entry.categoryId === filters.categoryId || entry.id === filters.categoryId)) return false;
    if (!query) return true;
    return `${finding.title} ${finding.message} ${finding.suggestion}`.toLocaleLowerCase("tr").includes(query);
  });
}

function renderConsistencyFilters(universe, findings) {
  const filters = consistencyFilters();
  const types = [...new Set(findings.map((finding) => finding.type))].sort();
  return `
    <section class="timeline-filters">
      <label>${t("severity")}
        <select data-consistency-filter="severity">
          <option value="">${t("graphDepthAll")}</option>
          ${["critical", "warning", "info"].map((severity) => `<option value="${severity}" ${filters.severity === severity ? "selected" : ""}>${severityLabel(severity)}</option>`).join("")}
        </select>
      </label>
      <label>${t("category")}
        <select data-consistency-filter="categoryId">
          <option value="">${t("allCategories")}</option>
          ${universeCategories(universe.id, true).map((category) => `<option value="${category.id}" ${filters.categoryId === category.id ? "selected" : ""}>${escapeHtml(category.name)}</option>`).join("")}
        </select>
      </label>
      <label>${t("findingType")}
        <select data-consistency-filter="type">
          <option value="">${t("graphDepthAll")}</option>
          ${types.map((type) => `<option value="${type}" ${filters.type === type ? "selected" : ""}>${escapeHtml(type)}</option>`).join("")}
        </select>
      </label>
      <label>${t("searchPages")} <input data-consistency-filter="search" value="${escapeHtml(filters.search || "")}" /></label>
      <label class="checkbox-line"><input type="checkbox" data-consistency-filter="showIgnored" ${filters.showIgnored ? "checked" : ""} /> ${t("showIgnored")}</label>
    </section>
  `;
}

function severityLabel(severity) {
  return { critical: t("critical"), warning: t("warning"), info: t("info") }[severity] || severity;
}

function renderConsistencyFinding(finding) {
  const isIgnored = (state.ignoredConsistencyFindings || []).includes(finding.id);
  return `
    <article class="consistency-card consistency-card--${finding.severity} ${isIgnored ? "is-ignored" : ""}">
      <div>
        <span class="badge">${severityLabel(finding.severity)}</span>
        <span class="badge">${escapeHtml(finding.type)}</span>
        ${isIgnored ? `<span class="badge">${t("ignored")}</span>` : ""}
      </div>
      <div>
        <h3>${escapeHtml(finding.title)}</h3>
        <p>${escapeHtml(finding.message)}</p>
      </div>
      ${finding.entries.length ? `<div class="badge-list">${finding.entries.map((entry) => entry.title ? `<button class="badge link-chip" data-action="select-entity" data-id="${entry.id}">${escapeHtml(entry.title)}</button>` : `<span class="badge">${escapeHtml(entry.name || entry.id)}</span>`).join("")}</div>` : ""}
      ${finding.suggestion ? `<p class="muted"><strong>${t("suggestedFix")}:</strong> ${escapeHtml(finding.suggestion)}</p>` : ""}
      <div class="button-row">
        ${finding.fix ? `<button class="secondary" data-action="fix-consistency" data-id="${escapeHtml(finding.id)}">${t("fix")}</button>` : ""}
        ${isIgnored ? "" : `<button class="secondary" data-action="ignore-consistency" data-id="${escapeHtml(finding.id)}">${t("ignore")}</button>`}
      </div>
    </article>
  `;
}

function renderConsistencyCheckerView(universe) {
  const allFindings = consistencyFindings(universe.id);
  latestConsistencyFixes = new Map(allFindings.filter((finding) => finding.fix).map((finding) => [finding.id, finding.fix]));
  const findings = filteredConsistencyFindings(universe);
  const counts = ["critical", "warning", "info"].map((severity) => [severity, findings.filter((finding) => finding.severity === severity).length]);
  return `
    <main class="main stack" data-main-panel>
      <section class="toolbar">
        <div class="subview-bar">
          <button class="secondary" data-action="back-from-subview">← ${t("back")}</button>
          <h2>${t("consistencyChecker")}</h2>
        </div>
        <button class="secondary" data-action="run-consistency-check">${t("runCheck")}</button>
      </section>
      <div class="badge-list">${counts.map(([severity, count]) => `<span class="badge">${count} ${severityLabel(severity)}</span>`).join("")}</div>
      ${renderConsistencyFilters(universe, allFindings)}
      ${findings.length ? `<section class="consistency-list">${findings.map(renderConsistencyFinding).join("")}</section>` : `<section class="empty"><h3>${t("noConsistencyIssues")}</h3><p>${t("runCheck")}</p></section>`}
    </main>
  `;
}

async function applyConsistencyFix(fix) {
  if (!fix) return;
  const confirmed = await openChoiceModal(t("applyFix"), t("confirmApplyFix"), [
    { value: "apply", label: t("applyFix"), className: "secondary" },
    { value: "cancel", label: t("cancel"), className: "secondary" },
  ]);
  if (confirmed !== "apply") return;
  if (fix.action === "remove-field-reference") {
    const entity = entityForId(fix.entityId);
    if (!entity) return;
    const values = { ...(entity.customFieldValues || {}) };
    if (fix.isList) {
      values[fix.fieldKey] = normalizeReferenceListValue(values[fix.fieldKey]).filter((item) => item !== fix.targetId).join(",");
      if (!values[fix.fieldKey]) delete values[fix.fieldKey];
    } else {
      delete values[fix.fieldKey];
      delete values[`${fix.fieldKey}:label`];
    }
    state.entities = state.entities.map((item) => item.id === entity.id ? { ...entity, customFieldValues: values, updatedAt: now() } : item);
  }
  if (fix.action === "clear-pin-field") {
    const pin = entityForId(fix.pinId);
    if (!pin) return;
    const next = setFieldValueForName(pin, entityCategory(pin), fix.fieldName, "");
    state.entities = state.entities.map((item) => item.id === pin.id ? next : item);
  }
  if (fix.action === "clear-family-field") {
    const entity = entityForId(fix.entityId);
    if (!entity) return;
    const next = setFieldValueForName(entity, entityCategory(entity), fix.fieldName, "");
    state.entities = state.entities.map((item) => item.id === entity.id ? next : item);
  }
  if (fix.action === "remove-family-member") {
    const family = entityForId(fix.familyId);
    if (!family) return;
    const next = updateReferenceListForName(family, entityCategory(family), "Members", (members) => members.filter((memberId) => memberId !== fix.memberId));
    state.entities = state.entities.map((item) => item.id === family.id ? next : item);
  }
  if (fix.action === "set-character-family" || fix.action === "clear-character-family") {
    const character = entityForId(fix.characterId);
    if (!character) return;
    const next = setFieldValueForName(character, entityCategory(character), "Family", fix.action === "clear-character-family" ? "" : fix.familyId);
    state.entities = state.entities.map((item) => item.id === character.id ? next : item);
  }
  if (fix.action === "add-family-member") {
    const family = entityForId(fix.familyId);
    if (!family) return;
    const next = updateReferenceListForName(family, entityCategory(family), "Members", (members) => [...members, fix.characterId]);
    state.entities = state.entities.map((item) => item.id === family.id ? next : item);
  }
  if (fix.action === "delete-relationship") {
    state.relationships = state.relationships.map((relationship) => relationship.id === fix.relationshipId ? { ...relationship, deletedAt: now(), updatedAt: now() } : relationship);
  }
  if (fix.action === "detach-note") {
    state.notes = state.notes.map((note) => note.id === fix.noteId ? { ...note, entityId: null, categoryId: null, updatedAt: now() } : note);
  }
  saveState();
  render();
}

const timelineCategoryTypes = new Set(["events", "wars", "sessionNotes", "quests"]);
const storyCategoryTypes = new Set(["stories", "books", "chapters", "scenes", "plotThreads", "themes", "draftNotes"]);
const sceneBoardStatuses = ["idea", "planned", "drafting", "revised", "done"];

function storyStatusKey(value) {
  const normalized = String(value || "").trim().toLocaleLowerCase("tr");
  return {
    idea: "idea",
    fikir: "idea",
    planned: "planned",
    "planlandı": "planned",
    drafting: "drafting",
    "yazılıyor": "drafting",
    revising: "revising",
    "düzenleniyor": "revising",
    revised: "revised",
    "düzenlendi": "revised",
    done: "done",
    "tamamlandı": "done",
    archived: "archived",
    "arşivlendi": "archived",
  }[normalized] || normalized || "idea";
}

function storyStatusLabel(statusKey) {
  return {
    idea: t("statusIdea"),
    planned: t("statusPlanned"),
    drafting: t("statusDrafting"),
    revising: t("statusRevising"),
    revised: t("statusRevised"),
    done: t("statusDone"),
    archived: t("statusArchived"),
  }[statusKey] || statusKey;
}

function storyStatusEmptyLabel(statusKey) {
  if (state.settings.language === "tr") {
    return {
      idea: "HenÃ¼z fikir yok.",
      planned: "HenÃ¼z planlanmÄ±ÅŸ sahne yok.",
      drafting: "HenÃ¼z yazÄ±lan sahne yok.",
      revised: "HenÃ¼z dÃ¼zenlenen sahne yok.",
      done: "HenÃ¼z tamamlanan sahne yok.",
    }[statusKey] || t("noPagesHelp");
  }
  return {
    idea: t("emptyStatusIdea"),
    planned: t("emptyStatusPlanned"),
    drafting: t("emptyStatusDrafting"),
    revised: t("emptyStatusRevised"),
    done: t("emptyStatusDone"),
  }[statusKey] || t("noPagesHelp");
}

function storyFieldValue(entity, names) {
  const category = entityCategory(entity);
  for (const name of names) {
    const value = fieldValueForName(entity, category, name);
    if (value) return value;
  }
  return "";
}

function storyLinkedEntities(entity, fieldNames) {
  const category = entityCategory(entity);
  return fieldNames.flatMap((name) => {
    const field = fieldByPresetName(category, name);
    if (!field) return [];
    const value = entity.customFieldValues?.[fieldStorageKey(field)] || entity.customFieldValues?.[field.name];
    const ids = field.type === "entityReferenceList" ? normalizeReferenceListValue(value) : [value].filter(Boolean);
    return ids.map(entityForId).filter(Boolean);
  });
}

function storySortValue(entity) {
  const type = entityCategoryType(entity);
  const numberValue = Number(storyFieldValue(entity, type === "chapters" ? ["Chapter number"] : ["Scene number"]));
  if (!Number.isNaN(numberValue) && numberValue > 0) return numberValue;
  return Number(entity.storyOrder ?? Number.MAX_SAFE_INTEGER);
}

function storyPlannerEntities(universeId = state.selectedUniverseId) {
  return universeEntities(universeId)
    .filter((entity) => storyCategoryTypes.has(entityCategoryType(entity)))
    .sort((a, b) => {
      const typeDiff = [...storyCategoryTypes].indexOf(entityCategoryType(a)) - [...storyCategoryTypes].indexOf(entityCategoryType(b));
      if (typeDiff !== 0) return typeDiff;
      const orderDiff = storySortValue(a) - storySortValue(b);
      if (orderDiff !== 0) return orderDiff;
      return String(a.createdAt || "").localeCompare(String(b.createdAt || ""));
    });
}

function storyPlannerFilters() {
  return {
    status: "",
    povId: "",
    locationId: "",
    relatedId: "",
    ...(state.storyPlannerFilters || {}),
  };
}

function storyPlannerFilterOptions(items) {
  const statuses = [...new Set(items.map((entity) => storyStatusKey(storyFieldValue(entity, ["Status"]))).filter(Boolean))];
  const povs = uniqueEntities(items.flatMap((entity) => storyLinkedEntities(entity, ["POV character", "POV characters"])));
  const locations = uniqueEntities(items.flatMap((entity) => storyLinkedEntities(entity, ["Location"])));
  const related = uniqueEntities(items.filter((entity) => ["stories", "books"].includes(entityCategoryType(entity))));
  return { statuses, povs, locations, related };
}

function filteredStoryPlannerEntities(items) {
  const filters = storyPlannerFilters();
  return items.filter((entity) => {
    if (filters.status && storyStatusKey(storyFieldValue(entity, ["Status"])) !== filters.status) return false;
    if (filters.povId && !storyLinkedEntities(entity, ["POV character", "POV characters"]).some((item) => item.id === filters.povId)) return false;
    if (filters.locationId && !storyLinkedEntities(entity, ["Location"]).some((item) => item.id === filters.locationId)) return false;
    if (filters.relatedId) {
      const related = storyLinkedEntities(entity, ["Related scenes", "Start chapter", "End chapter", "Related timeline entries"]);
      if (entity.id !== filters.relatedId && !related.some((item) => item.id === filters.relatedId)) return false;
    }
    return true;
  });
}

function renderStoryPlannerFilters(items) {
  const filters = storyPlannerFilters();
  const { statuses, povs, locations, related } = storyPlannerFilterOptions(items);
  return `
    <section class="timeline-filters">
      <label>${t("storyStatus")}
        <select data-story-filter="status">
          <option value="">${t("graphDepthAll")}</option>
          ${statuses.map((status) => `<option value="${status}" ${filters.status === status ? "selected" : ""}>${storyStatusLabel(status)}</option>`).join("")}
        </select>
      </label>
      <label>${t("povCharacter")}
        <select data-story-filter="povId">
          <option value="">${t("graphDepthAll")}</option>
          ${povs.map((entity) => `<option value="${entity.id}" ${filters.povId === entity.id ? "selected" : ""}>${escapeHtml(entity.title)}</option>`).join("")}
        </select>
      </label>
      <label>${t("locationsGroup")}
        <select data-story-filter="locationId">
          <option value="">${t("graphDepthAll")}</option>
          ${locations.map((entity) => `<option value="${entity.id}" ${filters.locationId === entity.id ? "selected" : ""}>${escapeHtml(entity.title)}</option>`).join("")}
        </select>
      </label>
      <label>${t("relatedStoryBook")}
        <select data-story-filter="relatedId">
          <option value="">${t("graphDepthAll")}</option>
          ${related.map((entity) => `<option value="${entity.id}" ${filters.relatedId === entity.id ? "selected" : ""}>${escapeHtml(entity.title)}</option>`).join("")}
        </select>
      </label>
    </section>
  `;
}

function renderStorySummaryCards(items) {
  return `<div class="badge-list">${[...storyCategoryTypes].map((type) => {
    const count = items.filter((entity) => entityCategoryType(entity) === type).length;
    return `<span class="badge">${escapeHtml(entityTypeLabels[state.settings.language]?.[type]?.plural || type)}: ${count}</span>`;
  }).join("")}</div>`;
}

function renderStoryPlannerItem(entity, index, total) {
  const type = entityCategoryType(entity);
  const status = storyStatusKey(storyFieldValue(entity, ["Status"]));
  const pov = storyLinkedEntities(entity, ["POV character", "POV characters"]).slice(0, 2);
  const locations = storyLinkedEntities(entity, ["Location"]).slice(0, 2);
  const canMove = type === "chapters" || type === "scenes";
  return `
    <article class="timeline-item story-planner-item">
      <div class="timeline-item__main">
        <span class="timeline-dot"></span>
        <span class="timeline-item__body">
          <span class="timeline-meta">
            <span class="badge">${escapeHtml(entityCategory(entity)?.name || t("category"))}</span>
            <span class="badge">${storyStatusLabel(status)}</span>
          </span>
          <button class="link-button" data-action="select-entity" data-id="${entity.id}"><strong>${escapeHtml(entity.title)}</strong></button>
          ${entity.summary ? `<small>${escapeHtml(entity.summary)}</small>` : ""}
          ${pov.length ? `<small>${t("povCharacter")}: ${renderTimelineChipList(pov)}</small>` : ""}
          ${locations.length ? `<small>${t("locationsGroup")}: ${renderTimelineChipList(locations)}</small>` : ""}
        </span>
      </div>
      ${canMove ? `<div class="timeline-item__actions">
        <button class="secondary" data-action="move-story-item" data-id="${entity.id}" data-direction="-1" ${index === 0 ? "disabled" : ""}>${t("moveEarlier")}</button>
        <button class="secondary" data-action="move-story-item" data-id="${entity.id}" data-direction="1" ${index === total - 1 ? "disabled" : ""}>${t("moveLater")}</button>
      </div>` : ""}
    </article>
  `;
}

function renderSceneBoardCard(entity) {
  const pov = storyLinkedEntities(entity, ["POV character"]).slice(0, 1);
  const locations = storyLinkedEntities(entity, ["Location"]).slice(0, 1);
  const characters = storyLinkedEntities(entity, ["Characters present"]).slice(0, 3);
  const purpose = storyFieldValue(entity, ["Purpose"]) || storyFieldValue(entity, ["Outcome"]);
  return `
    <button class="scene-card" data-action="select-entity" data-id="${entity.id}">
      <strong>${escapeHtml(entity.title)}</strong>
      ${purpose ? `<small>${escapeHtml(purpose)}</small>` : ""}
      ${pov.length ? `<span>${t("povCharacter")}: ${escapeHtml(pov[0].title)}</span>` : ""}
      ${locations.length ? `<span>${t("locationsGroup")}: ${escapeHtml(locations[0].title)}</span>` : ""}
      ${characters.length ? `<span>${t("relatedCharacters")}: ${characters.map((item) => escapeHtml(item.title)).join(", ")}</span>` : ""}
    </button>
  `;
}

function renderSceneBoard(scenes) {
  return `
    <section class="stack">
      <h3 class="section-title">${t("sceneBoard")}</h3>
      <div class="scene-board">
        ${sceneBoardStatuses.map((status) => {
          const items = scenes.filter((entity) => storyStatusKey(storyFieldValue(entity, ["Status"])) === status);
          return `
            <section class="scene-board__column">
              <h4>${storyStatusLabel(status)}</h4>
              ${items.length ? items.map(renderSceneBoardCard).join("") : `<p class="muted">${storyStatusEmptyLabel(status)}</p>`}
            </section>
          `;
        }).join("")}
      </div>
    </section>
  `;
}

function renderStoryPlannerView(universe) {
  const items = storyPlannerEntities(universe.id);
  const visibleItems = filteredStoryPlannerEntities(items);
  const scenes = visibleItems.filter((entity) => entityCategoryType(entity) === "scenes");
  const hasStory = items.some((entity) => ["stories", "books"].includes(entityCategoryType(entity)));
  return `
    <main class="main stack" data-main-panel>
      <section class="toolbar">
        <div class="subview-bar">
          <button class="secondary" data-action="back-from-subview">← ${t("back")}</button>
          <h2>${t("storyPlanner")}</h2>
        </div>
        <div class="button-row">
          <button data-action="new-story-entry" data-type="stories">${t("createStory")}</button>
          <button class="secondary" data-action="new-story-entry" data-type="chapters">${t("createChapter")}</button>
          <button class="secondary" data-action="new-story-entry" data-type="scenes">${t("createScene")}</button>
        </div>
      </section>
      ${renderStorySummaryCards(items)}
      ${hasStory ? "" : `<section class="empty"><h3>${t("createStory")}</h3><p>${t("storyPlanning")}</p></section>`}
      ${renderStoryPlannerFilters(items)}
      ${renderSceneBoard(scenes)}
      ${visibleItems.length ? `
        <section class="timeline-list">
          ${visibleItems.map((entity, index) => renderStoryPlannerItem(entity, index, visibleItems.length)).join("")}
        </section>
      ` : `<section class="empty"><h3>${t("noPagesHelp")}</h3><p>${t("storyPlanning")}</p></section>`}
    </main>
  `;
}

function timelineFieldValue(entity, names) {
  const category = entityCategory(entity);
  for (const name of names) {
    const value = fieldValueForName(entity, category, name);
    if (value) return value;
  }
  return "";
}

function timelineDateValue(entity) {
  return timelineFieldValue(entity, ["Date", "Start date", "Time/date", "Chapter number", "Scene number", "Session number"]);
}

function timelineSortValue(entity) {
  const dateValue = timelineDateValue(entity);
  const timestamp = Date.parse(dateValue);
  return Number.isNaN(timestamp) ? null : timestamp;
}

function timelineOrderValue(entity) {
  return Number(entity.timelineOrder ?? entity.chronologyOrder ?? Number.MAX_SAFE_INTEGER);
}

function timelineManualOrderEnabled(items) {
  return items.every((entity) => timelineSortValue(entity) === null);
}

function timelineEntities(universeId = state.selectedUniverseId) {
  return universeEntities(universeId)
    .filter((entity) => timelineCategoryTypes.has(entityCategoryType(entity)))
    .sort((a, b) => {
      const aDate = timelineSortValue(a);
      const bDate = timelineSortValue(b);
      if (aDate !== null && bDate !== null && aDate !== bDate) return aDate - bDate;
      if (aDate !== null && bDate === null) return -1;
      if (aDate === null && bDate !== null) return 1;
      const orderDiff = timelineOrderValue(a) - timelineOrderValue(b);
      if (orderDiff !== 0) return orderDiff;
      const createdDiff = String(a.createdAt || "").localeCompare(String(b.createdAt || ""));
      if (createdDiff !== 0) return createdDiff;
      return a.title.localeCompare(b.title, state.settings.language === "tr" ? "tr" : "en");
    });
}

function timelineLinkedEntities(entity, fieldNames) {
  const category = entityCategory(entity);
  return fieldNames.flatMap((name) => {
    const field = fieldByPresetName(category, name);
    if (!field) return [];
    const value = entity.customFieldValues?.[fieldStorageKey(field)] || entity.customFieldValues?.[field.name];
    const ids = field.type === "entityReferenceList" ? normalizeReferenceListValue(value) : [value].filter(Boolean);
    return ids.map(entityForId).filter(Boolean);
  });
}

function timelineLocationEntities(entity) {
  return timelineLinkedEntities(entity, ["Location", "Map/Location"]);
}

function timelineParticipantEntities(entity) {
  return timelineLinkedEntities(entity, ["Participants", "Players present", "Related NPCs", "Quest giver", "Commanders", "Sides", "POV character", "POV characters", "Characters present"]);
}

function timelineTags(entity) {
  return (entity.tagIds || []).map((tagId) => state.tags.find((tag) => tag.id === tagId && !tag.deletedAt)).filter(Boolean);
}

function timelineFilterOptions(items) {
  const categories = uniqueEntities(items.map(entityCategory).filter(Boolean));
  const tags = [...new Map(items.flatMap(timelineTags).map((tag) => [tag.id, tag])).values()];
  const locations = uniqueEntities(items.flatMap(timelineLocationEntities));
  const participants = uniqueEntities(items.flatMap(timelineParticipantEntities));
  return { categories, tags, locations, participants };
}

function filteredTimelineEntities(items) {
  const filters = state.timelineFilters || {};
  const query = String(filters.search || "").trim().toLocaleLowerCase("tr");
  return items.filter((entity) => {
    if (filters.categoryId && entity.categoryId !== filters.categoryId) return false;
    if (filters.tagId && !(entity.tagIds || []).includes(filters.tagId)) return false;
    if (filters.locationId && !timelineLocationEntities(entity).some((item) => item.id === filters.locationId)) return false;
    if (filters.participantId && !timelineParticipantEntities(entity).some((item) => item.id === filters.participantId)) return false;
    if (!query) return true;
    const haystack = [
      entity.title,
      entity.summary,
      timelineDateValue(entity),
      entityCategory(entity)?.name,
      ...timelineLocationEntities(entity).map((item) => item.title),
      ...timelineParticipantEntities(entity).map((item) => item.title),
      ...timelineTags(entity).map((tag) => tag.name),
    ].join(" ").toLocaleLowerCase("tr");
    return haystack.includes(query);
  });
}

function renderTimelineFilters(items) {
  const filters = state.timelineFilters || {};
  const { categories, tags, locations, participants } = timelineFilterOptions(items);
  return `
    <section class="timeline-filters">
      <label>${t("category")}
        <select data-timeline-filter="categoryId">
          <option value="">${t("allCategories")}</option>
          ${categories.map((category) => `<option value="${category.id}" ${filters.categoryId === category.id ? "selected" : ""}>${escapeHtml(category.name)}</option>`).join("")}
        </select>
      </label>
      <label>${t("itemTag")}
        <select data-timeline-filter="tagId">
          <option value="">${t("allTags")}</option>
          ${tags.map((tag) => `<option value="${tag.id}" ${filters.tagId === tag.id ? "selected" : ""}>${escapeHtml(tag.name)}</option>`).join("")}
        </select>
      </label>
      <label>${t("locationsGroup")}
        <select data-timeline-filter="locationId">
          <option value="">${t("allLocations")}</option>
          ${locations.map((entity) => `<option value="${entity.id}" ${filters.locationId === entity.id ? "selected" : ""}>${escapeHtml(entity.title)}</option>`).join("")}
        </select>
      </label>
      <label>${t("allParticipants")}
        <select data-timeline-filter="participantId">
          <option value="">${t("allParticipants")}</option>
          ${participants.map((entity) => `<option value="${entity.id}" ${filters.participantId === entity.id ? "selected" : ""}>${escapeHtml(entity.title)}</option>`).join("")}
        </select>
      </label>
      <label>${t("searchPages")}
        <input data-timeline-filter="search" value="${escapeHtml(filters.search || "")}" />
      </label>
    </section>
  `;
}

function renderTimelineChipList(entities) {
  if (!entities.length) return "";
  return `<span class="tag-row">${entities.slice(0, 4).map((entity) => renderEntityChip(entity)).join("")}</span>`;
}

function renderTimelineItem(entity, index, total) {
  const category = entityCategory(entity);
  const dateLabel = timelineDateValue(entity) || t("chronology");
  const tags = timelineTags(entity).slice(0, 3);
  const locations = timelineLocationEntities(entity);
  const participants = timelineParticipantEntities(entity);
  const canMove = timelineManualOrderEnabled(filteredTimelineEntities(timelineEntities(entity.universeId)));
  return `
    <article class="timeline-item">
      <div class="timeline-item__main">
        <span class="timeline-dot"></span>
        <span class="timeline-item__body">
          <span class="timeline-meta">
            <span class="badge">${escapeHtml(dateLabel)}</span>
            <span class="badge">${escapeHtml(category?.name || t("category"))}</span>
          </span>
          <button class="link-button" data-action="select-entity" data-id="${entity.id}"><strong>${escapeHtml(entity.title)}</strong></button>
          ${entity.summary ? `<small>${escapeHtml(entity.summary)}</small>` : ""}
          ${locations.length ? `<small>${t("locationsGroup")}: ${renderTimelineChipList(locations)}</small>` : ""}
          ${participants.length ? `<small>${t("allParticipants")}: ${renderTimelineChipList(participants)}</small>` : ""}
          ${tags.length ? `<span class="tag-row">${tags.map((tag) => `<span class="tag">${escapeHtml(tag.name)}</span>`).join("")}</span>` : ""}
        </span>
      </div>
      ${canMove ? `<div class="timeline-item__actions">
        <button class="secondary" data-action="move-timeline-item" data-id="${entity.id}" data-direction="-1" ${!canMove || index === 0 ? "disabled" : ""}>${t("moveEarlier")}</button>
        <button class="secondary" data-action="move-timeline-item" data-id="${entity.id}" data-direction="1" ${!canMove || index === total - 1 ? "disabled" : ""}>${t("moveLater")}</button>
      </div>` : ""}
    </article>
  `;
}

function renderTimelineView(universe) {
  const items = timelineEntities(universe.id);
  const visibleItems = filteredTimelineEntities(items);
  return `
    <main class="main stack" data-main-panel>
      <section class="toolbar">
        <div class="subview-bar">
          <button class="secondary" data-action="back-from-subview">← ${t("back")}</button>
          <h2>${t("timeline")}</h2>
        </div>
        <button data-action="new-timeline-entry">${t("createEntry")}</button>
      </section>
      ${renderTimelineFilters(items)}
      ${visibleItems.length ? `
        <section class="timeline-list">
          ${visibleItems.map((entity, index) => renderTimelineItem(entity, index, visibleItems.length)).join("")}
        </section>
      ` : `
        <section class="empty">
          <h3>${t("noTimelineEntries")}</h3>
          <p>${t("noTimelineEntriesHelp")}</p>
        </section>
      `}
    </main>
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
  bindTimelineFilterEvents(document);
  bindGraphFilterEvents(document);
  bindGraphMapEvents(document);
  bindStoryPlannerFilterEvents(document);
  bindMapBoardEvents(document);
  bindConsistencyFilterEvents(document);
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

async function confirmDestructiveAction(messageKey, titleKey = "delete") {
  const confirmed = await openChoiceModal(t(titleKey), t(messageKey), [
    { value: "confirm", label: t("moveToTrash"), className: "danger" },
    { value: "cancel", label: t("cancel"), className: "secondary" },
  ]);
  return confirmed === "confirm";
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
  "delete-universe": async function ({ id: universeId }) {
    if (!(await confirmDestructiveAction("confirmUniverseDelete"))) return;
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
  timeline() {
    setState({ view: "timeline", selectedEntityId: null, search: "" });
  },
  "story-planner"() {
    setState({ view: "storyPlanner", selectedEntityId: null, search: "" });
  },
  "map-board"() {
    setState({ view: "mapBoard", selectedEntityId: null, search: "" });
  },
  "consistency-checker"() {
    setState({ view: "consistencyChecker", selectedEntityId: null, search: "" });
  },
  "run-consistency-check"() {
    render();
  },
  "map-board-for-entity"({ id: entityId }) {
    const pin = mapPinEntities().find((item) => pinField(item, "Linked entry") === entityId || pinField(item, "Related event") === entityId || pinField(item, "Related quest") === entityId);
    setState({ view: "mapBoard", selectedEntityId: null, selectedMapId: pin ? pinField(pin, "Map") : state.selectedMapId, selectedMapPinId: pin?.id || null });
  },
  "relationship-graph"() {
    setState({ view: "relationshipGraph", selectedEntityId: null, graphFocusEntityId: null, search: "" });
  },
  "view-entity-graph"({ id: entityId }) {
    const entity = entityForId(entityId);
    if (!entity) return;
    setState({
      view: "relationshipGraph",
      selectedUniverseId: entity.universeId,
      selectedCategoryId: entity.categoryId,
      selectedEntityId: null,
      graphFocusEntityId: entity.id,
      graphFilters: { ...graphFilters(), depth: graphFilters().depth || "1" },
    });
  },
  "clear-graph-focus"() {
    setState({ view: "relationshipGraph", selectedEntityId: null, graphFocusEntityId: null });
  },
  "graph-zoom-in"() {
    const view = graphViewport();
    view.scale = Math.min(1.8, Number(view.scale || 1) + 0.15);
    saveState();
    render();
  },
  "graph-zoom-out"() {
    const view = graphViewport();
    view.scale = Math.max(0.55, Number(view.scale || 1) - 0.15);
    saveState();
    render();
  },
  "graph-reset-view"() {
    if (state.selectedUniverseId) {
      state.graphView = { ...(state.graphView || {}), [state.selectedUniverseId]: { scale: 1, x: 0, y: 0 } };
      state.graphPositions = { ...(state.graphPositions || {}), [state.selectedUniverseId]: {} };
    }
    saveState();
    render();
  },
  "back-from-graph"() {
    const entity = entityForId(state.graphFocusEntityId);
    if (entity) {
      setState({ view: "universe", selectedCategoryId: entity.categoryId, selectedEntityId: entity.id });
      return;
    }
    setState({ view: "projectHome", selectedEntityId: null, graphFocusEntityId: null });
  },
  "open-first-family-tree"() {
    const family = universeEntities().find((entity) => entityCategoryType(entity) === "families");
    if (!family) {
      alert(t("noConnections"));
      return;
    }
    setState({ selectedCategoryId: family.categoryId, selectedEntityId: family.id, view: "universe" });
  },
  "scroll-family-tree"() {
    document.querySelector("[data-family-tree-view]")?.scrollIntoView({ behavior: "smooth", block: "start" });
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
  "toggle-left-panel"() {
    state.collapsedPanels = { ...(state.collapsedPanels || {}), left: !state.collapsedPanels?.left };
    saveState();
    render();
  },
  "toggle-right-panel"() {
    state.collapsedPanels = { ...(state.collapsedPanels || {}), right: !state.collapsedPanels?.right };
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
  "new-timeline-entry"() {
    const eventCategory = categoriesByTypes(["events", "wars", "sessionNotes", "quests"], state.selectedUniverseId, { includeHidden: true })[0];
    if (!eventCategory) {
      openRequiredCategorySetupDialog("events", (category) => {
        state.selectedCategoryId = category.id;
        state.selectedEntityId = null;
        state.view = "universe";
        saveState();
        openEntityModal();
      });
      return;
    }
    state.selectedCategoryId = eventCategory.id;
    state.selectedEntityId = null;
    state.view = "universe";
    openEntityModal();
  },
  "new-dashboard-entry"({ type }) {
    const category = dashboardCategoryForType(state.selectedUniverseId, type);
    if (!category) {
      openRequiredCategorySetupDialog(type, (createdCategory) => {
        state.selectedCategoryId = createdCategory.id;
        state.selectedEntityId = null;
        state.view = "universe";
        saveState();
        openEntityModal();
      });
      return;
    }
    state.selectedCategoryId = category.id;
    state.selectedEntityId = null;
    state.view = "universe";
    saveState();
    openEntityModal();
  },
  "new-story-entry"({ type }) {
    const targetType = type || "scenes";
    const category = categoryByType(targetType, state.selectedUniverseId, { includeHidden: true });
    if (!category) {
      openRequiredCategorySetupDialog(targetType, (createdCategory) => {
        state.selectedCategoryId = createdCategory.id;
        state.selectedEntityId = null;
        state.view = "universe";
        saveState();
        openEntityModal();
      });
      return;
    }
    if (category.isHidden) updateItem("categories", category.id, { isHidden: false });
    state.selectedCategoryId = category.id;
    state.selectedEntityId = null;
    state.view = "universe";
    saveState();
    openEntityModal();
  },
  "new-map-entry"({ type }) {
    const targetType = type || "maps";
    const category = categoryByType(targetType, state.selectedUniverseId, { includeHidden: true });
    if (!category) {
      openRequiredCategorySetupDialog(targetType, (createdCategory) => {
        state.selectedCategoryId = createdCategory.id;
        state.selectedEntityId = null;
        state.view = "universe";
        saveState();
        openEntityModal();
      });
      return;
    }
    if (category.isHidden) updateItem("categories", category.id, { isHidden: false });
    state.selectedCategoryId = category.id;
    state.selectedEntityId = null;
    state.view = "universe";
    saveState();
    openEntityModal();
  },
  "add-map-pin"() {
    const universe = currentUniverse();
    if (!universe) return;
    const { selectedMap } = mapBoardState(universe);
    if (!selectedMap) return;
    openMapPinModal(null, { mapId: selectedMap.id, x: 50, y: 50 });
  },
  "select-map-pin"({ id: pinId }) {
    const pin = entityForId(pinId);
    if (!pin) return;
    setState({ view: "mapBoard", selectedMapId: pinField(pin, "Map") || state.selectedMapId, selectedMapPinId: pin.id, selectedEntityId: null });
  },
  "edit-map-pin"({ id: pinId }) {
    openMapPinModal(entityForId(pinId));
  },
  "delete-map-pin": async function ({ id: pinId }) {
    if (!(await confirmDestructiveAction("confirmMapPinDelete"))) return;
    softDelete("entities", pinId);
    setState({ selectedMapPinId: null });
  },
  "ignore-consistency"({ id: findingIdValue }) {
    state.ignoredConsistencyFindings = [...new Set([...(state.ignoredConsistencyFindings || []), findingIdValue])];
    saveState();
    render();
  },
  "fix-consistency": async function ({ id: findingIdValue }) {
    await applyConsistencyFix(latestConsistencyFixes.get(findingIdValue));
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
  "delete-entity": async function ({ id: entityId }) {
    if (!(await confirmDestructiveAction("confirmPageDelete"))) return;
    softDelete("entities", entityId);
    setState({ selectedEntityId: null });
  },
  "new-relationship": openRelationshipModal,
  "delete-relationship": async function ({ id: relationshipId }) {
    if (!(await confirmDestructiveAction("confirmRelationshipDelete"))) return;
    softDelete("relationships", relationshipId);
  },
  "new-note": () => openNoteModal(currentEntity()?.id || null),
  "quick-note": () => openNoteModal(null),
  "edit-note"({ id: noteId }) {
    openNoteModal(null, state.notes.find((note) => note.id === noteId));
  },
  "delete-note": async function ({ id: noteId }) {
    if (!(await confirmDestructiveAction("confirmNoteDelete"))) return;
    softDelete("notes", noteId);
  },
  "toggle-note-pin"({ id: noteId }) {
    const note = state.notes.find((item) => item.id === noteId);
    updateItem("notes", noteId, { isPinned: !note?.isPinned });
  },
  "toggle-note-complete"({ id: noteId }) {
    const note = state.notes.find((item) => item.id === noteId);
    updateItem("notes", noteId, { completed: !note?.completed });
  },
  "toggle-note-spoiler"({ id: noteId }) {
    const note = state.notes.find((item) => item.id === noteId);
    if (!note) return;
    const isSpoiler = !note.isSpoiler;
    updateItem("notes", noteId, { isSpoiler, type: isSpoiler ? "spoiler" : note.type === "spoiler" ? "general" : note.type });
  },
  "toggle-note-hidden"({ id: noteId }) {
    const note = state.notes.find((item) => item.id === noteId);
    if (!note) return;
    if (note.isHidden) {
      updateItem("notes", noteId, { isRevealed: !note.isRevealed });
      return;
    }
    updateItem("notes", noteId, { isHidden: true, isRevealed: false });
  },
  "attach-note"({ id: noteId }) {
    openAttachNoteDialog(noteId);
  },
  "set-note-filter"({ filter }) {
    state.noteInboxFilter = filter || "all";
    saveState();
    render();
  },
  "timeline-filter"({ filter, value }) {
    state.timelineFilters = { ...(state.timelineFilters || {}), [filter]: value || "" };
    saveState();
    render();
  },
  "move-timeline-item"({ id: entityId, direction }) {
    moveTimelineItem(entityId, Number(direction || 0));
  },
  "move-story-item"({ id: entityId, direction }) {
    moveStoryItem(entityId, Number(direction || 0));
  },
  templates() {
    setState({ view: "templates", selectedEntityId: null });
  },
  "new-template": openTemplateModal,
  "delete-template": async function ({ id: templateId }) {
    if (!(await confirmDestructiveAction("confirmTemplateDelete"))) return;
    softDelete("templates", templateId);
  },
  trash() {
    setState({ view: "trash", selectedEntityId: null });
  },
  "restore-item": async function ({ kind, id: itemId }) {
    await restoreTrashItem(kind, itemId);
  },
  "purge-item": async function ({ kind, id: itemId }) {
    const item = state[collectionForKind(kind)]?.find((entry) => entry.id === itemId);
    const isMapPin = kind === "page" && entityCategoryType(item) === "mapPins";
    const confirmed = await openChoiceModal(t("permanentDelete"), isMapPin ? t("confirmMapPinPermanentDelete") : t("confirmPermanentDelete"), [
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

function bindTimelineFilterEvents(root) {
  root.querySelectorAll("[data-timeline-filter]").forEach((input) => {
    const eventName = input.tagName === "INPUT" ? "input" : "change";
    input.addEventListener(eventName, (event) => {
      const filter = event.currentTarget.dataset.timelineFilter;
      state.timelineFilters = { ...(state.timelineFilters || {}), [filter]: event.currentTarget.value };
      saveState();
      render();
    });
  });
}

function bindGraphFilterEvents(root) {
  root.querySelectorAll("[data-graph-filter]").forEach((input) => {
    const eventName = input.tagName === "INPUT" && input.type !== "checkbox" ? "input" : "change";
    input.addEventListener(eventName, (event) => {
      const filter = event.currentTarget.dataset.graphFilter;
      const value = event.currentTarget.type === "checkbox" ? event.currentTarget.checked : event.currentTarget.value;
      const preserveFocus = event.currentTarget.dataset.preserveFocus;
      const selectionStart = event.currentTarget.selectionStart;
      const selectionEnd = event.currentTarget.selectionEnd;
      state.graphFilters = { ...graphFilters(), [filter]: value };
      saveState();
      render();
      if (preserveFocus) {
        requestAnimationFrame(() => {
          const next = document.querySelector(`[data-preserve-focus="${preserveFocus}"]`);
          next?.focus();
          if (typeof selectionStart === "number" && typeof selectionEnd === "number") {
            next?.setSelectionRange?.(selectionStart, selectionEnd);
          }
        });
      }
    });
  });
}

function categoryTypeForName(categoryName) {
  return categoryPresetAliases[normalizeCategoryName(categoryName)] || "";
}

function bindGraphMapEvents(root) {
  const map = root.querySelector("[data-graph-map]");
  if (!map) return;
  const universeId = map.dataset.universeId || state.selectedUniverseId;
  const content = map.querySelector("[data-graph-content]");
  const svg = map.querySelector("svg");
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const updateEdgePositions = () => {
    if (!svg) return;
    svg.querySelectorAll("[data-edge-line]").forEach((line) => {
      const source = map.querySelector(`[data-graph-node][data-id="${line.dataset.sourceId}"]`);
      const target = map.querySelector(`[data-graph-node][data-id="${line.dataset.targetId}"]`);
      if (!source || !target) return;
      const x1 = parseFloat(source.style.left) || 0;
      const y1 = parseFloat(source.style.top) || 0;
      const x2 = parseFloat(target.style.left) || 0;
      const y2 = parseFloat(target.style.top) || 0;
      line.setAttribute("x1", x1);
      line.setAttribute("y1", y1);
      line.setAttribute("x2", x2);
      line.setAttribute("y2", y2);
      const label = svg.querySelector(`[data-edge-label="${line.dataset.edgeId}"]`);
      if (label) {
        label.setAttribute("x", (x1 + x2) / 2);
        label.setAttribute("y", (y1 + y2) / 2);
      }
    });
  };
  const applyGraphTransform = () => {
    if (content) content.style.transform = graphContentStyle(universeId).replace("transform: ", "").replace(";", "");
  };
  let panStart = null;
  map.addEventListener("wheel", (event) => {
    event.preventDefault();
    const view = graphViewport(universeId);
    const delta = event.deltaY > 0 ? -0.08 : 0.08;
    view.scale = clamp(Number(view.scale || 1) + delta, 0.45, 2.2);
    applyGraphTransform();
    saveState();
  }, { passive: false });
  map.addEventListener("pointerdown", (event) => {
    if (event.target.closest("[data-graph-node]")) return;
    if (event.target.closest(".graph-controls")) return;
    panStart = { x: event.clientX, y: event.clientY, view: { ...graphViewport(universeId) } };
    map.setPointerCapture?.(event.pointerId);
  });
  map.addEventListener("pointermove", (event) => {
    if (!panStart) return;
    const view = graphViewport(universeId);
    view.x = panStart.view.x + event.clientX - panStart.x;
    view.y = panStart.view.y + event.clientY - panStart.y;
    applyGraphTransform();
  });
  map.addEventListener("pointerup", () => {
    if (!panStart) return;
    panStart = null;
    saveState();
  });
  map.querySelectorAll("[data-graph-node]").forEach((node) => {
    let dragStart = null;
    node.addEventListener("dragstart", (event) => event.preventDefault());
    node.addEventListener("click", (event) => {
      if (node.dataset.dragMoved === "true") {
        event.preventDefault();
        event.stopPropagation();
        node.dataset.dragMoved = "";
      }
    }, true);
    node.addEventListener("pointerdown", (event) => {
      dragStart = {
        x: event.clientX,
        y: event.clientY,
        left: parseFloat(node.style.left) || 0,
        top: parseFloat(node.style.top) || 0,
        moved: false,
      };
      node.setPointerCapture?.(event.pointerId);
    });
    node.addEventListener("pointermove", (event) => {
      if (!dragStart) return;
      const scale = Number(graphViewport(universeId).scale || 1);
      const dx = (event.clientX - dragStart.x) / scale;
      const dy = (event.clientY - dragStart.y) / scale;
      if (Math.abs(dx) + Math.abs(dy) > 3) dragStart.moved = true;
      node.style.left = `${clamp(dragStart.left + dx, 90, Number(map.style.getPropertyValue("--graph-width").replace("px", "")) - 90)}px`;
      node.style.top = `${clamp(dragStart.top + dy, 70, Number(map.style.getPropertyValue("--graph-height").replace("px", "")) - 70)}px`;
      updateEdgePositions();
    });
    node.addEventListener("pointerup", (event) => {
      if (!dragStart) return;
      if (dragStart.moved) {
        event.preventDefault();
        event.stopPropagation();
        node.dataset.dragMoved = "true";
        graphManualPositions(universeId)[node.dataset.id] = {
          x: parseFloat(node.style.left) || dragStart.left,
          y: parseFloat(node.style.top) || dragStart.top,
        };
        saveState();
        render();
      }
      dragStart = null;
    });
  });
}

function bindStoryPlannerFilterEvents(root) {
  root.querySelectorAll("[data-story-filter]").forEach((input) => {
    input.addEventListener("change", (event) => {
      const filter = event.currentTarget.dataset.storyFilter;
      state.storyPlannerFilters = { ...storyPlannerFilters(), [filter]: event.currentTarget.value };
      saveState();
      render();
    });
  });
}

function bindMapBoardEvents(root) {
  root.querySelectorAll("[data-map-select]").forEach((select) => {
    select.addEventListener("change", (event) => {
      state.selectedMapId = event.currentTarget.value;
      state.selectedMapPinId = null;
      saveState();
      render();
    });
  });
  const canvas = root.querySelector("[data-map-canvas]");
  if (canvas) {
    canvas.addEventListener("click", (event) => {
      if (event.target.closest("[data-map-pin]")) return;
      const rect = canvas.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      openMapPinModal(null, { mapId: canvas.dataset.mapId, x, y });
    });
  }
  root.querySelectorAll("[data-map-pin]").forEach((pinButton) => {
    let dragging = false;
    pinButton.addEventListener("pointerdown", (event) => {
      const board = pinButton.closest("[data-map-canvas]");
      if (!board) return;
      event.preventDefault();
      dragging = true;
      pinButton.setPointerCapture(event.pointerId);
      pinButton.classList.add("is-dragging");
      const move = (moveEvent) => {
        if (!dragging) return;
        const rect = board.getBoundingClientRect();
        const x = Math.min(100, Math.max(0, ((moveEvent.clientX - rect.left) / rect.width) * 100));
        const y = Math.min(100, Math.max(0, ((moveEvent.clientY - rect.top) / rect.height) * 100));
        pinButton.style.left = `${x}%`;
        pinButton.style.top = `${y}%`;
      };
      const finish = (upEvent) => {
        if (!dragging) return;
        dragging = false;
        pinButton.classList.remove("is-dragging");
        pinButton.removeEventListener("pointermove", move);
        pinButton.removeEventListener("pointerup", finish);
        const rect = board.getBoundingClientRect();
        const x = Math.min(100, Math.max(0, ((upEvent.clientX - rect.left) / rect.width) * 100)).toFixed(2);
        const y = Math.min(100, Math.max(0, ((upEvent.clientY - rect.top) / rect.height) * 100)).toFixed(2);
        moveMapPin(pinButton.dataset.id, x, y);
      };
      pinButton.addEventListener("pointermove", move);
      pinButton.addEventListener("pointerup", finish);
    });
  });
}

function bindConsistencyFilterEvents(root) {
  root.querySelectorAll("[data-consistency-filter]").forEach((input) => {
    const eventName = input.tagName === "INPUT" && input.type !== "checkbox" ? "input" : "change";
    input.addEventListener(eventName, (event) => {
      const key = event.currentTarget.dataset.consistencyFilter;
      const value = event.currentTarget.type === "checkbox" ? event.currentTarget.checked : event.currentTarget.value;
      state.consistencyFilters = { ...consistencyFilters(), [key]: value };
      saveState();
      render();
    });
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
  const missingReferenceText = missingReference
    ? missingReferenceLabel(referenceLabelSnapshot(entity?.customFieldValues || {}, storageKey))
    : "";
  return `
    <div class="field-entry" data-entity-field data-field-id="${escapeHtml(field.id || "")}" data-field-key="${escapeHtml(storageKey)}" data-field-name="${escapeHtml(field.name || "")}">
      <button class="field-drag-handle" type="button" draggable="true" tabindex="-1" data-entity-field-drag-handle title="${escapeHtml(t("dragToReorder"))}" aria-label="${escapeHtml(t("dragToReorder"))}">☰</button>
      <div class="stack">
        <label>${escapeHtml(fieldLabel(field))}
          ${isList ? "" : `
            <select name="field:${escapeHtml(storageKey)}" data-reference-select>
              <option value="">${t("selectPlaceholder")}</option>
              ${targets.map((target) => `<option value="${target.id}" ${target.id === selectedValue ? "selected" : ""}>${escapeHtml(target.title)}</option>`).join("")}
            </select>
            <button class="secondary reference-create-button" type="button" data-create-linked-entry>${t("createNew")}</button>
            ${missingReference ? `<input type="hidden" name="field:${escapeHtml(storageKey)}" value="${escapeHtml(value)}" data-missing-reference-value />` : ""}
          `}
        </label>
        ${isList ? `
          <input type="hidden" name="field:${escapeHtml(storageKey)}" value="${escapeHtml([...selectedIds].join(","))}" data-reference-list-value />
          <button class="secondary reference-create-button" type="button" data-create-linked-entry>${t("createNew")}</button>
          <div class="reference-checkbox-list">
            ${targets.map((target) => `
              <label class="checkbox-line">
                <input type="checkbox" value="${target.id}" data-reference-list-option ${selectedIds.has(target.id) ? "checked" : ""} />
                ${escapeHtml(target.title)}
              </label>
            `).join("")}
          </div>
        ` : ""}
        ${missingReference ? `<small class="muted">${escapeHtml(missingReferenceText)}</small>` : ""}
        ${legacyText ? `<small class="muted">${escapeHtml(legacyText)}</small>` : ""}
      </div>
      <button class="secondary danger-text" type="button" tabindex="-1" data-remove-entity-field>${t("removeField")}</button>
    </div>
  `;
}

function firstReferenceTargetCategory(field, universeId = state.selectedUniverseId) {
  const targetTypes = field.targetCategoryTypes || [];
  return state.categories
    .filter((category) => category.universeId === universeId && !category.deletedAt)
    .find((category) => targetTypes.includes(getCategoryTypeKey(category)));
}

function createLinkedEntity(field, sourceEntity, title) {
  const targetCategory = firstReferenceTargetCategory(field, sourceEntity?.universeId || state.selectedUniverseId);
  if (!targetCategory) {
    alert(t("targetCategoryMissing"));
    return null;
  }
  const entity = {
    id: id("entity"),
    universeId: targetCategory.universeId,
    categoryId: targetCategory.id,
    title,
    summary: "",
    content: "",
    customFieldValues: {},
    coverImage: "",
    icon: "",
    tagIds: [],
    createdAt: now(),
    updatedAt: now(),
    deletedAt: null,
  };
  state.entities.push(entity);
  saveState();
  return entity;
}

function appendReferenceOption(fieldElement, field, entity) {
  const select = fieldElement.querySelector("[data-reference-select]");
  if (select) {
    select.insertAdjacentHTML("beforeend", `<option value="${entity.id}">${escapeHtml(entity.title)}</option>`);
    select.value = entity.id;
    fieldElement.querySelector("[data-missing-reference-value]")?.remove();
    return;
  }
  const list = fieldElement.querySelector(".reference-checkbox-list");
  const valueInput = fieldElement.querySelector("[data-reference-list-value]");
  if (!list || !valueInput) return;
  list.insertAdjacentHTML("beforeend", `
    <label class="checkbox-line">
      <input type="checkbox" value="${entity.id}" data-reference-list-option checked />
      ${escapeHtml(entity.title)}
    </label>
  `);
  const values = new Set(normalizeReferenceListValue(valueInput.value));
  values.add(entity.id);
  valueInput.value = [...values].join(",");
}

function addReferenceLabelSnapshots(values, fields = []) {
  fields.forEach((field) => {
    if (field.type !== "entityReference" && field.type !== "entityReferenceList") return;
    const key = fieldStorageKey(field);
    if (field.type === "entityReference") {
      const value = values[key];
      const entity = entityByReferenceId(value);
      if (entity) values[`${key}:label`] = entity.title;
      if (!value) delete values[`${key}:label`];
      return;
    }
    const labels = {};
    normalizeReferenceListValue(values[key]).forEach((entityId) => {
      const entity = entityByReferenceId(entityId);
      if (entity) labels[entityId] = entity.title;
    });
    if (Object.keys(labels).length) values[`${key}:labels`] = JSON.stringify(labels);
    if (!normalizeReferenceListValue(values[key]).length) delete values[`${key}:labels`];
  });
  return values;
}

function fieldByPresetName(category, presetName) {
  const key = fieldPresetKey(presetName);
  return (category?.customFields || []).find((field) => field.name === presetName || fieldStorageKey(field) === key);
}

function fieldValueForName(entity, category, presetName) {
  const field = fieldByPresetName(category, presetName);
  if (!field) return "";
  return entity.customFieldValues?.[fieldStorageKey(field)] || entity.customFieldValues?.[field.name] || "";
}

function setFieldValueForName(entity, category, presetName, value) {
  const field = fieldByPresetName(category, presetName);
  if (!field) return entity;
  const key = fieldStorageKey(field);
  const values = { ...(entity.customFieldValues || {}) };
  if (value) {
    values[key] = value;
    const linked = entityByReferenceId(value);
    if (linked) values[`${key}:label`] = linked.title;
  } else {
    delete values[key];
    delete values[`${key}:label`];
  }
  return { ...entity, customFieldValues: values, updatedAt: now() };
}

function updateReferenceListForName(entity, category, presetName, updater) {
  const field = fieldByPresetName(category, presetName);
  if (!field) return entity;
  const key = fieldStorageKey(field);
  const values = { ...(entity.customFieldValues || {}) };
  const next = updater(normalizeReferenceListValue(values[key]));
  if (next.length) {
    values[key] = [...new Set(next)].join(",");
  } else {
    delete values[key];
  }
  addReferenceLabelSnapshots(values, [field]);
  return { ...entity, customFieldValues: values, updatedAt: now() };
}

function syncCharacterFamilyLinks(beforeEntity, afterEntity) {
  const entity = afterEntity || beforeEntity;
  if (!entity) return;
  const category = state.categories.find((item) => item.id === entity.categoryId);
  const type = getCategoryTypeKey(category);
  if (type === "characters") {
    const beforeFamilyId = beforeEntity ? fieldValueForName(beforeEntity, category, "Family") : "";
    const afterFamilyId = afterEntity ? fieldValueForName(afterEntity, category, "Family") : "";
    if (beforeFamilyId === afterFamilyId) return;
    state.entities = state.entities.map((item) => {
      const familyCategory = state.categories.find((cat) => cat.id === item.categoryId);
      if (getCategoryTypeKey(familyCategory) !== "families") return item;
      if (item.id === beforeFamilyId) {
        return updateReferenceListForName(item, familyCategory, "Members", (members) => members.filter((idValue) => idValue !== entity.id));
      }
      if (item.id === afterFamilyId) {
        return updateReferenceListForName(item, familyCategory, "Members", (members) => [...members, entity.id]);
      }
      return item;
    });
    return;
  }
  if (type === "families") {
    const beforeMembers = new Set(normalizeReferenceListValue(beforeEntity ? fieldValueForName(beforeEntity, category, "Members") : ""));
    const afterMembers = new Set(normalizeReferenceListValue(afterEntity ? fieldValueForName(afterEntity, category, "Members") : ""));
    if ([...beforeMembers].join(",") === [...afterMembers].join(",")) return;
    state.entities = state.entities.map((item) => {
      const characterCategory = state.categories.find((cat) => cat.id === item.categoryId);
      if (getCategoryTypeKey(characterCategory) !== "characters") return item;
      if (afterMembers.has(item.id)) return setFieldValueForName(item, characterCategory, "Family", entity.id);
      if (beforeMembers.has(item.id) && fieldValueForName(item, characterCategory, "Family") === entity.id) {
        return setFieldValueForName(item, characterCategory, "Family", "");
      }
      return item;
    });
  }
}

function openLinkedEntityCreateModal(fieldElement, field, sourceEntity) {
  const targetCategory = firstReferenceTargetCategory(field, sourceEntity?.universeId || state.selectedUniverseId);
  if (!targetCategory) {
    alert(t("targetCategoryMissing"));
    return;
  }
  openModal(t("createLinkedEntry"), `
    <form class="form-grid">
      <p class="muted">${escapeHtml(targetCategory.name)}</p>
      <label>${t("title")} <input name="title" required /></label>
      <label>${t("createLinkedEntry")}
        <select name="createMode">
          <option value="quick">${t("createQuickPlaceholder")}</option>
          <option value="edit">${t("createAndEditDetails")}</option>
        </select>
      </label>
      <div class="button-row">
        <button type="submit">${t("createLinkedEntry")}</button>
        <button class="secondary" type="button" data-modal-close>${t("cancel")}</button>
      </div>
    </form>
  `, (form) => {
    const title = String(form.get("title") || "").trim();
    if (!title) {
      alert(entityTitleRequiredMessage(targetCategory));
      return false;
    }
    const created = createLinkedEntity(field, sourceEntity, title);
    if (!created) return false;
    appendReferenceOption(fieldElement, field, created);
    if (form.get("createMode") === "edit") {
      const previousCategoryId = state.selectedCategoryId;
      state.selectedUniverseId = created.universeId;
      state.selectedCategoryId = created.categoryId;
      saveState();
      setTimeout(() => {
        openEntityModal(created);
        state.selectedCategoryId = previousCategoryId;
        saveState();
      }, 0);
    }
  });
}

function openAttachNoteDialog(noteId) {
  const entities = universeEntities();
  const categories = universeCategories(state.selectedUniverseId, true);
  openModal(t("attach"), `
    <form class="form-grid">
      <label>${t("attachTo")}
        <select name="targetType">
          <option value="project">${t("attachToProject")}</option>
          <option value="category">${t("attachToCategory")}</option>
          <option value="entity">${t("attachToEntry")}</option>
        </select>
      </label>
      <label>${t("category")}
        <select name="categoryId">
          ${categories.map((category) => `<option value="${category.id}">${escapeHtml(category.name)}</option>`).join("")}
        </select>
      </label>
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
    const targetType = form.get("targetType");
    if (targetType === "entity") {
      const entity = entities.find((item) => item.id === form.get("entityId"));
      if (!entity) {
        alert(t("pageNotFound"));
        return false;
      }
      updateItem("notes", noteId, { entityId: entity.id, categoryId: null });
      return;
    }
    if (targetType === "category") {
      updateItem("notes", noteId, { entityId: null, categoryId: form.get("categoryId") || null });
      return;
    }
    updateItem("notes", noteId, { entityId: null, categoryId: null });
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
    updateItem(collection, itemId, { entityId: null, categoryId: null, deletedAt: null });
    return;
  }

  if (collection === "notes" && item.categoryId && !activeCategoryExists(item.categoryId)) {
    updateItem(collection, itemId, { categoryId: null, deletedAt: null });
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

function moveTimelineItem(entityId, direction) {
  if (!direction) return;
  const items = filteredTimelineEntities(timelineEntities());
  if (!timelineManualOrderEnabled(items)) return;
  const index = items.findIndex((entity) => entity.id === entityId);
  const targetIndex = index + direction;
  if (index < 0 || targetIndex < 0 || targetIndex >= items.length) return;
  const orderedIds = items.map((entity) => entity.id);
  [orderedIds[index], orderedIds[targetIndex]] = [orderedIds[targetIndex], orderedIds[index]];
  const orderById = new Map(orderedIds.map((idValue, order) => [idValue, order]));
  state.entities = state.entities.map((entity) =>
    orderById.has(entity.id) ? { ...entity, timelineOrder: orderById.get(entity.id), updatedAt: now() } : entity
  );
  saveState();
  render();
}

const defaultStoryCategoryNames = {
  stories: "Stories",
  books: "Books",
  chapters: "Chapters",
  scenes: "Scenes",
  plotThreads: "Plot Threads",
  themes: "Themes",
  draftNotes: "Draft Notes",
};

const defaultMapCategoryNames = {
  maps: "Maps",
  mapPins: "Map Pins",
  routes: "Routes",
  regions: "Regions",
};

const defaultRequiredCategoryNames = { ...defaultStoryCategoryNames, ...defaultMapCategoryNames, events: "Events" };

function openRequiredCategorySetupDialog(type, afterCreate) {
  const existing = categoryByType(type, state.selectedUniverseId, { includeHidden: true });
  if (existing) {
    if (existing.isHidden) updateItem("categories", existing.id, { isHidden: false });
    afterCreate?.(state.categories.find((category) => category.id === existing.id) || existing);
    return;
  }
  const label = defaultRequiredCategoryNames[type] || type;
  openChoiceModal(t("categoryCreate"), `${t("targetCategoryMissing")} ${label}`, [
    { value: "add", label: addRequiredCategoryLabel(), className: "secondary" },
    { value: "cancel", label: t("cancel"), className: "secondary" },
  ]).then((choice) => {
    if (choice !== "add") return;
    const category = createRequiredCategory(type);
    if (category) afterCreate?.(category);
  });
}

function ensureStoryCategory(type) {
  const universe = currentUniverse();
  if (!universe) return null;
  const existing = categoryByType(type, universe.id, { includeHidden: true });
  if (existing) {
    if (existing.isHidden) updateItem("categories", existing.id, { isHidden: false });
    return state.categories.find((category) => category.id === existing.id) || existing;
  }
  openRequiredCategorySetupDialog(type);
  return null;
}

function ensureMapCategory(type) {
  const universe = currentUniverse();
  if (!universe) return null;
  const existing = categoryByType(type, universe.id, { includeHidden: true });
  if (existing) {
    if (existing.isHidden) updateItem("categories", existing.id, { isHidden: false });
    return state.categories.find((category) => category.id === existing.id) || existing;
  }
  openRequiredCategorySetupDialog(type);
  return null;
}
function setCustomFieldValue(values, category, presetName, value) {
  const field = fieldByPresetName(category, presetName);
  if (!field) return values;
  const key = fieldStorageKey(field);
  if (value === null || value === undefined || value === "") delete values[key];
  else values[key] = value;
  return values;
}

function moveMapPin(pinId, x, y) {
  const pin = entityForId(pinId);
  if (!pin) return;
  const category = entityCategory(pin);
  let next = { ...pin };
  next = setFieldValueForName(next, category, "X position", x);
  next = setFieldValueForName(next, category, "Y position", y);
  state.entities = state.entities.map((entity) => entity.id === pin.id ? next : entity);
  state.selectedMapPinId = pin.id;
  saveState();
  render();
}

function pinTypeOptions(selected = "custom") {
  const types = [
    ["location", t("pinTypeLocation")],
    ["character", t("pinTypeCharacter")],
    ["event", t("pinTypeEvent")],
    ["quest", t("pinTypeQuest")],
    ["organization", t("pinTypeOrganization")],
    ["item", t("pinTypeItem")],
    ["danger", t("pinTypeDanger")],
    ["secret", t("pinTypeSecret")],
    ["custom", t("pinTypeCustom")],
  ];
  const selectedType = String(selected || "custom").toLocaleLowerCase("tr");
  return types.map(([value, label]) => `<option value="${value}" ${selectedType === value ? "selected" : ""}>${escapeHtml(label)}</option>`).join("");
}

function presetFieldLabel(name) {
  return state.settings.language === "tr" ? fieldPresetLabelTranslations[name] || name : name;
}

function openMapPinModal(pin = null, defaults = {}) {
  const category = categoryByType("mapPins", state.selectedUniverseId, { includeHidden: true }) || createRequiredCategory("mapPins");
  const maps = mapEntities();
  if (!category || !maps.length) {
    alert(t("addMapImageHelp"));
    return;
  }
  const isEditing = Boolean(pin?.id);
  const mapId = defaults.mapId || (pin ? pinField(pin, "Map") : state.selectedMapId) || maps[0]?.id || "";
  const linkedId = pin ? pinField(pin, "Linked entry") : "";
  const relatedEventId = pin ? pinField(pin, "Related event") : "";
  const relatedQuestId = pin ? pinField(pin, "Related quest") : "";
  const linkTargets = universeEntities().filter((entity) => entityCategoryType(entity) !== "mapPins");
  const eventTargets = entitiesByCategoryTypes(["events", "wars", "sessionNotes", "quests"]);
  const questTargets = universeEntities().filter((entity) => entityCategoryType(entity) === "quests");
  openModal(isEditing ? t("editPin") : t("addPin"), `
    <form class="form-grid">
      <label>${presetFieldLabel("Pin label")} <input name="pinLabel" required value="${escapeHtml(pin?.title || pinField(pin, "Pin label") || "")}" /></label>
      <label>${presetFieldLabel("Pin type")} <select name="pinType">${pinTypeOptions(pinField(pin, "Pin type"))}</select></label>
      <label>${t("selectMap")}
        <select name="mapId">
          ${maps.map((map) => `<option value="${map.id}" ${map.id === mapId ? "selected" : ""}>${escapeHtml(map.title)}</option>`).join("")}
        </select>
      </label>
      <label>${presetFieldLabel("Linked entry")}
        <select name="linkedEntry">
          <option value="">${t("selectPlaceholder")}</option>
          ${linkTargets.map((entity) => `<option value="${entity.id}" ${entity.id === linkedId ? "selected" : ""}>${escapeHtml(entity.title)}</option>`).join("")}
        </select>
      </label>
      <label>${presetFieldLabel("Related event")}
        <select name="relatedEvent">
          <option value="">${t("selectPlaceholder")}</option>
          ${eventTargets.map((entity) => `<option value="${entity.id}" ${entity.id === relatedEventId ? "selected" : ""}>${escapeHtml(entity.title)}</option>`).join("")}
        </select>
      </label>
      <label>${presetFieldLabel("Related quest")}
        <select name="relatedQuest">
          <option value="">${t("selectPlaceholder")}</option>
          ${questTargets.map((entity) => `<option value="${entity.id}" ${entity.id === relatedQuestId ? "selected" : ""}>${escapeHtml(entity.title)}</option>`).join("")}
        </select>
      </label>
      <label>${presetFieldLabel("Description")} <textarea name="description">${escapeHtml(pinField(pin, "Description") || pin?.summary || "")}</textarea></label>
      <label>${presetFieldLabel("Visible/hidden")}
        <select name="visibility">
          <option value="visible" ${String(pinField(pin, "Visible/hidden") || "visible") !== "hidden" ? "selected" : ""}>${t("show")}</option>
          <option value="hidden" ${String(pinField(pin, "Visible/hidden")) === "hidden" ? "selected" : ""}>${t("hide")}</option>
        </select>
      </label>
      <input type="hidden" name="x" value="${escapeHtml(defaults.x?.toFixed?.(2) || pinField(pin, "X position") || "50")}" />
      <input type="hidden" name="y" value="${escapeHtml(defaults.y?.toFixed?.(2) || pinField(pin, "Y position") || "50")}" />
      <div class="button-row"><button type="submit">${t("save")}</button></div>
    </form>
  `, (form) => {
    const title = String(form.get("pinLabel") || "").trim();
    if (!title) return false;
    const values = { ...(pin?.customFieldValues || {}) };
    setCustomFieldValue(values, category, "Pin label", title);
    setCustomFieldValue(values, category, "Pin type", form.get("pinType"));
    setCustomFieldValue(values, category, "Map", form.get("mapId"));
    setCustomFieldValue(values, category, "Linked entry", form.get("linkedEntry"));
    setCustomFieldValue(values, category, "Related event", form.get("relatedEvent"));
    setCustomFieldValue(values, category, "Related quest", form.get("relatedQuest"));
    setCustomFieldValue(values, category, "Description", form.get("description"));
    setCustomFieldValue(values, category, "Visible/hidden", form.get("visibility"));
    setCustomFieldValue(values, category, "X position", form.get("x"));
    setCustomFieldValue(values, category, "Y position", form.get("y"));
    addReferenceLabelSnapshots(values, category.customFields || []);
    if (isEditing) {
      state.entities = state.entities.map((entity) => entity.id === pin.id ? { ...pin, title, summary: form.get("description"), customFieldValues: values, updatedAt: now() } : entity);
      state.selectedMapId = form.get("mapId");
      state.selectedMapPinId = pin.id;
      saveState();
      render();
      return;
    }
    const entityId = id("entity");
    state.entities.push({
      id: entityId,
      universeId: state.selectedUniverseId,
      categoryId: category.id,
      title,
      summary: form.get("description"),
      content: "",
      customFieldValues: values,
      coverImage: "",
      icon: "",
      tagIds: [],
      createdAt: now(),
      updatedAt: now(),
      deletedAt: null,
    });
    state.selectedMapId = form.get("mapId");
    state.selectedMapPinId = entityId;
    saveState();
    render();
  });
}

function openMapCategorySetupDialog() {
  openRequiredCategorySetupDialog("maps", (category) => {
    state.selectedCategoryId = category.id;
    state.selectedEntityId = null;
    state.view = "universe";
    saveState();
    openEntityModal();
  });
}

function moveStoryItem(entityId, direction) {
  if (!direction) return;
  const entity = entityForId(entityId);
  if (!entity) return;
  const type = entityCategoryType(entity);
  const items = filteredStoryPlannerEntities(storyPlannerEntities())
    .filter((item) => entityCategoryType(item) === type);
  const index = items.findIndex((item) => item.id === entityId);
  const targetIndex = index + direction;
  if (index < 0 || targetIndex < 0 || targetIndex >= items.length) return;
  const orderedIds = items.map((item) => item.id);
  [orderedIds[index], orderedIds[targetIndex]] = [orderedIds[targetIndex], orderedIds[index]];
  const orderById = new Map(orderedIds.map((idValue, order) => [idValue, order]));
  state.entities = state.entities.map((item) =>
    orderById.has(item.id) ? { ...item, storyOrder: orderById.get(item.id), updatedAt: now() } : item
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
    const selectedText = window.getSelection?.().toString() || "";
    if (event.target === backdrop && startedOnBackdrop && !selectedText) close();
    startedOnBackdrop = false;
  });
  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop) return;
    if (event.target.dataset.modalClose !== undefined) close();
    startedOnBackdrop = false;
  });
}

function openModal(title, bodyHtml, onSubmit, onClose) {
  const template = document.getElementById("modal-template");
  const fragment = template.content.cloneNode(true);
  const backdrop = fragment.querySelector(".modal-backdrop");
  fragment.querySelector("[data-modal-title]").textContent = title;
  fragment.querySelector(".modal__header [data-modal-close]")?.setAttribute("aria-label", t("close"));
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
    presetType: preset.presetType || categoryTypeForName(preset.name) || undefined,
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
        presetType: category.presetType || categoryTypeForName(form.get("name")) || inferCategoryTypeFromFields({ ...category, customFields: fields }) || undefined,
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
      presetType: categoryTypeForName(form.get("name")) || inferCategoryTypeFromFields({ customFields: fields }) || undefined,
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
        presetType: preset.presetType || categoryTypeForName(preset.name) || categoryTypeForName(finalName) || undefined,
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
      <label>${getCategoryTypeKey(selectedCategory) === "maps" ? presetFieldLabel("Map name") : t("title")} <input name="title" required value="${escapeHtml(entity?.title || "")}" /></label>
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
    addReferenceLabelSnapshots(customFieldValues, selectedCategory.customFields || []);
    if (isEditing) {
      const beforeEntity = { ...entity, customFieldValues: { ...(entity.customFieldValues || {}) } };
      const nextEntity = {
        ...entity,
        title,
        categoryId,
        summary: form.get("summary"),
        content: form.get("content"),
        tagIds,
        customFieldValues,
        updatedAt: now(),
      };
      state.entities = state.entities.map((item) => item.id === entity.id ? nextEntity : item);
      syncCharacterFamilyLinks(beforeEntity, nextEntity);
      if (getCategoryTypeKey(selectedCategory) === "maps") {
        state.selectedMapId = entity.id;
        state.view = "mapBoard";
        state.selectedEntityId = null;
      }
      saveState();
      render();
      return;
    }
    const entityId = id("entity");
    const nextEntity = {
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
    };
    state.entities.push(nextEntity);
    syncCharacterFamilyLinks(null, nextEntity);
    state.selectedEntityId = entityId;
    state.selectedCategoryId = categoryId;
    if (getCategoryTypeKey(selectedCategory) === "maps") {
      state.selectedMapId = entityId;
      state.selectedEntityId = null;
      state.view = "mapBoard";
    }
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
        <label data-link-target-field hidden>${linkedCategoryLabel()}
          <select name="fieldTargetTypes" multiple size="5">
            ${categoryTypeOptions([])}
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
        targetCategoryTypes: form.getAll("fieldTargetTypes"),
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
    const createLinkedButton = event.target.closest("[data-create-linked-entry]");
    if (createLinkedButton) {
      const fieldElement = createLinkedButton.closest("[data-entity-field]");
      const fieldId = fieldElement?.dataset.fieldId || "";
      const fieldKey = fieldElement?.dataset.fieldKey || "";
      const fieldName = fieldElement?.dataset.fieldName || "";
      const field = (selectedCategory.customFields || []).find((item) =>
        (fieldId && item.id === fieldId) || fieldStorageKey(item) === fieldKey || item.name === fieldName
      );
      if (field && fieldElement) openLinkedEntityCreateModal(fieldElement, field, entity);
      return;
    }
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
      fieldElement?.querySelector("[data-missing-reference-value]")?.remove();
      return;
    }
    const referenceCheckbox = event.target.closest("[data-reference-list-option]");
    if (referenceCheckbox) {
      const fieldElement = referenceCheckbox.closest("[data-entity-field]");
      const options = [...(fieldElement?.querySelectorAll("[data-reference-list-option]") || [])];
      const selected = options.filter((option) => option.checked).map((option) => option.value);
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

function noteTypeOptions(selected = "general") {
  const selectedType = selected === "hidden" ? "secret" : selected;
  const options = [
    ["general", t("noteTypeGeneral")],
    ["idea", t("noteTypeIdea")],
    ["todo", t("noteTypeTodo")],
    ["spoiler", t("noteTypeSpoiler")],
    ["secret", t("noteTypeSecret")],
    ["author", t("noteTypeAuthor")],
    ["rpg", t("noteTypeRpg")],
    ["inconsistency", t("noteTypeInconsistency")],
  ];
  return options.map(([value, label]) => `<option value="${value}" ${selectedType === value ? "selected" : ""}>${escapeHtml(label)}</option>`).join("");
}

function openNoteModal(entityId, note = null) {
  const isEditing = Boolean(note?.id);
  const targetEntityId = isEditing ? note.entityId || null : entityId;
  openModal(isEditing ? t("editNote") : targetEntityId ? t("addNote") : t("idea"), `
    <form class="form-grid">
      <label>${t("title")} <input name="title" value="${escapeHtml(note?.title || "")}" /></label>
      <label>${t("noteType")}
        <select name="type">
          ${noteTypeOptions(note?.type || (targetEntityId ? "general" : "idea"))}
        </select>
      </label>
      <label>${t("note")} <textarea name="content" required placeholder="${t("markdownSupported")}">${escapeHtml(note?.content || "")}</textarea></label>
      <label class="checkbox-line"><input name="isPinned" type="checkbox" ${note?.isPinned ? "checked" : ""} /> ${t("pin")}</label>
      <label class="checkbox-line"><input name="isSpoiler" type="checkbox" ${note?.isSpoiler ? "checked" : ""} /> ${t("noteSpoiler")}</label>
      <label class="checkbox-line"><input name="isHidden" type="checkbox" ${note?.isHidden ? "checked" : ""} /> ${t("noteHidden")}</label>
      <label class="checkbox-line"><input name="completed" type="checkbox" ${note?.completed ? "checked" : ""} /> ${t("markDone")}</label>
      <div class="button-row"><button type="submit">${t("save")}</button></div>
    </form>
  `, (form) => {
    const type = form.get("type");
    const patch = {
      title: form.get("title"),
      content: form.get("content"),
      type,
      isPinned: form.get("isPinned") === "on",
      isHidden: form.get("isHidden") === "on" || type === "secret",
      isSpoiler: form.get("isSpoiler") === "on" || type === "spoiler",
      completed: form.get("completed") === "on",
      isRevealed: false,
    };
    if (isEditing) {
      updateItem("notes", note.id, patch);
      return;
    }
    state.notes.push({
      id: id("note"),
      universeId: state.selectedUniverseId,
      entityId: targetEntityId,
      categoryId: null,
      ...patch,
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
    const fieldTypeSelect = document.querySelector(".modal-backdrop:last-child [name='fieldType']");
    const targetField = document.querySelector(".modal-backdrop:last-child [data-link-target-field]");
    const syncTargetField = () => {
      const type = fieldTypeSelect?.value || "text";
      if (targetField) targetField.hidden = !(type === "entityReference" || type === "entityReferenceList");
    };
    fieldTypeSelect?.addEventListener("change", syncTargetField);
    syncTargetField();
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

function importFieldKey(field) {
  if (!field || typeof field !== "object") return "";
  return fieldStorageKey(field);
}

function importFieldDefinitionsForEntity(entity, categoryById) {
  const category = categoryById.get(entity.categoryId);
  return Array.isArray(category?.customFields) ? category.customFields : [];
}

function validateImportedReferenceValue(value, entityIds, label, fallbackLabel = "") {
  if (!value) return;
  if (entityIds.has(value)) return;
  if (fallbackLabel) return;
  if (looksLikeEntityId(value)) return;
}

function validateImportedCustomFieldReferences(entity, fields, entityIds) {
  const values = isPlainObject(entity.customFieldValues) ? entity.customFieldValues : {};
  fields.forEach((field) => {
    if (field.type !== "entityReference" && field.type !== "entityReferenceList") return;
    const key = importFieldKey(field);
    const value = values[key] ?? values[field.name];
    if (field.type === "entityReference") {
      const fallbackLabel = referenceLabelSnapshot(values, key) || referenceLabelSnapshot(values, field.name);
      normalizeReferenceListValue(value).forEach((entityId) => {
        validateImportedReferenceValue(entityId, entityIds, `${entity.title}.${field.name}`, fallbackLabel);
      });
      return;
    }
    const fallbackLabels = { ...referenceLabelsSnapshot(values, key), ...referenceLabelsSnapshot(values, field.name) };
    normalizeReferenceListValue(value).forEach((entityId) => {
      validateImportedReferenceValue(entityId, entityIds, `${entity.title}.${field.name}`, fallbackLabels[entityId]);
    });
  });
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
  const categoryById = new Map(categories.map((category) => [category.id, category]));

  for (const category of categories) {
    requireString(category.name, "category.name");
    if (category.customFields !== undefined && !Array.isArray(category.customFields)) {
      throw new Error(`Import geçersiz: "${category.name}" kategorisinin alan tanımları hatalı.`);
    }
    (category.customFields || []).forEach((field) => {
      if (!isPlainObject(field)) throw new Error(`Import geçersiz: "${category.name}" kategorisinde hatalı alan tanımı var.`);
      requireString(field.name, "field.name");
      if (field.type !== undefined) requireString(field.type, "field.type");
    });
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
    if (entity.customFieldValues !== undefined && !isPlainObject(entity.customFieldValues)) {
      throw new Error(`Import geçersiz: "${entity.title}" sayfasının customFieldValues alanı hatalı.`);
    }
    validateImportedCustomFieldReferences(entity, importFieldDefinitionsForEntity(entity, categoryById), entityIds);
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
    if (note.categoryId !== null && note.categoryId !== undefined && !categoryIds.has(note.categoryId)) {
      throw new Error("Import geçersiz: not var olmayan bir kategoriye bağlı.");
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
      const ok = await openChoiceModal(t("importAction"), `${payload.universe.name} ${t("importConfirm")} ${validated.categories.length} ${t("importCounts")} ${validated.entities.length} ${t("importPages")}`, [
        { value: "import", label: t("importAction"), className: "secondary" },
        { value: "cancel", label: t("cancel"), className: "secondary" },
      ]);
      if (ok !== "import") return;
      const idMap = new Map();
      const mapId = (oldId, prefix) => {
        if (!idMap.has(oldId)) idMap.set(oldId, id(prefix));
        return idMap.get(oldId);
      };
      const importedEntityIds = new Set(validated.entities.map((item) => item.id));
      const categoryByOldId = new Map(validated.categories.map((category) => [category.id, category]));
      const remapCustomFieldValues = (entity) => {
        const values = entity.customFieldValues || {};
        const fields = importFieldDefinitionsForEntity(entity, categoryByOldId);
        const referenceFields = new Map(fields
          .filter((field) => field.type === "entityReference" || field.type === "entityReferenceList")
          .flatMap((field) => [[importFieldKey(field), field], [field.name, field]]));
        return Object.fromEntries(Object.entries(values).map(([key, value]) => {
          if (key.endsWith(":labels")) {
            const labels = isPlainObject(parseJsonObject(value)) ? parseJsonObject(value) : {};
            const remappedLabels = Object.fromEntries(Object.entries(labels).map(([entityId, label]) => [
              importedEntityIds.has(entityId) ? mapId(entityId, "entity") : entityId,
              label,
            ]));
            return [key, JSON.stringify(remappedLabels)];
          }
          if (key.endsWith(":label")) {
            return [key, value];
          }
          const field = referenceFields.get(key);
          if (!field) return [key, value];
          if (field.type === "entityReference") {
            const ids = normalizeReferenceListValue(value);
            if (ids.length > 1) {
              return [key, ids.map((item) => importedEntityIds.has(item) ? mapId(item, "entity") : item).join(",")];
            }
            return [key, importedEntityIds.has(value) ? mapId(value, "entity") : value];
          }
          if (Array.isArray(value)) {
            return [key, value.map((item) => importedEntityIds.has(item) ? mapId(item, "entity") : item)];
          }
          return [key, normalizeReferenceListValue(value).map((item) =>
            importedEntityIds.has(item) ? mapId(item, "entity") : item
          ).join(",")];
        }));
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
        customFieldValues: remapCustomFieldValues(item),
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
        categoryId: item.categoryId ? mapId(item.categoryId, "category") : null,
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
