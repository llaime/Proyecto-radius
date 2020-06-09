<?php
session_start();
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <link rel="apple-touch-icon" sizes="57x57" href="favicon/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="favicon/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="favicon/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="favicon/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="favicon/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="favicon/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="favicon/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="favicon/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192" href="favicon/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="favicon/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png">
    <link rel="manifest" href="/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
    <link rel=" stylesheet" href="css/custom.css">
    <title>Usuarios</title>
</head>

<body>
    <?php
if (isset($_SESSION['loggedin']) && $_SESSION['admin'] = 1) {
} else {
    echo "<div class='alert alert-danger mt-4' role='alert'>
        <h4>Necesitas logarte para acceder aqui.</h4>
        <p><a href='index.html'>Login Here!</a></p></div>";
    exit;
}
// checking the time now when check-login.php page starts
$now = time();
if ($now > $_SESSION['expire']) {
    session_destroy();
    echo "<div class='alert alert-danger mt-4' role='alert'>
        <h4>Tu sesion a expirado. Por favor vuelve a logarte!</h4>
        <p><a href='index.html'>Login Here</a></p></div>";
    exit;
}

$inicio = '<nav class="container navi">
    <div class="row ">
        <div class="col-4">
            <img src="images/logo_letras.png" class="img-fluid " alt="Logo Servidor Radius">
        </div>
        <div class="col ">
            <div class="btn-group" role="group" aria-label="Basic example">
                <a href="inicio.php">
                    <button type="button" class="boton btn btn-primary btn-lg">Inicio</button>
                </a>
                <a href="lista.php">
                    <button type="button" class="boton btn btn-primary btn-lg">Usuarios</button>
                </a>
                <a href="routers.php">
                    <button type="button" class=" boton btn btn-primary btn-lg">Routers</button>
                </a>

                <a href="desgrupo.php">
                    <button type="button" class="boton btn btn-primary btn-lg">Deshabilitar</button>
                </a>
                <a href="semanal.php">
                    <button type="button" class="boton btn btn-primary btn-lg">Semana</button>
                </a>
            </div>
            <div class="btn-group" role="group" aria-label="Basic example">

                <a href="horarios.php">
                    <button type="button" class="boton btn btn-primary btn-lg">Horarios</button>
                </a>
                <a href="historico.php">
                    <button type="button" class="boton btn btn-primary btn-lg">Historico</button>
                </a>'
;
$final = '           </div>
</div>
</div>
</nav>';
$adminis = '<a href="administradores.php" name="borrar">
    <button type="button" class="boton btn btn-primary btn-lg">Administradores</button>
</a>';
if ($_SESSION['name'] == 'creador') {
    echo $inicio . $adminis . $final;
} else {
    echo $inicio . $final;
}
?>
    <div class="insertar container">
        <div class="titulo">
            <h2 class="display-4">Lista de usuarios</h2>
        </div>
        <div class="row">
            <div id="tabla" class="col">
            </div>
        </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous">
    </script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
        integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous">
    </script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
        integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous">
    </script>
    <script src="js/datos.js"></script>

</body>