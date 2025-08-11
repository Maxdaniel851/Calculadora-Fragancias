// Base de datos de productos
const products = [
    // Fragancias
    { name: "Frag Ailyn", pricePerGram: 107.53, category: "fragancia" },
    { name: "Frag Algodón", pricePerGram: 107.53, category: "fragancia" },
    { name: "Frag Bamboo", pricePerGram: 78.63, category: "fragancia" },
    { name: "Frag Brisa Del Mar", pricePerGram: 99.03, category: "fragancia" },
    { name: "Frag Brisa Del Campo", pricePerGram: 82.03, category: "fragancia" },
    { name: "Frag Brisa Marina", pricePerGram: 139.83, category: "fragancia" },
    { name: "Frag Café", pricePerGram: 148.33, category: "fragancia" },
    { name: "Frag Canela", pricePerGram: 82.03, category: "fragancia" },
    { name: "Frag Carro Nuevo", pricePerGram: 144.93, category: "fragancia" },
    { name: "Frag Cherry (Cereza)", pricePerGram: 85.43, category: "fragancia" },
    { name: "Frag Chicle", pricePerGram: 94.78, category: "fragancia" },
    { name: "Frag Citronela", pricePerGram: 85.43, category: "fragancia" },
    { name: "Frag Durazno", pricePerGram: 117.73, category: "fragancia" },
    { name: "Frag Flor De Amoha", pricePerGram: 139.83, category: "fragancia" },
    { name: "Frag Fresa", pricePerGram: 153.43, category: "fragancia" },
    { name: "Frag Frutal", pricePerGram: 122.83, category: "fragancia" },
    { name: "Frag Jardín", pricePerGram: 105.83, category: "fragancia" },
    { name: "Frag Lavanda Fabulosa", pricePerGram: 119.43, category: "fragancia" },
    { name: "Frag Lima Limón", pricePerGram: 133.03, category: "fragancia" },
    { name: "Frag Liquid Touch", pricePerGram: 119.43, category: "fragancia" },
    { name: "Frag Limón Peel", pricePerGram: 90.53, category: "fragancia" },
    { name: "Frag Magic Flowers", pricePerGram: 90.53, category: "fragancia" },
    { name: "Frag Mandarina", pricePerGram: 103.29, category: "fragancia" },
    { name: "Frag Manzana", pricePerGram: 99.03, category: "fragancia" },
    { name: "Frag Maracuyá", pricePerGram: 150.03, category: "fragancia" },
    { name: "Frag Patilla Melón", pricePerGram: 78.11, category: "fragancia" },
    { name: "Frag Pino Navidad", pricePerGram: 76.25, category: "fragancia" },
    { name: "Frag Piña", pricePerGram: 110.93, category: "fragancia" },
    { name: "Frag Rosa", pricePerGram: 68.43, category: "fragancia" },
    { name: "Frag Sierra Nevada", pricePerGram: 144.93, category: "fragancia" },
    { name: "Frag Talco", pricePerGram: 127.93, category: "fragancia" },
    { name: "Frag Uva", pricePerGram: 102.43, category: "fragancia" },
    { name: "Frag Vainilla", pricePerGram: 112.63, category: "fragancia" },
    // Productos químicos
    { name: "Betaína", pricePerGram: 15.38, category: "quimico" },
    { name: "Cocoamida", pricePerGram: 30.25, category: "quimico" },
    { name: "Dodigen", pricePerGram: 26.28, category: "quimico" },
    { name: "Glicerina", pricePerGram: 10.22, category: "quimico" },
    { name: "Nonil", pricePerGram: 24.70, category: "quimico" },
    { name: "Procide", pricePerGram: 20.33, category: "quimico" },
    { name: "Rinsol", pricePerGram: 23.31, category: "quimico" },
    { name: "Silicona Emulsionable", pricePerGram: 30.25, category: "quimico" }
];

const containers = [
    { name: "Atomizador 60ml", price: 1100 },
    { name: "Atomizador 120ml", price: 1200 },
    { name: "Envase 150ml", price: 500 },
    { name: "Envase 250ml", price: 600 }
];

