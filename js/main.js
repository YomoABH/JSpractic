const products = [
	{
		id: 1,
		title: 'Lenovo Yoga',
		price: 3000,
	},
	{
		id: 2,
		title: 'Acer Aspire',
		price: 1800,
	},
	{
		id: 3,
		title: 'Dell Vostro',
		price: 3400
	},
];

document.addEventListener('DOMContentLoaded', loadProduct)

let order = [];

function addToBasket(productId) {
	let product = products.find(el => el.id === productId);
	let repeat = order.filter(el => el.id === productId);
	let add = true;
	if (repeat.length === 1) {
		add = false;
	}
	if (add) {
		order.push(product);
		saveToStorage(product);
	} else {
		alert('Товар уже в корзине');
	}
	renderCart();
	rerenderTotalPrice();
}

function removeFromBasket(productId) {
	// TODO: описать логику удаления товара из корзины

	removeStorage(order.find(el => el.id === productId));

	order.splice(order.findIndex(el => el.id === productId), 1);
	// Эти строчки не трогаем, они отвечают за переотрисовку страницы
	renderCart();
	rerenderTotalPrice();
}


function rerenderTotalPrice() {
	// TODO: опишите функционал подсчета общей стоимости заказа
	let totalPrice = order.reduce((acc, el) => {
		return acc + el.price
	}, 0)

	// Не меняйте эту строчку
	document.getElementById('total').innerText = totalPrice;
}

// Этот метод остается без изменений
function renderCart() {
	const cart = document.getElementById('basket-items');

	cart.innerHTML = '';
	order.forEach(item => {
		const el = document.createElement('li');
		el.innerText = item.title;
		el.onclick = () => removeFromBasket(item.id);
		cart.appendChild(el);
	})
}
function saveToStorage(el) {
	const product = JSON.parse(localStorage.getItem('product')) || [];
	localStorage.setItem('product', JSON.stringify([...product, el]))
}
function loadProduct() {
	const products = JSON.parse(localStorage.getItem('product'))
	if (products) {
		localStorage.clear('product');
		products.forEach(item => {
			addToBasket(item.id)
		})
	}
}
function removeStorage(removeProduct) {
	const products = JSON.parse(localStorage.getItem('product')) || [];
	localStorage.setItem('product', JSON.stringify(products.filter((todo) => todo.id !== removeProduct.id)));
	console.log(products, "log");
}
