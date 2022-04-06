<?php

class Model extends DB
{


    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     */
    public function destroy($table , $id)
    {

         $query = "DELETE FROM $table where id like $id";
         $query = $this->connect()->prepare($query);
         if($query->execute()):
              return true;
         else:
              return false;
         endif; 

    }

    /**
     * get times which possible to get.
     *
     * @param date $dt
     */
    public function getTimesR($table , $dt , $id_time)
    {

          $query = "SELECT * FROM $table where date like '$dt' and id_time like $id_time";
          $query = $this->connect()->prepare($query);
          if($query->execute() && $query->rowCount()>0):
                return $query->rowCount();
          else:
                return false;
          endif;

    }


    /**
     * get time which possible to get.
     *
     * @param id $id_time
     */
    public function getTime($id_time)
    {

          $query = "SELECT val FROM times where id like $id_time";
          $query = $this->connect()->prepare($query);
          if($query->execute() && $query->rowCount()>0):
                return $query->fetch(PDO::FETCH_ASSOC);
          else:
                return false;
          endif;

    }

}