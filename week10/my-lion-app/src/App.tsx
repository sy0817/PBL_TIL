import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useLions } from './hooks/useLions';
import ListPage from './ListPage';
import DetailPage from './DetailPage';
import AuthForm from './components/AuthForm';
import './App.css';

function App() {
  const { user, loading: authLoading, signIn, signUp, signOut } = useAuth();
  const { lions, apiStatus, handleBatchAdd, handleDeleteLast, handleRefresh } = useLions();
  const navigate = useNavigate();

  if (authLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', color: '#aa3bff', fontWeight: 'bold', fontSize: '18px' }}>
        🔐 안전하게 사용자 인증 상태를 확인하는 중...
      </div>
    );
  }

  return (
    <div>
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '15px 30px', 
        background: '#ffffff', 
        borderBottom: '1px solid #e5e4e7',
        boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
      }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#08060d', fontWeight: 'bold', fontSize: '20px' }}>
          🦁 아기 사자 대시보드
        </Link>
        <div>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ fontSize: '14px', color: '#6b6375', fontWeight: '500' }}>
                🟢 <strong style={{ color: '#08060d' }}>{user.email}</strong> 님 로그인 중
              </span>
              <button 
                onClick={async () => {
                  await signOut();
                  navigate('/');
                }} 
                style={{ padding: '6px 12px', background: '#e5e4e7', color: '#08060d', borderRadius: '6px', fontSize: '13px', cursor: 'pointer' }}
              >
                로그아웃
              </button>
            </div>
          ) : (
            <button 
              onClick={() => navigate('/login')} 
              style={{ 
                padding: '8px 16px', 
                background: '#aa3bff', 
                color: 'white', 
                borderRadius: '6px', 
                fontWeight: 'bold',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              로그인 / 회원가입
            </button>
          )}
        </div>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <ListPage
              lions={lions}
              apiStatus={apiStatus}
              handleBatchAdd={handleBatchAdd}
              handleDeleteLast={handleDeleteLast}
              handleRefresh={handleRefresh}
              isLoggedIn={!!user}
            />
          }
        />
        <Route path="/lions/:id" element={<DetailPage lions={lions} />} />
        <Route path="/login" element={<AuthForm signIn={signIn} signUp={signUp} />} />
      </Routes>
    </div>
  );
}

export default App;