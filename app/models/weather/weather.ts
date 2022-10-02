import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const WeatherModel = types
  .model("Weather")
  .props({
    id: types.identifierNumber,
    date: types.string,
    time: types.string,
    isThunder: types.boolean,
    rainfall: types.string,
    temperature: types.number,
    windSpeed: types.number,
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type WeatherType = Instance<typeof WeatherModel>
export interface Weather extends WeatherType {}
type WeatherSnapshotType = SnapshotOut<typeof WeatherModel>
export interface WeatherSnapshot extends WeatherSnapshotType {}
export const createWeatherDefaultModel = () => types.optional(WeatherModel, {})
