import { GeneralApiProblem } from "./api-problem"
import { Character } from "../../models/character/character"

export interface User {
  id: number
  name: string
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export type GetCharactersResult = { kind: "ok"; characters: Character[] } | GeneralApiProblem
export type GetCharacterResult = { kind: "ok"; character: Character } | GeneralApiProblem

export interface WeatherObject {
  cloudStatus: string
  createdAt: string
  expectedDate: string
  humidity: number
  id: number
  isThunder: boolean
  precipitation: number
  rainfall: string
  temperature: number
  updatedAt: string
  windSpeed: number
}

interface LocationObject {
  type: string
  coordinates: Array<number>
}
export interface CityObject {
  id: number
  createAt: string
  updatedAt: string
  cityName: string
  address: string
  location: LocationObject
}

// "id": 1,
// "createAt": "2022-09-21T20:59:53.549Z",
// "updatedAt": "2022-09-21T20:59:53.549Z",
// "cityName": "진접",
// "address": "경기도 남양주시 진접읍 금강로 1530-14",
// "location": {
//     "type": "Point",
//     "coordinates": [
//         63,
//         50
//     ]
// }
