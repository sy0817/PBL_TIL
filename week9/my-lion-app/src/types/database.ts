// src/types/database.ts

export interface Database {
  public: {
    Tables: {
      lions: {
        Row: {
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
          created_at?: string;
        };
        Insert: Omit<Database['public']['Tables']['lions']['Row'], 'id' | 'created_at'> & { id?: string };
        Update: Partial<Database['public']['Tables']['lions']['Row']>;
      };
    };
  };
}