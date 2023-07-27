isDown = false;
// Función para clonar el objeto original al objeto temporal
function cloneObject(source) {
    return JSON.parse(JSON.stringify(source));
}

// Función para comparar y clonar los objetos si hay cambios
function checkStats() {
    if (JSON.stringify(character) !== JSON.stringify(temp_character)) {
        declare_new_stats_to_character()
        character = cloneObject(temp_character);
        character.element = temp_character.element;
        console.log(String("Elemento: " + character.element + "\nPosición horizontal: " + character.PositionX + "\nPosición vertical: " + character.PositionY + "\nLives: " + character.Lives + "\nPower UP: " + character.PwrUP));
    }
}

function declare_new_stats_to_character() {
    if (character.element.classList.contains(String('standing-' + character.Side))) {
        character.element.classList.remove(String(character.Action + '-' + character.Side));
        character.element.classList.add(String(temp_character.Action + '-' + temp_character.Side));
    }else if(character.element.classList.contains(String('jumping-' + character.Side))){
        character.element.classList.remove(String(character.Action + '-' + character.Side));
        character.element.classList.add(String(temp_character.Action + '-' + temp_character.Side));
    }
}

// Utilizamos setInterval para llamar a la función cada 1000 milisegundos (1 segundo)
setInterval(checkStats, 100);