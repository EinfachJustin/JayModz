# JayModz - FiveM Scripts & Resources

Eine moderne, professionelle Website für deine FiveM Scripts und Resources mit automatischer Update-Prüfung.

## Features

- 🌐 **Moderne Website** - Responsives, clean Design
- 🔄 **Auto-Updates** - Automatische Versionsprüfung über GitHub API
- 📱 **Mobile-First** - Optimiert für alle Geräte
- 🎨 **Anpassbar** - Einfach zu personalisieren
- 🚀 **GitHub Pages** - Kostenloser Hosting
- 💻 **FiveM Integration** - Update-Checker für deine Resources

## Setup

### 1. Repository erstellen

1. Erstelle ein neues GitHub Repository namens `JayModz`
2. Lade alle Dateien in dein Repository hoch
3. Gehe zu Settings > Pages
4. Wähle "Deploy from a branch" und "main" branch
5. Deine Website ist verfügbar unter: `https://dein-username.github.io/JayModz`

### 2. Konfiguration anpassen

#### `script.js` - Zeilen 2-6:
```javascript
const CONFIG = {
    GITHUB_USERNAME: 'dein-username', // Ändere zu deinem GitHub Username
    GITHUB_REPO: 'JayModz',
    // ...
};
```

#### `_config.yml` - Zeile 3:
```yaml
url: https://dein-username.github.io/JayModz
```

#### `fivem-updater.lua` - Zeile 7:
```lua
    githubUsername = "dein-username",
```

### 3. Scripts hinzufügen

Bearbeite `scripts.json` und füge deine Scripts hinzu:

```json
{
  "scripts": [
    {
      "id": "mein-script",
      "name": "Mein Awesome Script",
      "version": "1.0.0",
      "description": "Beschreibung deines Scripts",
      "features": [
        "Feature 1",
        "Feature 2"
      ],
      "downloadUrl": "https://github.com/username/mein-script/releases/latest",
      "githubUrl": "https://github.com/username/mein-script",
      "lastUpdate": "2024-01-15",
      "downloads": 0,
      "tags": ["category", "type"],
      "requirements": ["ESX", "MySQL"],
      "compatible": ["ESX", "QBCore"]
    }
  ]
}
```

### 4. FiveM Integration

Füge `fivem-updater.lua` in deine FiveM Resources ein:

1. Kopiere `fivem-updater.lua` in deine Resource
2. Ändere die Version in Zeile 4
3. Ändere den GitHub Username in Zeile 7
4. Starte die Resource

## Automatische Updates

Das System überprüft automatisch:
- **Website**: Täglich um 6:00 UTC via GitHub Actions
- **FiveM Resources**: Alle 5 Minuten via Lua Script

## Anpassung

### Design ändern
- Bearbeite `styles.css` für das Aussehen
- Ändere Farben in den CSS-Variablen (`:root`)

### Inhalte ändern
- `index.html` - Hauptseite
- `scripts.json` - Script-Daten
- `script.js` - Funktionalität

### Neue Features hinzufügen
- Erstelle neue Sektionen in `index.html`
- Füge entsprechende Styles in `styles.css` hinzu
- Erweitere `script.js` für neue Funktionalität

## Struktur

```
JayModz/
├── index.html              # Hauptseite
├── styles.css              # Styling
├── script.js               # JavaScript Funktionalität
├── scripts.json            # Script-Daten
├── fivem-updater.lua       # FiveM Update-Checker
├── _config.yml             # Jekyll Konfiguration
├── .github/
│   └── workflows/
│       └── update-scripts.yml  # GitHub Actions
└── README.md               # Diese Datei
```

## Commands (FiveM)

- `/version` - Zeigt aktuelle Version
- `/updateinfo` - Zeigt verfügbare Versionen (Admin)

## Support

- Discord: [Dein Discord Server]
- GitHub: [Dein GitHub Profil]
- E-Mail: contact@jaymodz.com

## Lizenz

MIT License - Siehe LICENSE Datei für Details.
