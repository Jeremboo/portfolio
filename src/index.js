const projectPart =  document.getElementById('projects-part');
const aboutPart = document.getElementById('about-part');

function toggle() {
  projectPart.classList.toggle('_hidden');
  aboutPart.classList.toggle('_hidden');
}
document.getElementById('about-button').addEventListener('click', toggle);
toggle();