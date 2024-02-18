package com.example.sarafan.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity
@Table //чтоб сущность искал именно в таблице БД (хотя вроде и не обязательно же)
@ToString(of = {"id", "text"}) // fields in String
@EqualsAndHashCode(of = "id")
@Getter
@Setter

public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(Views.IdName.class)  //создали интерфейс маркер  когда мы будем отдавать месседж через API с указанием Views.IdName - будем
//    видеть только поля помеченные этим интерфейсом
    private Long id;

    @JsonView(Views.IdName.class)
    private String text;

    // @Column(updatable = false) - необновляемое поле значит
    @Column(updatable = false)
    @JsonView(Views.FullName.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-mm-dd hh:mm:ss")
    // спринг все в Json переводит вообщето- делаем строку читабельную из даты

    private LocalDateTime creationDate;

}
