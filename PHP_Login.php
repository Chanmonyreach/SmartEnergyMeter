<?php
$servername = "localhost";
$username = "root";
$password = "";
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

    $loginQuery = $conn->prepare("SELECT password FROM account_users WHERE username = ?");
    $loginQuery->bind_param("s", $user);
    $loginQuery->execute();
    $result = $loginQuery->get_result();

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

    $loginQuery->close();
}

$conn->close();
?>
