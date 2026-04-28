
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
            border-top: 2px solid #e2d1b3;
            padding: 12px 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            box-shadow: 0 -5px 20px rgba(0,0,0,0.2);
            z-index: 1000;
            font-family: system-ui, -apple-system, sans-serif;
        }
        .font-controls {
            display: flex;
            align-items: center;
            gap: 20px;
            margin-bottom: 12px;
            border-bottom: 1px solid #e2d1b3;
            padding-bottom: 12px;
            width: 100%;
            justify-content: center;
        }
        .font-btn {
            background: #fdf6e3;
            border: 2px solid #8b4513;
            color: #8b4513;
            padding: 8px 20px;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            font-size: 1.1rem;
            min-width: 60px;
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        #font-size-display {
            font-size: 1rem;
            min-width: 60px;
            text-align: center;
            color: #8b4513;
            font-weight: bold;
        }
        .reader-controls {
            display: flex;
            gap: 12px;
            margin-bottom: 8px;
            width: 100%;
            justify-content: center;
        }
        .nav-btn {
            background: #8b4513;
            color: white;
            border: none;
            padding: 12px 0;
            border-radius: 12px;
            cursor: pointer;
            font-weight: bold;
            font-size: 1rem;
            flex: 1;
            max-width: 120px;
            min-height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        .nav-btn:active {
            transform: scale(0.95);
            background: #5c3d2e;
        }
        .nav-btn:disabled {
            background: #ccc;
            box-shadow: none;
            cursor: not-allowed;
        }
        .reader-progress {
            font-size: 0.85rem;
            color: #5c3d2e;
            font-weight: 500;
            margin-top: 4px;
        }
        body {
            padding-bottom: 160px !important;
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
