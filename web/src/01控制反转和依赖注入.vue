<template>
    <div>控制反转和依赖注入</div>
</template>

<script setup lang="ts">
/**
 *
 * 我们可以看到，B 中代码的实现是需要依赖 A 的，两者的代码耦合度非常高。当两者之间的业务逻辑复杂程度增加的情况下，
 * 维护成本与代码可读性都会随着增加，并且很难再多引入额外的模块进行功能拓展。
 */
class A {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class B {
    age: number;
    entity: A;
    constructor(age: number) {
        this.age = age;
        this.entity = new A('小满');
    }
}

const c = new B(18);

const name = c.entity.name;
console.log(name);
</script>

<style scoped lang="scss"></style>
