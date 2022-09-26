// Use this import if you want to use "env.js" file
// const { API_URL } = require("../../config/env")
// Or just specify it directly like this:
// const API_URL = "http://example.com"
const API_URL = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0"

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
  serviceKey: string
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: API_URL,
  timeout: 10000,
  serviceKey:
    "vCcxPDPprtkDLyR5hdoX4mg6nbpv0KUC/MgO9nEbEZWXyutREW6PXnnaMW6N1yZX/Xv6i1T7lOZYeohhb0/jFQ==",
}
