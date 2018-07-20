<?php

if (PHP_SAPI == 'cli-server') {
	// To help the built-in PHP dev server, check if the request was actually for
	// something which should probably be served as a static file
	$url  = parse_url($_SERVER['REQUEST_URI']);
	$file = __DIR__ . $url['path'];
	if (is_file($file)) {
		return false;
	}
}

require __DIR__ . '/../vendor/autoload.php';

session_start();

// Definindo pathroot de acordo com servidor [local x remoto]
$api_root = $_SERVER['SERVER_NAME'] == 'localhost' ? '' : '/api';

// Carregando configurações
$settings = require __DIR__ . '/../src/settings.php';

// Carregando Helpers
require __DIR__ . '/../src/helpers.php';


// Instanciando app
$app = new \Slim\App($settings);

// Set up dependencies
require __DIR__ . '/../src/dependencies.php';

// Register middleware
require __DIR__ . '/../src/middleware.php';

// Register routes
$routes_forlder = __DIR__ . '/../src/routes';
$routes = array_values(array_filter(scandir($routes_forlder),function($a){
																return $a!='.' && $a!= '..';
															}));
															
foreach ($routes as  $route) {
	require $routes_forlder . '/' . $route;
}

// Run app
$app->run();