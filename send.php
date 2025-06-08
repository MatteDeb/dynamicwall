<?php
header('Content-Type: application/json');

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$preferred_date = trim($_POST['preferred-date'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $email === '' || $phone === '' || $message === '') {
    echo json_encode(['success' => false, 'message' => 'Wszystkie pola są wymagane.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Nieprawidłowy adres e-mail.']);
    exit;
}

// Ustaw swój adres e-mail tutaj
$to = 'xarho@hotmail.com, mateuszd0604@gmail.com';
$subject = "Nowa wiadomość ze strony - $name";
$body = "Imię i nazwisko: $name\nEmail: $email\nTelefon: $phone\nPreferowana data: $preferred_date\n\nWiadomość:\n$message";
$headers = "From: DynamicWall<kontakt@dynamicwall.pl>\r\nReply-To: $email\r\nContent-Type: text/plain; charset=UTF-8";


if (mail($to, $subject, $body, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Wiadomość została wysłana.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Wystąpił błąd przy wysyłaniu wiadomości.']);
}
?>
