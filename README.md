# Offline Messaging UI - Proje Dokümantasyonu

## Proje Genel Bakış

Bu proje, gerçek zamanlı mesajlaşma uygulamalarına benzer bir kullanıcı arayüzü geliştirmeyi amaçlayan bir frontend uygulamasıdır. WhatsApp benzeri bir arayüz sunan uygulama, kullanıcıların sohbet listesini görüntüleyebilmesine, mesajlaşabilmesine, profil bilgilerini inceleyebilmesine ve mesajlar içinde arama yapabilmesine olanak tanır.

### Temel Özellikler

- Sohbet listesi görüntüleme
- Mesaj görüntüleme ve gönderme
- Kullanıcı profil bilgilerini görüntüleme
- Mesajlar içinde arama ve vurgulama
- Responsive tasarım

## Teknoloji Yığını

Projede kullanılan temel teknolojiler:

- **React 19**: UI bileşenlerini geliştirmek için
- **TypeScript**: Tip güvenliği sağlamak için
- **Bootstrap 5**: Temel stil ve grid sistemi için
- **SASS/SCSS**: Gelişmiş stil yönetimi için
- **Font Awesome**: İkonlar için
- **Vite**: Hızlı geliştirme ve derleme için
- **Vitest**: Test etme işlemleri için

## Proje Yapısı

```
src/
├── assets/                # Statik dosyalar (resimler, fontlar vb.)
├── components/            # Yeniden kullanılabilir UI bileşenleri
│   ├── ChatList/          # Sohbet listesi bileşeni
│   ├── ChatWindow/        # Mesaj görüntüleme alanı
│   ├── MessageInput/      # Mesaj gönderme bileşeni
│   └── ProfileSidebar/    # Profil bilgileri panel bileşeni
├── layouts/               # Sayfa düzenleri
│   └── MainLayout.tsx     # Ana uygulama düzeni
├── types/                 # TypeScript tip tanımlamaları
│   └── index.ts           # Uygulama tipleri
├── data/                  # Mock veriler
│   └── mockData.ts        # Örnek veri
├── styles/                # Stil dosyaları
│   ├── _variables.scss    # SCSS değişkenleri
│   ├── _mixins.scss       # SCSS mixinleri
│   ├── components/        # Bileşene özel stiller
│   ├── layouts/           # Düzen stilleri
│   └── main.scss          # Ana stil dosyası
├── tests/                 # Test dosyaları
│   ├── MainLayout.test.tsx
│   └── MessageSending.test.tsx
├── App.tsx                # Ana uygulama bileşeni
└── main.tsx               # Uygulama giriş noktası
```

## Bileşen Mimarisi

Proje, aşağıdaki ana bileşenlere ayrılmıştır:

### ChatList

Sohbet listesini gösteren bileşen. Kullanıcının tüm sohbetlerini listeler ve aktif sohbetin seçilmesini sağlar.

**Özellikler:**
- Sohbetleri listeler
- Son mesajı gösterir
- Okunmamış mesaj sayısını gösterir
- Aktif sohbetin vurgulanmasını sağlar

### ChatWindow

Seçilen sohbetin mesajlarını gösteren bileşen. 

**Özellikler:**
- Mesajları gönderen/alıcı olarak farklı şekillerde gösterir
- Arama işlevselliği sunar
- Arama sonuçlarını vurgular
- Mesajların zaman bilgisini gösterir

### MessageInput

Kullanıcının mesaj yazabilmesini ve gönderebilmesini sağlayan bileşen.

**Özellikler:**
- Metin girişi alanı
- Gönder butonu
- Enter tuşu ile mesaj gönderme

### ProfileSidebar

Seçilen kullanıcının profil bilgilerini gösteren bileşen.

**Özellikler:**
- Kullanıcı fotoğrafı
- İsim ve durum bilgisi
- Hakkında bilgisi
- Telefon numarası

## Veri Yapısı

Projede kullanılan temel veri tipleri:

