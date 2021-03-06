let app = new Vue({
    el: '#app',
    data: {
        cxt: undefined,
        isDrawing: false,
        lastX: 0,
        lastY: 0,
        hue: 0,
        direction: true
    },
    methods: {
        stopDrawing: function(e) {
            this.isDrawing = false;
        },
        startDrawing: function(e) {
            this.isDrawing = true;
            [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
        },
        draw: function(e) {
            if (!this.isDrawing) return; // stop the fn from running when they are not moused down
            console.log(e);
            this.ctx.strokeStyle = `hsl(${this.hue}, 100%, 50%)`;
            this.ctx.beginPath();
            // start from
            this.ctx.moveTo(this.lastX, this.lastY);
            // go to
            this.ctx.lineTo(e.offsetX, e.offsetY);
            this.ctx.stroke();
            [this.lastX, this.lastY] = [e.offsetX, e.offsetY];

            this.hue++;
            if (this.hue >= 360) {
                this.hue = 0;
            }
            if (this.ctx.lineWidth >= 100 || this.ctx.lineWidth <= 1) {
                this.direction = !this.direction;
            }

            if (this.direction) {
                this.ctx.lineWidth++;
            } else {
                this.ctx.lineWidth--;
            }
        }
    },
    mounted: function() {
        this.ctx = this.$refs.myCanvas.getContext('2d');
        this.$refs.myCanvas.width = window.innerWidth;
        this.$refs.myCanvas.height = window.innerHeight;
        this.ctx.strokeStyle = '#BADA55';
        this.ctx.lineJoin = 'round';
        this.ctx.lineCap = 'round';
        this.ctx.lineWidth = 100;
    },
})