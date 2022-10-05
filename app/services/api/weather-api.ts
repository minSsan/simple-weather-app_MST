import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { CAREGIVER_API_CONFIG } from "./api-config"
import { getGeneralApiProblem } from "./api-problem"
import { CityObject, WeatherObject } from "./api.types"

export class WeatherApi {
  private api: Api = new Api(CAREGIVER_API_CONFIG)

  constructor() {
    this.api.setup()
  }

  async getCityName(cityId: number) {
    const response: ApiResponse<any> = await this.api.apisauce.get(`/city/${cityId}`)

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const city: CityObject = response.data.city
      return { kind: "ok", cityName: city.cityName }
    } catch {
      return { kind: "bad-data" }
    }
  }

  private weatherDataFormatter(data: WeatherObject) {
    const date = new Date(data.expectedDate)

    const year = date.getFullYear()
    const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
    const date_text = `${year}년 ${month}월 ${day}일`

    const hours = date.getUTCHours() < 10 ? "0" + date.getUTCHours() : date.getUTCHours()
    const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
    const time_text = `${hours}:${minutes}`

    return {
      date: date_text,
      time: time_text,
      isThunder: data.isThunder,
      rainfall: data.rainfall,
      temperature: data.temperature,
      windSpeed: data.windSpeed,
    }
  }

  private locationDataFormatter(city: CityObject) {
    return {
      id: city.id,
      cityName: city.cityName,
    }
  }

  async getWeathers(cityId: number) {
    const response: ApiResponse<any> = await this.api.apisauce.get(`/weather/${cityId}`)

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    let weathers = response.data.weather

    try {
      weathers = weathers.map((value) => this.weatherDataFormatter(value))
      return { kind: "ok", weathers }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async getLocations() {
    const response: ApiResponse<any> = await this.api.apisauce.get(`/city/`)

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    let locations: Array<any> = response.data.city

    try {
      locations = locations.map((value) => this.locationDataFormatter(value))
      return { kind: "ok", locations }
    } catch {
      return { kind: "bad-data" }
    }
  }
}
