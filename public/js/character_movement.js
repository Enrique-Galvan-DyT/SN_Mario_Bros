const controlKeys = ['w', 'a', 's', 'd'];
let moveInterval;
let isKeyPressed = false;

var keysPressed = new Map;

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

/*
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
*/
function declare_controls() {

const game_players = game_content_characters.querySelectorAll('.game-player')

    game_players.forEach(player => {
        document.addEventListener('keydown', function(event) {
            keysPressed.set(event.code);
            
            let key = event.key.toLowerCase();

            chtr = characters[String(player.querySelector('.game-character').classList[2] + '-' + player.classList[1])]
        });
        document.addEventListener('keyup', function (event) {
            keysPressed.delete(event.code);
        });
    });
}

function buclePrincipal(){
    var teclas="";
    keysPressed.forEach((value, key)=>{teclas+=key+" ";});
    if (keysPressed.has("KeyD")){
        chtr.Side = 'right';
        moveRight(chtr)
    } else if (keysPressed.has("KeyA")){
        chtr.Side = 'left';
        moveLeft(chtr)
    }

    if (keysPressed.has("KeyD") && keysPressed.has("KeyW")){
        chtr.Side = 'right';
        if (chtr.Action != 'jumping') {
            jump(chtr)
        }
        moveRight(chtr)
    } else if (keysPressed.has("KeyA") && keysPressed.has("KeyW")) {
        chtr.Side = 'left';
        if (chtr.Action != 'jumping') {
            jump(chtr)
        }
        moveLeft(chtr)
    }

    if (keysPressed.has("KeyW")) {
        if (chtr.Action != 'jumping') {
            jump(chtr)
        }
    }else if (keysPressed.has("KeyS")) {
        if (chtr.Action == 'jumping') {
            fall_off(chtr)
        }
    }else if (keysPressed.has("KeyW") && keysPressed.has("KeyS")) {
        if (chtr.Action != 'jumping') {
            jump(chtr)
        }
    }
    requestAnimationFrame(buclePrincipal);
}
requestAnimationFrame(buclePrincipal);


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
function jump(chtr) {
    if (chtr.isTchnGround) {
        chtr.DivElement.querySelector(String('.' + chtr.Character_name)).classList.remove(String(chtr.Action + '-' + chtr.Side))
        chtr.Action = 'jumping'
        chtr.DivElement.querySelector(String('.' + chtr.Character_name)).classList.add(String(chtr.Action + '-' + chtr.Side))
        chtr.PositionY = chtr.PositionY + (2 * 5);
        chtr.DivElement.style.bottom = chtr.PositionY + "rem";
    }
    setTimeout(function() {
        fall_off(chtr)
    }, 500);
}
function fall_off(chtr) {
    
    while (chtr.isTchnGround == false) {
        chtr.PositionY = chtr.PositionY - 2;
        chtr.DivElement.style.bottom = chtr.PositionY + "rem";
        check_all_boxes(chtr)
    }
    setTimeout(function() {
        if (chtr.isTchnGround) {
            chtr.DivElement.querySelector(String('.' + chtr.Character_name)).classList.remove(String(chtr.Action + '-' + chtr.Side))
            chtr.Action = 'standing'
            chtr.DivElement.querySelector(String('.' + chtr.Character_name)).classList.add(String(chtr.Action + '-' + chtr.Side))
        }
    }, 300);
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

function moveRight(chtr) {

    /*
    temp_character.isRunning = isKeyPressed
    if (temp_character.Action != "jumping"){
        if (temp_character.isRunning && temp_character.Action != 'running-start') {
            temp_character.Action = 'running-start'
        }else if(temp_character.isRunning && temp_character.Action == 'running-start'){
            temp_character.Action = 'running-end'
        }
    }
    */
    check_all_boxes(chtr)
    if (chtr.Side == "right") {
        chtr.DivElement.querySelector(String('.' + chtr.Character_name)).classList.remove(String(chtr.Action + '-left'))
        chtr.DivElement.querySelector(String('.' + chtr.Character_name)).classList.add(String(chtr.Action + '-' + chtr.Side))
    }
    // Obtener la posición actual del div
    let currentPositionX = parseFloat(chtr.DivElement.style.left) || 0;
    // Mover el div un píxel a la derecha
    if(chtr.isRunning){
        currentPositionX = currentPositionX + 1.0;
    }else{
        currentPositionX = currentPositionX + 0.5;
    }
    if (currentPositionX >= 0) {
        // Establecer la nueva posición del div
        chtr.DivElement.style.left = currentPositionX + 'rem';
        chtr.PositionX = currentPositionX
    }
}

function moveLeft(chtr) {
    chtr.isRunning = isKeyPressed
    /*
    if(chtr.Action != "jumping"){
        if (chtr.isRunning && chtr.Action != 'running-start') {
            chtr.Action = 'running-start'
        }else if(chtr.isRunning && chtr.Action == 'running-start'){
            chtr.Action = 'running-end'
        }
    }
    */
    check_all_boxes(chtr)
    if (chtr.Side == "left") {
        chtr.DivElement.querySelector(String('.' + chtr.Character_name)).classList.remove(String(chtr.Action + '-right'))
        chtr.DivElement.querySelector(String('.' + chtr.Character_name)).classList.add(String(chtr.Action + '-' + chtr.Side))
    }
    // Obtener la posición actual del div
    let currentPositionX = parseFloat(chtr.DivElement.style.left) || 0;
    // Mover el div un píxel a la derecha
    if(chtr.isRunning){
        currentPositionX = currentPositionX - 1.0;
    }else{
        currentPositionX = currentPositionX - 0.5;
    }
    if (currentPositionX >= 0) {
        // Establecer la nueva posición del div
        chtr.DivElement.style.left = currentPositionX + 'rem';
        chtr.PositionX = currentPositionX
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
        /*
        character.DivElement.querySelector(String('.' + game_character_name)).addEventListener('click', function(){
            console.log(this)
            goomba_death(characters[String(this.classList[2] + "-" + this.closest('div').classList[1])])
        });
        */
       set_goomba_Interval(character, 300)
    }
    if (game_character_name == game_characters[0]) {
        set_player_Interval(character, 100)
    }
}

function set_player_Interval(character, seconds) {
    character.DivElement.style.transition = String('.' + seconds + 's linear left, .' + seconds + 's linear right, .3s ease bottom');  
    let interval = []
    
    interval.push(setInterval(() => {
        check_all_boxes(character)
    }, seconds))
        
    let IdInterval = {
        id: character.IdElement,
        interval: interval
    }
    
    game_Intervals.push(IdInterval);   
}

function set_goomba_Interval(character, seconds) {
    character.DivElement.style.transition = String('.' + seconds + 's linear left, .' + (seconds / 2) + 's linear bottom');  
    let interval = []
    
    interval.push(setInterval(() => {
        goomba_movement(character)
    }, seconds))
    
    interval.push(setInterval(() => {
        goomba_fall(character)
    }, seconds / 2))

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
    let currentPositionX = parseFloat(goomba.DivElement.style.left) || 0;
    let currentPositionY = parseFloat(goomba.DivElement.style.bottom) || 0;
    check_all_boxes(goomba)
    if (goomba.Side == 'left') {
        // Mover el div un píxel a la derecha
        currentPositionX = currentPositionX - 1;
        // Establecer la nueva posición del div
        goomba.DivElement.style.left = currentPositionX + 'rem';
        goomba.PositionX = currentPositionX;
    }else {
        // Mover el div un píxel a la derecha
        currentPositionX = currentPositionX + 1;
        // Establecer la nueva posición del div
        goomba.DivElement.style.left = currentPositionX + 'rem';
        goomba.PositionX = currentPositionX;
    }
    
    if (currentPositionX < -4 || currentPositionY < -4) {
        goomba_death(characters[String(goomba.Character_name + "-" + goomba.IdElement)])
    }
}

function goomba_fall(goomba) {
    // Obtener la posición actual del div
    let currentPositionY = parseFloat(goomba.DivElement.style.bottom) || 0;
    
    check_all_boxes(goomba)
    if (!goomba.isTchnGround) {
        //console.log('cayendo')
        currentPositionY = currentPositionY - 1;
        // Establecer la nueva posición del div
        goomba.DivElement.style.bottom = currentPositionY + 'rem';
        goomba.PositionY = currentPositionY;
    }
    
    if (currentPositionY < -4) {
        goomba_death(characters[String(goomba.Character_name + "-" + goomba.IdElement)])
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
        clearInterval(game_Intervals[index].interval[0]);
        clearInterval(game_Intervals[index].interval[1]);
        game_Intervals.splice(index, 1);
        li.classList.remove(String(goomba.Action + '-' + goomba.Side))
        goomba.Action = "death"
        li.classList.add(String(goomba.Action))
        console.log(`Intervalo para el personaje "${goomba.Character_name}" ha sido detenido.`);
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
    const elementRect = element.getBoundingClientRect();
    const boxRect = box.getBoundingClientRect();
  
    return (
      elementRect.left >= boxRect.left &&
      elementRect.right <= boxRect.right &&
      elementRect.top >= boxRect.top &&
      elementRect.bottom <= boxRect.bottom
    );
  }
  
  // Escuchar el evento scroll para verificar si cada elemento con el atributo "data-box" está dentro del rango
  function get_all(){
    document.querySelectorAll('.game-enemy').forEach((gameEnemy) => {
      let elementsWithBoxAttribute = gameEnemy.querySelectorAll('[data-box]');
  
      elementsWithBoxAttribute.forEach((element) => {
        let boxNumber = parseInt(element.dataset.box);
        let gameLine = element.closest('.game-line');
  
        if (isElementInsideBox(element, gameEnemy)) {
          // Si el elemento está dentro del rango, agregar el color verde de fondo al LI correspondiente
          gameLine.children[boxNumber].style.backgroundColor = 'green';
        } else {
          // Si el elemento no está dentro del rango, quitar el color verde de fondo al LI correspondiente
          gameLine.children[boxNumber].style.backgroundColor = '';
        }
      });
    });
  };
  