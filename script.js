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
