document.addEventListener('DOMContentLoaded', () => {
    const analyzeBtn = document.getElementById('analyzeBtn');
    const resultArea = document.getElementById('resultArea');
    const scoreDisplay = document.getElementById('score');
    const resultText = document.getElementById('resultText');

    // 로딩 중 표시할 텍스트 배열
    const loadingTexts = [
        '✨ 성명학적 기운을 분석하는 중...',
        '🔮 생년월일의 조화를 살피는 중...',
        '💖 두 분의 인연을 연결하는 중...',
        '📊 최종 분석 결과를 도출하는 중...'
    ];

    // 사진 미리보기 처리
    setupPhotoPreview('photo1', 'photo1-preview');
    setupPhotoPreview('photo2', 'photo2-preview');

    function setupPhotoPreview(inputId, previewId) {
        const input = document.getElementById(inputId);
        const preview = document.getElementById(previewId);

        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    preview.innerHTML = `<img src="${event.target.result}" class="photo-preview-img">`;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    analyzeBtn.addEventListener('click', () => {
        const name1 = document.getElementById('name1').value.trim();
        const birth1 = document.getElementById('birth1').value;
        const name2 = document.getElementById('name2').value.trim();
        const birth2 = document.getElementById('birth2').value;

        if (!name1 || !name2 || !birth1 || !birth2) {
            alert('두 사람의 이름과 생년월일을 모두 입력해주세요! 사진은 선택사항입니다. 💕');
            return;
        }

        // 사진 업데이트를 클릭 직후에 미리 시작 (백그라운드 처리)
        updateResultPhotos();

        analyzeBtn.disabled = true;
        resultArea.classList.add('hidden');

        // 로딩 텍스트 로테이션 (300ms 주기)
        let textIndex = 0;
        analyzeBtn.innerText = loadingTexts[textIndex];
        const textInterval = setInterval(() => {
            textIndex = (textIndex + 1) % loadingTexts.length;
            analyzeBtn.innerText = loadingTexts[textIndex];
        }, 300);

        // 전체 대기 시간을 1초(1000ms)로 유지 (사진 유무와 상관없이 동일)
        setTimeout(() => {
            clearInterval(textInterval);
            
            // 알고리즘 계산 및 결과 표시
            const score = calculateComplexCompatibility(name1, birth1, name2, birth2);
            displayResult(score, name1, name2);
            
            analyzeBtn.disabled = false;
            analyzeBtn.innerText = '💕 궁합 분석 시작하기';
        }, 1000);
    });

    function updateResultPhotos() {
        ['photo1', 'photo2'].forEach((id, index) => {
            const input = document.getElementById(id);
            const resPhoto = document.getElementById(`res-photo${index + 1}`);
            if (input.files && input.files[0]) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    resPhoto.innerHTML = `<img src="${e.target.result}" style="width:100%; height:100%; object-fit:cover;">`;
                };
                reader.readAsDataURL(input.files[0]);
            } else {
                resPhoto.innerHTML = `<div style="font-size:40px; line-height:100px;">👤</div>`;
            }
        });
    }

    function calculateComplexCompatibility(n1, b1, n2, b2) {
        // 이름 해시 + 날짜 차이를 이용한 결정론적 점수
        let combined = n1 + b1 + n2 + b2;
        let hash = 0;
        for (let i = 0; i < combined.length; i++) {
            hash += combined.charCodeAt(i);
        }
        
        // 생일 날짜 차이 반영 (가상의 기운 조화)
        const date1 = new Date(b1);
        const date2 = new Date(b2);
        const diffDays = Math.abs(date1 - date2) / (1000 * 60 * 60 * 24);
        
        let score = (hash % 41) + 60; // 기본 60~100점
        
        // 사진 등록 여부에 따른 보너스 (가상)
        if (document.getElementById('photo1').files.length > 0) score += 2;
        if (document.getElementById('photo2').files.length > 0) score += 2;
        
        return Math.min(100, score);
    }

    function displayResult(score, name1, name2) {
        resultArea.classList.remove('hidden');
        let current = 0;
        // 점수 카운팅 속도도 조금 더 빠르게 조정 (15ms)
        const timer = setInterval(() => {
            if (current >= score) {
                clearInterval(timer);
                scoreDisplay.innerText = score;
                return;
            }
            scoreDisplay.innerText = current;
            current++;
        }, 15);

        let message = '';
        if (score >= 95) {
            message = `우와! ${name1}님과 ${name2}님은 전생부터 이어진 '천생연분'입니다. 생년월일의 기운과 성명의 조화가 이보다 완벽할 수 없네요!`;
        } else if (score >= 85) {
            message = `아주 높은 궁합입니다! 서로의 생일 기운이 상생하며, 이름의 획수 또한 훌륭한 조화를 이룹니다. 서로에게 큰 힘이 되는 관계입니다.`;
        } else if (score >= 70) {
            message = `안정적이고 예쁜 관계입니다. 조금만 서로를 배려한다면 더 큰 시너지를 낼 수 있는 운명적인 만남입니다.`;
        } else {
            message = `서로의 개성이 뚜렷한 궁합입니다. 다름을 인정하고 맞춰나가는 과정에서 더 깊은 사랑이 싹트게 될 거예요!`;
        }
        resultText.innerText = message;
        resultArea.scrollIntoView({ behavior: 'smooth' });
    }
});
