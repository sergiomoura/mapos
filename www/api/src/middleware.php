<?php

// Application middleware
class CheckAuthMiddleware
{
    /**
     * Example middleware invokable class
     *
     * @param  \Psr\Http\Message\ServerRequestInterface $request  PSR7 request
     * @param  \Psr\Http\Message\ResponseInterface      $response PSR7 response
     * @param  callable                                 $next     Next middleware
     *
     * @return \Psr\Http\Message\ResponseInterface
     */

     // Construtor que permite que container do app seja injetado na classe middleware
    public function __construct($container) {
        $this->container = $container;
    }

    public function __invoke($request, $response, $next)
    {
        // Capturando vetor de headers
        $headers = $request->getHeaders();
        
        // Se for requisição OPTIONS com Access-Control-Request-Method no header, deixa passar
        if(array_key_exists('HTTP_ACCESS_CONTROL_REQUEST_METHOD',$headers) && $request->getMethod() == 'OPTIONS'){
            $response = $next($request, $response);
            return $response->withStatus(200);
        }
        
        if (array_key_exists('HTTP_AUTHORIZATION', $headers)){
            
            // Capturando o token do header HTTP_AUTHORIZATION;
            $token = str_replace('Bearer ','',$headers['HTTP_AUTHORIZATION'][0]);

            // Consultando validade do token
            $sql = 'SELECT id FROM maxse_usuarios WHERE token=:token AND validade_do_token>NOW()';
            $stmt = $this->container->db->prepare($sql);
            $stmt->execute(array(':token'=>$token));
            $id = $stmt->fetch();

            if($id === false) {
                echo('aqui');
                return $response->withStatus(401);
            } else {
                $response = $next($request, $response);
                return $response;
            }
            
        } else {
            
            // Checando se é uma tentativa de login
            $path = $request->getUri()->getPath();
            if($path != '/login' && $path != 'login' && $path != '/api/login'){

                // Não é login. Retornando com status 401
                echo('acolá');
                return $response->withStatus(401);

            } else {

                // É uma tentativa de login. Prosseguindo
                $response = $next($request, $response);
                return $response;

            }
        }
    }
}

$app->add(new CheckAuthMiddleware($app->getContainer()));

