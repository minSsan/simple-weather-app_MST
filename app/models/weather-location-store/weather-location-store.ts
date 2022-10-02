import { Instance, ISimpleType, SnapshotOut, types } from "mobx-state-tree"
import { Api } from "../../services/api"
import { CAREGIVER_API_CONFIG } from "../../services/api/api-config"
import { WeatherLocationApi } from "../../services/api/weather-location-api"
import { withEnvironment } from "../extensions/with-environment"
import { WeatherLocationModel } from "../weather-location/weather-location"
import { WeatherModel } from "../weather/weather"

/**
 * Model description here for TypeScript hints.
 */
interface WeatherLocationProps {
  date: string
  time: string
  status: {
    category: string
    fcstValue: number
  }
  // location: {
  //   nx: number
  //   ny: number
  // }
  location: {
    nx: number
    ny: number
  }
}

interface WeatherLocationApiProps {
  base_date: string
  base_time: string
  nx: number
  ny: number
}

export const WeatherLocationStoreModel = types
  .model("WeatherLocationStore")
  .props({
    weatherLocations: types.optional(types.array(WeatherLocationModel), []),
  })
  .extend(withEnvironment)
  .views((self) => ({
    // getWeatherLocations: () => {
    //   return self.weatherLocations
    // },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  // .actions((self) => ({
  //   saveWeatherLocations: (weatherLocationSnapshots: WeatherLocationSnapshot[]) => {
  //     self.weatherLocations.replace(weatherLocationSnapshots)
  //   },
  // }))

  // ! 기상청 api 사용 코드
  .actions((self) => ({
    // ? self.weatherLocations에 새로운 weatherLocation을 추가하는 메소드
    addWeatherLocation: ({ date, time, status, location }: WeatherLocationProps) => {
      const id = self.weatherLocations.reduce((max, weather) => Math.max(max, weather.id), 0) + 1

      // const _location = LocationStoreModel.create()
      // const newLocation = LocationModel.create({
      //   ..._location.getLocation(location.nx, location.ny),
      // })

      const newWeatherLocation = WeatherLocationModel.create({
        id,
        date,
        time,
        status,
        location,
      })

      self.weatherLocations.push(newWeatherLocation)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setWeatherLocations: async ({ base_date, base_time, nx, ny }: WeatherLocationApiProps) => {
      const weatherLocationApi = new WeatherLocationApi()
      const result = await weatherLocationApi.getWeatherLocations({
        base_date,
        base_time,
        nx,
        ny,
      })

      //? with < apisauce >
      if (result.kind === "ok") {
        // self.saveWeatherLocations(result.weatherLocations)
        // ? 결과로 받은 각각의 weatherLocation를 순서대로 self.weatherLocations에 추가하기
        result.weatherLocations.forEach((value, index) => {
          // ? YYYY년 MM월 DD일 텍스트
          let date_text = value.fcstDate
          date_text = `${date_text.slice(0, 4)}년 ${date_text.slice(4, 6)}월 ${date_text.slice(
            6,
          )}일`

          // ? HH:MM 텍스트
          let time_text = value.fcstTime
          time_text = `${time_text.slice(0, 2)}:${time_text.slice(2)}`

          // ? 새로운 weatherLocation 생성하여 추가
          self.addWeatherLocation({
            // date: value.fcstDate,
            date: date_text,
            // time: value.fcstTime,
            time: time_text,
            status: {
              category: value.category,
              fcstValue: parseInt(value.fcstValue),
            },
            location: {
              nx: value.nx,
              ny: value.ny,
            },
          })
        })
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
  }))

type WeatherLocationStoreType = Instance<typeof WeatherLocationStoreModel>
export interface WeatherLocationStore extends WeatherLocationStoreType {}
type WeatherLocationStoreSnapshotType = SnapshotOut<typeof WeatherLocationStoreModel>
export interface WeatherLocationStoreSnapshot extends WeatherLocationStoreSnapshotType {}
export const createWeatherLocationStoreDefaultModel = () =>
  types.optional(WeatherLocationStoreModel, {})
