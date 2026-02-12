const TG_TOKEN = '8013834057:AAFgJAmnPutdMRe1p-EVEfvH4RUxlsfy_jM';
const CHAT_ID = '5415190532';

const DB = [
    // --- ОБУВЬ (Shoes) ---
    { id: 1, cat: 'Shoes', name: 'Nike Air Jordan 1 Retro', price: 18500, icon: 'fa-socks', grad: 'from-red-600 to-black' },
    { id: 2, cat: 'Shoes', name: 'Yeezy Boost 350 V2', price: 24000, icon: 'fa-cloud', grad: 'from-zinc-700 to-zinc-900' },
    { id: 3, cat: 'Shoes', name: 'New Balance 530 Metallic', price: 12900, icon: 'fa-bolt', grad: 'from-slate-300 to-slate-500' },
    { id: 4, cat: 'Shoes', name: 'Adidas Forum Low', price: 9500, icon: 'fa-circle-check', grad: 'from-blue-600 to-blue-900' },
    { id: 5, cat: 'Shoes', name: 'Converse Chuck 70 High', price: 8200, icon: 'fa-star', grad: 'from-neutral-800 to-black' },

    // --- ФУТБОЛКИ (Tshirts) ---
    { id: 10, cat: 'Tshirts', name: 'Oversize Tee "Gravity"', price: 3500, icon: 'fa-shirt', grad: 'from-purple-600 to-black' },
    { id: 11, cat: 'Tshirts', name: 'Basic White Cotton Tee', price: 1900, icon: 'fa-shirt', grad: 'from-zinc-100 to-zinc-300' },
    { id: 12, cat: 'Tshirts', name: 'Graphic Tee "Cyber"', price: 4200, icon: 'fa-mask-lightness', grad: 'from-green-600 to-black' },
    { id: 13, cat: 'Tshirts', name: 'Longsleeve "Bones"', price: 4800, icon: 'fa-person-rays', grad: 'from-indigo-900 to-black' },

    // --- ШТАНЫ (Pants) ---
    { id: 20, cat: 'Pants', name: 'Cargo Pants Black', price: 6500, icon: 'fa-dna', grad: 'from-neutral-900 to-zinc-800' },
    { id: 21, cat: 'Pants', name: 'Baggy Jeans Light Blue', price: 7900, icon: 'fa- scissors', grad: 'from-blue-400 to-blue-600' },
    { id: 22, cat: 'Pants', name: 'Techwear Joggers', price: 8800, icon: 'fa-shield-halved', grad: 'from-slate-800 to-black' },

    // --- АКСЕССУАРЫ (Accs) ---
    { id: 30, cat: 'Accs', name: 'Beanie Hat "Ultra"', price: 2200, icon: 'fa-hat-wizard', grad: 'from-rose-600 to-rose-900' },
    { id: 31, cat: 'Accs', name: 'Canvas Tote Bag', price: 1500, icon: 'fa-bag-shopping', grad: 'from-amber-700 to-amber-900' },
    { id: 32, cat: 'Accs', name: 'Chain Bracelet Silver', price: 3900, icon: 'fa-link', grad: 'from-slate-400 to-slate-200' },
    { id: 33, cat: 'Accs', name: 'Sunglasses "Matrix"', price: 5500, icon: 'fa-glasses', grad: 'from-zinc-800 to-black' }
];

// Добавляем еще товаров для массы
for(let i=1; i<=10; i++) {
    DB.push({
        id: 200 + i,
        cat: 'Accs',
        name: `Street Accessory #${i}`,
        price: 1000 + (i * 250),
        icon: 'fa-box-open',
        grad: 'from-indigo-950 to-black'
    });
}

let cart = [];
let discount = 0;

