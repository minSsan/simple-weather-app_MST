import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text } from "../text/text"
import { palette } from "../../theme/palette"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  // flex: 1,
  height: "100%",
}

const TEXT: TextStyle = {
  color: palette.black,
}

const DATE: TextStyle = {
  fontSize: 14,
}

const LOCATION: TextStyle = {
  fontSize: 48,
  fontWeight: "bold",

  marginVertical: 9,
}

const TIME: TextStyle = {
  fontSize: 24,
}

const WEATER_IMG: TextStyle = {
  width: 165,
  height: 136,

  marginTop: 24,

  backgroundColor: "#D9D9D9",
}
export interface ResultPageProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  date: string
  // location: string
  cityName: string
  time: string
}

/**
 * Describe your component here
 */
export const ResultPage = observer(function ResultPage(props: ResultPageProps) {
  const { style, date, cityName, time } = props
  const styles = Object.assign({}, CONTAINER, style)

  return (
    <View style={styles}>
      <Text style={[DATE, TEXT]}>{date}</Text>
      <Text style={[TEXT, LOCATION]}>{cityName}</Text>
      <Text style={[TEXT, TIME]}>{time}</Text>
      <View style={[WEATER_IMG]} />
    </View>
  )
})
