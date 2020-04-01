---
template: post
title: Symfony Request Tip
slug: /posts/symfony-request-tip
redirect_from:
  - /posts/symfony-request-tips
draft: false
date: '2019-03-24T16:14:37.121Z'
description: "How to work with a Symfony's Request parameters like a pro. \U0001F60E"
category: Tips
tags:
  - '#Symfony'
  - '#ADR'
  - '#Tips'
---

## Working with Symfony's `Request` object

Let's say you've got an UI action like this one in you application: 

```php
<?php

declare(strict_types=1);

namespace App\Ui;

use Symfony\Component\HttpFoundation\Request;

final class ListProductsAction
{
    // ...
    
    public function __invoke(Request $request): Response
    {
        $categoryId = $request->get('categoryId');
        
        // Some actions are taking place and then you return a Response
    }
}
```

The code above is a simple controller with a purpose of listing some products by `categoryId` (it follows the 
[ADR approach](http://pmjones.io/adr/) - I will cover this topic in next posts 😉). But wait! What *exactly* is 
`categoryId` in `$request->get('categoryId')`? Actually, Symfony "helps you" by allowing you to do not care about 
the origin of it. And this is bad. 💔

## Why is it bad?

* *Readability* - one of best practices for writing controllers is to store your routing configuration away from class 
that handles the route. In our example code, the configuration would be covered in some XML file. So actually we *don't 
know how does our route looks like*. It can be a route with some attributes expected 
`/products/{categoryId}/{subCategoryId}`, it can be a `POST` route expecting a request `body` or it can expect some 
additional `GET` parameters.
* "*Optimization*" - I put this in quotations because it won't affect the performance at all, but just look what does
the [`Request::get()` method](https://github.com/symfony/symfony/blob/master/src/Symfony/Component/HttpFoundation/Request.php#L681).
It has way too complex logic for such a simple operation like getting a data from request. Especially, when we *should*
know what our `request`s are and do.

## How can we improve?

Don't worry, it's simple! Just use suitable properties from `Request` object. You can use:

- `$request->attributes->get('your-parametr')` - fetching from `attributes` from the URL 
`/twoj/path/{your-parametr}`
- `$request->query->get('your-parametr')` - fetching from *query* to get extra values from your URL 
`/twoj/path?{your-parametr}=your-value` (`$_GET`)
- `$request->request->get('your-parametr')` - fetching from *request* to get a request `body` (`$_POST`)

Each `Request` attribute is a `ParameterBag` instance so you don't need to change anything except adding a property:

```diff
-$categoryId = $request->get('categoryId');
+$categoryId = $request->attribute->get('categoryId');
```

I know this post is not a breaking change in your thinking about software development. It's a simple tip, just as the 
title suggests! But remember - Your never work alone on the code. So make it readable for others. 😉
