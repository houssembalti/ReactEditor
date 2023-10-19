import { v4 as uuidv4 } from "uuid";

export const addbuttons = () => {
  let uuid = uuidv4().replace(/-/g, "");
  return `<button class="mceNonEditable" id="${uuid}" type="button"    >Press here to Edit</button>`;
};

export const edittedbutton: string = ` <div style="display:flex;justify-content:center">
<button class="view" id="view" type="button" >Edit button</button>
</div>`;

export const addbackgroundimage: string = "<div></div>";

export const addit = (url: string) => {
  return `<img src="${url}" />`;
};
