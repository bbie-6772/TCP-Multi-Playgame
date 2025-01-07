import camelCase from 'lodash/camelCase.js';

export const toCamelCase = (obj) => {
    // 배열의 경우 재귀함수로 처리
    if(Array.isArray(obj)) {
        return obj.map((v) => toCamelCase(v));
    // 객체의 경우 reduce를 이용해 재귀함수로 처리
    } else if (obj !== null && obj?.constructor === Object) {
        return Object.keys(obj).reduce((result, key) => {
            result[camelCase(key)] = toCamelCase(obj[key])
            return result;
        }, {});
    // 배열과 객체가 아닌 경우 그대로 반환
    } else return obj;
}