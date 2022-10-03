import { Instance, ISimpleType, SnapshotOut, types } from "mobx-state-tree"
import { Api } from "../../services/api"
import { CAREGIVER_API_CONFIG } from "../../services/api/api-config"
import { LocationModel } from "../location/location"

/**
 * Model description here for TypeScript hints.
 */
export const LocationStoreModel = types
  .model("LocationStore")
  .props({
    locations: types.optional(types.array(LocationModel), []),
  })
  .views((self) => ({
    // getLocation: (nx: number, ny: number) => {
    //   return self.locations.find(
    //     (value) => value.coordinate.nx === nx && value.coordinate.ny === ny,
    //   )
    // },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    addLocation: (location) => {
      self.locations.push(location)
    },
  }))
  .actions((self) => ({
    setLocation: async () => {
      const api = new Api(CAREGIVER_API_CONFIG)
      api.setup()

      const response = await api.getLocations()
      let locations = []
      if (response.kind == "ok") {
        locations = response.locations
      }

      // console.log(locations)

      locations.forEach((value) => {
        self.addLocation(value)
      })
    },
  }))

type LocationStoreType = Instance<typeof LocationStoreModel>
export interface LocationStore extends LocationStoreType {}
type LocationStoreSnapshotType = SnapshotOut<typeof LocationStoreModel>
export interface LocationStoreSnapshot extends LocationStoreSnapshotType {}
export const createLocationStoreDefaultModel = () => types.optional(LocationStoreModel, {})
