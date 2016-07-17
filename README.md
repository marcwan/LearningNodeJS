# LearningNodeJS


Source code to accompany my book, "Learning Node.JS".  Every once in a while, I'll
update to the latest version of Node.JS and let everybody know if there are any 
changes or updates required to the code (and will make those changes in the source 
tree).

## Errors and Corrections

As devastating as it is to admit, there are a couple of errors in the book.
Those responsible for these egregious violations of editorial process (me)
have been shot.

### Chapter 4

The following function `send_failure` occurs in a few places in this chapter:

```
function send_failure(res, code, err) {
    var code = (err.code) ? err.code : err.name;
    res.writeHead(code, { "Content-Type" : "application/json" });
    res.end(JSON.stringify({ error: code, message: err.message }) + "\n");
}
```

The problem is that the local variable `code` overwrites the incoming variable `code`,
which is bad. A better version of these functions is:

```
function send_failure(res, server_code, err) {
    var code = (err.code) ? err.code : err.name;
    res.writeHead(server_code, { "Content-Type" : "application/json" });
    res.end(JSON.stringify({ error: code, message: err.message }) + "\n");
}
```

Elsewhere, in the function `load_albums`, There is the line:

```
ps = only_files.splice(page * page_size, page_size);
```

`splice` is for inserting into an array. We want `slice` here:

```
ps = only_files.slice(page * page_size, page_size);
```


### Chapter 6

_p117._ At the top of p117, you can change `d.toString("utf8")` to `d`

Or you could just replace the following:

```
if (d) {
    if (typeof d == 'string')
        res.write(d);
    else if (typeof d == 'object' && d instanceof Buffer)
        res.write(d.toString("utf8"));
}
```

with:

```
if (d) 
    res.write(d);
```

(note that all the other samples in this chapter got it right, just sample 2 has this)

_p131._ An incorrect URL is used. Please replace

    http://localhost:8080/page/home

with

    http://localhost:8080/pages/home

There are two places this happens (command line and browsers).

### Chapter 8

_p176._  At the top of the page, the `.sort("date")` should read `.sort(sort)`

### Chapter 11

_p249._ There are two lines of the format:

```
var data = process.stdXXX.read();
```

These should read:
```
var data = node.stdXXX.read();
```
