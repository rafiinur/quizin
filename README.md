# Quizin 🎯

Aplikasi kuis interaktif yang dibangun dengan React Router v7. Uji pengetahuan kamu dengan soal-soal trivia dari OpenTDB API.

## 🛠️ Tech Stack

### Core

- **[React Router v7](https://reactrouter.com/)** - Client-side routing
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Vite](https://vitejs.dev/)** - Build tool & dev server

### State Management & Data

- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight state management
- **Zustand Middleware** - Persist (localStorage), Shallow (optimized subscriptions)
- **[OpenTDB API](https://opentdb.com/)** - Open Trivia Database untuk soal quiz

### Styling & UI

- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[React Icons](https://react-icons.github.io/react-icons/)** - Phosphor Icons library

## 🚀 Memulai Project

### Prasyarat

- Node.js >= 18.0.0
- npm atau pnpm atau bun

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/quizin.git
cd quizin
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Development Mode

Jalankan development server dengan Hot Module Replacement:

```bash
npm run dev
```

Aplikasi akan tersedia di `http://localhost:5173`

### 4. Build Production

Buat production build:

```bash
npm run build
```

Jalankan production server:

```bash
npm start
```

## 🎮 Cara Menggunakan

1. **Login** - Masukkan username di halaman home
2. **Main Quiz** - Jawab 5 soal pilihan ganda dengan timer 30 detik per soal
3. **Lihat Hasil** - Review skor Anda setelah quiz selesai
4. **Main Lagi** - Reset quiz untuk mendapat soal baru

Built with ❤️ using React Router v7 & Zustand
