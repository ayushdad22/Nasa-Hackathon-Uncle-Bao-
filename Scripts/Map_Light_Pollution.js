// County names and average light pollution values (including Mayo)
const countyNames = [
  "Carlow",
  "Cavan",
  "Clare",
  "Cork",
  "Donegal",
  "Dublin",
  "Galway",
  "Kerry",
  "Kildare",
  "Kilkenny",
  "Laois",
  "Leitrim",
  "Limerick",
  "Longford",
  "Louth",
  "Mayo",
  "Meath",
  "Monaghan",
  "Munster",
  "Offaly",
  "Roscommon",
  "Sligo",
  "Tipperary",
  "Waterford",
  "Westmeath",
  "Wexford",
  "Wicklow",
];
const lightPollutionValues = [
  0.5815, 0.4139, 0.413, 0.6115, 0.3663, 1.8653, 0.4138, 0.3658, 1.0473, 0.5541,
  0.5238, 0.3147, 0.7169, 0.4284, 1.0898, 0.3234, 0.7852, 0.4389, 0.1995,
  0.4615, 0.3707, 0.4021, 0.4691, 0.6181, 0.4735, 0.4822, 0.5453,
];

// Assign different colors for Dublin and the rest of Ireland
const backgroundColors = countyNames.map((county) =>
  county === "Dublin" || county === "Mayo"
    ? "rgba(255, 99, 132, 0.2)"
    : "rgba(54, 162, 235, 0.2)"
);
const borderColors = countyNames.map((county) =>
  county === "Dublin" || county === "Mayo"
    ? "rgba(255, 99, 132, 1)"
    : "rgba(54, 162, 235, 1)"
);

// Chart.js configuration
const data = {
  labels: countyNames,
  datasets: [
    {
      label: "Average Light Pollution (Radiance)",
      data: lightPollutionValues,
      backgroundColor: backgroundColors,
      borderColor: borderColors,
      borderWidth: 1,
    },
  ],
};

// Chart configuration
const config = {
  type: "bar",
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Light Pollution by County in Ireland",
      },
    },
  },
};

// Render the chart
const lightPollutionChart = new Chart(
  document.getElementById("lightPollutionChart"),
  config
);
