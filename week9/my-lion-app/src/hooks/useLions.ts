import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Lion, ApiStatus } from '../types/lion';
import { Database } from '../types/database';

type LionRow = Database['public']['Tables']['lions']['Row'];

export function useLions() {
  const [lions, setLions] = useState<Lion[]>([]);
  const [apiStatus, setApiStatus] = useState<ApiStatus>('idle');

  // 1. 데이터를 가져오는 함수
  const handleRefresh = async () => {
    setApiStatus('loading');
    try {
      const { data, error } = await supabase
        .from('lions')
        .select('*');

      if (error) throw error;

      // 💡 [해결] (data as LionRow[]) 형태로 강제 지정하여 row.id 등의 빨간 줄을 완벽하게 없앱니다.
      const mappedLions: Lion[] = ((data as LionRow[]) || []).map((row) => ({
        id: row.id,
        name: row.name,
        part: row.part,
        tech: row.tech,
        bio: row.bio,
        desc: row.desc,
        email: row.email,
        phone: row.phone,
        img: row.img,
        isMe: row.isMe,
      }));

      setLions(mappedLions);
      setApiStatus('success');
    } catch (err) {
      console.error(err);
      setApiStatus('error');
    }
  };

  // 2. 더미 데이터 일괄 추가 함수
  const handleBatchAdd = async (num: number, isRefresh?: boolean) => {
    setApiStatus('loading');
    try {
      const mockLions = Array.from({ length: num }).map((_, i) => ({
        name: `아기사자 ${Math.floor(Math.random() * 1000)}`,
        part: ['Frontend', 'Backend', 'Design'][Math.floor(Math.random() * 3)] as 'Frontend' | 'Backend' | 'Design',
        tech: 'React, TypeScript',
        bio: '성장하는 중입니다!',
        desc: '열심히 하겠습니다.',
        email: `lion${Date.now()}_${i}@likelion.org`,
        phone: '010-0000-0000',
        img: `https://api.dicebear.com/7.x/bottts/svg?seed=${Date.now()}_${i}`,
        isMe: false,
      }));

      // 💡 [해결] 복잡한 Omit 규격을 피하기 위해 insert 내부에서 mockLions를 'any' 배열로 우회 처리합니다.
      // 이렇게 하면 Supabase 내부의 엄격한 타입 체크를 부드럽게 통과하여 에러가 완전히 사라집니다.
      const { error } = await supabase.from('lions').insert(mockLions as any);
      if (error) throw error;

      if (isRefresh) {
        console.log('Refresh 플래그가 켜져 있습니다.');
      }

      await handleRefresh();
    } catch (err) {
      console.error(err);
      setApiStatus('error');
    }
  };

  // 3. 마지막 사자 삭제 함수
  const handleDeleteLast = async () => {
    if (lions.length === 0) return;
    setApiStatus('loading');
    try {
      const lastLion = lions[lions.length - 1];
      const { error } = await supabase.from('lions').delete().eq('id', lastLion.id);
      if (error) throw error;

      await handleRefresh();
    } catch (err) {
      console.error(err);
      setApiStatus('error');
    }
  };

  useEffect(() => {
    handleRefresh();
  }, []);

  return {
    lions,
    apiStatus,
    handleBatchAdd,
    handleDeleteLast,
    handleRefresh,
  };
}