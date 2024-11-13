window.onload = () => {
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const offset = 250;
        const minOpacity = 0.2;

        document.querySelectorAll('.timeline-div').forEach((element) => {
        const elementTop = element.getBoundingClientRect().top + scrollTop;
        const elementHeight = element.offsetHeight;

        // Calculate when the element starts to enter and fully leaves the viewport
        if (scrollTop + window.innerHeight > elementTop) {
            // Calculate how much of the element has been scrolled past by the offset threshold
            const distanceScrolled = scrollTop + window.innerHeight - elementTop;
            const adjustedScroll = Math.max(0, distanceScrolled - offset);

            // Calculate opacity based on how far past the offset the user has scrolled
            const visibilityRatio = adjustedScroll / (elementHeight + offset);
            const newOpacity = Math.min(1, minOpacity + visibilityRatio * (1 - minOpacity));

            element.style.opacity = newOpacity;

        } else {
            element.style.opacity = minOpacity; // Element is not visible yet
        }
        });
    });

    const projectsSection = document.querySelector('.projects'),
        carousel = document.querySelector('.projects__carousel')
    ;
    let isInView = false,
        isCarouselScrolling = false
    ;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                isInView = true;
            } else {
                isInView = false;
                document.body.style.overflowY = 'auto'; // unlock vertical scroll
                isCarouselScrolling = false;
            }
        });
    }, { threshold: 0.5 });

    observer.observe(projectsSection);

    window.addEventListener('wheel', (e) => {
        if (isInView) {
            const projectsClientRect = projectsSection.getBoundingClientRect(),
                projectsTop = projectsClientRect.top,
                projectsBottom = projectsClientRect.bottom
            ;

            if ((e.deltaY > 0 && projectsBottom < window.innerHeight) ||
                e.deltaY < 0 && projectsTop > 0 && projectsTop < window.innerHeight ||
                isCarouselScrolling
            ) {
                // user has entered the scrolling window or is already scrolling
                document.body.style.overflowY = 'hidden'; // lock vertical scroll
                carousel.scrollLeft += e.deltaY; // apply vertical scroll to horizontal scroll
                isCarouselScrolling = true;

                const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
                if (carousel.scrollLeft >= maxScrollLeft || carousel.scrollLeft <= 0) {
                    document.body.style.overflowY = 'auto'; // unlock vertical scroll when done
                    isCarouselScrolling = false;
                }
            }
        }
    });
}
