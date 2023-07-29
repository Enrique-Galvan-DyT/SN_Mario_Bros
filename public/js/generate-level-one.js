const question_block_transition = ['game-block-question-mark-on', 'game-block-question-mark-changing-from', 'game-block-question-mark-off', 'game-block-question-mark-changing-to', 'game-block-question-mark-on-from', 'game-block-question-mark-on-to'];
let currentClass = 0;

generate_level_one()

function generate_level_one() {
    empty(game_content);
    for (let index = 0; index < 15; index++) {
        let ul = document.createElement('ul');
        game_content.appendChild(ul);
        ul.classList.add("game-line");
    }
    
    let game_lines = game_content.querySelectorAll('.game-line');
    
    game_lines.forEach((ul_line) => {
        // Aquí puedes realizar la acción que desees con cada elemento <ul> con la clase ".game-line"
        for (let index = 0; index < 208; index++) {
            let line_block = document.createElement('li');
            let block = document.createElement('div');
            ul_line.appendChild(line_block);
            line_block.appendChild(block);
            block.classList.add('game-entity')
        }
    });
    
    for (let index = 0; index < game_lines.length; index++) {
        if(index == 0){
            //Linea 1
            /* SKY */
            set_base_block(game_lines[index], ['game-block-sky'], "1-208")
        }else if(index == 1){
            //Linea 2
            /* SKY */
            set_base_block(game_lines[index], ['game-block-sky'], "1-208")
        }else if(index == 2){
            //Linea 3
            /* SKY */
            set_base_block(game_lines[index], ['game-block-sky'], "1-19,23-36,41-67,71-84,89-115,119-132,137-163,167-180,185-198,200-208")
            /* CLOUD TOP START */
            set_base_block(game_lines[index], ['game-block-sky-cloud-top-start'], "20,37,68,85,116,133,164,181")
            /* CLOUD TOP MIDDLE */
            set_base_block(game_lines[index], ['game-block-sky-cloud-top-middle'], "21,38-39,69,86-87,117,134-135,165,182-183")
            /* CLOUD TOP END */
            set_base_block(game_lines[index], ['game-block-sky-cloud-top-end'], "22,40,70,88,118,136,166,184")
        }else if(index == 3){
            //Linea 4
            set_base_block(game_lines[index], ['game-block-sky'], "1-8,12-19,23-27,33-36,41-56,60-67,71-75,81-84,89-104,108-115,119-123,129-132,137-152,156-163,167-171,177-180,185-197,200,204-208")
            /* CLOUD TOP START */
            set_base_block(game_lines[index], ['game-block-sky-cloud-top-start'], "9,28,57,76,105,124,153,172,201")
            /* CLOUD TOP MIDDLE */
            set_base_block(game_lines[index], ['game-block-sky-cloud-top-middle'], "10,29-31,58,77-79,106,125-127,154,173-175,202")
            /* CLOUD TOP END */
            set_base_block(game_lines[index], ['game-block-sky-cloud-top-end'], "11,32,59,80,107,128,155,176,203")
            /* CLOUD BOTTOM START */
            set_base_block(game_lines[index], ['game-block-sky-cloud-bottom-start'], "20,37,68,85,116,133,164,181")
            /* CLOUD BOTTOM MIDDLE */
            set_base_block(game_lines[index], ['game-block-sky-cloud-bottom-middle'], "21,38-39,69,86-87,117,134-135,165,182-183")
            /* CLOUD BOTTOM END */
            set_base_block(game_lines[index], ['game-block-sky-cloud-bottom-end'], "22,40,70,88,118,136,166,184")
        }else if(index == 4){
            //Linea 5
            /* SKY */
            set_base_block(game_lines[index], ['game-block-sky'], "1-8,12-27,33-56,60-75,81-104,108-123,129-152,156-171,177-198,200,204-208")
            /* CLOUD BOTTOM START */
            set_base_block(game_lines[index], ['game-block-sky-cloud-bottom-start'], "9,28,57,76,105,124,153,172,201")
            /* CLOUD BOTTOM MIDDLE */
            set_base_block(game_lines[index], ['game-block-sky-cloud-bottom-middle'], "10,29-31,58,77-79,106,125-127,154,173-175,202")
            /* CLOUD BOTTOM END */
            set_base_block(game_lines[index], ['game-block-sky-cloud-bottom-end'], "11,32,59,80,107,128,155,176,203")
        }else if(index == 5){
            //Linea 6
            /* SKY */
            set_base_block(game_lines[index], ['game-block-sky'], "1-22,24-80,89-91,96-109,111-121,125-128,133-188,191-198,200-208")
            /* BRICK */
            set_base_block(game_lines[index], ['game-block-brick'], "81-88,92-94,122-124,129,132")
            /* QUESTION MARK ON */
            set_base_block(game_lines[index], ['game-block-question-mark-on','question-mark-animated'], "23,95,110,130-131")
        }else if(index == 6){
            //Linea 7
            /* SKY */
            set_base_block(game_lines[index], ['game-block-sky'], "1-187,191-198,200-208")
        }else if(index == 7){
            //Linea 8
            /* SKY */
            set_base_block(game_lines[index], ['game-block-sky'], "1-186,191-198,200-208")
        }else if(index == 8){
            //Linea 9
            /* SKY */
            set_base_block(game_lines[index], ['game-block-sky'], "1-185,191-198,200-203,207-208")
        }else if(index == 9){
            //Linea 10
            /* SKY */
            set_base_block(game_lines[index], ['game-block-sky'], "1-16,18-20,26-46,49-57,60-77,81-94,96-100,103-106,108-109,111-112,114-118,120-129,132-137,139-140,142-151,154-155,157-168,173-184,191-198,200-203,207-208")
            /* BRICK */
            set_base_block(game_lines[index], ['game-block-brick'], "21,23,25,78,80,95,101,102,119,130-131,169-170,172")
            /* QUESTION MARK ON */
            set_base_block(game_lines[index], ['game-block-question-mark-on', 'question-mark-animated'], "17,22,24,79,107,110,113,171")
        }else if(index == 10){
            //Linea 11
            /* SKY */
            set_base_block(game_lines[index], ['game-block-sky'], "1-2,4-38,41-46,49-50,52-57,60-98,100-136,139-140,143-146,148-150,154-155,158-183,191-194,196-198,200-202,208")
        }else if(index == 11){
            //Linea 12
            /* SKY */
            set_base_block(game_lines[index], ['game-block-sky'], "1,5-17,19-28,31-38,41-46,49,53-57,60-65,67-97,101-113,115-135,139-140,144-145,149,154-155,159-161,163,166-179,182,191-193,197-198,200-202,208")
        }else if(index == 12){
            /* SKY */
            set_base_block(game_lines[index], ['game-block-sky'], "6-11, 20-13,27-28,31-38,41,46,54-57,68-71,75-89,94-96,102-107,116-119,123-134,154-155,166-167,171-179,191-192,198,200-202")
        }else if(index == 13){
            /* NORMAL */
            set_base_block(game_lines[index], ['game-block-normal'], "1-69,72-86,90-153,156-208")
            /* SKY */
            set_base_block(game_lines[index], ['game-block-sky'], "70-71,87-89,154-155")
        }
        else if(index == 14){
            /* NORMAL */
            set_base_block(game_lines[index], ['game-block-normal'], "1-69,72-86,90-153,156-208")
            /* SKY */
            set_base_block(game_lines[index], ['game-block-sky'], "70-71,87-89,154-155")
        }
    }

    let question_blocks_animated = game_content.querySelectorAll('.question-mark-animated') ?? [];
    if(question_blocks_animated.length > 0){
        question_blocks_animated.forEach((question_block) => {
            // Llamamos a la función changeClass cada segundo (1000 milisegundos)
            setInterval(function () {
                question_block_changeClass(question_block)
              }, 170); // Cambia de clase cada 1 segundo (1000 milisegundos)
        });
    }    
    console.log(question_blocks_animated.length)

}

