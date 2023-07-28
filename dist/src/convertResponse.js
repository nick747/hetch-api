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
exports.convertResponse = void 0;
/**
 * Converts the response to a type of file
 * @param conversionType - The type to convert to
 * @param response - The response to convert
 */
function convertResponse(conversionType, response) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (conversionType) {
            case 'JSON':
                return response.json();
            case 'TEXT':
                return response.text();
            case 'ARRAYBUFFER':
                return response.arrayBuffer();
            case 'BLOB':
                return response.blob();
            case 'FORMDATA':
                return response.formData();
            default:
                throw new Error('Invalid conversion type.');
        }
    });
}
exports.convertResponse = convertResponse;
