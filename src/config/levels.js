export const TOWN_TILES = 'watcherbase'
export const TOWN_MAP = 'townMap'
export const SNOW_MAP = 'snowMap'
export const GARDEN_MAP = 'gardenMap'
export const GARDEN_TORI_MAP = 'gardenToriMap'
export const CASINO_TILES = 'casino'
export const DANCE_HALL_TILES = 'dancehall'
export const PARTY_TILES = 'party'
export const PARTY_TILES_16 = 'party16'
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
    scene: 'RestaurantScene',
    messages: 'dialogs/restaurant-part-3.json',
    transition: '',
    image: {
        name: 'restaurantBg',
        flip: true
    },
    next: () => E3_DINNER_RESTAURANT
}
export const E3_DINNER_RESTAURANT = {
    name: 'e3_dinner',
    scene: 'RestaurantScene',
    messages: 'dialogs/restaurant-part-4.json',
    transition: 'System_010',
    image: {
        name: 'restaurantBg',
        flip: true
    },
    next: () => E4_DINNER_RESTAURANT
}
export const E4_DINNER_RESTAURANT = {
    name: 'e4_dinner',
    scene: 'RestaurantScene',
    messages: 'dialogs/restaurant-part-5.json',
    transition: 'System_011',
    image: {
        name: 'restaurantBg',
        flip: true
    },
    next: () => E5_DINNER_RESTAURANT
}
export const E5_DINNER_RESTAURANT = {
    name: 'e5_dinner',
    scene: 'RestaurantScene',
    messages: 'dialogs/restaurant-part-6.json',
    transition: '',
    image: {
        name: 'restaurantAloneBg',
        flip: false
    },
    next: () => F1_NIGHT_OUT
}
export const F1_NIGHT_OUT = {
    name: 'f1_night',
    scene: 'WorldScene',
    map: TOWN_MAP,
    tiles: [TOWN_TILES],
    tileSize: 16,
    transition: '',
    next: () => F2_NIGHT_OUT
}
export const F2_NIGHT_OUT = {
    name: 'f2_night',
    scene: 'WorldScene',
    map: TOWN_MAP,
    tiles: [TOWN_TILES],
    tileSize: 16,
    transition: '',
    next: () => F3_NIGHT_OUT
}
export const F3_NIGHT_OUT = {
    name: 'f3_night',
    scene: 'ParkScene',
    messages: 'dialogs/night-part-4.json',
    transition: '',
    next: () => E1_WHAT_ARE_WE
}
export const E1_WHAT_ARE_WE = {
    name: 'e1_what_are_we',
    scene: 'WorldScene',
    map: TOWN_MAP,
    tiles: [TOWN_TILES],
    tileSize: 16,
    transition: '',
    next: () => E2_WHAT_ARE_WE
}
export const E2_WHAT_ARE_WE = {
    name: 'e2_what_are_we',
    scene: 'WorldScene',
    map: TOWN_MAP,
    tiles: [TOWN_TILES],
    tileSize: 16,
    transition: 'System_014',
    next: () => H1_ANNIVERSARY
}
export const H1_ANNIVERSARY = {
    name: 'h1_anniversary',
    scene: 'WorldScene',
    map: SNOW_MAP,
    tiles: [TOWN_TILES],
    tileSize: 16,
    transition: '',
    next: () => H2_ANNIVERSARY
}
export const H2_ANNIVERSARY = {
    name: 'h2_anniversary',
    scene: 'WorldScene',
    map: SNOW_MAP,
    tiles: [TOWN_TILES],
    tileSize: 16,
    transition: 'System_015',
    next: () => H3_ANNIVERSARY
}
export const H3_ANNIVERSARY = {
    name: 'h3_anniversary',
    scene: 'RestaurantScene',
    messages: 'dialogs/restaurant-anniversary-part-1.json',
    transition: '',
    image: {
        name: 'restaurantAloneBg',
        flip: false
    },
    next: () => H4_ANNIVERSARY
}
export const H4_ANNIVERSARY = {
    name: 'h4_anniversary',
    scene: 'RestaurantScene',
    messages: 'dialogs/restaurant-anniversary-part-2.json',
    transition: '',
    image: {
        name: 'restaurantBg',
        flip: false
    },
    next: () => I1_MARRY_ME
}
export const I1_MARRY_ME = {
    name: 'i1_marry_me',
    scene: 'RestaurantScene',
    messages: 'dialogs/restaurant-marry-me-part-1.json',
    transition: '',
    image: {
        name: 'restaurantBg',
        flip: false
    },
    next: () => L1_MOVING
}
export const L1_MOVING = {
    name: 'l1_moving',
    scene: 'WorldScene',
    map: SNOW_MAP,
    tiles: [TOWN_TILES],
    tileSize: 16,
    transition: '',
    next: () => L2_MOVING
}
export const L2_MOVING = {
    name: 'l2_moving',
    scene: 'WorldScene',
    map: SNOW_MAP,
    tiles: [TOWN_TILES],
    tileSize: 16,
    transition: '',
    next: () => M1_DOG
}
export const M1_DOG = {
    name: 'm1_dog',
    scene: 'WorldScene',
    map: GARDEN_MAP,
    tiles: [TOWN_TILES],
    tileSize: 16,
    transition: '',
    next: () => M2_DOG
}
export const M2_DOG = {
    name: 'm2_dog',
    scene: 'WorldScene',
    map: TOWN_MAP,
    tiles: [TOWN_TILES],
    tileSize: 16,
    transition: '',
    next: () => M3_DOG
}
export const M3_DOG = {
    name: 'm3_dog',
    scene: 'WorldScene',
    map: TOWN_MAP,
    tiles: [TOWN_TILES],
    tileSize: 16,
    transition: '',
    next: () => N1_BDAY
}
export const N1_BDAY = {
    name: 'n1_bday',
    scene: 'RestaurantScene',
    messages: 'dialogs/bday-part-1.json',
    transition: '',
    next: () => N2_BDAY
}
export const N2_BDAY = {
    name: 'n2_bday',
    scene: 'WorldScene',
    map: GARDEN_TORI_MAP,
    tiles: [TOWN_TILES, PARTY_TILES_16],
    tileSize: 16,
    transition: '',
    next: () => N3_BDAY
}
export const N3_BDAY = {
    name: 'n3_bday',
    scene: 'WorldScene',
    map: GARDEN_TORI_MAP,
    tiles: [TOWN_TILES, PARTY_TILES_16],
    tileSize: 16,
    transition: '',
    next: () => N4_BDAY
}
export const N4_BDAY = {
    name: 'n4_bday',
    scene: 'WorldScene',
    map: GARDEN_TORI_MAP,
    tiles: [TOWN_TILES, PARTY_TILES_16],
    tileSize: 16,
    transition: '',
    next: () => THE_END
}
export const THE_END = {
    name: 'the_end',
    scene: 'EndTitleScene',
    transition: '',
    next: () => {}
}
export const FIRST_LEVEL = A_ARRIVAL

