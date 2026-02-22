// main.js — demonstrates variables, operators, conditions, loops, functions, events, classes/objects

// --- Classes and Objects ---
class Attraction {
  constructor(name, city, img, description, rating){
    this.name = name;
    this.city = city;
    this.img = img;
    this.description = description;
    this.rating = rating; // number 0-5
  }

  // method
  getSummary(){
    return `${this.name} — ${this.city} (${this.rating}/5)`;
  }
}

// --- Variables and Operators ---
const attractions = [
  new Attraction('Sunset Cliff', 'Coastville', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=60', 'Cliffs with panoramic ocean views.', 4.6),
  new Attraction('Greenwood Park', 'Mapleton', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=60', 'Large park with walking trails and gardens.', 4.2),
  new Attraction('Old Town Square', 'Historica', 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200&q=60', 'Cobblestone streets and cafes.', 4.8)
];

// Another variable and use of arithmetic operator
const featuredIndex = Math.floor(Math.random() * attractions.length);

// --- Functions ---
function renderAttractions(){
  const container = document.getElementById('attractions-list');
  if(!container) return; // condition

  // loops: for..of
  for(const attr of attractions){
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${attr.img}" alt="${attr.name}" />
      <h4>${attr.name}</h4>
      <p>${attr.city} — Rating: ${attr.rating}</p>
      <button class="detailsBtn">Details</button>
    `;
    // event: click on details
    const btn = card.querySelector('.detailsBtn');
    btn.addEventListener('click', () => showDetails(attr));
    container.appendChild(card);
  }
}

function showDetails(attraction){
  // condition: check rating
  const highRated = attraction.rating >= 4.5 ? 'Highly recommended' : 'Nice place to visit';
  alert(`${attraction.getSummary()}\n${highRated}\n\n${attraction.description}`);
}

function renderGallery(){
  const gallery = document.getElementById('gallery');
  if(!gallery) return;
  // loop with index and operators
  for(let i = 0; i < attractions.length; i++){
    const a = attractions[i];
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<img src="${a.img}" alt="${a.name}"><h4>${a.name}</h4>`;
    gallery.appendChild(card);
  }
}

// event handler for contact form submission
function handleContactForm(){
  const form = document.getElementById('contactForm');
  const result = document.getElementById('contactResult');
  if(!form) return;

  form.addEventListener('submit', function(ev){
    ev.preventDefault(); // event
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // conditions
    if(name.length < 2){
      result.textContent = 'Please enter a valid name.';
      return;
    }
    if(!email.includes('@') || !email.includes('.')){
      result.textContent = 'Please enter a valid email.';
      return;
    }

    // operators + function usage
    const summary = `Thanks ${name}! Message length: ${message.length} characters.`;
    result.textContent = summary;
    form.reset();
  });
}

// Surprise button on home page
function setupSurprise(){
  const btn = document.getElementById('surpriseBtn');
  const out = document.getElementById('surprise');
  if(!btn || !out) return;
  btn.addEventListener('click', () => {
    const pick = attractions[Math.floor(Math.random() * attractions.length)];
    out.innerHTML = `<h4>${pick.name}</h4><p>${pick.city} — Rating ${pick.rating}</p><p>${pick.description}</p>`;
  });
}

// Initialize page when DOM loaded
document.addEventListener('DOMContentLoaded', () => {
  renderAttractions();
  renderGallery();
  handleContactForm();
  setupSurprise();
});
