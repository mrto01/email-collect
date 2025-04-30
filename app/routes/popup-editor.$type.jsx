import {authenticate} from "../shopify.server.js";
import PopupEditorPage from "../popup-editor/PopupEditorPage.jsx";
import style from "../styles/popup-editor.scss?url"
import polarisStyles from '@shopify/polaris/build/esm/styles.css?url';

export const links = () => [
  {rel: 'stylesheet', href: polarisStyles},
  {rel: 'stylesheet', href: style},
];


export async function loader({request, params}) {
  const {session, admin} = await authenticate.admin(request);
  let response = {
    apiKey: process.env.SHOPIFY_API_KEY || ''
  }
  return response
}

export default PopupEditorPage;
