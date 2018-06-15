module.exports = {
  name: 'Create Dynamic Pages',
  intro: `
Now we know how to create a basic Next.js app with multiple pages. In order to create a page, we have to create an actual file on the disk.

However, in a real app, we need to create pages dynamically in order to display dynamic content. There are many approaches to do that with Next.js.

We are starting with creating dynamic pages by using **query strings**.

We'll be creating a simple blog app. It has a list of all the posts on the home (index) page.

![](https://cloud.githubusercontent.com/assets/50838/24542722/600b9ce8-161a-11e7-9f1d-7ed08ff394fd.png)

When you click on a post title, you'll be able to see the individual post on its own view.

![](https://cloud.githubusercontent.com/assets/50838/24542721/5fdd9c26-161a-11e7-9b10-296d4cb6912d.png)

Let's build that app.
  `,
  steps: [
    {
      id: 'setup',
      type: 'text',
      points: 5,
      text: `
## Setup

First of all, we need a simple Next.js app to play with. Try to download the following example app:

~~~bash
git clone https://github.com/arunoda/learnnextjs-demo.git
cd learnnextjs-demo
git checkout using-shared-components
~~~

You can run it with:

~~~bash
npm install
npm run dev
~~~

Now you can access the app by navigating to [http://localhost:3000](http://localhost:3000/).
      `
    },

    {
      id: 'adding-a-list-of-posts',
      type: 'mcq',
      points: 25,
      answers: [
        '/?id=Hello%20Next.js',
        '/post?title=Hello%20Next.js',
        '/post?title=Hello Next.js',
        '/post'
      ],
      correctAnswer: '/post?title=Hello%20Next.js',
      text: `
## Adding a list of posts

First of all, let's add the list of post titles in the home page.
Add the following content to the \`pages/index.js.\`

~~~js
import Layout from '../components/MyLayout.js'
import Link from 'next/link'

const PostLink = (props) => (
  <li>
    <Link href={\`/post?title=\${props.title}\`}>
      <a>{props.title}</a>
    </Link>
  </li>
)

export default () => (
  <Layout>
    <h1>My Blog</h1>
    <ul>
      <PostLink title="Hello Next.js"/>
      <PostLink title="Learn Next.js is awesome"/>
      <PostLink title="Deploy apps with Zeit"/>
    </ul>
  </Layout>
)
~~~

Once you add this content, you will see a page like this:

![](https://cloud.githubusercontent.com/assets/50838/24542722/600b9ce8-161a-11e7-9f1d-7ed08ff394fd.png)

Next, click the first link. You'll get a 404 page. That's fine.
What's the URL of that page?
      `
    },

    {
      id: 'passing-data',
      type: 'mcq',
      points: 20,
      answers: [
        'It\'ll work as expected.',
        'It\'ll render nothing.',
        'It\'ll render only the header.',
        'It throws an error'
      ],
      correctAnswer: 'It throws an error',
      text: `
## Passing Data via Query Strings

We are passing data via a query string parameter (a query param). In our case, it's the “title” query param. We do this with our PostLink component as shown below:

~~~js
const PostLink = (props) => (
  <li>
    <Link href={\`/post?title=\${props.title}\`}>
      <a>{props.title}</a>
    </Link>
  </li>
)
~~~

(Check the \`href\` prop of the \`Link\` component.)

Just like that, you can pass any kind of data you like with query strings.

## Create the “post” page

Now we need to create the post page to show the blog post. In order to do that, we need to get the title from the query strings. Let's see how to do that:

Create a file called \`pages/post.js\` and add the following content:

~~~js
import Layout from '../components/MyLayout.js'

export default (props) => (
    <Layout>
       <h1>{props.url.query.title}</h1>
       <p>This is the blog post content.</p>
    </Layout>
)
~~~

Now our page will look like this:

![](https://cloud.githubusercontent.com/assets/50838/24542721/5fdd9c26-161a-11e7-9b10-296d4cb6912d.png)

Here's what's happening in the above code.

* Every page will get a prop called “URL” which has some details related to the current URL.
* In this case, we are using the “query” object, which has the query string params.
* Therefore, we get the title with \`props.url.query.title\`.

---

Let's do a simple modification to our app. Replace the content of the “pages/post.js” with the following:

~~~js
import Layout from '../components/MyLayout.js'

const Content = (props) => (
  <div>
    <h1>{props.url.query.title}</h1>
    <p>This is the blog post content.</p>
  </div>
)

export default () => (
    <Layout>
       <Content />
    </Layout>
)
~~~

What'll happen when you navigate to this page? http://localhost:3000/post?title=Hello%20Next.js

      `
    },

    {
      id: 'special-prop-url',
      type: 'text',
      points: 5,
      text: `
## Special prop "url"

As you can see, that code will throw an error like this:

![](https://cloud.githubusercontent.com/assets/50838/24542720/5fd985a0-161a-11e7-8971-bc677906b1bf.png)

That's because, \`url\` prop is only exposed to the page's main component. That's not exposed for other components used in the page. But, if you need, you can pass it like this:

~~~js
export default (props) => (
    <Layout>
       <Content url={props.url} />
    </Layout>
)
~~~
      `
    },

    {
      id: 'finally',
      type: 'text',
      points: 5,
      text: `
## Finally

Now we've learned how to create dynamic pages using query strings. This is just the start.

A dynamic page might need more information to render, and we may not be able to pass all of them via query strings. Or we may want to have clear URLs like this: http://localhost:3000/blog/hello-nextjs

We can learn all about these things in upcoming lessons. This is the base for all of them.
      `
    }
  ]
}
