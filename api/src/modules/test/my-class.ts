export class MyClass {
  private name: string;
  constructor(name) {
    this.name = name;
  }

  sayHello = (): string => {
    return `Hello, my name is ${this.name}`;
  };
}
