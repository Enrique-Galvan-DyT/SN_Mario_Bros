const arrowKeys = ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'];
let moveInterval;
let isKeyPressed = false;

let characters = {}

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
function set_default_character_params(Id_Element, Character_name, DivElement, PositionX, PositionY, Action, Side, Lives, PwrUP, isBigger, isRunning, isTchnGround) {
    let name = String(Character_name + '-' + Id_Element)
    characters[name]={
        IdElement: Id_Element,
        DivElement: DivElement,
        Character_name: Character_name,
        PositionX: PositionX,
        PositionY: PositionY,
        Action: Action,
        Side: Side,
        Lives: Lives,
        PwrUP: PwrUP,
        isBigger: isBigger,
        isRunning: isRunning,
        isTchnGround: isTchnGround
    }
    //temp_character = cloneObject(character)
    //temp_character.Element = character.Element
    return characters[name]
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
function set_character_blocks_Y(character_element, blocks) {
    let numb = blocks * 2
    character_element.DivElement.style.bottom = String(numb + "rem") 
    character_element.PositionY = numb
}
function set_character_blocks_X(character_element, blocks) {
    let numb = blocks * 2
    character_element.DivElement.style.left = String(numb + "rem") 
    character_element.PositionX = numb
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


function set_character(game_character_name, PositionX, PositionY){
    let Id_Element = set_character_boxes(game_content_characters, game_character_name)
    var character
    if(game_characters.includes(game_character_name)){
        character = set_default_character_params(Id_Element, game_character_name, document.querySelector('.game-player'), PositionX, PositionY, 'standing', 'left', 1, 0, false, false, true)
    }else if (game_enemies.includes(game_character_name)) {
        character = set_default_character_params(Id_Element, game_character_name, document.querySelector(String('.' + Id_Element)), PositionX, PositionY, 'walking', 'left', 1, 0, false, false, true)
    }

    set_character_blocks_Y(character, PositionY)
    set_character_blocks_X(character, PositionX)
    if(game_character_name == game_enemies[0]){
        character.DivElement.children[1].children[1].classList.add('foot-left')
        character.DivElement.querySelector(String('.' + game_character_name)).addEventListener('click', function(){
            console.log(this)
        });
        set_goomba_Interval(character, 600)
    }
    setInterval(() => {
        check_all_boxes()
    }, 100);
}

function set_goomba_Interval(character, seconds) {
    let interval = setInterval(() => {
        goomba_movement(character)
    }, seconds);
    
    let IdInterval = {
        id: character.IdElement,
        interval: interval
    }
    game_Intervals.push(IdInterval);    
}

function goomba_movement(goomba) {
    let li = goomba.DivElement.querySelector(String('.' + goomba.Character_name));
    if (li.classList[4] == 'foot-left') {
        li.classList.remove(String('foot-left'))
        li.classList.add(String('foot-right'))
    }else{
        li.classList.remove(String('foot-right'))
        li.classList.add(String('foot-left'))
    }
    
    // Obtener la posición actual del div
    let currentPosition = parseFloat(goomba.DivElement.style.left) || 0;
    goomba.DivElement.style.transition = '.2s linear left';  

    if (goomba.Side == 'left') {
        // Mover el div un píxel a la derecha
        currentPosition = currentPosition - 1;
        // Establecer la nueva posición del div
        goomba.DivElement.style.left = currentPosition + 'rem';
        goomba.PositionX = currentPosition;
    }else {
        // Mover el div un píxel a la derecha
        currentPosition = currentPosition + 1;
        // Establecer la nueva posición del div
        goomba.DivElement.style.left = currentPosition + 'rem';
        goomba.PositionX = currentPosition;
    }
}

function set_character_boxes(base_element, game_character_name) {
    let id
    let player = document.createElement('div')
    base_element.appendChild(player);
    if(game_characters.includes(game_character_name)){
        player.classList.add('game-player')
        id = String('game-player-' + document.querySelectorAll('.game-player').length)
        player.classList.add(id)
    }else if (game_enemies.includes(game_character_name)) {
        player.classList.add('game-enemy')
        id = String('game-enemy-' + document.querySelectorAll('.game-enemy').length)
        player.classList.add(id)
    }
    for (let i = 0; i < 3; i++) {
        let character_row = document.createElement('ul')
        player.appendChild(character_row);
        character_row.classList.add('game-line')
        for (let j = 0; j < 3; j++) {
            let character_element = document.createElement('li');
            character_row.appendChild(character_element);
            character_element.setAttribute('data-box', j)
            if (i == 1 && j == 1) {
                if(game_characters.includes(game_character_name)){
                    character_element.classList.add("game-character-hurtbox", "game-character", game_character_name, "standing-right")
                }else if (game_enemies.includes(game_character_name)) {
                    if(game_character_name == game_enemies[0]){
                        character_element.classList.add("game-character-hurtbox", "game-character", game_character_name, "walking-right")
                    }
                }
            }else{
                character_element.classList.add("game-character-hitbox")
            }
        }
    }

    return id
}

function goomba_death(goomba) {
    let li = goomba.DivElement.querySelector(String('.' + goomba.Character_name));
    let index = game_Intervals.findIndex((intervalObj) => intervalObj.id === goomba.IdElement);
    if (index !== -1) {
        clearInterval(game_Intervals[index].interval);
        game_Intervals.splice(index, 1);
        li.classList.remove(String(goomba.Action + '-' + goomba.Side))
        goomba.Action = "death"
        li.classList.add(String(goomba.Action))
        console.log(`Intervalo para el personaje "${character.Character_name}" ha sido detenido.`);
        // Usar setTimeout para imprimir el segundo mensaje después de 1 segundo (1000 milisegundos)
        setTimeout(() => {
            goomba.DivElement.remove()
        }, 800);
        // Llamar a setTimeout para ejecutar miFuncion después de 1 segundo (1000 milisegundos)
        //setTimeout(
            //, 2000);
    } else {
        console.log("No se encontró el intervalo para el personaje específico.");
    }
}
// Función para verificar si un elemento está dentro del rango de los elementos con el atributo "data-box"
function isElementInsideBox(element, box) {
    let boxRect = box.getBoundingClientRect();
    let elementWithClass = Array.from(element).find(e => {
        let elementRect = e.getBoundingClientRect();
        return (
            elementRect.left >= boxRect.left &&
            elementRect.right <= boxRect.right &&
            elementRect.top >= boxRect.top &&
            elementRect.bottom <= boxRect.bottom
        );
    });

    if (elementWithClass) {
        return elementWithClass.classList[1];
    } else {
        return null;
    }
}
function check_all_boxes() {
    document.querySelectorAll('.game-enemy').forEach((gameEnemy) => {
        let elementsWithBoxAttribute = gameEnemy.querySelectorAll('.game-character-hitbox');
        
        let chtr = characters[String(gameEnemy.children[1].children[1].classList[2] + "-" + gameEnemy.classList[1])];
        let uls = Array.from(game_content_rows.children).slice((game_content_rows.childElementCount - 2) - chtr.PositionY, (game_content_rows.childElementCount + 1) - chtr.PositionY)
        let gameEntity = [];
        for (let index = 0; index < uls.length; index++) {
            let selected_li = Array.from(uls[index].children).slice((chtr.PositionX / 2) - 1, (chtr.PositionX / 2) + 4)
            selected_li.forEach(li => {
                gameEntity.push(...li.children);
                
            });
        }

        for (let index = 0; index < elementsWithBoxAttribute.length; index++) {
            let element = elementsWithBoxAttribute[index]
            let secondClass = isElementInsideBox(gameEntity, element);
            if(chtr.Character_name == 'goomba'){
                if (secondClass != undefined && secondClass.includes('pipe')) {
                    if (index == 3) {
                        chtr.Side = 'right'
                        console.log(chtr.Side)
                    }else if (index == 4){
                        chtr.Side = 'left'
                        console.log(chtr.Side)
                    }
                    // Si el elemento está dentro del rango, agregar el color verde de fondo al LI correspondiente
                    element.style.backgroundColor = 'green';
                } else {
                    // Si el elemento no está dentro del rango, quitar el color verde de fondo al LI correspondiente
                    element.style.backgroundColor = '';
                }
            }
        }
    });
}
