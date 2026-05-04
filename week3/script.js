
let lions = [
    { name: "최서연", part: "Frontend", techs: ["HTML", "CSS"], summary: "열정적인 프론트엔드 지망생", bio: "기본기부터 탄탄히 다지는 중입니다.", email: "chul@example.com", phone: "010-1111-2222", website: "https://github.com", motto: "하면 된다!" },
    { name: "김보라", part: "Backend", techs: ["Node.js", "SQL"], summary: "데이터의 흐름을 설계합니다", bio: "효율적인 DB 구조에 관심이 많습니다.", email: "young@example.com", phone: "010-3333-4444", website: "https://velog.io", motto: "데이터는 거짓말을 안 한다." },
    { name: "박민준", part: "Design", techs: ["Figma", "UI/UX"], summary: "사용자 중심의 디자인", bio: "편리한 인터페이스를 만드는 디자이너입니다.", email: "min@example.com", phone: "010-5555-6666", website: "https://behance.net", motto: "심플함이 정답이다." },
    { name: "이혜인", part: "Frontend", techs: ["React", "JS"], summary: "컴포넌트 단위 개발이 즐거워요", bio: "리액트의 상태 관리를 공부하고 있습니다.", email: "suji@example.com", phone: "010-7777-8888", website: "https://suji.dev", motto: "어제보다 나은 오늘." },
    { name: "김하린", part: "Backend", techs: ["Java", "Spring"], summary: "견고한 서버를 지향합니다", bio: "객체 지향 설계를 깊이 있게 공부 중입니다.", email: "hoon@example.com", phone: "010-9999-0000", website: "https://hoon.blog", motto: "실수는 성장의 발판." },
    { name: "강혜인", part: "Frontend", techs: ["Vue", "CSS"], summary: "아름다운 웹을 만듭니다", bio: "애니메이션과 인터랙션 구현을 좋아합니다.", email: "dain@example.com", phone: "010-1212-3434", website: "https://dain.link", motto: "즐겁게 코딩하자." },
    { name: "윤지민", part: "Backend", techs: ["Python", "Django"], summary: "빠른 프로토타이핑 전문가", bio: "파이썬의 간결함을 사랑합니다.", email: "jimin@example.com", phone: "010-5656-7878", website: "https://jimin.lab", motto: "코드는 짧을수록 좋다." },
    { name: "임동현", part: "Design", techs: ["Photoshop", "AI"], summary: "브랜딩에 강점이 있는 디자이너", bio: "일러스트와 그래픽 작업을 병행합니다.", email: "jae@example.com", phone: "010-9090-1010", website: "https://jae.art", motto: "시각적 조화가 우선." },
    { name: "한윤서", part: "Frontend", techs: ["TypeScript", "Next.js"], summary: "안정적인 코드를 지향합니다", bio: "타입 안정성의 중요성을 느끼고 있습니다.", email: "doyun@example.com", phone: "010-4321-8765", website: "https://doyun.com", motto: "꼼꼼함이 실력이다." }
];

const addToggleBtn = document.getElementById('add-toggle-btn');
const deleteBtn = document.getElementById('delete-last-btn');
const formSection = document.getElementById('form-section');
const lionForm = document.getElementById('lion-form');
const countDisplay = document.getElementById('total-count');
const summaryGrid = document.getElementById('summary-grid');
const detailList = document.getElementById('detail-list');
const cancelBtn = document.getElementById('cancel-btn');

function updateUI() {
    countDisplay.textContent = lions.length;
    renderSummary();
    renderDetails();
}

function renderSummary() {
    summaryGrid.innerHTML = '';
    lions.forEach((lion) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="badge">${lion.techs[0]}</div>
            <div class="card-img-placeholder"></div>
            <div class="card-body">
                <h3>${lion.name}</h3>
                <p class="card-part">${lion.part}</p>
                <p class="card-text">${lion.summary}</p>
            </div>
        `;
        summaryGrid.appendChild(card);
    });
}

function renderDetails() {
    detailList.innerHTML = '';
    lions.forEach((lion) => {
        const detail = document.createElement('div');
        detail.className = 'detail-item';
        detail.innerHTML = `
            <h2>${lion.name}</h2>
            <p class="card-part">${lion.part}</p>
            <div class="detail-info">
                <p><strong>자기소개:</strong> ${lion.bio}</p>
                <p><strong>연락처:</strong> ${lion.email} | ${lion.phone} | <a href="${lion.website}" target="_blank">홈페이지</a></p>
                <p><strong>기술스택:</strong> ${lion.techs.join(', ')}</p>
                <p><strong>한 마디:</strong> "${lion.motto}"</p>
            </div>
        `;
        detailList.appendChild(detail);
    });
}
addToggleBtn.addEventListener('click', () => formSection.classList.toggle('hidden'));
cancelBtn.addEventListener('click', () => {
    formSection.classList.add('hidden');
    lionForm.reset();
});

lionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(lionForm);
    const newLion = {
        name: formData.get('name'),
        part: formData.get('part'),
        techs: formData.get('tech').split(',').map(t => t.trim()),
        summary: formData.get('summary'),
        bio: formData.get('bio'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        website: formData.get('website'),
        motto: formData.get('motto')
    };
    lions.push(newLion);
    updateUI();
    lionForm.reset();
    formSection.classList.add('hidden');
});

deleteBtn.addEventListener('click', () => {
    if (lions.length > 0) {
        lions.pop();
        updateUI();
    }
});

window.addEventListener('DOMContentLoaded', updateUI);