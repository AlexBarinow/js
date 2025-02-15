let target = {
    value:"tratata"
}

const handler = {
    get: function (target, prop) {
        return target[prop]
    },
    set: function (target, property, value) {
         target[property] = value;
    }
}


let a = new Proxy(target, handler);


a.value = a.value + "sdf";

console.log(a.value.toString());