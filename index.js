/**
 * Ensures that the readline instance returned is talking to the TTY.
 * Starting readline with process.stdin may not be a TTY if the process
 * accepts input on STDIN.
 *
 * Useful for CLI scripts.
 */
var fs = require( 'fs' );
var TTY = require( 'tty' );
var Readline = require( 'readline' );
var Readable = require( 'stream' ).Readable;

/**
 * Only supports options-style arguments,
 * not Readline.createInterface( input, output, completer, terminal ) style
 *
 * @see https://nodejs.org/api/readline.html#readline_readline_createinterface_options
 *
 * @param object options
 *        {
 *          output: <Writeable>,
 *          completer: <Function>,
 *          terminal: <boolean>,
 *          historySize: <number:30>,
 *          prompt: <string:"> ">,
 *          crlfDelay <number:100> (milliseconds: between 100, 2000),
 *        }
 */
function createInterfaceFromTTY( options ) {
	if ( ! options ) {
		options = {};
	}

	options.input = options.input || process.stdin;

	if ( ! ( options.input instanceof Readable ) || ! options.input.isTTY ) {
		// options._openTTYReadStream for mocking only
		options.input = ( options._openTTYReadStream || openTTYReadStream ).call( null );
	}

	return Readline.createInterface( options );
}

function openTTYReadStream() {
	return TTY.ReadStream( fs.openSync( '/dev/tty', 'r' ) );
}

module.exports.createInterfaceFromTTY = createInterfaceFromTTY;
module.exports.openTTYReadStream = openTTYReadStream;
