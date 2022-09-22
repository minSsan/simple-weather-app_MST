import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text } from "../text/text"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
  // flex: 1,
  width: "100%",
  height: "100%",
  backgroundColor: "red",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

export interface ResultPageProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  date: string
  location: string
  time: string
}

/**
 * Describe your component here
 */
export const ResultPage = observer(function ResultPage(props: ResultPageProps) {
  const { style, date, location, time } = props
  const styles = Object.assign({}, CONTAINER, style)

  return (
    <View style={styles}>
      <Text>{date}</Text>
      <Text>{location}</Text>
      <Text>{time}</Text>
    </View>
  )
})
