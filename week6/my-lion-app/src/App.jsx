import React, { useState } from 'react';
import { initialLions } from './data/lions';
import './App.css';
import Header from './Header';
import ProfileCard from './ProfileCard';
import List from './List';

function App() {
    const [lions, setLions] = useState(initialLions);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [sort, setSort] = useState("asc");

    /* --- 비동기 상태 관리를 위한 state --- */
    const [apiStatus, setApiStatus] = useState("idle"); 

    /* --- 정보 입력창 상태 관리 및 데이터 필드 --- */
    const [selectedTrack, setSelectedTrack] = useState(null); 
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        website: '',   
        motivation: '' 
    });

    const handleBatchAdd = async (num, isRefresh = false) => {
        setApiStatus("loading"); 
        try {
            const res = await fetch(`https://randomuser.me/api/?results=${num}`);
            if (!res.ok) throw new Error("네트워크 에러");
            const data = await res.json();
            const newOnes = data.results.map(u => ({
                id: u.login.uuid,
                name: u.name.first,
                part: ['Frontend', 'Backend', 'Design'][Math.floor(Math.random() * 3)],
                tech: 'React, TypeScript, Styled-Components, Node.js',
                bio: '어제보다 더 성장하는 개발자입니다!',
                desc: `${u.name.first} 사자는 ${u.location.city}에서 활동 중인 열정적인 팀원입니다. 현재 리액트를 기반으로 한 아기사자 관리 시스템 고도화 프로젝트에 참여하며 실무 역량을 쌓고 있습니다. 단순히 코드를 짜는 것을 넘어, 사용자 경험을 최우선으로 생각하는 개발자가 되기 위해 매일 꾸준히 학습하고 기록합니다. 팀 동료들과의 원활한 소통을 중요하게 생각하며 협업의 가치를 아는 인재입니다.`,
                email: u.email,
                phone: u.cell,
                img: u.picture.large
            }));
            setLions(isRefresh ? newOnes : [...lions, ...newOnes]);
            setApiStatus("success"); 
        } catch (e) { 
            setApiStatus("error"); 
        }
    };

    const filteredLions = lions
        .filter(l => (filter === "all" || l.part === filter))
        .filter(l => l.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => sort === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRandomFill = async () => {
        try {
            const res = await fetch(`https://randomuser.me/api/?results=1`);
            const data = await res.json();
            const user = data.results[0];
            
            setFormData({
                name: user.name.first,
                phone: user.cell,
                email: user.email,
                website: `https://github.com/${user.login.username}`,
                motivation: `안녕하세요, ${user.name.first} 사자입니다! 현재 ${selectedTrack} 파트 역량을 키우기 위해 최선을 다하고 있으며, 멋쟁이사자처럼 대학 14기 아기사자 시스템 과제 구현에 열정적으로 참여하고 있습니다.`
            });
        } catch (e) {
            const firstNames = ['Kim', 'Lee', 'Park', 'Choi', 'Lion'];
            const randName = firstNames[Math.floor(Math.random() * firstNames.length)] + Math.floor(Math.random() * 100);
            setFormData({
                name: randName,
                phone: `010-${Math.floor(1000+Math.random()*9000)}-${Math.floor(1000+Math.random()*9000)}`,
                email: `${randName.toLowerCase()}@likelion.org`,
                website: `https://github.com/${randName.toLowerCase()}`,
                motivation: `안녕하세요! 훌륭한 동료들과 소통하며 매일 꾸준히 성장하고 싶은 ${selectedTrack} 개발자 지원자 ${randName}입니다.`
            });
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        alert(`${formData.name}님의 [${selectedTrack}] 정보가 정상적으로 등록되었습니다!`);
        
        setFormData({ name: '', phone: '', email: '', website: '', motivation: '' });
        setSelectedTrack(null);
    };

    return (
        <div id="app">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <Header 
                    count={lions.length} 
                    onDelete={() => setLions(prev => prev.slice(0, -1))}
                    onAdd={(n) => handleBatchAdd(n)}
                    onRefresh={() => handleBatchAdd(lions.length, true)}
                />
                
            
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', fontWeight: 'bold', marginLeft: '4px' }}>
                    {apiStatus === "loading" && <span style={{ color: '#ffc107' }}>⏳ 불러오는 중...</span>}
                    {apiStatus === "success" && <span style={{ color: '#28a745' }}>✅ 완료!</span>}
                    {apiStatus === "error" && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ color: '#dc3545' }}>❌ 불러오기 실패</span>
                            <button 
                                type="button"
                                onClick={() => handleBatchAdd(lions.length, true)}
                                style={{ padding: '4px 8px', fontSize: '11px', background: '#e11d48', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                            >
                                재시도
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <section className="control-panel">
                <div className="filter-row">
                    <div className="filter-item">
                        <label>이름 검색</label>
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="검색..." />
                    </div>
                    <div className="filter-item">
                        <label>파트</label>
                        <select value={filter} onChange={e => setFilter(e.target.value)}>
                            <option value="all">전체</option>
                            <option value="Frontend">Frontend</option>
                            <option value="Backend">Backend</option>
                            <option value="Design">Design</option>
                        </select>
                    </div>
                    <div className="filter-item">
                        <label>정렬 순서</label>
                        <select value={sort} onChange={e => setSort(e.target.value)}>
                            <option value="asc">이름 오름차순</option>
                            <option value="desc">이름 내림차순</option>
                        </select>
                    </div>
                </div>
            </section>
            
            <main className="grid-container">
                {filteredLions.map(l => (
                    <div 
                        key={l.id} 
                        onClick={() => setSelectedTrack(l.part)} 
                        style={{ cursor: 'pointer' }}
                    >
                        <ProfileCard lion={l} />
                    </div>
                ))}
            </main>
            
            <section className="list-container">
                <h2>🦁 아기사자별 상세페이지</h2>
                {filteredLions.map(l => <List key={l.id} lion={l} />)}
            </section>

            {/* 외부 CSS 영향 완전히 제압하고 1번 사진 크기로 딱 떨어지는 컴팩트 모달 */}
            {selectedTrack && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center',
                    alignItems: 'center', zIndex: 9999
                }}>
                    
                    <div style={{
                        maxWidth: '420px', width: '100%', textAlign: 'left', 
                        background: '#ffffff', padding: '24px', borderRadius: '12px', 
                        border: '1px solid #333333', color: '#000000',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                        boxSizing: 'border-box'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #eeeeee', paddingBottom: '10px' }}>
                            <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#0056b3' }}>
                                [{selectedTrack}] 아기사자 정보 입력
                            </span>
                        </div>

                        <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                          
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <label style={{ fontSize: '13px', color: '#333333', fontWeight: 'bold' }}>이름</label>
                                <input 
                                    type="text" name="name" required value={formData.name} onChange={handleFormChange} placeholder="이름을 입력하세요"
                                    style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cccccc', background: '#ffffff', color: '#000000', fontSize: '14px', outline: 'none', width: '100%', boxSizing: 'border-box' }}
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <label style={{ fontSize: '13px', color: '#333333', fontWeight: 'bold' }}>전화번호</label>
                                <input 
                                    type="tel" name="phone" required value={formData.phone} onChange={handleFormChange} placeholder="010-1234-5678"
                                    style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cccccc', background: '#ffffff', color: '#000000', fontSize: '14px', outline: 'none', width: '100%', boxSizing: 'border-box' }}
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <label style={{ fontSize: '14px', color: '#333333', fontWeight: 'bold' }}>이메일 주소</label>
                                <input 
                                    type="email" name="email" required value={formData.email} onChange={handleFormChange} placeholder="example@likelion.org"
                                    style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cccccc', background: '#ffffff', color: '#000000', fontSize: '14px', outline: 'none', width: '100%', boxSizing: 'border-box' }}
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <label style={{ fontSize: '13px', color: '#333333', fontWeight: 'bold' }}>웹사이트</label>
                                <input 
                                    type="url" name="website" required value={formData.website} onChange={handleFormChange} placeholder="https://..."
                                    style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cccccc', background: '#ffffff', color: '#000000', fontSize: '14px', outline: 'none', width: '100%', boxSizing: 'border-box' }}
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <label style={{ fontSize: '13px', color: '#333333', fontWeight: 'bold' }}>한마디</label>
                                <textarea 
                                    name="motivation" required rows="4" value={formData.motivation} onChange={handleFormChange} placeholder="자신을 나타내는 한마디를 적어주세요."
                                    style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cccccc', background: '#ffffff', color: '#000000', fontSize: '14px', resize: 'none', lineHeight: '1.5', outline: 'none', width: '100%', boxSizing: 'border-box' }}
                                />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '10px' }}>
                                <button 
                                    type="button"
                                    onClick={handleRandomFill}
                                    style={{ padding: '10px 14px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}
                                >
                                    랜덤 값 채우기
                                </button>
                                <button 
                                    type="submit" 
                                    style={{ padding: '10px 14px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}
                                >
                                    추가하기
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => {
                                        setFormData({ name: '', phone: '', email: '', website: '', motivation: '' });
                                        setSelectedTrack(null);
                                    }} 
                                    style={{ padding: '10px 14px', background: '#6c757d', border: 'none', color: 'white', cursor: 'pointer', borderRadius: '6px', fontWeight: 'bold', fontSize: '13px' }}
                                >
                                    취소
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;