export type JoinGameResponse = {
  comment: string,
  game_id: number,
  join_code: string
}

export type HeartbeatResponse = {
  comment: string,
  current_player: number,
  game_id: number,
  gamers: HeartbeatUser[],
  medal: "chocolate" | "bronze" | "silver" | "gold" | "diamond" | "chromatic"
  mega_history: MegaHistoryWord[],
  players_num: number,
}

export type HeartbeatUser = {
  email: string,
  history: HeartbeatUserHistory[],
  player_num: number,
  top_place: number,
}

export type HeartbeatUserHistory = {
  guess: string,
  player_num: number,
  result: string,
}

export type MegaHistoryWord = {
  guess: string,
  player_num: number,
  result: string,
}

export type NewWordResponse = {
  comment: string,
  newWord: string
}