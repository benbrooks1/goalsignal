import { Doughnut } from "vue-chartjs";

export default {
  extends: Doughnut,

  data() {
    return {
      gradients: [],
      gradient: [],
      gradientColors: [
        {
          start: "#f3bb98",
          end: "#ea8ba9"
        }
      ],
      options: {
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI
      },

      data: {
        datasets: [
          {
            label: "Data One",
            // backgroundColor: [this.gradients, "#6f6f6f"],
            backgroundColor: ["#1E49FF", "#6f6f6f"], // Put the gradient here as a fill color
            strokeColor: "#ff6c23",
            pointColor: "#fff",
            pointStrokeColor: "#ff6c23",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "#ff6c23",
            data: [Math.random(), Math.random()]
          }
        ]
      }
    };
  },
  mounted() {
    this.gradientColors.forEach(item => {
      this.gradient = this.$refs.canvas
        .getContext("2d")
        .createLinearGradient(0, 0, 150, 150);
      this.gradient.addColorStop(0, item.start);
      this.gradient.addColorStop(1, item.end);
      this.gradients.push(this.gradient);
    });
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.data, this.options);
  }
};
