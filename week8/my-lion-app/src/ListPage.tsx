import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from './components/Header';
import ProfileCard from './components/ProfileCard';
import { Lion, ApiStatus } from './types/lion';

interface ListPageProps {
  lions: Lion[];
  apiStatus: ApiStatus;
  handleBatchAdd: (num: number, isRefresh?: boolean) => Promise<void>;
  handleDeleteLast: () => void;
  handleRefresh: () => void;
}

export default function ListPage({
  lions,
  apiStatus,
  handleBatchAdd,
  handleDeleteLast,
  handleRefresh,
}: ListPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const filter = searchParams.get('filter') || 'all';
  const sort = searchParams.get('sort') || 'asc';
  const search = searchParams.get('search') || '';

  const updateQueryParam = (key: string, value: string, defaultValue: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === defaultValue || !value) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const filteredLions = lions
    .filter((lion) => {
      if (filter === 'all') return true;
      return lion.part?.toLowerCase() === filter.toLowerCase();
    })
    .filter((lion) => lion.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'asc') return a.name.localeCompare(b.name);
      if (sort === 'desc') return b.name.localeCompare(a.name);
      return 0;
    });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateQueryParam('filter', e.target.value, 'all');
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateQueryParam('sort', e.target.value, 'asc');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateQueryParam('search', e.target.value, '');
  };

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
            <label>트랙 필터</label>
            <select value={filter} onChange={handleFilterChange}>
              <option value="all">전체 보기</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Design">Design</option>
            </select>
          </div>

          <div className="filter-item">
            <label>정렬 기준</label>
            <select value={sort} onChange={handleSortChange}>
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
              onChange={handleSearchChange}
            />
          </div>
        </div>
        {apiStatus === 'loading' && (
          <p style={{ color: 'orange', fontWeight: 'bold', marginTop: '10px' }}>
            🔄 데이터를 가져오는 중입니다...
          </p>
        )}
      </section>

      <main className="grid-container">
        {filteredLions.map((lion) => (
          <Link
            to={`/lions/${lion.id}`}
            key={lion.id}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <ProfileCard lion={lion} />
          </Link>
        ))}
      </main>
    </div>
  );
}