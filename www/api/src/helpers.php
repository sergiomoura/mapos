<?php
	function getTokenFrom($req){
		$headers = $req->getHeaders();
		if(array_key_exists('HTTP_AUTHORIZATION',$headers)){
			return str_replace('Bearer ','',$headers['HTTP_AUTHORIZATION'][0]);
		} else {
			throw new Exception("Token inexistente", 1);
		}
	}