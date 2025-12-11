# Projekt Jezyki - Testy Poziomujące

Projekt stworzony przy użyciu Vite, React, TypeScript i Vitest.

## Technologie

- **Vite** - szybki bundler i dev server
- **React** - biblioteka do tworzenia interfejsów użytkownika
- **TypeScript** - język programowania z typowaniem statycznym
- **Vitest** - framework do testowania
- **React Testing Library** - narzędzia do testowania komponentów React

## Dostępne skrypty

### `npm run dev`
Uruchamia serwer deweloperski

### `npm run build`
Buduje projekt do produkcji

### `npm run lint`
Sprawdza kod pod kątem błędów

### `npm run preview`
Podgląd zbudowanej aplikacji

### `npm run test`
Uruchamia testy w trybie watch

### `npm run test:ui`
Uruchamia testy z interfejsem graficznym

### `npm run test:run`
Uruchamia wszystkie testy jednorazowo

### `npm run mail-server`
Startuje lokalny serwer do wysyłki maili (Express + nodemailer)

## Struktura projektu

```
src/
├── App.tsx          # Główny komponent aplikacji
├── App.css          # Style dla App
├── App.test.tsx     # Testy dla App
├── main.tsx         # Punkt wejścia aplikacji
├── index.css        # Globalne style
├── test/
│   └── setup.ts     # Konfiguracja testów
└── assets/          # Statyczne zasoby
```

## Konfiguracja wysyłki maili

Zmienne środowiskowe (lokalnie w `.env`, na Netlify w panelu Environment):

- `VITE_API_BASE_URL` – baza URL do API (np. `http://localhost:3001` przy lokalnym Express; na Netlify może być puste, działa przez `/api` + redirect).
- `MAIL_HOST` – host SMTP (wymagane)
- `MAIL_PORT` – port SMTP (np. `587`)
- `MAIL_SECURE` – `true` dla SMTPS, w przeciwnym razie `false`
- `MAIL_USER`, `MAIL_PASS` – dane logowania do SMTP (wymagane)
- `MAIL_FROM` – opcjonalnie nadawca (domyślnie `MAIL_USER`)
- `MAIL_TO` – opcjonalnie adres odbiorcy (domyślnie `kontakt@joannaadamek.edu.pl`)
- `MAIL_SUBJECT` – temat maila (domyślnie `Wynik testu poziomującego`)
- `CORS_ORIGIN` – opcjonalnie do ograniczenia CORS (domyślnie `*`)

### Lokalne testy maili

1. Ustaw `VITE_API_BASE_URL=http://localhost:3001` i dane SMTP w `.env`.
2. W jednej konsoli: `npm run mail-server` (Express na porcie 3001).
3. W drugiej: `npm run dev` (Vite). Wysyłka testów pójdzie na `http://localhost:3001/api/send-result`.

## Deploy na Netlify

- Konfiguracja w `netlify.toml`: build `npm run build`, publish `dist`, funkcje w `netlify/functions/`. Redirect `/api/*` → `/.netlify/functions/:splat`, więc front woła `/api/send-result`.
- Dodaj zmienne środowiskowe w Netlify: `MAIL_HOST`, `MAIL_USER`, `MAIL_PASS` (wymagane) plus ewentualnie `MAIL_PORT`, `MAIL_SECURE`, `MAIL_FROM`, `MAIL_TO`, `MAIL_SUBJECT`, `CORS_ORIGIN`.
- Deploy:
  - Połącz repo z Netlify i pozwól na automatyczne buildy, albo
  - `npm install && npm run build` lokalnie, potem `netlify deploy --prod` (zainicjuj `netlify init`, jeśli nie było).
- Po deployu API jest pod `/api/send-result` (serwowane jako Netlify Function `send-result`).