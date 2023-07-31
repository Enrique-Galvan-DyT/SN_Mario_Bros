const arrowKeys = ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'];
let moveInterval;
let isKeyPressed = false;

let character = {
    Element: '',
    Character_name: '',
    PositionX: 0,
    PositionY: 0,
    Action: '',
    Side: '',
    Lives: 0,
    PwrUP: 0,
    isBigger: false,
    isRunning: false,
    isTchnGround: false
}
let temp_character = {
    Element: undefined,
    Character_name: undefined,
    PositionX: undefined,
    PositionY: undefined,
    Action: undefined,
    Side: undefined,
    Lives: undefined,
    PwrUP: undefined,
    isBigger: false,
    isRunning: false,
    isTchnGround: false
}
document.addEventListener('keydown', function(event) {
    if (event.key == arrowKeys[0] && !isKeyPressed) {
        temp_character.Side = 'left';
        // Mover una vez al presionar la tecla "flecha izquierda"
        moveLeft();
        // Establecer el indicador de que la tecla está oprimida
        isKeyPressed = true;
        // Establecer el intervalo para mover continuamente si la tecla se mantiene oprimida
        moveInterval = setInterval(moveLeft, 100);
    }else if (event.key == arrowKeys[2] && !isKeyPressed) {
        temp_character.Side = 'right';
        // Mover una vez al presionar la tecla "flecha derecha"
        moveRight();
        // Establecer el indicador de que la tecla está oprimida
        isKeyPressed = true;
        // Establecer el intervalo para mover continuamente si la tecla se mantiene oprimida
        moveInterval = setInterval(moveRight, 100);
    }else if (event.key == arrowKeys[1]) {
        set_animation_jump_on()
        // Retirar el atributo después de 1 segundo
        setTimeout(function() {
            set_animation_jump_off()
        }, 400);
    }else if (event.key == arrowKeys[3]) {
        if(temp_character.isBigger){
            temp_character.Action = 'crouching';
        }
        set_animation_jump_off()
    }
});
document.addEventListener('keyup', function(event) {
    if (event.key == arrowKeys[0]) {
        // Detener el movimiento cuando se suelta la tecla
        clearInterval(moveInterval);
        moveInterval = null;        
        isKeyPressed = false;
        temp_character.isRunning = isKeyPressed
        temp_character.Action = "standing"
    }else if (event.key == arrowKeys[2]) {
        // Detener el movimiento cuando se suelta la tecla
        clearInterval(moveInterval);
        moveInterval = null;
        isKeyPressed = false;
        temp_character.isRunning = isKeyPressed
        temp_character.Action = "standing"
    }else if (event.key == arrowKeys[1]) {
    }else if (event.key == arrowKeys[3]) {
    }
});
function set_default_character_params(Character_name, PositionX, PositionY, Action, Side, Lives, PwrUP, isBigger, isRunning, isTchnGround) {
    character.Element = document.querySelector('.game-player'),
    character.Character_name = Character_name
    character.PositionX = PositionX
    character.PositionY = PositionY
    character.Action = Action
    character.Side = Side
    character.Lives = Lives
    character.PwrUP = PwrUP
    character.isBigger = isBigger
    character.isRunning = isRunning
    character.isTchnGround = isTchnGround
    temp_character = cloneObject(character)
    temp_character.Element = character.Element
}
function set_animation_jump_on() {
    temp_character.Element.style.transition = '.2s ease bottom';  
    if ((temp_character.Action == 'standing' || temp_character.Action == 'running-start' || temp_character.Action == 'running-end')) {
        temp_character.Action = 'jumping'
        set_character_blocks_above(5);
    }
}
function set_animation_jump_off() {
    temp_character.Element.style.transition = '.2s ease bottom';  
    if(temp_character.Action == 'jumping'){//fixing this l8tr
        temp_character.Action = 'standing'
        set_character_blocks_under(5)
    }
}
function set_character_blocks_above(blocks) {
    temp_character.Element.style.bottom = String(temp_character.PositionY + "rem")
    let numb = parseInt(temp_character.Element.style.bottom.split('rem')[0]) + (blocks * 2)
    temp_character.Element.style.bottom = String(numb + "rem") 
    temp_character.PositionY = numb
}
function set_character_blocks_under(blocks) {
    temp_character.Element.style.bottom = String(temp_character.PositionY + "rem")
    let numb = parseInt(temp_character.Element.style.bottom.split('rem')[0]) - (blocks * 2)
    temp_character.Element.style.bottom = String(numb + "rem") 
    temp_character.PositionY = numb
}

function moveRight() {
    temp_character.isRunning = isKeyPressed
    if (temp_character.Action != "jumping"){
        if (temp_character.isRunning && temp_character.Action != 'running-start') {
            temp_character.Action = 'running-start'
        }else if(temp_character.isRunning && temp_character.Action == 'running-start'){
            temp_character.Action = 'running-end'
        }
    }
    
    // Obtener la posición actual del div
    let currentPosition = parseFloat(character.element.style.left) || 0;
    temp_character.Element.style.transition = '.2s ease left';  
    // Mover el div un píxel a la derecha
    if(temp_character.isRunning){
        currentPosition = currentPosition + (1*16);
    }else{
        currentPosition = currentPosition + (1*8);
    }
    // Establecer la nueva posición del div
    character.element.style.left = currentPosition + 'px';
}
function moveLeft() {
    temp_character.isRunning = isKeyPressed
    if(temp_character.Action != "jumping"){
        if (temp_character.isRunning && temp_character.Action != 'running-start') {
            temp_character.Action = 'running-start'
        }else if(temp_character.isRunning && temp_character.Action == 'running-start'){
            temp_character.Action = 'running-end'
        }
    }
    
    // Obtener la posición actual del div
    let currentPosition = parseFloat(character.element.style.left) || 0;
    temp_character.Element.style.transition = '.2s ease left';  
    // Mover el div un píxel a la derecha
    if(temp_character.isRunning){
        currentPosition = currentPosition - (1*16);
    }else{
        currentPosition = currentPosition - (1*8);
    }
    if (currentPosition >= 0) {
        // Establecer la nueva posición del div
        character.element.style.left = currentPosition + 'px';
    }
}


function set_character(game_character_name){
    set_character_boxes(game_content_characters, game_character_name)
    set_default_character_params(game_character_name, 0, 4, 'standing','left', 1, 0, false, false, true)
}
function set_character_boxes(base_element, game_character_name) {
    let player = document.createElement('div')
    base_element.appendChild(player);
    player.classList.add('game-player')
    for (let i = 0; i < 3; i++) {
        let character_row = document.createElement('ul')
            player.appendChild(character_row);
            character_row.classList.add('game-line')
            for (let j = 0; j < 3; j++) {
            let character_element = document.createElement('li');
            character_row.appendChild(character_element);
            if (i == 1 && j == 1) {
                character_element.classList.add("game-character_hurtbox", "game-character", game_character_name, "standing-right")
            }else{
                character_element.classList.add("game-character-hitbox")
            }
        }
    }
}