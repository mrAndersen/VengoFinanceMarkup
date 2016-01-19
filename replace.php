<?php

$string     = file_get_contents('t/_p2p.less');


while(substr_count($string,'rem') != 0){
    $start              = strpos($string,'rem');
    $numberResolution   = [];

    $char   = $string[$start];
    $i      = $start;
    $loop   = true;

    while(!($char == ' ' || $char == '-')){
        $i--;
        $char = $string[$i];
        $numberResolution[$i] = $char;
    }
    array_pop($numberResolution);

    $keys = array_keys($numberResolution);

    $nEnd   = reset($keys);
    $nStart = end($keys);

    $number = implode('',array_reverse($numberResolution));
    $newNumber = round($number / 20,2);

    $source = '/' . $number.'rem' . '/';
    $string = preg_replace($source,$newNumber.'mer', $string, 1);
}
$string = str_replace('mer','rem',$string);

file_put_contents('t/new.less',$string);

header('Content-type: text/css');
echo($string);