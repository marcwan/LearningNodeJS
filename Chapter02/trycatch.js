

function uhoh () {
    throw new Error("Something bad happened!");
}

try {
    uhoh();
} catch (e) {
    console.log("I caught an error: " + e.message);
}

console.log("program is still running");



