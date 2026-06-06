// src/components/List.tsx
import { Lion } from '../types/lion';

interface ListProps {
  lion: Lion;
}

export default function List({ lion }: ListProps) {
  return (
    <div className="list-item" style={{ display: 'block', padding: '30px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
      <div className="info-main">
        <strong style={{ fontSize: '1.4rem', color: '#08060d', fontWeight: 'bold' }}>
          {lion.name} <span style={{ fontSize: '1rem', color: '#aa3bff', background: 'rgba(170, 59, 255, 0.1)', padding: '4px 8px', borderRadius: '6px', marginLeft: '5px' }}>{lion.part}</span>
        </strong>

        <p style={{ margin: '15px 0', color: '#aa3bff', fontWeight: 'bold', fontSize: '1.1rem', fontStyle: 'italic' }}>
          " {lion.bio} "
        </p>

        <p
          style={{
            marginTop: '15px',
            lineHeight: '1.7',
            color: '#6b6375',
            padding: '15px 0',
            borderTop: '1px solid #e5e4e7',
          }}
        >
          {lion.desc}
        </p>
      </div>

      <ul
        className="info-sub"
        style={{
          listStyle: 'none',
          padding: '15px 0 0 0',
          margin: '0',
          borderTop: '1px solid #e5e4e7',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <li style={{ fontSize: '14px', color: '#6b6375' }}>
          📧 <strong style={{ color: '#08060d' }}>이메일:</strong> {lion.email || '정보 없음'}
        </li>
        <li style={{ fontSize: '14px', color: '#6b6375' }}>
          📞 <strong style={{ color: '#08060d' }}>연락처:</strong> {lion.phone || '정보 없음'}
        </li>
        <li style={{ fontSize: '14px', color: '#6b6375' }}>
          🛠️ <strong style={{ color: '#08060d' }}>핵심 스택:</strong> {lion.tech}
        </li>
      </ul>
    </div>
  );
}