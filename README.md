## MealApp Explorer (Next.js 15 + Redux + SEO First)

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/nuflakbrr/create-bikinproject-app/blob/v2/assets/BikinProject.jpg?raw=true">
    <source media="(prefers-color-scheme: light)" srcset="https://github.com/nuflakbrr/create-bikinproject-app/blob/v2/assets/BikinProject.jpg?raw=true">
    <img alt="Banner BikinProject" src="https://github.com/nuflakbrr/create-bikinproject-app/blob/v2/assets/BikinProject.jpg?raw=true">
  </picture>
</p>

<p align="center">
  <a href="https://badge.fury.io/js/create-bikinproject-app.svg">
    <img src="https://badge.fury.io/js/create-bikinproject-app.svg" alt="NPM Verion">
  </a>
  <a href="https://www.npmjs.com/package/create-bikinproject-app">
    <img src="https://img.shields.io/npm/dt/create-bikinproject-app" alt="NPM Downloads">
  </a>
  <a href="https://www.npmjs.com/package/create-bikinproject-app">
    <img src="https://img.shields.io/npm/l/create-bikinproject-app" alt="NPM License">
  </a>
</p>

MealApp Explorer adalah aplikasi penjelajah resep makanan global yang dibangun dengan fokus pada **SEO**, **Performa**, dan **Interaktivitas**. Proyek ini menggunakan **TheMealDB API** untuk menyajikan data resep secara dinamis.

---

## 🌐 Live Demo

