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
exports.formatResponse = void 0;
;
function formatResponse(response) {
    return __awaiter(this, void 0, void 0, function* () {
        const formattedResponse = {};
        // Populate ResponseStructure
        formattedResponse.status = response.status;
        formattedResponse.working = response.headers.get('working');
        formattedResponse.userId = parseInt(response.headers.get('user-id') || '', 10);
        try {
            const json = yield response.json();
            formattedResponse.id = json.id;
            formattedResponse.title = json.title;
            formattedResponse.message = json.message;
        }
        catch (error) {
            console.error('Error parsing response JSON:', error);
        }
        return formattedResponse;
    });
}
exports.formatResponse = formatResponse;
