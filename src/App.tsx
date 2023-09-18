import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { editorobject } from "./Editor_output";
//import tinymce from "tinymce/tinymce";

declare let window: editorobject;

const App = (props: { variable: string }) => {
  const [cont, setcont] = useState(props.variable);
  const editorRef: any = useRef(null);

  // //plugin
  // tinymce.PluginManager.add("pluginId", function (editor, url) {
  //   // add plugin code here

  //   editor.ui.registry.addButton("Button", {
  //     text: "My button",
  //     onAction: () => {
  //       console.log("Butston clicked");
  //     },
  //   });
  //   return {
  //     name: "MyPlugin",
  //     //url: "https://mydocs.com/myplugin",
  //   };
  // });
  return (
    <div>
      <Editor
        apiKey="4ihibtgu02wtpfihm92czieefagek14nmfmmqfvj4bwjgaxz"
        onInit={(evt, editor) => {
          editor.ui.registry.addButton("Button", {
            text: "My button",
            onAction: () => {
              console.log("clicked");
            },
          });
          // editor.ui.registry.addButton("Buttoncustom", {
          //   text: "My button",
          //   onAction: () => {
          //     console.log("Butston clicked");
          //   },
          // });

          editorRef.current = editor;
        }}
        initialValue={props.variable}
        //initialValue="<h1><span style='color: rgb(45, 194, 107);'>azeazeazeaze</span></h1>"

        init={{
          // external_plugins: {
          //   perso: "/plugin.min.js",
          // },
          plugins:
            " fontsize  preview  importcss searchreplace autolink autosave save directionality  visualblocks visualchars  image link media  codesample table charmap  pagebreak nonbreaking anchor  insertdatetime advlist lists wordcount    help charmap quickbars emoticons",
          setup: function (editor) {
            //
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
            // })
          },
          imagetools_cors_hosts: ["picsum.photos"],

          toolbar:
            "  undo redo  |fontsize  fontfamily| bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat  |  emoticons | fullscreen  preview   | insertfile image media template link   | ltr rtl |  mybutton imagetools",
          toolbar_sticky: true,
          menubar: false,
          // branding: false,
          language: "fr_FR",
          autosave_ask_before_unload: true,

          autosave_interval: "30s",
          autosave_prefix: "{path}{query}-{id}-",
          autosave_restore_when_empty: false,
          autosave_retention: "2m",
          image_advtab: true,
          link_list: [
            { title: "My page 1", value: "https://www.tiny.cloud" },
            { title: "My page 2", value: "http://www.moxiecode.com" },
          ],
          image_list: [
            { title: "My page 1", value: "https://www.tiny.cloud" },
            { title: "My page 2", value: "http://www.moxiecode.com" },
          ],
          image_class_list: [
            { title: "None", value: "" },
            { title: "Some class", value: "class-name" },
          ],
          importcss_append: true,
          // file_picker_callback: function (callback, value, meta) {
          //   /* Provide file and text for the link dialog */
          //   if (meta["filetype"] === "file") {
          //     callback("https://www.google.com/logos/google.jpg", {
          //       text: "My text",
          //     });
          //   }

          //   /* Provide image and alt text for the image dialog */
          //   if (meta["filetype"] === "image") {
          //     callback("https://www.google.com/logos/google.jpg", {
          //       alt: "My alt text",
          //     });
          //   }

          //   /* Provide alternative source and posted for the media dialog */
          //   if (meta["filetype"] === "media") {
          //     callback("movie.mp4", {
          //       source2: "alt.ogg",
          //       poster: "https://www.google.com/logos/google.jpg",
          //     });
          //   }
          // },

          // ],
          // template_cdate_format: "[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",
          // template_mdate_format: "[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",
          height: 600,
          // min_height: 500,
          // max_height: 600,

          image_caption: true,
          quickbars_selection_toolbar:
            "bold italic | quicklink h2 h3 blockquote quickimage quicktabl  ",
          noneditable_noneditable_class: "mceNonEditable",
          toolbar_mode: "sliding",
          contextmenu: "link image imagetools table",
          //skin: useDarkMode ? "oxide-dark" : "oxide",
          //content_css: useDarkMode ? "dark" : "default",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        onEditorChange={(content, editor) => {
          //console.log(Styles);
          //const text = content.replace(/<[^>]+>/g, "");
          // console.log('con',content);
          //console.log(content);

          // output = content;
          setcont(content);
          //  console.log(Styles.parse(content));
          // console.log(text);
        }}
      />
      <button
        id="save_button"
        onClick={() => {
          //console.log(cont);
          window.output = cont;
          //@ts-ignore
          handlesavebutton(cont);
          // console.log(window.output)
        }}
      >
        Save
      </button>
    </div>
  );
};

export default App;
