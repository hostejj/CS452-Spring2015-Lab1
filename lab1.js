//Johnathon Hoste, 1/27/2015, Lab 1
var gl;
var points;

window.onload = function init()
{
	var DRAWING = 0;  // 0-triangle, 1-square, 2-hexagon

    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    
    var triangle = new Float32Array(
		[-0.5, -0.5, 
		0, 0.5,
		0.5, -0.5]);
	
	var square = new Float32Array(
		[-0.5, 0.5, 
		0.5, 0.5,
		0.5, -0.5, 
		-0.5, -0.5]);
	
	
	var hexagon = new Float32Array(
		[-0.6, 0.0, 
		-0.25, 0.5,
		-0.25, 0.0, 
		0.25, 0.5,
		0.25, 0.0,
		0.6, 0.0,
		0.25, -0.5,
		-0.25, 0.0,
		-0.25, -0.5,
		-0.6, 0.0]);	 

    //  Configure WebGL

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
    
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, triangle, gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    renderTRI();
	
	document.onclick = function() {
		if(DRAWING == 0){
			gl.bufferData( gl.ARRAY_BUFFER, triangle, gl.STATIC_DRAW );
			renderTRI();
			DRAWING = DRAWING + 1;
		}
		else if(DRAWING == 1){
			gl.bufferData( gl.ARRAY_BUFFER, square, gl.STATIC_DRAW );
			renderSQR();
			DRAWING = DRAWING + 1;
		}
		else if(DRAWING == 2){
			gl.bufferData( gl.ARRAY_BUFFER, hexagon, gl.STATIC_DRAW );
			renderHEX();
			DRAWING = 0;
		}
	};
};

function renderTRI() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
}

function renderSQR() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
}

function renderHEX() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 10 );
}
