# typelize
A cli tool converting a json to mongoose schema

## Intallation
```command
$ npm i -g typelize
```

## Usage

```
<!--input-->
$ typelize ./data.json

<!--output-->
$ new file ./typelize-result.json is created
                              _   _                      _                          _
 | |_   _   _   _ __     ___  | | (_)  ____   ___      __| |   ___    _ __     ___  | |
 | __| | | | | | '_ \   / _ \ | | | | |_  /  / _ \    / _` |  / _ \  | '_ \   / _ \ | |
 | |_  | |_| | | |_) | |  __/ | | | |  / /  |  __/   | (_| | | (_) | | | | | |  __/ |_|
  \__|  \__, | | .__/   \___| |_| |_| /___|  \___|    \__,_|  \___/  |_| |_|  \___| (_)
        |___/  |_|
```

## Example

#### input
```
<!--./data.json-->
{
    "_id": "webdev",
    "instructors": 
        {
            "email": "amazingandyyy@gmail.com",
            "firstName": "Andy",
            "lastName": "Chen",
            "phone": 12233445566,
            "bio": "Andy is a js ninja",
            "linkedinURL": "https://www.linkedin.com/in/amazingandyyy",
            "_id": "58b0e6fd74e18ef81a8cb12e",
            "previousPosition": [{
                "affiliation": "Multiple Open Source projects",
                "position": "Contributor"
            }],
            "cccomments": {
                "affiliation": "Multiple Open Source projects",
                "position": 999
            },
            "imageURL": "https://avatars0.githubusercontent.com/u/7886068?v=3&u=251be4bf60175498417a32e56c3c6979d2f9bd08&s=4004"
        },
    "createBy": "589284339973ecbedd83a033",
    "createAt": 1487985735209.0
}
```
#### output
```
<!--./typelize-result.json-->
{
  "_id": "String",
  "instructors": {
    "email": "String",
    "firstName": "String",
    "lastName": "String",
    "phone": "Number",
    "bio": "String",
    "linkedinURL": "String",
    "_id": "String",
    "previousPosition": [
      {
        "affiliation": "String",
        "position": "String"
      }
    ],
    "cccomments": {
      "affiliation": "String",
      "position": "Number"
    },
    "imageURL": "String"
  },
  "createBy": "String",
  "createAt": "Number"
}

```

## Screenshots
- input
![input](https://i.imgur.com/zvrKzbO.png)
- output
![output](https://i.imgur.com/4vxqo7F.png)


## Contribution
#### 1. Bug/issue report or function suggestion [here](https://github.com/opendidx/typelize/issues)

#### 2. Send [Pull Request](https://github.com/opendidx/typelize/pulls)
todolist:
- [x] Suport json file
- [ ] Better documantation
- [ ] Better --help message
- [ ] Suport more formate
- [ ] Suport flow output
- [ ] Suport mongoose output
- [ ] ... more



---
### Auther
[Amazingandyyy](https://github.com/amazingandyyy)

### License
[MIT](https://github.com/amazingandyyy/typelize/blob/master/LICENSE)

### Supports
please star it and fork it
