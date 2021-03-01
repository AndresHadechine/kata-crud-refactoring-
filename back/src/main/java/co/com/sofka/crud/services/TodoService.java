package co.com.sofka.crud.services;

import co.com.sofka.crud.DTO.DTOtodo;
import co.com.sofka.crud.domain.Todo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TodoService {

    @Autowired
    private TodoRepository repository;

    public Iterable<Todo> list(){
        return repository.findAll();
    }

    public DTOtodo save(DTOtodo dtotodo){
        Todo todo = new Todo();
        todo = dtotodo.convertInTODO();
         repository.save(todo);
         dtotodo.convertInDTO(todo);
        return dtotodo;
    }

    public void delete(Long id){
        repository.delete(get(id).convertInTODO());
    }

    public DTOtodo get(Long id){
        DTOtodo dtotodo = new DTOtodo();
        dtotodo.convertInDTO(repository.findById(id).orElseThrow());
         return dtotodo;
    }

}
