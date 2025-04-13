let observer = new IntersectionObserver( 
  ([entry]) => {
    document.getElementById("name").style.color = entry.isIntersecting ? "#fffff5ff" : "black";
  },
  { threshold: 0.4 } // Trigger when 20% of sec2 is in view
);

const projects = document.querySelectorAll(".project");
const timelineItems = document.querySelectorAll(".timeline li");

let isScrolling = false; // Prevent multiple triggers during scroll

function updateSelection() {
    if (isScrolling) return; // Don't update while scrolling

    console.log("Updating selection..."); // Debugging line to check if it's being triggered
    let closestProject = null;
    let minDistance = Infinity;

    projects.forEach((project, index) => {
        const rect = project.getBoundingClientRect();
        const distance = Math.abs(rect.top - window.innerHeight / 2);

        if (distance < minDistance) {
            minDistance = distance;
            closestProject = project;
        }
    });

    if (closestProject) {
        // Deselect all projects and timeline items
        projects.forEach((p) => p.classList.remove("selected"));
        timelineItems.forEach((t) => t.classList.remove("active"));

        // Select the closest project and corresponding timeline item
        closestProject.classList.add("selected");
        const index = closestProject.dataset.index;
        timelineItems[index].classList.add("active");
    }
}

// Scroll event listener to update selection
try {
  document.querySelector('.portfolio').addEventListener('scroll', updateSelection, { passive: true });
} catch {
  console.log("a");
}
window.addEventListener("scroll", updateSelection, { passive: true });  // Ensuring scroll is triggering the updateSelection function
updateSelection(); // Initial check

// Function to scroll to a specific project and highlight it
function scrollToProject(projectIndex) {
  const targetProject = projects[projectIndex];
  if (targetProject) {
    // Prevent scroll events from interfering while scrolling
    isScrolling = true;

    targetProject.scrollIntoView({
      behavior: 'smooth',
      block: 'center', // Scroll to the center of the viewport
      inline: 'center'
    });

    // After scrolling finishes, apply the selected class with a slight delay
    setTimeout(() => {
      // Deselect all projects and timeline items
      projects.forEach((p) => p.classList.remove("selected"));
      timelineItems.forEach((t) => t.classList.remove("active"));

      // Select the corresponding project and timeline item
      targetProject.classList.add("selected");
      timelineItems[projectIndex].classList.add("active");

      // Re-enable scroll event handling after a delay
      setTimeout(() => {
        isScrolling = false;
      }, 500); // Wait for scroll animation to complete before re-enabling
    }, 500); // Match this delay with the duration of the scroll animation
  }
}

// Adding event listeners to each timeline item for clicks
timelineItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    scrollToProject(index);
  });
});

function toggleNav() {
  console.log('toggleNav');
  let sidenav = document.getElementById("mySidenav");
  let menuIcon = document.querySelector(".menu-icon");

  if (sidenav.style.width === "250px") {
    sidenav.style.width = "0";
    document.body.style.backgroundColor = "white";
    menuIcon.classList.remove("open");
  } else {
    sidenav.style.width = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    menuIcon.classList.add("open");
  }
}

// Intersection Observer for section 2 (sec2)
try {
  observer.observe(document.getElementById("sec2"));
} catch {
  console.log("b");
}


const slider = document.getElementById('mode-slider');
const htmlElement = document.documentElement; // This is the <html> element

// Function to load the saved theme from localStorage
function loadTheme() {
    const savedMode = localStorage.getItem('theme'); // Get saved theme from localStorage
    if (savedMode) {
        htmlElement.classList.add(savedMode);
        slider.value = savedMode === 'dark-mode' ? 1 : 0;
    } else {
        // Default to light mode if no saved theme exists
        htmlElement.classList.add('light-mode');
        slider.value = 0;
    }
}
window.addEventListener('scroll', function () {
  const sec2 = document.querySelector('#sec2');
  const text = document.querySelector('#belowText');
  const sec2Top = sec2.getBoundingClientRect().top;

  if (sec2Top < window.innerHeight * 0.75) {
    text.classList.add('visible');
  } else {
    text.classList.remove('visible');
  }
});

window.addEventListener("scroll", function () {
  const scrollTop = window.pageYOffset;
  const layers = document.querySelectorAll(".parallax-layer");

  layers.forEach((layer, index) => {
    const speed = (index + 1) * -0.1; // change multiplier for stronger effect
    layer.style.transform = `translateY(${scrollTop * speed}px)`;
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  console.log("js");

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log("subm");
    const formData = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value
    };

    try {
      const res = await fetch('/send_email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await res.json();
      if (result.success) {
        alert("Message sent successfully!");
        form.reset();
      } else {
        alert("Something went wrong: " + result.error);
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  });
});
