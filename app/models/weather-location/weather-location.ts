import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { LocationModel } from "../location/location"

//? 날씨 자체만을 나타내는 기능은 없기 때문에 아예 날씨 정보를 위치 정보와 같이 저장 (날씨-위치)
//? -> result-screen에 나타낼 것

/**
 * Model description here for TypeScript hints.
 */
export const WeatherLocationModel = types
  .model("WeatherLocation")
  .props({
    id: types.identifierNumber,
    date: types.string,
    time: types.maybe(types.string),
    status: types.frozen({
      category: "",
      fcstValue: 0,
    }),
    // location: types.reference(LocationModel),
    //? 결과 화면에서는 지역의 이름만 사용됨
    location: types.frozen({
      nx: 0,
      ny: 0,
    }),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type WeatherLocationType = Instance<typeof WeatherLocationModel>
export interface WeatherLocation extends WeatherLocationType {}
type WeatherLocationSnapshotType = SnapshotOut<typeof WeatherLocationModel>
export interface WeatherLocationSnapshot extends WeatherLocationSnapshotType {}
export const createWeatherLocationDefaultModel = () => types.optional(WeatherLocationModel, {})
