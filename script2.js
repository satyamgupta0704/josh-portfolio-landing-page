// document.addEventListener('DOMContentLoaded', function() {
//     const addSkillBtn = document.getElementById('addSkillBtn');
//     const addSkillModal = document.getElementById('addSkillModal');
//     const addSkillForm = document.getElementById('addSkillForm');
//     const cancelAddSkill = document.getElementById('cancelAddSkill');
//     const skillDisplay = document.querySelector('.skills-row-2'); 

//     if (addSkillBtn) {
//         addSkillBtn.addEventListener('click', function() {
//             addSkillModal.style.display = 'block';
//         });
//     }

//     if (cancelAddSkill) {
//         cancelAddSkill.addEventListener('click', function() {
//             addSkillModal.style.display = 'none';
//         });
//     }

//     // if (addSkillForm) {
//     //     addSkillForm.addEventListener('submit', function(e) {
//     //         e.preventDefault();
//     //         const formData = new FormData(addSkillForm);
//     //         console.log(Object.fromEntries(formData));
//     //         addSkillModal.style.display = 'none';
//     //     });
//     // }
//     if (addSkillForm) {
//         addSkillForm.addEventListener('submit', function(e) {
//             e.preventDefault();

//             const formData = new FormData(addSkillForm);
//             const domain = formData.get('domain');
//             const skills = [];
//             let hasValidSkill = false;
//             for (let i = 1; i <= 4; i++) {
//                 const skillName = formData.get(`skill${i}`);
//                 const proficiency = formData.get(`proficiency${i}`);

//                 if (skillName && proficiency) {
//                     skills.push({ name: skillName, proficiency: proficiency + '%' });
//                     if (skillName !== '' && proficiency > 0) {
//                         hasValidSkill = true;
//                     }
//                 }
//             }

//             if (!hasValidSkill) {
//                 alert("Please add at least one valid skill with proficiency.");
//                 return;
//             }
//             addSkillModal.style.display = 'none';
//             const newSkillSection = document.createElement('div');
//             newSkillSection.classList.add('skill');
//             let skillHTML = `
//                 <div class="skills-5">
//                     <div class="text-wrapper-12">${domain}</div>
//             `;

//             skills.forEach(skill => {
//                 skillHTML += `
//                     <div class="html">
//                         <div class="text-wrapper-7">${skill.name}</div>
//                         <div class="text-wrapper-6">${skill.proficiency}</div>
//                     </div>
//                     <div class="line">
//                         <div class="overlap-group"><div class="rectangle"></div></div>
//                     </div>
//                 `;
//             });

//             skillHTML += '</div>';
//             newSkillSection.innerHTML = skillHTML;
//             skillDisplay.appendChild(newSkillSection);
//             addSkillForm.reset();
//         });
//     }
// });

document.addEventListener('DOMContentLoaded', function() {
    const addSkillBtn = document.getElementById('addSkillBtn');
    const addSkillModal = document.getElementById('addSkillModal');
    const addSkillForm = document.getElementById('addSkillForm');
    const cancelAddSkill = document.getElementById('cancelAddSkill');
    const skillDisplay = document.querySelector('.skills-container'); // Container where new skills will be added

    if (addSkillBtn) {
        addSkillBtn.addEventListener('click', function() {
            addSkillModal.style.display = 'block'; // Show modal when "Add Skill" is clicked
        });
    }

    if (cancelAddSkill) {
        cancelAddSkill.addEventListener('click', function() {
            addSkillModal.style.display = 'none'; // Close modal when cancel is clicked
        });
    }

    if (addSkillForm) {
        addSkillForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent form submission from reloading the page
            
            const formData = new FormData(addSkillForm);
            const domain = formData.get('domain'); // Get the domain entered by the user
            const skills = [];
            let hasValidSkill = false;

            // Loop through the skills and proficiency fields (assuming there are 4)
            for (let i = 1; i <= 4; i++) {
                const skillName = formData.get(`skill${i}`);
                const proficiency = formData.get(`proficiency${i}`);

                // Only add valid skills (those with names and proficiency > 0)
                if (skillName && proficiency) {
                    skills.push({ name: skillName, proficiency: proficiency + '%' });
                    if (skillName !== '' && proficiency > 0) {
                        hasValidSkill = true;
                    }
                }
            }

            // Check if at least one valid skill is added
            if (!hasValidSkill) {
                alert("Please add at least one valid skill with proficiency.");
                return; // Stop execution if no valid skill
            }

            // Hide modal after validation
            addSkillModal.style.display = 'none';

            // Create new skill section (HTML structure) to append
            const newSkillSection = document.createElement('div');
            newSkillSection.classList.add('skill'); // Add class to the new skill section

            // Create HTML for the new skills added under the domain
            let skillHTML = `
                <div class="skills-1">
                    <div class="skill-domain">${domain}</div>
            `;

            // Loop through each added skill and create its corresponding HTML
            skills.forEach(skill => {
                skillHTML += `
                    <div class='each-skill-wrapper'>
                        <div class="each-skill">
                            <div class="skill-name">${skill.name}</div>
                            <div class="skill-prof">${skill.proficiency}</div>
                        </div>
                        <div class="progress-bar">
                            <div class="filled-bar" style="width: ${skill.proficiency};"></div> <!-- Adjust width based on proficiency -->
                        </div>
                    </div>
                `;
            });

            skillHTML += '</div>';
            newSkillSection.innerHTML = skillHTML; // Set the HTML content of the new skill section

            // Append the new skill section to the container (at the end)
            skillDisplay.appendChild(newSkillSection);

            // Reset the form after adding the skill
            addSkillForm.reset();
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const items = carousel.querySelectorAll('.carousel-item');
    const navs = document.querySelectorAll('.navs .ellipse, .navs .ellipse-2, .navs .ellipse-3, .navs .ellipse-4, .navs .ellipse-5');

    let currentIndex = 2;

    function updateCarousel() {
        const itemWidth = items[0].offsetWidth + 20; // Width + margin
        carousel.scrollTo({
            left: currentIndex * itemWidth,
            behavior: 'smooth'
        });

        navs.forEach((nav, index) => {
            if (index === currentIndex) {
                nav.classList.add('active');
            } else {
                nav.classList.remove('active');
            }
        });
    }

    navs.forEach((nav, index) => {
        nav.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });

    updateCarousel();

    // Update on scroll
    carousel.addEventListener('scroll', () => {
        const itemWidth = items[0].offsetWidth + 20;
        currentIndex = Math.round(carousel.scrollLeft / itemWidth);
        navs.forEach((nav, index) => {
            if (index === currentIndex) {
                nav.classList.add('active');
            } else {
                nav.classList.remove('active');
            }
        });
    });
});