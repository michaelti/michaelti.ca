---
title: Dark Mode Images with a Manual Toggle Switch 🌚
excerpt: >
    A rudimentary approach to dark mode images when you've also implemented a manual toggle switch to override the system <code>prefers-color-scheme</code> setting.
---

<!-- excerpt -->

With the `prefers-color-scheme` CSS media query now [supported by all major browsers](https://caniuse.com/#feat=prefers-color-scheme), it's easy to get started with automatic themes on websites and apps.

Using the `<picture>` element and `media` attribute, we can take things a step further and serve different images based on a user's system colour preference:

```html
<picture>
    <source media="(prefers-color-scheme: light)" srcset="light version">
    <source media="(prefers-color-scheme: dark)" srcset="dark version">
    <img src="fallback" alt="" />
</picture>
```

But as [Rhys Lloyd points out](https://rhyslloyd.me/serve-dark-mode-images-natively/#inevitable-caveat), that falls short once you've added a [manual switch](https://hankchizljaw.com/wrote/create-a-user-controlled-dark-or-light-mode/) for your themes using JavaScript – like I have in the footer of this website:

![](/assets/images/sandbox/dark-mode-images-switch.png)

... which is because the `prefers-color-scheme` query doesn't know about our custom theme CSS selectors. Nor can we use CSS to manipulate the `<source>` elements in any meaningful way.

We can address that inconvenience with just a little extra JavaScript spice! 🌶


## The Basic Solution

Let's connect our `<picture>` elements that have light and dark sources to a script that manually switches between them, overriding the system setting. And let's do it without changing any of our existing markup from above.

*TL;DR:* a demo of our final implementation looks like this:

<iframe height="400" style="width: 100%;" scrolling="no" title="Native Dark Mode images w/ manual switch " src="https://codepen.io/michaelti/embed/ExVjMPr?height=400&theme-id=default&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true" loading="lazy"></iframe>

## How Does it Work?

### 1. The picture element

The HTML5 `<picture>` element works by loading the first `<source>` that has its conditions met. For example, given two sources ...

```html
<source media="(prefers-color-scheme: light)" srcset="light version">
<source media="(prefers-color-scheme: dark)" srcset="dark version">
```

... then when the system colour scheme is set to light, it will only load the first source. If the system colour scheme is dark, it will skip the first source and load the second one.

This is great on its own, but we need a way to supersede both of these conditions in order to  display the image for an *overriden* colour preference.

### 2. The override

We can add a `<source>` to the beginning of our example which has *no* media conditions, and will therefore always take precedence:

```html
<source srcset="override version">
<source media="(prefers-color-scheme: light)" srcset="light version">
<source media="(prefers-color-scheme: dark)" srcset="dark version">
```

### 3. The JavaScript

Next we need some code to insert or remove that new "override" source depending on which theme the user selects.

First, 

## Caveats



## The Complete Demo (tl;dr)



## Conclusion

Perfect. Nighthawks rejoice!




<!-- Temporary code theme -->
<style>
div.highlighter-rouge {
    padding: 5px 15px;
    background-color: var(--color-background-well);
    overflow-x: scroll;
    border-radius: 2px;
    box-shadow: 0 0 4px -1px rgba(0, 0, 0, 0.15) inset;
}
</style>