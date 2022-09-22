import { Instance, ISimpleType, SnapshotOut, types } from "mobx-state-tree"
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
    getLocation: (nx: number, ny: number) => {
      return self.locations.find(
        (value) => value.coordinate.nx === nx && value.coordinate.ny === ny,
      )
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    addLocation: (name: string, coordinate: { nx: number; ny: number }) => {
      const id = self.locations.reduce((max, location) => Math.max(max, location.id), 0) + 1
      const newLocation = LocationModel.create({
        id: id,
        name: name,
        coordinate: coordinate,
      })
      self.locations.unshift(newLocation)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type LocationStoreType = Instance<typeof LocationStoreModel>
export interface LocationStore extends LocationStoreType {}
type LocationStoreSnapshotType = SnapshotOut<typeof LocationStoreModel>
export interface LocationStoreSnapshot extends LocationStoreSnapshotType {}
export const createLocationStoreDefaultModel = () => types.optional(LocationStoreModel, {})
