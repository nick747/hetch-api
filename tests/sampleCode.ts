// SAMPLE CODE FOR TESTS
import { Hetch } from "../src/Hetch";
// url = 'https://jsonplaceholder.typicode.com/todos/1'
const hetch = new Hetch();

export async function testHetch() {
  try {
    // GET REQUEST
    const getResponse = await hetch.get(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    console.log("GET Response Data");
    console.log(getResponse.data);
    console.log("\n");

    // POST REQUEST
    const postData = {
      title: "Sample Request",
      completed: false,
      userId: 1,
    };

    const postResponse = await hetch.post(
      "https://jsonplaceholder.typicode.com/todos",
      postData
    );
    console.log("POST Response Data");
    console.log(postResponse.data);
    console.log("\n");

    // DELETE REQUEST
    const deleteResponse = await hetch.delete(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    console.log("DELETE Response Data");
    console.log(deleteResponse.data);
    console.log("\n");

    // HTTP REQUEST WITH CUSTOM METHOD - ANY
    const customMethod = "PATCH";
    const customMethodData = {
      id: 1,
      title: "Custom Method Request",
      completed: false,
      userId: 1,
    };

    const customMethodResponse = await hetch.any(
      customMethod,
      "https://jsonplaceholder.typicode.com/todos/1",
      {
        body: JSON.stringify(customMethodData),
      }
    );
    console.log("Custom Method Response Data");
    console.log(customMethodResponse.data);
    console.log("\n");
  } catch (error) {
    console.error("Error occured: ", error);
  }
}

testHetch();
