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
import { WeatherLocationStoreModel } from "../../models"

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
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const ResultScreen: FC<StackScreenProps<NavigatorParamList, "result">> = observer(
  function ResultScreen({ route }) {
    const weatherLocationStore = WeatherLocationStoreModel.create({
      weatherLocations: [],
    })

    const windowWidth = useWindowDimensions().width

    //* weatherLocation 항목들(array)을 저장하는 state
    const [store, setStore] = useState([])

    //* 현재 사용자가 보고있는 화면의 인덱스 번호를 저장하는 state
    const [activeIndex, setActiveIndex] = useState(0)

    const onFlatListUpdate = useCallback(({ viewableItems }) => {
      console.log(viewableItems)
      if (viewableItems.length > 0) {
        setActiveIndex(viewableItems[0].index)
      }
    }, [])

    //! flatlist의 viewableItemsChanged를 사용할 때 함수가 재생성되면 에러를 발생시킴 -> useCallback
    const fetchData = useCallback(async function () {
      await weatherLocationStore.setWeatherLocations({
        ...route.params,
      })
      setStore(weatherLocationStore.weatherLocations)
    }, [])

    useLayoutEffect(() => {
      // TODO: api 이용해서 응답으로 받은 결과 값들 저장하기
      //? API를 여기서 호출하고, 호출 받은 리스트의 각 요소마다 addWeatherLocation 적용(map)
      // async function fetchData() {
      //   await weatherLocationStore.setWeatherLocations({
      //     ...route.params,
      //   })
      //   setStore(weatherLocationStore.weatherLocations)
      // }
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
              location={"서울"}
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
