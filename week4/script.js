document.addEventListener('DOMContentLoaded', () => {
    let lions = [
        { id: '1', name: '멋쟁이사자', part: 'Frontend', tech: 'React, JS', bio: '코딩하는 사자입니다.', desc: '반갑습니다!', email: 'lion@likelion.net', phone: '010-0000-0000', img: 'https://picsum.photos/seed/1/400/300' }
    ];

    const el = {
        grid: document.getElementById('card-grid'),
        list: document.getElementById('summary-list'),
        formSection: document.getElementById('form-section'),
        lionForm: document.getElementById('lion-form'),
        count: document.getElementById('total-count'),
        status: document.getElementById('status-text'),

        inName: document.getElementById('input-name'),
        inPart: document.getElementById('input-part'),
        inTech: document.getElementById('input-tech'),
        inBio: document.getElementById('input-bio'),
        inDesc: document.getElementById('input-desc'),
        inEmail: document.getElementById('input-email'),
        inPhone: document.getElementById('input-phone'),
        inImg: document.getElementById('input-img-url')
    };

    const render = () => {
        const filterP = document.getElementById('filter-part').value;
        const sortS = document.getElementById('sort-order').value;
        const searchS = document.getElementById('search-name').value.toLowerCase();

        let filtered = lions.filter(l => 
            (filterP === 'all' || l.part === filterP) && l.name.toLowerCase().includes(searchS)
        );

        if (sortS === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));
        else filtered = [...filtered].reverse();

        el.grid.innerHTML = '';
        filtered.forEach(l => {
            const card = document.createElement('article');
            card.className = 'lion-card';

            const imgWrap = document.createElement('div');
            imgWrap.className = 'img-wrapper';
            imgWrap.style.backgroundImage = `url('${l.img}')`;
            imgWrap.innerHTML = `<span class="badge">${l.tech}</span>`;

            imgWrap.addEventListener('click', () => {
                el.formSection.classList.remove('hidden');
                el.inName.value = l.name;
                el.inPart.value = l.part;
                el.inTech.value = l.tech;
                el.inBio.value = l.bio;
                el.inDesc.value = l.desc;
                el.inEmail.value = l.email;
                el.inPhone.value = l.phone;
                el.inImg.value = l.img; 
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

            card.innerHTML = `
                <div class="card-body">
                    <p class="part">${l.part}</p>
                    <h3>${l.name}</h3>
                    <p class="bio">${l.bio}</p>
                </div>
            `;
            card.prepend(imgWrap);
            el.grid.appendChild(card);
        });

        el.list.innerHTML = filtered.map(l => `<div class="list-item"><strong>${l.name}</strong> (${l.part}) - ${l.email}</div>`).join('');
        el.count.textContent = lions.length;
        document.getElementById('no-data').classList.toggle('hidden', filtered.length > 0);
    };

    document.getElementById('btn-fill-random').addEventListener('click', async () => {
        el.status.textContent = "데이터 생성 중...";
        try {
            const res = await fetch('https://randomuser.me/api/');
            const data = await res.json();
            const u = data.results[0];

            el.inName.value = u.name.first;
            el.inPart.value = ['Frontend', 'Backend', 'Design'][Math.floor(Math.random() * 3)];
            el.inTech.value = ['JS, React', 'Python, Django', 'Figma, UI'][Math.floor(Math.random() * 3)];
            el.inBio.value = `${u.location.city}에서 온 ${u.name.last} 사자입니다.`;
            el.inDesc.value = `저는 ${u.location.country} 출신이며 취미는 ${u.login.username} 활동입니다.`;
            el.inEmail.value = u.email;
            el.inPhone.value = u.cell;
            el.inImg.value = u.picture.large; 

            el.status.textContent = "랜덤 생성 완료!";
        } catch (e) {
            el.status.textContent = "생성 오류";
        }
    });

    el.lionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newLion = {
            id: Date.now().toString(),
            name: el.inName.value,
            part: el.inPart.value,
            tech: el.inTech.value || 'General',
            bio: el.inBio.value,
            desc: el.inDesc.value,
            email: el.inEmail.value,
            phone: el.inPhone.value,
            img: el.inImg.value || `https://picsum.photos/400/300?random=${Date.now()}`
        };
        
        const idx = lions.findIndex(l => l.name === newLion.name);
        if (idx > -1) lions[idx] = newLion;
        else lions.push(newLion);

        render();
        el.lionForm.reset();
        el.formSection.classList.add('hidden');
    });

    document.getElementById('btn-toggle-form').addEventListener('click', () => {
        el.lionForm.reset();
        el.inImg.value = ''; 
        el.formSection.classList.toggle('hidden');
    });
    document.getElementById('btn-close-form').addEventListener('click', () => el.formSection.classList.add('hidden'));
    document.getElementById('btn-delete-last').addEventListener('click', () => { lions.pop(); render(); });

    const batchAdd = async (num, isRefresh = false) => {
        el.status.textContent = "데이터 호출 중...";
        try {
            const res = await fetch(`https://randomuser.me/api/?results=${num}`);
            const data = await res.json();
            const newOnes = data.results.map(u => ({
                id: u.login.uuid,
                name: u.name.first,
                part: ['Frontend', 'Backend', 'Design'][Math.floor(Math.random() * 3)],
                tech: 'JavaScript',
                bio: '반갑습니다!',
                desc: 'API로 추가된 사자입니다.',
                email: u.email,
                phone: u.cell,
                img: u.picture.large
            }));
            lions = isRefresh ? newOnes : [...lions, ...newOnes];
            el.status.textContent = "로드 완료";
            render();
        } catch (e) { el.status.textContent = "연결 실패"; }
    };

    document.getElementById('btn-add-1').addEventListener('click', () => batchAdd(1));
    document.getElementById('btn-add-5').addEventListener('click', () => batchAdd(5));
    document.getElementById('btn-refresh-all').addEventListener('click', () => batchAdd(lions.length, true));

    document.getElementById('filter-part').addEventListener('change', render);
    document.getElementById('sort-order').addEventListener('change', render);
    document.getElementById('search-name').addEventListener('input', render);

    render(); 
});