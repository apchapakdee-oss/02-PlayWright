//กำหนดตัวแปรเก็บค่า Locator
export interface Register{
    reset:string;
    firstname:string;
    lastname:string;
    email:string;
    password:string;
    hidePass:string;
    mobile:string;
    gender:string;
    courseSQL:string;
    courseManual:string;
    courseAuto1:string;
    courseAuto2:string;
    nationality:string;
    role:string;
    plan:string;
    btnSign:string;
}

//เก็บค่า Locator
export const LocatorRegister:Register = {
    reset: '#reset',
    firstname: '#firstname',
    lastname: '#lastname',
    email: '#email',
    password: '#password',
    hidePass: '#icon-toggle-show-password',
    mobile: '#mobile-phone',
    gender: '//*[@id="__next"]/div[1]/div/div/div/div/div/div/form/div[6]/div/label[1]/span[1]/input',
    courseSQL: '//*[@id="__next"]/div[1]/div/div/div/div/div/div/form/div[7]/div/label[1]/span[1]/input',
    courseManual: '//*[@id="__next"]/div[1]/div/div/div/div/div/div/form/div[7]/div/label[2]/span[1]/input',
    courseAuto1: '//*[@id="__next"]/div[1]/div/div/div/div/div/div/form/div[7]/div/label[3]/span[1]/input',
    courseAuto2: '//*[@id="__next"]/div[1]/div/div/div/div/div/div/form/div[7]/div/label[4]/span[1]/input',
    nationality: '#nationality',
    role: '#select-role',
    plan: '#select-plan',
    btnSign: '#btn-sign-up'
}