var Readable = require( 'stream' ).Readable;
var TTY = require( 'tty' );

var assert = require( 'assert' );
var MockReadable = require( './mock-readable' );

var readlineTTY = require( '../' );

function test_openTTYReadStream() {
	describe( '#openTTYReadStream()', function() {
		var tty = readlineTTY.openTTYReadStream();

		it( 'should be Readable', function() {
			assert.ok( tty instanceof Readable, 'it is not Readable' );
		} );

		it( 'should be a TTY', function() {
			assert.ok( tty.isTTY, 'it is not a TTY' );
		} );
	} );
}


if ( TTY.isatty( 0 ) ) {
	describe( 'When stdin is a TTY', function() {
		describe( 'readlineTTY', function() {
			test_openTTYReadStream();

			describe( '#createInterfaceFromTTY()', function() {
				it( 'should use stdin as the input', function() {
					var rl = readlineTTY.createInterfaceFromTTY();

					assert.strictEqual( rl.input.fd, 0, 'input is not stdin' );

					rl.close();
				} );

				it( 'should not use /dev/tty as the input', function() {
					var readMe = new MockReadable;
					var rl = readlineTTY.createInterfaceFromTTY( {
						_openTTYReadStream: function() { return readMe; }
					} );

					assert.notEqual( rl.input, readMe, 'input is /dev/tty' );

					rl.close();
				} );
			} );
		} );
	} )
} else {
	describe( 'When stdin is not a TTY', function() {
		describe( 'readlineTTY', function() {
			test_openTTYReadStream();

			describe( '#createInterfaceFromTTY()', function() {
				it( 'should not use stdin as the input', function() {
					var rl = readlineTTY.createInterfaceFromTTY();

					assert.notStrictEqual( rl.input.fd, 0, 'input is not stdin' );

					rl.close();
				} );

				it( 'should use /dev/tty as the input', function() {
					var readMe = new MockReadable;
					var rl = readlineTTY.createInterfaceFromTTY( {
						_openTTYReadStream: function() { return readMe; }
					} );

					assert.strictEqual( rl.input, readMe, 'input is not /dev/tty' );

					rl.close();
				} );
			} );
		} );
	} );
}
