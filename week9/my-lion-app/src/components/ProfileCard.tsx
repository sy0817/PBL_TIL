// src/components/ProfileCard.tsx
import { Lion } from '../types/lion';

interface ProfileCardProps {
  lion: Lion;
}

export default function ProfileCard({ lion }: ProfileCardProps) {
  return (
    <article className={`lion-card ${lion.isMe ? 'my-card' : ''}`}>
      <div className="img-wrapper" style={{ backgroundImage: `url(${lion.img})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '200px', position: 'relative' }}>
        <span className="badge" style={{ position: 'absolute', top: '10px', left: '10px', background: '#aa3bff', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
          {lion.part}
        </span>
      </div>
      <div className="card-body" style={{ padding: '15px' }}>
        <h3 style={{ margin: '0 0 8px 0', color: '#08060d', fontSize: '18px', fontWeight: 'bold' }}>{lion.name}</h3>
        <p className="bio" style={{ margin: 0, color: '#6b6375', fontSize: '14px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{lion.bio}</p>
      </div>
    </article>
  );
}