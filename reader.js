
(function() {
    const KANDAS = [
        { id: 'Baalakaandam', title: 'Baala Kaandam', splits: 77 },
        { id: 'Ayodhyakaandam', title: 'Ayodhya Kaandam', splits: 119 },
        { id: 'Aaranyakaandam', title: 'Aaranya Kaandam', splits: 75 },
        { id: 'Kishkindakaanda', title: 'Kishkindaa Kaandam', splits: 66 },
        { id: 'Sundarakaanda', title: 'Sundara Kaandam', splits: 68 },
        { id: 'Yuddhakaanda', title: 'Yuddha Kaandam', splits: 128 }
    ];

    const currentUrl = window.location.pathname;
    const match = currentUrl.match(/\/([A-Za-z]+)-newone_split(\d+)\.html/);
    
    if (!match) return;

    const currentKandaId = match[1];
    const currentSplit = parseInt(match[2]);
    const kandaIndex = KANDAS.findIndex(k => k.id === currentKandaId);
    const kanda = KANDAS[kandaIndex];

    if (!kanda) return;

    // Font Size Logic
    let fontSize = localStorage.getItem('ramayanam-font-size') || 100;
    
    function applyFontSize(size) {
        document.body.style.fontSize = size + '%';
        localStorage.setItem('ramayanam-font-size', size);
        const display = document.getElementById('font-size-display');
        if (display) display.innerText = size + '%';
    }

    // Create Navigation UI
    const nav = document.createElement('div');
    nav.id = 'reader-nav';
    nav.innerHTML = `
        <div class="font-controls">
            <button id="font-dec" class="font-btn">A-</button>
            <span id="font-size-display">${fontSize}%</span>
            <button id="font-inc" class="font-btn">A+</button>
        </div>
        <div class="reader-controls">
            <button id="prev-btn" class="nav-btn" ${currentSplit === 1 && kandaIndex === 0 ? 'disabled' : ''}>← Prev</button>
            <button id="home-btn" class="nav-btn">Home</button>
            <button id="next-btn" class="nav-btn" ${currentSplit === kanda.splits && kandaIndex === KANDAS.length - 1 ? 'disabled' : ''}>Next →</button>
        </div>
        <div class="reader-progress">
            ${kanda.title} - Sarga ${currentSplit} / ${kanda.splits}
        </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
        #reader-nav {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(253, 246, 227, 0.98);
            border-top: 1px solid #e2d1b3;
            padding: 8px 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            box-shadow: 0 -4px 15px rgba(0,0,0,0.15);
            z-index: 1000;
            font-family: sans-serif;
        }
        .font-controls {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 8px;
            border-bottom: 1px solid #e2d1b3;
            padding-bottom: 8px;
            width: 100%;
            justify-content: center;
        }
        .font-btn {
            background: #fdf6e3;
            border: 1px solid #8b4513;
            color: #8b4513;
            padding: 2px 12px;
            border-radius: 4px;
            font-weight: bold;
            cursor: pointer;
        }
        #font-size-display {
            font-size: 0.9rem;
            min-width: 50px;
            text-align: center;
            color: #8b4513;
        }
        .reader-controls {
            display: flex;
            gap: 15px;
            margin-bottom: 5px;
        }
        .nav-btn {
            background: #8b4513;
            color: white;
            border: none;
            padding: 8px 14px;
            border-radius: 20px;
            cursor: pointer;
            font-weight: bold;
            font-size: 0.9rem;
        }
        .nav-btn:disabled {
            background: #ccc;
            cursor: not-allowed;
        }
        .reader-progress {
            font-size: 0.75rem;
            color: #5c3d2e;
        }
        body {
            padding-bottom: 120px !important;
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(nav);

    // Initial Apply
    applyFontSize(fontSize);

    // Event Listeners
    document.getElementById('font-inc').onclick = () => {
        fontSize = parseInt(fontSize) + 20;
        applyFontSize(fontSize);
    };
    document.getElementById('font-dec').onclick = () => {
        fontSize = Math.max(60, parseInt(fontSize) - 20);
        applyFontSize(fontSize);
    };

    document.getElementById('home-btn').onclick = () => window.location.href = 'index.html';
    
    document.getElementById('prev-btn').onclick = () => {
        if (currentSplit > 1) {
            window.location.href = `${currentKandaId}-newone_split${currentSplit - 1}.html`;
        } else if (kandaIndex > 0) {
            const prevKanda = KANDAS[kandaIndex - 1];
            window.location.href = `${prevKanda.id}-newone_split${prevKanda.splits}.html`;
        }
    };

    document.getElementById('next-btn').onclick = () => {
        if (currentSplit < kanda.splits) {
            window.location.href = `${currentKandaId}-newone_split${currentSplit + 1}.html`;
        } else if (kandaIndex < KANDAS.length - 1) {
            const nextKanda = KANDAS[kandaIndex + 1];
            window.location.href = `${nextKanda.id}-newone_split1.html`;
        }
    };
})();
