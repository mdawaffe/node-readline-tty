Node Readline TTY
=================

Simple wrapper of `readline.createInterface()` that ensures `input` is always the terminal.

This allows creation of scripts that accept input on `STDIN` and via the terminal:

```
$ ./my-script < some.file
> What is your favorite color? <kbd>Yellow</kbd>
```

Installation
------------

`npm install mdawaffe/node-readline-tty`

Testing
-------

`npm test`
