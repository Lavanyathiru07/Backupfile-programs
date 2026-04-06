exports.cartpage=class cartpage{
    constructor(page)
    {
        this.page=page;
        this.noofproducts="//tbody[@id='tbodyid']/tr/td[2]";
    }

    async checkProductIncart(ProductName)
    {
        const productsInCart=await this.page.$$(this.noofproducts);
        for(let product of productsInCart)
        {
            console.log(await product.textContent());
            if(await product.textContent()==ProductName)
            {
                return true;
                break;
            }
        }
    }
}
