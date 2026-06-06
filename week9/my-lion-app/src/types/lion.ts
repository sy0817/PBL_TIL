export interface Lion {
  id: string; // Supabase UUID 매핑을 위해 string으로 고정합니다.
  name: string;
  part: 'Frontend' | 'Backend' | 'Design';
  tech: string;
  bio: string;
  desc: string;
  email: string;
  phone: string;
  img: string;
  isMe: boolean;
}

export type ApiStatus = 'idle' | 'loading' | 'success' | 'error';