Coba aplikasi secara langsung di: [**cmlabs-frontend-freelance-test.netlify.app**](https://cmlabs-frontend-freelance-test.netlify.app/)

---

## 🚀 Fitur Utama (MealApp)

- **SEO First Architecture**: Implementasi Next.js Server Components untuk metadata dinamis pada setiap halaman resep dan kategori.
- **Dynamic Routing**: Navigasi mulus antar kategori (`/foods/:category`) hingga detail resep (`/foods/:category/:id`).
- **State Management**: Integrasi **Redux Toolkit** untuk pengelolaan data global secara efisien.
- **Responsive UI**: Desain premium menggunakan Tailwind CSS yang adaptif di semua ukuran layar (Mobile hingga Laptop XL).
- **SEO Optimized Breadcrumbs**: Navigasi hirarkis yang membantu Google memahami struktur situs Anda.

## 🛠️ Teknologi Proyek

- **Framework**: Next.js 15 (App Router)
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Icons**: Lucide React & React Icons
- **Data Fetching**: Axios dengan Server-side & Client-side patterns

---

## 📦 BikinProject Template Documentation

*Dokumentasi di bawah ini menjelaskan basis templat yang digunakan untuk membangun proyek ini.*

Ini adalah proyek [Next.js](https://nextjs.org/) di-bootstrap dengan [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), di-generate menggunakan [**BikinProject**](https://nuflakbrr.github.io/bikinproject).

### 💻 Teknologi Yang Digunakan (Template)

- [Next.js (App Router)](https://nextjs.org/)
- [React](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [ESLint & Prettier](https://eslint.org/)

### ✨ Fitur Template

Fitur yang terdapat pada templat proyek ini adalah:

- **Proyek Arsitektur**: Pemisahan komponen yang jelas menggunakan pola `Common` dan `Mixins`.
- **Modern Stack**: Menggunakan versi terbaru dari Next.js dan React.
- **Turbopack Build**: Pengalaman pengembangan yang sangat cepat.
- **Custom Hooks**: Kumpulan hooks yang berguna seperti `useDebounce`, `usePagination`, dan `useSort`.
- **Tema Gelap/Terang**: Dukungan `next-themes` secara bawaan.

### 🏗️ Proyek Arsitektur

Terdapat beberapa poin penting terkait bagaimana menjalankan proyek arsitektur yang benar. Untuk studi kasus kali ini, Saya telah membuatkan sebuah templat proyek kosong yang sudah Saya kustomisasi yang sekiranya sudah mengimplementasi bagaimana cara mengatur proyek arsitektur yang baik agar terlihat rapi.

### 🗺️ Arsitektur Project

Struktur proyek ini dirancang untuk skalabilitas dan optimasi SEO. Berikut adalah peta lengkap dari direktori `src`:

```text
/src
├── app/                 # Next.js 15 App Router (Server-side & SEO First)
│   ├── (root)/          # Rute utama (Home, Foods, Detail)
│   │   ├── foods/       # Struktur dinamis untuk kategori & resep
│   │   └── _components/ # Komponen eksklusif untuk halaman (root)
│   ├── seo.tsx          # Utility generator metadata dinamis
│   └── sitemap.tsx      # Generator peta situs otomatis
├── components/          # Reusable UI Components
│   ├── Common/          # Komponen atomik (Breadcrumbs, Icons, ThemeToggle)
│   ├── Mixins/          # Modul UI kompleks (Navbar, Footer)
│   └── ui/              # Primitive dasar (Buttons, Skeletons, Empty states)
├── config/              # Konfigurasi aplikasi & konstanta global
├── data/                # Data statis & Metadata situs (siteMetadata.ts)
├── hooks/               # Custom React Hooks
│   └── features/        # Logic spesifik fitur (fetching meals & detail)
├── interfaces/          # Kontrak tipe data TypeScript (Model & Props)
├── lib/                 # Core utilities (Axios Client, Formatters, Helpers)
├── providers/           # Wrapper global (Redux Store & Themes)
├── redux/               # Management state global (Slices, Actions, Store)
└── services/            # Layer abstraksi API untuk TheMealDB
```

#### 📂 Penjelasan Fungsi Direktori:

1.  **`src/app`**: Menggunakan pola **Server Components** secara default untuk memastikan konten dapat diindeks oleh mesin pencari. File `seo.tsx` memungkinkan setiap halaman dinamis memiliki meta-tags yang unik secara otomatis.
2.  **`src/components`**:
    -   **Common**: Komponen independen yang tidak memiliki ketergantungan pada business logic besar.
    -   **Mixins**: Komponen yang merangkai beberapa komponen common menjadi sebuah fitur (seperti Navbar).
    -   **ui**: Basis komponen (primitives) yang digunakan di seluruh aplikasi.
3.  **`src/hooks`**: Memisahkan business logic dari komponen UI. Folder `features` berisi hooks yang terhubung langsung dengan action Redux untuk data resep.
4.  **`src/redux`**: Menggunakan Redux Toolkit. `uiSlice` menangani status loading/error aplikasi secara global, sementara `mealSlice` menangani data dari TheMealDB.
5.  **`src/services`**: Satu-satunya tempat di mana pemanggilan API external dilakukan. Ini menjaga agar logic pemanggilan API tidak tersebar di banyak tempat.
6.  **`src/lib`**: Berisi fungsi helper murni seperti `formatCurrency` dan `cn` (Tailwind Merge) yang digunakan di berbagai tempat.

#### 🧩 Komponen UI

- **Folder Common**: Berisi komponen-komponen atomik seperti tombol, icon, atau elemen UI dasar lainnya yang dapat digunakan kembali.
- **Folder Mixins**: Berisi komponen-komponen yang lebih besar dan kompleks yang merupakan gabungan dari beberapa komponen `Common`, seperti Navbar atau Footer.

---

## 🛠️ Cara Menjalankan

1. **Instal Dependensi**:
```bash
# pnpm
pnpm install

# npm
npm install

# yarn
yarn install

# bun
bun install
```

2. **Konfigurasi Environment**:
Salin `.env.example` ke `.env` dan pastikan `NEXT_PUBLIC_BASE_API_URL` terisi.
```bash
NEXT_PUBLIC_BASE_API_URL="https://www.themealdb.com/api/json/v1/1"
```

3. **Jalankan Development Server**:
```bash
pnpm dev # atau npm run dev / yarn dev / bun dev
```

4. **Build untuk Produksi**:
```bash
pnpm build # atau npm run build / yarn build / bun build
pnpm start # atau npm run start / yarn start / bun start
```

## 📝 Catatan SEO

Setiap halaman menggunakan utilitas `genPageMetadata` di `src/app/seo.tsx` untuk memastikan konsistensi tag OpenGraph, Twitter, dan Canonical URL. Pastikan untuk memperbarui `siteMetadata.ts` sebelum deployment untuk mencerminkan URL produksi Anda.

## 👥 Author

Naufal Akbar Nugroho  
[@nuflakbrr](https://github.com/nuflakbrr)
