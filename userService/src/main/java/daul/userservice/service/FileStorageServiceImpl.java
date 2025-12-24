package daul.userservice.service;

import com.google.cloud.storage.Storage;
import com.google.cloud.storage.BlobInfo;
import java.io.IOException;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
@RequiredArgsConstructor

public class FileStorageServiceImpl implements FileStorageService {

  private final Storage storage;


  @Value("${file.bucket-name}")
  private String bucketName;

  @Override
  public String storeFile(MultipartFile file) throws IOException {
    try {
      String originalFilename = file.getOriginalFilename();
      String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
      String storedFilename = UUID.randomUUID().toString() + extension;

      // GCS 업로드
      BlobInfo blobInfo = BlobInfo.newBuilder(bucketName, "profiles/" + storedFilename)
          .setContentType(file.getContentType())
          .build();

      storage.create(blobInfo, file.getBytes());

      // GCS 공개 경로 반환 (버킷 설정에 따라 다름)
      return "/profiles/" + storedFilename;

    } catch (IOException e) {
      log.error("GCS 파일 저장 실패", e);
      throw new RuntimeException("파일 저장 실패", e);
    }
  }
}