// Variables globales
let selectedProduct = null;
let calculationType = 'grams';
let orderItems = [];
let selectedContainerIndex = null;
let containerMode = 'add'; // 'add' o 'subtract'

// Función para mostrar/ocultar cambios de precios
function togglePriceChanges() {
    const content = document.getElementById('priceChangesContent');
    const arrow = document.getElementById('priceChangesArrow');
    
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        arrow.classList.add('rotate-180');
    } else {
        content.classList.add('hidden');
        arrow.classList.remove('rotate-180');
    }
}

// Función para filtrar productos
function filterProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const suggestionsDiv = document.getElementById('suggestions');
    
    if (searchTerm.length > 0) {
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );
        
        if (filtered.length > 0) {
            suggestionsDiv.innerHTML = filtered.map(product => `
                <button onclick="selectProduct('${product.name}')" class="w-full px-6 py-4 text-left border-b border-gray-600/30 last:border-b-0 hover:bg-white/5 transition-all duration-200 ${getCategoryClass(product.category)}">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            ${getCategoryIcon(product.category)}
                            <div>
                                <div class="font-medium text-gray-200 capitalize text-lg">${product.name}</div>
                                <div class="text-sm text-gray-400">$${product.pricePerGram}/gramo</div>
                            </div>
                        </div>
                        <div class="text-sm font-semibold ${product.category === 'fragancia' ? 'text-purple-400' : 'text-blue-400'}">
                            ${product.category === 'fragancia' ? 'Fragancia' : 'Químico'}
                        </div>
                    </div>
                </button>
            `).join('');
            suggestionsDiv.classList.remove('hidden');
        } else {
            suggestionsDiv.classList.add('hidden');
        }
    } else {
        suggestionsDiv.classList.add('hidden');
    }
}

// Función para mostrar sugerencias
function showSuggestions() {
    if (document.getElementById('searchInput').value.length > 0) {
        filterProducts();
    }
}

// Función para seleccionar producto
function selectProduct(productName) {
    selectedProduct = products.find(p => p.name === productName);
    document.getElementById('searchInput').value = productName;
    document.getElementById('suggestions').classList.add('hidden');
    
    // Mostrar producto seleccionado
    document.getElementById('selectedProduct').innerHTML = `
        <div class="p-6 rounded-2xl border-2 ${getCategoryBorderClass(selectedProduct.category)} ${getCategoryBgClass(selectedProduct.category)}">
            <div class="flex items-center gap-3 mb-3">
                ${getCategoryIcon(selectedProduct.category)}
                <div class="font-bold text-gray-100 capitalize text-xl">${selectedProduct.name}</div>
            </div>
            <div class="text-3xl font-bold ${selectedProduct.category === 'fragancia' ? 'text-purple-400' : 'text-blue-400'}">
                $${selectedProduct.pricePerGram} <span class="text-sm font-normal text-gray-400">por gramo</span>
            </div>
        </div>
    `;
    document.getElementById('selectedProduct').classList.remove('hidden');
    
    // Mostrar secciones de cálculo
    document.getElementById('calculationSection').classList.remove('hidden');
    document.getElementById('containerSection').classList.remove('hidden');
    
    // Limpiar inputs
    document.getElementById('gramsInput').value = '';
    document.getElementById('moneyInput').value = '';
    
    updateCalculation();
}

// Función para establecer modo de envases
function setContainerMode(mode) {
    containerMode = mode;
    
    // Actualizar estilos de botones
    document.querySelectorAll('.container-mode-btn').forEach(btn => {
        btn.classList.remove('active', 'bg-purple-500/40', 'border-purple-500/60');
    });
    
    const activeBtn = document.getElementById(mode === 'add' ? 'containerModeAdd' : 'containerModeSubtract');
    activeBtn.classList.add('active', 'bg-purple-500/40', 'border-purple-500/60');
    
    // Actualizar descripción
    const description = document.getElementById('containerModeDescription');
    if (mode === 'add') {
        description.textContent = 'Los envases se sumarán al precio del producto';
        description.className = 'text-sm text-blue-400 mt-3 font-medium';
    } else {
        description.textContent = 'Los envases se descontarán del dinero disponible';
        description.className = 'text-sm text-orange-400 mt-3 font-medium';
    }
    
    // Recalcular si hay datos
    updateCalculation();
}

