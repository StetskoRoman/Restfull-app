package com.example.sarafan.restController;

import com.example.sarafan.domain.Message;
import com.example.sarafan.domain.Views;
import com.example.sarafan.repo.MessageRepo;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/message")
@RequiredArgsConstructor
public class MessageController {


    private final MessageRepo messageRepo;

    @GetMapping
    @JsonView(Views.IdName.class)  //в листе будут только ид и имена, но не дата, с датой будет во всех остальных
    public List<Message> list() {
        return messageRepo.findAll();
    }

    @GetMapping("/{id}")
    public Message getOne(@PathVariable("id") Message message) {  //Spring сам по id получает весь объект, -> @PathVariable("id") по ид в юрл найдет весь message

        return message;
    }

    @PostMapping
    public Message create(@RequestBody Message message) {
        message.setCreationDate(LocalDateTime.now());
        return messageRepo.save(message);
    }

    @PutMapping("/{id}")
    public Message update(@PathVariable("id") Message messageFromDb,
                          @RequestBody Message message) {   //message от пользователя, который вводит, в теле запроса будет все содержаться
// BeanUtils!!!, no BeanUtil
        BeanUtils.copyProperties(message, messageFromDb, "id");  //скопировать все боля из message в messageFromDb кроме ид

        return messageRepo.save(messageFromDb);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Message message) {
        messageRepo.delete(message);
    }
}
