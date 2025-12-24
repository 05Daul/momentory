export const getImageUrl = (path: string | null | undefined): string => {
  if (!path) return '';

  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  if (path.startsWith('/')) {
    const GCS_BASE_URL = 'https://storage.googleapis.com/miniblog-storage';
    return `${GCS_BASE_URL}${path}`;
  }

  // 3. 예전 방식(로컬 서버) 대응이 필요 없다면 위 단계에서 마무리됩니다.
  // 필요한 경우에만 아래 주소를 유지하세요.
  const USERSERVICE_URL = 'http://127.0.0.1:1003';
  return `${USERSERVICE_URL}${path}`;
};