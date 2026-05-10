// 사용자 경험(UX) 향상을 위한 간단한 스크립트
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    // 가상의 검색 데이터 (애드센스는 검색 기능 등 사용자 편의 기능을 긍정적으로 평가함)
    const posts = [
        { title: '애드센스 승인 전략', url: '#' },
        { title: '수익형 블로그 구축', url: '#' },
        { title: '고품질 콘텐츠란?', url: '#' }
    ];

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        searchResults.innerHTML = '';

        if (query.length < 2) return;

        const filtered = posts.filter(post => 
            post.title.toLowerCase().includes(query)
        );

        if (filtered.length > 0) {
            const ul = document.createElement('ul');
            ul.style.list-style = 'none';
            ul.style.marginTop = '10px';
            
            filtered.forEach(post => {
                const li = document.createElement('li');
                li.innerHTML = `<a href="${post.url}" style="color: #1a73e8; font-size: 14px;">${post.title}</a>`;
                ul.appendChild(li);
            });
            searchResults.appendChild(ul);
        } else {
            searchResults.innerHTML = '<p style="font-size: 12px; color: #70757a; margin-top:10px;">결과가 없습니다.</p>';
        }
    });

    // 읽기 진척도 표시 (UX 요소)
    console.log("AdSense Ready Blog Loaded Successfully!");
});
