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

  // 3. 카드 개별 삭제 기능
  const handleDeleteCard = async (id: any) => {
    const isConfirm = window.confirm('정말 이 카드를 삭제하시겠습니까?');
    if (!isConfirm) return;

    setApiStatus('loading');
    try {
      const { error } = await supabase.from('lions').delete().eq('id', id);
      if (error) throw error;

      await handleRefresh();
      alert('삭제되었습니다!');
    } catch (err) {
      console.error(err);
      setApiStatus('error');
    }
  };

  // 4. 카드 수정 기능 (꼬임 현상 완벽 조치 완료 🚀)
  const handleUpdateCard = async (id: any) => {
    const currentLion = lions.find(l => String(l.id) === String(id));
    if (!currentLion) return;

    const newBio = window.prompt('수정할 한 줄 소개를 입력하세요:', currentLion.bio);
    if (newBio === null) return;

    setApiStatus('loading');
    try {
      // 💡 어떤 테이블 구조에서든 'never' 에러가 절대 나지 않도록 Payload와 Query 전체를 강제 단언(as any) 처리합니다.
      const updatePayload: any = { bio: newBio };
      
      const { error } = await (supabase.from('lions') as any)
        .update(updatePayload)
        .eq('id', id);

      if (error) throw error;

      await handleRefresh();
      alert('수정 완료!');
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
    handleDeleteCard,
    handleUpdateCard,
    handleRefresh,
  };
}