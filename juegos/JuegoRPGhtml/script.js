let xp = 0;
let health = 100;
let gold = 50;
let currentWeaponIndex = 0;
let fighting;
let monsterHealth;
let inventory = ["machete"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: 'machete', power: 5 },
  { name: 'arco', power: 30 },
  { name: 'glock', power: 50 },
  { name: 'ak47', power: 100 }
];
const monsters = [
  {
    name: "Niño rata",
    level: 2,
    health: 15
  },
  {
    name: "Insano",
    level: 8,
    health: 60
  },
  {
    name: "Heróico",
    level: 20,
    health: 300
  }
]
const locations = [
  {
    name: "Pueblito",
    "button text": ["Ir a la Tienda", "Ir a la Cueva", "PVP"],
    "button functions": [goStore, goCave, fightDragon],
    text: "Estás en el pueblo. A lo lejos hay una señal que dice \"C bende Cosas ilegales\"."
  },
  {
    name: "Tienda",
    "button text": ["Comprar Medicamentos (10 Bolivares)", "Comprar Arma (30 Bolivares)", "Ir al Pueblito"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "Entraste a la Tienda."
  },
  {
    name: "Cueva",
    "button text": ["PVP con Niño rata", "PVP con insanito", "Ir al Pueblito"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "Entraste a la cueva y ves muchos jugadores minando."
  },
  {
    name: "PVP",
    "button text": ["Atacar", "Campear", "Correr"],
    "button functions": [attack, dodge, goTown],
    text: "Estás haciendo PVP con un jugador."
  },
  {
    name: "kill monster",
    "button text": ["Ir al Pueblito", "Ir al Pueblito", "Ir al Pueblito"],
    "button functions": [goTown, goTown, goTown],
    text: 'El pendejo gime y se muere. Ahora ganaste experiencia y le robaste el real a la víctima.'
  },
  {
    name: "lose",
    "button text": ["REINTENTAR!", "REINTENTAR!", "REINTENTAR!"],
    "button functions": [restart, restart, easterEgg],
    text: "Moriste. &#x2620;"
  },
  { 
    name: "win", 
    "button text": ["REINTENTAR!", "REINTENTAR!", "REINTENTAR!"], 
    "button functions": [restart, restart, easterEgg], 
    text: "Mataste al Jugador! GANASTE EL JUEGO! &#x1F389;" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Ir al Pueblito?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "Encontraste un Easter Egg. Selecciona un numero al azar y si aciertas, ganas!"
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "No tienes suficientes bolivares para comprar Medicina.";
  }
}

function buyWeapon() {
  if (currentWeaponIndex < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeaponIndex++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeaponIndex].name;
      text.innerText = "Ahora tienes un " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " En tu inventario tienes: " + inventory;
    } else {
      text.innerText = "No tienes suficiente plata para comprar armas.";
    }
  } else {
    text.innerText = "Ya tienes la mejor arma!";
    button2.innerText = "Vende tu arma por 15 bolos";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "Vendiste tu " + currentWeapon + ".";
    text.innerText += " En tu inventario tienes: " + inventory;
  } else {
    text.innerText = "No puedes vender un machete oxidado!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "El " + monsters[fighting].name + " Te ataca.";
  text.innerText += " Tú lo atacas con tu " + weapons[currentWeaponIndex].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeaponIndex].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " Que noob jaja.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Tu " + inventory.pop() + " Se rompe porque te vendieron una basura de arma jaja.";
    currentWeaponIndex--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "Esquivaste el ataque del " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeaponIndex = 0;
  inventory = ["machete"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}


function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "Seleccionaste " + guess + ". Aquí están los numeros aleatorios:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Correcto! Ganas 20 bolos!";
    gold += 20;
    health = 100;
    goldText.innerText = gold;
    healthText.innerText = health;
  }
  else if ((numbers.includes(7) && numbers.includes(5))) {
    text.innerText += "Tienes la peor suerte del mundo! Pierdes 100 de vida JAJAJAJAJAJAJAJ!";
    health -= 100;
    healthText.innerText = health;
    if (health <= 0){
      lose()
    }
  }
  else {
    text.innerText += "La suerte no está de tu lado! Pierdes 10 de vida!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0){
      lose()
    }
  }
}