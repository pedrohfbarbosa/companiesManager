import { security, userSecurity } from "../../scripts/security.js";
import { buttonsListener } from "../../scripts/buttons.js"
import { companyInfo, userInfo } from "../../scripts/userInfo.js";

security()
await userSecurity()

buttonsListener()

await userInfo()

await companyInfo()