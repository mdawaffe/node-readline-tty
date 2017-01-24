var Readable = require( 'stream' ).Readable;
var util = require('util');

function MockReadable( options ) {
	if ( ! ( this instanceof MockReadable ) ) {
		return new MockReadable( options );
	}

	Readable.call( this, options );
}

MockReadable.prototype._read = function() { this.push( null ); };

util.inherits( MockReadable, Readable );

module.exports = MockReadable;
