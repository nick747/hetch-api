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
// url = 'https://jsonplaceholder.typicode.com/todos/1'
const hetch = new Hetch_1.Hetch();
function testHetch() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // GET REQUEST
            const getResponse = yield hetch.get('https://jsonplaceholder.typicode.com/todos/1');
            console.log('GET Response Data');
            console.log(getResponse.data);
            console.log('\n');
            // POST REQUEST
            /*  const postData = {
                title: 'Sample Request',
                completed: false,
                userId: 1,
              };
          
              const postResponse = await hetch.post('https://jsonplaceholder.typicode.com/todos', postData);
              console.log('POST Response Data');
              console.log(postResponse.data);
              console.log('\n');
          
              // DELETE REQUEST
              const deleteResponse = await hetch.delete('https://jsonplaceholder.typicode.com/todos/1');
              console.log('DELETE Response Data');
              console.log(deleteResponse.data);
              console.log('\n');
          
              // HTTP REQUEST WITH CUSTOM METHOD - ANY
              const customMethod = 'PATCH';
            const customMethodData = {
              id: 1,
              title: 'Custom Method Request',
              completed: false,
              userId: 1,
            };
          
          const customMethodResponse = await hetch.any(customMethod, 'https://jsonplaceholder.typicode.com/todos/1', {
            body: JSON.stringify(customMethodData)
          });
          console.log('Custom Method Response Data');
          console.log(customMethodResponse.data);
          console.log('\n');
          
              // RESPONSE CONVERSION
              const response = await hetch.get('https://jsonplaceholder.typicode.com/todos/1');
              const jsonResult = await response.convert('JSON');
              console.log('JSON CONVERSION');
              console.log(jsonResult);
              
          
              const textResult = await response.convert('TEXT');
              console.log('TEXT CONVERSION');
              console.log(textResult);
            */
        }
        catch (error) {
            console.error('Error occured: ', error);
        }
    });
}
exports.testHetch = testHetch;
