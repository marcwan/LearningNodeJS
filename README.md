# LearningNodeJS


Source code to accompany my book, "Learning Node.JS, Second Edition".  Every once
in a while, I'll update to the latest version of Node.JS and let everybody know
if there are any  changes or updates required to the code (and will make those
changes in the source tree).

## First Edition

Source code for the first edition is available via the
[branch v1](https://github.com/marcwan/LearningNodeJS/tree/v1).


## Errors and Corrections

As devastating as it is to admit, there are a couple of errors in the book.
Those responsible for these egregious violations of editorial process (me)
have been shot.

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
