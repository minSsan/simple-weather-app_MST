# π‘ μ΄λ¨κΈ° κΈ°μ μμΈ‘ μ± μ μ νλ‘μ νΈ (React Native)
> <strong>Mobx-State-Tree</strong> μ <strong>REST API</strong> νμ΅μ μν΄ μ§νν νλ‘μ νΈμλλ€.<br>
> [μ€ν°λ κΈ°λ‘ λΈμ νμ΄μ§](https://www.notion.so/SimpleWeatherApp-63c8050079e544c5ae99f877884293ef)
<br>

## π νΌκ·Έλ§(figma)
> νΌκ·Έλ§λ₯Ό μ΄μ©νμ¬ UI/UX λμμΈλ ν¨κ» μ§ννμμ΅λλ€.<br>
> [νΌκ·Έλ§ λ§ν¬](https://www.figma.com/file/29nShyhbWz7m2eiMpJLwQ4/%EB%B0%95%EB%AF%BC%EC%84%A0?node-id=15%3A38)<br>
> <img width="536" alt="image" src="https://user-images.githubusercontent.com/63039855/193817490-01df343d-74c5-46b1-a045-8439d5f532f0.png">

<br>

## βοΈ κΈ°μμ²­ API
> [κΈ°μμ²­ API λ§ν¬ - νμκ°μ λ° μ μ²­ νμ](https://www.data.go.kr/iim/api/selectAPIAcountView.do)
<br>

## βοΈ CareGiver λ°±μλ API
### π readOneCity - city id κ°μΌλ‘ λμ μ λ³΄ λΆλ¬μ€κΈ°
---
### ππ» μμ 

#### Request 
> ```
> GET μΌμ΄κΈ°λ²_μλ²_λλ©μΈ/api/v1/city/4
> ```
#### Response
> ```JSON
> {
>    "ok": true,
>    "city": {
>        "id": 4,
>        "createAt": "2022-09-22T17:25:57.913Z",
>        "updatedAt": "2022-09-22T17:25:57.913Z",
>        "cityName": "λμ ",
>        "address": "λμ κ΄μ­μ μκ΅¬ λμ°λ‘ 100",
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

### π readWeathersByCity - city id κ°μΌλ‘ ν΄λΉ λμμ λ μ¨ μμΈ‘ μ λ³΄ λΆλ¬μ€κΈ°
---
### ππ» μμ 

#### Request
> ```
> GET μΌμ΄κΈ°λ²_μλ²_λλ©μΈ/weather/10
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

### π readAllCity - λͺ¨λ  city μ λ³΄ λΆλ¬μ€κΈ°
---
### ππ» μμ 

#### Request
> ```
> GET μΌμ΄κΈ°λ²_μλ²_λλ©μΈ/city/
> ```
#### Response
```JSON
{
    "city": [
        {
            "id": 1,
            "createAt": "2022-09-21T20:59:53.549Z",
            "updatedAt": "2022-09-21T20:59:53.549Z",
            "cityName": "μ§μ ",
            "address": "κ²½κΈ°λ λ¨μμ£Όμ μ§μ μ κΈκ°λ‘ 1530-14",
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
            "cityName": "μμΈ",
            "address": "μμΈνΉλ³μ μ€κ΅¬ μΈμ’λλ‘ 110",
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
            "cityName": "μΈμ²",
            "address": "μΈμ²κ΄μ­μ λ¨λκ΅¬ μ κ°λ‘ 29",
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
            "cityName": "λμ ",
            "address": "λμ κ΄μ­μ μκ΅¬ λμ°λ‘ 100",
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
            "cityName": "λκ΅¬",
            "address": "λκ΅¬κ΄μ­μ μ€κ΅¬ κ³΅νλ‘ 88",
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
            "cityName": "μΈμ°",
            "address": "μΈμ°κ΄μ­μ λ¨κ΅¬ μ€μλ‘ 201",
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
            "cityName": "λΆμ°",
            "address": "λΆμ°κ΄μ­μ μ°μ κ΅¬ μ€μλλ‘ 1001",
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
            "cityName": "κ΄μ£Ό",
            "address": "κ΄μ£Όκ΄μ­μ μκ΅¬ λ΄λ°©λ‘ 111",
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
            "cityName": "μΈμ’",
            "address": "μΈμ’μ νλλ¦¬λλ‘ 2130",
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
            "cityName": "νμλ ERICA",
            "address": "κ²½κΈ°λ μμ°μ μλ‘κ΅¬ νμλνλ‘ 55",
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
