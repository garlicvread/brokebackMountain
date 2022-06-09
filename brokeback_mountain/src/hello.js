export default class {
    #name;  // #name: private property

    constructor(name) {
        this.#name = name;  // "this.": access private property
    }

    greeting() {
        return `Hello, ${this.#name}`;  // ${}: interpolation with private property
    }
}
