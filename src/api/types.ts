export type JoinGameResponse = {
  comment: string,
  game_id: number,
  join_code: string
}

export type HeartbeatResponse = {
  comment: string,
  current_player: number,
  gamers: HeartbeatUser[],
  mega_history: MegaHistoryWord[],
  game_id: number,
}

export type HeartbeatUser = {
  email: string,
  history: HeartbeatUserHistory[],
  player_num: number,
  top_place: number
}

export type HeartbeatUserHistory = {
  guess: string,
  player_num: number,
  result: string
}

export type MegaHistoryWord = {
  guess: string,
  player_num: number,
  result: string
}

export type NewWordResponse = {
  comment: string,
  newWord: string
}