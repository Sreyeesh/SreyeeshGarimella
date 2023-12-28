document.addEventListener("DOMContentLoaded", function () {
    fetch('config.json')
        .then(response => response.json())
        .then(resumeData => {
            // Populate profile picture
            if (resumeData.profilePicture) {
                document.getElementById('profile-picture').src = resumeData.profilePicture;
            }

            // Populate contact information with the GitHub and LinkedIn links as text
            const contactInfoElement = document.getElementById('contact-info');
            Object.keys(resumeData.contact).forEach(key => {
                const p = document.createElement('p');
                let iconHtml = '';
                let valueHtml = '';
                if (key === 'phone') {
                    iconHtml = '<i class="fas fa-phone"></i>';
                    valueHtml = resumeData.contact[key];
                } else if (key === 'envelope') {
                    iconHtml = '<i class="fas fa-envelope"></i>';
                    valueHtml = `<a href="mailto:${resumeData.contact[key]}" class="contact-link">${resumeData.contact[key]}</a>`;
                } else if (key === 'github') {
                    iconHtml = `<i class="${resumeData.contact.github.icon}"></i>`;
                    valueHtml = `<a href="${resumeData.contact.github.link}" target="_blank" class="contact-link">${resumeData.contact.github.link}</a>`;
                } else if (key === 'linkedin') {
                    iconHtml = `<i class="${resumeData.contact.linkedinIcon}"></i>`;
                    valueHtml = `<a href="${resumeData.contact.linkedin}" target="_blank" class="contact-link">${resumeData.contact.linkedin}</a>`;
                }
                p.innerHTML = `${iconHtml} ${valueHtml}`;
                contactInfoElement.appendChild(p);
            });

            // Populate name and title
            document.getElementById('name').textContent = resumeData.name;
            document.getElementById('title').textContent = resumeData.title;

            // Populate bio text
            const bioElement = document.createElement('p');
            bioElement.className = 'bio';
            bioElement.textContent = resumeData.bio;
            document.querySelector('.header').appendChild(bioElement);

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
                <h4>${entry.title}</h4>
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
