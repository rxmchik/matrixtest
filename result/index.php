<?php
// Перевірка, чи отримано GET-запит
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Отримання шляху до текстового файлу
    $filePath = '/result/matrixform.txt';

    // Перевірка чи існує файл та чи можна його прочитати
    if (file_exists($filePath) && is_readable($filePath)) {
        // Зчитування вмісту файлу
        $fileContent = file_get_contents($filePath);

        // Формування відповіді
        $response = [
            'status' => 'success',
            'message' => $fileContent
        ];

        // Вивід відповіді у форматі JSON
        header('Content-Type: application/json');
        echo json_encode($response);
        exit;
    } else {
        // Якщо файл не існує або його неможливо прочитати
        $response = [
            'status' => 'error',
            'message' => 'File not found or unreadable.'
        ];

        header('Content-Type: application/json');
        echo json_encode($response);
        exit;
    }
} else {
    // Якщо не GET-запит, вивід помилки
    $response = [
        'status' => 'error',
        'message' => 'Invalid request method.'
    ];

    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}
?>
