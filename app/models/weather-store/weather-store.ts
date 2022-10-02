import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { Api } from "../../services/api"
import { CAREGIVER_API_CONFIG } from "../../services/api/api-config"
import { WeatherModel } from "../weather/weather"

/**
 * Model description here for TypeScript hints.
 */

interface WeatherProps {
  data: string
  time: string
  isThunder: boolean
  rainfall: string
  temperature: number
  windSpeed: number
}

export const WeatherStoreModel = types
  .model("WeatherStore")
  .props({
    weathers: types.optional(types.array(WeatherModel), []),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  // ! care giver api 사용 코드
  .actions((self) => ({
    addWeather: (data: WeatherProps) => {
      const id = self.weathers.reduce((max, weather) => Math.max(max, weather.id), 0) + 1
      const newWeather = WeatherModel.create({
        id,
        ...data,
      })

      self.weathers.push(newWeather)
    },
  }))
  .actions((self) => ({
    setWeathers: async (cityId: number) => {
      const weatherApi = new Api(CAREGIVER_API_CONFIG)
      weatherApi.setup()
      // TODO: 1. weatherApi.getWeathers 로 날씨 정보가 담긴 배열 받아온다.
      const weatherResponse = await weatherApi.getWeathers(cityId)
      // TODO: 2. 받아온 배열과 self.addWeather 메소드로 self.weatherLocations 정보를 수정한다
      if (weatherResponse.kind == "ok") {
        weatherResponse.weathers.forEach((value) => {
          self.addWeather(value)
        })
      }
    },
  }))

type WeatherStoreType = Instance<typeof WeatherStoreModel>
export interface WeatherStore extends WeatherStoreType {}
type WeatherStoreSnapshotType = SnapshotOut<typeof WeatherStoreModel>
export interface WeatherStoreSnapshot extends WeatherStoreSnapshotType {}
export const createWeatherStoreDefaultModel = () => types.optional(WeatherStoreModel, {})
