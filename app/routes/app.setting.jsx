import {authenticate} from "../shopify.server.js";
import {SettingPage} from "../page/index.jsx";

export const loader = async ({request}) => {
  await authenticate.admin(request);
  return null;
}

export default SettingPage
