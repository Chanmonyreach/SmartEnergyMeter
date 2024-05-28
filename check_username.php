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

// Function to sanitize user input
function sanitizeInput($data) {
    return htmlspecialchars(stripslashes(trim($data)));
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $newUsername = sanitizeInput($_POST['username']);

    // Check if username already exists
    $checkUsernameQuery = $conn->prepare("SELECT * FROM account_users WHERE username = ?");
    $checkUsernameQuery->bind_param("s", $newUsername);
    $checkUsernameQuery->execute();
    $result = $checkUsernameQuery->get_result();

    if ($result->num_rows > 0) {
        // Username already exists
        echo json_encode(array("exists" => true));
    } else {
        // Username does not exist
        echo json_encode(array("exists" => false));
    }

    $checkUsernameQuery->close();
}

$conn->close();
?>
