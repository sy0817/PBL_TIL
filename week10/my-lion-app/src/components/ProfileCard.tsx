import { Lion } from '../types/lion';

interface ProfileCardProps {
  lion: Lion;
  onDelete?: (id: any) => void; // 💡 number 대신 any를 주어 유연하게 바인딩
  onUpdate?: (id: any) => void; // 💡 number 대신 any를 주어 유연하게 바인딩
}

export default function ProfileCard({ lion, onDelete, onUpdate }: ProfileCardProps) {
  return (
    <article className={`lion-card ${lion.isMe ? 'my-card' : ''}`}>
      <div className="img-wrapper" style={{ backgroundImage: `url(${lion.img})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '200px', position: 'relative' }}>
        <span className="badge" style={{ position: 'absolute', top: '10px', left: '10px', background: '#aa3bff', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
          {lion.part}
        </span>
      </div>
      <div className="card-body" style={{ padding: '15px', position: 'relative' }}>
        <h3 style={{ margin: '0 0 8px 0', color: '#08060d', fontSize: '18px', fontWeight: 'bold' }}>{lion.name}</h3>
        <p className="bio" style={{ margin: '0 0 12px 0', color: '#6b6375', fontSize: '14px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{lion.bio}</p>
        
        {/* 내가 작성한 카드일 때만 에디트 버튼 제공 */}
        {lion.isMe && (
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button 
              onClick={() => onUpdate?.(lion.id)} 
              style={{ padding: '4px 8px', background: '#f0f0f0', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
            >
              ✏️ 수정
            </button>
            <button 
              onClick={() => onDelete?.(lion.id)} 
              style={{ padding: '4px 8px', background: '#ff4d4f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
            >
              🗑️ 삭제
            </button>
          </div>
        )}
      </div>
    </article>
  );
}