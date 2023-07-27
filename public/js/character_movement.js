let character = {
    element: document.querySelector('.game-character'),
    PositionX: 0,
    PositionY: 0,
    Action: '',
    Side: '',
    Lives: 0,
    PwrUP: 0,
    isBigger: false,
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
    isTchnGround: false
}
document.addEventListener('keydown', function(event) {
    const arrowKeys = ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'];
    if (event.key == arrowKeys[0]) {
        temp_character.Side = 'left';
    }else if (event.key == arrowKeys[2]) {
        temp_character.Side = 'right';
    }else if (event.key == arrowKeys[1]) {
        temp_character.Action = 'jumping';
        // Retirar el atributo después de 1 segundo
        set_animation_jump_on()
        setTimeout(function() {
            set_animation_jump_off()
            temp_character.Action = 'standing'
        }, 400);
    }else if (event.key == arrowKeys[3]) {
        if(temp_character.isBigger){
            temp_character.Action = 'crouching';
        }else{
            set_animation_jump_off()
        }
    }
});
function set_default_character_params(PositionX, PositionY, Action, Side, Lives, PwrUP) {
    character.PositionX = PositionX
    character.PositionY = PositionY
    character.Action = Action
    character.Side = Side
    character.Lives = Lives
    character.PwrUP = PwrUP
    temp_character = cloneObject(character)
    temp_character.element = character.element
}


function set_animation_jump_on() {
    let numb = temp_character.element.style.bottom.split('%')[0]
    temp_character.element.style.transition = '.2s ease bottom';  
    temp_character.element.style.bottom = String(numb + 10 + "%") 
}

function set_animation_jump_off() {
    if(!isDown){//fixing this l8tr
        let numb = temp_character.element.style.bottom.split('%')[0]
        temp_character.element.style.transition = '.2s ease bottom';  
        temp_character.element.style.bottom = String(numb - 10 + "%") 
    }
}