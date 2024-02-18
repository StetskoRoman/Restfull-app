package com.example.sarafan.domain;

public final class Views {
//для каждого вида view будет свой интерфейс
    public interface IdName {}

//    Отобразит все поля в котором были вызваны и все поля с IdName
    public interface FullName extends IdName { }
}
