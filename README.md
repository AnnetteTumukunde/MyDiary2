# MyDiary2
MyDiary2 repository is an online journal where someone can be able to record his or her thoughts any time.

[![Build Status](https://travis-ci.org/AnnetteTumukunde/MyDiary2.svg?branch=developer)](https://travis-ci.org/AnnetteTumukunde/MyDiary2)
[![Coverage Status](https://coveralls.io/repos/github/AnnetteTumukunde/MyDiary2/badge.svg?branch=developer)](https://coveralls.io/github/AnnetteTumukunde/MyDiary2?branch=developer)

## Documentation of MyDiary2

MyDiary2 has four main features that includes :

- Creating an account for new user or logging in an existing account
- Viewing your all entries
- Viewing your specified entry
- Adding a new entry or modifying an existing one

To get started, we might need to do the following steps to be able to run the APIs on MyDiary2 :

* Tools we need preferably : Visual Studio Code editor, Postman for testing APIs, Browser(Chrome), Node server side framework, mocha testing framework.

    - Copy this repository link : https://github.com/AnnetteTumukunde/MyDiary2.git
    - In Visual Studio Code terminal write, git clone https://github.com/AnnetteTumukunde/MyDiary2.git
    - Then git checkout <branch_name> to access certain branch
    - npm install to have dependencies. This is optional 
    - npm run test to test APIs or npm start to test APIs using postman

### Testing API endpoints

#### User account

##### Creating a new user [post]

* route : /api/v1/auth/signup
    * In the body, parse :
        - uid : [number]
        - firstname : [string]
        - lastname : [string]
        - email : [validemail]
        - password : [8CharPassword]

    Then click send

##### Logging in a user [post]

* route : /api/v1/auth/signin
    * In the body, parse :
        - email : [validemail]
        - password : [8CharPassword]

    Then click send
    
##### Creating a new entry [post]

* route : /api/v1/entries
    * In headers, 
        - type this key : 'x-access-token'
        - type this key value : [token_received_after_signing_up_or_logging_in]
    * In the body, parse :
        - entryTitle : [string]
        - posted : [boolean]
        - viewed : [boolean]
        - entryContent : [string]
        - author : [number]

    Then click send

##### Viewing all entries [get]

* route : /api/v1/entries
    * In headers, 
        - type this key : 'x-access-token'
        - type this key value : [token_received_after_signing_up_or_logging_in]

    Then click send

##### Viewing a specified entry [get]

* route : /api/v1/entries/{id}
    * In headers, 
        - type this key : 'x-access-token'
        - type this key value : [token_received_after_signing_up_or_logging_in]

    Then click send

##### Modifying an entry [put]

* route : /api/v1/entries/{id}
    * In headers, 
        - type this key : 'x-access-token'
        - type this key value : [token_received_after_signing_up_or_logging_in]
    * In the body, parse :
        - entryTitle : [string]
        - posted : [boolean]
        - viewed : [boolean]
        - entryContent : [string]
        - author : [number]

    Then click send

##### Deleting a specified entry [delete]

* route : /api/v1/entries/{id}
    * In headers, 
        - type this key : 'x-access-token'
        - type this key value : [token_received_after_signing_up_or_logging_in]

    Then click send