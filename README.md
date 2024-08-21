![fxskillcheck_thumbnail](https://github.com/user-attachments/assets/e5a87f99-420d-477b-8f53-7b141c29f237)

**|Preview|** 
Click [here]() to see a preview

**|Information|** 
A skill check system that adds interactive challenges with customizable difficulty levels and control settings.

**Settings:**

* `difficulty (string)`: Choose between 'easy', 'medium', 'hard', or define custom difficulties.
* `rounds (number)`: The number of rounds the player must complete.
* `speed (number)`: Speed of the skill check indicator.
* `areaSize (number)`: Size of the success area in degrees.
* `bounces (number)`: Number of indicator bounces during the check.
* `buttons (table)`: List of keys that can be pressed during the skill check.

**|How to use|**
Trigger this export: `exports['fx_skillcheck']:startSkillCheck()` It can be used anywhere, in any script.

Example usage:

```
local success = exports['fx_skillcheck']:startSkillCheck('medium', {'E', 'Q', 'R', 'F'})
if success then
    print('Skill check passed!')
else
    print('Skill check failed.')
end
```

**|Download (FREE)|**
Get this resource on [Tebex]() or [GitHub]()
