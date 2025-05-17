/**
 * Find the 'compute' iframe window within the document if it isn't
 * already the current window in devtools.
 */
const computeWindow = document.querySelector("#compute-wrapper")
	? window
	: document.querySelector("#sandbox-compute-container")?.contentWindow;
if (!computeWindow)
	throw new Error("Error al cargar la ventana iframe");

const createBtn = computeWindow.document.querySelector(".oui-savant__Panel--Footer .oui-button.oui-button-primary");
if (!createBtn || createBtn.textContent !== "Create")
	throw new Error("Error al encontrar el botón de 'Create'");

const contentsElmt = computeWindow.document.querySelector(".oui-savant__Panel--Contents");
if (!contentsElmt)
	throw new Error("Error al encontrar los contenidos del elemento");

const headerElmt = computeWindow.document.querySelector(".oui-savant__Panel--Header");
if (!headerElmt)
	throw new Error("Error al encontrar la cabecera del elemento");

/**
 * Create a new window to cloud.oracle.com, and then periodically
 * refresh it.
 * 
 * We need to periodically regenerate your session token as it
 * will probably expire too soon - this script might be running
 * for a long time!
 */
const sessionWindow = window.open(
	"https://cloud.oracle.com",
	"_blank",
	"height=400,width=400;popup=true"
);

//create the status bar
const statusElmt = document.createElement("div");
statusElmt.setAttribute("style", `
	z-index: 9999999999999;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 2rem;
	color: white;
	background-color: #00688c;
	box-shadow: 0px 0px 10px -4px black;
	white-space: break-spaces;
`);

/**
 * Set the status bar to be the same height as the header.
 */
const setStatusHeight = () => {
	statusElmt.style.height = `${headerElmt.clientHeight}px`;
};

setStatusHeight();
computeWindow.addEventListener("resize", setStatusHeight);
contentsElmt.prepend(statusElmt);

const logStyle = color => `background-color: #222; color: ${color}`;

console.clear();

console.info(
	"%c *** Arranca el script para la creación de la instancia en la nube de Oracle *** ",
	logStyle("#e0b414")
);
console.info(
	"%c *** NO CIERRES LA VENTANA EMERGENTE! *** ",
	logStyle("#ff4d4d")
);
console.info(
	"%c *** Filtra los logs que empiecen por '***' para mostrar la salida de este script *** ",
	logStyle("#f0dd99")
);
console.info(
	"%c *** Es idóneo cerrar las herramientas de desarrollador pasado un tiempo para evitar posibles chrasheos (fallo en el lado de Oracle) *** ",
	logStyle("#f0dd99")
);
console.info(
	"%c *** Puedes cambiar el intervalo con el que se lanza el botón cambiando la variable `INTERVAL_DURATION` (no recomendado) - el valor predeterminado es 30 (segundos) *** ",
	logStyle("#f0dd99")
);

const currentTime = () => {
	const now = new Date();
	const hours = now.getHours().toString().padStart(2, '0');
	const minutes = now.getMinutes().toString().padStart(2, '0');
	const seconds = now.getSeconds().toString().padStart(2, '0');
	return `${hours}:${minutes}:${seconds}`;
};

//you can change this on the fly if you want
let INTERVAL_DURATION = 30;

const countdownDuration = () => Math.round(INTERVAL_DURATION);

let countdown = countdownDuration();

/**
 * Interval to click the 'Create' button and reload the new window
 * every `INTERVAL_DURATION` milliseconds.
 */
void setInterval(() => {
	if (countdown > 0) {
		statusElmt.style.backgroundColor = "#00688c";
		statusElmt.innerHTML = `Dándole al botón en <b>${countdown} segundos</b>`;
		countdown--;
		return;
	}

	sessionWindow.location.reload();
	createBtn.click();
	statusElmt.style.backgroundColor = "#44bd50";
	statusElmt.innerHTML = `Click realizado!`;
	console.log(
		`%c *** Click 'creado' en ${currentTime()} *** `,
		logStyle("#7cde6f")
	);
	countdown = countdownDuration();
}, 1000);