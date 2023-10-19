import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { editorobject } from "./Editor_output";
import "./editor.css";
import { addbuttondialog, dialogconfig, dialogconfig_2 } from "./Customdialog";
import { addbuttons, addit, edittedbutton } from "./addButton";
import { clearformaticon } from "./utils";
//declare let window: editorobject;
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./customdialog.css";

const App = (props: { variable: string }) => {
  const [cont, setcont] = useState(props.variable);
  const [image_file, setimagefile] = useState<string>();
  const [button_view, setbutton_view] = useState<any>();

  const button_ref = useRef(null);
  let da: string = "";
  let selected_node: string;
  let bua: any;
  const editorRef: any = useRef(null);
  return (
    <div>
      <Editor
        apiKey="4ihibtgu02wtpfihm92czieefagek14nmfmmqfvj4bwjgaxz"
        onInit={(evt, editor) => {
          editorRef.current = editor;
        }}
        initialValue={props.variable}
        init={{
          plugins:
            "preview  importcss searchreplace autolink autosave save directionality  visualblocks visualchars  image link    table charmap  pagebreak nonbreaking    advlist lists wordcount     charmap quickbars emoticons ",
          setup: function (editor) {
            //select
            editor.on("click", function (e: any) {
              if (editor.selection.getNode().nodeName == "BUTTON") {
                console.log(editor.selection.getNode().id);
                console.log(editor.selection.getNode());
                selected_node = editor.selection.getNode().id;
                editor.windowManager.open({
                  title: "Add button",
                  body: {
                    type: "panel",

                    items: [
                      {
                        type: "input", // component type
                        name: "button_text", // identifier
                        inputMode: "text",
                        label: "Input Label", // text for the label
                        placeholder: "Button Text", // placeholder text for the input
                        enabled: true, // disabled state
                        maximized: false, // grow width to take as much space as possible
                      },
                      {
                        type: "input", // component type
                        name: "url_input",
                        label: "Button URL",
                        //placeholder: "please type url source here",
                        enabled: true,
                      },

                      {
                        type: "grid", // component type
                        columns: 2, // number of columns
                        items: [
                          {
                            type: "input", // component type
                            name: "marging",
                            label: "marging",
                          },
                          {
                            type: "input", // component type
                            name: "padding",
                            label: "padding",
                          },
                        ], // array of panel components
                      },

                      {
                        type: "grid", // component type
                        columns: 2, // number of columns
                        items: [
                          {
                            type: "colorinput", // component type
                            name: "colorinput", // identifier
                            label: "Background Color", // text for the label
                          },
                          {
                            type: "colorinput", // component type
                            name: "textcolor", // identifier
                            label: "Text Color", // text for the label
                          },
                        ], // array of panel components
                      },

                      {
                        type: "iframe", // component type
                        name: "iframe", // identifier
                        label: "Description of iframe", // text for the iframe's title attribute
                        sandboxed: false,
                        transparent: true,
                      },
                    ],
                  },
                  buttons: [
                    {
                      type: "submit",
                      text: "Confirm",
                    },
                    {
                      type: "custom",
                      text: "preview",
                      align: "start",
                    },
                    {
                      type: "cancel",
                      text: "cancel",
                    },
                  ],
                  initialData: {
                    button_text: editor.selection.getNode().innerText,
                    colorinput:
                      editor.selection.getNode().style.backgroundColor == ""
                        ? "#ffffff"
                        : editor.selection.getNode().style.backgroundColor,
                    marging: editor.selection.getNode().style.margin
                      ? editor.selection
                          .getNode()
                          .style.margin.replaceAll("px", "")
                      : "0 0",
                    padding: editor.selection.getNode().style.padding
                      ? editor.selection
                          .getNode()
                          .style.padding.replaceAll("px", "")
                      : "0 0",
                    textcolor: editor.selection.getNode().style.color
                      ? editor.selection.getNode().style.color
                      : "#000000",
                    // padding:document.getElementById("houssem")!.style.padding,
                  },
                  onChange(api: any, details: any) {
                    //  let button: HTMLButtonElement = document.getElementById("view")!;
                    //  button.innerText = api.getData().button_text;
                    // button.style.backgroundColor = api.getData().colorinput;
                    //button.innerText = api.getData().button_text;
                    // console.log(button)
                    // console.log(edittedbutton);
                    // const button: HTMLButtonElement =
                    //   document.createElement("button");
                    // button.innerText = api.getData().button_text;
                    // button.style.backgroundColor = api.getData().colorinput;
                    // console.log(button);
                    // api.setData({
                    //   iframe: button.outerHTML,
                    // });

                    let margin_numbers = api.getData().marging.split(/\s+/); // Split the string by one or more spaces
                    let padding_numbers = api.getData().padding.split(/\s+/); // Split the string by one or more spaces
                    // Add "px" after each number
                    const margin_px = margin_numbers
                      .map((number: number) => number + "px")
                      .join(" ");
                    const padding_px = padding_numbers
                      .map((number: number) => number + "px")
                      .join(" ");
                    console.log("f", margin_px, padding_px);
                    var x = editor.selection.dom.create(
                      "button",
                      {
                        id: selected_node,
                        style:
                          "background-color: " +
                          api.getData().colorinput +
                          "; margin: " +
                          margin_px +
                          "; padding: " +
                          padding_px +
                          ";color :" +
                          api.getData().textcolor,
                        class: "mceNonEditable",
                        onclick:
                          "window.open('" +
                          api.getData().url_input +
                          "', '_blank');",
                      },

                      api.getData().button_text
                    );
                  },
                  onAction(api: any, details: any) {
                    let margin_numbers = api.getData().marging.split(/\s+/); // Split the string by one or more spaces
                    let padding_numbers = api.getData().padding.split(/\s+/); // Split the string by one or more spaces
                    // Add "px" after each number
                    const margin_px = margin_numbers
                      .map((number: number) => number + "px")
                      .join(" ");
                    const padding_px = padding_numbers
                      .map((number: number) => number + "px")
                      .join(" ");
                    console.log("f", margin_px, padding_px);
                    var x = editor.selection.dom.create(
                      "button",
                      {
                        id: selected_node,
                        style:
                          "background-color: " +
                          api.getData().colorinput +
                          "; margin: " +
                          margin_px +
                          "; padding: " +
                          padding_px +
                          ";color :" +
                          api.getData().textcolor,
                        class: "mceNonEditable",
                        onclick:
                          "window.open('" +
                          api.getData().url_input +
                          "', '_blank');",
                      },

                      api.getData().button_text
                    );
                    api.setData({
                      iframe:
                        "<!DOCTYPE html>" +
                        "<html>" +
                        "<head></head>" +
                        '<body style="display:flex;justify-content-center;">' +
                        x.outerHTML +
                        "</body>" +
                        "</html>",
                    });
                  },
                  onSubmit(api: any) {
                    let margin_numbers = api.getData().marging.split(/\s+/); // Split the string by one or more spaces
                    let padding_numbers = api.getData().padding.split(/\s+/); // Split the string by one or more spaces
                    const margin_px = margin_numbers
                      .map((number: number) => number + "px")
                      .join(" ");
                    const padding_px = padding_numbers
                      .map((number: number) => number + "px")
                      .join(" ");
                    var x = editor.selection.dom.create(
                      "button",
                      {
                        id: selected_node,
                        style:
                          "background-color: " +
                          api.getData().colorinput +
                          "; margin: " +
                          margin_px +
                          "; padding: " +
                          padding_px +
                          ";color :" +
                          api.getData().textcolor,
                        class: "mceNonEditable",
                        onclick:
                          "window.open('" +
                          api.getData().url_input +
                          "', '_blank');",
                      },

                      api.getData().button_text
                    );
                    // var a = editor.selection.dom.createHTML("button", {
                    //   id: selected_node,
                    //   style:
                    //     "background-color: " +
                    //     api.getData().colorinput +
                    //     "; margin: " +
                    //     margin_px +
                    //     "; padding: " +
                    //     padding_px +
                    //     ";color :" +
                    //     api.getData().textcolor,
                    //   class: "mceNonEditable",
                    //   onclick:"window.open('" + api.getData().url_input + "', '_blank');"
                    // },
                    // api.getData().button_text);
                    // console.log(
                    //   editor.selection.dom.addStyle("margin:50px 50px")
                    // );

                    console.log(x);
                    //console.log(a);
                    editor.selection.setContent(x.outerHTML, {
                      format: "html",
                    });
                    api.setData({
                      iframe:
                        "<!DOCTYPE html>" +
                        "<html>" +
                        "<head></head>" +
                        '<body style="display:flex;justify-content:center;">' +
                        x.outerHTML +
                        "</body>" +
                        "</html>",
                    });
                    //api.close();

                    //  var el=editor.dom.create("button", {}, api.getData().button_text);
                    //   ediotr

                    // console.log(editor.selection.getNode());
                    // editor.selection.setContent("<button>hello</button>", {
                    //   format: "html",
                    // });
                    // x.attr('id', 'houssem');
                    // console.log(x);
                    // const button: HTMLButtonElement =
                    //   document.createElement("button");
                    // button.innerText = api.getData().button_text;
                    // button.style.backgroundColor = api.getData().colorinput;
                    // console.log(button);
                    // api.setData({
                    //   iframe: button.outerHTML,
                    // });
                    //api.close();
                  },
                });
              }
            });
            //end select
            editor.ui.registry.addIcon("remove-formatting", clearformaticon);
            editor.ui.registry.addMenuButton("mybutton", {
              text: "Personalization",

              fetch: (callback) => {
                const items: any = [
                  {
                    type: "menuitem",
                    text: "FirstName",
                    onAction: () => editor.insertContent("{{FirstName}}"),
                  },
                  {
                    type: "menuitem",
                    text: "LastName",
                    onAction: () => editor.insertContent("{{LastName}}"),
                  },
                ];
                callback(items);
              },
            });

            //add button
            editor.ui.registry.addButton("add", {
              text: "addbutton",

              onAction: () => {
                editor.insertContent(addbuttons(), { format: "html" });
              },
            });
            editor.ui.registry.addButton("addshopbutton", {
              text: "upload image",

              onAction: () => {
                editor.windowManager.open({
                  title: "Upload an image",
                  // url: "Dialogcontent.html",
                  size: "normal",
                  body: {
                    type: "panel",
                    items: [
                      {
                        type: "urlinput", // component type
                        name: "ua", // identifier
                        filetype: "image", // restrict file types to image types
                        label: "Source", // text for component label
                        enabled: true, // enabled state
                      },
                      {
                        type: "input", // component type
                        name: "url_input", // identifier
                        inputMode: "url",
                        label: "URL", // text for the label
                        placeholder: "http://images/image.jpg", // placeholder text for the input

                        maximized: true, // grow width to take as much space as possible
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
                  onClose: () => {
                    da = "";
                  },
                  onSubmit: (dialogApi: any) => {
                    console.log(dialogApi.getData());
                    console.log(dialogApi.getData().url_input);
                    if (da != "" && dialogApi.getData().url_input != "") {
                      toast.error("You can't use two inputs at once", {
                        position: "top-left",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,

                        theme: "light",
                      });
                    } else if (
                      dialogApi.getData().url_input == "" &&
                      da == ""
                    ) {
                      toast.error("none of those fields are filled", {
                        position: "top-left",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,

                        theme: "light",
                      });
                    } else if (dialogApi.getData().url_input != "") {
                      editor.insertContent(
                        addit(dialogApi.getData().url_input)
                      );
                      dialogApi.close();
                    } else if (da != "") {
                      editor.insertContent(addit(da));
                      dialogApi.close();
                    } else {
                      toast.error("Fields are empty", {
                        position: "top-left",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,

                        theme: "light",
                      });
                    }

                    //editor.insertContent('<img src="' + da + '" alt="aze" />');

                    //dialogApi.close();
                    // editor.insertContent(
                    //   addit(dialogApi.getData().url_input)
                    // );
                    // dialogApi.close()
                  },
                  onChange(api: any, details: any) {
                    //  editor.insertContent(api.getData().url_input_drop[0].name);
                    // editor.insertContent(
                    //   addit(api.getData().url_input_drop[0])
                    console.log("changed");
                    //);
                  },
                });
              },
            });

            editor.ui.registry.addButton("addcolor", {
              text: "add image +text ",

              onAction: () => {
                editor.windowManager.open({
                  title: "add image +text ",
                  body: {
                    type: "panel",

                    items: [
                      {
                        type: "urlinput", // component type
                        name: "backgroung image", // identifier
                        filetype: "image", // restrict file types to image types
                        label: "backgroung image", // text for component label
                        enabled: true, // enabled state
                      },
                      {
                        type: "input", // component type
                        name: "Text",
                        label: "Button URL",
                        //placeholder: "please type url source here",
                        enabled: true,
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
                  onChange(api: any, details: any) {
                    console.log(api.getData());
                  },
                });
              },
            });
          },

          toolbar:
            "  undo redo  |blocks fontsize   fontfamily| bold italic underline strikethrough | alignleft aligncenter alignright alignjustify   | outdent indent |  numlist bullist | forecolor backcolor removeformat  |  emoticons | fullscreen  preview   |    image     | ltr rtl |  mybutton add addshopbutton addcolor dropzone",
          toolbar_sticky: true,
          menubar: false,
          language: "fr_FR",
          autosave_ask_before_unload: true,

          //file_pciker
          file_picker_types: "image",

          file_picker_callback(callback, value, meta: any) {
            const isImage = (file: File) => {
              // List of accepted MIME types for images
              const acceptedMimeTypes = [
                "image/jpeg",
                "image/png",
                "image/gif",
                "image/webp",
              ];

              return acceptedMimeTypes.includes(file.type);
            };

            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/jpeg, image/png";

            input.onchange = (event: any) => {
              // console.log(event.target?.files[0]);
              const file = event.target?.files[0];

              const reader = new FileReader();
              reader.onload = (e: any) => {
                const imageUrl = e.target.result;

                if (isImage(file)) {
                  da = imageUrl;
                  callback(file.name, {
                    alt: file.name,
                  });
                } else {
                  toast.error("The File is uploaded is not an image", {
                    position: "top-left",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,

                    theme: "light",
                  });
                }
                // Insert the image into the TinyMCE editor
              };
              reader.readAsDataURL(file);

              // You can do further processing with the file here
            };
            input.click();
          },

          ///
          //paste_block_drop: true,

          automatic_uploads: true,
          image_advtab: true,
          image_title: true,
          // branding:false,
          popup_css: "./aze.css",
          //images_upload_base_path: "/images",
          // paste_preprocess: (plugin, args: any) => {
          //   args.content = "";
          // },
          //font size values
          font_size_formats:
            "8pt 9pt 10pt 11pt 12pt 14pt 18pt 24pt 30pt 36pt 48pt 60pt 72pt 96pt",

          //image_advtab: true,

          //predfeined link list
          link_list: [
            { title: "My page 1", value: "https://www.tiny.cloud" },
            { title: "My page 2", value: "http://www.moxiecode.com" },
          ],

          importcss_append: true,
          height: 600,
          // min_height: 500,
          // max_height: 600,
          image_caption: true,

          quickbars_selection_toolbar:
            "bold italic | quicklink fontsize forecolor fontfamily removeformat ",
          //any html added with this class it cannot be changed in the editor
          noneditable_noneditable_class: "mceNonEditable",
          toolbar_mode: "sliding",

          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        onEditorChange={(content, editor: any) => {
          setcont(content);
          // console.log(editor.ui.registry.getAll().buttons);
        }}
      />
      <button
        id="save_button"
        className="button-9"
        onClick={() => {
          //window.output = cont;
          //@ts-ignore
          handlesavebutton(cont);
        }}
      >
        Save
      </button>

      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{ zIndex: 999999999999999 }}
      />
    </div>
  );
};

export default App;
