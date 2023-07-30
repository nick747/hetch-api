"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testHetch = void 0;
// SAMPLE CODE FOR TESTS
const Hetch_1 = require("../src/Hetch");
function testHetch() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Custom Configuration
            const customConfig = {
                timeout: 5000,
                maxRetries: 5,
                retryDelay: 2000,
            };
            const hetch = new Hetch_1.Hetch(customConfig);
            // GET REQUEST
            const getResponse = yield hetch.get("https://jsonplaceholder.typicode.com/todos/1");
            console.log("GET Response Data");
            console.log(getResponse.data);
            console.log("\n");
            // POST REQUEST
            const postData = {
                title: "Sample Request",
                completed: false,
                userId: 1,
            };
            const postResponse = yield hetch.post("https://jsonplaceholder.typicode.com/todos", postData);
            console.log("POST Response Data");
            console.log(postResponse.data);
            console.log("\n");
            // DELETE REQUEST
            const deleteResponse = yield hetch.delete("https://jsonplaceholder.typicode.com/todos/1");
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
            const customMethodResponse = yield hetch.any(customMethod, "https://jsonplaceholder.typicode.com/todos/1", {
                body: JSON.stringify(customMethodData),
            });
            console.log("Custom Method Response Data");
            console.log(customMethodResponse.data);
            console.log("\n");
        }
        catch (error) {
            console.error("Error occurred: ", error);
        }
    });
}
exports.testHetch = testHetch;
testHetch();
