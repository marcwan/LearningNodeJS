
/**
 * An example of how to use this:
 *
 * var mm = require("./01_mymodule.js");
 * mm.greeter("en").greet();
 */

function Greeter (lang) {
    this.language = lang;
    this.greet = function () {
        switch (this.language) {
          case "en": return "Hello!";
          case "de": return "Hallo!";
          case "jp": return "こんにちは!";
          default: return "No speaka that language";
        }
    }
}

exports.hello_world = function () {
    console.log("Hello World");
}

exports.goodbye = function () {
    console.log("Bye bye!");
}

exports.greeter = function (lang) {
    return new Greeter(lang);
}

