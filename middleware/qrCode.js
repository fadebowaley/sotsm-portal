// qrcodeMiddleware.js

const QRCode = require('qrcode');
const chalk = require('chalk');

// Middleware function to generate QR code with formatted text
function generateQRCodeMiddleware(data) {
  return (req, res, next) => {
    // Function to format the data object as a string
    function formatData(data, indent = 0) {
      const spacing = " ".repeat(indent * 2);
      return Object.entries(data)
        .map(([key, value]) => {
          if (typeof value === "object" && value !== null) {
            value = formatData(value, indent + 1);
            return `${spacing}${chalk.bold(key)}:\n${value}`;
          } else {
            return `${spacing}${key}: ${value}`;
          }
        })
        .join("\n");
    }

    // Convert the object to a formatted string
    const qrText = formatData(data);

    // Generate the QR code image
    QRCode.toFile('qrcode.png', qrText, {
      errorCorrectionLevel: 'H',
      width: 200
    }, function (err) {
      if (err) {
        console.error('Error generating QR code:', err);
        return next(err);
      }
      console.log('QR code generated successfully!');
      next();
    });
  };
}

module.exports = generateQRCodeMiddleware;
