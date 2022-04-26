// КНОПКА МЕНЮ БУРГЕРА
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
const menuList = document.querySelector('.menu__list');

if (iconMenu) {
	// ОТКРЫТИЕ МЕНЮ-БУРГЕРА И АНИМАЦИЯ ЕГО ИКОНКИ
	iconMenu.addEventListener('click', function (e) {
		document.body.classList.toggle('_lock');
		menuBody.classList.toggle('_active');
		iconMenu.classList.toggle('_active');

	});
	// ЗАКТРЫТИЕ МЕНЮ ПРИ КЛИКЕ НА ЕГО ПОКРОВ ИЛИ ССЫЛКУ
	menuList.addEventListener('click', function (e) {
		if (iconMenu.classList.contains('_active')) {
			menuBody.classList.remove('_active');
			iconMenu.classList.remove('_active');
		}
	})
}


// модальное окно
function closeModal() {
	overline.classList.remove('overline-visible') //отнимаем у плашки класс
	document.body.style.overflow = 'visible'; // разрешаем скрол
	nameTariff.setAttribute('value', '""');// забираем название тарифа которое сами ранее засунули
}

const overline = document.querySelector('.overline'); //задний фон модального окна
const nameTariff = document.querySelector('#tariff'); // input куда я запихаю имя тарифа
document.querySelectorAll('.tariff-plan__item-btn').forEach(function (el, i) {  // обходим всю коллекцию кнопок и присваиваем каждой функцию
	el.addEventListener('click', function () {  //добавляем обработчик событий кнопке на которую тыкнули
		let tariff = document.querySelectorAll('.tariff-plan__item-name')[i].textContent; //создаем переменную которая хранит название тарифа
		nameTariff.setAttribute('value', tariff); //суем название тарифа в value нужного нам inputa

		// открытие окна
		overline.classList.add('overline-visible'); // добавляем класс задней плашке модального окна
		document.body.style.overflow = 'hidden'; // блокируем скролл сайта

		//закрытие окна приклике вне окна
		overline.addEventListener('click', function () { //вешаем обработчик событий на кнопку закрытия окна
			if (event.target == overline) {
				closeModal();
			}
		})
		// закрытие окна при клике на крестик
		document.querySelector('.tariff-plan__modal-close').addEventListener('click', function () { //вешаем обработчик событий на кнопку закрытия окна
			closeModal();
		})
	})
})

// ПЛАВНЫЙ СКРОЛЛ ПО ЯКОРЯМ
document.querySelectorAll('a[href^="#"').forEach(link => {

	link.addEventListener('click', function (e) {
		e.preventDefault();

		let href = this.getAttribute('href').substring(1);

		const scrollTarget = document.getElementById(href);

		const topOffset = 65; // если не нужен отступ сверху 
		const elementPosition = scrollTarget.getBoundingClientRect().top;
		const offsetPosition = elementPosition - topOffset;

		window.scrollBy({
			top: offsetPosition,
			behavior: 'smooth'
		});
	});
});
