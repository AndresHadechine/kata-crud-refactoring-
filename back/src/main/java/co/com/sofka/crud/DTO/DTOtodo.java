package co.com.sofka.crud.DTO;

import co.com.sofka.crud.domain.Todo;
import com.sun.xml.bind.v2.TODO;

public class DTOtodo {

    private Long id;
    private String name;
    private boolean completed;
    private String groupListId;

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public boolean isCompleted() {
        return completed;
    }

    public String getGroupListId() {
        return groupListId;
    }

    public Todo convertInTODO(){
        Todo todo = new Todo();
        todo.setName(name);
        todo.setId(id);
        todo.setCompleted(completed);
        todo.setGroupListId(groupListId);
        return todo;
    }
    public void convertInDTO(Todo todo){
        name = todo.getName();
        id = todo.getId();
        completed = todo.isCompleted();
        groupListId = getGroupListId();
    }
}
