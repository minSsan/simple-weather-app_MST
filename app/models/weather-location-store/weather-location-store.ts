import { Instance, ISimpleType, SnapshotOut, types } from "mobx-state-tree"
import { WeatherLocationApi } from "../../services/api/weather-location-api"
import { withEnvironment } from "../extensions/with-environment"
import { WeatherLocationModel } from "../weather-location/weather-location"

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
  .actions((self) => ({
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
        result.weatherLocations.forEach((value, index) => {
          self.addWeatherLocation({
            date: value.fcstDate,
            time: value.fcstTime,
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

      //? with < axios >
      // if (result.weatherLocations) {
      //   result.weatherLocations.forEach((value, index) => {
      //     self.addWeatherLocation({
      //       date: value.fcstDate,
      //       time: value.fcstTime,
      //       status: {
      //         category: value.category,
      //         fcstValue: parseInt(value.fcstValue),
      //       },
      //       location: {
      //         nx: value.nx,
      //         ny: value.ny,
      //       },
      //     })
      //   })
      // }
    },
  }))

type WeatherLocationStoreType = Instance<typeof WeatherLocationStoreModel>
export interface WeatherLocationStore extends WeatherLocationStoreType {}
type WeatherLocationStoreSnapshotType = SnapshotOut<typeof WeatherLocationStoreModel>
export interface WeatherLocationStoreSnapshot extends WeatherLocationStoreSnapshotType {}
export const createWeatherLocationStoreDefaultModel = () =>
  types.optional(WeatherLocationStoreModel, {})
