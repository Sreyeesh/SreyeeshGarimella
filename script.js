document.addEventListener("DOMContentLoaded", function () {
    fetch('config.json')
        .then(response => response.json())
        .then(resumeData => {
            // Populate profile picture
            document.getElementById('profile-picture').src = resumeData.profilePicture;

            // Populate contact information
            const contactInfoElement = document.getElementById('contact-info');
            Object.keys(resumeData.contact).forEach(key => {
                const p = document.createElement('p');
                p.innerHTML = `<i class="fas fa-${key}"></i> ${resumeData.contact[key]}`;
                contactInfoElement.appendChild(p);
            });

            // Populate name and title
            document.getElementById('name').textContent = resumeData.name;
            document.getElementById('title').textContent = resumeData.title;

            // Populate bio text
            const bioElement = document.querySelector('.header');
            const bioTextElement = document.createElement('p');
            bioTextElement.className = 'bio';
            bioTextElement.textContent = resumeData.bio;
            bioElement.appendChild(bioTextElement);

            // Populate skills, education, experience, languages
            populateList('skills-list', resumeData.skills);
            populateEducation('education-list', resumeData.education);
            populateList('languages-list', resumeData.languages);
            populateExperience('experience-list', resumeData.experience);
        })
        .catch(error => {
            console.error('Could not load the resume data:', error);
        });

    function populateList(listId, items) {
        const listElement = document.getElementById(listId);
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            listElement.appendChild(li);
        });
    }

    function populateEducation(listId, educationEntries) {
        const listElement = document.getElementById(listId);
        educationEntries.forEach(entry => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${entry.degree}</strong> - ${entry.institution}, ${entry.year}`;
            listElement.appendChild(li);
        });
    }

    function populateExperience(listId, experienceEntries) {
        const listElement = document.getElementById(listId);
        experienceEntries.forEach(entry => {
            const div = document.createElement('div');
            div.className = 'job';
            div.innerHTML = `
                <h3>${entry.title}</h3>
                <p class="company">${entry.company}</p>
                <p class="years">${entry.years}</p>
                <ul>${entry.details.map(detail => `<li>${detail}</li>`).join('')}</ul>`;
            listElement.appendChild(div);

            // Add the horizontal rule below each job entry
            const hr = document.createElement('hr');
            listElement.appendChild(hr);
        });
    }
});
