module.exports = ({
  kineticEnergy,
  potentialEnergy,
  totalEnergy,
  energyPerHour,
  Vd,
  emassMin,
  mass,
  velocity,
  cycle,
  force,
  stroke,
  mass2,
  velocity2,
  power,
  stallFactor,
  decelerationValue,
  rateOfUtilizationPerStroke,
  rateOfUtilizationPerHour,
}) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Technical Report</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
          }
  
          .main {
            padding: 10px;
          }

          .head {
            display: flex;
            display: -webkit-flex;
            display: -webkit-box
            justify-content: space-between !important;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            font-size: 0.9rem !important;
            -webkit-font-size: 0.9rem !important;
          }
          h3 {
            margin-top: 60px;
          }
          th,
          td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <div class="main">
          <div style="head">
            <img src="https://calculation.cranebuffer.com/image/logo.png" alt="logo" />
            <h2>Technical Report</h2>
          </div>
          <h3>Customer Input Data</h3>
          <table class="table">
            <thead>
              <tr>
                ${mass ? `<th>Mass</th>` : ""}
                ${velocity ? `<th>velocity</th>` : ""}
                ${cycle ? `<th>cycle</th>` : ""}
                ${force ? `<th>force</th>` : ""}
                ${stroke ? `<th>stroke</th>` : ""}
                ${velocity2 ? `<th>velocity2</th>` : ""}
                ${mass2 ? `<th>mass2</th>` : ""}
                ${power ? `<th>power</th>` : ""}
                ${stallFactor ? `<th>stallFactor</th>` : ""}
              </tr>
            </thead>
            <tbody>
            <tr>
                ${mass ? `<td>${mass} Kg</td>` : ""}
                ${velocity ? `<td>${velocity} m/s</td>` : ""}
                ${cycle ? `<td>${cycle} m/s</td>` : ""}
                ${force ? `<td>${force} m/s</td>` : ""}
                ${stroke ? `<td>${stroke} m/s</td>` : ""}
                ${velocity2 ? `<td>${velocity2} m/s</td>` : ""}
                ${mass2 ? `<td>${mass2} m/s</td>` : ""}
                ${power ? `<td>${power} m/s</td>` : ""}
                ${stallFactor ? `<td>${stallFactor} m/s</td>` : ""}
            </tr>
          </tbody>
          
          </table>
  
          <h3>Calculated Parameters</h3>
          <table>
            <thead>
              <tr>
                ${kineticEnergy ? `<th>Kinetic Energy</th>` : ""}
                ${potentialEnergy ? `<th>Potential Energy</th>` : ""}
                ${totalEnergy ? `<th>Total Energy</th>` : ""}
                ${energyPerHour ? `<th>Energy Per Hour</th>` : ""}
                ${Vd ? `<th>Vd</th>` : ""}
                ${emassMin ? `<th>Emass Min</th>` : ""}
                ${decelerationValue ? `<th>Deceleration</th>` : ""}
                ${rateOfUtilizationPerStroke ? `<th>ROU/Stroke</th>` : ""}
                ${rateOfUtilizationPerHour ? `<th>ROU/hr</th>` : ""}
              </tr>
            </thead>
            <tbody>
           <tr>
                    ${kineticEnergy ? `<td>${kineticEnergy} Kg</td>` : ""}
                    ${potentialEnergy ? `<td>${potentialEnergy} m/s</td>` : ""}
                    ${totalEnergy ? `<td>${totalEnergy} m/s</td>` : ""}
                    ${energyPerHour ? `<td>${energyPerHour} m/s</td>` : ""}
                    ${Vd ? `<td>${Vd} m/s</td>` : ""}
                    ${emassMin ? `<td>${emassMin} m/s</td>` : ""}
                    ${
                      decelerationValue
                        ? `<td>${decelerationValue} m/s</td>`
                        : ""
                    }
                    ${
                      rateOfUtilizationPerStroke
                        ? `<td>${rateOfUtilizationPerStroke} m/s</td>`
                        : ""
                    }
                    ${
                      rateOfUtilizationPerHour
                        ? `<td>${rateOfUtilizationPerHour} m/s</td>`
                        : ""
                    }
                    
           
           </tr>
          </tbody>
          
          </table>
        </div>
      </body>
    </html>
    `;
};
