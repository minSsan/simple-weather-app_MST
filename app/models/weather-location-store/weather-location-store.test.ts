import { WeatherLocationStoreModel } from "./weather-location-store"

test("can be created", () => {
  const instance = WeatherLocationStoreModel.create({})

  expect(instance).toBeTruthy()
})
