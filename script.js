document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu functionality
    var hamburger = document.querySelector('#navbar .hamburger');
    var menuItems = document.querySelectorAll('#navbar a');

    // Function to show/hide menu items
    function toggleMenuItems(displayStyle) {
        menuItems.forEach(function(item) {
            item.style.display = displayStyle;
        });
    }

    // Toggle display of menu items on hamburger click
    hamburger.addEventListener('click', function() {
        menuItems.forEach(function(item) {
            item.style.display = item.style.display === 'block' ? 'none' : 'block';
        });
    });

    // Adjust menu visibility based on window width
    function adjustMenuForWindowSize() {
        if (window.innerWidth > 768) {
            toggleMenuItems('block'); // Show menu items in full page view
        } else {
            toggleMenuItems('none'); // Hide menu items in mobile view
        }
    }

    window.addEventListener('resize', adjustMenuForWindowSize);
    adjustMenuForWindowSize(); // Initial adjustment on page load

    // Fetching and displaying projects and skills
    fetch('contents.json')
        .then(response => response.json())
        .then(data => {
            const projectsContainer = document.getElementById('projects-container');
            if (projectsContainer && data.projects) {
                data.projects.forEach(project => {
                    const projectElement = document.createElement('div');
                    projectElement.className = 'project-tile';
                    projectElement.innerHTML = `
                        <img src="${project.image}" alt="${project.title}">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <a href="${project.link}" target="_blank">View Project</a>
                    `;
                    projectsContainer.appendChild(projectElement);
                });
            }

            // Dynamically load the Skills section with Font Awesome icons
            const skillsContainer = document.getElementById('skills-container');
            if (skillsContainer && data.skills) {
                data.skills.forEach(skill => {
                    const skillElement = document.createElement('div');
                    skillElement.className = 'skill-item';

                    const iconElement = document.createElement('i');
                    iconElement.className = skill.iconClass; // Font Awesome class

                    const skillName = document.createTextNode(` ${skill.name}`);
                    
                    skillElement.appendChild(iconElement);
                    skillElement.appendChild(skillName);
                    skillsContainer.appendChild(skillElement);
                });
            }
        })
        .catch(error => {
            console.error('Error loading content:', error);
        });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