function showPage(pageId) {
    document.querySelectorAll('.page-section').forEach(p => p.classList.add('hidden'));
    document.getElementById('page-' + pageId).classList.remove('hidden');
    if(pageId === 'home') renderProducts('Shoes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function getProductPreview(p, isLarge = false) {
    const iconSize = isLarge ? 'text-7xl' : 'text-4xl';
    return `
        <div class="w-full h-full bg-gradient-to-br ${p.grad} flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
            <i class="fa-solid ${p.icon} ${iconSize} text-white/90 drop-shadow-2xl"></i>
        </div>
    `;
}

function renderProducts(category) {
    const list = document.getElementById('products-list');
    document.querySelectorAll('.cat-card').forEach(card => {
        card.classList.remove('active-cat');
        if(card.innerText.includes(category === 'Shoes' ? 'ОБУВЬ' : category === 'Tshirts' ? 'ФУТБОЛКИ' : category === 'Pants' ? 'ШТАНЫ' : 'АКСЕССУАРЫ')) {
            card.classList.add('active-cat');
        }
    });

    const filtered = DB.filter(p => p.cat === category);
    list.innerHTML = filtered.map(p => `
        <div class="bg-[#111] rounded-[24px] overflow-hidden border border-white/5 hover:border-indigo-500/50 transition-all group cursor-pointer" onclick="viewProduct(${p.id})">
            <div class="h-44 overflow-hidden bg-black">
                ${getProductPreview(p)}
            </div>
            <div class="p-4">
                <h3 class="font-bold text-xs h-8 overflow-hidden line-clamp-2 uppercase tracking-tighter">${p.name}</h3>
                <div class="flex justify-between items-center mt-2">
                    <p class="text-indigo-400 font-black text-sm">${p.price.toLocaleString()} ₽</p>
                    <div class="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition text-[10px]">
                        <i class="fa-solid fa-plus"></i>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function viewProduct(id) {
    const p = DB.find(x => x.id === id);
    const container = document.getElementById('product-detail-container');
    container.innerHTML = `
        <div class="max-w-4xl mx-auto py-4">
            <button onclick="showPage('home')" class="mb-6 text-gray-500 text-[10px] font-black uppercase tracking-[3px]">← Назад</button>
            <div class="bg-[#111] rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
                <div class="h-80 bg-black">
                    ${getProductPreview(p, true)}
                </div>
                <div class="p-8">
                    <div class="text-indigo-500 font-bold text-xs mb-2 tracking-widest uppercase">${p.cat}</div>
                    <h2 class="text-4xl font-black mb-6 tracking-tighter leading-none">${p.name}</h2>
                    <p class="text-gray-400 text-sm mb-8">Premium quality streetwear item. Limited edition. High-quality materials only.</p>
                    <div class="flex items-center gap-6">
                        <span class="text-3xl font-black italic">${p.price.toLocaleString()} ₽</span>
                        <button onclick="addToCart(${p.id})" class="flex-grow bg-white text-black py-5 rounded-2xl font-black hover:bg-indigo-600 hover:text-white transition active:scale-95 uppercase tracking-widest">Добавить в корзину</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    showPage('item');
}

function addToCart(id) {
    const p = DB.find(x => x.id === id);
    cart.push({...p, cartId: Date.now()});
    updateCartUI();
    const btn = event.target;
    btn.innerText = 'ДОБАВЛЕНО'; btn.style.background = '#22c55e';
    setTimeout(() => { btn.innerText = 'ДОБАВИТЬ В КОРЗИНУ'; btn.style.background = ''; }, 1000);
}

function updateCartUI() {
    document.getElementById('cart-count-badge').innerText = cart.length;
    const list = document.getElementById('cart-full-list');
    if(cart.length === 0) {
        list.innerHTML = `<div class="text-center py-16 bg-white/5 rounded-[32px] border border-dashed border-white/10"><p class="text-gray-500 text-xs font-bold uppercase tracking-widest">Корзина пуста</p></div>`;
    } else {
        list.innerHTML = cart.map((p, idx) => `
            <div class="cart-item-row">
                <div class="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                    <div class="w-full h-full bg-gradient-to-br ${p.grad} flex items-center justify-center">
                        <i class="fa-solid ${p.icon} text-white text-xs"></i>
                    </div>
                </div>
                <div class="flex-grow">
                    <h4 class="text-[10px] font-black uppercase">${p.name}</h4>
                    <div class="text-indigo-400 font-black text-sm">${p.price.toLocaleString()} ₽</div>
                </div>
                <button onclick="removeItem(${idx})" class="text-red-500/30 p-2"><i class="fa-solid fa-xmark"></i></button>
            </div>
        `).join('');
    }
    calculateTotal();
}

function applyPromo() {
    const code = document.getElementById('promo-input').value.trim();
    if(code === 'STYLE2026') {
        discount = 0.15;
        document.getElementById('promo-msg').innerText = '🔥 СКИДКА 15% ПРИМЕНЕНА';
    } else {
        discount = 0; document.getElementById('promo-msg').innerText = '';
    }
    calculateTotal();
}

function calculateTotal() {
    let base = cart.reduce((s, p) => s + p.price, 0);
    let final = base - (base * discount);
    document.getElementById('final-price').innerText = Math.floor(final).toLocaleString() + ' ₽';
}

function removeItem(idx) {
    cart.splice(idx, 1);
    updateCartUI();
}

async function checkout() {
    const name = document.getElementById('order-name').value.trim();
    const phone = document.getElementById('order-phone').value.trim();
    const city = document.getElementById('cart-city').value.trim();
    if(!name || !phone || !city || cart.length === 0) return alert('Заполните данные доставки!');
    
    const btn = event.target; btn.disabled = true; btn.innerText = '...';
    let list = cart.map(p => `👕 ${p.name}`).join('%0A');
    let msg = `🛍 **НОВЫЙ ЗАКАЗ (ОДЕЖДА)**%0A👤 ${name}%0A📞 ${phone}%0A📍 ${city}%0A📦 Товары:%0A${list}%0A💰 Итого: ${document.getElementById('final-price').innerText}`;
    
    try {
        await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${msg}&parse_mode=Markdown`);
        alert('Заказ оформлен! Наш менеджер свяжется с вами.');
        cart = []; updateCartUI(); showPage('home');
    } catch(e) { alert('Ошибка сети'); }
    finally { btn.disabled = false; btn.innerText = 'ОФОРМИТЬ'; }
}

document.addEventListener('DOMContentLoaded', () => { showPage('home'); updateCartUI(); });
