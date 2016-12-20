process.stdout.write("Hash-o-tron 3000\n");
process.stdout.write("(Ctrl+D or Empty line quits)\n");
process.stdout.write("data to hash > ");

var last_read;

process.stdin.on('readable', function () {
    data = process.stdin.read();
    if (!data) return;
    if (!process.stdin.isRaw) {
        last_read = data;
        if (data == "\n") process.exit(0);
        process.stdout.write("Please select type of hash:\n");
        process.stdout.write("(1 – md5, 2 – sha1, 3 – sha256, 4 – sha512)\n");
        process.stdout.write("[1-4] > ");
        process.stdin.setRawMode(true);
    } else {
        var alg;
        if (data != '') {
            var c = parseInt(data);
            switch (c) {
                case 1: alg = 'md5'; break;
                case 2: alg = 'sha1'; break;
                case 3: alg = 'sha256'; break;
                case 4: alg = 'sha512'; break;
            }
            if (alg) {
                var hash = require('crypto').createHash(alg);
                hash.update(last_read);
                process.stdout.write("\nHashed to: " + hash.digest('hex'));
                process.stdout.write("\ndata to hash > ");
                process.stdin.setRawMode(false);
            } else {
                process.stdout.write("\nPlease select type of hash:\n");
                process.stdout.write("[1-4] > ");
            }
        } else {
            process.stdout.write("\ndata to hash > ");
            process.stdin.setRawMode(false);
        }
    }
});

process.stdin.setEncoding('utf8')

