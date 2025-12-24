package daul.userservice.service;

import java.io.IOException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {
String storeFile(MultipartFile file) throws IOException;
}
