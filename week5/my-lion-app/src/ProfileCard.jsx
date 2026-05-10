export default function ProfileCard({ lion }) {
    return (
        <article className={`lion-card ${lion.isMe ? 'my-card' : ''}`}>
            <div className="img-wrapper" style={{ backgroundImage: `url(${lion.img})` }}>
                <span className="badge">{lion.part}</span>
            </div>
            <div className="card-body">
                <h3>{lion.name}</h3>
                <p className="bio">{lion.bio}</p>
            </div>
        </article>
    );
}