<?php
// Перевірка, чи отримано POST-запит
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Отримання даних з форми
    $name = isset($_POST['name']) ? $_POST['name'] : '';
    $birthday = isset($_POST['birthday']) ? $_POST['birthday'] : '';

    // Отримання шляху до текстового файлу
    $filePath = '/result/matrixform.txt';

    // Перевірка чи існує файл та чи можна його прочитати
    if (file_exists($filePath) && is_readable($filePath)) {
        // Зчитування вмісту файлу
        $fileContent = file_get_contents($filePath);

        // Формування відповіді (ви можете додати дані name та birthday до відповіді за потребою)
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
    // Якщо не POST-запит, вивід помилки
    $response = [
        'status' => 'error',
        'message' => 'Invalid request method.'
    ];

    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}
?>
