// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database'; // 👈 새로 만든 database 타입을 가져옵니다.

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL 또는 Anon Key가 .env.local 파일에 설정되지 않았습니다.');
}

// 분리된 <Database> 타입을 주입하여 클라이언트를 생성합니다.
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);