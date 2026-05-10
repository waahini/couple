document.addEventListener('DOMContentLoaded', () => {
    const analyzeBtn = document.getElementById('analyzeBtn');
    const resultArea = document.getElementById('resultArea');
    const scoreDisplay = document.getElementById('score');
    const resultText = document.getElementById('resultText');

    analyzeBtn.addEventListener('click', () => {
        const name1 = document.getElementById('name1').value.trim();
        const name2 = document.getElementById('name2').value.trim();

        if (!name1 || !name2) {
            alert('두 사람의 이름을 모두 입력해주세요!');
            return;
        }

        // 1. 분석 중 효과
        analyzeBtn.disabled = true;
        analyzeBtn.innerText = '운명의 기운을 분석 중...';
        resultArea.classList.add('hidden');

        setTimeout(() => {
            // 2. 궁합 알고리즘 (이름 획수 기반 시뮬레이션)
            const score = calculateCompatibility(name1, name2);
            
            // 3. 결과 표시
            displayResult(score);
            analyzeBtn.disabled = false;
            analyzeBtn.innerText = '궁합 분석 시작하기';
        }, 1500);
    });

    function calculateCompatibility(n1, n2) {
        // 이름 문자열을 기반으로 한 고정된 점수 생성 (실제 획수 로직 대신 결정론적 해시 사용)
        let combined = n1 + n2;
        let hash = 0;
        for (let i = 0; i < combined.length; i++) {
            hash += combined.charCodeAt(i);
        }
        return (hash % 61) + 40; // 40 ~ 100점 사이로 결과 도출
    }

    function displayResult(score) {
        resultArea.classList.remove('hidden');
        
        // 점수 카운트업 애니메이션
        let current = 0;
        const timer = setInterval(() => {
            if (current >= score) {
                clearInterval(timer);
            }
            scoreDisplay.innerText = current;
            current++;
        }, 20);

        // 점수대별 해석 (고품질 콘텐츠)
        let message = '';
        if (score >= 90) {
            message = "천생연분입니다! 두 분은 서로의 부족한 부분을 완벽하게 채워주는 영혼의 동반자 같은 기운을 가지고 있네요.";
        } else if (score >= 70) {
            message = "아주 훌륭한 조화입니다. 서로에 대한 배려와 이해가 있다면 그 어떤 고난도 함께 극복할 수 있는 든든한 관계입니다.";
        } else if (score >= 50) {
            message = "조금의 노력이 필요한 궁합입니다. 서로의 다름을 인정하고 소통의 시간을 늘린다면 충분히 아름다운 관계를 유지할 수 있습니다.";
        } else {
            message = "서로의 개성이 매우 강한 편이네요. 부딪힘이 있을 수 있지만, 이를 성장의 발판으로 삼는다면 독특하고 열정적인 관계가 될 것입니다.";
        }
        resultText.innerText = message;

        // 결과 영역으로 스크롤
        resultArea.scrollIntoView({ behavior: 'smooth' });
    }
});
