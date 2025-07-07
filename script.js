// Configuration
const CONFIG = {
    GITHUB_USERNAME: 'EinfachJustin', // Ändere dies zu deinem GitHub Username
    GITHUB_REPO: 'JayModz', // Ändere dies zu deinem Repository Name
    UPDATE_INTERVAL: 300000, // 5 Minuten in Millisekunden
    VERSION_CHECK_URL: 'https://api.github.com/repos/{username}/{repo}/releases/latest'
};

// Script Data Structure
let scriptsData = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadScripts();
    loadUpdates();
    setupEventListeners();
    startUpdateChecker();
});

function initializeApp() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Update stats
    updateStats();
}

function loadScripts() {
    // Demo scripts - ersetze dies mit deinen echten Scripts
    scriptsData = [
        {
            id: 'advanced-banking',
            name: 'Advanced Banking System',
            version: '2.1.0',
            description: 'Ein vollständiges Banking-System mit ATMs, Überweisungen und mehr.',
            features: [
                'Realistische ATM Interaktionen',
                'Überweisungen zwischen Spielern',
                'Transaktionshistorie',
                'Admin Panel Integration',
                'Vollständig konfigurierbar'
            ],
      "downloadUrl": "https://github.com/EinfachJustin/j_vehiclescrapping/releases/latest",
      "githubUrl": "https://github.com/EinfachJustin/j_vehiclescrapping",
            lastUpdate: '2024-01-15',
            downloads: 1234
        },
        {
            id: 'vehicle-dealer',
            name: 'Vehicle Dealer Pro',
            version: '1.8.5',
            description: 'Professioneller Fahrzeughändler mit Test-Fahrten und Finanzierung.',
            features: [
                'Interaktive Showrooms',
                'Test-Fahrten System',
                'Finanzierung & Leasing',
                'Individualisierung',
                'Multi-Händler Support'
            ],
            downloadUrl: 'https://github.com/username/vehicle-dealer/releases/latest',
            githubUrl: 'https://github.com/username/vehicle-dealer',
            lastUpdate: '2024-01-10',
            downloads: 892
        },
        {
            id: 'job-system',
            name: 'Ultimate Job System',
            version: '3.0.2',
            description: 'Umfassendes Job-System mit verschiedenen Berufen und Belohnungen.',
            features: [
                '15+ verschiedene Jobs',
                'Skill-basierte Belohnungen',
                'Dynamische Missionen',
                'Ranglisten System',
                'Vollständig anpassbar'
            ],
            downloadUrl: 'https://github.com/username/job-system/releases/latest',
            githubUrl: 'https://github.com/username/job-system',
            lastUpdate: '2024-01-12',
            downloads: 2156
        }
    ];

    renderScripts();
}

function renderScripts() {
    const scriptsGrid = document.getElementById('scriptsGrid');
    scriptsGrid.innerHTML = '';

    scriptsData.forEach(script => {
        const scriptCard = createScriptCard(script);
        scriptsGrid.appendChild(scriptCard);
    });
}

function createScriptCard(script) {
    const card = document.createElement('div');
    card.className = 'script-card';
    card.innerHTML = `
        <div class="script-header">
            <h3 class="script-title">${script.name}</h3>
            <span class="script-version">v${script.version}</span>
        </div>
        <p class="script-description">${script.description}</p>
        <ul class="script-features">
            ${script.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
        <div class="script-actions">
            <a href="${script.downloadUrl}" class="btn btn-primary" target="_blank">
                <i class="fas fa-download"></i>
                Download
            </a>
            <a href="${script.githubUrl}" class="btn btn-secondary" target="_blank">
                <i class="fab fa-github"></i>
                GitHub
            </a>
        </div>
    `;
    return card;
}

function loadUpdates() {
    const updates = [
        {
            date: '2024-01-15',
            title: 'Advanced Banking System v2.1.0',
            description: 'Neue ATM Animationen und Bug-Fixes für bessere Performance.'
        },
        {
            date: '2024-01-12',
            title: 'Ultimate Job System v3.0.2',
            description: 'Hotfix für Missionen-Bug und neue Konfigurationsoptionen.'
        },
        {
            date: '2024-01-10',
            title: 'Vehicle Dealer Pro v1.8.5',
            description: 'Neue Fahrzeug-Kategorien und verbesserte UI/UX.'
        }
    ];

    renderUpdates(updates);
}

