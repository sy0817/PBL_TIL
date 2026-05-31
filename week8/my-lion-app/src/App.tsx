import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { initialLions } from './data/lions.ts';
import ListPage from './ListPage';
import DetailPage from './DetailPage.tsx';
import { Lion, ApiStatus } from './types/lion';
import './App.css';

interface RandomUserResult {
  login: { uuid: string };
  name: { first: string };
  phone: string;
  email: string;
  picture: { large: string };
}

interface RandomUserResponse {
  results: RandomUserResult[];
}

function App() {
  const [lions, setLions] = useState<Lion[]>(initialLions as Lion[]);
  const [apiStatus, setApiStatus] = useState<ApiStatus>('idle');

  const handleBatchAdd = async (num: number, isRefresh: boolean = false) => {
    setApiStatus('loading');
    try {
      const res = await fetch(`https://randomuser.me/api/?results=${num}`);
      if (!res.ok) throw new Error('네트워크 에러');
      
      const data: RandomUserResponse = await res.json();
      const parts: ('Frontend' | 'Backend' | 'Design')[] = ['Frontend', 'Backend', 'Design'];

      const newOnes: Lion[] = data.results.map((u) => ({
        id: u.login.uuid,
        name: u.name.first,
        part: parts[Math.floor(Math.random() * 3)],
        tech: 'React, TypeScript, Styled-Components, Node.js',
        bio: '어제보다 성장하는 개발자입니다.',
        desc: `연락처: ${u.phone || '없음'} / 이메일: ${u.email || '없음'}`,
        email: u.email,
        phone: u.phone,
        img: u.picture.large,
        isMe: false,
      }));

      if (isRefresh) {
        setLions(newOnes);
      } else {
        setLions((prev) => [...prev, ...newOnes]);
      }
      setApiStatus('success');
    } catch (err) {
      console.error(err);
      setApiStatus('error');
    }
  };

  const handleDeleteLast = () => {
    if (lions.length === 0) return;
    setLions((prev) => prev.slice(0, -1));
  };

  const handleRefresh = () => {
    handleBatchAdd(5, true);
  };

  return (
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
          />
        }
      />
      <Route path="/lions/:id" element={<DetailPage lions={lions} />} />
    </Routes>
  );
}

export default App;