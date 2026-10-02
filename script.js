// complete the js code
class CustomPromise {
  constructor(executor) {
        this.state = "pending";
        this.value = undefined;
        this.handlers = [];
        const resolve = (value) => {
            if (this.state !== "pending") return;
            this.state = "fulfilled";
            this.value = value;
            this.handlers.forEach(handler => {
                this.handle(handler);
            });
        };
        const reject = (reason) => {
            if (this.state !== "pending") return;
            this.state = "rejected";
            this.value = reason;
            this.handlers.forEach(handler => {
                this.handle(handler);
            });
        };
        executor(resolve, reject);
    }

    handle(handler) {
        if (this.state === "fulfilled") {
            if (typeof handler.onFulfilled === "function") {
                handler.onFulfilled(this.value);
            }
        }

        if (this.state === "rejected") {
            if (typeof handler.onRejected === "function") {
                handler.onRejected(this.value);
            }
        }
    }
    then(onFulfilled, onRejected) {
        this.handlers.push({
            onFulfilled: onFulfilled,
            onRejected: onRejected
        });
        if (this.state !== "pending") {
            this.handle(this.handlers[this.handlers.length - 1]);
        }
        return this;
    }
   catch(onRejected) {
        return this.then(null, onRejected);
    }
    finally(onFinally) {
        return this.then(
            (value) => {
                onFinally();
                return value;
            },
            (reason) => {
                onFinally();
                return reason;
            }
        );
    }
}

window.CustomPromise = CustomPromise;
