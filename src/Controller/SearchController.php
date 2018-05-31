<?php

namespace App\Controller;

use App\Entity\Country;
use Symfony\Component\HttpFoundation\Request;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class SearchController extends Controller
{
    /**
     * @Route("/search/api/v1", name="search", methods={"GET"})
     */
    // RAJOUTER methods={"GET"}
    public function index(Request $request)
    {
        $countryRepo = $this->getDoctrine()->getRepository(Country::class);
        /*
        $dist=null; $lat=null; $long=null; $dens=null; $tempAvg=null; $lang1=null; $lang2=null; $lang3=null;
        $dist=$request->get('dist');
        $lat=$request->get('lat');
        $long=$request->get('long');
        $tempAvg=$request->get('temp');
        $dens=$request->get('dens');
        $lang1=$request->get('lang1');
        $lang2=$request->get('lang2');
        $lang3=$request->get('lang3');
        $cont=$request->get('cont');
        $devise=$request->get('dev');
*/
       // $coutries = $countryRepo->search($dist,$lat,$long, $tempAvg,$dens, $lang1,$lang2, $lang3 );
        $coutries = $countryRepo->search();
        return $this->json([
            "status"=>"ok",
            "message"=>"envoi reussi",
            "data" => $coutries
        ]);
    }
}
