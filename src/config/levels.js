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
    transition: '',
    next: () => B1_PARTY_BEFORE
}
export const B1_PARTY_BEFORE = {
    name: 'b1_party_before',
    scene: 'WorldScene',
    map: TOWN_MAP,
    tiles: [TOWN_TILES],
    tileSize: 16,
    transition: '',
    next: () => B2_PARTY_BEGIN
}
export const B2_PARTY_BEGIN = {
    name: 'b2_party_begin',
    scene: 'WorldScene',
    map: DANCE_HALL_MAP,
    tiles: [CASINO_TILES, DANCE_HALL_TILES, PARTY_TILES],
    tileSize: 8,
    transition: '',
    next: () => B3_PARTY
}
export const B3_PARTY = {
    name: 'b3_party',
    scene: 'WorldScene',
    map: DANCE_HALL_MAP,
    tiles: [CASINO_TILES, DANCE_HALL_TILES, PARTY_TILES],
    tileSize: 8,
    transition: '',
    next: () => C_FIRST_DATE
}
export const C_FIRST_DATE = {
    name: 'c_first_date',
    scene: 'WorldScene',
    map: TOWN_MAP,
    tiles: [TOWN_TILES],
    tileSize: 16,
    transition: '',
    next: () => D1_BAR
}
export const D1_BAR = {
    name: 'd1_bar',
    scene: 'DialogScene',
    messages: 'dialogs/bar-part-1.json',
    transition: '',
    next: () => D2_BAR_MORNING
}
export const D2_BAR_MORNING = {
    name: 'd2_bar_morning',
    scene: 'DialogScene',
    messages: 'dialogs/bar-part-2.json',
    transition: 'System_007',
    next: () => D3_BAR_AFTER
}
export const D3_BAR_AFTER = {
    name: 'd3_bar_after',
    scene: 'WorldScene',
    map: TOWN_MAP,
    tiles: [TOWN_TILES],
    tileSize: 16,
    transition: '',
    next: () => E1_DINNER_BEFORE
}
export const E1_DINNER_BEFORE = {
    name: 'e1_dinner',
    scene: 'WorldScene',
    map: TOWN_MAP,
    tiles: [TOWN_TILES],
    tileSize: 16,
    transition: '',
    next: () => E2_DINNER_RESTAURANT
}
export const E2_DINNER_RESTAURANT = {
    name: 'e2_dinner',
    scene: 'DialogScene',
    messages: 'dialogs/restaurant-part-3.json',
    transition: '',
    next: () => E3_DINNER_RESTAURANT
}
export const E3_DINNER_RESTAURANT = {
    name: 'e3_dinner',
    scene: 'DialogScene',
    messages: 'dialogs/restaurant-part-4.json',
    transition: 'System_010',
    next: () => E4_DINNER_RESTAURANT
}
export const E4_DINNER_RESTAURANT = {
    name: 'e3_dinner',
    scene: 'DialogScene',
    messages: 'dialogs/restaurant-part-5.json',
    transition: 'System_011',
    next: () => F1_NIGHT_OUT
}
export const F1_NIGHT_OUT = {
    name: 'f1_night_out',
    scene: 'WorldScene',
    map: TOWN_MAP,
    tiles: [TOWN_TILES],
    tileSize: 16,
    transition: '',
    next: () => F2_NIGHT_OUT
}
export const F2_NIGHT_OUT = {
    name: 'f2_night_out',
    scene: 'WorldScene',
    map: TOWN_MAP,
    tiles: [TOWN_TILES],
    tileSize: 16,
    transition: '',
    next: () => F3_NIGHT_OUT
}
export const F3_NIGHT_OUT = {
    name: 'f3_night_out',
    scene: 'DialogScene',
    messages: 'dialogs/night-part-3.json',
    transition: '',
    next: () => A_ARRIVAL
}

export const FIRST_LEVEL = E1_DINNER_BEFORE

