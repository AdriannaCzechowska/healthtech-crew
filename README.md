# Łódź w Ruchu

**Gra strategiczno-zdrowotna Smart City dla mieszkańców Łodzi**

Łódź w Ruchu to interaktywna aplikacja webowa, która zamienia miasto w grę - zachęcając mieszkańców do aktywności fizycznej, profilaktyki zdrowotnej i integracji społecznej poprzez rywalizację drużyn.

---

## Czym jest Łódź w Ruchu?

Aplikacja łączy elementy **gamifikacji**, **zdrowia publicznego** i **Smart City**, tworząc ekosystem, w którym:

- **Drużyny** rywalizują o terytoria w różnych dzielnicach Łodzi
- **Sąsiedzi** organizują wspólne wyjścia (spacery, biegi, nordic walking)
- **Punkty** zdobywane za aktywność można wymieniać na nagrody lokalne
- **Dane środowiskowe** (jakość powietrza, pyłki) pomagają planować aktywności
- **Panel zdrowotny** przypomina o badaniach profilaktycznych, sugeruje wizyty kontrolne oraz pomaga monitorować wyniki i postępy zdrowotne.

---

## Główne Funkcje

### Bitwa Drużyn o Miasto
- Interaktywna mapa Łodzi podzielona na terytoria
- Drużyny przejmują obszary poprzez aktywność fizyczną
- Kolory drużyn wizualizują kontrolowane tereny
- Ranking drużyn z punktami i statystykami

### Sąsiedzkie Wyjścia
- Organizuj i dołączaj do lokalnych wydarzeń
- Wspólne spacery, biegi, nordic walking
- System punktów za uczestnictwo
- Integracja społeczności lokalnej

### Strefa Nagród
- Wymiana punktów na nagrody od lokalnych partnerów
- Zniżki, vouchery, darmowe wejściówki
- Ranking drużyn z nagrodami sezonowymi
- Motywacja do regularnej aktywności

### Smart City Łódź
- **Jakość powietrza** - dane AQI w czasie rzeczywistym
- **Poziom pyłków** - informacje dla alergików
- **Trasy spacerowe** - ocena zieleni i jakości powietrza
- **Kampanie miejskie** - wydarzenia profilaktyczne
- **Analityka dzielnic** - statystyki zdrowia publicznego

### Panel Zdrowotny
- Historia badań i przypomnienia
- Rekomendacje AI dotyczące profilaktyki
- Kalendarz badań dopasowany do profilu
- Mapa punktów badań w Łodzi

### Dostępność WCAG AA
- **Kontrola kontrastu** - 3 poziomy (normalny, wysoki, maksymalny)
- **Rozmiar czcionki** - 4 opcje (mały, normalny, duży, bardzo duży)
- **Tryb ciemny** - automatyczne przełączanie
- **Nawigacja klawiaturą** - pełne wsparcie
- **Focus states** - wyraźne wskaźniki fokusa

---

## Stack Technologiczny

### Frontend
- **Next.js 15** - React framework z App Router
- **TypeScript** - bezpieczeństwo typów
- **Tailwind CSS** - utility-first styling
- **shadcn/ui** - komponenty UI
- **Framer Motion** - płynne animacje

### Styling & UX
- **Glassmorphism** - nowoczesne efekty wizualne
- **Pastelowa paleta kolorów** - przyjazny design
- **Responsive design** - mobile-first
- **Dark mode** - wsparcie trybu ciemnego
- **High Contrast Mode (WCAG)** - zapewnia odpowiedni kontrast kolorów dla osób z zaburzeniami widzenia i daltonizmem

---

## Struktura Projektu

