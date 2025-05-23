//@ts-nocheck
import fs from "fs";
import path from "path";
import { u } from "unist-builder";
import { visit } from "unist-util-visit";

export function rehypeComponent() {
  return async (tree) => {
    visit(tree, (node) => {
      // src prop overrides both name and fileName.
      const { value } = getNodeAttributeByName(node, "src") || {};

      {
        /* 
      if (node.name === "ComponentSource") {
        const name = getNodeAttributeByName(node, "name")?.value 
        const fileName = getNodeAttributeByName(node, "fileName")?.value

        if (!name && !srcPath) {
          return null
        }

        try {
          for (const style of styles) {
            let src

            if (srcPath) {
              src = srcPath
            } else {
              const component = Index[style.name][name]
              src = fileName
                ? component.files.find((file) => {
                    return (
                      file.endsWith(`${fileName}.tsx`) ||
                      file.endsWith(`${fileName}.ts`)
                    )
                  }) || component.files[0]
                : component.files[0]
            }

            // Read the source file.
            const filePath = path.join(process.cwd(), src)
            let source = fs.readFileSync(filePath, "utf8")

            // Replace imports.
            // TODO: Use @swc/core and a visitor to replace this.
            // For now a simple regex should do.
            source = source.replaceAll(
              `@/registry/${style.name}/`,
              "@/components/"
            )
            source = source.replaceAll("export default", "export")

            // Add code as children so that rehype can take over at build time.
            node.children?.push(
              u("element", {
                tagName: "pre",
                properties: {
                  __src__: src,
                  __style__: style.name,
                },
                attributes: [
                  {
                    name: "styleName",
                    type: "mdxJsxAttribute",
                    value: style.name,
                  },
                ],
                children: [
                  u("element", {
                    tagName: "code",
                    properties: {
                      className: ["language-tsx"],
                    },
                    children: [
                      {
                        type: "text",
                        value: source,
                      },
                    ],
                  }),
                ],
              })
            )
          }
        } catch (error) {
          console.error(error)
        }
      }
      */
      }

      {
        /* 

      if (node.name === "ComponentPreview") {
        const name = getNodeAttributeByName(node, "name")?.value

        if (!name) {
          return null
        }

        try {
          for (const style of styles) {
            const component = Index[style.name][name]
            const src = component.files[0]

            // Read the source file.
            const filePath = path.join(process.cwd(), src)
            let source = fs.readFileSync(filePath, "utf8")

            // Replace imports.
            // TODO: Use @swc/core and a visitor to replace this.
            // For now a simple regex should do.
            source = source.replaceAll(
              `@/registry/${style.name}/`,
              "@/components/"
            )
            source = source.replaceAll("export default", "export")

            // Add code as children so that rehype can take over at build time.
            node.children?.push(
              u("element", {
                tagName: "pre",
                properties: {
                  __src__: src,
                },
                children: [
                  u("element", {
                    tagName: "code",
                    properties: {
                      className: ["language-tsx"],
                    },
                    children: [
                      {
                        type: "text",
                        value: source,
                      },
                    ],
                  }),
                ],
              })
            )
          }
        } catch (error) {
          console.error(error)
        }
      }
    */
      }
      // if (node.name === "ComponentExample") {
      //   const source = getComponentSourceFileContent(node)
      //   if (!source) {
      //     return
      //   }

      //   // Replace the Example component with a pre element.
      //   node.children?.push(
      //     u("element", {
      //       tagName: "pre",
      //       properties: {
      //         __src__: src,
      //       },
      //       children: [
      //         u("element", {
      //           tagName: "code",
      //           properties: {
      //             className: ["language-tsx"],
      //           },
      //           children: [
      //             {
      //               type: "text",
      //               value: source,
      //             },
      //           ],
      //         }),
      //       ],
      //     })
      //   )

      //   const extractClassname = getNodeAttributeByName(
      //     node,
      //     "extractClassname"
      //   )
      //   if (
      //     extractClassname &&
      //     typeof extractClassname.value !== "undefined" &&
      //     extractClassname.value !== "false"
      //   ) {
      //     // Extract className from string
      //     // TODO: Use @swc/core and a visitor to extract this.
      //     // For now, a simple regex should do.
      //     const values = source.match(/className="(.*)"/)
      //     const className = values ? values[1] : ""

      //     // Add the className as a jsx prop so we can pass it to the copy button.
      //     node.attributes?.push({
      //       name: "extractedClassNames",
      //       type: "mdxJsxAttribute",
      //       value: className,
      //     })

      //     // Add a pre element with the className only.
      //     node.children?.push(
      //       u("element", {
      //         tagName: "pre",
      //         properties: {},
      //         children: [
      //           u("element", {
      //             tagName: "code",
      //             properties: {
      //               className: ["language-tsx"],
      //             },
      //             children: [
      //               {
      //                 type: "text",
      //                 value: className,
      //               },
      //             ],
      //           }),
      //         ],
      //       })
      //     )
      //   }
      // }

      /*
      if (node.name === "ComponentPreview") {
        const source = getComponentSourceFileContent(node);
        console.log("ComponentPreview node found!");

        const javascriptCode = node.attributes?.find(attr => attr.name === "javascriptCode")?.value;
        const typescriptCode = node.attributes?.find(attr => attr.name === "typescriptCode")?.value;



        if (!source) {
          return;
        }

        // Replace the Source component with a pre element.
        node.children?.push(
          u("element", {
            tagName: "pre",
            properties: {
              __src__: src,
            },
            children: [
              u("element", {
                tagName: "code",
                properties: {
                  className: ["language-tsx"],
                },
                children: [
                  {
                    type: "text",
                    value: source,
                  },
                ],
              }),
            ],
          })
        );
      }

      */
    });
  };
}

function getNodeAttributeByName(node, name) {
  return node.attributes?.find((attribute) => attribute.name === name);
}

function getComponentSourceFileContent(node) {
  const src = getNodeAttributeByName(node, "src")?.value;

  if (!src) {
    return null;
  }

  // Read the source file.
  const filePath = path.join(process.cwd(), src);
  const source = fs.readFileSync(filePath, "utf8");

  return source;
}
