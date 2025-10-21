# Jak otworzyć projekt w VS Code

## Metoda 1: Klonowanie z GitHub (Zalecana)

1. **Otwórz VS Code**

2. **Naciśnij `Ctrl+Shift+P` (Windows/Linux) lub `Cmd+Shift+P` (Mac)**

3. **Wpisz "Git: Clone" i wybierz tę opcję**

4. **Wklej URL repozytorium:**
   ```
   https://github.com/AdriannaCzechowska/healthtech-crew
   ```

5. **Wybierz folder, gdzie chcesz zapisać projekt**

6. **Kliknij "Open" gdy VS Code zapyta, czy otworzyć sklonowany projekt**

## Metoda 2: Otwieranie lokalnego folderu

Jeśli już masz projekt pobrany:

1. **W VS Code: File → Open Folder**

2. **Wybierz folder `healthtech-crew`**

## Po otwarciu projektu:

### 1. Zainstaluj zależności

Otwórz terminal w VS Code (`Ctrl+\`` lub Terminal → New Terminal) i uruchom:

```bash
pnpm install
```

Jeśli nie masz pnpm, zainstaluj go najpierw:
```bash
npm install -g pnpm
```

### 2. Uruchom serwer deweloperski

```bash
pnpm dev
```

### 3. Otwórz w przeglądarce

Aplikacja będzie dostępna pod adresem:
```
http://localhost:3000
```

## Zalecane rozszerzenia VS Code:

Zainstaluj te rozszerzenia dla lepszego doświadczenia:

1. **ESLint** - Linting kodu
2. **Prettier** - Formatowanie kodu
3. **Tailwind CSS IntelliSense** - Podpowiedzi dla Tailwind
4. **TypeScript and JavaScript Language Features** - Wsparcie TypeScript
5. **GitLens** - Rozszerzone funkcje Git

## Struktura projektu:

```
healthtech-crew/
├── app/                    # Strony aplikacji (Next.js App Router)
├── components/            # Komponenty React
│   ├── core/             # Współdzielone komponenty
│   └── ui/               # Komponenty UI (shadcn/ui)
├── lib/                   # Utilities, typy, API
├── public/               # Pliki statyczne
└── package.json          # Zależności projektu
```

## Komendy:

- `pnpm dev` - Uruchom serwer deweloperski
- `pnpm build` - Zbuduj wersję produkcyjną
- `pnpm start` - Uruchom wersję produkcyjną
- `pnpm lint` - Sprawdź błędy w kodzie

## Troubleshooting:

### Problem: "pnpm: command not found"
**Rozwiązanie:** Zainstaluj pnpm globalnie:
```bash
npm install -g pnpm
```

### Problem: Błędy podczas instalacji
**Rozwiązanie:** Usuń folder `node_modules` i plik `pnpm-lock.yaml`, a następnie:
```bash
pnpm install
```

### Problem: Port 3000 jest zajęty
**Rozwiązanie:** Zmień port w package.json lub zatrzymaj inną aplikację używającą portu 3000

## Potrzebujesz pomocy?

Sprawdź plik README.md w głównym folderze projektu dla więcej informacji!

