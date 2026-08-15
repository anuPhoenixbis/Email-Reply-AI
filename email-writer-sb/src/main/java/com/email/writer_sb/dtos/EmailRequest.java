package com.email.writer_sb.dtos;

import lombok.Data;

@Data
public class EmailRequest {
    private String emailContent;
    private String tone="professional";
}
