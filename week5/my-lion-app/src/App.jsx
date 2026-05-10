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

    const handleBatchAdd = async (num, isRefresh = false) => {
        try {
            const res = await fetch(`https://randomuser.me/api/?results=${num}`);
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
        } catch (e) { alert("연결 실패"); }
    };

    const filteredLions = lions
        .filter(l => (filter === "all" || l.part === filter))
        .filter(l => l.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => sort === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));

    return (
        <div id="app">
            <Header 
                count={lions.length} 
                onDelete={() => setLions(prev => prev.slice(0, -1))}
                onAdd={(n) => handleBatchAdd(n)}
                onRefresh={() => handleBatchAdd(lions.length, true)}
            />
            <section className="control-panel">
                <div className="filter-row">
                    <div className="filter-item">
                        <label>이름 검색</label>
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="검색..." />
                    </div>
                    <div className="filter-item">
                        <label>파트 필터</label>
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
                {filteredLions.map(l => <ProfileCard key={l.id} lion={l} />)}
            </main>
            <section className="list-container">
                <h2>🦁 아기사자별 상세페이지</h2>
                {filteredLions.map(l => <List key={l.id} lion={l} />)}
            </section>
        </div>
    );
}
export default App;