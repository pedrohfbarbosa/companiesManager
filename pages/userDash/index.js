import { security } from "../../scripts/security.js";
import { buttonsListener } from "../../scripts/buttons.js"
import { companyInfo, userInfo } from "../../scripts/userInfo.js";

security()

buttonsListener()

userInfo()

await companyInfo()