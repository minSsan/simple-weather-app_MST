import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { getGeneralApiProblem } from "./api-problem"
import axios from "axios"

interface getWeatherLocationsProps {
  base_date: string
  base_time: string
  nx: number
  ny: number
}

interface responseProps {
  category: string
  fcstTime: string
  fcstValue: string
  nx: number
  ny: number
}

export class WeatherLocationApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getWeatherLocations({ base_date, base_time, nx, ny }: getWeatherLocationsProps) {
    try {
      const response = await axios.get(
        "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst",
        {
          params: {
            serviceKey:
              "vCcxPDPprtkDLyR5hdoX4mg6nbpv0KUC/MgO9nEbEZWXyutREW6PXnnaMW6N1yZX/Xv6i1T7lOZYeohhb0/jFQ==",
            numOfRows: 6,
            pageNo: 1,
            dataType: "JSON",
            base_date,
            base_time,
            nx,
            ny,
          },
        },
      )
      //   const weatherLocations: Array<responseProps> = response.data.response.body.items.item
      return { weatherLocations: response.data.response.body.items.item }
    } catch (error) {
      console.error(error)
    }

    // await axios
    //   .get("http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst", {
    //     params: {
    //       serviceKey:
    //         "vCcxPDPprtkDLyR5hdoX4mg6nbpv0KUC/MgO9nEbEZWXyutREW6PXnnaMW6N1yZX/Xv6i1T7lOZYeohhb0/jFQ==",
    //       numOfRows: 6,
    //       pageNo: 1,
    //       dataType: "JSON",
    //       base_date,
    //       base_time,
    //       nx,
    //       ny,
    //     },
    //   })
    //   .then((response) => {
    //     const weatherLocations: Array<responseProps> = response.data.response.body.items.item
    //     console.log("weather loactions: ", weatherLocations)
    //     return { weatherLocations }
    //   })
    //   .catch((response) => response)

    //   const response: ApiResponse<any> = await this.api.apisauce.get(
    //     "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst",
    //     {
    //       serviceKey:
    //         "vCcxPDPprtkDLyR5hdoX4mg6nbpv0KUC%2FMgO9nEbEZWXyutREW6PXnnaMW6N1yZX%2FXv6i1T7lOZYeohhb0%2FjFQ%3D%3D",
    //       numOfRows: 6,
    //       pageNo: 1,
    //       dataType: "JSON",
    //       base_date,
    //       base_time,
    //       nx,
    //       ny,
    //     },
    //   )

    //   console.log("========== response")
    //   console.log(response)

    //   if (!response.ok) {
    //     const problem = getGeneralApiProblem(response)
    //     if (problem) return problem
    //     return problem
    //   }

    // const weatherLocations: Array<responseProps> = response.data.items.item
    // console.log("weather loactions: ", weatherLocations)

    //   return { kind: "ok", weatherLocations }
  }
}