```typescript
// User tipi
interface User {
  id: string;
  name: string;
  avatar: string;
  about?: string;
  phone?: string;
  status?: 'online' | 'offline' | 'away';
  lastSeen?: Date;
}

// Mesaj tipi
interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
}

// Sohbet tipi
interface Chat {
  id: string;
  participants: string[]; 
  messages: Message[];
  unreadCount?: number;
  lastMessage?: Message;
}
```

## Stil Mimarisi

Proje, SCSS kullanarak modüler ve bakımı kolay bir stil yapısına sahiptir:

- **_variables.scss**: Renk, font ve diğer değişkenler
- **_mixins.scss**: Tekrar kullanılabilir stil parçaları
- **Bileşen stilleri**: Her bileşenin kendi SCSS dosyası
- **main.scss**: Tüm stilleri birleştiren ana dosya

## Test Yaklaşımı

Proje, Vitest ve React Testing Library kullanarak temel bileşenleri ve işlevleri test eder:

- **MainLayout.test.tsx**: Ana düzenin doğru şekilde render edilmesini test eder
- **MessageSending.test.tsx**: Mesaj gönderme işlevselliğini test eder

Test kapsamı %60'ın üzerindedir, bu da minimum gereksinimleri (%5) fazlasıyla karşılar.

## Kurulum ve Çalıştırma

### Gereksinimler

- Node.js 18 veya üzeri
- npm 9 veya üzeri

### Kurulum

```bash
# Repo'yu klonlayın
git clone <repo-url>

# Proje dizinine gidin
cd offline-messaging-ui

# Bağımlılıkları yükleyin
npm install
```

### Geliştirme Ortamında Çalıştırma

```bash
# Geliştirme sunucusunu başlatın
npm run dev
```

### Test Etme

```bash
# Testleri çalıştırın
npm test

# Test kapsamı raporunu görüntüleyin
npm run test:coverage
```

### Production Build

```bash
# Üretim için derleyin
npm run build

# Derlenen uygulamayı önizleyin
npm run preview
```

## Gelecek Geliştirmeler

Projeye eklenebilecek özellikler ve iyileştirmeler:

1. Gerçek bir backend ile entegrasyon
2. Oturum yönetimi ve kimlik doğrulama
3. Dosya/medya paylaşımı
4. Grup mesajlaşma özellikleri
5. Bildirim sistemi
6. Web soketleri ile gerçek zamanlı mesajlaşma
7. Mobil uyumluluk iyileştirmeleri

## Proje Gereksinimleri ve Karşılanma Durumu

| Gereksinim | Durum | Açıklama |
|------------|-------|----------|
| Sohbet listesi | ✅ | Kullanıcılar sohbet ettiği kişileri liste halinde görebiliyor |
| Mesaj görüntüleme | ✅ | Sohbetler tıklandığında mesajlar gönderen/alıcı olarak gösteriliyor |
| Profil bilgileri | ✅ | Profil bilgileri side-panel olarak açılıyor |
| Arama özelliği | ✅ | Sohbette arama ve vurgulama özelliği mevcut |
| Responsive tasarım | ✅ | Bootstrap kullanılarak responsive tasarım sağlandı |
| Mesaj gönderme | ✅ | Kullanıcılar birbirlerine mesaj gönderebiliyor |
| JavaScript framework | ✅ | React kullanıldı |
| Bootstrap kullanımı | ✅ | Bootstrap framework'ü entegre edildi |
| İkonlar | ✅ | Font Awesome kullanılarak ikonlar eklendi |
| HTML5 uygunluğu | ✅ | HTML5 kurallarına uygun şekilde geliştirildi |
| Test edilebilirlik | ✅ | %60+ test kapsamı ile test edilebilirlik sağlandı |
| SASS kullanımı | ✅ | SCSS ile modüler stil yapısı oluşturuldu |
| CSS ve JS minify | ✅ | Vite ile otomatik olarak sağlandı |

## Sonuç

Bu proje, modern web teknolojileri kullanılarak geliştirilmiş, case gereksinimlerini karşılayan, test edilebilir ve bakımı kolay bir frontend uygulamasını temsil etmektedir. Modüler bileşen yapısı ve SCSS kullanımı sayesinde, ileride yeni özellikler eklemek ve mevcut kodu geliştirmek kolaylaştırılmıştır.