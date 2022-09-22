import * as React from "react"
import { Pressable, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text } from "../text/text"
import { palette } from "../../theme/palette"

const CONTAINER: ViewStyle = {
  width: 155,
  height: 155,

  justifyContent: "center",
  alignItems: "center",

  backgroundColor: palette.white,
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 20,
  fontWeight: "bold",
  color: "#454545",
}

export interface LikedLocationButtonProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  text?: string
  onPress?: (item: any) => void
}

/**
 * Describe your component here
 */
export const LikedLocationButton = observer(function LikedLocationButton(
  props: LikedLocationButtonProps,
) {
  const { style, text, onPress } = props
  const styles = Object.assign({}, CONTAINER, style)

  return (
    <Pressable style={styles} onPress={onPress}>
      <Text style={TEXT}>{text}</Text>
    </Pressable>
  )
})
