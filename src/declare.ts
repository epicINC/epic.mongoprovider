


type Constructor<T = Object> = new(...args: any[]) => T;

function Extend<T extends Constructor<T>>(Base: T) : any {
    return class extends Base {
        constructor(...args: any[]) {
            super(...args);
        }
    };
}

