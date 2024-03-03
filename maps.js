/*
* Reglas:
* El final de cada nivel debe ser el inicio del siguiente
*/

const emojis = {
    '-': ' ',
    'O': '🚪',
    'X': '💣',
    'I': '🎁',
    'L': '🤬',
    'PLAYER': '💀',
    'BOMB_COLLISION': '🔥',
    'GAME_OVER': '👎',
    'WIN': '🏆',
};

const maps = [];
maps.push(`
    IXXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    OXXXXXXXXX
`);
maps.push(`
    O--XXXXXXX
    X--XXXXXXX
    XX----XXXX
    X--XX-XXXX
    X-XXX--XXX
    X--XXX-XXX
    XX--XX--XX
    XX---XX-XX
    XXXX---IXX
    XXXXXXXXXX
    `);
maps.push(`
    I-----XXXX
    XXXXX-XXXX
    XX----XXXX
    XX-XXXXXXX
    XX-----XXX
    XXXXXX-XXX
    XX-----XXX
    XX-XXXXXXX
    XX-----OXX
    XXXXXXXXXX
`);
maps.push(`
    O--------X
    XXXXXXXX-X
    X--------X
    X-XXXXXXXX
    X-XXXXXXXX
    X-XXXXXXXX
    X--------X
    XXXXXXXX-X
    XI-------X
    XXXXXXXXXX
    `);
    maps.push(`
    XXXXXXXXXX
    X-----XXXX
    X-XXXXXX-X
    X-XX---XXX
    X-XXIX---X
    X-XXXXXX-X
    XX----XX-X
    X--XX-XX-X
    XO-XX----X
    XXXXXXXXXX
    `);
    maps.push(`
    XXXXXXXXXX
    X--------X
    X-XXXXXX-X
    X-X----X-X
    X-X-OX-X-X
    X-XXXX-X-X
    X------X-X
    XXXXXXXX-X
    XI-------X
    XXXXXXXXXX
    `);
    maps.push(`
    ----------
    -XXXXXXXX-
    -X-----XX-
    -X-XXXIXX-
    -X-XXXXXX-
    -X------X-
    -XXXXXX-X-
    -X------X-
    OX-XXXXXX-
    XX--------
    `);