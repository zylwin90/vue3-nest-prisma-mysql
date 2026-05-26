export {};

/**
 * 类装饰器
 * @param target
 */
// function classDecotators(target: any) {
//     // console.log(target, '==');

//     target.prototype.name = '小满';
// }

// @classDecotators
// class Xiaoman {
//     constructor() {}
// }

// const xiaoman: any = new Xiaoman();

// console.log(xiaoman);

/**
 * 属性装饰器
 */

const property: PropertyDecorator = (target: any, key: string | symbol) => {
    console.log(target, key);
};

class Xiaoman1 {
    @property
    name1: string;

    constructor(name: string) {
        this.name1 = name;
    }
    getName() {
        return this.name1;
    }
}

/**
 * 参数装饰器
 */

// const parameter: ParameterDecorator = (target: any, key: string | symbol | undefined, index: number) => {
//     console.log(target, key, index);
// };

// class Xiaoman2 {
//     public name: string;
//     constructor() {
//         this.name = '';
//     }
//     getName(name: string, @parameter age: number) {
//         return this.name;
//     }
// }

/**
 * 方法装饰器
 */

// const func: MethodDecorator = (target: any, key: string | symbol, descriptor: any) => {
//     console.log(target, key, descriptor);
// };

// class Xiaoman3 {
//     public name: string;
//     constructor() {
//         this.name = '';
//     }
//     @func
//     getName(name: string, age: number) {
//         return this.name;
//     }
// }
