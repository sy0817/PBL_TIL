import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import List from './List';

export default function DetailPage({ lions }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const lion = lions.find(l => l.id.toString() === id?.toString());

    if (!lion) {
        return (
            <div style={{ padding: '50px', textAlign: 'center' }}>
                <h2>🦁 해당 아기 사자를 찾을 수 없습니다!</h2>
                <button onClick={() => navigate('/')} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#aa3bff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                    목록 홈으로 가기
                </button>
            </div>
        );
    }

    return (
        <div className="container" style={{ maxWidth: '800px', margin: '40px auto' }}>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                backgroundColor: 'white',
                padding: '15px 25px',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                marginBottom: '20px'
            }}>
                <button 
                    onClick={() => navigate(-1)} 
                    style={{ padding: '10px 16px', background: '#e5e4e7', color: '#333', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    ← 뒤로 가기
                </button>
                <h3 style={{ margin: 0, color: '#08060d', fontWeight: 'bold' }}>🦁 아기 사자 상세 프로필</h3>
                <button 
                    onClick={() => navigate('/')} 
                    style={{ padding: '10px 16px', background: '#aa3bff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    목록 홈으로
                </button>
            </div>

            <List lion={lion} />
        </div>
    );
}