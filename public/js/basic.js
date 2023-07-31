const game_content = document.querySelector(".game-content");
const game_content_rows = game_content.querySelector(".game-rows");
const game_content_characters = game_content.querySelector(".game-characters");

let game_Intervals = [];

const game_characters = ['mario', 'luigi']
const game_enemies = ['goomba', 'koopa']

const gameEntities = document.querySelectorAll('.game-entity');

// Función para clonar el objeto original al objeto temporal
function cloneObject(source) {
    return JSON.parse(JSON.stringify(source));
}

// Función para comparar y clonar los objetos si hay cambios
function checkStats() {
    verify_character_axis()
    if (JSON.stringify(character) !== JSON.stringify(temp_character)) {
        declare_new_stats_to_character()
        character = cloneObject(temp_character);
        character.Element = temp_character.Element;
        console.log(String("Elemento: " + character.Element + "\nPosición horizontal: " + character.PositionX + "\nPosición vertical: " + character.PositionY + "\nAcción: " + character.Action + "\nLado: " + character.Side + "\nLives: " + character.Lives + "\nPower UP: " + character.PwrUP + "\nEs grande? " + character.isBigger + "\nEstá corriendo? " + character.isRunning + "\nToca suelo? " + character.isTchnGround));
    }
}

function declare_new_stats_to_character() {
    if (character.Element.classList.contains(String('standing-' + character.Side))) {
        character.Element.classList.remove(String(character.Action + '-' + character.Side));
        character.Element.classList.add(String(temp_character.Action + '-' + temp_character.Side));
    }else if(character.Element.classList.contains(String('jumping-' + character.Side))){
        character.Element.classList.remove(String(character.Action + '-' + character.Side));
        character.Element.classList.add(String(temp_character.Action + '-' + temp_character.Side));
    }else if(character.Element.classList.contains(String('running-start-' + character.Side))){
        character.Element.classList.remove(String(character.Action + '-' + character.Side));
        character.Element.classList.add(String(temp_character.Action + '-' + temp_character.Side));
    }else if(character.Element.classList.contains(String('running-end-' + character.Side))){
        character.Element.classList.remove(String(character.Action + '-' + character.Side));
        character.Element.classList.add(String(temp_character.Action + '-' + temp_character.Side));
    }
}

// Utilizamos setInterval para llamar a la función cada 1000 milisegundos (1 segundo)
//setInterval(checkStats, 100);

function checkIfInside(entity) {
    let characterRect = character.Element.getBoundingClientRect();
    let entityRect = entity.getBoundingClientRect();

    let isInside = characterRect.left >= entityRect.left &&
      characterRect.right <= entityRect.right &&
      characterRect.top >= entityRect.top &&
      characterRect.bottom <= entityRect.bottom;

    if (isInside) {
        set_character_blocks_above(1)
        console.log(`El elemento game-character está dentro de las dimensiones de ${entity.id}.`);
    } 
}

function verify_character_axis() {
    gameEntities.forEach(entity => checkIfInside(entity));
}