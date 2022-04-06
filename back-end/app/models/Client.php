<?php


class Client extends DB{

       private $table = "users";

       public function all($id = -1)
       {
           
           $query = "SELECT * FROM $this->table where id like '$id'";
           $query = $this->connect()->prepare($query);
           if($query->execute() && $query->rowCount()>0):
              return $query->fetch(PDO::FETCH_ASSOC);
           else:
              return false;
           endif;

       }

       public function get($data = [])
       {
           $email= $data['email'];
           $password= $data['password'];
           $query = "SELECT * FROM $this->table where id like '$password' and email like '$email'";
           $query = $this->connect()->prepare($query);
           if($query->execute() && $query->rowCount()>0):
              return $query->fetch(PDO::FETCH_ASSOC);
           else:
              return false;
           endif;

       }

       public function save($data = [])
       {

                $query = "INSERT INTO $this->table (`id`, `email`, `nom`, `prenom`, `age`, `date_naissence`)"; 
                $query .= "VALUES (?, ?, ?, ?, ?, ?)";
                $query = $this->connect()->prepare($query);
                if($query->execute(array($data['id'] , $data['email'] , $data['nom'] , $data['prenom'] , $data['age'] , $data['date_naissence']))):
                     return true;
                else:
                     return false;
                endif;

       }

       public function update($data = [])
       {

                $query = "UPDATE $this->table SET `email` = ? , `nom` = ? , `prenom` = ? , `age` = ? , `date_naissence` = ? "; 
                $query .= "where id like ?";
                $query = $this->connect()->prepare($query);
                if($query->execute(array($data['email'] , $data['nom'] , $data['prenom'] , $data['age'] , $data['date_naissence'] , $data['id_user']))):
                     return true;
                else:
                     return false;
                endif;
     
       }

       public function pwd($nom)
       {
           return $nom.time();
       }

}


?>










