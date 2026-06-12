// src/components/Header.tsx
import { ApiStatus } from '../types/lion';

interface HeaderProps {
  count: number;
  onDelete: () => void;
  onAdd: (num: number) => void;
  onRefresh: () => void;
  isLoggedIn: boolean; // 로그인 상태 판단용 props 추가
  apiStatus: ApiStatus; // API 요청 상태 처리용 props 추가
}

export default function Header({ 
  count, 
  onDelete, 
  onAdd, 
  onRefresh, 
  isLoggedIn, 
  apiStatus 
}: HeaderProps) {
  const isLoading = apiStatus === 'loading';

  return (
    <header className="control-panel">
      <div className="button-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="stats" style={{ fontSize: '16px', color: '#08060d' }}>
          현재 대시보드 사자 : 총 <strong style={{ color: '#aa3bff' }}>{count}</strong>명
        </span>
        {!isLoggedIn && (
          <span style={{ fontSize: '13px', color: '#e63946', fontWeight: '500' }}>
            ⚠️ 추가 / 삭제 / 리셋 기능은 로그인 후 활성화됩니다.
          </span>
        )}
      </div>

      <div className="button-row" style={{ display: 'flex', gap: '10px', marginTop: '15px', flexWrap: 'wrap' }}>
        <button 
          onClick={() => onAdd(1)} 
          disabled={!isLoggedIn || isLoading}
          style={{ 
            backgroundColor: isLoggedIn ? '#aa3bff' : '#ccc', 
            color: 'white', 
            cursor: isLoggedIn && !isLoading ? 'pointer' : 'not-allowed',
            opacity: isLoading ? 0.7 : 1
          }}
        >
          {isLoggedIn ? '🦁 랜덤 1명 추가' : '🔒 추가 불가능'}
        </button>

        <button 
          onClick={() => onAdd(5)} 
          disabled={!isLoggedIn || isLoading}
          style={{ 
            backgroundColor: isLoggedIn ? '#6c5ce7' : '#ccc', 
            color: 'white', 
            cursor: isLoggedIn && !isLoading ? 'pointer' : 'not-allowed',
            opacity: isLoading ? 0.7 : 1
          }}
        >
          {isLoggedIn ? '🦁 랜덤 5명 추가' : '🔒 추가 불가능'}
        </button>

        <button 
          onClick={onDelete} 
          disabled={!isLoggedIn || isLoading}
          style={{ 
            backgroundColor: isLoggedIn ? '#e63946' : '#ccc', 
            color: 'white', 
            cursor: isLoggedIn && !isLoading ? 'pointer' : 'not-allowed',
            opacity: isLoading ? 0.7 : 1
          }}
        >
          {isLoggedIn ? '🗑️ 마지막 사자 삭제' : '🔒 삭제 불가능'}
        </button>

        <button 
          onClick={onRefresh} 
          disabled={!isLoggedIn || isLoading}
          style={{ 
            backgroundColor: isLoggedIn ? '#2a9d8f' : '#ccc', 
            color: 'white', 
            cursor: isLoggedIn && !isLoading ? 'pointer' : 'not-allowed',
            opacity: isLoading ? 0.7 : 1
          }}
        >
          {isLoggedIn ? '🔄 전체 명단 리셋' : '🔒 리셋 불가능'}
        </button>
      </div>

      {isLoading && (
        <p style={{ color: '#aa3bff', fontWeight: 'bold', marginTop: '12px', fontSize: '14px', margin: '10px 0 0 0' }}>
          🔄 Supabase 클라우드 데이터베이스 통신 중...
        </p>
      )}
    </header>
  );
}