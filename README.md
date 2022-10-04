# 💡 초단기 기상 예측 앱 제작 프로젝트 (React Native)
> <strong>Mobx-State-Tree</strong> 와 <strong>REST API</strong> 학습을 위해 진행한 프로젝트입니다.<br>
> [스터디 기록 노션 페이지](https://www.notion.so/SimpleWeatherApp-63c8050079e544c5ae99f877884293ef)
<br>

## 🖋 피그마(figma)
> 피그마를 이용하여 UI/UX 디자인도 함께 진행하였습니다.<br>
> [피그마 링크](https://www.figma.com/file/29nShyhbWz7m2eiMpJLwQ4/%EB%B0%95%EB%AF%BC%EC%84%A0?node-id=15%3A38)
<br>

## ✔️ 기상청 API
> [기상청 API 링크 - 회원가입 및 신청 필요](https://www.data.go.kr/iim/api/selectAPIAcountView.do)
<br>

## ✔️ CareGiver 백엔드 API
### 🌟 readOneCity - city id 값으로 도시 정보 불러오기
---
### 👇🏻 예제

#### Request 
> ```
> GET http://ec2-3-36-101-9.ap-northeast-2.compute.amazonaws.com:3000/api/v1/city/4
> ```
#### Response
> ```JSON
> {
>    "ok": true,
>    "city": {
>        "id": 4,
>        "createAt": "2022-09-22T17:25:57.913Z",
>        "updatedAt": "2022-09-22T17:25:57.913Z",
>        "cityName": "대전",
>        "address": "대전광역시 서구 둔산로 100",
>        "location": {
>            "type": "Point",
>            "coordinates": [
>                67,
>                80
>            ]
>        }
>    }
>}
> ```
<br>

### 🌟 readWeathersByCity - city id 값으로 해당 도시의 날씨 예측 정보 불러오기
---
### 👇🏻 예제

#### Request
> ```
> GET http://ec2-3-36-101-9.ap-northeast-2.compute.amazonaws.com:3000/api/v1/weather/10
> ```
#### Response
> ```JSON
> {
>    "ok": true,
>    "weather": [
>        {
>            "id": 7741,
>            "createAt": "2022-09-30T22:00:00.675Z",
>            "updatedAt": "2022-09-30T22:00:00.675Z",
>            "expectedDate": "2022-10-01T16:00:00.000Z",
>            "temperature": 27,
>            "rainfall": "NONE",
>            "precipitation": 0,
>            "cloudStatus": "SUN",
>            "humidity": 45,
>            "windSpeed": 2,
>            "isThunder": false
>        },
>        {
>            "id": 7739,
>            "createAt": "2022-09-30T22:00:00.675Z",
>            "updatedAt": "2022-09-30T22:00:00.675Z",
>            "expectedDate": "2022-10-01T17:00:00.000Z",
>            "temperature": 26,
>            "rainfall": "NONE",
>            "precipitation": 0,
>            "cloudStatus": "CLOUD",
>            "humidity": 55,
>            "windSpeed": 2,
>            "isThunder": false
>        },
>        {
>            "id": 7745,
>            "createAt": "2022-09-30T22:00:00.697Z",
>            "updatedAt": "2022-09-30T22:00:00.697Z",
>            "expectedDate": "2022-10-01T18:00:00.000Z",
>            "temperature": 23,
>            "rainfall": "NONE",
>            "precipitation": 0,
>            "cloudStatus": "CLOUD",
>            "humidity": 60,
>            "windSpeed": 1,
>            "isThunder": false
>        },
>        {
>            "id": 7742,
>            "createAt": "2022-09-30T22:00:00.676Z",
>            "updatedAt": "2022-09-30T22:00:00.676Z",
>            "expectedDate": "2022-10-01T19:00:00.000Z",
>            "temperature": 22,
>            "rainfall": "NONE",
>            "precipitation": 0,
>            "cloudStatus": "CLOUD",
>            "humidity": 70,
>            "windSpeed": 1,
>            "isThunder": false
>        },
>        {
>            "id": 7743,
>            "createAt": "2022-09-30T22:00:00.689Z",
>            "updatedAt": "2022-09-30T22:00:00.689Z",
>            "expectedDate": "2022-10-01T20:00:00.000Z",
>            "temperature": 21,
>            "rainfall": "NONE",
>            "precipitation": 0,
>            "cloudStatus": "OVERCAST",
>            "humidity": 70,
>            "windSpeed": 1,
>            "isThunder": false
>        },
>        {
>            "id": 7748,
>            "createAt": "2022-09-30T22:00:00.697Z",
>            "updatedAt": "2022-09-30T22:00:00.697Z",
>            "expectedDate": "2022-10-01T21:00:00.000Z",
>            "temperature": 20,
>            "rainfall": "NONE",
>            "precipitation": 0,
>            "cloudStatus": "OVERCAST",
>            "humidity": 75,
>            "windSpeed": 1,
>            "isThunder": false
>        }
>    ]
>}
> ```
<br>

### 🌟 readAllCity - 모든 city 정보 불러오기
---
### 👇🏻 예제

#### Request
> ```
> GET http://ec2-3-36-101-9.ap-northeast-2.compute.amazonaws.com:3000/api/v1/city/
> ```
#### Response
```JSON
{
    "city": [
        {
            "id": 1,
            "createAt": "2022-09-21T20:59:53.549Z",
            "updatedAt": "2022-09-21T20:59:53.549Z",
            "cityName": "진접",
            "address": "경기도 남양주시 진접읍 금강로 1530-14",
            "location": {
                "type": "Point",
                "coordinates": [
                    63,
                    50
                ]
            }
        },
        {
            "id": 2,
            "createAt": "2022-09-22T17:24:40.114Z",
            "updatedAt": "2022-09-22T17:24:40.114Z",
            "cityName": "서울",
            "address": "서울특별시 중구 세종대로 110",
            "location": {
                "type": "Point",
                "coordinates": [
                    60,
                    53
                ]
            }
        },
        {
            "id": 3,
            "createAt": "2022-09-22T17:25:30.881Z",
            "updatedAt": "2022-09-22T17:25:30.881Z",
            "cityName": "인천",
            "address": "인천광역시 남동구 정각로 29",
            "location": {
                "type": "Point",
                "coordinates": [
                    55,
                    56
                ]
            }
        },
        {
            "id": 4,
            "createAt": "2022-09-22T17:25:57.913Z",
            "updatedAt": "2022-09-22T17:25:57.913Z",
            "cityName": "대전",
            "address": "대전광역시 서구 둔산로 100",
            "location": {
                "type": "Point",
                "coordinates": [
                    67,
                    80
                ]
            }
        },
        {
            "id": 5,
            "createAt": "2022-09-22T17:26:22.899Z",
            "updatedAt": "2022-09-22T17:26:22.899Z",
            "cityName": "대구",
            "address": "대구광역시 중구 공평로 88",
            "location": {
                "type": "Point",
                "coordinates": [
                    89,
                    89
                ]
            }
        },
        {
            "id": 6,
            "createAt": "2022-09-22T17:27:05.763Z",
            "updatedAt": "2022-09-22T17:27:05.763Z",
            "cityName": "울산",
            "address": "울산광역시 남구 중앙로 201",
            "location": {
                "type": "Point",
                "coordinates": [
                    102,
                    84
                ]
            }
        },
        {
            "id": 7,
            "createAt": "2022-09-22T17:27:29.567Z",
            "updatedAt": "2022-09-22T17:27:29.567Z",
            "cityName": "부산",
            "address": "부산광역시 연제구 중앙대로 1001",
            "location": {
                "type": "Point",
                "coordinates": [
                    98,
                    76
                ]
            }
        },
        {
            "id": 8,
            "createAt": "2022-09-22T17:28:13.856Z",
            "updatedAt": "2022-09-22T17:28:13.856Z",
            "cityName": "광주",
            "address": "광주광역시 서구 내방로 111",
            "location": {
                "type": "Point",
                "coordinates": [
                    58,
                    74
                ]
            }
        },
        {
            "id": 9,
            "createAt": "2022-09-22T17:28:41.871Z",
            "updatedAt": "2022-09-22T17:28:41.871Z",
            "cityName": "세종",
            "address": "세종시 한누리대로 2130",
            "location": {
                "type": "Point",
                "coordinates": [
                    66,
                    77
                ]
            }
        },
        {
            "id": 10,
            "createAt": "2022-09-22T17:29:14.766Z",
            "updatedAt": "2022-09-22T17:29:14.766Z",
            "cityName": "한양대 ERICA",
            "address": "경기도 안산시 상록구 한양대학로 55",
            "location": {
                "type": "Point",
                "coordinates": [
                    57,
                    59
                ]
            }
        }
    ],
    "ok": true
}
```
