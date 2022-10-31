import { getAllCompanies } from "../../scripts/apiRequests.js";
import { buttonsListener } from "../../scripts/buttons.js";
import { renderCardsHome } from "../../scripts/renderCardsHome.js";
import { renderSelectSectors } from "../../scripts/renderSectorsHome.js";

buttonsListener()

await renderSelectSectors()

renderCardsHome(await getAllCompanies())