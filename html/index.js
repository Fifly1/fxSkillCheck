let currentButton = '';
let isPressed = false;
let bounceCount = 0;
let maxBounces = 1;
let reverse = false;

function showContainer() {
    const container = document.getElementById('skill-check-container');
    container.classList.remove('hide');
    container.classList.add('show');
}

function hideContainer() {
    const container = document.getElementById('skill-check-container');
    container.classList.remove('show');
    container.classList.add('hide');
}

window.addEventListener('message', function(event) {
    const data = event.data;
    const container = document.getElementById('skill-check-container');
    const indicator = document.getElementById('indicator');
    const successZone = document.getElementById('success-zone');
    const buttonText = document.getElementById('button-text');

    if (data.action === 'showSkillCheck') {
        showContainer();
        successZone.style.left = Math.random() * (100 - data.areaSize) + '%';
        successZone.style.width = data.areaSize + '%';
        buttonText.innerHTML = `Press <span class="key">${data.button}</span>`;
        currentButton = data.button;
        isPressed = false;
        bounceCount = 0;
        maxBounces = data.bounces;
        reverse = false;
        indicator.style.left = '0%';

        let startTime = null;
        function animate(time) {
            if (!startTime) startTime = time;
            const elapsed = time - startTime;
            const speed = data.time;
            let percentage = (elapsed / speed) * 100;

            if (reverse) {
                percentage = 100 - percentage;
            }

            if (percentage > 100 || percentage < 0) {
                bounceCount++;
                if (bounceCount > maxBounces) {
                    container.classList.add('failure');
                    setTimeout(() => {
                        hideContainer();
                        container.classList.remove('failure');
                        fetch(`https://fx_skillcheck/skillCheckResult`, { 
                            method: 'POST', 
                            body: JSON.stringify({ result: false }) 
                        });
                    }, 500);
                    return;
                } else {
                    reverse = !reverse;
                    startTime = time;
                    return requestAnimationFrame(animate);
                }
            }

            const indicatorPosition = Math.max(Math.min(percentage * 0.96, 96), 0);
            indicator.style.left = `${indicatorPosition}%`;

            if (!isPressed) {
                requestAnimationFrame(animate);
            }
        }

        requestAnimationFrame(animate);

        window.addEventListener('keydown', function(event) {
            if (!isPressed) {
                isPressed = true;

                const successZoneRect = successZone.getBoundingClientRect();
                const indicatorRect = indicator.getBoundingClientRect();
                if (event.key.toUpperCase() === currentButton && 
                    indicatorRect.left >= successZoneRect.left &&
                    indicatorRect.right <= successZoneRect.right) {
                    container.classList.add('success');
                    setTimeout(() => {
                        hideContainer();
                        container.classList.remove('success');
                        fetch(`https://fx_skillcheck/skillCheckResult`, { 
                            method: 'POST', 
                            body: JSON.stringify({ result: true }) 
                        });
                    }, 500);
                } else {
                    container.classList.add('failure');
                    setTimeout(() => {
                        hideContainer();
                        container.classList.remove('failure');
                        fetch(`https://fx_skillcheck/skillCheckResult`, { 
                            method: 'POST', 
                            body: JSON.stringify({ result: false }) 
                        });
                    }, 500);
                }
            }
        }, { once: true });
    }

    if (data.action === 'playSound') {
        document.getElementById(data.sound).play();
    }
});