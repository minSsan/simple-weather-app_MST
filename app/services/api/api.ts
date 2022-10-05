import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  /**
   * Gets a list of users.
   */
  async getUsers(): Promise<Types.GetUsersResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    const convertUser = (raw) => {
      return {
        id: raw.id,
        name: raw.name,
      }
    }

    // transform the data into the format we are expecting
    try {
      const rawUsers = response.data
      const resultUsers: Types.User[] = rawUsers.map(convertUser)
      return { kind: "ok", users: resultUsers }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * Gets a single user by ID
   */

  async getUser(id: string): Promise<Types.GetUserResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users/${id}`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const resultUser: Types.User = {
        id: response.data.id,
        name: response.data.name,
      }
      return { kind: "ok", user: resultUser }
    } catch {
      return { kind: "bad-data" }
    }
  }

  // async getCityName(cityId: number) {
  //   const response: ApiResponse<any> = await this.apisauce.get(`/city/${cityId}`)

  //   if (!response.ok) {
  //     const problem = getGeneralApiProblem(response)
  //     if (problem) return problem
  //   }

  //   try {
  //     const city = response.data.city
  //     return { kind: "ok", cityName: city.cityName }
  //   } catch {
  //     return { kind: "bad-data" }
  //   }
  // }

  // private weatherDataFormatter(data: Types.WeatherObject) {
  //   const date = new Date(data.expectedDate)

  //   const year = date.getFullYear()
  //   const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
  //   const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
  //   const date_text = `${year}년 ${month}월 ${day}일`

  //   const hours = date.getUTCHours() < 10 ? "0" + date.getUTCHours() : date.getUTCHours()
  //   const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
  //   const time_text = `${hours}:${minutes}`

  //   return {
  //     date: date_text,
  //     time: time_text,
  //     isThunder: data.isThunder,
  //     rainfall: data.rainfall,
  //     temperature: data.temperature,
  //     windSpeed: data.windSpeed,
  //   }
  // }

  // private locationDataFormatter(city: Types.CityObject) {
  //   return {
  //     id: city.id,
  //     cityName: city.cityName,
  //   }
  // }

  // async getWeathers(cityId: number) {
  //   const response: ApiResponse<any> = await this.apisauce.get(`/weather/${cityId}`)

  //   // console.log(response.data.weather)
  //   let weathers: Array<any> = response.data.weather

  //   if (!response.ok) {
  //     const problem = getGeneralApiProblem(response)
  //     if (problem) return problem
  //   }

  //   try {
  //     weathers = weathers.map((value) => this.weatherDataFormatter(value))
  //     return { kind: "ok", weathers }
  //   } catch {
  //     return { kind: "bad-data" }
  //   }
  // }

  // async getLocations() {
  //   const response: ApiResponse<any> = await this.apisauce.get(`/city/`)

  //   if (!response.ok) {
  //     const problem = getGeneralApiProblem(response)
  //     if (problem) return problem
  //   }

  //   let locations: Array<any> = response.data.city

  //   try {
  //     locations = locations.map((value) => this.locationDataFormatter(value))
  //     return { kind: "ok", locations }
  //   } catch {
  //     return { kind: "bad-data" }
  //   }
  // }
}
