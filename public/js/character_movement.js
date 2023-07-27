const arrowKeys = ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'];
let moveInterval;
let isKeyPressed = false;

let character = {
    element: document.querySelector('.game-character'),
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
    element: undefined,
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
function set_default_character_params(PositionX, PositionY, Action, Side, Lives, PwrUP, isTchnGround) {
    character.PositionX = PositionX
    character.PositionY = PositionY
    character.Action = Action
    character.Side = Side
    character.Lives = Lives
    character.PwrUP = PwrUP
    character.isTchnGround = isTchnGround
    temp_character = cloneObject(character)
    temp_character.element = character.element
}
function set_animation_jump_on() {
    temp_character.element.style.transition = '.2s ease bottom';  
    if ((temp_character.Action == 'standing' || temp_character.Action == 'running-start' || temp_character.Action == 'running-end')) {
        temp_character.Action = 'jumping'
        set_character_blocks_above(5);
    }
}
function set_animation_jump_off() {
    temp_character.element.style.transition = '.2s ease bottom';  
    if(temp_character.Action == 'jumping'){//fixing this l8tr
        temp_character.Action = 'standing'
        set_character_blocks_under(5)
    }
}
function set_character_blocks_above(blocks) {
    temp_character.element.style.bottom = String(temp_character.PositionY + "rem")
    let numb = parseInt(temp_character.element.style.bottom.split('rem')[0]) + (blocks * 2)
    temp_character.element.style.bottom = String(numb + "rem") 
    temp_character.PositionY = numb
}
function set_character_blocks_under(blocks) {
    temp_character.element.style.bottom = String(temp_character.PositionY + "rem")
    let numb = parseInt(temp_character.element.style.bottom.split('rem')[0]) - (blocks * 2)
    temp_character.element.style.bottom = String(numb + "rem") 
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
    temp_character.element.style.transition = '.2s ease left';  
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
    temp_character.element.style.transition = '.2s ease left';  
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