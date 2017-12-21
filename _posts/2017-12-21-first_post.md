---
layout: post
title: First Post
tags: [Jekyll, Github]
---

A quick rundown of how I deployed this blog using Jekyll and Github pages (github.io)

# Why Jekyll + github.io?

I think that Github pages is going to work pretty well for me, and here's why:

*Free* - I'm just trying to keep track of my code, configs and the reasons I do (or did) things the way I do (or did) them.  Free is the best price for this type of blog

*No database* - I like the flat file approach.  This lends itself to future parsing and data analytics without the need for database interaction, and generally prevents the need to write a bunch of business logic.

*Scalable by default* - I've seen some pretty big Git repos on Github, so it should work well for what I'm trying to do here.

*Good for code* - I will mostly be posting code and text, maybe an image or two.  Git is a really good way to store text. (not to mention, revert to previous versions)

*Markdown* - I can write HTML if I have to, but Markdown is pretty powerful.

*Jekyll built in* - Github pages already understands the basic Jekyll site format, so I just need to put my posts and pages in the correct directories and formats and Github's server-side Jekyll engine will render this website.

# Why not Jekyll + github.io?

There are plenty of reasons that Github pages might not work for you.

*User interface* - Publishing to this blog generally requires some interaction with Git and Github from the command line.  Further, since I use a basic text editor most of the time, there's no fancy splel check.

*Technical know how* - I wouldn't want to turn this blog over to a general consumer and say, "Here you go! Blog away!"  There are too many dependencies for that.

*Not free if you want a custom domain* - I don't really care about a custom domain for my use case, but if you did you'd have to pay for it, or go elsewhere.

*Shoddy draft system* - You can exclude draft blogs from publication, but technically they still become public once you push your drafts to the public side of your Github pages repo.  This leaves you with only one real option to keep drafts private, and that's to put your drafts folder in your `.gitignore` file and save them locally ... so, no backup.

*Comment system* - Building a comment system in Github is not trivial.  Nuff said.

# Alternatives?

*hosted on AWS S3* - I could still host this blog repo on Github and post the Jekyll rendered site to AWS S3, behind a CloudFront CDN endpoint.  If I ever decide to go the custom domain route, this is probably what I'll do.  However, this still does not solve all of the other user interface and comment system issues.

*Wordpress* - Of course, Wordpress, Blogger and some others offer free and hosted blogs, but then you get into the database thing.

# Setup

