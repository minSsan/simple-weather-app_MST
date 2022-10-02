// Use this import if you want to use "env.js" file
// const { API_URL } = require("../../config/env")
// Or just specify it directly like this:
// const API_URL = "http://example.com"
//! 기상청 서버 API
const AGENCY_API_URL = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0"
//! 케어기버 서버 API
const CAREGIVER_API_URL = "http://ec2-3-36-101-9.ap-northeast-2.compute.amazonaws.com:3000/api/v1"
/**
 * The options used to configure the API.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
  serviceKey?: string
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: AGENCY_API_URL,
  timeout: 10000,
  serviceKey:
    "vCcxPDPprtkDLyR5hdoX4mg6nbpv0KUC/MgO9nEbEZWXyutREW6PXnnaMW6N1yZX/Xv6i1T7lOZYeohhb0/jFQ==",
}

export const CAREGIVER_API_CONFIG: ApiConfig = {
  url: CAREGIVER_API_URL,
  timeout: 10000,
}
