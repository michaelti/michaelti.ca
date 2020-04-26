---
title: Dark Mode Images with a Manual Toggle Switch 🌚
excerpt: >
    A rudimentary approach to dark mode images when you've also implemented a manual toggle switch to override the system <code>prefers-color-scheme</code> setting.
---

<!-- excerpt -->

For nighthawks like myself, the mainstream arrival of automatic light and dark themes has been nothing short of delightful.

With the `prefers-color-scheme` CSS media query now [supported by all major browsers](https://caniuse.com/#feat=prefers-color-scheme), it's easy to get going with automatic themes on your website or app.

Using the `<picture>` element and `media` attribute, it's also pretty simple to natively serve different images based on your users' colour preference:

```html
<picture>
    <source media="(prefers-color-scheme: light)" srcset="light version">
    <source media="(prefers-color-scheme: dark)" srcset="dark version">
    <img src="fallback" alt="" />
</picture>
```

But as [Rhys Lloyd points out](https://rhyslloyd.me/serve-dark-mode-images-natively/#inevitable-caveat), that falls short once you've added a manual switch for your themes using JavaScript – as I have in the footer of this website.

Nothing that can't be cured with a little extra JavaScript spice! 🌶


## The mission

Let's connect our `<picture>` elements that have light and dark sources to a script that manually switches between them, overriding the system setting. And let's do it without changing any of our existing markup from above.

## The (basic) solution



## The caveats



## The complete demo

<iframe height="400" style="width: 100%;" scrolling="no" title="Native Dark Mode images w/ manual switch " src="https://codepen.io/michaelti/embed/ExVjMPr?height=400&theme-id=default&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true" loading="lazy"></iframe>







<!-- Temporary code and pygments theme -->
<style>
div.highlighter-rouge {
    padding: 5px 15px;
    background-color: var(--color-background-well);
    overflow-x: scroll;
    border-radius: 2px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.15) inset;
}

.highlight { color: #f8f8f2 }
.highlight .c { color: #6272a4 } /* Comment */
.highlight .err { color: #f8f8f2 } /* Error */
.highlight .g { color: #f8f8f2 } /* Generic */
.highlight .k { color: #ff79c6 } /* Keyword */
.highlight .l { color: #f8f8f2 } /* Literal */
.highlight .n { color: #f8f8f2 } /* Name */
.highlight .o { color: #ff79c6 } /* Operator */
.highlight .x { color: #f8f8f2 } /* Other */
.highlight .p { color: #f8f8f2 } /* Punctuation */
.highlight .ch { color: #6272a4 } /* Comment.Hashbang */
.highlight .cm { color: #6272a4 } /* Comment.Multiline */
.highlight .cp { color: #ff79c6 } /* Comment.Preproc */
.highlight .cpf { color: #6272a4 } /* Comment.PreprocFile */
.highlight .c1 { color: #6272a4 } /* Comment.Single */
.highlight .cs { color: #6272a4 } /* Comment.Special */
.highlight .gd { color: #8b080b } /* Generic.Deleted */
.highlight .ge { color: #f8f8f2; text-decoration: underline } /* Generic.Emph */
.highlight .gr { color: #f8f8f2 } /* Generic.Error */
.highlight .gh { color: #f8f8f2; font-weight: bold } /* Generic.Heading */
.highlight .gi { color: #f8f8f2; font-weight: bold } /* Generic.Inserted */
.highlight .go { color: #44475a } /* Generic.Output */
.highlight .gp { color: #f8f8f2 } /* Generic.Prompt */
.highlight .gs { color: #f8f8f2 } /* Generic.Strong */
.highlight .gu { color: #f8f8f2; font-weight: bold } /* Generic.Subheading */
.highlight .gt { color: #f8f8f2 } /* Generic.Traceback */
.highlight .kc { color: #ff79c6 } /* Keyword.Constant */
.highlight .kd { color: #8be9fd; font-style: italic } /* Keyword.Declaration */
.highlight .kn { color: #ff79c6 } /* Keyword.Namespace */
.highlight .kp { color: #ff79c6 } /* Keyword.Pseudo */
.highlight .kr { color: #ff79c6 } /* Keyword.Reserved */
.highlight .kt { color: #8be9fd } /* Keyword.Type */
.highlight .ld { color: #f8f8f2 } /* Literal.Date */
.highlight .m { color: #bd93f9 } /* Literal.Number */
.highlight .s { color: #f1fa8c } /* Literal.String */
.highlight .na { color: #50fa7b } /* Name.Attribute */
.highlight .nb { color: #8be9fd; font-style: italic } /* Name.Builtin */
.highlight .nc { color: #50fa7b } /* Name.Class */
.highlight .no { color: #f8f8f2 } /* Name.Constant */
.highlight .nd { color: #f8f8f2 } /* Name.Decorator */
.highlight .ni { color: #f8f8f2 } /* Name.Entity */
.highlight .ne { color: #f8f8f2 } /* Name.Exception */
.highlight .nf { color: #50fa7b } /* Name.Function */
.highlight .nl { color: #8be9fd; font-style: italic } /* Name.Label */
.highlight .nn { color: #f8f8f2 } /* Name.Namespace */
.highlight .nx { color: #f8f8f2 } /* Name.Other */
.highlight .py { color: #f8f8f2 } /* Name.Property */
.highlight .nt { color: #ff79c6 } /* Name.Tag */
.highlight .nv { color: #8be9fd; font-style: italic } /* Name.Variable */
.highlight .ow { color: #ff79c6 } /* Operator.Word */
.highlight .w { color: #f8f8f2 } /* Text.Whitespace */
.highlight .mb { color: #bd93f9 } /* Literal.Number.Bin */
.highlight .mf { color: #bd93f9 } /* Literal.Number.Float */
.highlight .mh { color: #bd93f9 } /* Literal.Number.Hex */
.highlight .mi { color: #bd93f9 } /* Literal.Number.Integer */
.highlight .mo { color: #bd93f9 } /* Literal.Number.Oct */
.highlight .sa { color: #f1fa8c } /* Literal.String.Affix */
.highlight .sb { color: #f1fa8c } /* Literal.String.Backtick */
.highlight .sc { color: #f1fa8c } /* Literal.String.Char */
.highlight .dl { color: #f1fa8c } /* Literal.String.Delimiter */
.highlight .sd { color: #f1fa8c } /* Literal.String.Doc */
.highlight .s2 { color: #f1fa8c } /* Literal.String.Double */
.highlight .se { color: #f1fa8c } /* Literal.String.Escape */
.highlight .sh { color: #f1fa8c } /* Literal.String.Heredoc */
.highlight .si { color: #f1fa8c } /* Literal.String.Interpol */
.highlight .sx { color: #f1fa8c } /* Literal.String.Other */
.highlight .sr { color: #f1fa8c } /* Literal.String.Regex */
.highlight .s1 { color: #f1fa8c } /* Literal.String.Single */
.highlight .ss { color: #f1fa8c } /* Literal.String.Symbol */
.highlight .bp { color: #f8f8f2; font-style: italic } /* Name.Builtin.Pseudo */
.highlight .fm { color: #50fa7b } /* Name.Function.Magic */
.highlight .vc { color: #8be9fd; font-style: italic } /* Name.Variable.Class */
.highlight .vg { color: #8be9fd; font-style: italic } /* Name.Variable.Global */
.highlight .vi { color: #8be9fd; font-style: italic } /* Name.Variable.Instance */
.highlight .vm { color: #8be9fd; font-style: italic } /* Name.Variable.Magic */
.highlight .il { color: #bd93f9 } /* Literal.Number.Integer.Long */
</style>