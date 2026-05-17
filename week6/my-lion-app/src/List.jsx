import React from 'react';

export default function List({ lion }) {
    return (
        <div className="list-item" style={{ display: 'block', padding: '30px' }}>
            <div className="info-main">
                <strong style={{ fontSize: '1.2rem', color: '#333' }}>{lion.name} ({lion.part})</strong>
                
                <p style={{ margin: '10px 0', color: '#007bff', fontWeight: 'bold' }}>
                    " {lion.bio} "
                </p>
                
                <p style={{ 
                    marginTop: '15px', 
                    lineHeight: '1.7', 
                    color: '#555',
                    padding: '15px 0',
                    borderTop: '1px solid #f0f0f0' 
                }}>
                    {lion.desc}
                </p>
            </div>
            
            <ul className="info-sub" style={{ 
                listStyle: 'none', 
                padding: '15px 0 0 0', 
                margin: '0', 
                borderTop: '1px solid #eee',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
            }}>
                <li>📧 <strong>이메일:</strong> {lion.email}</li>
                <li>📞 <strong>연락처:</strong> {lion.phone}</li>
                <li>🛠️ <strong>핵심 기술:</strong> {lion.tech}</li>
            </ul>
        </div>
    );
}