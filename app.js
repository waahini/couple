document.addEventListener('DOMContentLoaded', () => {
    const input1 = document.getElementById('input-1');
    const input2 = document.getElementById('input-2');
    const img1 = document.getElementById('img-1');
    const img2 = document.getElementById('img-2');
    const analyzeBtn = document.getElementById('analyze-btn');
    const loadingSection = document.getElementById('loading-section');
    const resultSection = document.getElementById('result-section');
    const loadingMsg = document.getElementById('loading-msg');

    // Image Preview Logic
    function handlePreview(input, imgElement) {
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    imgElement.src = event.target.result;
                    imgElement.style.display = 'block';
                    imgElement.parentElement.querySelector('.box-text').style.display = 'none';
                };
                reader.readAsDataURL(file);
            }
        });
    }

    handlePreview(input1, img1);
    handlePreview(input2, img2);

    // Analysis Logic
    analyzeBtn.addEventListener('click', () => {
        if (!img1.src || !img2.src) {
            alert('두 사람의 사진을 모두 업로드해 주세요! 📸✨');
            return;
        }

        // Show loading
        analyzeBtn.disabled = true;
        loadingSection.classList.remove('hidden');
        resultSection.classList.add('hidden');
        window.scrollTo({ top: loadingSection.offsetTop - 100, behavior: 'smooth' });

        const loadingSteps = [
            '이목구비 각도 분석 중...',
            '피부 톤 및 아우라 매칭 중...',
            '전생의 인연 데이터베이스 조회 중...',
            '관상학적 궁합 결과 생성 중...',
            '최종 시뮬레이션 완료!'
        ];

        let step = 0;
        const interval = setInterval(() => {
            if (step < loadingSteps.length) {
                loadingMsg.innerText = loadingSteps[step];
                step++;
            } else {
                clearInterval(interval);
                displayResults();
            }
        }, 800);
    });

    function displayResults() {
        loadingSection.classList.add('hidden');
        resultSection.classList.remove('hidden');
        analyzeBtn.disabled = false;

        const results = [
            {
                score: '98%',
                eye: '날카롭고 지적인 고양이상 눈매를 부드러운 강아지상 인상이 포근하게 감싸주는 완벽한 보완 관계입니다. 서로를 보는 눈빛에서 이미 스파크가 튀고 있네요!',
                mouth: '두 분 모두 웃을 때 입꼬리가 시원하게 올라가는 "상승형" 관상입니다. 함께 있으면 웃음이 끊이지 않고 재물운이 샘솟는 찰떡궁합입니다.',
                aura: '마치 오랫동안 맞춘 퍼즐 조각처럼 서로의 아우라가 자연스럽게 섞입니다. 주변 사람들까지 행복하게 만드는 긍정 에너지가 넘쳐요!',
                oneLiner: '전생에 나라를 구하고 우주 평화까지 지켜낸 역대급 콤비! 👑✨'
            },
            {
                score: '85%',
                eye: '서로 다른 매력을 가진 눈매가 만나 묘한 긴장감과 설렘을 유발합니다. 서로의 눈만 봐도 다음 할 일을 알아채는 텔레파시 커플이군요!',
                mouth: '든든한 하관과 세련된 입꼬리의 만남은 관상학적으로 "서로의 실수를 너그럽게 덮어주는" 포용력 있는 관계를 의미합니다.',
                aura: '불꽃처럼 뜨거운 열정과 호수처럼 차분한 안정감이 공존하는 매칭입니다. 다이내믹하면서도 깊은 신뢰를 바탕으로 한 인연입니다.',
                oneLiner: '서로 얼굴만 봐도 어이가 없어서 웃음이 터지는 영혼의 단짝! 🤣💖'
            },
            {
                score: '92%',
                eye: '쌍꺼풀 유무와 상관없이 두 분의 눈매 각도가 황금비율을 이룹니다. 첫인상부터 서로에게 강하게 이끌렸을 확률이 200%입니다!',
                mouth: '복을 부르는 콧망울과 시원한 입매의 조화는 경제적으로도 매우 풍요로운 미래를 암시합니다. 같이 있으면 돈이 마를 날이 없겠어요.',
                aura: '분홍빛 오라가 두 분을 감싸고 있습니다. 말하지 않아도 서로의 마음을 읽는 심미안적 연결이 매우 강한 상태입니다.',
                oneLiner: '걸어 다니는 복덩이! 존재 자체가 서로에게 로또인 커플! 💰💝'
            }
        ];

        const randomResult = results[Math.floor(Math.random() * results.length)];

        // Randomize score slightly
        const randomBonus = Math.floor(Math.random() * 5);
        const finalScore = parseInt(randomResult.score) + randomBonus;

        document.getElementById('result-score').innerText = (finalScore > 100 ? 100 : finalScore) + '%';
        document.getElementById('eye-analysis').innerText = randomResult.eye;
        document.getElementById('mouth-analysis').innerText = randomResult.mouth;
        document.getElementById('aura-analysis').innerText = randomResult.aura;
        document.getElementById('one-liner').innerText = randomResult.oneLiner;

        window.scrollTo({ top: resultSection.offsetTop - 50, behavior: 'smooth' });
    }

    // Share button simulation
    document.getElementById('share-btn').addEventListener('click', () => {
        alert('결과가 갤러리에 저장되었습니다! (시뮬레이션)\n지금 바로 인스타그램 스토리에 공유해 보세요! ✨📸');
    });
});