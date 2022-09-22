import { WeatherLocationModel } from "./weather-location"

test("can be created", () => {
  const instance = WeatherLocationModel.create({})

  expect(instance).toBeTruthy()
})
