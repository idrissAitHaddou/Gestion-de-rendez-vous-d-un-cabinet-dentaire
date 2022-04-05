<?php


class RendezVous extends DB{

       private $table = "rendezvous";

       public function all($id = -1)
       {
           
           $query = "SELECT r.* , t.* FROM $this->table as r , times as t where id_user like '$id' and r.id_time like t.id ";
           $query = $this->connect()->prepare($query);
           if($query->execute() && $query->rowCount()>0):
              return $query->fetchALL(PDO::FETCH_ASSOC);
           else:
              return false;
           endif;

       }

       public function get($id = -1)
       {
           
           $query = "SELECT * FROM $this->table where id like '$id'";
           $query = $this->connect()->prepare($query);
           if($query->execute() && $query->rowCount()>0):
              return $query->fetch(PDO::FETCH_ASSOC);
           else:
              return false;
           endif;

       }

       public function save($data = [])
       {

          $query = "INSERT INTO $this->table (`sujet`, `date`, `id_time` , `id_user`)"; 
          $query .= "VALUES (?, ?, ? , ?)";
          $query = $this->connect()->prepare($query);
          if($query->execute(array($data['sujet'] , $data['date'] , $data['id_time'], $data['id_user']))):
               return true;
          else:
               return false;
          endif;
           
       }


       public function update($data = [])
       {
          $query = "UPDATE $this->table SET `sujet` = ? , `date` = ? , `id_time` = ? where id like ?";   
          $query = $this->connect()->prepare($query);  
          if($query->execute(array($data['sujet'] , $data['date'] , $data['id_time'] , $data['id']))):  
               return true;     
          else:     
               return false;    
          endif;   
         
       }


}


?>










