

try {
    setTimeout(function () {
        throw new Error("Uh oh, something bad!");
    }, 2000);
} catch (e) {
    console.log("I caught the error: " + e.message);
}


