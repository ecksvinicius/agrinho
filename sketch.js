let truck;
let grapes = [];
let grapeCount = 30;

function setup() {
  createCanvas(800, 600);
  truck = new Truck(width / 2, height - 60);

  // Gerar as uvas aleatoriamente
  for (let i = 0; i < grapeCount; i++) {
    let grape = createVector(random(width), random(height - 100));
    grapes.push(grape);
  }
}

function draw() {
  background(34, 139, 34);  // Fundo verde escuro

  // Desenhar as uvas (emoji de uva)
  for (let i = 0; i < grapes.length; i++) {
    textSize(32);
    text('🍇', grapes[i].x, grapes[i].y);
  }

  // Atualiza e desenha o caminhão (emoji de caminhão)
  truck.update();
  truck.show();

  // Verificar se o caminhão pegou alguma uva
  for (let i = grapes.length - 1; i >= 0; i--) {
    let d = dist(truck.pos.x, truck.pos.y, grapes[i].x, grapes[i].y);
    if (d < 25) { // Considerando o caminhão com raio de 25px para colisão
      grapes.splice(i, 1); // Remove a uva
    }
  }

  // Exibir número de uvas restantes
  fill(255);
  textSize(24);
  text(`Uvas restantes: ${grapes.length}`, 20, 30);

  // Verificar se o jogador coletou todas as uvas
  if (grapes.length == 0) {
    textSize(48);
    text("Você coletou todas as uvas!", width / 4, height / 2);
  }
}

function keyPressed() {
  if (key === 'W' || key === 'w') {
    truck.move(0, -10);
  } else if (key === 'A' || key === 'a') {
    truck.move(-10, 0);
  } else if (key === 'S' || key === 's') {
    truck.move(0, 10);
  } else if (key === 'D' || key === 'd') {
    truck.move(10, 0);
  } else if (key === 'I' || key === 'i') {
    truck.collect();
  }
}

class Truck {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.size = 50;
  }

  update() {
    // Não há necessidade de movimento contínuo, apenas reativo com as teclas
  }

  show() {
    fill(255, 0, 0);
    textSize(48);
    text('🚚', this.pos.x, this.pos.y);  // Emoji do caminhão
  }

  move(x, y) {
    this.pos.x += x;
    this.pos.y += y;
  }

  collect() {
    // Checa se o caminhão está perto das uvas
    for (let i = grapes.length - 1; i >= 0; i--) {
      let d = dist(this.pos.x, this.pos.y, grapes[i].x, grapes[i].y);
      if (d < 25) {
        grapes.splice(i, 1);
      }
    }
  }
}
