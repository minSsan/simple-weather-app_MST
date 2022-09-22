import React, { FC, useLayoutEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, Pressable, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { navigate, NavigatorParamList } from "../../navigators"
import { Button, LikedLocationButton, LocationDropdown, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { palette } from "../../theme/palette"
import Clock from "react-live-clock"

const ROOT: ViewStyle = {
  // backgroundColor: color.palette.black,
  flex: 1,

  padding: 20,
  backgroundColor: "#F6F6F6",
}

const CONTAINER: ViewStyle = {
  marginTop: 80,
  flexDirection: "column",
  alignItems: "center",
}

const TIME: ViewStyle = {
  marginTop: 18,
  color: palette.black,
  fontSize: 48,
  fontWeight: "bold",
  textShadowColor: "rgba(0, 0, 0, 0.25)",
  textShadowOffset: { width: 0, height: 3 },
  textShadowRadius: 4,
}

const CHECK_BUTTON: ViewStyle = {
  width: 169,
  height: 50,

  alignItems: "center",
  justifyContent: "center",

  backgroundColor: palette.white,

  borderWidth: 1,
  borderRadius: 15,
  borderColor: "#ECECEC",

  shadowColor: "rgba(0, 0, 0, 0.25)",
  shadowOffset: { width: 0, height: 4 },
  shadowRadius: 4,
  elevation: 4,
}

export const HomeScreen: FC<StackScreenProps<NavigatorParamList, "home">> = observer(
  function HomeScreen({ navigation }) {
    //* ------------- 현재 날짜 텍스트
    //? 년/월/일 텍스트
    const [dateText, setDateText] = useState("")
    //* --------------------------

    //* ------------ 현재 시간 텍스트
    //? 시간이 바뀔 때마다 setTimeText를 호출해야 함 -> setInterval
    const [timeText, setTimeText] = useState("")

    useLayoutEffect(() => {
      setInterval(() => {
        const now = new Date()

        //? 현재 시각 구하기 (한국 시간 기준으로)
        const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000
        const KR_TIME_DIFF = 9 * 60 * 60 * 1000
        const krNow = new Date(utc + KR_TIME_DIFF)

        const hour = krNow.getHours() < 10 ? "0" + krNow.getHours() : krNow.getHours()
        const minutes = krNow.getMinutes() < 10 ? "0" + krNow.getMinutes() : krNow.getMinutes()
        setTimeText(`${hour}:${minutes}`)

        //? 현재 날짜 구하기
        const year = now.getFullYear()
        const month_value = now.getMonth() + 1
        const month = month_value < 10 ? "0" + month_value : month_value
        const day = now.getDate() < 10 ? "0" + now.getDate() : now.getDate()
        setDateText(`${year}년 ${month}월 ${day}일`)
      }, 1000)
    }, [])
    //* --------------------------

    //* ------------ 즐겨찾기 리스트
    //? 즐겨찾기된 지역 목록
    const [likedLocation, setLikedLocation] = useState([])

    useLayoutEffect(() => {
      // TODO 서버에 저장된 즐겨찾기 리스트 받아와서 할 것
      setLikedLocation(["서울", "부산", "안산"])
    }, [])
    //* ------------------------

    //* ------------ 즐겨찾기 드롭박스
    //? 지역 선택 드롭박스에서 사용되는 state값
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("지역 선택")

    //? 즐겨찾기 버튼 누를 때
    const handlePress = (item: string) => {
      setValue(item)
    }
    //* -------------------

    //* ------------ 확인하기 버튼
    const handleSubmit = () => {
      let now = new Date()
      let hours = now.getHours()
      let minutes = now.getMinutes()

      if (minutes - 30 > 30) {
        minutes = 30
      } else if (minutes - 30 > 0) {
        minutes = 0
      } else {
        minutes = 30
        if (hours - 1 < 0) {
          hours = 24
        }
        hours = hours - 1
      }

      const timeData = `${hours < 10 ? "0" + hours : hours}${
        minutes < 10 ? "0" + minutes : minutes
      }`

      const year = now.getFullYear()
      const month = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1
      const day = now.getDate() < 10 ? "0" + now.getDate() : now.getDate()

      const dateData = `${year}${month}${day}`

      const request = {
        base_date: dateData,
        base_time: timeData,
        nx: 60,
        ny: 127,
      }
      //TODO: result 페이지로 이동
      console.log(request)
      navigation.navigate("result", request)
    }

    return (
      <Screen style={ROOT} preset="scroll">
        {/* //? 로그인 회원가입 버튼 */}
        <Button
          text="로그인/회원가입"
          style={{
            width: "35%",
            backgroundColor: palette.white,

            borderColor: palette.black,
            borderWidth: 1,
            borderRadius: 0,
          }}
          textStyle={{
            fontSize: 12,
            fontWeight: "bold",
            color: palette.black,
          }}
        />

        {/* //? 메인 콘텐츠 (현재 날짜/시간 & 지역 선택 드롭다운) */}
        <View style={CONTAINER}>
          {/* //? 현재 날짜 (YYYY년 MM월 DD일) */}
          <Text style={{ color: palette.black, fontSize: 20 }}>{dateText}</Text>
          {/* //? 현재 시각 (HH:MM) */}
          <Text style={TIME}>{timeText}</Text>
          {/* <Clock format={"HH:MM"} ticking={true} /> */}

          {/* //? 지역 선택 드롭박스 */}
          <LocationDropdown
            isOpen={open}
            setIsOpen={setOpen}
            value={value}
            setValue={setValue}
            style={{ marginTop: 51 }}
          />
        </View>

        {/* //? 즐겨찾기 목록 */}
        <Text style={{ marginTop: 26, fontSize: 14, color: palette.black }}>⭐️ 즐겨찾기 목록</Text>
        {/* //? 즐겨찾기 지역 리스트 */}
        <View>
          <FlatList
            data={likedLocation}
            // FlatList가 추적할 state를 extraData로 지정한다
            extraData={likedLocation}
            renderItem={({ item, index }) => (
              <LikedLocationButton
                text={item}
                style={{ marginTop: 8, marginLeft: index > 0 ? 15 : 0 }}
                onPress={() => handlePress(item)}
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* //? 확인하기 버튼 */}
        <View style={{ marginTop: 88, alignItems: "center", overflow: "visible" }}>
          <Pressable style={CHECK_BUTTON} onPress={handleSubmit}>
            <Text style={{ color: palette.black, fontWeight: "bold" }}>✔️ 확인하기</Text>
          </Pressable>
        </View>
      </Screen>
    )
  },
)

//* 스타일링시 참고
{
  /* <BlurView/>  */
}
// https://docs.expo.dev/versions/latest/sdk/blur-view/
