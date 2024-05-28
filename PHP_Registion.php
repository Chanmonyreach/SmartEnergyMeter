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

// Create table if not exists
$sql = "CREATE TABLE IF NOT EXISTS account_users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
)";

if ($conn->query($sql) === FALSE) {
    echo "Error creating table: " . $conn->error;
}

// Function to sanitize user input
function sanitizeInput($data) {
    return htmlspecialchars(stripslashes(trim($data)));
}

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if(isset($_POST['newUsername'], $_POST['newPassword'], $_POST['email'])) {
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
            echo "<script>window.location.href = 'index.html';</script>";
        } else {
            // Insert new user into the database
            $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
            $insertUserQuery = $conn->prepare("INSERT INTO account_users (username, password, email) VALUES (?, ?, ?)");
            $insertUserQuery->bind_param("sss", $newUsername, $hashedPassword, $email);
            
            if ($insertUserQuery->execute()) {
                echo "<script>alert('Registration successful!');</script>";
                echo "<script>window.location.href = 'index.html';</script>";
            } else {
                if ($conn->errno == 1062) { // Check for duplicate entry error
                    echo "<script>alert('Error: Duplicate entry. Please try again.');</script>";
                } else {
                    echo "Error: " . $insertUserQuery->error;
                }
            }
        }

        $checkUsernameQuery->close();
        $insertUserQuery->close();
    } else {
        echo "Incomplete form data";
    }
}

$conn->close();
?>
