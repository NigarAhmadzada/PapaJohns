const menu = document.getElementById('responsive-1')
const cartHtml = document.getElementById('cart')
const hiddenCartHtml = document.getElementById('hidden-cart')
const cart1 = document.getElementById('cart-1')
const cartBG = document.getElementById('cartBG')
const productDetailsHtml = document.getElementById('productDetailsInner')

const selectionState = {}; 


let open = false

function hamburgerMenu() {
    if(open){
        menu.classList.add('hidden')
        open = false
    }else{
        menu.classList.remove('hidden')
        open = true
    }
}
function show(arr, containerSelector) {
    let kod = '';
  
    arr.forEach(elm => {
      const safeData = encodeURIComponent(JSON.stringify(elm)); 
  
      kod += `
        <div onclick="pDetails('${safeData}', event)" class="group h-[330px] lg:h-[370px] hover:shadow-2xl hover:border-gray-800 transition rounded-[16px]">
            <img class="rounded-2xl" src="${elm.img}" alt="" />
            <div class="p-3">
                <div class="lg:h-[18px]"><h4 class="fontPapa font-extrabold">${elm.title}</h4></div>
                <div class="lg:h-[90px]"><p class="text-gray-500 text-[14px] py-2.5">${elm.composition}</p></div>
                <div class="lg:h-[15px] mb-2"><span class="my-5 p-[7px] lg:p-0 text-[13px] lg:bg-white bg-gray-300 rounded-2xl">${elm.price}.00 AZN</span></div>
                <div class="overflow-hidden h-0 group-hover:h-auto transition-all duration-300 py-2 ">
                    <button class="px-[15px] bg-[#CFEB0B] border-[1px] border-solid border-black text-black rounded-[16px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 justify-center w-[215px] mt-[5px] h-[28px] hover:bg-white">
                      SƏBƏTƏ ƏLAVƏ ET
                    </button>
                </div>
            </div>
        </div>`
    });

    // `
    //     <div onclick="pDetails('${safeData}', event)" class="lg:group h-[330px] lg:h-[370px] lg:hover:shadow-2xl lg:hover:border-gray-800 lg:transition rounded-[16px]">
    //         <img class="rounded-2xl" src="${elm.img}" alt="" />
    //         <div class="p-3">
    //             <div class="lg:h-[18px]"><h4 class="fontPapa font-extrabold">${elm.title}</h4></div>
    //             <div class="lg:h-[90px]"><p class="text-gray-500 text-[14px] py-2.5">${elm.composition}</p></div>
    //             <div class="lg:h-[15px] mb-2"><span class="my-5 p-[7px] lg:p-0 text-[13px] lg:bg-white bg-gray-300 rounded-2xl">${elm.price}.00 AZN</span></div>
    //             <div class="lg:overflow-hidden lg:h-0 lg:group-hover:h-auto lg:transition-all lg:duration-300 py-2">
    //                 <button class="px-[15px] bg-[#CFEB0B] border-[1px] border-solid hidden lg:visible border-black text-black rounded-[16px] lg:opacity-0 group-hover:opacity-100 lg:transition-opacity lg:duration-300 justify-center lg:w-[215px] mt-[5px] lg:h-[28px] lg:hover:bg-white">
    //                   SƏBƏTƏ ƏLAVƏ ET
    //                 </button>
    //             </div>
    //         </div>
    //     </div>`
  
    const container = document.getElementById(containerSelector);
    container.innerHTML = kod;
  }
  

  
show(data.pizza, 'pizzalar')
show(data.lunch,'qelyanalti')
show(data.pizzaparty,'pizzaParty')
show(data.pasta,'pasta')
show(data.papadias,'papadias')
show(data.salat,'salatlar')
show(data.desert,'desertler')
show(data.drink,'ickiler')
show(data.souses,'souslar')

let cart = []
let productCount = 0
let flag = false

