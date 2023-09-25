import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { editorobject } from "./Editor_output";

declare let window: editorobject;
const App = (props: { variable: string }) => {
  const [cont, setcont] = useState(props.variable);
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
          },

          toolbar:
            "  undo redo  |blocks fontsize   fontfamily| bold italic underline strikethrough | alignleft aligncenter alignright alignjustify   | outdent indent |  numlist bullist | forecolor backcolor removeformat  |  emoticons | fullscreen  preview   |    image     | ltr rtl |  mybutton ",
          toolbar_sticky: true,
          menubar: false,
          language: "fr_FR",
          autosave_ask_before_unload: true,
          paste_block_drop: true,
          paste_preprocess: (plugin, args: any) => {
            args.content = "";
          },
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
         
        }}
      />
      <button
        id="save_button"
        onClick={() => {
          window.output = cont;
          //@ts-ignore
          handlesavebutton(cont);
        }}
      >
        Save
      </button>
    </div>
  );
};

export default App;
