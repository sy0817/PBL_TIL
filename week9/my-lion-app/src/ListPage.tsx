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
  isLoggedIn: boolean; // 👈 App.tsx와 싱크를 맞추기 위해 로그인 상태 타입을 추가합니다.
}

export default function ListPage({
  lions,
  apiStatus,
  handleBatchAdd,
  handleDeleteLast,
  handleRefresh,
  isLoggedIn, // 👈 구조 분해 할당으로 꺼내옵니다.
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
      return lion.part === filter;
    })
    .filter((lion) => {
      return lion.name.toLowerCase().includes(search.toLowerCase());
    })
    .sort((a, b) => {
      if (sort === 'asc') return a.name.localeCompare(b.name);
      return b.name.localeCompare(a.name);
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
    <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      {/* ⭕ 고정된 true 대신 App에서 전달받은 실제 로그인 상태(isLoggedIn)를 연결합니다 */}
      <Header
        count={lions.length}
        onDelete={handleDeleteLast}
        onAdd={handleBatchAdd}
        onRefresh={handleRefresh}
        isLoggedIn={isLoggedIn}
        apiStatus={apiStatus}
      />

      <section className="control-panel" style={{ marginTop: '20px' }}>
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
      </section>

      <main className="grid-container" style={{ marginTop: '20px' }}>
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