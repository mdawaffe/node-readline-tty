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

Usage
-----

```js
const Readline = require( 'node-readline-tty' );

let readline = Readline.createInterfaceFromTTY( {
	output: process.stdout,
	// ...
} );
```

See Node's [`Readline.createInterface()` documentation](https://nodejs.org/api/readline.html#readline_readline_createinterface_options).

Testing
-------

`npm test`
