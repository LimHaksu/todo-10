function delay(mil) {
  debugger;
  return new Promise((res, rej) => {
    debugger;
    setTimeout(() => {
      console.log(3);
      debugger;
      res("ok");
    }, 1000);
  });
}

debugger;
const $1 = delay(1000);

debugger;
$1.then((data) => {
  debugger;
  console.log("data", data);
  return data;
}).then((sec) => {
  debugger;
  console.log(sec, "초 지남");
});

//4 1 2 5 7 3 6 8
class MyPromise {
  constructor(fn) {
    this.callbacks = [];
    fn(this.resolve, this.reject);
  }

  then(cb) {
    this.callbacks.push(cb);
  }

  resolve(data) {}

  reject() {}

  resolve(data) {}

  reject() {}
}
