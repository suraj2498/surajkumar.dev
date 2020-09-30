const sections = [document.getElementById('about'),
                  document.getElementById('experience'),
                  document.getElementById('projects'),
                  document.getElementById('skills'),
                  document.getElementById('education'),
                  document.getElementById('contact')];

const options = {
    rootMargin: `-${(window.innerHeight / 2)-35}px 0px -${(window.innerHeight / 2)-35}px 0px`
}

const sectionObserver = new IntersectionObserver((entries, sectionObserver) => {

    entries.forEach(entry => {
        if(entry.isIntersecting){
            document.getElementById(`${entry.target.id}-link`).classList.add('active');
        } else {
            document.getElementById(`${entry.target.id}-link`).classList.remove('active');
        }
    })
}, options);

sections.forEach(section => {
    sectionObserver.observe(section);
});


const smoothScroll = (element, duration) => {
    let target = document.querySelector(element);
    let targetPosition = target.getBoundingClientRect().top;
    console.log(window.innerHeight, targetPosition);
    let startPosition = window.pageYOffset;
    let distance = targetPosition;
    let startTime = null;
    const animation = (currentTime) => {
        if(startTime === null) startTime = currentTime;
        let tiemElapsed = currentTime - startTime;
        let run = ease(tiemElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if(tiemElapsed < duration) requestAnimationFrame(animation);
    }

    const ease = (t, b, c ,d) => {
        t /= d / 2;
        if(t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    requestAnimationFrame(animation)
}

document.querySelectorAll('#mainNav a').forEach((tab) => {
    tab.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScroll(`${tab.getAttribute('href')}-head`, 1000);
    })
})