function renderUpdates(updates) {
    const updatesList = document.getElementById('updatesList');
    updatesList.innerHTML = '';

    updates.forEach(update => {
        const updateItem = createUpdateItem(update);
        updatesList.appendChild(updateItem);
    });
}

function createUpdateItem(update) {
    const item = document.createElement('div');
    item.className = 'update-item';
    item.innerHTML = `
        <div class="update-date">${formatDate(update.date)}</div>
        <div class="update-content">
            <h3 class="update-title">${update.title}</h3>
            <p class="update-description">${update.description}</p>
        </div>
    `;
    return item;
}

function updateStats() {
    const scriptCount = scriptsData.length;
    const totalDownloads = scriptsData.reduce((sum, script) => sum + script.downloads, 0);
    const lastUpdate = getLatestUpdateDate();

    document.getElementById('scriptCount').textContent = scriptCount;
    document.getElementById('downloadCount').textContent = totalDownloads.toLocaleString();
    document.getElementById('lastUpdate').textContent = formatDate(lastUpdate);
}

function getLatestUpdateDate() {
    const dates = scriptsData.map(script => new Date(script.lastUpdate));
    return new Date(Math.max(...dates)).toISOString().split('T')[0];
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function setupEventListeners() {
    // Add any additional event listeners here
    window.addEventListener('scroll', handleScroll);
}

function handleScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(15, 23, 42, 0.98)';
    } else {
        header.style.background = 'rgba(15, 23, 42, 0.95)';
    }
}

// Auto-Update Checker
function startUpdateChecker() {
    setInterval(checkForUpdates, CONFIG.UPDATE_INTERVAL);
}

async function checkForUpdates() {
    try {
        for (const script of scriptsData) {
            const latestVersion = await getLatestVersion(script.id);
            if (latestVersion && latestVersion !== script.version) {
                script.version = latestVersion;
                showUpdateNotification(script);
            }
        }
        renderScripts();
        updateStats();
    } catch (error) {
        console.error('Fehler beim Prüfen auf Updates:', error);
    }
}

async function getLatestVersion(scriptId) {
    try {
        const url = CONFIG.VERSION_CHECK_URL
            .replace('{username}', CONFIG.GITHUB_USERNAME)
            .replace('{repo}', scriptId);
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('API request failed');
        
        const data = await response.json();
        return data.tag_name?.replace('v', '');
    } catch (error) {
        console.error(`Fehler beim Abrufen der Version für ${scriptId}:`, error);
        return null;
    }
}

function showUpdateNotification(script) {
    // Erstelle eine Benachrichtigung für Updates
    const notification = document.createElement('div');
    notification.className = 'update-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-bell"></i>
            <span>Neues Update verfügbar: ${script.name} v${script.version}</span>
            <button onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Entferne die Benachrichtigung nach 5 Sekunden
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Version Checker für FiveM Resources
function createVersionChecker() {
    return `
-- Auto-Update Checker für FiveM Resources
-- Füge dies in deine Resource ein

local resourceName = GetCurrentResourceName()
local currentVersion = "1.0.0" -- Deine aktuelle Version

function checkForUpdates()
    PerformHttpRequest("https://api.github.com/repos/${CONFIG.GITHUB_USERNAME}/" .. resourceName .. "/releases/latest", function(statusCode, response)
        if statusCode == 200 then
            local data = json.decode(response)
            local latestVersion = data.tag_name:gsub("v", "")
            
            if latestVersion ~= currentVersion then
                print("^3[" .. resourceName .. "] ^7Neue Version verfügbar: ^2" .. latestVersion .. "^7 (Aktuell: ^1" .. currentVersion .. "^7)")
                print("^3[" .. resourceName .. "] ^7Download: ^4" .. data.html_url)
            else
                print("^3[" .. resourceName .. "] ^7Du verwendest die neueste Version!")
            end
        end
    end, "GET", "", {["Content-Type"] = "application/json"})
end

-- Prüfe beim Start der Resource
CreateThread(function()
    Wait(5000) -- Warte 5 Sekunden nach dem Start
    checkForUpdates()
end)
    `;
}

// Export für FiveM Integration
window.FiveMIntegration = {
    getVersionChecker: createVersionChecker,
    checkForUpdates: checkForUpdates
};
