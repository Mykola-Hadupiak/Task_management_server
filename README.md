# Task management server

**_METHODOLOGY_**


**Boards** </br>

1. Sending a GET request to **/boards** will give you a full array of boards objects that are created with status 200.</br>
In form like:
  ```
    [
        {
            "id": "08cfc900-b06c-4ae9-9a37-3393eba52ea3",
            "createdAt": "2024-02-07T11:46:57.565Z"
        }
    ]
  ```

2. Sending a GET request to **/boards/:boardId** will give you a board and status 200 (it means that we have this board) or "Board not found" with 404 error.</br>
3. To create a new board you have to send a request to **/boards** using POST method, and you will receive your new board back with status 200.
4. To delete your board with all cards connected to it, you have to send a request to **/boards/:boardId** using DELETE method,you will have 204 status if everything is fine.

If something goes wrong somewhere, you will receive an appropriate error message

**Cards** </br>

1. To get all cards with specific board, you have to send a GET request to **/cards/:boardId**, and you will receive a full array with your cards.</br>
In form like:
```
  [
      {
          "id": "89845720-9fca-4f96-9898-164a31335b58",
          "title": "todo",
          "description": "something",
          "status": "todo",
          "boardId": "3b4e6949-6b4b-40f2-bfb1-d049e8463b62"
      },
      {
          "id": "fd81a3fc-05bd-466f-b6f1-e32b7c08b3df",
          "title": "todo2",
          "description": "something",
          "status": "todo",
          "boardId": "3b4e6949-6b4b-40f2-bfb1-d049e8463b62"
      }
  ]
```
or you will have an error if there is no such board.

2. To create a new card, you have to send a POST request to **/cards/:boardId** (boardId must be valid, otherwise you will get an error), with json, title is required, description optional.</br>
JSON example:
```
  {
    "title": "todo",
    "description": "optional"
  }
```
and get a response with status 200 like: 
```
  {
      "id": "c9a31af8-89c6-4d1d-bec7-1d285ce09795",
      "title": "todo",
      "description": "optional",
      "status": "todo",
      "boardId": "3b4e6949-6b4b-40f2-bfb1-d049e8463b62"
  }
```
3. To delete your card you have to send a request to **/cards/:id** using DELETE method, you will have 204 status if everything is fine.
4. To update your card you have to send a request to **/cards/:id** using PUT method with all card data, and you will receive your updated card back with status 200.
