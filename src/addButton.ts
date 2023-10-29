export const addbuttons = () => {
 
  return `<button class="mceNonEditable" id="btn" type="button"    >Press here to Edit</button>`;
};

export const edittedbutton: string = ` <div style="display:flex;justify-content:center">
<button class="view" id="view" type="button" >Edit button</button>
</div>`;

export const addbackgroundimage: string = "<div></div>";

export const addit = (url: string) => {
  return `<img src="${url}" />`;
};
