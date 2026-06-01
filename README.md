# Loreforge

Offline-first worldbuilding workspace for writers, game masters, and RPG creators.

## Overview

Loreforge is a dependency-free offline MVP prototype for creating and organizing fictional worlds, stories, and tabletop RPG campaigns.

It runs directly in the browser by opening `index.html`. No backend, account, cloud service, or npm install is required.

Data is stored locally in the browser using `localStorage`. Universes can be moved between devices manually with JSON import/export.

## Current Features

- Create and manage universes
- Start from built-in templates
- Create custom templates
- Add, edit, hide, reorder, and delete categories
- Create pages/entities inside categories
- Add custom fields to categories/entities
- Add tags
- Search locally
- Create typed relationships between pages
- View backlinks
- Add Markdown-style notes
- Use a quick idea inbox
- Change themes and appearance settings
- Move deleted items to trash
- Restore deleted items
- Permanently delete items with confirmation
- Import and export universes as JSON

## Not Included Yet

The current MVP intentionally does not include:

- User accounts
- Cloud sync
- Payments
- Collaboration
- Backend services
- AI integrations
- Mobile or desktop packaged apps

These may be explored later as optional or pro features.

## Running Locally

Open `index.html` in a modern browser.

No installation is required.

## Data Storage

Loreforge currently stores data in browser `localStorage`.

Clearing browser data may delete saved universes. Use JSON export to keep backups.

## Project Status

This is an early MVP prototype. The goal is to validate the core offline worldbuilding experience before adding higher-risk features such as accounts, sync, collaboration, or AI.

## Roadmap Ideas

- Better editor experience
- Improved template management
- RPG campaign tools
- Relationship graph view
- Timeline view
- Markdown improvements
- Import/export validation
- Desktop/mobile packaging
- Optional sync
- Optional AI support

---

# Türkçe

Loreforge, yazarlar, oyun yöneticileri ve RPG içerik üreticileri için offline-first çalışan bir worldbuilding çalışma alanıdır.

## Genel Bakış

Loreforge; kurgusal evrenler, hikayeler ve masaüstü RPG campaign'leri oluşturmak ve düzenlemek için hazırlanmış bağımlılıksız bir offline MVP prototipidir.

Uygulama `index.html` dosyası tarayıcıda açılarak çalışır. Backend, hesap sistemi, cloud servis veya npm kurulumu gerekmez.

Veriler tarayıcının `localStorage` alanında saklanır. Evrenler JSON import/export ile manuel olarak taşınabilir.

## Mevcut Özellikler

- Evren oluşturma ve yönetme
- Hazır şablonlardan başlama
- Özel şablon oluşturma
- Kategori ekleme, düzenleme, gizleme, sıralama ve silme
- Kategoriler içinde sayfa/entity oluşturma
- Kategori/entity özel alanları
- Etiket sistemi
- Yerel arama
- Sayfalar arasında türlendirilmiş ilişki oluşturma
- Backlink/geri bağlantı görüntüleme
- Markdown benzeri notlar
- Hızlı fikir kutusu
- Tema ve görünüm ayarları
- Silinen öğeleri geri dönüşüm kutusuna taşıma
- Silinen öğeleri geri yükleme
- İkinci onayla kalıcı silme
- JSON import/export

## Henüz Dahil Değil

Bu MVP bilinçli olarak şunları içermez:

- Kullanıcı hesabı
- Cloud sync
- Ödeme sistemi
- Ortak çalışma
- Backend servisleri
- AI entegrasyonu
- Paketlenmiş mobil veya masaüstü uygulama

Bu özellikler ileride opsiyonel veya pro özellikler olarak değerlendirilebilir.

## Yerelde Çalıştırma

`index.html` dosyasını modern bir tarayıcıda açmak yeterlidir.

Kurulum gerekmez.

## Veri Saklama

Loreforge şu anda verileri tarayıcının `localStorage` alanında saklar.

Tarayıcı verilerini temizlemek kayıtlı evrenleri silebilir. Yedek almak için JSON export kullanın.

## Proje Durumu

Bu proje erken aşama bir MVP prototipidir. Amaç; hesap, sync, ortak çalışma veya AI gibi daha riskli özellikleri eklemeden önce temel offline worldbuilding deneyimini doğrulamaktır.

## Yol Haritası Fikirleri

- Daha iyi editör deneyimi
- Gelişmiş şablon yönetimi
- RPG campaign araçları
- İlişki grafiği görünümü
- Zaman çizelgesi görünümü
- Markdown geliştirmeleri
- Import/export doğrulama
- Desktop/mobile paketleme
- Opsiyonel sync
- Opsiyonel AI desteği
