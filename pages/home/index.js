import { getAllCompanies } from "../../scripts/apiRequests.js";
import { buttonOpenHeader } from "../../scripts/buttons.js";
import { renderCardsHome } from "../../scripts/renderCardsHome.js";
import { renderSelectSectors } from "../../scripts/renderSectorsHome.js";

/* console.log(await getSectors()) */

buttonOpenHeader()

await renderSelectSectors()

renderCardsHome(await getAllCompanies())