function showCart() {
  let kod = '';
  let total = 0;

  if (cart.length === 0) {
    cartHtml.innerHTML = `
      <i class="fa-solid fa-cart-shopping text-7xl text-gray-200"></i>
      <p class="text-gray-300 ">Səbətiniz boşdur</p>
    `;
    return;
  }

  cart.forEach(item => {
    total += item.price * item.quantity;

    kod += `
       <div class="bg-white rounded-xl mb-4 relative">
        <button onclick="delItem('${item.id}')" class="absolute top-4 right-4 text-xl text-gray-600 hover:text-black">&times;</button>

        <p class="font-bold text-sm py-5 px-3 text-left w-[]">${item.title} – ${item.size}</p>

        <p class="text-[10px] fontPapa text-gray-500 text-left">${item.type}</p>

        <div class="flex items-center justify-between mt-4 text-sm">
          <div class="flex items-center gap-4">
            <button onclick="countChange(-1, '${item.id}')" class="text-xl text-gray-700 hover:text-black">–</button>
            <span class="text-green-600 font-semibold">${item.quantity}</span>
            <button onclick="countChange(1, '${item.id}')" class="text-xl text-gray-700 hover:text-black">+</button>
          </div>
          <div class="text-right font-bold text-gray-900 text-lg">${(item.price * item.quantity).toFixed(2)} AZN</div>
        </div>
      </div>
    `;
  });

  kod += `
    <div class="border-t pt-4 mt-4 flex justify-between text-lg font-bold">
      <span>YEKUN</span>
      <span>${total.toFixed(2)} AZN</span>
    </div>
  `;

  cartHtml.innerHTML = kod;
}


function delItem(id) {
    let product = cart.find(item => item.id === id);
    
    cart = cart.filter(item => item.id !== id);
    
    productCount = 1;
    
    showCart();
}

function countChange(arg, pID) {

    const index = cart.findIndex(item => item.id === pID);
    
    if (index !== -1) {
      if (arg === -1) {
        if (cart[index].quantity > 1) {
          cart[index].quantity--;
        } else {
          cart.splice(index, 1);
        }
      } else if (arg === 1) {
        if (!cart[index].quantity) {
          cart[index].quantity = 1;
        }
        cart[index].quantity++;
      }
      
      showCart();
    }
}

function pDetails(arr, event) {
    event.stopPropagation();
  
    const parsedArr = JSON.parse(decodeURIComponent(arr)); 
  
    cart1.style.display = 'block';
    cartBG.style.display = 'block';
  
    slcProduct([parsedArr]); // obyekt olaraq ötürülür
  
    flag = true;
}
  
function toggle() {
    if (cart1.style.display === 'block') {
      cart1.style.display = 'none';
      cartBG.style.display = 'none';
    } else {
      cart1.style.display = 'block';
      cartBG.style.display = 'block';
    }
}

