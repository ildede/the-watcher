export const TOWN_TILES = 'watcherbase'
export const TOWN_MAP = 'townMap'
export const CASINO_TILES = 'casino'
export const DANCE_HALL_TILES = 'dancehall'
export const PARTY_TILES = 'party'
export const DANCE_HALL_MAP = 'danceHallMap'

export const A_ARRIVAL = {
    name: 'a_arrival',
    scene: 'WorldScene',
    map: TOWN_MAP,
    tiles: [TOWN_TILES],
    tileSize: 16,
    next: () => B1_PARTY_BEFORE
}
export const B1_PARTY_BEFORE = {
    name: 'b1_party_before',
    scene: 'WorldScene',
    map: TOWN_MAP,
    tiles: [TOWN_TILES],
    tileSize: 16,
    next: () => B2_PARTY_BEGIN
}
export const B2_PARTY_BEGIN = {
    name: 'b2_party_begin',
    scene: 'WorldScene',
    map: DANCE_HALL_MAP,
    tiles: [CASINO_TILES, DANCE_HALL_TILES, PARTY_TILES],
    tileSize: 8,
    next: () => B3_PARTY
}
export const B3_PARTY = {
    name: 'b3_party',
    scene: 'WorldScene',
    map: DANCE_HALL_MAP,
    tiles: [CASINO_TILES, DANCE_HALL_TILES, PARTY_TILES],
    tileSize: 8,
    next: () => C_FIRST_DATE
}
export const C_FIRST_DATE = {
    name: 'c_first_date',
    scene: 'WorldScene',
    map: TOWN_MAP,
    tiles: [TOWN_TILES],
    tileSize: 16,
    next: () => D1_BAR
}
export const D1_BAR = {
    name: 'd1_bar',
    scene: 'DialogScene',
    messages: ['Mario_first_date001,Mario_first_date002','Gioia_first_date001'],
    next: () => D2_BAR_AFTER
}
export const D2_BAR_AFTER = {
    name: 'd2_bar_after',
    scene: 'WorldScene',
    map: TOWN_MAP,
    tiles: [TOWN_TILES],
    tileSize: 16,
    next: () => A_ARRIVAL
}

export const FIRST_LEVEL = A_ARRIVAL

