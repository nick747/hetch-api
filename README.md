# Hetch-API

Hetch is a fetch wrapper that provides you with a convenient way to make HTTP requests. It simplifies the process of making API calls and offers several useful features to enhance your development experience.

## Features

- **Direct access to methods** like `get`, `put`, `post`, and `delete`, allowing you to make different types of HTTP requests easily.
- **A flexible `any` method** that lets you perform an HTTP request with a custom method.
- **Configuration set for the library**, including options such as `timeout`, custom `headers`, and settings for handling **network errors**.
- **Directly use the response data** without having to manually convert it to JSON.
- **Interceptors** to execute functions before the request is sent and after the response is received, enabling you to modify request and response data.

## Installation

You can install Hetch-API using npm:

```bash
npm install hetch-api
```

## Getting Started
To use Hetch-API in your project, import it and create an instance of the `Hetch` class:
```ts
import { Hetch } from "hetch-api";

const hetch = new Hetch();
```

## Making HTTP requests
Hetch-API provides easy-to-use methods to make HTTP requests. For example, to make a GET request:
```ts
const url = "[url]";
const getResponse = await hetch.get(url);
console.log("GET Response Data");
console.log(getResponse.data);
```
Similarly, you can use the `post`, `put`, and `delete` methods for corresponding HTTP methods.

### Custom Method
If you need to make an HTTP request with a custom method, you can use the `any` method:
```ts
const customMethod = "PATCH";
const customMethodData = {
  id: 1,
  title: "Custom Method Request",
  completed: false,
  userId: 1,
};

const customMethodResponse = await hetch.any(
  customMethod,
  "[url]",
  {
    body: JSON.stringify(customMethodData),
  }
);
console.log("Custom Method Response Data");
console.log(customMethodResponse.data);
```

## Configuration
You can modify default configuration values while creating the Hetch instance:
```ts
const customConfig = {
  timeout: 5000,
  maxRetries: 5,
  retryDelay: 2000,
};

const hetch = new Hetch(customConfig);
```
The `customConfig` object allows you to set the `timeout` for requests, specify the number of `maxRetries` for failed requests, and set a `retryDelay` between retries.

## Interceptors
Hetch-API supports request and response interceptors. You can add functions to be executed before the request is sent or after the response is received:
```ts
// Request Interceptor
hetch.useRequestInterceptor(async (config) => {
  // Modify request config if needed
  return config;
});

// Response Interceptor
hetch.useResponseInterceptor(async (responseData, response) => {
  // Modify response data if needed
  return responseData;
});
```

## Example of Use
Here's an example of use for the Hetch library:
```js
import { Hetch } from "hetch-api";

const customConfig = {
  timeout: 5000,
  maxRetries: 5,
  retryDelay: 2000,
};

const hetch = new Hetch(customConfig);

const url = 'https://jsonplaceholder.typicode.com/todos/1';
const getResponse = await hetch.get(url);
console.log("GET Response Data");
console.log(getResponse.data);
```

Output:
```json
GET Response Data
{
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}
```

## Contributions
Contributions to Hetch-API are welcome! Feel free to create issues or submit pull requests for improvements or bug fixes.

## License
Hetch-API is released under the **ISC License**
