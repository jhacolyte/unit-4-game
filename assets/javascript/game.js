//Array of Playable Characters
characters = {
    'Mace Windu': {
        name: 'Mace Windu',
        health: 120,
        attack: 8,
        imageUrl: "assets/images/windu.png",
        enemyAttackBack: 15
    },
    'Qui Gon Jinn': {
        name: 'Qui Gon Jinn',
        health: 100,
        attack: 14,
        imageUrl: "assets/images/jinn.png",
        enemyAttackBack: 5
    },
    'Darth Traya': {
        name: 'Darth Traya',
        health: 150,
        attack: 8,
        imageUrl: "assets/images/traya.png",
        enemyAttackBack: 20
    },
    'Darth Revan': {
        name: 'Darth Revan',
        health: 180,
        attack: 7,
        imageUrl: "assets/images/revan.png",
        enemyAttackBack: 20
    }
};

var currSelectedCharacter;
var currDefender;
var combatants = [];
var indexofSelChar;
var attackResult;
var turnCounter = 1;
var killCount = 0;

var firstRender = function(character, renderArea, makeChar) {
    var charDiv = $("<div class='character' data-name='" + character.name + "'>");
    var charName = $("<div class='character-name'>").text(character.name);
    var charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageUrl);
    var charHealth = $("<div class='character-health'>").text(character.health);
    charDiv.append(charName).append(charImage).append(charHealth);
    $(renderArea).append(charDiv);

    if (makeChar == 'enemy') {
        $(charDiv).addClass('enemy');
    } else if (makeChar == 'defender') {
        currDefender = character;
        $(charDiv).addClass('target-enemy');
    }
};

var showMessage = function(message) {
    var gameMesageSet = $("#gameMessage");
    var newMessage = $("<div>").text(message);
    gameMesageSet.append(newMessage);

    if (message == 'clearMessage') {
        gameMesageSet.text('');
    }
};

var renderCharacters = function(charObj, areaRender) {
    if (areaRender == '#characters-section') {
        $(areaRender).empty();
        for (var key in charObj) {
            if (charObj.hasOwnProperty(key)) {
                firstRender(charObj[key], areaRender, '');
            }
        }
    }
    if (areaRender == '#selected-character') {
        firstRender(charObj, areaRender, '');
        $('#attack-button').css('visibility', 'visible');
    }
    if (areaRender == '#available-to-attack-section') {
        $('#available-to-attack-section').prepend("Choose Your Next Opponent");
        for (var i = 0; i < charObj.length; i++) {

            firstRender(charObj[i], areaRender, 'enemy');
        }
        $(document).on('click', '.enemy', function() {
            name = ($(this).data('name'));
            if ($('#defender').children().length === 0) {
                renderCharacters(name, '#defender');
                $(this).hide();
                showMessage("clearMessage");
            }
        });
    }
    if (areaRender == '#defender') {
        $(areaRender).empty();
        for (var i = 0; i < combatants.length; i++) {
            if (combatants[i].name == charObj) {
                $('#defender').append("Your selected opponent")
                firstRender(combatants[i], areaRender, 'defender');
            }
        }
    }
    if (areaRender == 'playerDamage') {
        $('#defender').empty();
        $('#defender').append("Your selected opponent")
        firstRender(charObj, '#defender', 'defender');

    }
    if (areaRender == 'enemyDamage') {
        $('#selected-character').empty();
        firstRender(charObj, '#selected-character', '');
    }
    if (areaRender == 'enemyDefeated') {
        $('#defender').empty();
        var gameStateMessage = "You have defeated " + charObj.name + ", you can choose to fight another enemy.";
        showMessage(gameStateMessage);

    }
};
renderCharacters(characters, '#characters-section');
$(document).on('click', '.character', function() {
    name = $(this).data('name');
    if (!currSelectedCharacter) {
        currSelectedCharacter = characters[name];
        for (var key in characters) {
            if (key != name) {
                combatants.push(characters[key]);
            }
        }
        $("#characters-section").hide();
        renderCharacters(currSelectedCharacter, '#selected-character');
        renderCharacters(combatants, '#available-to-attack-section');
    }
});

$("#attack-button").on("click", function() {
    if ($('#defender').children().length !== 0) {
        var attackMessage = "You attacked " + currDefender.name + " for " + (currSelectedCharacter.attack * turnCounter) + " damage.";
        showMessage("clearMessage");
        currDefender.health = currDefender.health - (currSelectedCharacter.attack * turnCounter);

        if (currDefender.health > 0) {
            renderCharacters(currDefender, 'playerDamage');
            var counterAttackMessage = currDefender.name + " attacked you back for " + currDefender.enemyAttackBack + " damage.";
            showMessage(attackMessage);
            showMessage(counterAttackMessage);

            currSelectedCharacter.health = currSelectedCharacter.health - currDefender.enemyAttackBack;
            renderCharacters(currSelectedCharacter, 'enemyDamage');
            if (currSelectedCharacter.health <= 0) {
                showMessage("clearMessage");
                restartGame("You have been defeated...GAME OVER!!!");
                $("#attack-button").attr("disabled", true);
            }
        } else {
            renderCharacters(currDefender, 'enemyDefeated');
            killCount++;
            if (killCount >= 3) {
                showMessage("clearMessage");
                restartGame("You Won!!!! GAME OVER!!!");
                setTimeout(function() {}, 2000);
                $("#attack-button").attr("disabled", true);

            }
        }
        turnCounter++;
    } else {
        showMessage("clearMessage");
        showMessage("Please Select an Opponent!");

    }
});

var restartGame = function(inputEndGame) {
    var restart = $('<button class="btn">Restart</button>').click(function() {
        location.reload();
    });

    var gameState = $("<div>").text(inputEndGame);
    $("#gameMessage").append(gameState);
    $("#gameMessage").append(restart);
};



// if (combatants == 0) {
//     $("#attack-button").attr("disabled", true);
// }