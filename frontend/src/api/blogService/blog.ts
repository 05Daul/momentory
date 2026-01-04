import {BLOGSERVICE_API} from "../../config/env"
import {
  LikeToggleResponseDTO,
  PaginatedResponse,
  PostCreationRequestDTO,
  PostEntity,
  PostDetailDTO
} from "../../types/blogService/blogType"



export async function getPostTags(postId: number): Promise<string[]> {
  const url = `${BLOGSERVICE_API}/tags?postId=${postId}`;

  const response = await fetch(url, {
    method: "GET",
    headers: { "ngrok-skip-browser-warning": "true" }
  });

  if (response.ok) {
    return await response.json();
  } else {
    const errorText = await response.text().catch(() => " ")
    const errorMessage = errorText || `태그 조회 실패: HTTP ${response.status} 응답`;
    throw new Error(errorMessage);
  }
}

export const searchPosts = async (
    keyword: string,
    page: number = 0,
    size: number = 10
): Promise<PaginatedResponse<PostEntity>> => {
  try {
    const response = await fetch(
        `${BLOGSERVICE_API}/search?keyword=${encodeURIComponent(keyword)}&page=${page}&size=${size}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
        }
    );

    if (!response.ok) {
      throw new Error('Failed to search posts');
    }

    return await response.json();
  } catch (error) {
    console.error('Error searching posts:', error);
    throw error;
  }
};

export async function uploadImage(file: File): Promise<{ url: string }> {
  const url = `${BLOGSERVICE_API}/upload`;

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(url, {
    method: "POST",
    headers: { "ngrok-skip-browser-warning": "true" }, // FormData 사용 시 Content-Type은 자동설정되므로 ngrok만 추가
    body: formData,
  });

  if (response.ok) {
    return await response.json();
  } else {
    const errorText = await response.text();
    throw new Error(errorText || `이미지 업로드 실패: HTTP ${response.status}`);
  }
}

export async function toggleLike(postId: number, userSignId: string): Promise<LikeToggleResponseDTO> {
  const url = `${BLOGSERVICE_API}/likes/${postId}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "userSignId": userSignId,
        "ngrok-skip-browser-warning": "true",
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      const errorText = await response.text();
      throw new Error(errorText || `좋아요 처리 실패: HTTP ${response.status}`);
    }
  } catch (error) {
    console.error("좋아요 API 오류:", error);
    throw error;
  }
}


export async function writeFeed(postData: PostCreationRequestDTO, userSignId: string): Promise<PostEntity> {
  console.log("글쓰기 메서드 실행 (JSON DTO 방식)");
  const url = `${BLOGSERVICE_API}/write`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "userSignId": userSignId,
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify(postData),
  });

  if (response.ok) {
    return await response.json();
  } else {
    const errorText = await response.text();
    throw new Error(errorText || `게시글 등록 실패: HTTP ${response.status}`);
  }
}


export async function readPost(postId: number): Promise<PostDetailDTO> {
  const url = `${BLOGSERVICE_API}/${postId}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });

  if (response.ok) {
    return await response.json();
  } else {
    const errorText = await response.text();
    throw new Error(errorText || `게시글 조회 실패: HTTP ${response.status}`);
  }
}

export async function updatePost(postId: number, postData: PostCreationRequestDTO, userSignId: string): Promise<PostEntity> {
  const url = `${BLOGSERVICE_API}/write/${postId}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "userSignId": userSignId,
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify(postData),
  });

  if (response.ok) {
    return await response.json();
  } else {
    const errorText = await response.text();
    throw new Error(errorText || `게시글 수정 실패: HTTP ${response.status}`);
  }
}

export async function deleteFeed(postId: number, userSignId: string): Promise<void> {
  const url = `${BLOGSERVICE_API}/${postId}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "userSignId": userSignId,
      "ngrok-skip-browser-warning": "true",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `게시글 삭제 실패: HTTP ${response.status}`);
  }
}

export async function incrementViewCount(postId: number): Promise<string> {
  const url = `${BLOGSERVICE_API}/view?postId=${postId}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "ngrok-skip-browser-warning": "true" }
  });

  if (response.ok) {
    return await response.text();
  } else {
    const errorText = await response.text();
    throw new Error(errorText || `조회수 증가 실패: HTTP ${response.status}`);
  }
}

export async function getTrendingPosts(page: number = 0, size: number = 10): Promise<PaginatedResponse<PostEntity>> {
  const url = `${BLOGSERVICE_API}/trending?page=${page}&size=${size}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    }
  });

  if (response.ok) {
    return await response.json();
  } else {
    const errorText = await response.text();
    throw new Error(errorText || `게시물 조회 실패: HTTP ${response.status}`);
  }
}

export async function getMyPosts(userSignId: string, page: number = 0, size: number = 10): Promise<PaginatedResponse<PostEntity>> {
  const url = `${BLOGSERVICE_API}/my-posts/${userSignId}?page=${page}&size=${size}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "authorId": userSignId,
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    }
  });

  if (response.ok) {
    return await response.json();
  } else {
    const errorText = await response.text();
    throw new Error(errorText || `게시물 조회 실패: HTTP ${response.status}`);
  }
}

export async function getRecentPosts(page: number = 0, size: number = 10): Promise<PaginatedResponse<PostEntity>> {
  const url = `${BLOGSERVICE_API}/recent?page=${page}&size=${size}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    }
  });

  if (response.ok) {
    return await response.json();
  } else {
    const errorText = await response.text();
    throw new Error(errorText || `게시물 조회 실패: HTTP ${response.status}`);
  }
}

export async function getFriendsPosts(userSignId: string, page: number = 0, size: number = 10): Promise<PaginatedResponse<PostEntity>> {
  const url = `${BLOGSERVICE_API}/feed?page=${page}&size=${size}`;
  const token = localStorage.getItem('accessToken');

  try {
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "userSignId": userSignId,
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true",
      }
    });

    if (response.ok) {
      return await response.json();
    } else if (response.status === 403 || response.status === 404) {
      console.log("No friends or no permission - returning empty result");
      return {
        content: [],
        pageable: {
          pageNumber: page,
          pageSize: size,
          sort: { empty: true, sorted: false, unsorted: true },
          offset: 0,
          paged: true,
          unpaged: false
        },
        last: true,
        totalPages: 0,
        totalElements: 0,
        size: size,
        number: page,
        sort: { empty: true, sorted: false, unsorted: true },
        first: true,
        numberOfElements: 0,
        empty: true
      };
    } else {
      const errorText = await response.text().catch(() => '');
      console.error(`Error ${response.status}:`, errorText);
      return {
        content: [],
        pageable: {
          pageNumber: page,
          pageSize: size,
          sort: { empty: true, sorted: false, unsorted: true },
          offset: 0,
          paged: true,
          unpaged: false
        },
        last: true,
        totalPages: 0,
        totalElements: 0,
        size: size,
        number: page,
        sort: { empty: true, sorted: false, unsorted: true },
        first: true,
        numberOfElements: 0,
        empty: true
      };
    }
  } catch (error) {
    console.error("Error fetching friends posts:", error);
    return {
      content: [],
      pageable: {
        pageNumber: page,
        pageSize: size,
        sort: { empty: true, sorted: false, unsorted: true },
        offset: 0,
        paged: true,
        unpaged: false
      },
      last: true,
      totalPages: 0,
      totalElements: 0,
      size: size,
      number: page,
      sort: { empty: true, sorted: false, unsorted: true },
      first: true,
      numberOfElements: 0,
      empty: true
    };
  }
}