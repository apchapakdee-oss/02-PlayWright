import {expect, Page} from "@playwright/test"
import { LocatorRegister } from "../model/register.model"

// สร้าง class เป็น opject
export class RegisterPage{
    private readonly page:Page
    constructor(page:Page){
        this.page = page;
    }
//เก็บค่า Url
    async goto(url:string){
        await this.page.goto(url);
    }

//TaseCase ตรวจสอบการแสดง Elelment ในหน้า Register
    async defaultPage(){
        await expect(this.page.getByText("Kru P' Beam")).toBeVisible();
        await expect(this.page.locator(LocatorRegister.reset)).toBeVisible();
        await expect(this.page.locator(LocatorRegister.firstname)).toBeVisible();
        await expect(this.page.locator(LocatorRegister.lastname)).toBeVisible();
        await expect(this.page.locator(LocatorRegister.email)).toBeVisible();
        await expect(this.page.locator(LocatorRegister.password)).toBeVisible();
        await expect(this.page.locator(LocatorRegister.hidePass)).toBeEnabled();
        await expect(this.page.locator(LocatorRegister.mobile)).toBeVisible();
        await expect(this.page.locator(LocatorRegister.gender)).toBeVisible();
        await expect(this.page.locator(LocatorRegister.courseSQL)).toBeVisible();
        await expect(this.page.locator(LocatorRegister.courseManual)).toBeVisible();
        await expect(this.page.locator(LocatorRegister.courseAuto1)).toBeVisible();
        await expect(this.page.locator(LocatorRegister.courseAuto2)).toBeVisible();
        await expect(this.page.locator(LocatorRegister.nationality)).toBeVisible();
        await expect(this.page.locator(LocatorRegister.role)).toBeVisible();
        await expect(this.page.locator(LocatorRegister.plan)).toBeVisible();
        await expect(this.page.locator(LocatorRegister.btnSign)).toBeVisible();                
    }

//ใช้เก็บข้อมูลที่ส่งเข้ามาเพื่อตรวจสอบการล้างค่า
    async inputData(
        firstname: string,
        lastname: string,
        email: string,
        password: string,
        mobile: string,
        gender: string,
        isSQL: boolean,
        isManual: boolean,
        isAuto1: boolean,
        isAuto2: boolean,
        nationality: string,
        role: string,
        plan: string){

        //Action เก็บค่า ใน Field
        await this.page.locator(LocatorRegister.firstname).fill(firstname);
        await this.page.locator(LocatorRegister.lastname).fill(lastname);
        await this.page.locator(LocatorRegister.email).fill(email);
        await this.page.locator(LocatorRegister.password).fill(password);
        await this.page.locator(LocatorRegister.mobile).fill(mobile);

        //Action เก็บค่า ใน Radio Button
        if(gender == "female"){
            await this.page.locator('//*[@id="__next"]/div[1]/div/div/div/div/div/div/form/div[6]/div/label[1]/span[1]/input').check();
        }else{
            await this.page.locator('//*[@id="__next"]/div[1]/div/div/div/div/div/div/form/div[6]/div/label[2]/span[1]/input').check();
        }

        //Action เก็บค่า ใน Checkbox
        if(isSQL){
            await this.page.locator(LocatorRegister.courseSQL).check();
        }

        if(isManual){
            await this.page.locator(LocatorRegister.courseManual).check();
        }

        if(isAuto1){
            await this.page.locator(LocatorRegister.courseAuto1).check();
        }

        if(isAuto2){
            await this.page.locator(LocatorRegister.courseAuto2).check();
        }

        //Action เก็บค่า ใน Dropdown
        await this.page.locator(LocatorRegister.nationality).click();
        await this.page.getByText(nationality).click();

        await this.page.locator(LocatorRegister.role).click();
        await this.page.getByText(role).click();

        await this.page.locator(LocatorRegister.plan).click();
        await this.page.getByText(plan).click();        
    }

//TaseCase ตรวจสอบการกด Hyperlink Reset
    async reset(){
        await this.page.locator(LocatorRegister.reset).click();
        //await expect(this.page.locator(LocatorRegister.reset)).toHaveValue("");
        await expect(this.page.locator(LocatorRegister.firstname)).toHaveValue("");
        await expect(this.page.locator(LocatorRegister.lastname)).toHaveValue("");
        await expect(this.page.locator(LocatorRegister.email)).toHaveValue("");
        await expect(this.page.locator(LocatorRegister.password)).toHaveValue("");
        await expect(this.page.locator(LocatorRegister.mobile)).toHaveValue("");
        await expect(this.page.locator(LocatorRegister.gender)).not.toHaveValue("");
        await expect(this.page.locator(LocatorRegister.courseSQL)).not.toHaveValue("");
        await expect(this.page.locator(LocatorRegister.courseManual)).not.toHaveValue("");
        await expect(this.page.locator(LocatorRegister.courseAuto1)).not.toHaveValue("");
        await expect(this.page.locator(LocatorRegister.courseAuto2)).not.toHaveValue("");
        await expect(this.page.locator('//*[@id="__next"]/div[1]/div/div/div/div/div/div/form/div[8]/div/input')).toHaveValue('');
        await expect(this.page.locator('//*[@id="__next"]/div[1]/div/div/div/div/div/div/form/div[9]/div/input')).toHaveValue('');
        await expect(this.page.locator('//*[@id="__next"]/div[1]/div/div/div/div/div/div/form/div[10]/div/input')).toHaveValue('');        
    }

//TaseCase ตรวจสอบการกรอกข้อมูลใน Field FirstName
    async inputFirstname(data:string,isFail:boolean){
        await this.page.locator(LocatorRegister.firstname).fill(data);
        await this.page.locator(LocatorRegister.btnSign).click();

        if(isFail){ 
            //เคส Fail
            await expect(this.page.locator('#error-firstname')).toBeVisible();
            await expect(this.page.locator('#error-firstname')).toHaveText('This field is required');
        }else{
            // เคส Pass
            //await expect(this.page.locator(LocatorRegister.firstname)).toHaveText(data);
            await expect(this.page.locator('#error-firstname')).not.toBeVisible();
        }
    }

//TaseCase ตรวจสอบการกรอกข้อมูลใน Field LastName
    async inputLastname(data:string,isFail:boolean){
        await this.page.locator(LocatorRegister.lastname).fill(data);
        await this.page.locator(LocatorRegister.btnSign).click();

        if(isFail){ 
            //เคส Fail
            await expect(this.page.locator('#error-lastname')).toBeVisible();
            await expect(this.page.locator('#error-lastname')).toHaveText('This field is required');
        }else{
            // เคส Pass
            //await expect(this.page.locator(LocatorRegister.lastname)).toHaveText(data);
            await expect(this.page.locator('#error-lastname')).not.toBeVisible();
        }
    }

//TaseCase ตรวจสอบการกรอกข้อมูลใน Field Email
    async inputEmail(data:string,isFail:boolean,checkFormate:boolean){
        await this.page.locator(LocatorRegister.email).fill(data);
        await this.page.locator(LocatorRegister.btnSign).click();

        if(isFail){ 
            //เคส Fail ไม่กรอกข้อมูล
            await expect(this.page.locator('#error-email')).toBeVisible();

            if(checkFormate){ //ตรวจสอบ format การกรอก Email
                await expect(this.page.locator('#error-email')).toHaveText('Invalid email address');
            }else{
                await expect(this.page.locator('#error-email')).toHaveText('This field is required');
            }            
        }else{
            // เคส Pass
            //await expect(this.page.locator(LocatorRegister.email)).toHaveText(data);
            await expect(this.page.locator('#error-email')).not.toBeVisible();
        }
    }

//TaseCase ตรวจสอบการกรอกข้อมูลใน Field Password
    async inputPassword(data:string,isFail:boolean){
        await this.page.locator(LocatorRegister.password).fill(data);
        await this.page.locator(LocatorRegister.btnSign).click();

        if(isFail){ 
            //เคส Fail
            await expect(this.page.locator('#error-password')).toBeVisible();
            await expect(this.page.locator('#error-password')).toHaveText('This field is required');
        }else{
            // เคส Pass
            //await expect(this.page.locator(LocatorRegister.password)).toHaveText(data);
            await expect(this.page.locator('#error-password')).not.toBeVisible();
        }
    }

//TaseCase ตรวจสอบการกรอกข้อมูลใน Field Mobile
    async inputMobile(data:string,isFail:boolean){
        await this.page.locator(LocatorRegister.mobile).fill(data);
        await this.page.locator(LocatorRegister.btnSign).click();

        if(isFail){ 
            //เคส Fail
            await expect(this.page.locator('#error-mobile-phone')).toBeVisible();
            await expect(this.page.locator('#error-mobile-phone')).toHaveText('This field is required');
        }else{
            // เคส Pass
            //await expect(this.page.locator(LocatorRegister.mobile)).toHaveText(data);
            await expect(this.page.locator('#error-mobile-phone')).not.toBeVisible();
        }
    }

//TaseCase ตรวจสอบการเลือกข้อมูล Radio Button Gender
    async selectGender(data:string,isFail:boolean){
        
        if(isFail){ 
            //เคส Fail
            await this.page.locator(LocatorRegister.btnSign).click();
            await expect(this.page.locator('#validation-basic-gender')).toBeVisible();
            await expect(this.page.locator('#validation-basic-gender')).toHaveText('This field is required');
        }else{
            // เคส Pass
            await this.page.getByRole("radio",{name:data}).check();
            await expect(this.page.getByRole("radio",{name:data})).toBeChecked();
            await expect(this.page.locator('#validation-basic-gender')).not.toBeVisible();
        }
    }

//TaseCase ตรวจสอบการเลือกข้อมูล Checkbox Course
    async selectCourse(data:string,isFail:boolean){
        
        if(isFail){ 
            //เคส Fail
            await this.page.locator(LocatorRegister.btnSign).click();
            await expect(this.page.locator('#validation-basic-courses')).toBeVisible();
            await expect(this.page.locator('#validation-basic-courses')).toHaveText('This field is required');
        }else{
            // เคส Pass
            if(data == "Automate Test"){
                await this.page.locator(LocatorRegister.courseAuto1).check();
                await expect(this.page.locator(LocatorRegister.courseAuto1)).toBeChecked();
            }else if(data == "Automate Test2"){
                await this.page.locator(LocatorRegister.courseAuto2).check();
                await expect(this.page.locator(LocatorRegister.courseAuto2)).toBeChecked();
            }else{
                await this.page.getByText(data).check();
                await expect(this.page.getByText(data)).toBeChecked();
            }
            await expect(this.page.locator('#validation-basic-courses')).not.toBeVisible();
        }
    }

//TaseCase ตรวจสอบการเลือกข้อมูล Dropdown Nationality
    async selectNationality(data:string,isFail:boolean){
        
        await this.page.locator(LocatorRegister.btnSign).click();

        if(isFail){ 
            //เคส Fail
            await expect(this.page.locator('#validation-basic-nationality')).toBeVisible();
            await expect(this.page.locator('#validation-basic-nationality')).toHaveText('This field is required');
        }else{
            // เคส Pass
            await this.page.locator(LocatorRegister.nationality).click();
            await this.page.getByText(data).click();
            await expect(this.page.locator('//*[@id="__next"]/div[1]/div/div/div/div/div/div/form/div[8]/div/input')).toHaveValue(data);
            await expect(this.page.locator('#validation-basic-nationality')).not.toBeVisible();
        }
    }

//TaseCase ตรวจสอบการเลือกข้อมูล Dropdown Role
    async selectRole(data:string,isFail:boolean){
        
        await this.page.locator(LocatorRegister.btnSign).click();

        if(isFail){ 
            //เคส Fail
            await expect(this.page.locator('#validation-role')).toBeVisible();
            await expect(this.page.locator('#validation-role')).toHaveText('This field is required');
        }else{
            // เคส Pass
            await this.page.locator(LocatorRegister.role).click();
            await this.page.getByText(data).click();
            await expect(this.page.locator('//*[@id="__next"]/div[1]/div/div/div/div/div/div/form/div[9]/div/input')).toHaveValue(data);
            await expect(this.page.locator('#validation-role')).not.toBeVisible();
        }
    }

//TaseCase ตรวจสอบการเลือกข้อมูล Dropdown Plan
    async selectPlan(data:string,isFail:boolean){
        
        await this.page.locator(LocatorRegister.btnSign).click();

        if(isFail){ 
            //เคส Fail
            await expect(this.page.locator('#validation-plan')).toBeVisible();
            await expect(this.page.locator('#validation-plan')).toHaveText('This field is required');
        }else{
            // เคส Pass
            await this.page.locator(LocatorRegister.plan).click();
            await this.page.getByText(data).click();
            await expect(this.page.locator('//*[@id="__next"]/div[1]/div/div/div/div/div/div/form/div[10]/div/input')).toHaveValue(data);
            await expect(this.page.locator('#validation-plan')).not.toBeVisible();
        }
    }
}