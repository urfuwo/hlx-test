import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "female";
const pathData = "M272 384v112q0 16-16 16t-16-16V384h-96q-16 0-16-16t16-16h96v-66q-27-3-50.5-15T149 240t-27-43.5-10-52.5q0-30 11.5-56t31-45.5 45.5-31T256 0t56 11.5 45.5 31 31 45.5 11.5 56q0 28-10 52.5T363 240t-40.5 31-50.5 15v66h96q16 0 16 16t-16 16h-96zM144 144q0 23 9 43.5t24 35.5 35.5 24 43.5 9 43.5-9 35.5-24 24-35.5 9-43.5-9-43.5T335 65t-35.5-24-43.5-9-43.5 9T177 65t-24 35.5-9 43.5z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/female";
export { pathData, ltr, accData };