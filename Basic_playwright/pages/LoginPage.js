exports.loginPage=class LoginPage{

    constructor(page)
    {
        this.page=page;
        this.loginlink="#login2";
        this.username="#loginusername";
        this.password="#loginpassword";
        this.loginbutton="//button[text()='Log in']";
        
    }

    async gotoApplication()
    {
        await this.page.goto('https://www.demoblaze.com/index.html');

    }

    async login(username,password)
    {

        await this.page.click(this.loginlink);
        await this.page.locator(this.username).fill(username);
        await this.page.fill(this.password,password);
        await this.page.click(this.loginbutton);
    }
}