document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('Powers-Gauge-Chart');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 150;

    // WebSocket connection to receive updates from ESP8266
    const socket = new WebSocket('ws://192.168.3.65:81/'); // Replace with your ESP8266 WebSocket server IP address

    socket.onopen = function() {
        console.log('WebSocket connected.');
    };

    socket.onmessage = function(event) {
        try {
            const data = JSON.parse(event.data);
            const value = parseFloat(data.value); // Parse the value as a float
            if (!isNaN(value)) {
                updateGaugeValue(value); // Update the gauge chart with the received value
            } else {
                console.warn('Received NaN value:', data.value);
                updateGaugeValue(0); // Display 0 if received value is NaN
            }
        } catch (error) {
            console.error('Error parsing WebSocket message:', error);
            updateGaugeValue(0); // Display 0 on error
        }
    };

    socket.onerror = function(error) {
        console.error('WebSocket Error:', error);
    };

    socket.onclose = function(event) {
        console.log('WebSocket Closed:', event);
        setGaugeToZero(); // Reset gauge when WebSocket connection is closed
    };
    
    // Function to draw and animate the gauge chart
    function drawGauge(value, targetValue = 75) {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the outer circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0.75 * Math.PI, 2.25 * Math.PI);
        ctx.lineWidth = 40;
        ctx.strokeStyle = '#eee';
        ctx.stroke();

        // Determine the color based on the value
        let fillColor;
        if (value < 30) {
            fillColor = '#32cd32'; // Green for low values
        } else if (value < 70) {
            fillColor = '#ffd700'; // Yellow for medium values
        } else {
            fillColor = '#ff4500'; // Red for high values
        }

        // Draw the filled arc
        ctx.beginPath();
        const endAngle = 0.75 * Math.PI + (value / 100) * 1.5 * Math.PI;
        ctx.arc(centerX, centerY, radius, 0.75 * Math.PI, endAngle);
        ctx.lineWidth = 40;
        ctx.strokeStyle = fillColor;
        ctx.stroke();

        // Draw the needle
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(endAngle);
        ctx.beginPath();
        ctx.moveTo(0, -10);
        ctx.lineTo(radius - 30, 0);
        ctx.lineTo(0, 10);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.restore();

        // Draw the center circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, 10, 0, 2 * Math.PI);
        ctx.fillStyle = '#fff';
        ctx.fill();

        // Draw text value
        ctx.font = '30px Arial';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.fillText(value + 'KW', centerX, centerY + radius + 40);

        // Draw text labels with specific font style and position
        ctx.font = '12px Helvetica'; // Adjust font family
        ctx.fillStyle = '#999';
        ctx.textAlign = 'center';
        ctx.fillText('Today', centerX, centerY + radius + 60);
        ctx.fillText('Target: ' + targetValue + 'KW', centerX, centerY + radius + 80); // Adjust position

        // Draw tick marks and labels (optional)
        const numTicks = 10;
        for (let i = 0; i <= numTicks; i++) {
            const tickValue = i * 10;
            const tickAngle = 0.75 * Math.PI + (tickValue / 100) * 1.5 * Math.PI;
            const tickX = centerX + (radius - 10) * Math.cos(tickAngle);
            const tickY = centerY + (radius - 10) * Math.sin(tickAngle);
            ctx.beginPath();
            ctx.moveTo(tickX, tickY);
            ctx.lineTo(
                centerX + (radius - 20) * Math.cos(tickAngle),
                centerY + (radius - 20) * Math.sin(tickAngle)
            );
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#999';
            ctx.stroke();

            const labelX = centerX + (radius - 30) * Math.cos(tickAngle);
            const labelY = centerY + (radius - 30) * Math.sin(tickAngle);
            ctx.font = '15px Helvetica';
            ctx.fillStyle = '#C7C7C7';
            ctx.textAlign = 'center';
            ctx.fillText(tickValue, labelX, labelY + 3); // Adjust label position
        }
    }

    function updateGaugeValue(value) {
        // Assuming value is between 0 and 100 (percentage)
        if (!isNaN(value)) {
            drawGauge(value); // Update the gauge chart with the received value
        } else {
            console.warn('Received NaN value:', value);
            drawGauge(0); // Display 0 if received value is NaN
        }
    }
    
});
