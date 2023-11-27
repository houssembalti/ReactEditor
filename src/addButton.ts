export const addbuttons = () => {
  return `<button class="mceNonEditable" id="btn" type="button"    >Press here to Edit</button>`;
};

export const edittedbutton: string = ` <div style="display:flex;justify-content:center">
<button class="view" id="view" type="  button" >Edit button</button>
</div>`;

export const addbackgroundimage: string = "<div></div>";

export const addit = (url: string) => {
  return `<img src="${url}" style="width:100%"/>`;
};

export const addbuttonwithtext = (
  url: string,
  text: string,
  fontFamily?: string | null,
  fontSize?: string | null,
  textColor?: string | null,
  backgroundColor?: string | null,
  textalign?: string | null
) => {
  const style = `
    font-family: ${fontFamily || "Arial, Helvetica, sans-serif"};
    font-size: ${fontSize || "12px"};
    color: ${textColor || "#000000"};
    background-color: ${backgroundColor || "transparent"};
    text-align: ${textalign || "center"};
  
    
  `;

  return `
    <div style="position: relative;">
      <img src="${url}" alt="Image" style="width:100%" id="image_change"/>
      <div style="position: absolute; top:50%;left:0;right:0; transform: translateY(-50%); ${style}" class="mceNonEditable" id="text_change_top_left">
        ${text}
      </div>
    </div>
  `;
};
