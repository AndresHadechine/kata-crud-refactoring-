package co.com.sofka.crud.controller;

import co.com.sofka.crud.DTO.DTOtodo;
import co.com.sofka.crud.services.TodoService;
import co.com.sofka.crud.domain.Todo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {

    @Autowired
    private TodoService service;

    @GetMapping(value = "api/todos")
    public Iterable<Todo> list(){
        return service.list();
    }
    
    @PostMapping(value = "api/todo")
    public DTOtodo save(@RequestBody DTOtodo dtotodo){
        return service.save(dtotodo);
    }

    @PutMapping(value = "api/todo")
    public DTOtodo update(@RequestBody DTOtodo dtotodo){
        if(dtotodo.getId() != null){
            return service.save(dtotodo);
        }
        throw new RuntimeException("No existe el id para actualziar");
    }

    @DeleteMapping(value = "api/{id}/todo")
    public void delete(@PathVariable("id")Long id){
        service.delete(id);
    }

    @GetMapping(value = "api/{id}/todo")
    public DTOtodo get(@PathVariable("id") Long id){
        return service.get(id);
    }

}
