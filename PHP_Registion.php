<?php
// Database connection
$servername = "your_servername";
$username = "your_username";
$password = "your_password";
$dbname = "smart_energy_meter_account";

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
    $newUsername = sanitizeInput($_POST['newUsername']);
    $newPassword = sanitizeInput($_POST['newPassword']);
    $email = sanitizeInput($_POST['email']);

    // Check if username already exists
    $checkUsernameQuery = $conn->prepare("SELECT * FROM account_users WHERE username = ?");
    $checkUsernameQuery->bind_param("s", $newUsername);
    $checkUsernameQuery->execute();
    $result = $checkUsernameQuery->get_result();

    if ($result->num_rows > 0) {
        // Username already exists
        echo "<script>alert('Username already exists. Please choose a different username.');</script>";
        echo "<script>window.location.href = 'your_registration_page.html';</script>";
    } else {
        // Insert new user into the database
        $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
        $insertUserQuery = $conn->prepare("INSERT INTO account_users (username, password, email) VALUES (?, ?, ?)");
        $insertUserQuery->bind_param("sss", $newUsername, $hashedPassword, $email);
        
        if ($insertUserQuery->execute()) {
            echo "<script>alert('Registration successful!');</script>";
            echo "<script>window.location.href = 'your_login_page.html';</script>";
        } else {
            echo "Error: " . $insertUserQuery->error;
        }
    }

    $checkUsernameQuery->close();
    $insertUserQuery->close();
}

$conn->close();
?>
