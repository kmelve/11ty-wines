const groq = require('groq')
const client = require('./sanityClient.js')
const BlocksToMarkdown = require('@sanity/block-content-to-markdown')
const serializers = require('./serializers')
const slugify = require('slugify')

async function getProduct () {
  const filter = groq`*[_type == "product"]{
    ...,
    "image": image.asset->url
  }`
  const docs = await client.fetch(filter).catch(err => console.error(err))
  const authors = docs.map(doc => ({...doc, slug: slugify(doc.name)}))
  return docs
}

module.exports = getProduct
