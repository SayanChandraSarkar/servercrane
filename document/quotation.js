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
  model,
  shockAbsorber,
  Amount,
  freight,
  gst,
  total,
  packaging,
  totalPack,
  spare,
  AdditionalAccessories,
  originalPrice,
  userData,
  formattedDate,
  currency,
}) => {
  return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Quotation</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
      }
      img {
        max-width: 100%;
        height: auto;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
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
      .btn {
        text-align: right;
        margin-top: 20px;
      }
      .submitBtn {
        background-color: #007bff;
        color: #fff;
        font-weight: bold;
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      .note {
        margin-top: 40px;
      }
      .note div {
        font-weight: bold;
      }
      .note h2 {
        margin-top: 8px;
        font-size: 0.875rem;
      }

      .head{
        display:flex !important;
        justify-content:space-between !important;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div>
        <div>
          <div>
            <img src="https://calculation.cranebuffer.com/image/logo.png" />
          </div>
          <div>
            <h2>Quotation</h2>
          </div>
        </div>
        <div class="head" style="display:inline">
          <div>
            <h2>Quotation to</h2>
            <p>Company: ${userData.company}</p>
            <p>Name: ${userData.username}</p>
            <p>Email: ${userData.email}</p>
            <p>Contact: ${userData.phone}</p>
          </div>
          <div>
            <div style="float:right; margin-top:-20px">
              <h2>Invoice Date:</h2>
              <p>${formattedDate}</p>
            </div>
          </div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Sl</th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>${model}</td>
            <td >${shockAbsorber}</td>
            <td style="text-align:right">${originalPrice * shockAbsorber}</td>
          </tr>
          ${spare.map(
            (item, index) => `
                <tr>
                  <td>${index + 2}</td>
                  <td>${item.name}</td>
                  <td></td>
                  <td style="text-align:right">${item.price}</td>
                </tr>
              `
          )}
          ${AdditionalAccessories.map(
            (item, index) => `
          <tr>
            <td>${index + spare.length + 2}</td>
            <td>${item.name}</td>
            <td></td>
            <td style="text-align:right">${item.price}</td>
          </tr>
        `
          )}
        </tbody>
      </table>
      <table class="border-2">
        <tbody>
          <tr>
            <td colspan="2">Amount</td>
            <td align="right" style="text-align:right">
              ${
                currency === "INR"
                  ? `₹ ${Amount}`
                  : `$ ${(Amount / 80).toFixed(2)}`
              }
            </td>
          </tr>
          ${
            currency !== "USD"
              ? `
          <tr>
            <td colspan="2">Freight 2%</td>
            <td align="right" style="text-align:right">
              ${currency === "INR" ? `₹ ${freight}` : `$ ${freight / 80}`}
            </td>
          </tr>
          <tr>
            <td colspan="2">Gst 18%</td>
            <td align="right" style="text-align:right" >₹ ${gst}</td>
          </tr>`
              : `
          <tr>
            <td colspan="2">Packaging 2%</td>
            <td align="right" style="text-align:right">
              ${
                currency === "INR"
                  ? `₹ ${packaging}`
                  : `$ ${(packaging / 80).toFixed(2)}`
              }
            </td>
          </tr>`
          }
          <tr class="border-t-4 border-gray-300">
            <td colspan="2" class="font-medium">Total</td>
            <td align="right" class="text-green-600 font-semibold" style="text-align:right">
              ${
                currency === "INR"
                  ? `₹ ${total}`
                  : `$ ${(totalPack / 80).toFixed(2)}`
              }
            </td>
          </tr>
        </tbody>
      </table>

      <div class="note">
        <div>NOTE:</div>
        <h2>
          Contact factory for Delivery Schedule and Quantity base discount
        </h2>
      </div>
    </div>
  </body>
</html>

  
  `;
};
