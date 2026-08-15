package com.email.writer_sb.controller;

import com.email.writer_sb.Service.EmailGeneratorService;
import com.email.writer_sb.dtos.EmailRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/email")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class EmailGeneratorController {

    private final EmailGeneratorService emailGeneratorService;

    @PostMapping("/generate")
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest) {

        String response = emailGeneratorService.generateEmailReplay(emailRequest);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
