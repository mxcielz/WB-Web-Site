<?php
$users = [
    ['CPF' => '00000000001', 'username' => 'WB Admin', 'password' => '123', 'email' => 'wbmanutencao@gmail.com', 'user_level' => 'admin'],
    ['CPF' => '00000000002', 'username' => 'RH User', 'password' => '123', 'email' => 'rh@wbmanutencao.com', 'user_level' => 'rh'],
    ['CPF' => '00000000003', 'username' => 'Func User', 'password' => '123', 'email' => 'func@wbmanutencao.com', 'user_level' => 'funcionario'],
    ['CPF' => '00000000004', 'username' => 'Visit User', 'password' => '123', 'email' => 'visit@wbmanutencao.com', 'user_level' => 'visitante']
];

echo "TRUNCATE TABLE wblogin;\n\n";
echo "-- Insert users with different access levels\n";
echo "INSERT INTO wblogin (CPF, username, password, email, user_level) VALUES\n";

foreach ($users as $user) {
    $hashed_password = password_hash($user['password'], PASSWORD_DEFAULT);
    echo "('{$user['CPF']}', '{$user['username']}', '{$hashed_password}', '{$user['email']}', '{$user['user_level']}'),\n";
}
?> 