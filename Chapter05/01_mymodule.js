

function Greeter (lang) {
    this.language = language;
    this.greet() = function () {
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
