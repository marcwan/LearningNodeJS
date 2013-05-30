
// simulate a request coming in every 5s, 1/10 chance of a crash
// while processing it
setInterval(function () {
    console.log("got request");
    if (Math.round(Math.random() * 10) == 0)
        throw new Error("SIMULATED CRASH!");
}, 2000);

