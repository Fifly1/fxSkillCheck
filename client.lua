local function playSound(success)
    local sound = success and "success_sound" or "failure_sound"
    SendNUIMessage({
        action = "playSound",
        sound = sound
    })
end

local function showSkillCheck(difficulty, buttons)
    local difficultySettings = {
        easy = { rounds = math.random(3, 5), speed = 2000, areaSize = 25, bounces = 1 },
        medium = { rounds = math.random(4, 7), speed = 1000, areaSize = 15, bounces = 2 },
        hard = { rounds = math.random(5, 9), speed = 500, areaSize = 10, bounces = 3 }
    }

    local settings = difficultySettings[difficulty]

    local success = true
    for i = 1, settings.rounds do
        local button = buttons[math.random(#buttons)]

        SetNuiFocus(true, true)
        SendNUIMessage({
            action = "showSkillCheck",
            time = settings.speed,
            difficulty = difficulty,
            round = i,
            button = button,
            areaSize = settings.areaSize,
            bounces = settings.bounces
        })

        local received = false
        local successRound = nil

        RegisterNUICallback("skillCheckResult", function(data, cb)
            successRound = data.result
            received = true
            cb("ok")
        end)

        while not received do
            Citizen.Wait(100)
        end

        if not successRound then
            success = false
            break
        end
    end

    playSound(success)
    SetNuiFocus(false, false)
    return success
end

exports("startSkillCheck", function(difficulty, buttons)
    return showSkillCheck(difficulty, buttons)
end)