// Función para seleccionar envase
function selectContainer(index) {
    // Remover clase active de todos los botones
    document.querySelectorAll('.container-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Agregar clase active al botón seleccionado
    document.querySelectorAll('.container-button')[index].classList.add('active');
    
    selectedContainerIndex = index;
    const container = containers[index];
    
    // Mostrar controles de envase
    document.getElementById('containerControls').classList.remove('hidden');
    document.getElementById('selectedContainerName').textContent = container.name;
    document.getElementById('selectedContainerPrice').textContent = `$${container.price} por unidad`;
    
    updateContainerTotal();
    updateCalculation();
}

// Función para limpiar envase seleccionado
function clearContainer() {
    selectedContainerIndex = null;
    document.getElementById('containerControls').classList.add('hidden');
    document.querySelectorAll('.container-button').forEach(btn => {
        btn.classList.remove('active');
    });
    updateCalculation();
}

// Función para cambiar cantidad de envases
function changeContainerQuantity(change) {
    const quantityInput = document.getElementById('containerQuantity');
    let currentQuantity = parseInt(quantityInput.value) || 1;
    currentQuantity += change;
    if (currentQuantity < 1) currentQuantity = 1;
    quantityInput.value = currentQuantity;
    updateContainerTotal();
    updateCalculation();
}

// Función para actualizar total de envases
function updateContainerTotal() {
    if (selectedContainerIndex !== null) {
        const container = containers[selectedContainerIndex];
        const quantity = parseInt(document.getElementById('containerQuantity').value) || 1;
        const total = container.price * quantity;
        document.getElementById('containerTotalPrice').textContent = `$${total}`;
    }
}

// Función para calcular desde gramos
function calculateFromGrams() {
    if (!selectedProduct) return;
    
    calculationType = 'grams';
    const grams = parseFloat(document.getElementById('gramsInput').value) || 0;
    
    if (grams > 0) {
        const basePrice = grams * selectedProduct.pricePerGram;
        const containerPrice = getContainerPrice();
        
        let totalPrice;
        if (containerMode === 'add') {
            totalPrice = basePrice + containerPrice;
        } else {
            totalPrice = basePrice + containerPrice; // En modo gramos, siempre se suma
        }
        
        document.getElementById('moneyInput').value = totalPrice.toFixed(2);
        updateSummary(grams, totalPrice, basePrice);
    } else {
        document.getElementById('summaryPanel').classList.add('hidden');
    }
}

// Función para calcular desde dinero
function calculateFromMoney() {
    if (!selectedProduct) return;
    
    calculationType = 'money';
    const baseMoney = parseFloat(document.getElementById('moneyInput').value) || 0;
    
    if (baseMoney > 0) {
        const containerPrice = getContainerPrice();
        let availableForProduct, totalPrice;
        
        if (containerMode === 'add') {
            // Los envases se suman al dinero ingresado
            availableForProduct = baseMoney;
            totalPrice = baseMoney + containerPrice;
        } else {
            // Los envases se restan del dinero ingresado
            availableForProduct = baseMoney - containerPrice;
            totalPrice = baseMoney;
        }
        
        if (availableForProduct > 0) {
            const grams = availableForProduct / selectedProduct.pricePerGram;
            document.getElementById('gramsInput').value = grams.toFixed(2);
            updateSummary(grams, totalPrice, availableForProduct);
        } else {
            document.getElementById('gramsInput').value = '0';
            document.getElementById('summaryPanel').classList.add('hidden');
        }
    } else {
        document.getElementById('summaryPanel').classList.add('hidden');
    }
}

// Función para obtener precio de envases
function getContainerPrice() {
    if (selectedContainerIndex !== null) {
        const container = containers[selectedContainerIndex];
        const quantity = parseInt(document.getElementById('containerQuantity').value) || 1;
        return container.price * quantity;
    }
    return 0;
}

// Función para actualizar cálculos
function updateCalculation() {
    updateContainerTotal();
    if (calculationType === 'grams') {
        calculateFromGrams();
    } else {
        // Si se está calculando por dinero, recalcular cuando cambien los envases
        calculateFromMoney();
    }
}

// Función para actualizar resumen
function updateSummary(grams, totalPrice, productPrice) {
    if (!selectedProduct || grams <= 0) return;
    
    const containerPrice = getContainerPrice();
    
    let summaryHTML = `
        <div class="glass-morphism p-5 rounded-2xl border border-purple-500/20">
            <div class="text-sm text-purple-300 mb-2">Producto</div>
            <div class="font-bold text-xl text-white capitalize">${selectedProduct.name}</div>
        </div>
        
        <div class="glass-morphism p-5 rounded-2xl border border-blue-500/20">
            <div class="text-sm text-blue-300 mb-2">Cantidad</div>
            <div class="font-bold text-2xl text-white">${grams.toFixed(2)} <span class="text-sm font-normal text-gray-400">gramos</span></div>
        </div>
        
        <div class="glass-morphism p-5 rounded-2xl border border-green-500/20">
            <div class="text-sm text-green-300 mb-2">Precio del producto</div>
            <div class="font-bold text-xl text-white">$${productPrice.toFixed(2)}</div>
        </div>
    `;
    
    if (selectedContainerIndex !== null) {
        const container = containers[selectedContainerIndex];
        const quantity = parseInt(document.getElementById('containerQuantity').value) || 1;
        const modeText = containerMode === 'add' ? '(se suma)' : '(incluido)';
        const pricePrefix = containerMode === 'add' ? '+' : '';
        
        summaryHTML += `
            <div class="glass-morphism p-5 rounded-2xl border border-orange-500/20">
                <div class="text-sm text-orange-300 mb-2">Envases ${modeText}</div>
                <div class="font-medium text-gray-300">${container.name} x${quantity}</div>
                <div class="font-bold text-lg text-white">${pricePrefix}$${containerPrice.toFixed(2)}</div>
            </div>
        `;
    }
    
    summaryHTML += `
        <div class="border-t border-white/20 pt-4">
            <div class="glass-morphism p-5 rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-500/10 to-blue-500/10">
                <div class="text-sm text-purple-300 mb-2">TOTAL A PAGAR</div>
                <div class="font-bold text-4xl text-white">$${totalPrice.toFixed(2)}</div>
            </div>
        </div>
    `;
    
    document.getElementById('summaryContent').innerHTML = summaryHTML;
    document.getElementById('summaryPanel').classList.remove('hidden');
}

// Función para agregar al pedido
function addToOrder() {
    if (!selectedProduct) return;
    
    const grams = parseFloat(document.getElementById('gramsInput').value) || 0;
    const totalPrice = parseFloat(document.getElementById('moneyInput').value) || 0;
    
    if (grams <= 0 || totalPrice <= 0) {
        alert('Por favor ingresa cantidades válidas antes de agregar al pedido');
        return;
    }
    
    const containerPrice = getContainerPrice();
    const productPrice = grams * selectedProduct.pricePerGram;
    const containerQuantity = selectedContainerIndex !== null ? (parseInt(document.getElementById('containerQuantity').value) || 1) : 0;
    const selectedContainer = selectedContainerIndex !== null ? containers[selectedContainerIndex] : null;
    
    const orderItem = {
        id: Date.now(),
        product: selectedProduct,
        grams: grams,
        productPrice: productPrice,
        includeContainer: selectedContainerIndex !== null,
        container: selectedContainer,
        containerQuantity: containerQuantity,
        containerPrice: containerPrice,
        containerMode: containerMode,
        totalPrice: totalPrice
    };
    
    orderItems.push(orderItem);
    updateOrderDisplay();
    
    // Limpiar formulario
    clearForm();
}

// Función para limpiar formulario
function clearForm() {
    document.getElementById('searchInput').value = '';
    document.getElementById('gramsInput').value = '';
    document.getElementById('moneyInput').value = '';
    document.getElementById('containerQuantity').value = '1';
    document.getElementById('selectedProduct').classList.add('hidden');
    document.getElementById('calculationSection').classList.add('hidden');
    document.getElementById('containerSection').classList.add('hidden');
    document.getElementById('summaryPanel').classList.add('hidden');
    clearContainer();
    selectedProduct = null;
    // Resetear modo de envases al modo por defecto
    setContainerMode('add');
}

// Función para remover del pedido
function removeFromOrder(itemId) {
    orderItems = orderItems.filter(item => item.id !== itemId);
    updateOrderDisplay();
}

// Función para limpiar pedido completo
function clearOrder() {
    orderItems = [];
    updateOrderDisplay();
}

// Función para actualizar display del pedido
function updateOrderDisplay() {
    const orderItemsDiv = document.getElementById('orderItems');
    const orderTotalDiv = document.getElementById('orderTotal');
    const totalAmountSpan = document.getElementById('totalAmount');
    
    if (orderItems.length === 0) {
        orderItemsDiv.innerHTML = `
            <div class="text-center text-gray-400 py-12">
                <svg class="h-16 w-16 mx-auto mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
                <p class="text-lg mb-2">No hay productos en el pedido</p>
                <p class="text-sm">Selecciona productos y agrégalos al pedido</p>
            </div>
        `;
        orderTotalDiv.classList.add('hidden');
        return;
    }
    
    let totalOrder = 0;
    orderItemsDiv.innerHTML = orderItems.map(item => {
        totalOrder += item.totalPrice;
        const modeText = item.containerMode === 'add' ? 'sumado' : 'incluido';
        return `
            <div class="glass-morphism-strong p-6 rounded-2xl border border-gray-600/30 hover:border-purple-500/30 transition-all duration-300">
                <div class="flex justify-between items-start mb-4">
                    <div class="flex items-center gap-3">
                        ${getCategoryIcon(item.product.category)}
                        <div class="font-bold text-gray-100 capitalize text-lg">${item.product.name}</div>
                    </div>
                    <button 
                        onclick="removeFromOrder(${item.id})"
                        class="text-red-400 hover:text-red-300 p-2 rounded-full hover:bg-red-500/10 transition-colors"
                    >
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                
                <div class="grid grid-cols-2 gap-4 text-sm text-gray-300 mb-4">
                    <div class="bg-gray-800/30 p-3 rounded-lg">
                        <div class="text-gray-400 text-xs mb-1">Cantidad</div>
                        <div class="font-medium text-white">${item.grams.toFixed(2)}g</div>
                    </div>
                    <div class="bg-gray-800/30 p-3 rounded-lg">
                        <div class="text-gray-400 text-xs mb-1">Producto</div>
                        <div class="font-medium text-white">$${item.productPrice.toFixed(2)}</div>
                    </div>
                </div>
                
                ${item.includeContainer ? `
                    <div class="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20 mb-4">
                        <div class="text-purple-300 text-sm">
                            <strong>Envases (${modeText}):</strong> ${item.container.name} x${item.containerQuantity} - ${item.containerPrice.toFixed(2)}
                        </div>
                    </div>
                ` : ''}
                
                <div class="text-right">
                    <span class="text-2xl font-bold text-orange-400">${item.totalPrice.toFixed(2)}</span>
                </div>
            </div>
        `;
    }).join('');
    
    totalAmountSpan.textContent = `${totalOrder.toFixed(2)}`;
    orderTotalDiv.classList.remove('hidden');
}

// Funciones auxiliares para iconos y estilos
function getCategoryIcon(category) {
    if (category === 'fragancia') {
        return '<svg class="h-5 w-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>';
    } else {
        return '<svg class="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>';
    }
}

function getCategoryClass(category) {
    return '';
}

function getCategoryBorderClass(category) {
    if (category === 'fragancia') {
        return 'border-purple-500/50';
    } else {
        return 'border-blue-500/50';
    }
}

function getCategoryBgClass(category) {
    if (category === 'fragancia') {
        return 'bg-gradient-to-r from-purple-500/10 to-pink-500/10';
    } else {
        return 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10';
    }
}

// Event listener para ocultar sugerencias cuando se hace clic fuera
document.addEventListener('click', function(event) {
    if (!event.target.closest('#searchInput') && !event.target.closest('#suggestions')) {
        document.getElementById('suggestions').classList.add('hidden');
    }
});

// Inicializar modo de envases por defecto
document.addEventListener('DOMContentLoaded', function() {
    setContainerMode('add');

});
