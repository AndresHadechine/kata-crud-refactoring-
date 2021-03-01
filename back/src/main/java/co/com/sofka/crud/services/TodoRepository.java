package co.com.sofka.crud.services;

import co.com.sofka.crud.domain.Todo;
import org.springframework.data.repository.CrudRepository;

public interface TodoRepository extends CrudRepository<Todo, Long> {
}
