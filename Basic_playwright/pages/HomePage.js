exports.Homepage=class Homepage{
    constructor(page){
        this.page=page;
        this.productlist="//div[@id='tbodyid']/div/div/div/h4/a";
        this.addTocartbtn="//a[text()='Add to cart']";
        this.cart="#cartur";
    }

    async addProductTOCard(productname)
    {
        const productlist=await this.page.$$(this.productlist);
        for (let products of productlist)
        {
            if(await products.textContent()==productname)
            {
                await products.click();
                break;
            }
        }await this.page.on('dislog',async dialog=>{
            if(dialog.message().includes("added"))
            {
                await dialog.accept();
            }
        })
        await this.page.click(this.addTocartbtn);

    }

    async gotoCart()
    {
        await this.page.click(this.cart);
    }
}