let mainCards = document.getElementById("main-card");
let $buscador = document.getElementById("buscador");
let $form = document.getElementById("form");
let allEvents = data.events;
function createCard(object) {
	return `<div class="card" style="width: 15rem; margin: 1rem">
			<img src=${object.image}" class="card-img-top" alt="..." />
			<div class="card-body">
			<div class="text-body">
				<h5 class="card-title">${object.name}</h5>
				<p class="card-text">${object.description}</p>
				</div>
				<div class="text-home d-sm-flex justify-content-between">
					
				<a href="./pages/details.html?id=${object._id}"   class="button" d-flex align-items-end"
				style="width: 6rem">See more</a>
					<p class="price">$${object.price}</p>
				</div>
			</div>
		</div>`;
}

function cardBucle(events, cardMain) {
	let template = "";
	for (let infoCard of events) {
		template += createCard(infoCard);
	}
	cardMain.innerHTML += template;
}
cardBucle(allEvents, mainCards);

// task 3
function filtertext(dataArray, text) {
	if (!text) {
		return dataArray;
	} else {
		let textMiniscula = text.toLowerCase();
		return dataArray.filter(
			(card) =>
				card.name.toLowerCase().includes(textMiniscula) ||
				card.description.toLowerCase().includes(textMiniscula)
		);
	}
}
$buscador.addEventListener(`input`, () => {
	const checkActivados = Array.from(
		document.querySelectorAll("input[type='checkbox']:checked")
	).map((check) => check.value);
	let cardsFiltradas = filtrarCategoria(allEvents, checkActivados);
	mainCards.innerHTML = "";
	let aux = filtertext(cardsFiltradas, $buscador.value);
	pasarPantalla(aux, mainCards);
});
function pasarPantalla(arrayFiltrado, lugar) {
	if (arrayFiltrado.length === 0) {
		lugar.innerHTML = `<h2 class= "d-flex f-grow"> There are no results for the search </h2>`;
	} else {
		const printPantalla = arrayFiltrado.map((e) => createCard(e)).join("");
		lugar.innerHTML = printPantalla;
	}
}

function createCheck(recorreCategorias, lugar) {
	let template = "";
	for (const categoria of recorreCategorias) {
		template += `<div class="checkbox">
			<input type="checkbox" name="${categoria}" value="${categoria}" id="cate1" />
			<label for="${categoria}">${categoria}</label>
		</div>`;
	}
	lugar.innerHTML = template;
}
let categories = allEvents.map((e) => e.category);
console.log(categories);
let categoriesOnly = [...new Set(categories)]; // se utiliza para crear un objeto Set vacío que puede contener valores únicos (no duplicados). spread rompe el set y se utiliza para descomponer un objeto iterable (como un arreglo o un objeto Set) en sus elementos individuales  crea un nuevo arreglo que contiene todos los elementos del Set.
console.log(categoriesOnly);
createCheck(categoriesOnly, $form);

$form.addEventListener("change", () => {
	const checkActivados = Array.from(
		document.querySelectorAll("input[type='checkbox']:checked")
	).map((check) => check.value);
	let cardsFiltradas = filtrarCategoria(allEvents, checkActivados);
	mainCards.innerHTML = "";
	let aux = filtertext(cardsFiltradas, $buscador.value);
	pasarPantalla(aux, mainCards);
});

function filtrarCategoria(dataArray, categoriaCheck) {
	if (categoriaCheck.length === 0) {
		return dataArray;
	} else {
		return dataArray.filter((e) => categoriaCheck.includes(e.category));
	}
}
