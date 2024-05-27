<?php
    $servername = "localhost";
    $username = "root";
    $password = ""; // Default password for MySQL in Laragon is empty
    $dbname = "smart_energy_meter_account";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $user = $_POST['username'];
        $pass = $_POST['password'];

        $sql = "SELECT password FROM users WHERE username='$user'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            if (password_verify($pass, $row['password'])) {
                echo "Login successful";
            } else {
                echo "Invalid credentials";
            }
        } else {
            echo "Invalid credentials";
        }
    }

    $conn->close();
?>
