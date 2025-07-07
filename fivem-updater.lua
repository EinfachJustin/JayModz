-- FiveM Auto-Update Checker
-- Füge diese Datei in deine FiveM Resources ein

local resourceName = GetCurrentResourceName()
local currentVersion = "1.0.0" -- Ändere dies zur aktuellen Version deiner Resource

-- Konfiguration
local config = {
    githubUsername = "dein-username", -- Dein GitHub Username
    checkInterval = 300000, -- 5 Minuten in Millisekunden
    showNotifications = true,
    autoDownloadInfo = true
}

-- Update Checker
function checkForUpdates()
    local url = string.format("https://api.github.com/repos/%s/%s/releases/latest", config.githubUsername, resourceName)
    
    PerformHttpRequest(url, function(statusCode, response)
        if statusCode == 200 then
            local success, data = pcall(json.decode, response)
            
            if success and data then
                local latestVersion = data.tag_name and data.tag_name:gsub("v", "") or "unknown"
                
                if latestVersion ~= currentVersion and latestVersion ~= "unknown" then
                    -- Neue Version verfügbar
                    print("^3[" .. resourceName .. "] ^7Neue Version verfügbar!")
                    print("^3[" .. resourceName .. "] ^7Aktuell: ^1" .. currentVersion .. "^7 | Neueste: ^2" .. latestVersion)
                    print("^3[" .. resourceName .. "] ^7Download: ^4" .. data.html_url)
                    
                    if config.showNotifications then
                        TriggerClientEvent('chat:addMessage', -1, {
                            color = {255, 165, 0},
                            multiline = true,
                            args = {"[Update]", resourceName .. " v" .. latestVersion .. " ist verfügbar!"}
                        })
                    end
                    
                    -- Sende Update-Info an alle Admins
                    local players = GetPlayers()
                    for _, playerId in ipairs(players) do
                        if IsPlayerAceAllowed(playerId, "command.refresh") then
                            TriggerClientEvent('chat:addMessage', playerId, {
                                color = {0, 255, 0},
                                multiline = true,
                                args = {"[Admin Update]", resourceName .. " Update verfügbar: " .. data.html_url}
                            })
                        end
                    end
                else
                    print("^3[" .. resourceName .. "] ^7Du verwendest die neueste Version! (v" .. currentVersion .. ")")
                end
            else
                print("^1[" .. resourceName .. "] ^7Fehler beim Parsen der API-Antwort")
            end
        else
            print("^1[" .. resourceName .. "] ^7Fehler beim Abrufen der Update-Informationen (Status: " .. statusCode .. ")")
        end
    end, "GET", "", {["Content-Type"] = "application/json"})
end

-- Version Info Command
RegisterCommand("version", function(source, args)
    local playerId = source
    
    if playerId == 0 then
        -- Server Console
        print("^3[" .. resourceName .. "] ^7Aktuelle Version: ^2" .. currentVersion)
        checkForUpdates()
    else
        -- Player
        TriggerClientEvent('chat:addMessage', playerId, {
            color = {100, 200, 255},
            args = {"[Version]", resourceName .. " v" .. currentVersion}
        })
        
        if IsPlayerAceAllowed(playerId, "command.refresh") then
            checkForUpdates()
        end
    end
end)

-- Auto-Update Check beim Start
CreateThread(function()
    Wait(10000) -- Warte 10 Sekunden nach dem Start
    checkForUpdates()
    
    -- Regelmäßige Überprüfung
    while true do
        Wait(config.checkInterval)
        checkForUpdates()
    end
end)

-- Export für andere Resources
exports('getCurrentVersion', function()
    return currentVersion
end)

exports('checkForUpdates', function()
    checkForUpdates()
end)

-- Erweiterte Update-Informationen
function getUpdateInfo()
    local url = string.format("https://api.github.com/repos/%s/%s/releases", config.githubUsername, resourceName)
    
    PerformHttpRequest(url, function(statusCode, response)
        if statusCode == 200 then
            local success, data = pcall(json.decode, response)
            
            if success and data and #data > 0 then
                print("^3[" .. resourceName .. "] ^7Verfügbare Versionen:")
                for i = 1, math.min(5, #data) do
                    local release = data[i]
                    local version = release.tag_name:gsub("v", "")
                    local date = release.published_at:sub(1, 10)
                    print("^3[" .. resourceName .. "] ^7" .. version .. " (" .. date .. ")")
                end
            end
        end
    end, "GET", "", {["Content-Type"] = "application/json"})
end

-- Admin Command für Update-Infos
RegisterCommand("updateinfo", function(source, args)
    local playerId = source
    
    if playerId == 0 or IsPlayerAceAllowed(playerId, "command.refresh") then
        getUpdateInfo()
    end
end, true)

print("^2[" .. resourceName .. "] ^7Auto-Update Checker geladen! Version: " .. currentVersion)
