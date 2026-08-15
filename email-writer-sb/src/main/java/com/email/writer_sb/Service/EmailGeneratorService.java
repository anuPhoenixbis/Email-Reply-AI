package com.email.writer_sb.Service;

import com.email.writer_sb.dtos.EmailRequest;
import com.email.writer_sb.dtos.GeminiRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;


@Slf4j
@Service
@RequiredArgsConstructor
public class EmailGeneratorService {

    @Value("${gemini.url}")
    private String geminiApiUrl;
    @Value("${gemini.apikey}")
    private String geminiApiKey;

    private final WebClient webClient;

    public String generateEmailReplay(EmailRequest emailRequest) {

        String prompt = buildPrompt(emailRequest);

        GeminiRequest request = new GeminiRequest("gemini-3.5-flash-lite",prompt);

        String response = webClient.post()
                .uri(geminiApiUrl)
                .header("x-goog-api-key", geminiApiKey)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(request)
                .retrieve()
                .onStatus(
                        status -> status.isError(),
                        clientResponse -> clientResponse.bodyToMono(String.class)
                                .doOnNext(body -> log.error("Gemini error: {}", body))
                                .map(RuntimeException::new)
                )
                .bodyToMono(String.class)
                .block();
        return extractResponse(response);
    }

    private String extractResponse(String response) {
        try{
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode node = objectMapper.readTree(response);

            for(JsonNode step : node.path("steps")){
                if("model_output".equals(step.get("type").asString())){

                    for(JsonNode content : step.path("content")){
                        if("text".equals(content.get("type").asString())){
                            return content.get("text").asString();
                        }
                    }
                }
            }

            return "No response generated";
        }catch(Exception e){
            log.error("Error in processing response: {}", e.getMessage());
            return "Error in processing response";
        }
    }

    private String buildPrompt(EmailRequest emailRequest) {

        String emailContent = emailRequest.getEmailContent();
        String tone = emailRequest.getTone();

        String prompt = """
            You are an AI email assistant.

            Generate a reply to the following email.

            Email:
            %s

            Tone:
            %s

            Return only the email response.
            Do not add explanations or additional text.
            """.formatted(emailContent, tone);

        return prompt;
    }
}
