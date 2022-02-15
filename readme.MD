<div align="center">

# **Atomic Maker**

### **CLI to generate atomic design scaffolding & boilerplate.**

</div>

<br />

![Atomic Design Scaffolding](https://i.postimg.cc/8GyWV55G/Screenshot-from-2022-02-14-23-12-44.png)

<br />

For my React-based projects, I really like the folder architecture that _**Atomic Design**_ proposes. But since it's a real a pain in the ass making file after file in folder inside folder, I developed this simple CLI to do it for me.

<br />

## **Available on two main releases:**

#### Source Code:
- Designed primarily for GNU/Linux users. Installable via Shell script.

- Also, you can manually clone the `index.js` wherever you want, rename it and create and alias on your terminal's .rc file. This option is recommendend for advanced users &&|| [linux boomers](https://i.redd.it/l92dpfbcbx351.png).

#### npm Package:
- Designed primarily for Windows users, or for those who want to use it on a project-level basis. Or for [_soydevs_](https://www.urbandictionary.com/define.php?term=Soydev).

<br />

# Installation & Usage

- #### **From npm Package:**
    - Run `npm i -D atomic-maker` on your project.
    - Afterwards, run `atomic-maker` or create a script for it.
    - OR simply run `npx atomic-maker`



You will be prompted to name and select the type of component you want. Pretty straight-forward process. For more info, refer to branch _npm-pkg_

<br />

- ### **From Source Code:**
    - Clone the repo
    - Execute the `.js` file with Node (or create an alias)

You can insert a flag corresponding to the type of component you want (refer to _**flags**_) and, afterwards, name it. This way, you can generate the component with a one-line command. _This method is **not** available on the npm package._

<br />

- ### **From shell script:**
    - Run:

        ```curl -o- https://raw.githubusercontent.com/Irungaray/atomic-maker/main/script.sh | bash```

It `CURLs` the raw `Js` to a `~/bin` folder, then creates the alias `atomize` on your `.zshrc`.

Once there, execute the alias anywhere on your terminal to generate the folder structure and files. _Flags are available in this version. I'm still testing the install script, so this method is currently **not** recommended._

<br />

### **Flags:**
Let's say we have an alias, `alias atomic-maker="node ~/bin/atomic-maker.js"`.
Then, we can run:
```
atomic-maker -a Component // Creates an atom named Component
atomic-maker -m Component // Creates a molecule named Component
atomic-maker -o Component // Creates an organism named Component
```

Keep in mind this method is _**not**_ available if you install it as an npm package.

# Forks & Modification

This software is under GPLv3 license, so, modifications, pull requests and forks are encouraged and appreciated. Unless you are a [_FAGMAN_](https://www.reddit.com/r/wallstreetbets/comments/8pvu4d/now_that_microsoft_is_big_again_faang_is_now/).

You can easily modify the path and boilerplate code the component is created with on lines 28-45.

_**Exempli gratia,**_ if you want your `.jsx` to be created with PropTypes import and declaration, you can modify the object which contains the `.jsx` string from:

```
{
    filename: `${basename}.jsx`,
    content: `import './${name}.css'\n\nconst ${name} = () => {\n    return (\n        <></>\n    )\n}\n\nexport { ${name} }\n`,
}
```
To:

```
{
    filename: `${basename}.jsx`,
    content: `import PropTypes from 'prop-types'\n\n\import './${name}.css'\n\nconst ${name} = () => {\n    return (\n        <></>\n    )\n}\n\n${name}.PropTypes = {\n\n\}\n\nexport { ${name} }\n`,
},
```

`\n` is for break lines.

## **Cooming soon:**
- [x] *npm package* for Windows users
- [ ] *shell script* for Linux Users (on development)
- [ ] **Code of Conduct**

