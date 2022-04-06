<?php


   class ClientControllers{


      
    /**
     * Display a listing of the resource of the client.
     *
     * @return all rendez-vous
     */
    public function index($id = -1)
    {
        $clients = new Client();
        $data = $clients->all($id);
        echo json_encode($data);
    }


    /**
     * Show the client.
     *
     * @param int $id
     */
     public function show()
     {
      if($_SERVER['REQUEST_METHOD'] == "POST"):
         $data['email'] = $_POST['email'];
         $data['password'] = $_POST['password'];
         $clients = new Client();
         $data = $clients->get($data);
         echo json_encode($data);
      endif;
     }

    /**
     * Store a newly created resource in storage.
     *
     * 
     */
     public function store()
     {
        if($_SERVER['REQUEST_METHOD'] == "POST"):
          $clients = new Client();

          $data = [];
          $data['id'] = $clients->pwd($_POST['nom']);
          $data['email'] = $_POST['email'];
          $data['nom'] = $_POST['nom'];
          $data['prenom'] = $_POST['prenom'];
          $data['age'] = $_POST['age'];
          $data['date_naissence'] = $_POST['date_naissence'];
          $res['ref'] = $data['id'];
          $res['email'] = $data['email'];
         
           if($clients->save($data)):
                $res['status'] = 'inserted';
                echo json_encode($res);
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
          $clients = new Client();

          $data = [];
          $data['id_user'] = $_POST['id_user'];
          $data['email'] = $_POST['email'];
          $data['nom'] = $_POST['nom'];
          $data['prenom'] = $_POST['prenom'];
          $data['age'] = $_POST['age'];
          $data['date_naissence'] = $_POST['date_naissence'];
          
          if($clients->update($data)):
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
     public function delete($id = -1)
     {
        $model = new Model();
        $table = 'users';
        if($model->destroy($table , $id)):
            echo json_encode(['status'=>'deleted']);
        else:   
            echo json_encode(['status'=>'not deleted']); 
        endif;     
     }


   }

?>