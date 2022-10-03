import * as React from "react"
import { useState, useLayoutEffect } from "react"
import { StyleProp, TextStyle, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import DropDownPicker from "react-native-dropdown-picker"
import { LocationStoreModel } from "../../models"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
  borderColor: "#AEAEAE",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

export interface LocationDropdownProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

/**
 * Describe your component here
 */
export const LocationDropdown = observer(function LocationDropdown(props: LocationDropdownProps) {
  const { style, isOpen, setIsOpen, value, setValue } = props
  const styles = Object.assign({}, CONTAINER, style)

  const [store, setStore] = useState([])
  const locationStore = LocationStoreModel.create({
    locations: [],
  })

  const [items, setItems] = useState([
    { label: "서울", value: "1" },
    { label: "부산", value: "2" },
  ])

  useLayoutEffect(() => {
    locationStore.setLocation()
    setStore(locationStore.locations)

    const newItems = store.map((value) => {
      return {
        label: value.cityName,
        value: "" + value.id,
      }
    })
    console.log("-------- newItems")
    console.log(newItems) // []

    setItems(newItems)
  }, [])

  return (
    <DropDownPicker
      placeholder={value}
      style={styles}
      items={items}
      setItems={setItems}
      open={isOpen}
      setOpen={setIsOpen}
      value={value}
      setValue={setValue}
    />
  )
})
