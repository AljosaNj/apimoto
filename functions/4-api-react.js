require('dotenv').config()
const Airtable = require('airtable-node');
 
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('app4A9NZ8XRqLdtxW')
  .table('products')



exports.handler = async(event,context,cb) => {
try {
 const {records} = await airtable.list()
 const products = records.map((product) => {
  const {id} = product;
  const {name,images,price,featured,colors,company,description,category,fuel,gear,registration,kilometre,years} = product.fields
  const image = images[0].url
  return {id,name,image,price,featured,colors,company,description,category,fuel,gear,registration,kilometre,years}
 })
  return {
headers: {
      'Access-Control-Allow-Origin': '*',
    },

 statusCode: 200,
  body: JSON.stringify(products),
 }
} catch (error) {
  return {
 statusCode: 500,
  body: 'Server Error',
 }
}
 

}