export {};
/**
 * 为了解决这个问题可以使用IOC容器
 * 其实就是写了一个中间件 ，来收集依赖，主要是为了解耦，减少维护成本
 */
class A {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class C {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

//中间件用于解耦
class Container {
    modeuls: any;
    constructor() {
        this.modeuls = {};
    }
    provide(key: string, modeuls: any) {
        this.modeuls[key] = modeuls;
    }
    get(key: string) {
        return this.modeuls[key];
    }
}

const mo = new Container();
mo.provide('a', new A('小满1'));
mo.provide('c', new C('小满2'));

class B {
    a: any;
    c: any;
    constructor(container: Container) {
        this.a = container.get('a');
        this.c = container.get('c');
    }
}

new B(mo);
