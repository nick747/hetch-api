# Hetch-API

Hetch is a fetch wrapper that provides you with a convenient way to make HTTP requests. It simplifies the process of making API calls and offers several useful features to enhance your development experience.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Making HTTP Requests](#making-http-requests)
- [Custom Method](#custom-method)
- [Configuration](#configuration)
- [Interceptors](#interceptors)
- [Error Handling](#error-handling)
- [Example of Use](#example-of-use)
- [Contributions](#contributions)
- [License](#license)

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

## Error Handling
Hetch-API provides built-in error handling for network errors and server responses. When making HTTP requests, the library handles different types of errors and provides appropriate error classes for each scenario.

### Network Errors
When a network error occurs (e.g., the server is down or there is no internet connection), Hetch-API throws a `NetworkError`. This error indicates that the network request failed and provides information about the error.

### Server Errors
If the server returns an error status code (e.g., 4xx or 5xx), Hetch-API throws a `ServerError`. This error includes the status code returned by the server, allowing you to handle specific server errors in your code.

### Client Errors
For all other errors that do not fall under network errors or server errors, Hetch-API throws a `ClientError`. This error is a generic client-side error and can be used to handle any other unexpected errors.

Here's an example of how you could implement error handling in your project using Hetch-API:
```js
import { Hetch, NetworkError, ServerError, ClientError } from "hetch-api";

const hetch = new Hetch();

const url = "[url]";

try {
  const response = await hetch.get(url);
  console.log("Response Data:", response.data);
} catch (error) {
  if (error instanceof NetworkError) {
    console.error("Network Error:", error.message);
  } else if (error instanceof ServerError) {
    console.error("Server Error:", error.message);
    console.error("Status Code:", error.statusCode);
  } else if (error instanceof ClientError) {
    console.error("Client Error:", error.message);
  } else {
    console.error("Unexpected Error:", error.message);
  }
}
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
