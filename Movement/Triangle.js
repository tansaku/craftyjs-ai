
Crafty.c("Triangle", {
    Triangle: function(height, width, color, alpha) {
        this.h = height; // TODO check for bad values
        this.w = width; // TODO check for bad values
        this.color = color || "#000000";
        this.alpha = alpha; // TODO check for bad values

        return this;
    },
//http://www.ehow.com/how_8484308_draw-triangles-java.html
    draw: function() {
        var context = Crafty.canvas.context;
		// Set the style properties.
		context.fillStyle   = this.color;
		context.strokeStyle = "#000000";
		context.lineWidth   = 1;
		context.globalAlpha = this.alpha;

		context.beginPath();
		// Start from the top-left point.
		context.moveTo(this.x+this.w/3, this.y+(2*this.h)/3); // give the (x,y) coordinates
		context.lineTo(this.x+this.w/2, this.y+this.h/3);
		context.lineTo(this.x+(2*this.w)/3, this.y+(2*this.h)/3);
		context.lineTo(this.x+this.w/3, this.y+(2*this.h)/3);

		// Done! Now fill the shape, and draw the stroke.
		// Note: your shape will not be visible until you call any of the two methods.
		context.fill();
		context.stroke();
		context.closePath();
    }
});