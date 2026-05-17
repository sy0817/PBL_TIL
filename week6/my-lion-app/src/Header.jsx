export default function Header({ count, onDelete, onAdd, onRefresh }) {
    return (
        <header className="control-panel">
            <div className="button-row">
                <button onClick={() => alert('추가 기능')}>아기 사자 추가</button>
                <button onClick={onDelete}>마지막 사자 삭제</button>
                <span className="stats">총 <strong>{count}</strong>명</span>
            </div>
            <div className="button-row">
                <button onClick={() => onAdd(1)}>랜덤 1명 추가</button>
                <button onClick={() => onAdd(5)}>랜덤 5명 추가</button>
                <button onClick={onRefresh}>전체 새로고침</button>
            </div>
        </header>
    );
}