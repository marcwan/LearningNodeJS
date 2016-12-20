process.stdout.write("Hash-o-tron 3000\n");
process.stdout.write("(Ctrl+D or Empty line quits)\n");
process.stdout.write("data to hash > ");

process.stdin.on('readable', function () {
    var data = process.stdin.read();
    if (data == null) return;
    if (data == "\n") process.exit(0);

    var hash = require('crypto').createHash('md5');
    hash.update(data);
    process.stdout.write("Hashed to: " + hash.digest('hex') + "\n");
    process.stdout.write("data to hash > ");
});


process.stdin.setEncoding('utf8');