function question_block_changeClass(element) {
    let currentClass = question_block_transition.findIndex(cls => element.classList.contains(cls));

    // Calculamos el siguiente índice de clase y aseguramos que no exceda los límites del array
    let nextClassIndex = (currentClass + 1) % question_block_transition.length;
    let nextClass = question_block_transition[nextClassIndex];

    element.classList.remove(...question_block_transition); // Removemos todas las clases
    element.classList.add(nextClass); // Agregamos la siguiente clase
}

function set_base_block(line, skin_blocks, array) {
    let filter = array.split(',')
    for (let index = 1; index <= line.childElementCount; index++) {
        for (let j = 0; j < filter.length; j++) {
            let set_block;
            if (filter[j].split('-')[1] != undefined) {
                let start = filter[j].split('-')[0]
                let end = filter[j].split('-')[1]
                set_block = (index >= start && index <= end);
            }else{
                
                set_block = (index == filter[j]);
            }

            if(set_block){
                for (let k = 0; k < skin_blocks.length; k++) {
                    line.childNodes[index-1].children[0].classList.add(skin_blocks[k]);
                }
            }
        }
        
    } 
    //console.log(String("Elemento: " + line + "\nBloque: " + skin_block + "\nRango: " + array))
    //block.classList.add(['game-block-normal'])
}

function empty(element) {
    element.innerHTML = '';
}