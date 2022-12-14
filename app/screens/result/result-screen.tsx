import React, { FC, useCallback, useEffect, useLayoutEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, useWindowDimensions, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { ResultPage, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { WeatherLocationApi } from "../../services/api/weather-location-api"
import { WeatherLocationStoreModel, WeatherStoreModel } from "../../models"

const ROOT: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  alignItems: "center",
}

const INDICATOR_CONTAINER: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",

  marginTop: 28,
}

const INDICATOR: ViewStyle = {
  width: 10,
  height: 10,
  borderRadius: 25,
  marginHorizontal: 5,
  backgroundColor: "#D9D9D9",
}

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `result: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="result" component={ResultScreen} />`
// Hint: Look for the π₯!

// REMOVE ME! β¬οΈ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const ResultScreen: FC<StackScreenProps<NavigatorParamList, "result">> = observer(
  function ResultScreen({ route }) {
    // const weatherLocationStore = WeatherLocationStoreModel.create({
    //   weatherLocations: [],
    // })

    const weatherStore = WeatherStoreModel.create({
      weathers: [],
    })

    const windowWidth = useWindowDimensions().width

    //* weatherLocation ν­λͺ©λ€(array)μ μ μ₯νλ state
    const [store, setStore] = useState([])

    //* νμ¬ μ¬μ©μκ° λ³΄κ³ μλ νλ©΄μ μΈλ±μ€ λ²νΈλ₯Ό μ μ₯νλ state
    const [activeIndex, setActiveIndex] = useState(0)

    const onFlatListUpdate = useCallback(({ viewableItems }) => {
      console.log(viewableItems)
      if (viewableItems.length > 0) {
        setActiveIndex(viewableItems[0].index)
      }
    }, [])

    useLayoutEffect(() => {
      //? api μ΄μ©ν΄μ μλ΅μΌλ‘ λ°μ κ²°κ³Ό κ°λ€ μ μ₯νκΈ°
      async function fetchData() {
        // await weatherLocationStore.setWeatherLocations({
        //   ...route.params,
        // })
        // setStore(weatherLocationStore.weatherLocations)
        // TODO: rout.params λ‘ cityId μ λ¬λ°κΈ°
        await weatherStore.setWeathers(route.params.cityId)
        setStore(weatherStore.weathers)
      }
      fetchData()
    }, [])

    return (
      <Screen style={ROOT} preset="scroll">
        <View style={INDICATOR_CONTAINER}>
          {store.map((value, index) => (
            <View
              style={[
                INDICATOR,
                { backgroundColor: index === activeIndex ? "#8E8E8E" : "#D9D9D9" },
              ]}
            ></View>
          ))}
        </View>
        <FlatList
          data={store}
          renderItem={({ item }) => (
            <ResultPage
              date={item.date}
              time={item.time}
              cityName={"νμλ ERICA"}
              style={{ width: windowWidth }}
            />
          )}
          horizontal
          // style={{ width: "100%" }}
          showsHorizontalScrollIndicator={false}
          snapToInterval={windowWidth}
          decelerationRate={"fast"}
          viewabilityConfig={{
            viewAreaCoveragePercentThreshold: 50,
          }}
          onViewableItemsChanged={onFlatListUpdate}
        />
      </Screen>
    )
  },
)
