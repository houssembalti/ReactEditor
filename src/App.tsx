import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { editorobject } from "./Editor_output";
import "./editor.css";
import { addbuttondialog, dialogconfig, dialogconfig_2 } from "./Customdialog";
import {
  addbuttons,
  addbuttonwithtext,
  addit,
  edittedbutton,
} from "./addButton";
import ReactDOMServer from "react-dom/server";

import { clearformaticon } from "./utils";
//declare let window: editorobject;
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./customdialog.css";
import Custom from "./Custom";

const App = (props: { variable: string }) => {
  const [cont, setcont] = useState(props.variable);
  const [image_file, setimagefile] = useState<string>();
  const [button_view, setbutton_view] = useState<any>();

  const button_ref = useRef(null);
  let da: string = "";
  let selected_node: string;
  let bua: any;
  const editorRef: any = useRef(null);
  useEffect(() => {
    const handleButtonClick = (event: any) => {
      event.preventDefault(); // Prevent the default action (e.g., form submission or URL navigation)
      // You can add custom handling here, such as displaying a message
    };

    const button: HTMLElement | null = document.getElementById("btn");
    button?.addEventListener("click", handleButtonClick);

    return () => {
      button?.removeEventListener("click", handleButtonClick);
    };
  }, []);
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
            editor.on("init", function () {});
            //   editor.on('NodeChange', function (e) {
            //     if (e.element.nodeName === 'IMG' ) {

            //         var parentDiv = editor.dom.getParent(e.element, 'div');
            //         if (parentDiv) {
            //             editor.dom.remove(parentDiv);
            //         }
            //     }
            // });

            editor.on("change", function () {
              if (
                editor.dom.get("image_change")?.offsetWidth != 0 &&
                editor.dom.get("image_change")?.offsetHeight != 0
              ) {
                console.log("sayra");

                if (editor.dom.get("text_change_top_left")?.style.top) {
                  editor.dom.get("text_change_top_left")!.style.top =
                    editor.dom.get("image_change")!.offsetHeight / 2 + "px";
                }

                //editor.dom.get("text_change_top_left")?.style.top = h;
                editor.dom.get("text_change_top_left")!.style.left =
                  editor.dom.get("image_change")!.offsetLeft + "px";

                const image = editor.dom.get("image_change") as HTMLElement;

                // Calculate the right offset
                const textRight =
                //@ts-ignore
                  image.offsetParent!.offsetWidth -
                  (editor.dom.get("image_change")!.offsetLeft +
                    editor.dom.get("image_change")!.offsetWidth);
                console.log(textRight);
                // Adjust the 'left' property of the text element
                editor.dom.get("text_change_top_left")!.style.right =
                  textRight + "px";
              }
            });
            editor.on("dblclick", function (e) {
              if (editor.selection.getNode().nodeName == "IMG") {
                var s: any = ReactDOMServer.renderToString(<Custom />);
                editor.windowManager.open({
                  title: "Upload Image",
                
            
                  body: {
                    type: "panel",
                    items: [
                      {
                        type: "htmlpanel", // component type
                        html: s, // HTML string of your React component
                      },
                    ],
                  },

                  onAction: function (action, data) {
                    editor.windowManager.close();
                  },
                });
              }
            });
            editor.on("click", function (e: any) {
              if (editor.selection.getNode().nodeName == "BUTTON") {
                // e.preventDefault();
                console.log("f", editor.selection.getNode());
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
                        type: "grid",
                        columns: 2,
                        items: [
                          {
                            type: "listbox", // change component type to listbox
                            name: "fontSize",
                            label: "Font Size",

                            items: [
                              { value: "12px", text: "12px" },
                              { value: "14px", text: "14px" },
                              { value: "16px", text: "16px" },
                              { value: "18px", text: "18px" },
                              { value: "20px", text: "20px" },
                              { value: "22px", text: "22px" },
                              { value: "24px", text: "24px" },
                              { value: "26px", text: "26px" },
                              { value: "28px", text: "28px" },
                              { value: "30px", text: "30px" },
                              // Add more font sizes as per your requirement
                            ],
                          },
                          {
                            type: "listbox",
                            name: "fontFamily",
                            label: "Font Family",

                            items: [
                              {
                                text: "Andale Mono",
                                value: "Andale Mono, monospace",
                              },
                              {
                                text: "Arial",
                                value: "Arial, Helvetica, sans-serif",
                              },
                              {
                                text: "Arial Black",
                                value: "Arial Black, sans-serif",
                              },
                              {
                                text: "Book Antiqua",
                                value: "Book Antiqua, Palatino, serif",
                              },
                              {
                                text: "Comic Sans MS",
                                value: "Comic Sans MS, sans-serif",
                              },
                              {
                                text: "Courier New",
                                value: "Courier New, Courier, monospace",
                              },
                              { text: "Georgia", value: "Georgia, serif" },
                              {
                                text: "Helvetica",
                                value: "Helvetica, sans-serif",
                              },
                              {
                                text: "Impact",
                                value: "Impact, Charcoal, sans-serif",
                              },
                              {
                                text: "Tahoma",
                                value: "Tahoma, Geneva, sans-serif",
                              },
                              {
                                text: "Terminal",
                                value: "Terminal, monospace",
                              },
                              {
                                text: "Times New Roman",
                                value: "Times New Roman, Times, serif",
                              },
                              {
                                text: "Trebuchet MS",
                                value: "Trebuchet MS, sans-serif",
                              },
                              { text: "Verdana", value: "Verdana, sans-serif" },
                              {
                                text: "Webdings",
                                value: "Webdings, sans-serif",
                              },
                              {
                                text: "Wingdings",
                                value: "Wingdings, sans-serif",
                              },
                              // Add more font families as per your requirement
                            ],
                          },
                        ],
                      },

                      {
                        type: "grid", // component type
                        columns: 3, // number of columns
                        items: [
                          {
                            type: "input", // component type
                            name: "margin",
                            label: "Margin",
                          },
                          {
                            type: "input", // component type
                            name: "padding",
                            label: "Padding",
                          },
                          {
                            type: "input", // component type
                            name: "borderRadius",
                            label: "Border Radius",
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
                    margin:
                      editor.selection.getNode().style.margin &&
                      editor.selection.getNode().style.margin !== "0px"
                        ? editor.selection
                            .getNode()
                            .style.margin.replaceAll("px", "")
                        : "0 0",
                    padding:
                      editor.selection.getNode().style.padding &&
                      editor.selection.getNode().style.padding !== "0px"
                        ? editor.selection
                            .getNode()
                            .style.padding.replaceAll("px", "")
                        : "0 0",

                    textcolor: editor.selection.getNode().style.color
                      ? editor.selection.getNode().style.color
                      : "#000000",
                    url_input:
                      editor.selection.getNode().getAttribute("data-url") || "",
                    // padding:document.getElementById("houssem")!.style.padding,
                    fontSize: editor.selection.getNode().style.fontSize
                      ? editor.selection.getNode().style.fontSize
                      : "12px",
                    fontFamily: editor.selection.getNode().style.fontFamily
                      ? editor.selection.getNode().style.fontFamily
                      : "Arial, Helvetica, sans-serif",
                    borderRadius: editor.selection.getNode().style.borderRadius
                      ? editor.selection
                          .getNode()
                          .style.borderRadius.replace("px", "")
                      : "0",
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
                  },
                  onAction(api: any, details: any) {
                    let margin_numbers = api.getData().margin.split(/\s+/); // Split the string by one or more spaces
                    let padding_numbers = api.getData().padding.split(/\s+/); // Split the string by one or more spaces
                    // Split the string by one or more spaces
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
                          api.getData().textcolor +
                          "; font-family: " +
                          api.getData().fontFamily +
                          "; font-size: " +
                          api.getData().fontSize +
                          "; border-radius: " +
                          api.getData().borderRadius +
                          "px",
                        class: "mceNonEditable",
                        "data-url": api.getData().url_input,
                      },

                      api.getData().button_text
                    );
                    bua = x.outerHTML.toString();
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
                    let margin_numbers = api.getData().margin.split(/\s+/); // Split the string by one or more spaces
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
                          api.getData().textcolor +
                          "; font-family: " +
                          api.getData().fontFamily +
                          "; font-size: " +
                          api.getData().fontSize +
                          "; border-radius: " +
                          api.getData().borderRadius +
                          "px",
                        class: "mceNonEditable",
                        "data-url": api.getData().url_input,
                      },

                      api.getData().button_text
                    );
                    api.close();
                    editor.selection.setNode(x);
                    editor.insertContent("\u00A0\u00A0\u00A0\u00A0");
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
                    var contentInserted = false;
                    if (da != "" && dialogApi.getData().url_input != "") {
                      editor.notificationManager.open({
                        text: "You can't use two inputs at once",
                        type: "info",
                        timeout: 2000,
                      });
                    } else if (
                      dialogApi.getData().url_input == "" &&
                      da == ""
                    ) {
                      editor.notificationManager.open({
                        text: "Fields are empty",
                        type: "error",
                        timeout: 2000,
                      });
                    } else if (dialogApi.getData().url_input != "") {
                      contentInserted = true;
                      console.log(contentInserted);
                      setTimeout(() => {
                        dialogApi.close();
                      }, 100);
                      editor.insertContent(
                        addit(dialogApi.getData().url_input)
                      );
                    } else if (da != "") {
                      setTimeout(() => {
                        dialogApi.close();
                      }, 100);
                      editor.insertContent(addit(da), () => {
                        console.log("this is a test");
                      });
                      dialogApi.close();
                    } else {
                    }
                    console.log("lekhra", contentInserted);
                  },
                  onChange(api: any, details: any) {
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
                      {
                        type: "selectbox",
                        name: "textAlign",
                        label: "Text Alignment",
                        items: [
                          { value: "left", text: "Left" },
                          { value: "center", text: "Center" },
                          { value: "right", text: "Right" },
                        ],
                        enabled: true,
                      },
                      {
                        type: "grid",
                        columns: 2,
                        items: [
                          {
                            type: "listbox", // change component type to listbox
                            name: "fontSize",
                            label: "Font Size",

                            items: [
                              { value: "12px", text: "12px" },
                              { value: "14px", text: "14px" },
                              { value: "16px", text: "16px" },
                              { value: "18px", text: "18px" },
                              { value: "20px", text: "20px" },
                              { value: "22px", text: "22px" },
                              { value: "24px", text: "24px" },
                              { value: "26px", text: "26px" },
                              { value: "28px", text: "28px" },
                              { value: "30px", text: "30px" },
                              // Add more font sizes as per your requirement
                            ],
                          },
                          {
                            type: "listbox",
                            name: "fontFamily",
                            label: "Font Family",

                            items: [
                              {
                                text: "Andale Mono",
                                value: "Andale Mono, monospace",
                              },
                              {
                                text: "Arial",
                                value: "Arial, Helvetica, sans-serif",
                              },
                              {
                                text: "Arial Black",
                                value: "Arial Black, sans-serif",
                              },
                              {
                                text: "Book Antiqua",
                                value: "Book Antiqua, Palatino, serif",
                              },
                              {
                                text: "Comic Sans MS",
                                value: "Comic Sans MS, sans-serif",
                              },
                              {
                                text: "Courier New",
                                value: "Courier New, Courier, monospace",
                              },
                              { text: "Georgia", value: "Georgia, serif" },
                              {
                                text: "Helvetica",
                                value: "Helvetica, sans-serif",
                              },
                              {
                                text: "Impact",
                                value: "Impact, Charcoal, sans-serif",
                              },
                              {
                                text: "Tahoma",
                                value: "Tahoma, Geneva, sans-serif",
                              },
                              {
                                text: "Terminal",
                                value: "Terminal, monospace",
                              },
                              {
                                text: "Times New Roman",
                                value: "Times New Roman, Times, serif",
                              },
                              {
                                text: "Trebuchet MS",
                                value: "Trebuchet MS, sans-serif",
                              },
                              { text: "Verdana", value: "Verdana, sans-serif" },
                              {
                                text: "Webdings",
                                value: "Webdings, sans-serif",
                              },
                              {
                                text: "Wingdings",
                                value: "Wingdings, sans-serif",
                              },
                              // Add more font families as per your requirement
                            ],
                          },
                        ],
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
                    //console.log(api.getData());
                  },
                  onSubmit: (dialogApi: any) => {
                    console.log(dialogApi.getData());
                    console.log(dialogApi.getData().url_input);
                    console.log(dialogApi.getData().textAlign);
                    if (da != "" && dialogApi.getData().Text != "") {
                      editor.insertContent(
                        addbuttonwithtext(
                          da,
                          dialogApi.getData().Text,
                          dialogApi.getData().fontFamily,
                          dialogApi.getData().fontSize,
                          dialogApi.getData().textcolor,
                          dialogApi.getData().colorinput,
                          dialogApi.getData().textAlign
                        )
                      );
                      dialogApi.close();
                    } else {
                      editor.notificationManager.open({
                        text: "Text or image are empty",
                        type: "info",
                        timeout: 2000,
                      });
                    }

                    //editor.insertContent('<img src="' + da + '" alt="aze" />');

                    //dialogApi.close();
                    // editor.insertContent(
                    //   addit(dialogApi.getData().url_input)
                    // );
                    // dialogApi.close()
                  },
                });
              },
            });
          },

          toolbar:
            "  undo redo  |blocks fontsize   fontfamily| bold italic underline strikethrough | alignleft aligncenter alignright alignjustify   | outdent indent |  numlist bullist | forecolor backcolor removeformat  |  emoticons | fullscreen  preview   |    image     | ltr rtl |  mybutton add addshopbutton addcolor dropzone LineHeight",
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
          extended_valid_elements: "button[class|style|id]",
          //valid_elements: "a[href]",
          link_assume_external_targets: true,

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
      <button
        onClick={() => {
          editorRef.current.destroy();
        }}
      >
        aezaze
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
