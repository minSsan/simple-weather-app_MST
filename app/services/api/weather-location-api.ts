import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { getGeneralApiProblem } from "./api-problem"
import axios from "axios"
import { DEFAULT_API_CONFIG } from "./api-config"

interface getWeatherLocationsProps {
  base_date: string
  base_time: string
  nx: number
  ny: number
}

interface responseProps {
  category: string
  fcstDate: string
  fcstTime: string
  fcstValue: string
  nx: number
  ny: number
}

export class WeatherLocationApi {
  private api: Api

  constructor(api: Api = new Api()) {
    this.api = api
  }

  async getWeatherLocations({ base_date, base_time, nx, ny }: getWeatherLocationsProps) {
    //? apisauce로 구현
    this.api.setup()

    const _response: ApiResponse<any> = await this.api.apisauce.get("/getUltraSrtFcst", {
      serviceKey: this.api.config.serviceKey,
      numOfRows: 6,
      pageNo: 1,
      dataType: "JSON",
      base_date,
      base_time,
      nx,
      ny,
    })

    if (!_response.ok) {
      const problem = getGeneralApiProblem(_response)
      if (problem) {
        return problem
      }
    }

    // console.log(_response)
    let weatherLocations: Array<responseProps> = _response.data.response.body.items.item
    // console.log("weather locations: ", weatherLocations)
    weatherLocations = weatherLocations.map((value) => {
      // ? 불필요한 base date, base time 제외하고 전달
      return {
        fcstDate: value.fcstDate,
        fcstTime: value.fcstTime,
        category: value.category,
        fcstValue: value.fcstValue,
        nx: value.nx,
        ny: value.ny,
      }
    })

    return { kind: "ok", weatherLocations }

    //? axios 로 구현
    // try {
    //   const response = await axios.get(
    //     "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst",
    //     {
    //       params: {
    //         serviceKey:
    //           "vCcxPDPprtkDLyR5hdoX4mg6nbpv0KUC/MgO9nEbEZWXyutREW6PXnnaMW6N1yZX/Xv6i1T7lOZYeohhb0/jFQ==",
    //         numOfRows: 6,
    //         pageNo: 1,
    //         dataType: "JSON",
    //         base_date,
    //         base_time,
    //         nx,
    //         ny,
    //       },
    //     },
    //   )
    //   //   const weatherLocations: Array<responseProps> = response.data.response.body.items.item
    //   return { weatherLocations: response.data.response.body.items.item }
    // } catch (error) {
    //   console.error(error)
    // }
  }
}
