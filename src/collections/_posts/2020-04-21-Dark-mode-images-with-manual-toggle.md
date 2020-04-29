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

But as [Rhys Lloyd points out](https://rhyslloyd.me/serve-dark-mode-images-natively/#inevitable-caveat), that falls short once you've added a [manual switch](https://hankchizljaw.com/wrote/create-a-user-controlled-dark-or-light-mode/) for your themes using JavaScript, like this one:

<iframe height="50" style="width: 100%;" scrolling="no" title="Light/dark colour theme switcher" src="http://localhost:4000/assets/iframe-demos/theme-switch-button.html" frameborder="no" loading="lazy"></iframe>

... which is because the `prefers-color-scheme` query doesn't know about our custom theme CSS selectors. Nor can we use CSS to manipulate the `<source>` elements in any meaningful way.

We will address that inconvenience with a pinch of extra JavaScript spice! 🌶


## The Solution

Let's connect our `<picture>` elements that have light and dark sources to a script that manually switches between them, overriding the system setting. And let's do it without changing any of our existing markup from above.

### ***TL;DR:*** A demo of our final implementation looks like this:

<iframe height="400" style="width: 100%;" scrolling="no" title="Native Dark Mode images w/ manual switch " src="https://codepen.io/michaelti/embed/ExVjMPr?height=400&theme-id=default&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true" loading="lazy"></iframe>

## How Does it Work?

### 1. The picture element

The HTML5 `<picture>` element works by loading the first `<source>` whose conditions are met. For example, given two sources ...

```html
<source media="(prefers-color-scheme: light)" srcset="light version">
<source media="(prefers-color-scheme: dark)" srcset="dark version">
```

... then when the system colour scheme is set to light, it will only load the first source. If the system colour scheme is dark, it will skip the first source and load the second one.

This is great on its own, but we need a way to supersede both of these conditions in order to  display the image for an *overriden* colour preference.

### 2. Override the sources

We can add a `<source>` to the beginning of our example which has *no* media condition, and will therefore always take precedence:

```html
<source srcset="override version">
<source media="(prefers-color-scheme: light)" srcset="light version">
<source media="(prefers-color-scheme: dark)" srcset="dark version">
```

### 3. Connect with JavaScript

Now we can write some code to dynamically insert that "override" source depending on which theme the user selects – for every `<picture>` site-wide. To accomplish this, we must:

1. Find every existing source that matches the desired colour scheme
2. Make a duplicate of that source *without* the `media=""` condition
3. Place the new source first in its `<picture>` element

First, let's set up a function that takes the desired colour scheme, 'light' or 'dark', and finds all the sources that match it:

```javascript
function setPicturesThemed(colorScheme) {
    document.querySelectorAll(
        `picture > source[media="(prefers-color-scheme: ${colorScheme})"]`
    );
}
```

This isn't as complicated as it looks! We're using an [ attribute selector](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors) to round up all the elements we want. `picture > source` gets all of the sources, then `[media=(prefers-color-scheme: ${colorScheme})]` narrows it down to the ones that match the function input of 'light' or 'dark'.

For each of the matching sources we need to make a duplicate, remove its `media` attribute, and prepend it to the parent `<picture>` element. We'll also give it a custom data attribute for future reference. Here it goes:

```javascript
document.querySelectorAll(...).forEach(el => {
    const cloned = el.cloneNode();
    cloned.removeAttribute('media');
    cloned.setAttribute('data-cloned-theme', colorScheme);
    el.parentNode.prepend(cloned);
});
```

Perfect! Let's check out what we have so far by adding a couple of buttons:

<iframe height="300" style="width: 100%;" scrolling="no" title="Native Dark Mode images w/ manual switch (Demo 1)" src="https://codepen.io/michaelti/embed/JjYJQEz?height=300&theme-id=default&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true" loading="lazy"></iframe>

### 4. Almost there...

Two things are missing:

- The ability to switch back to the default system colour scheme
- Cleaning up the duplicated sources. Right now the `<picture>` is getting filled up with repeated elements every time the function runs.

To switch back to the default colour scheme, we just need to remove all of the `<source>` elements that we've created. That's where the `data-cloned-theme` attribute we gave them comes in handy:

```javascript
document.querySelectorAll('picture > source[data-cloned-theme]').forEach(el => {
    el.remove();
});
```

Putting that at the beginning of our main function will also take care of cleaning everything up each time it runs.

Finally, we'll get the main function to accept an empty string for the default case – which will do the removal and nothing else – and voila!

## Final JavaScript code

```javascript
function setPicturesThemed(colorScheme = '') {
    // Remove all existing picture <source> elements with a "data-cloned-theme" attribute
    // (i.e. clean up all the elements we create below)
    document.querySelectorAll('picture > source[data-cloned-theme]').forEach(el => {
        el.remove();
    });

    if (colorScheme) {
        // Find all picture <source> elements with the desired color-scheme attribute
        document.querySelectorAll(`picture > source[media="(prefers-color-scheme: ${colorScheme})"]`).forEach(el => {
            // 1. Clone the given <source>
            // 2. Remove the media attribute so the new <source> is unconditional
            // 3. Add a "data-cloned-theme" attribute to it for future reference / removal
            // 4. Prepend the new <source> to the parent <picture> so it takes precedence
            const cloned = el.cloneNode();
            cloned.removeAttribute('media');
            cloned.setAttribute('data-cloned-theme', colorScheme);
            el.parentNode.prepend(cloned);
        });
    }
}
```

## Complete Demo

<iframe height="400" style="width: 100%;" scrolling="no" title="Native Dark Mode images w/ manual switch " src="https://codepen.io/michaelti/embed/ExVjMPr?height=400&theme-id=default&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true" loading="lazy"></iframe>

## Caveats

Rudimentary as this approach is, here are a few things to note:

- Each themed `<picture>` element must explicitly set both light and dark sources, in addition to the usual fallback image.
- This method does not work for `<source>` elements that have additional queries in their media attribute, i.e. `<source media="(prefers-color-scheme: dark) and (max-width: 640px)">`. This can be worked around by using [the srcset attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture#The_srcset_attribute) to specify sizes instead.
- Modern browser support, see [Can I Use: DOM manipulation convenience methods](https://caniuse.com/#feat=dom-manip-convenience)

## Nighthawks rejoice!

In just 13 lines of JavaScript, we wrote a function to override the preferred colour scheme for all of the light and dark mode images on a given page.

You may integrate this with the manual toggle switch on your website or app so your users will always be served the right themed image, day 🌞 or night 🌚.
