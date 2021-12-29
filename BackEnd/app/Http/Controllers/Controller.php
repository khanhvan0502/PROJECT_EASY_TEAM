<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function intWithStyle($n)
    {
      if ($n < 1000) return $n;
      $suffix = ['','k','M','G','T','P','E','Z','Y'];
      $power = floor(log($n, 1000));
      return round($n/(1000**$power),1,PHP_ROUND_HALF_EVEN).$suffix[$power];
    }
}
