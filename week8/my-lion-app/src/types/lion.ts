// src/types/lion.ts
export interface Lion {
  id: string;
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