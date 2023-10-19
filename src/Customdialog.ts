export const dialogconfig: any = {
  title: "Upload an image",
  // url: "Dialogcontent.html",

  body: {
    type: "panel",
    items: [
      {
        type: "input", // component type
        name: "url_input",
        tabel: "lena",
        placeholder: "please type url source here",
        enabled: true,
        inputmode: "url",
      },
      {
        type: "dropzone", // component type
        name: "url_input_drop",
        label: "Drop you image here ",
        types: "image",
      },
    ],
  },
  buttons: [
    {
      type: "submit",
      text: "Confirm",
    },
    {
      type: "cancel",
      text: "cancel",
    },
  ],

  onSubmit: (dialogApi: any) => {
    console.log(dialogApi.getData());
  },
  onchange: (dialogApi: any, details: any) => {},
};

export const dialogconfig_2: any = {
  title: "Upload an image",
  // url: "Dialogcontent.html",

  body: {
    type: "tabpanel",
    tabs: [
      {
        name: "upload_local",
        title: "Drag and drop",
        items: [
          {
            type: "dropzone", // component type
            name: "url_input_drop",
            label: "Drop you image here ",
            types: "image",
          },
        ],
      },
      {
        name: "upload_url",
        title: "Url",
        items: [
          {
            type: "input", // component type
            name: "url_input",
            inputMode: "url",
            //label: "Drop you image here ",
            placeholder: "Enter the image url",
          },
        ],
      },
    ],
  },
  buttons: [
    {
      type: "submit",
      text: "Confirm",
    },
    {
      type: "cancel",
      text: "cancel",
    },
  ],

  onSubmit: (dialogApi: any) => {
    console.log(dialogApi.getData());
  },
};

export const addbuttondialog: any = {
  title: "Add button",
  body: {
    type: "panel",

    items: [
      {
        type: "input", // component type
        name: "url_input",
        tabel: "lena",
        //placeholder: "please type url source here",
        enabled: true,
        inputmode: "url",
      },
      {
        type: "colorpicker",
        name: "colorpicker",
        label: "Color",
      },
     
        
     
    ],
  },
  buttons: [
    {
      type: "submit",
      text: "Confirm",
    },
    {
      type: "cancel",
      text: "cancel",
    },
  ],
};
