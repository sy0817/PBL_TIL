import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthFormProps {
  signIn: (e: string, p: string) => Promise<any>;
  signUp: (e: string, p: string) => Promise<any>;
}

export default function AuthForm({ signIn, signUp }: AuthFormProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // 🌟 [추가] 비밀번호 확인 입력값을 저장하는 상태
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    try {
      if (isSignUp) {
        // 🌟 [요구사항] 회원가입 시 비밀번호 일치 확인
        if (password !== confirmPassword) {
          setErrorMsg('비밀번호가 일치하지 않습니다.');
          return; // 일치하지 않으면 Supabase로 안 보내고 여기서 함수를 멈춥니다.
        }

        await signUp(email, password);
        alert('회원가입 성공!');
        setIsSignUp(false);
        setConfirmPassword(''); // 비밀번호 확인 칸 초기화
      } else {
        await signIn(email, password);
        navigate('/');
      }
    } catch (err: any) {
      // Supabase가 던져주는 원본 에러 메시지 string 추출
      const rawMessage = err?.message || '';

      if (isSignUp) {
        // 🌟 [요구사항] 회원가입 시 이메일 중복 예외 처리
        if (rawMessage.includes('already registered') || err?.status === 422) {
          setErrorMsg('이미 중복된 이메일입니다.');
        } else {
          setErrorMsg(rawMessage || '회원가입 중 에러가 발생했습니다.');
        }
      } else {
        // 🌟 [요구사항] 로그인 시 정보 불일치(찾을 수 없음) 예외 처리
        if (rawMessage.includes('Invalid login credentials')) {
          setErrorMsg('계정을 찾을 수 없거나 비밀번호가 일치하지 않습니다.');
        } else {
          setErrorMsg(rawMessage || '로그인 중 에러가 발생했습니다.');
        }
      }
    }
  };

  // 모드가 바뀔 때 입력했던 비밀번호 확인 칸과 에러 메시지를 깔끔하게 지워주는 기능
  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setConfirmPassword('');
    setErrorMsg('');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#08060d' }}>🦁 아기사자 대시보드</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: '10px' }} />
        <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ padding: '10px' }} />
        
        {/* 🌟 [요구사항 UI] 회원가입(가입하기) 모드일 때만 비밀번호 확인 칸이 나타납니다. */}
        {isSignUp && (
          <input 
            type="password" 
            placeholder="비밀번호 확인" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
            style={{ padding: '10px' }} 
          />
        )}
        
        {/* 에러가 있을 때 띄워주는 영역 (요구사항에 맞게 다이렉트로 빨간 글씨가 변경되어 뜹니다) */}
        {errorMsg && <p style={{ color: 'red', fontSize: '13px', margin: '0', fontWeight: 'bold' }}>{errorMsg}</p>}
        
        <button type="submit" style={{ padding: '12px', background: '#aa3bff', color: 'white', border: 'none', cursor: 'pointer' }}>
          {isSignUp ? '가입하기' : '로그인'}
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '14px', cursor: 'pointer', color: '#aa3bff' }} onClick={toggleMode}>
        {isSignUp ? '이미 계정이 있나요? 로그인' : '처음이신가요? 회원가입'}
      </p>
    </div>
  );
}