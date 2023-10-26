const allEvents = data.events;
const mainDetails = document.getElementById("details");

const parametros = new URLSearchParams(location.search);
let paramterosId = parametros.get("id");
const objectId = allEvents.find((e) => e._id == paramterosId);

mainDetails.innerHTML = imprimirDetail(objectId);

function imprimirDetail(objectId) {
	return `<div class="caja2">
    <img src=${objectId.image} alt="ejemplo" />
    <div class="caja3">
        <ul>
        <li>Date: ${objectId.date} </li>
        <li>Category: ${objectId.category}</li>
        <li>Place: ${objectId.place}</li>
        <li>Capacity: ${objectId.capacity}</li>
        <li>${
					objectId.assistance
						? `<li>Assistance: ${objectId.assistance}</li>`
						: `<li>Estimate: ${objectId.estimate}</li>`
				} </li>
        <li>Price: ${objectId.price}</li>
        <li>Description: ${objectId.description}</li>
        </ul>
    </div>
</div>`;
}
// operador ternario: condition ? exprIfTrue : exprIfFalse
