import { test,expect, Expect,Page } from "@playwright/test";
import { RegisterPage } from "../page/register.spec";
import { LocatorRegister } from "../model/register.model";

const url:string = "https://automate-test.stpb-digital.com/register/";

// เนื่องจากมีการเข้าถึงหน้าเว็บในแต่ละครั้งที่ทำการทดสอบใช้ Beforeach ก่อนการ Test
test.beforeEach('Open Web',async({page}) => {
    const re = new RegisterPage(page);  //ประกาศใบ้งาน Class ที่สร้างไว้
    await re.goto(url);
    await expect(page).toHaveURL(url);
    await expect(page).toHaveTitle("Kru P' Beam - STPB");
})

//Test Case ID 1
test('Validate To Default Page',async({page}) => {
    const re = new RegisterPage(page);
    await re.defaultPage();
})

//Test Case ID 2
test('Validate title for website',async({page}) => {
    await expect(page).toHaveTitle("Kru P' Beam - STPB");
})

//Test Case ID 3
test('Validate link reset is valid',async({page}) => {
    const re = new RegisterPage(page);
    await re.inputData("สมชาย","นามสมมติ","test@ggg.com","test123456","0899999999","Male",true,true,true,true,"thai","Admin","Basic");
    await re.reset();
})

//Test Case ID 4
test('Validate the Firstname Is Valid',async({page}) => {
    const re = new RegisterPage(page);
    await re.inputFirstname("ทดสอบ",false);
})

//Test Case ID 5
test('Validate the Firstname Is Required',async({page}) => {
    const re = new RegisterPage(page);
    await re.inputFirstname("",true);
})

//Test Case ID 6
test('Validate the Lastname Is Valid',async({page}) => {
    const re = new RegisterPage(page);
    await re.inputLastname("นามสมมติ",false);
})

//Test Case ID 7
test('Validate the Lastname Is Required',async({page}) => {
    const re = new RegisterPage(page);
    await re.inputLastname("",true);
})

//Test Case ID 8
test('Validate the Email Is Valid',async({page}) => {
    const re = new RegisterPage(page);
    await re.inputEmail("Test1234@gmail.com",false,false);
})

//Test Case ID 9
test('Validate the Email format Is invalid',async({page}) => {
    const re = new RegisterPage(page);
    let data:string[] = ["Test1234gmail.com","ไทย","09912345678"];

    for(let d of data){
        await re.inputEmail(d,true,true);
    }
})

//Test Case ID 10
test('Validate the Email Is Required',async({page}) => {
    const re = new RegisterPage(page);
    await re.inputEmail("",true,false);
})

//Test Case ID 11
test('Validate the password Is valid',async({page}) => {
    const re = new RegisterPage(page);
    await re.inputPassword("1234567890",false);
})

//Test Case ID 12
test('Validate the password Is Require',async({page}) => {
    const re = new RegisterPage(page);
    await re.inputPassword("",true);
})

//Test Case ID 13
test('Validate the Mobile Is valid',async({page}) => {
    const re = new RegisterPage(page);
    await re.inputMobile("08222222222",false);
})

//Test Case ID 14
test('Validate the Mobile Is Require',async({page}) => {
    const re = new RegisterPage(page);
    await re.inputMobile("",true);
})


//Test Case ID 15
test('Validate the gender Is valid',async({page}) => {
    const re = new RegisterPage(page);
    await re.selectGender("Female",false);
})

//Test Case ID 16
test('Validate the courseSQL Is valid',async({page}) => {
    const re = new RegisterPage(page);
    await re.selectCourse("SQL",false);
})

//Test Case ID 17
test('Validate the courseManual Is valid',async({page}) => {
    const re = new RegisterPage(page);
    await re.selectCourse("Test Manual",false);
})

//Test Case ID 18
test('Validate the courseAuto1 Is valid',async({page}) => {
    const re = new RegisterPage(page);
    await re.selectCourse("Automate Test",false);
})

//Test Case ID 19
test('Validate the courseAuto2 Is valid',async({page}) => {
    const re = new RegisterPage(page);
    await re.selectCourse("Automate Test2",false);
})

//Test Case ID 20
test('Validate the nationality Is valid',async({page}) => {
    const re = new RegisterPage(page);
    await re.selectNationality("Thai",false);
})

//Test Case ID 21
test('Validate the role Is valid',async({page}) => {
    const re = new RegisterPage(page);
    await re.selectRole("admin",false);
})

//Test Case ID 22
test('Validate the plan Is valid',async({page}) => {
    const re = new RegisterPage(page);
    await re.selectPlan("basic",false);
})

//Test Case ID 23
test('Validate input data Is valid',async({page}) => {
    const re = new RegisterPage(page);
    await re.inputData("สมชาย","นามสมมติ","test@ggg.com","test123456","0899999999","Male",true,true,true,true,"thai","Admin","Basic");
    await page.locator(LocatorRegister.btnSign).click();
    await expect(page.getByText('Register Success')).toBeVisible();
    await page.locator("#btn-ok").click();
    await expect(page).toHaveURL('https://automate-test.stpb-digital.com/login/');
})

//Test Case ID 24
test('Validate input data Is required',async({page}) => {
    const re = new RegisterPage(page);
    await re.inputFirstname("",true);
    await re.inputLastname("",true);
    await re.inputEmail("",true,false);
    await re.inputPassword("",true);
    await re.inputMobile("",true);

    await re.selectGender("",true);
    await re.selectCourse("",true);
    await re.selectNationality("",true);
    await re.selectRole("",true);
    await re.selectPlan("",true);
})