Setting up Github pages with Jekyll is pretty simple for static HTML sites.  First, create a Github repo according to the [Github Pages tutorial](https://pages.github.com/).  You can review the repo for this website here: [github.com/mypluribus/mypluribus.github.io](https://github.com/mypluribus/mypluribus.github.io)

Next create a new local repo following the [Jekyll directory structure documentation](https://jekyllrb.com/docs/structure/) and push it to the newly created Github repo.  For a basic static website, begin with a simple index.html and some CSS or JavaScript.

{% highlight bash linenos %}

mkdir mypluribus.github.io
cd mypluribus.github.io
git init .
git remote add origin https://github.com/mypluribus/mypluribus.github.io.git

echo 'Hello World!' > index.html
git add index.html
git commit -m 'added index.hmtl'
git push -u origin master

{% endhighlight %}

That's it.  If you're experienced in web design, you can pretty much take it from there.

## Testing

It's not necessary to setup Jekyll locally if you trust that every edit you make will work ... but if you want to test your site locally, you'll need the following at minimum:

{% highlight bash linenos %}
#!/bin/bash

##
## install Jekyll static web framework
##

##
## yum -y install ruby rubygems ruby-devel
##
##  .. commented out since it's preferred to build Ruby from source
##

RUBY_URL="http://cache.ruby-lang.org/pub/ruby/ruby-2.4.2.tar.gz"
RUBY_TAR="ruby-2.4.2.tar.gz"
RUBY_DIR="ruby-2.4.2"

sudo yum -y remove ruby rubygems ruby-devel

sudo yum -y groupinstall "Development Tools"
sudo yum -y install openssl-devel
wget $RUBY_URL
tar xvfvz $RUBY_TAR
cd $RUBY_DIR
./configure
make
sudo make install 

cd ..
rm -rf $RUBY_DIR
rm -rf $RUBY_TAR

sudo ln -s /usr/local/bin/gem /usr/bin/gem

gem install jekyll
gem install bundler

##
## syntax highlighting ... for local testing
##
gem install rouge

{% endhighlight %}

At this point the site can be tested with the following command:

{% highlight bash %}

bundle exec jekyll serve

{% endhighlight %}

The `serve` command triggers the development server to build the site and listen on the loopback. (usually 127.0.0.1:4000)

After building the site, Jekyll places all of the contents into the `_site` directory.  This is the directory that the Jekyll development server serves up for local HTTP requests.  This directory is also the directory that you would copy up to something like AWS S3 if you were hosting there.

## Layout

I don't intend to repeat the Jekyll documentation, but I've included a few interesing layout bits that I think are worth sharing.  Using Jekyll's built in Liquid syntax (python developers, think Jinja) it's possible to loop through posts, tags, categories and other data.

*Showing the latest enrtry* in its entirety on the first page is pretty straight forward.  Add the following to index.html:

{% highlight html linenos %}
{% raw %}
{% assign post = site.posts.first %}
<div id="post">
    <div class='title'>
        <a href="{{ post.url }}">{{ post.title }}</a>
    </div>
    <div class='date'>
        {{ post.date | date_to_string }}
    </div> 
    <div id='body'>
        {{ post.content }}
    </div>
</div>
{% endraw %}
{% endhighlight %}

*To show the next 3 posts* with their excerpts use the `offset` and `limit` delimiters ... add the following to index.html:

{% highlight html linenos %}
{% raw %}
{% for post in site.posts offset:1 limit:3 %}
    <li class='post'>
        <div class='title'>
            <a href="{{ post.url }}">{{ post.title }}</a>
        </div>
        <div class='date'>
            {{ post.date | date_to_string }}
        </div> 
        <div class='excerpt'>
            {{ post.excerpt | remove: '<p>' | remove: '</p>' }}
        </div>
    </li>
{% endfor %}
{% endraw %}
{% endhighlight %}

The excerpt separator is the first new line by default, but this character can be changed to something more specific, even an HTML comment string.

Finally add a *list of the remaining posts to the bottom of the front page*.  Add the following to index.html:

{% highlight html linenos %}
{% raw %}
{% for post in site.posts offset:4 %}
    <li class='post'>
        <span class='title'>
            <a href="{{ post.url }}">{{ post.title }}</a>
        </span>
        <span class='date'>
            {{ post.date | date_to_string }}
        </span> 
    </li> 
{% endfor %}
{% endraw %}
{% endhighlight %}

*Syntax highlighting* is not necessarily trivial ... but it's possible using the {%raw %}{% highlight [language] linenos %}{% endraw %} tag.  I had to create a syntax CSS file to make the line numbers line up correctly, and you'll notice that they are still not perfect.  If you want to highlight syntax that contains Liquid tags, use the {% raw %}{% raw %}{% endraw %} tag.

# Templates

Like any good templating engine, it is possible to create templates and then inherit their attributes at run time.

Create the file `default.html` and place it in the `_layouts` folder:

{% highlight html linenos %}
{% raw %}
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="style.css">
        <title>{{ page.title }}</title>
    </head>
    <body>
        <div id='header'>
            <!-- header goes here -->
        </div>
        <div id='body'>
            {{ content }}
        </div>
        <div id='menu'>
            <!-- menu goes here -->
        </div>
        <div id='footer'>
            <!-- footer goes here -->
        </div>
    </body>
</html>
{% endraw %}
{% endhighlight %}

Then create `index.html` in the root directory with some front matter and Markdown or HTML:

{% highlight html linenos %}
{% raw %}
---
layout: default
title: Hi, I'm Matt
---

{% assign post = site.posts.first %}
<div class='section_header'>Latest</div>
<div id="post">
    <div class='title'>
        <a href="{{ post.url }}">{{ post.title }}</a>
    </div>
    <div class='date'>
        {{ post.date | date_to_string }}
    </div> 
    <div id='body'>
        {{ post.content }}
    </div>
</div>

...
{% endraw %}
{% endhighlight %}


When you use the `jekyll build` command the content of `index.html` is passed to the `default.html` layout as the {% raw %}{{ content }}{% endraw %} variable.  Additional variables are also provided, such as `page.title`. On Github this is done at runtime when serving page requests and so no build is required.

# Conclusion

* Jekyll isn't a perfect template engine, but I think it will work well for the purpose of creating documentation.

* I still need to figure out a commenting system.  I'm hoping that Github issues will work for this.

* For all practical pusposes, the syntax highlighting setup was harder than it needed to be ... or perhaps I'm doing it wrong.

* 100% command line and simple text editor is just right for me, but probably not for the less technical user.

# Further reading
* [Writing posts](https://jekyllrb.com/docs/posts/)
* [Front Matter](https://jekyllrb.com/docs/frontmatter/)
* [Includes](https://github.com/mypluribus/mypluribus.github.io/blob/master/_layouts/default.html) ... I'll be working with these later