```
healthtech-crew/
├── app/                          # Next.js App Router
│   ├── (dashboard)/              # Dashboard główny
│   ├── mapa-miasta/              # Mapa i bitwa drużyn
│   ├── sasiedzkie-wyjscia/       # Wydarzenia lokalne
│   ├── nagrody/                  # System nagród
│   ├── smart-city-lodz/          # Dane Smart City
│   ├── messages/                 # Wiadomości
│   ├── ai-recommendations/       # Rekomendacje AI
│   ├── treatment-plan/           # Plan leczenia
│   ├── visits/                   # Wizyty lekarskie
│   ├── lab-results/              # Wyniki badań
│   └── symptom-check/            # Sprawdzanie objawów
├── components/
│   ├── core/                     # Komponenty główne
│   │   ├── Header.tsx            # Nagłówek z dostępnością
│   │   ├── Sidebar.tsx           # Nawigacja boczna
│   │   ├── AccessibilitySettings.tsx  # Ustawienia WCAG
│   │   └── ...
│   └── ui/                       # Komponenty shadcn/ui
├── lib/
│   ├── api.ts                    # Mock API
│   ├── store.ts                  # Zustand store
│   ├── types.ts                  # TypeScript types
│   └── utils.ts                  # Utility functions
└── public/                       # Zasoby statyczne
```

---

## Jak Grać?

### 1. Dołącz do Drużyny
- Wybierz drużynę w swojej dzielnicy
- Każda drużyna ma swój kolor i terytoria

### 2. Zdobywaj Punkty
- **Aktywność fizyczna** - spacery, biegi, nordic walking (+50-200 pkt)
- **Sąsiedzkie wyjścia** - udział w wydarzeniach (+100-300 pkt)
- **Badania profilaktyczne** - wykonane badania (+150 pkt)
- **Kampanie miejskie** - udział w akcjach (+200 pkt)

### 3. Przejmuj Terytoria
- Aktywność w danym obszarze zwiększa wpływ drużyny
- Terytoria zmieniają kolor na kolor dominującej drużyny
- Im więcej terytoriów, tym wyższy ranking

### 4. Wymieniaj Nagrody
- Zdobyte punkty wymień na nagrody
- Lokalne vouchery, zniżki, bilety
- Nagrody od partnerów miejskich

---

## Innowacje

### Smart City Integration
Aplikacja wykorzystuje dane miejskie do optymalizacji zdrowia:
- **Jakość powietrza** - sugeruje najlepsze miejsca na aktywność
- **Pyłki** - ostrzega alergików
- **Trasy** - rekomenduje najzdrowsze ścieżki
- **Hałas** - identyfikuje spokojne strefy

### Gamifikacja Zdrowia
Przekształcenie profilaktyki w grę:
- Rywalizacja drużyn motywuje do regularności
- Punkty za zdrowe nawyki
- Społeczność wspiera indywidualne cele
- Nagrody wzmacniają pozytywne zachowania

### Dostępność dla Wszystkich
WCAG AA compliance z dodatkowymi funkcjami:
- Kontrola kontrastu dla osób słabowidzących
- Skalowanie czcionek bez utraty layoutu
- Pełna obsługa klawiatury
- Screen reader friendly

---

## Partnerzy i Integracje

Aplikacja może integrować się z:
- **Urząd Miasta Łodzi** - dane środowiskowe, kampanie
- **NFZ** - przypomnienia o badaniach
- **Lokalne firmy** - nagrody i vouchery
- **Centra sportowe** - wydarzenia i zajęcia
- **Apteki** - punkty zdrowia

---

## Statystyki (Mock Data)

- **5 drużyn** w różnych dzielnicach
- **12 terytoriów** do przejęcia
- **15+ nagród** do wymiany
- **8 tras spacerowych** z oceną zdrowia
- **3 kampanie miejskie** miesięcznie

---

## Prywatność i Bezpieczeństwo

- Dane zdrowotne przechowywane lokalnie
- Anonimowe statystyki dla miasta
- Zgodność z RODO
- Opcjonalne udostępnianie danych drużynie

## Dla Kogo?

- **Mieszkańcy Łodzi** - wszyscy, którzy chcą być aktywni
- **Rodziny** - wspólne aktywności i zdrowie dzieci
- **Seniorzy** - przypomnienia o badaniach, bezpieczne trasy
- **Sportowcy amatorzy** - rywalizacja i motywacja
- **Urząd Miasta** - dane o aktywności mieszkańców
- **Potencjalnie** – całe społeczeństwo w skali kraju – rozwiązanie można łatwo wdrożyć w innych miastach i regionach Polski

---

