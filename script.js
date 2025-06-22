const API_URL = 'https://rpg-creature-api.freecodecamp.rocks/api/creature/';

const inputs = {
  input: document.getElementById('search-input'),
  name: document.getElementById('creature-name'),
  id: document.getElementById('creature-id'),
  weight: document.getElementById('weight'),
  height: document.getElementById('height'),
  types: document.getElementById('types'),
  hp: document.getElementById('hp'),
  attack: document.getElementById('attack'),
  defense: document.getElementById('defense'),
  spAtk: document.getElementById('special-attack'),
  spDef: document.getElementById('special-defense'),
  speed: document.getElementById('speed')
};

function resetDisplay() {
  for (let key in inputs) {
    if (key === 'types') {
      inputs[key].innerHTML = '';
    } else if (key !== 'input') {
      inputs[key].innerText = '';
    }
  }
}

document.getElementById('search-button').addEventListener('click', async (e) => {
  e.preventDefault();
  resetDisplay();

  const query = inputs.input.value.trim().toLowerCase();
  if (!query) return alert('Creature not found');

  try {
    const res = await fetch(API_URL + query);
    if (!res.ok) throw new Error();

    const data = await res.json();

    inputs.name.innerText = data.name.toUpperCase();
    inputs.id.innerText = `#${data.id}`;
    inputs.weight.innerText = `Weight: ${data.weight}`;
    inputs.height.innerText = `Height: ${data.height}`;

    data.types.forEach(obj => {
      const el = document.createElement('p');
      el.innerText = obj.name.toUpperCase();
      inputs.types.appendChild(el);
    });

    data.stats.forEach(stat => {
      const target = {
        hp: 'hp',
        attack: 'attack',
        defense: 'defense',
        'special-attack': 'spAtk',
        'special-defense': 'spDef',
        speed: 'speed'
      }[stat.name];

      if (target) inputs[target].innerText = stat.base_stat;
    });

  } catch {
    alert('Creature not found');
  }
});
