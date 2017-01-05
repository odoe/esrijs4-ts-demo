var locationPath = location.pathname.replace(/\/[^\/]+$/, "");
window.dojoConfig = {
  packages: [
    {
      name: "app",
      location: locationPath + "app"
    },
    {
      name: "chartjs",
      location: "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/",
      main: "Chart.bundle.min"
    }
  ]
};