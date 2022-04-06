<?php


   class RdvControllers{


    /**
     * Display a listing of the resource of the client.
     *
     * @return all rendez-vous
     */
    public function index()
    {
      if($_SERVER['REQUEST_METHOD'] == "POST"):
        $clients = new RendezVous();
        $id = $_POST['id'];
        $data = $clients->all($id);
        echo json_encode($data);
      endif;
    }

    /**
     * Show the rendez-vous.
     *
     * @param int $id
     */
     public function show($id = -1)
     {
        $clients = new RendezVous();
        $data = $clients->get($id);
        echo json_encode($data);
     }

    /**
     * Store a newly created resource in storage.
     *
     * 
     */
     public function store()
     {
        if($_SERVER['REQUEST_METHOD'] == "POST"):
          $clients = new RendezVous();

          $data = [];
          $data['id_user'] = $_POST['id_user'];
          $data['sujet'] = $_POST['sujet'];
          $data['id_time'] = $_POST['id_time'];
          $data['date'] = $_POST['date'];
         
           if($clients->save($data)):
                echo json_encode(['status'=>'inserted']);
           else:
                echo json_encode(['status'=>'not inserted']);
           endif;
        else:
          echo json_encode(['status'=>'error']);
        endif;
     }

    /**
     * Update the specified resource in storage.
     *
     * @param int $id
     */
     public function update() 
     {
        if($_SERVER['REQUEST_METHOD'] == "POST"):
          $rdv = new RendezVous();

          $data = [];
          $data['id'] = $_POST['id'];
          $data['sujet'] = $_POST['sujet'];
          $data['id_time'] = $_POST['id_time'];
          $data['date'] = $_POST['date'];
          
          if($rdv->update($data)):
                echo json_encode(['status'=>'updated']);
          else:
                echo json_encode(['status'=>'not updated']);
          endif;
        else:
          echo json_encode(['status'=>'error']);
        endif;
     }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     */
     public function delete()
     {
      if($_SERVER['REQUEST_METHOD'] == "POST"):
        $model = new Model();
        $table = 'rendezvous';
        $id = $_POST['id'];
        if($model->destroy($table , $id)):
            echo json_encode(['status'=>'deleted']);
        else:   
            echo json_encode(['status'=>'not deleted']); 
        endif;     
      endif;
     }

    /**
     * get times which possible to get.
     *
     * @param date $dt
     */
    public function getTimes()
    {
       $model = new Model();
       $table = 'rendezvous';
       $dt = $_POST['date'];
       $id_time = $_POST['id_time'];
       $numRow = $model->getTimesR($table , $dt , $id_time);
       $time = $model->getTime($id_time);
       $data['time']=$time;
       $data['rows']=$numRow;
       if($data>0):
           echo json_encode($data);
       else:   
            $data['time']=0;
            $data['rows']=0;
            echo json_encode($data); 
       endif;     
    }



   }

?>