function slcProduct(arr) {
  let kod = '';

  arr.forEach(elm => {
    const uniqueTypes = [...new Set(elm.variations.map(v => v.type))];
    const sizeOptions = [...new Map(
    elm.variations.map(v => [`${v.size}-${v.price}`, { size: v.size, price: v.price }])
    ).values()];

    const defaultSize = sizeOptions[0];
    const defaultType = uniqueTypes[0];

    selectionState[elm.id] = {
      selected: {
        size: defaultSize.size,
        price: defaultSize.price,
        type: defaultType,
      },
      quantity: 1,
    };

    kod += `
      <div class="flex flex-col lg:flex-row gap-6 p-6">
        <!-- Left -->
        <div class="w-full lg:w-1/3 flex flex-col items-center">
          <img src="${elm.img}" alt="${elm.title}" class="rounded-xl shadow-md w-full h-auto max-w-[280px]" />
          <h2 class="text-3xl fontPapa font-extrabold mt-4">${elm.title}</h2>
          <p class="text-gray-600 text-sm text-center mt-1">${elm.composition}</p>
        </div>

        <!-- Right -->
        <div class="w-full lg:w-2/3 space-y-6">
          <!-- Size -->
          <p class="fontPapa font-semibold text-lg">Ölçü <span class="font-bold text-green-700">(Mütləq)</span></p>
          <div class="flex items-center gap-4 mt-2">
            <div id="selected-variant-${elm.id}" class="border-2 border-green-600 rounded-xl p-3 min-w-[200px]">
              <p class="fontPapa font-semibold text-sm">${defaultSize.size}</p>
              <p class="fontPapa text-green-800 font-bold text-sm">${defaultSize.price} AZN</p>
            </div>
            <button onclick="toggleSizeOptions('${elm.id}')" class="text-gray-400 text-sm hover:text-black transition">
              Digər variant seçin →
            </button>
          </div>

          <!-- size options -->
          <div class="w-[200px] hidden" id="size-options-${elm.id}">
            ${sizeOptions
              .filter(v => v.size !== defaultSize.size)
              .map(v => `
                <div onclick="sizeVar('${elm.id}', '${v.size}', '${v.price}')"
                     class="m-3 border border-green-600 rounded-xl p-3 cursor-pointer hover:bg-green-100 transition select-none">
                  <p class="font-medium fontPapa">${v.size}</p>
                  <p class="text-green-800 font-semibold">${v.price} AZN</p>
                </div>
              `).join('')}
          </div>

          <!-- Xəmir növü -->
          <p class="fontPapa font-semibold text-lg ">Xəmirin növünü seçin <span class="font-bold text-green-700">(Mütləq)</span></p>
          <div class="flex flex-wrap gap-3 mt-2" data-group="dough-${elm.id}">
            ${uniqueTypes.map(type => `
              <div onclick="doughVar('${elm.id}', this, '${type}')"
                   class="border border-gray-300 rounded-xl p-3 cursor-pointer hover:bg-gray-100 transition select-none ${type === defaultType ? 'selected' : ''}"
                   data-group="dough-${elm.id}">
                ${type}
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="bg-white w-full h-[10%] rounded-b-3xl" id="footer-bar-${elm.id}"></div>
    `;
  });

  productDetailsHtml.innerHTML = kod;

  arr.forEach(elm => updateFooter(elm.id));
}


function sizeVar(pID, size, price) {
  const viewer = document.getElementById(`selected-variant-${pID}`);
  viewer.innerHTML = `
    <p class="font-semibold text-sm">${size}</p>
    <p class="text-green-800 font-bold text-sm">${price} AZN</p>
  `;

  selectionState[pID].selected.size = size;
  selectionState[pID].selected.price = price;

  const product = data.pizza.find(p => p.id === pID);
  const sizeOptions = [...new Map(
    product.variations.map(v => [`${v.size}-${v.price}`, { size: v.size, price: v.price }])
  ).values()];

  const dropdown = document.getElementById(`size-options-${pID}`);
  dropdown.innerHTML = sizeOptions
    .filter(v => v.size !== size)
    .map(v => `
      <div onclick="sizeVar('${pID}', '${v.size}', '${v.price}')"
           class="border border-green-600 rounded-xl px-4 py-3 text-sm cursor-pointer hover:bg-green-50 select-none">
        <p class="font-medium">${v.size}</p>
        <p class="text-green-800 font-semibold">${v.price} AZN</p>
      </div>
    `).join('');

  dropdown.classList.add('hidden');
  updateFooter(pID);
}


function doughVar(pID, el, type) {
  const group = `dough-${pID}`;
  const all = document.querySelectorAll(`[data-group="${group}"]`);
  all.forEach(x => x.classList.remove('selected'));
  el.classList.add('selected');

  selectionState[pID].selected.type = type;

  updateFooter(pID);
}


function updateFooter(pID) {
  const state = selectionState[pID];
  if (!state) return;

  const footer = document.getElementById(`footer-bar-${pID}`);
  const total = (parseFloat(state.selected.price) * state.quantity).toFixed(2);

  footer.innerHTML = `
  <div class="flex justify-between items-center px-6 py-4 w-full">
    <div class="flex items-center gap-4">
      <button onclick="changeQuantity('${pID}', -1)" class="text-2xl font-bold">−</button>
      <span class="text-lg font-semibold">${state.quantity}</span>
      <button onclick="changeQuantity('${pID}', 1)" class="text-2xl font-bold">+</button>
    </div>
    <div class="text-green-800 font-extrabold text-xl">${total} AZN</div>
    
    <button onclick="confirmAddToCart('${pID}')" class="opacity-100 px-[15px] bg-[#CFEB0B] border-[1px] border-solid border-black text-black rounded-[16px] hover:opacity-100 transition-opacity duration-300 justify-center w-[215px] mt-[5px] h-[28px] hover:bg-white">
      SƏBƏTƏ ƏLAVƏ ET ->
    </button>
  </div>
`;
}

function confirmAddToCart(pID) {
  const state = selectionState[pID];
  if (!state) return;

  const product = data.pizza.find(p => p.id === pID);
  if (!product) return;

  const cartItem = {
    id: `${product.id}-${state.selected.size}-${state.selected.type}`,
    title: product.title,
    composition: product.composition,
    size: state.selected.size,
    type: state.selected.type,
    quantity: state.quantity,
    price: parseFloat(state.selected.price),
    total: parseFloat(state.selected.price) * state.quantity,
  };

  const existitem = cart.find(item => item.id === cartItem.id);
  if (existitem) {
    existitem.quantity += state.quantity;
    existitem.total = existitem.quantity * existitem.price;
  } else {
    cart.push(cartItem);
  }

  showCart();
  toggle();
}


function changeQuantity(pID, delta) {
  if (!selectionState[pID]) return;

  let quantity2 = selectionState[pID].quantity + delta;
  if (quantity2 < 1) quantity2 = 1;

  selectionState[pID].quantity = quantity2;
  updateFooter(pID);
}

function toggleSizeOptions(id) {
  const el = document.getElementById(`size-options-${id}`);
  el.classList.toggle('hidden');
}
