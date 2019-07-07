$(document).ready(function() {

    
    //Array of Playable Characters
    let characters = {
        'rey': {
            name: 'rey',
            health: 120,
            attack: 8,
            imageUrl: "assets/images/rey.png",
            enemyAttackBack: 15
        }, 
        'darth': {
            name: 'darth',
            health: 100,
            attack: 14,
            imageUrl: "assets/images/darthVader.png",
            enemyAttackBack: 5
        }, 
        'finn': {
            name: 'finn',
            health: 150,
            attack: 8,
            imageUrl: "assets/images/finn.png",
            enemyAttackBack: 20
        }, 
        'stormtrooper': {
            name: 'stormtrooper',
            health: 180,
            attack: 7,
            imageUrl: "assets/images/trooper.png",
            enemyAttackBack: 20
        }
    };