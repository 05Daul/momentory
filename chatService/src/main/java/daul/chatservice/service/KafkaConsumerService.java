package daul.chatservice.service;

import daul.chatservice.dto.ChatMessageDto;
import daul.chatservice.entity.ChatMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class KafkaConsumerService {

  private final ChatService chatService;

  /**
   * chat-events 토픽에서 메시지 수신 ChatMessage 대신 ChatMessageDto로 수신 (Kafka는 DTO를 전송)
   */
  @KafkaListener(topics = "chat-events", groupId = "chat-service-group")
  public void consumeChatMessage(ChatMessageDto messageDto) {  // ⭐ 변경: ChatMessage → ChatMessageDto
    try {
      log.info("Kafka 메시지 수신 - RoomId: {}, SenderId: {}",
          messageDto.getRoomId(), messageDto.getUserSignId());

      chatService.handleReceivedMessage(messageDto);

    } catch (Exception e) {
      log.error("Kafka 메시지 처리 실패: {}", e.getMessage(), e);
    }
  }
}