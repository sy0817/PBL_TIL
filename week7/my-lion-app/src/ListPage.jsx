import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from './Header';
import ProfileCard from './ProfileCard';

export default function ListPage({ lions, apiStatus, handleBatchAdd, handleDeleteLast, handleRefresh }) {
    const [searchParams, setSearchParams] = useSearchParams();

    const filter = searchParams.get('filter') || 'all';
    const sort = searchParams.get('sort') || 'asc';
    const search = searchParams.get('search') || '';

    const updateQueryParam = (key, value, defaultValue) => {
        const newParams = new URLSearchParams(searchParams);
        if (value === defaultValue || !value) {
            newParams.delete(key);
        } else {
            newParams.set(key, value);
        }
        setSearchParams(newParams);
    };
    
    const filteredLions = lions
        .filter(lion => {
            if (filter === 'all') return true;
            return lion.part?.toLowerCase() === filter.toLowerCase();
        })
        .filter(lion => lion.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            if (sort === 'asc') return a.name.localeCompare(b.name);
            if (sort === 'desc') return b.name.localeCompare(a.name);
            return 0;
        });

    return (
        <div className="container">
            <Header 
                count={lions.length} 
                onDelete={handleDeleteLast} 
                onAdd={handleBatchAdd} 
                onRefresh={handleRefresh} 
            />

            <section className="control-panel">
                <div className="filter-row">
                    <div className="filter-item">
                        <label>파트 필터</label>
                        <select value={filter} onChange={(e) => updateQueryParam('filter', e.target.value, 'all')}>
                            <option value="all">전체보기</option>
                            <option value="Frontend">Frontend</option>
                            <option value="Backend">Backend</option>
                            <option value="Design">Design</option>
                        </select>
                    </div>

                    <div className="filter-item">
                        <label>정렬 기준</label>
                        <select value={sort} onChange={(e) => updateQueryParam('sort', e.target.value, 'asc')}>
                            <option value="asc">이름 오름차순</option>
                            <option value="desc">이름 내림차순</option>
                        </select>
                    </div>

                    <div className="filter-item">
                        <label>사자 이름 검색</label>
                        <input 
                            type="text" 
                            placeholder="이름을 입력하세요..." 
                            value={search}
                            onChange={(e) => updateQueryParam('search', e.target.value, '')}
                        />
                    </div>
                </div>
                {apiStatus === "loading" && <p style={{ color: 'orange', fontWeight: 'bold', marginTop: '10px' }}>🔄 데이터를 가져오는 중입니다...</p>}
            </section>

            <main className="grid-container">
                {filteredLions.map(lion => (
                    <Link to={`/lions/${lion.id}`} key={lion.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <ProfileCard lion={lion} />
                    </Link>
                ))}
            </main>
        </div>
    );
}